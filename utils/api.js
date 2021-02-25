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


//////////LISTS//////////
async function getLists(axios){
    return await axios.$get('api/lists/')
}

async function createList(axios, newList){
    return await axios.$post(`/api/list/`, newList)
}

async function patchList(axios, list_id, name){
    return await axios.$patch(
        `/api/list/${list_id}/`,
        {'name': name}
    )
}

async function deleteList(axios, list_id){
    return await axios.$delete(`/api/list/${list_id}/`)
}

////////TASKS/////////
async function getTasks(axios, list){
    return await axios.$get('/api/tasks/' + list)
}

async function createTask(axios, list_id, new_task){
    return await axios.$post(`/api/task/${list_id}/`, new_task)
} 

async function checkTask(axios, list_id, task_id, checked){
    return await axios.$patch(
        `/api/task/${list_id}/${task_id}/`,
        {'checked': checked}
    )
}

async function deleteTask(axios, list_id, task_id){
    return await axios.$delete(`/api/task/${list_id}/${task_id}/`)
}




export default {
    setToken,
    refreshToken,

    getLists,
    createList,
    patchList,
    deleteList,

    getTasks,
    createTask,
    checkTask,
    deleteTask,
}