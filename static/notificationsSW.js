self.addEventListener('message', ({ data })=>{
    if(data && data.type==='send_notfication'){
        sendNotification(data.title, data.text);
    }
});

function sendNotification(title, text){
    self.registration.showNotification(title, {
        body: text,
        icon: 'homer.png'
    });
    
}