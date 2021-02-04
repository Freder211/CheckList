console.log("ciaouu");



function askNotPerm(){

    if (!('Notification' in window)){
        console.log("This browser does not support notifications.");
    }
    else{
        if(checkNotificationPromise()){
            Notification.requestPermission().then()
        }

    }

}

function checkNotificationPromise() {
    try {
      Notification.requestPermission().then();
    } catch(e) {
      return false;
    }

    return true;
}

export default{
    askNotPerm
}
