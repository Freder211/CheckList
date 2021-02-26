function getSelectedList(){
    let list = localStorage.getItem('selectedList');
    list = JSON.parse(list);
    return list;
}

//THEME

function setTheme(dark) {
    localStorage.setItem('dark', dark);
}

function isDark() {
    return localStorage.getItem('dark') == 'true';
}

//check date
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

export default {
    getSelectedList,
    setTheme,
    isDark,
    date,
}