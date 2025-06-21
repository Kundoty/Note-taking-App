import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import { ArrowLeftIcon } from 'lucide-react'
import { toast } from 'react-hot-toast'
import axios from 'axios'

const CreatePage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            toast.error('标题和内容不能为空');
            return;
        }

        setLoading(true);
        try {
            await axios.post('/note', {
                title,
                description
            })
            toast.success('笔记创建成功');
            navigate('/');
        } catch (error) {
            toast.error('创建笔记失败，请重试');
            console.error("failed creating note:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='min-h-screen bg-base-200'>
            <div className='container mx-auto px-4 py-8'>
                <div className='max-2xl mx-auto'>
                    <Link to={'/'} className='btn btn-ghost mb-6'>
                        <ArrowLeftIcon className='size-5' />
                        返回
                    </Link>
                    <div className='card bg-base-100'>
                        <div className='card-body'>
                            <h2 className='card-title text-2xl mb-4'>创建新笔记</h2>
                            <form onSubmit={handleSubmit}>
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>Title</span>
                                    </label>
                                    <input type="text" 
                                        placeholder='笔记标题'
                                        className='input input-bordered'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}/>
                                </div>
                                <div className='form-control mb-4'>
                                    <label className='label'>
                                        <span className='label-text'>Description</span>
                                    </label>
                                    <textarea 
                                        placeholder='内容'
                                        className='textarea textarea-bordered h-32'
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}/>
                                </div>
                                <div className="card-actions justify-end">
                                    <button type='submit' className='btn btn-primary' disabled={loading}>
                                        {loading ? '创建中...' : '创建笔记'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePage
