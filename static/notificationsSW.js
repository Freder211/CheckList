console.log("ciaoooooo");
//self.registration.showNotification('Ciao');

var tasks=[];


self.addEventListener('message', ({ data })=>{
    if (data && data.type === "new_task" ) {
        tasks.push({
            id: data.task.id,
            name: data.task.name,
            text: data.task.text,
            moment: data.task.moment,
        });
    }
    else if(data && data.type === "delete_task"){
        for(var i in tasks){
            if(tasks[i].id == data.id){
                tasks.splice(i, 1);
                break;
            }
        }
    }
});

function findSchedules(){
    findSchedules = [];
    for (var i in lists){
        var tasks = lists[i].tasks;
        for (var j in tasks){
            if(tasks[j].date != null || tasks[j].time != null)
                if(tasks[j].notified==false)
                    schedules.push({
                        'task': tasks[j],
                        'listName': lists[i].name,
                        'deadLine': date(tasks[j].date, tasks[j].time),
                    });
        }
    }
}

function sendNotification(title, text){
    self.registration.showNotification(title, {
        body: text,
    });
    
}
setInterval(() => {
    var now = new Date();
    for(var i in tasks){
        if(tasks[i].moment < now){
            var task = tasks[i];
            sendNotification(task.name, task.text);
            tasks.splice(i, 1);
        }
    }
}, 3000)