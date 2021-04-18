import {RECEIVE_ENTRIES,ADD_ENTRY,MARK_COMPLETED, DELETE_TASK} from '../Actions/index'
function Tasks(state={},action)
{
    switch(action.type)
    {
        case RECEIVE_ENTRIES:
            console.log('IN RECEIVE ENTRIES')
            return{
                ...state,
                ...action.entries
            }
        case ADD_ENTRY:
            console.log('In add entry')
            return{
                ...state,
                ...action.task
            }
        case MARK_COMPLETED:
            return{
                ...state,
                [action.id]:{
                    ...state[action.id],
                    completed:true
                }
            }
        case DELETE_TASK:
            let ans={};
            Object.keys(state).map((ID)=>{
                if(action.id!==ID)
                {
                    ans={
                        ...ans,
                        [ID]:state[ID]
                    }
                }
            })
            return{
                ...ans,
            }
        default:
            console.log('IN DEFAULT STATE',action);
            return {
                ...state
            }
    }
}

export default Tasks;