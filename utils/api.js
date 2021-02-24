
function setToken(axios, token){
    axios.setToken(token, 'Bearer');
    localStorage.setItem('token', token)
}

async function getLists(axios){
    return await axios.$get('api/lists/')
}

async function getTasks(axios, list){
    let lists = await axios.$get('/api/tasks/' + list)
    return lists
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
    refreshToken,
}