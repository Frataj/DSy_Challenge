async function getAllEntries(){
    const allTweets = await fetchTweets();
    const tweetList = document.querySelector('#allTweets');
    tweetList.innerHTML = '';
    allTweets.forEach((tweet) => {
        const li = `<h3>${tweet.username}</h3><h2>${tweet.title}</h2>${tweet.text}<p></p>`;
        tweetList.insertAdjacentHTML('afterbegin', li);
    })
}

async function fetchTweets(){
    const url = new URL('/get', 'http://localhost:3033');
    const response = await fetch(url.href, {method: 'get'});
    const data = await response;
    return data.json();
}

async function writeNewEntry(){
    const username = document.getElementById('usernameInput').value;
    const posttitle = document.getElementById('titleInput').value;
    const posttext = document.getElementById('textInput').value;
    document.getElementById('usernameInput').value='';
    document.getElementById('titleInput').value='';
    document.getElementById('textInput').value='';
    const url = new URL('/post', 'http://localhost:3033');
    const newEntry = {
        text: posttext,
        title: posttitle,
        username: username
    };
    await fetch(url.href, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEntry)
     });
    await getAllEntries();
}

async function clearChat(){
    const url = new URL('/delete', 'http://localhost:3033')
    await fetch(url.href, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
     });
     await getAllEntries();
}

document.querySelector('#postButton').addEventListener('click', () => writeNewEntry())
document.querySelector('#reloadButton').addEventListener('click', () => getAllEntries())
document.querySelector('#clearChat').addEventListener('click', () => clearChat())

