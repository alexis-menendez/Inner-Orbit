// File: client/src/components/dashboard/pomodoro/FocusTaskList.tsx

import React, { useState } from 'react';
import { Task, useTaskStore } from '../../../hooks/useTaskStore';
import styles from '../../../assets/css/dashboard/PomodoroTimer.module.css';

interface FocusTaskListProps {
  onTaskAdd?: () => void; // ✅ Optional callback to trigger pet animation
}

const FocusTaskList: React.FC<FocusTaskListProps> = ({ onTaskAdd }) => {
  const {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    selectedTaskId,
    selectTask,
  } = useTaskStore();

  const [newTask, setNewTask] = useState('');

  return (
    <div className={styles.taskContainer}>
      <h3 className={styles.header}>Task Timer</h3>

      <div className={styles.inputGroup}>
        <input
          className={styles.input}
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task..."
        />
        <button
          onClick={() => {
            if (newTask.trim() !== '') {
              addTask(newTask);             // ✅ Add the task
              onTaskAdd?.();                // ✅ Trigger animation (leg lift)
              setNewTask('');               // ✅ Clear input
            }
          }}
          className={styles.addButton}
        >
          Add
        </button>
      </div>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskItem} ${selectedTaskId === task.id ? styles.selected : ''}`}
            onClick={() => selectTask(task.id)}
          >
            <span
              onClick={(e) => {
                e.stopPropagation();
                toggleTask(task.id);
              }}
              className={task.done ? styles.completed : ''}
            >
              {task.text}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(task.id);
              }}
              className={styles.deleteButton}
              title="Delete task"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FocusTaskList;
