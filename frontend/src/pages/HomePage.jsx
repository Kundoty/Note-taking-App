import React from 'react'
import {toast} from 'react-hot-toast'

const HomePage = () => {
    return (
        <div data-theme = "coffee">
            <button onClick={() => toast.success("点击成功")} className='btn btn-primary'>点击</button>
            <h1>This is home page</h1>
        </div>
    )
}

export default HomePage
