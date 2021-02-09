console.log("ciaoooooo");
//self.registration.showNotification('Ciao');

var lists;
var schedules = [];


self.addEventListener('message', ({ data })=>{
    if (data && data.type === "update_lists" ) {
        lists = data.lists;
    }
    findSchedules();
});

function findSchedules(){
    console.log("Sto per cercare le schedules");
    for (var i in lists){
        var tasks = lists[i].tasks;
        for (var j in tasks){
            if(tasks[j].date != null || tasks[j].time != null)
                console.log(tasks[j].date + " " + tasks[j].time);
        }
    }
}

function sendNotification(title, text){
    self.registration.showNotification(title, {
        body: text,
    });
}
