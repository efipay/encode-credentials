function darkmode() {
    var element = document.body;
    element.classList.toggle("dark-mode");

    if (localStorage.getItem("gn-darkmode") == 's') {
        localStorage.removeItem("gn-darkmode");
        localStorage.setItem("gn-darkmode", 'n');
    } else {
        localStorage.removeItem("gn-darkmode");
        localStorage.setItem("gn-darkmode", 's');
    }






}

function checkDarkmode() {
    let isDark = localStorage.getItem("gn-darkmode");
    var element = document.body;
    if (isDark == 's') {
        element.classList.add("dark-mode")
    } else {
        element.classList.remove("dark-mode")
    }
}