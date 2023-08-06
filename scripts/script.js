const addBookButton = document.querySelector("#add-book");
const closeFormButton = document.querySelector("#close-btn");
const submitFormButton = document.querySelector("#submit-btn");
const libraryContainer = document.querySelector(".library-container");
const bookReadButtons = Array.from(document.querySelectorAll(".book-btn"));
let library = [];

function Book(name, author, pages, read, id) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
}

function addBook(name, author, pages, read, id) {
    const newBook = new Book(name, author, pages, read, id);
    library.push(newBook);
    displayBookOnSite();
}

function getFormInfo(event) {
    event.preventDefault();
    // get the form info and create a new book
    const name = document.querySelector("#book-title").value;
    const author = document.querySelector("#author-name").value;
    const pages = document.querySelector("#page-num").value;
    const id = library.length + 1;
    addBook(name, author, pages, false, id);

    // reset the form information to blank
    document.querySelector("#book-title").value = "";
    document.querySelector("#author-name").value = "";
    document.querySelector("#page-num").value = "";
}

function displayBookOnSite() {
        const book = library[library.length - 1];
        const info = document.createElement("p");
        info.textContent = "Title: " + book.name + ".\tAuthor: " + book.author + ".\tPages: " + book.pages + ".";

        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.classList.add(`_${book.id}`);
        bookDiv.appendChild(info);

        const readButton = document.createElement("button");
        readButton.classList.add("red");
        readButton.classList.add("book-btn");
        readButton.textContent = "Read?";
        addBookButtonListener(readButton);
        bookDiv.appendChild(readButton);

        const removeButton = document.createElement("button");
        removeButton.classList.add("book-btn");
        removeButton.classList.add(`_${book.id}`);
        removeButton.textContent = "Remove"
        addRemoveBookListener(removeButton);
        bookDiv.appendChild(removeButton);

        libraryContainer.appendChild(bookDiv);
}

function openForm() {
    const form = document.querySelector(".form-container");
    form.classList.remove("hidden");
}

function closeForm() {
    const form = document.querySelector(".form-container");
    form.classList.add("hidden");
}

function addRemoveBookListener(btn) {
    btn.addEventListener("click", (e) => {
        const bookToRemoveID = e.target.classList[1];
        const str = "book " + bookToRemoveID;
        const bookToRemove = document.getElementsByClassName(str)[0];
        bookToRemove.remove();
    });
}

function addBookButtonListener(btn) {
    btn.addEventListener("click", (e) => {
        if(e.target.classList.contains("red")) {
            e.target.read = true;
            e.target.classList.add("green");
            e.target.classList.remove("red");
        } else {
            e.target.read = false;
            e.target.classList.remove("green");
            e.target.classList.add("red");
        }
    });
}

addBookButton.addEventListener("click", openForm);
closeFormButton.addEventListener("click", closeForm);
submitFormButton.addEventListener("click", getFormInfo);