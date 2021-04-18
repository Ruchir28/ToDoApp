export const RECEIVE_ENTRIES='RECEIVE_ENTRIES';
export const ADD_ENTRY='ADD_ENTRY';
export const MARK_COMPLETED='MARK_COMPLETED';
export const DELETE_TASK='DELETE_TASK';
import { saveTask, getAllTasks, markCompleted, deleteTask } from '../Utils/helper';
import { getTasks } from '../Utils/Data';

export const receiveEntriesHandler=()=>{
return async(dispatch)=>{
    let tasks=getTasks();
    let tasks1=await getAllTasks();
    tasks={
        ...tasks,
        ...tasks1
    }
    dispatch(receiveEntries(tasks));
}
}

export const receiveEntries=(entries)=>{
    return{
        type:RECEIVE_ENTRIES,
        entries
    }
}

export const addEntryHandler=(name,priority,dueBy)=>
{
    return async (dispatch)=>{
        let task=await saveTask(name,priority,dueBy);
        dispatch(addEntry(task))
    }
}
export const addEntry=(task)=>
{
    return{
        type:ADD_ENTRY,
        task,
    }
}

export const markCompletedHandler=(id)=>{
    return async (dispatch)=>{
        await markCompleted(id);
        dispatch(markComplete(id))
    }
}
export const markComplete=(id)=>{
    return{
        type:MARK_COMPLETED,
        id
    }
}
export const DeleteTaskHandler=(id)=>{
    return async (dispatch)=>{
        dispatch(deleteTaskAction(id))
        deleteTask(id);
    }
}
export const deleteTaskAction=(id)=>{
    return{
        type:DELETE_TASK,
        id
    }
}