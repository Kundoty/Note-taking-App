import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router'
import axios from 'axios';
import toast from 'react-hot-toast';
import { LoaderIcon } from 'react-hot-toast';
import { ArrowLeftIcon, Trash2Icon } from 'lucide-react';

const NoteDetailPage = () => {
    const [note, setNote] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const naviagte = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/note/${id}`);
                setNote(res.data);
            } catch (error) {
                console.log("Failed to fetch note:", error);
                toast.error('获取笔记详情失败，请重试');
            } finally {
                setLoading(false);
            }
        }
        fetchNote();
    }, [id])

    if (loading) {
        return (
            <div className='min-h-screen bg-base-200 flex items-center justify-center'>
                <LoaderIcon className='animate-spin size-10' />
            </div>
        )
    }

    const handleDelete = async () => {
        if (!window.confirm('确定要删除这条笔记吗？')) return;

        try {
            await axios.delete(`http://localhost:8080/note/${id}`);
            toast.success('笔记删除成功');
            naviagte('/');
        } catch (error) {
            toast.error('删除笔记失败，请重试');
            console.error("Failed to delete note:", error);
        }
    }

    const handleSave = async () => {
        if (!note.title.trim() || !note.description.trim()) {
            toast.error('标题和内容不能为空');
            return;
        }

        setSaving(true);
        try {
            await axios.put(`http://localhost:8080/note/${id}`, {
                title: note.title,
                description: note.description
            });
            console.log('this step')
            toast.success('笔记更新成功');
            naviagte('/');
        } catch (error) {
            toast.error('删除更新失败，请重试');
            console.error("Failed to update note:", error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-0 px-4 py-8'>
                <div className="max-w-2xl mx-auto">
                    <div className='flex items-center justify-between mb-6'>
                        <Link to='/' className='btn btn-ghost'>
                            <ArrowLeftIcon className='size-5' />
                            返回
                        </Link>
                        <button onClick={handleDelete} className='btn btn-error btn-outline'>
                            <Trash2Icon className='size-5' />
                            删除笔记
                        </button>
                    </div>
                    <div className='card bg-base-100'>
                        <div className="card-body">
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Title</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder={note.title || 'title'}
                                    className='input input-bordered'
                                    value={note.title}
                                    onChange={(e) => setNote({ ...note, title: e.target.value })}
                                />
                            </div>
                            <div className='form-control mb-4'>
                                <label className='label'>
                                    <span className='label-text'>Description</span>
                                </label>
                                <textarea 
                                    placeholder=''
                                    className='textarea textarea-bordered h-32'
                                    value={note.description || '内容'}
                                    onChange={(e) => setNote({ ...note, description: e.target.value })}
                                />

                            </div>
                            <div className="card-actions justify-end">
                                <button className='btn btn-primary' disabled={saving} onClick={handleSave}>
                                    {saving ? '保存中...' : '保存笔记'}
                                </button>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteDetailPage
