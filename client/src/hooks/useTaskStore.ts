// File: client/src/hooks/useTaskStore.ts

import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  text: string;
  done: boolean;
}

export const useTaskStore = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) {
      const parsed = JSON.parse(stored);
      setTasks(parsed.tasks);
      setSelectedTaskId(parsed.selectedTaskId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify({ tasks, selectedTaskId }));
  }, [tasks, selectedTaskId]);

  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text, done: false };
    setTasks(prev => [...prev, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const deleteTask = (id: number) => {
    setTasks(prev => prev.filter(t => t.id !== id));
    if (selectedTaskId === id) setSelectedTaskId(null);
  };

  const selectTask = (id: number) => {
    setSelectedTaskId(id);
  };

  const getSelectedTask = () => tasks.find(t => t.id === selectedTaskId) || null;

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    selectedTaskId,
    selectTask,
    getSelectedTask,
  };
};
