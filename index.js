const myLibrary = [
    {
        title: 'Notes from Underground',
        author: 'Fyodor Mikhailovich Dostoevsky',
        pages: 176,
        haveRead: true
    },
    {
        title: 'The Idiot',
        author: 'Fyodor Mikhailovich Dostoevsky',
        pages: 768,
        haveRead: false
    },
    {
        title: 'Crime and Punishment',
        author: 'Fyodor Mikhailovich Dostoevsky',
        pages: 671,
        haveRead: true
    },
    {
        title: 'The Brothers Karamazov',
        author: 'Fyodor Mikhailovich Dostoevsky',
        pages: 824,
        haveRead: false
    },
    {
        title: 'The Gambler',
        author: 'Fyodor Mikhailovich Dostoevsky',
        pages: 160,
        haveRead: false
    }
]

const booksContainer = document.querySelector('.books-container');
const addNewBook = document.querySelector('#add-new-book');
const newBook = document.querySelector('#new-book-form');

addNewBook.addEventListener('click', () => {
    newBook.style.display = 'block';
});

function renderBooks(){
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <button class="read-status">${book.haveRead ? 'Read' : 'Not Read'}</button>
            <button class="remove-book">Remove</button>
        `
        booksContainer.appendChild(bookCard);
    })

    // Add event listeners for "Remove" and "Read Status" buttons
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.parentElement.remove();
        });
    });

    document.querySelectorAll('.read-status').forEach(button => {
        button.addEventListener('click', (e) => {
            const newStatus = e.target.textContent === 'Read' ? 'Not Read' : 'Read';
            e.target.textContent = newStatus;
        });
    });
}

renderBooks();

newBook.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = newBook.querySelector('#book-title').value;
    const author = newBook.querySelector('#author-name').value;
    const pages = newBook.querySelector('#pages-count').value;
    const haveRead = newBook.querySelector('#have-read').checked;
    booksContainer.innerHTML = ""
    addBookToLibrary(title, author, pages, haveRead);
    renderBooks();
});

// Constructor function for Book
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}
  
function addBookToLibrary(title, author, pages, haveRead) {
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.unshift(newBook);
}


