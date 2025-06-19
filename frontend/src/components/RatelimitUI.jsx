import React from 'react'

const RatelimitUI = () => {
    return (
        <div>
            <div className="alert alert-warning shadow-lg">
                <div>
                    {/* <span className="font-bold ml-2">You have exceeded the allowed number of requests. Please try again later.</span> */}
                    <span className="font-bold ml-2">您的请求次数已达上限，请一分钟后再试</span>
                </div>
            </div>
            <div className="mt-4">
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                    重试
                </button>
            </div>
        </div>
    )
}

export default RatelimitUI
