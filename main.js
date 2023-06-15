function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function Bookshelf() {
  this.books = [];
  this.container = document.querySelector('.container');
  this.addBookButton = document.querySelector('#btn_add');
  this.addBookForm = document.querySelector('#addBookForm');
  this.cancelButton = document.querySelector('#btn_cancel');
  this.addBookToLibrary = addBookToLibrary;
  this.removeBookFromLibrary = removeBookFromLibrary;
  this.toggleReadStatus = toggleReadStatus;
  this.displayBooks = displayBooks;
  this.setupEventListeners = setupEventListeners;
  this.setupEventListeners();

  function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
    this.displayBooks();
  }

  function removeBookFromLibrary(index) {
    this.books.splice(index, 1);
    this.displayBooks();
  }

  function toggleReadStatus(index) {
    this.books[index].read = !this.books[index].read;
    this.displayBooks();
  }

  function displayBooks() {
    this.container.innerHTML = '';
    this.books.forEach((book, index) => {
      const card = document.createElement('div');
      card.classList.add('card');
      const title = document.createElement('h3');
      title.textContent = book.title;
      card.appendChild(title);
      const author = document.createElement('p');
      author.textContent = `Author: ${book.author}`;
      card.appendChild(author);
      const pages = document.createElement('p');
      pages.textContent = `Pages: ${book.pages}`;
      card.appendChild(pages);
      const read = document.createElement('p');
      read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
      card.appendChild(read);
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.classList.add('btn_remove');
      removeButton.addEventListener('click', () => {
        this.removeBookFromLibrary(index);
      });
      card.appendChild(removeButton);
      const toggleButton = document.createElement('button');
      toggleButton.textContent = 'Read Y/N';
      toggleButton.classList.add('btn_toggle');
      toggleButton.addEventListener('click', () => {
        this.toggleReadStatus(index);
      });
      card.appendChild(toggleButton);
      this.container.appendChild(card);
    });
  }

  function setupEventListeners() {
    this.addBookButton.addEventListener('click', () => {
      this.addBookForm.classList.remove('hidden');
    });

    this.cancelButton.addEventListener('click', () => {
      this.addBookForm.classList.add('hidden');
    });

    const form = this.addBookForm.querySelector('form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const titleInput = form.querySelector('#title');
      const authorInput = form.querySelector('#author');
      const pagesInput = form.querySelector('#pages');
      const readInput = form.querySelector('#read');
      const title = titleInput.value;
      const author = authorInput.value;
      const pages = parseInt(pagesInput.value);
      const read = readInput.checked;


      if (title && author && !isNaN(pages) && isValidTitle(title)) {
        this.addBookToLibrary(title, author, pages, read);
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        readInput.checked = false;
        this.addBookForm.classList.add('hidden');
      } else {
        alert('Invalid input. Book not added.');
      }
    });

    function isValidTitle(title) {
      const alphanumericCharacters = 'abcdefghijklmnopqrstuvwxyzßABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.:!?();, ';
      for (let i = 0; i < title.length; i++) {
        if (!alphanumericCharacters.includes(title[i])) {
          return false;
        }
      }
      return true;
    }
  }
}


  const bookshelf = new Bookshelf();
