if(localStorage.getItem('lists') == undefined){
    localStorage.setItem('lists', JSON.stringify([]));
    localStorage.removeItem('selectedList');
}

//MODIFICA LISTE
function newList(list){
    var lists = JSON.parse(localStorage.getItem('lists'));
    lists.push(list);
    localStorage.setItem('lists', JSON.stringify(lists));
}

function removeList(id){
    var lists = JSON.parse(localStorage.getItem('lists'));
    for (var i in lists){
        if(lists[i].id == id){
            lists.splice(i, 1);
            break;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function renameList(id, newName){
    var lists = JSON.parse(localStorage.lists);
    for (var i in lists){
        if(lists[i].id == id){
            lists[i].name = newName;
            break;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function updateList(list, id){
    var lists = JSON.parse(localStorage.lists);
    for (var i in lists){
        if(lists[i].id == id){
            lists[i] = list;
        }
    }
    localStorage.setItem('lists', JSON.stringify(lists));
}

function getComplitedTasks(id){
    var counter = 0; //array che contiene task completate e quelle totali
    var lists = getAllLists();
    for (var i in lists){
        if(lists[i].id == id){
            var tasks = lists[i].tasks;
            for(var j in tasks){
                counter += tasks[j].checked;
            }
            
            break;
        }
    }
    return counter;
}


//SELEZIONE LISTA
function getAllLists(){
    return JSON.parse(localStorage.getItem('lists'));
}

function setList(listName){
    localStorage.setItem('selectedList', listName);
}

function getSelectedList(){
    var selectedList = localStorage.getItem('selectedList');

    if(selectedList==null) //se non esiste una lista selezionata restituisce -1
        return -1;

    var lists = JSON.parse(localStorage.lists);
    for (var i in lists){ //cerca nelle liste quella selezionata e la restituisce
        if (lists[i].name == selectedList)
            return lists[i];
    }
    return -1; //se non ha trovato la list nell'elenco delle liste, allora restituisce -1
}

function getList(id){
    var lists = getAllLists();
    for (var i in lists){ 
        if (lists[i].id == id)
            return lists[i];
    }
    return -1;
}


//TASKS

function addTask(task){
    var list = getSelectedList();
    list.tasks.push(task);
    updateList(list, list.id);
}

function removeTask(id){
    var list = getSelectedList();
    for (var i in list.tasks){
        if(list.tasks[i].id==id){
            list.tasks.splice(i,1);
            break;
        }
    }
    updateList(list, list.id);
}

function checkTask(id, value){
    var list = getSelectedList();
    for (var i in list.tasks){
        if(list.tasks[i].id==id){
            list.tasks[i].checked=value;
            break;
        }
    }
    updateList(list, list.id);
}

//THEME

function setTheme(dark){
    localStorage.setItem('dark', dark);    
}

function isDark(){
    return localStorage.getItem('dark')=='true';
}

export default{
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
    isDark
}