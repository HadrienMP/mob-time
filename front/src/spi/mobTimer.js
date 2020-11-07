export function timeLeftIn(name, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            callback(JSON.parse(this.responseText));
        }
    };
    xhttp.open("GET", "/" + name + "/status", true);
    xhttp.send();
}