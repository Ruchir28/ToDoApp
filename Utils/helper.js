
import { AsyncStorage } from 'react-native';
const API_KEY='TASsacajnmdmwK_AP';


export const saveTask=async (name,priority,dueby)=>{
    let key=Date.now();
    let task=
    {
        name,
        priority,
        completed:false,
        dueby
    }
    let store=await AsyncStorage.getItem(API_KEY).then(JSON.parse);
    store={
        ...store,
        [key]:task
    }
    await AsyncStorage.setItem(API_KEY,JSON.stringify(store));
    return {[key]:task};
}
export const getAllTasks=async()=>{
let tasks=await AsyncStorage.getItem(API_KEY).then(JSON.parse);
return tasks;
}
export const markCompleted=async (id)=>{
    let tasks=await AsyncStorage.getItem(API_KEY).then(JSON.parse);
    tasks={
        ...tasks,
        [id]:{
            ...tasks[id],
            completed:true
        }
    }
    await AsyncStorage.setItem(API_KEY,JSON.stringify(tasks));
}
export const deleteTask=async (id)=>{
    let tasks=await AsyncStorage.getItem(API_KEY).then(JSON.parse);
    let ans={};
    Object.keys(tasks).map((ID)=>{
        if(id!==ID)
        {
            ans={
                ...ans,
                [ID]:tasks[ID]
            }
        }
    })
    await AsyncStorage.setItem(API_KEY,JSON.stringify(ans));
}