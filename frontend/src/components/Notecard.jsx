import React from 'react'
import { Link } from 'react-router'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import axios from 'axios'
import datetime from '../utils/convertTime.js'
import toast from 'react-hot-toast'

const Notecard = ({ note, setNoteList }) => {
    const handleDelete = async (e, id) => {
        e.preventDefault();

        if (!window.confirm('确定要删除这条笔记吗？')) return;

        try {
            await axios.delete(`http://localhost:8080/note/${id}`);
            setNoteList(NoteList => NoteList.filter(note => note._id !== id)) // filter out the deleted note, update state of note list on home page
            toast.success('笔记删除成功');
        } catch (error) {
            console.error("Failed to delete note:", error);
            toast.error('删除笔记失败，请重试');
        }
    }

    return (
        <Link to={`/note/${note._id}`} className='card bg-base-100 hover:shadow-lg transition-all duration-300 border-t-4 border-solid border-blue-300'>
            <div className='card-body'>
                <h2 className='card-title text-base-content'>{note.title}</h2>
                <p className='text-base-content/70 line-clamp-3'>{note.description}</p>
                <div className='card-actions justify-between items-center mt-4'>
                    <span className='text-sm text-base-content/60'>{datetime(new Date(note.createdAt))}</span>
                    <div className='flex items-center gap-1'>
                        <PenSquareIcon className='size-4'/>
                        <button className='btn btn-ghost btn-xs text-error' onClick={(e) => handleDelete(e, note._id)}>
                            <Trash2Icon className='size-4'/>
                        </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Notecard
