import notify from './notifications.js'

/////////TOKEN////////////
function setToken(axios, token){
    axios.setToken(token, 'Bearer');
    localStorage.setItem('token', token)
}

async function refreshToken(axios){
    return await axios.$post('/api/token/refresh/', {
        'refresh': localStorage.getItem('refresh')
    })
}

//////////USER//////////////
async function register(axios, credetials){
    return await axios.$post('/api/register/', credetials)
}

//////////LISTS//////////
async function getLists(axios){
    let lists = await axios.$get('api/lists/')
    return lists
}

async function createList(axios, newList){
    return await axios.$post(`/api/list/`, newList)
}

async function patchListName(axios, list_id, name){
    return await axios.$patch(
        `/api/list/${list_id}/`,
        {'name': name}
    )
}

async function patchListOrder(axios, list_id, order){
    return await axios.$patch(
        `/api/list/${list_id}/`,
        {'order': order}
    )
}

async function deleteList(axios, list_id){
    return await axios.$delete(`/api/list/${list_id}/`)
}

////////TASKS/////////
async function getTasks(axios, list_id, page = 1){
    return await axios.$get(`/api/tasks/${list_id}/${page}`)
}

async function createTask(axios, list_id, new_task){
    notify.addTaskToDeadlines(new_task)
    return await axios.$post(`/api/task/${list_id}/`, new_task)
} 

async function checkTask(axios, list_id, task_id, checked){
    return await axios.$patch(
        `/api/task/${list_id}/${task_id}/`,
        {'checked': checked}
    )
}

async function deleteTask(axios, list_id, task_id){
    notify.removeTaskFromDeadlines(task_id)
    return await axios.$delete(`/api/task/${list_id}/${task_id}/`)
}
////////DEADLINES///////
async function getDeadlines(axios){
    return await axios.$get('/api/deadlines/')
}



export default {
    setToken,
    refreshToken,

    register,

    getLists,
    createList,
    patchListName,
    patchListOrder,
    deleteList,

    getTasks,
    createTask,
    checkTask,
    deleteTask,

    getDeadlines,
}