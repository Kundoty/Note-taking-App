import React from 'react'
import {toast} from 'react-hot-toast'

const HomePage = () => {
    return (
        <div>
            <button onClick={() => toast.success("点击成功")} className='bg-red-300 p-4 text-blue-400'>click</button>
            <h1>This is home page</h1>
        </div>
    )
}

export default HomePage
