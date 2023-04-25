async function getAllTweets(){
    const allTweets = await fetchTweets();
    const tweetList = document.querySelector('#allTweets');
    tweetList.innerHTML = '';
    allTweets.forEach((tweet) => {
        const li = `<h3>${tweet.username}</h3><h2>${tweet.title}</h2>${tweet.text}<p></p>`;
        tweetList.insertAdjacentHTML('afterbegin', li);
    })
}

setInterval(function() {
    fetchTweets();
}, 1000);

async function fetchTweets(){
    const url = new URL('/api/get', 'https://localhost');
    const response = await fetch(url.href, {method: 'get'});
    const data = await response;
    return data.json();
}

async function writeNewTweet(){
    const username = document.getElementById('usernameInput').value;
    const posttitle = document.getElementById('titleInput').value;
    const posttext = document.getElementById('textInput').value;
    document.getElementById('usernameInput').value='';
    document.getElementById('titleInput').value='';
    document.getElementById('textInput').value='';
    const url = new URL('/api/post', 'https://localhost');
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
    await getAllTweets();
}

async function clearExistingTweets(){
    const url = new URL('/api/delete', 'https://localhost')
    await fetch(url.href, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
     });
     await getAllTweets();
}

document.querySelector('#postButton').addEventListener('click', () => writeNewTweet())
document.querySelector('#reloadButton').addEventListener('click', () => getAllTweets())
document.querySelector('#clearChat').addEventListener('click', () => clearExistingTweets())

