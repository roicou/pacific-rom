function getMap() {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", "http://localhost:3000/map", false); // false for synchronous request
    xmlHttp.send(null);
    return JSON.parse(xmlHttp.responseText);
}
