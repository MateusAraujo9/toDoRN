import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let taskList = tasks.map(task => ({ ...task }));
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    taskList = [...taskList, newTask];

    setTasks(taskList);
  }

  function handleToggleTaskDone(id: number) {
    let taskList = tasks.map(task => ({ ...task }));
    taskList = taskList.map(task => {
      if(task.id === id) {
        task.done = !task.done;
      }
      
      return task;
    });

    setTasks(taskList);
  }

  function handleRemoveTask(id: number) {
    let taskList = tasks.map(task => ({ ...task }));
    taskList = taskList.filter((item)=>(item.id !== id));
    setTasks(taskList);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})