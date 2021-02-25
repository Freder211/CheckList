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

export default {
    getSelectedList,
    setTheme,
    isDark,
}