import React from 'react'
import {toast} from 'react-hot-toast'

const HomePage = () => {
    return (
        <div>
            <button onClick={() => toast.success("成功")}>click</button>
            This is home page
        </div>
    )
}

export default HomePage
