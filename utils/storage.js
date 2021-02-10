if (localStorage.getItem('lists') == undefined) {
    localStorage.setItem('lists', JSON.stringify([]));
    localStorage.removeItem('selectedList');
}

//SERVICE WORKER
function sendTaskToSW(task){
    console.log(date(task.date, task.time));
    task.moment = date(task.date, task.time);
    if(task.moment > new Date() && !task.checked)
        navigator.serviceWorker.ready.then(
            worker => worker.active.postMessage({
                type: 'new_task',
                task
            })
        )
}

function deleteTaskToSW(id){
    navigator.serviceWorker.ready.then(
        worker => worker.active.postMessage({
            type: 'delete_task',
            id: id
        })
    )
}


//MODIFICA LISTE
function newList(list) {
    var lists = JSON.parse(localStorage.getItem('lists'));
    lists.push(list);
    localStorage.setItem('lists', JSON.stringify(lists));
}

function removeList(id) {
    var lists = JSON.parse(localStorage.getItem('lists'));
    for (var i in lists) {
        if (lists[i].id == id) {
            lists.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function renameList(id, newName) {
    var lists = JSON.parse(localStorage.lists);
    for (var i in lists) {
        if (lists[i].id == id) {
            lists[i].name = newName;
            break;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function updateList(list, id) {
    var lists = JSON.parse(localStorage.lists);
    for (var i in lists) {
        if (lists[i].id == id) {
            lists[i] = list;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function getComplitedTasks(id) {
    var counter = 0; //array che contiene task completate e quelle totali
    var lists = getAllLists();
    for (var i in lists) {
        if (lists[i].id == id) {
            var tasks = lists[i].tasks;
            for (var j in tasks) {
                counter += tasks[j].checked;
            }

            break;
        }
    }
    return counter;
}


//SELEZIONE LISTA
function getAllLists() {
    return JSON.parse(localStorage.getItem('lists'));
}

function setList(id) {
    localStorage.setItem('selectedList', id);
}

function getSelectedList() {
    var selectedList = localStorage.getItem('selectedList');

    if (selectedList == null) //se non esiste una lista selezionata restituisce -1
        return -1;

    var lists = JSON.parse(localStorage.lists);
    for (var i in lists) { //cerca nelle liste quella selezionata e la restituisce
        if (lists[i].id == selectedList) {
            return lists[i];
        }
    }
    return -1; //se non ha trovato la list nell'elenco delle liste, allora restituisce -1
}

function getList(id) {
    var lists = getAllLists();
    for (var i in lists) {
        if (lists[i].id == id)
            return lists[i];
    }
    return -1;
}


//TASKS

function addTask(task) {
    var list = getSelectedList();
    list.tasks.unshift(task);
    updateList(list, list.id);
    sendTaskToSW(task);
}

function removeTask(id) {
    var list = getSelectedList();
    for (var i in list.tasks) {
        if (list.tasks[i].id == id) {
            list.tasks.splice(i, 1);
            break;
        }
    }
    updateList(list, list.id);
    deleteTaskToSW(id);
}

function checkTask(id, value) {
    var list = getSelectedList();
    for (var i in list.tasks) {
        if (list.tasks[i].id == id) {
            list.tasks[i].checked = value;
            break;
        }
    }
    updateList(list, list.id);
    if(value)
        deleteTaskToSW(id);
    else{
        var list = getSelectedList();
        for(var i in list.tasks){
            if(list.tasks[i].id == id)
                sendTaskToSW(list.tasks[i]);
        }
    }
}

//CHECK DATE OF TASKS
function date(date, time) {
    if (date==null && time==null)
        return 0;

    var completeDate;
    var year, month, day;
    if(!!date){
    var splitDate=date.split("-");
    year=parseInt(splitDate[0]);
    month=parseInt(splitDate[1]-1);
    day=parseInt(splitDate[2]);
    }
    else{
    year = new Date().getFullYear();
    month = new Date().getMonth(); day = new Date().getDate(); }
       
    var hour, minute;
    if(!!time){
    var splittedTime = time.split(":");
    hour = parseInt(splittedTime[0]);
    minute = parseInt(splittedTime[1]);
    completeDate = new Date(year, month, day, hour, minute);
    }
    else{
    completeDate = new Date(year, month, day);
    }

    return completeDate; 
}


//THEME

function setTheme(dark) {
    localStorage.setItem('dark', dark);
}

function isDark() {
    return localStorage.getItem('dark') == 'true';
}

export default {
    getAllLists,
    newList,
    addTask,
    removeTask,
    setList,
    getSelectedList,
    updateList,
    removeList,
    renameList,
    checkTask,
    getComplitedTasks,
    getList,
    setTheme,
    isDark,
    sendTaskToSW,
    date
}