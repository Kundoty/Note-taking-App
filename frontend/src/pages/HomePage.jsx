import { useState, useEffect} from 'react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

import Navbar from '../components/Navbar.jsx'
import RatelimitUI from '../components/RatelimitUI.jsx'

const HomePage = () => {
    const [isRatelimited, setIsRatelimited] = useState(false);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                //const res = await fetch('http:localhost:8080/note');
                //const data = await res.json();
                const res = await axios.get('http://localhost:8080/note');
                setNotes(res.data);
                setIsRatelimited(false);
                console.log(res.data);
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
                {loading && <div className='text-center text-primary py-10'>Loading ...</div>}
                {notes.length > 0 && !isRatelimited && (1)}
            </div>
        </div>
    )
}

export default HomePage
