import { useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import Navbar from '../components/Navbar.jsx'
import RatelimitUI from '../components/RatelimitUI.jsx'
import Notecard from '../components/Notecard.jsx'

const HomePage = () => {
    const [isRatelimited, setIsRatelimited] = useState(false);
    const [noteList, setNoteList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                //const res = await fetch('http:localhost:8080/note');
                //const data = await res.json();
                const res = await axios.get('http://localhost:8080/note');
                setNoteList(res.data);
                setIsRatelimited(false);
                //console.log(res.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
                if (error.response.status === 429) {
                    setIsRatelimited(true);
                } else {
                    toast.error("Failed to fetch notes. Please try again later.");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchNotes();
    }, [])

    return (
        // <div data-theme = "coffee">
        //     <button onClick={() => toast.success("点击成功")} className='btn btn-primary'>点击</button>
        //     <h1>This is home page</h1>
        // </div>
        <div className='min-h-screen'>
            <Navbar />
            { isRatelimited && <RatelimitUI /> }
            <div className='max-w-7xl mx-auto p-4 mt-6'>
                {loading && <div className='text-center text-primary py-10'>正在加载你的笔记 ...</div>}
                {noteList.length > 0 && !isRatelimited && (
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {noteList.map((note, id) => (
                            <div>
                                <Notecard key={note._id} note={note} setNoteList={setNoteList}/>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage
