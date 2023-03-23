async function getAllEntries(){
    const url = new URL('/get', 'http://localhost:3033')
    console.log(url.href)
    fetch(url.href, {method: 'get'}).then((response) => response.json().then((data) => console.log(data)))
}

function writeNewEntry(){
    const username = document.getElementById('usernameInput').value
    const posttitle = document.getElementById('titleInput').value
    const posttext = document.getElementById('textInput').value
    const url = new URL('/post', 'http://localhost:3033')
    console.log(url);
    const newEntry = {
        text: posttext,
        title: posttitle,
        username: username
    };
    // url.search = new URLSearchParams({text: posttext, title: posttitle, username: username});
    // console.log(url)
    fetch(url.href, { 
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
     });
    console.log(JSON.stringify(newEntry));
}

function clearChat(){
    const url = new URL('/delete', 'http://localhost:3033')
    fetch(url.href, { 
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
     });
     getAllEntries();
}

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            callback(null, xhr.response);
        } else {
            callback(status, xhr.response);
        }
    };
    xhr.send();
};

document.querySelector('#postButton').addEventListener('click', () => writeNewEntry())
document.querySelector('#reloadButton').addEventListener('click', () => getAllEntries())
document.querySelector('#clearChat').addEventListener('click', () => clearChat())

