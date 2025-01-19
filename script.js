// Array to store the library of books
const myLibrary = [
    { title: 'Notes from Underground', author: 'Fyodor Mikhailovich Dostoevsky', pages: 176, haveRead: true },
    { title: 'The Idiot', author: 'Fyodor Mikhailovich Dostoevsky', pages: 768, haveRead: false },
    { title: 'Crime and Punishment', author: 'Fyodor Mikhailovich Dostoevsky', pages: 671, haveRead: true },
    { title: 'The Brothers Karamazov', author: 'Fyodor Mikhailovich Dostoevsky', pages: 824, haveRead: false },
    { title: 'The Gambler', author: 'Fyodor Mikhailovich Dostoevsky', pages: 160, haveRead: false }
];

// DOM Elements
const booksContainer = document.querySelector('.books-container');
const addNewBookButton = document.querySelector('#add-new-book');
const newBookForm = document.querySelector('#new-book-form');
const dialog = document.querySelector('dialog');
const closeButton = document.querySelector('dialog button');

// Event Listeners
addNewBookButton.addEventListener('click', () => dialog.showModal()); // Open the dialog
closeButton.addEventListener('click', () => dialog.close()); // Close the dialog

newBookForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Retrieve form values
    const title = newBookForm.querySelector('#book-title').value;
    const author = newBookForm.querySelector('#author-name').value;
    const pages = newBookForm.querySelector('#pages-count').value;
    const haveRead = newBookForm.querySelector('#have-read').checked;
    
    // Reset the books container and add the new book
    booksContainer.innerHTML = "";
    addBookToLibrary(title, author, pages, haveRead);
    dialog.close();
    renderBooks();
    newBookForm.reset(); // Reset form fields
});

// Book constructor
function Book(title, author, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
}

// Add a new book to the library array
function addBookToLibrary(title, author, pages, haveRead) {
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.unshift(newBook); // Add to the beginning of the library array
}

// Render all books in the library to the DOM
function renderBooks() {
    // Loop through the library and create book cards
    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.innerHTML = `
            <h2>${book.title}</h2>
            <p>${book.author}</p>
            <p>${book.pages} pages</p>
            <button class="read-status">${book.haveRead ? 'Read' : 'Not Read'}</button>
            <button class="remove-book">Remove</button>
        `;
        booksContainer.appendChild(bookCard);
    });

    // Add event listeners to "Remove" buttons
    document.querySelectorAll('.remove-book').forEach(button => {
        button.addEventListener('click', (e) => {
            e.target.parentElement.remove(); // Remove book card from DOM
        });
    });

    // Add event listeners to "Read Status" buttons
    document.querySelectorAll('.read-status').forEach(button => {
        button.addEventListener('click', (e) => {
            const newStatus = e.target.textContent === 'Read' ? 'Not Read' : 'Read';
            e.target.textContent = newStatus; // Toggle the read status text
        });
    });
}

// Initial rendering of the library
renderBooks();