async function getLists(axios){
    return await axios.$get('api/lists/')
}

async function getTasks(axios, list){
    let lists = await axios.$get('/api/list/' + list)
    return lists
}

async function getTaskCount(axios, list_id){
    let c = await axios.$get('/api/nTasks/' + list_id)
    return c
}

export default {
    getLists,
    getTasks,
    getTaskCount
}