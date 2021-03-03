var deadlines = [];

//SERVICE WORKER
function sendNotificationToSw(title, text){
    navigator.serviceWorker.ready.then(
        worker => worker.active.postMessage({
            type: 'send_notfication',
            title,
            text
        })
    )
}

function updateDeadlines(tasks){
    deadlines = [];
    for(var task of tasks){
        addTaskToDeadlines(task);
    }
}

function addTaskToDeadlines(task){
    var now = new Date(); 
    if(task.date || task.time){
        task.moment = date(task.date, task.time);
        if(task.moment > now && !task.checked){
            deadlines.push(task);
        }
    }
}

function removeTaskFromDeadlines(id){
    for(var i in deadlines){
        if(deadlines[i].id == id){
            deadlines.splice(i, 1);
            break;
        }
    }
}


//////

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

setInterval( () => {
    var now = new Date();
    for (let i in deadlines){
        let task = deadlines[i];
        if(deadlines[i].moment <= now){
            sendNotificationToSw(task.name, task.text);
            deadlines.splice(i, 1);
        }
    }
}, 3000)

export default {
    addTaskToDeadlines,
    removeTaskFromDeadlines,
    updateDeadlines,
}