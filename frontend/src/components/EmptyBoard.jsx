import { NotebookIcon } from "lucide-react"
import { Link } from "react-router"

const EmptyBoard = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
            <div className="bg-primary/10 rounded-full p-8">
                <NotebookIcon className="size-10 text-primary" />
            </div>
            <h3 className="text-2xl font-bold">猫咪没有笔记啦 &gt; &lt; </h3>
            <Link to='/create' className="btn btn-primary">新建笔记</Link>
        </div>
    )
}

export default EmptyBoard
