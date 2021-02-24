
function setToken(axios, token){
    axios.setToken(token, 'Bearer');
    localStorage.setItem('token', token)
}

async function getLists(axios){
    return await axios.$get('api/lists/')
}

////////TASKS/////////
async function getTasks(axios, list){
    let lists = await axios.$get('/api/tasks/' + list)
    return lists
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


async function refreshToken(axios){
    let token = await axios.$post('/api/token/refresh/', {
        'refresh': localStorage.getItem('refresh')
    })
    return token
}



export default {
    setToken,
    getLists,
    getTasks,
    createTask,
    checkTask,
    deleteTask,
    refreshToken,
}