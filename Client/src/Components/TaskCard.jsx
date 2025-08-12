// components/TaskCard.jsx
import { GripVertical } from 'lucide-react';

function TaskCard({ task, dragHandleProps = {}, isDragging = false, isDragOverlay = false }) {
    return (
        <div
            className={`bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm transition-all duration-200 border border-gray-200/50
                ${isDragging ? 'opacity-50 shadow-xl scale-105 border-blue-300/70 bg-white/90 z-50' : 'hover:shadow-md hover:border-blue-200/50 hover:bg-white/90'}
                relative group cursor-pointer`}
        >
            {/* Drag Handle (hidden in overlay) */}
            {!isDragOverlay && (
                <div
                    {...dragHandleProps}
                    className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-grab active:cursor-grabbing p-1 rounded hover:bg-gray-100/50"
                    aria-label="Drag task"
                >
                    <GripVertical size={14} className="text-gray-400 hover:text-gray-600" />
                </div>
            )}

            <div className="pr-6">
                <h4 className="font-medium text-gray-800 mb-2 group-hover:text-blue-600 transition-colors leading-snug">
                    {task.description}
                </h4>

                {task.assignedTo && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        <span className="text-gray-500">Assigned to:</span> {task.assignedTo?.name || task.assignedTo}
                    </p>
                )}

                <div className="flex items-center justify-between text-xs gap-2">
                    <span
                        className={`px-2.5 py-1 rounded-full font-medium ${
                            task.priority === "high"
                                ? "bg-red-100/80 text-red-700 border border-red-200/50"
                                : task.priority === "medium"
                                ? "bg-yellow-100/80 text-yellow-700 border border-yellow-200/50"
                                : "bg-green-100/80 text-green-700 border border-green-200/50"
                        }`}
                    >
                        {task.priority?.charAt(0).toUpperCase() + task.priority?.slice(1)}
                    </span>

                    {task.dueDate && (
                        <span className="text-gray-500 bg-gray-50/50 px-2 py-1 rounded border border-gray-200/30">
                            {new Date(task.dueDate).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                            })}
                        </span>
                    )}
                </div>
            </div>

            {/* Dragging visual */}
            {isDragging && (
                <div className="absolute inset-0 bg-blue-50/20 rounded-lg border-2 border-dashed border-blue-300/40 pointer-events-none" />
            )}
        </div>
    );
}

export default TaskCard;
