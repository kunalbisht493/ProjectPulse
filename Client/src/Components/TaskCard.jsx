function TaskCard({ task }) {
    return (
        <div
            className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200/50 hover:border-blue-200/50 cursor-pointer group"
        >
            <h4 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {task.description}
            </h4>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {task.assignedTo?.name || task.assignedTo}
            </p>
            <div className="flex items-center justify-between text-xs">
                <span
                    className={`px-2 py-1 rounded-full ${task.priority === "high"
                        ? "bg-red-100 text-red-600"
                        : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-green-100 text-green-600"
                        }`}
                >
                    {task.priority}
                </span>
                {task.dueDate && (
                    <span className="text-gray-500">
                        {new Date(task.dueDate).toLocaleDateString()}
                    </span>
                )}
            </div>
        </div>
    );
}

export default TaskCard;
