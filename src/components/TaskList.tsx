import React from 'react';
import { CheckCircle2, Circle, Clock, GripVertical, Trash2 } from 'lucide-react';
import { useTaskStore } from '../store/taskStore';
import type { Task } from '../types/task';
import { motion, AnimatePresence } from 'framer-motion';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { DragEndEvent } from '@dnd-kit/core';

const statusIcons = {
  'pending': <Circle className="w-5 h-5 text-gray-400" />,
  'in-progress': <Clock className="w-5 h-5 text-yellow-500" />,
  'completed': <CheckCircle2 className="w-5 h-5 text-green-500" />
};

function SortableTask({ task }: { task: Task }) {
  const { updateTask, deleteTask } = useTaskStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    transition,
  } : undefined;

  const handleStatusChange = () => {
    const statusFlow: Record<Task['status'], Task['status']> = {
      'pending': 'in-progress',
      'in-progress': 'completed',
      'completed': 'pending'
    };
    updateTask(task.id, statusFlow[task.status]);
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex items-start gap-4"
    >
      <button
        className="cursor-grab active:cursor-grabbing touch-none"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </button>

      <button
        onClick={handleStatusChange}
        className="mt-1"
      >
        {statusIcons[task.status]}
      </button>
      
      <div className="flex-1">
        <h3 className="font-medium text-gray-900 dark:text-white">{task.title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{task.description}</p>
      </div>

      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:text-red-700"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </motion.div>
  );
}

export function TaskList() {
  const { tasks, isLoading, reorderTasks } = useTaskStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex(task => task.id === active.id);
      const newIndex = tasks.findIndex(task => task.id === over.id);
      reorderTasks(oldIndex, newIndex);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8 text-gray-500 dark:text-gray-400">Loading tasks...</div>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <AnimatePresence>
            {tasks.map((task) => (
              <SortableTask key={task.id} task={task} />
            ))}
          </AnimatePresence>
        </SortableContext>

        {tasks.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No tasks yet. Add your first task above!
          </div>
        )}
      </div>
    </DndContext>
  );
}