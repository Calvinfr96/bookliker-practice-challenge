//Fetch book data
function fetchBooks() {
    return fetch('http://localhost:3000/books').then(resp => resp.json())
}

fetchBooks().then(books => console.log(books))
fetchBooks().then(books => books.forEach(book => {
    const bookLi = createLiFromBook(book)
    addEventToBook(bookLi, book)
    appendLiToDom(bookLi)
}))

//Create li element containing book title
function createLiFromBook(book) {
    const bookLi = document.createElement('li');
    bookLi.innerText = book.title
    return bookLi
}

//Append li element to DOM
function appendLiToDom(bookLi) {
    const list = document.getElementById('list');
    list.appendChild(bookLi)
}

//Add event listener to book
function addEventToBook(bookLi, book) {
    bookLi.addEventListener('click', function () {
        const showPanel = document.getElementById('show-panel');
        showPanel.innerHTML = ''
        appendDivToDom(createDivFromBook(book))
    })
}

//Create div element for each book containing the book's thumbnail, description, and list of users who have liked the book
function createDivFromBook(book) {
    const bookDiv = document.createElement('div');
    const thumbnail = document.createElement('img');
    thumbnail.src = book['img_url'];
    const bookDescription = document.createElement('p');
    bookDescription.innerText = book.description
    const likeList = document.createElement('ul')
    book.users.forEach(book => {
        const li = document.createElement('li');
        li.innerText = book.username
        likeList.appendChild(li)
    })
    const likeBtn = document.createElement('button');
    likeBtn.id = book.id;
    likeBtn.innerText = 'Like'
    addEventToLike(likeBtn, book, likeList)
    bookDiv.appendChild(thumbnail)
    bookDiv.appendChild(bookDescription)
    bookDiv.appendChild(likeList)
    bookDiv.appendChild(likeBtn)
    return bookDiv
}

//Append div element to DOM
function appendDivToDom(bookDiv) {
    const showPanel = document.getElementById('show-panel');
    showPanel.appendChild(bookDiv)
}

//Add Event Listener to like button
function addEventToLike(likeBtn, book, likeList) {
    const user1 = { "id": 1, "username": "pouros" }
    likeBtn.addEventListener('click', function () {
        addLike(book, user1)
        const li = document.createElement('li')
        li.innerText = user1.username;
        likeList.appendChild(li)
    })
}

//Make patch request to server adding like
function addLike(book, user1) {
    book.users.push(user1)
    const configObj = {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            users: book.users
        })
    }
    fetch(`http://localhost:3000/books/${book.id}`, configObj)
        .then(resp => resp.json())
        .then(data => console.log(data))
}
