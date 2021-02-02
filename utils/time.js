var currentTime = [new Date()];
window.setInterval(() => {
    console.log("aggiornato");
    currentTime = new Date();
    triggerEvent(currentTime);
}, 10000);

function getCurTime(){
    return currentTime;
}

function triggerEvent(currentTime) {
    var event = new CustomEvent("timeUpdate",{ 
        detail:  {
            message: "timeUpdate",
            info: currentTime
    }});
}

export default{
    getCurTime
}
