"use strict";

// *****************************************
// ************** FUNCTIONS ****************
// *****************************************

function editThis(editingBook) {
    if (!deletingThis) {
        editingBook = parseInt(editingBook.substring(13) - 1);
        const thisIsTheBook = theLibrary[editingBook];
        if (newForm.classList.contains("invisible")) openOrCloseForm();
        document.querySelector(".author").value = thisIsTheBook.author;
        document.querySelector(".title").value = thisIsTheBook.title;
        document.querySelector(".format").value = thisIsTheBook.format;
        document.querySelector(".read").value = thisIsTheBook.read;
        editInProgress = true;
        return;
    } else {
        const deleteThis = parseInt(editingBook);
        if (newForm.classList.contains("invisible")) openOrCloseForm();
        let confirmDelete = prompt(
            "Confirm Delete (Y/N) ?\n(Anything other than 'Y' aborts deletion)"
        );
        if (confirmDelete === "y" || confirmDelete === "Y") {
            theLibrary.splice(deleteThis, 1);
            deletingThis = false;
            updateDisplay();
        }
    }
}

function updateDisplay() {
    allBooks = "";
    theLibrary.forEach((book) => {
        // ? NEEDS TO CREATE DISPLAY CARD NEXT TIME!!!
        const thisBook = `<div class="book-card"><div class="edit-btn card${book.index}">❔</div>Book# ${book.index}<br>Author: ${book.author}<br>Title: ${book.title}<br>Format: ${book.format}<br>Read: ${book.read}<br><div class="delete-btn del-${book.index}">⌫</div></div>`;
        allBooks += thisBook;
    });
    mainDisplay.innerHTML = "";
    mainDisplay.innerHTML = allBooks;
    theLibrary.forEach((edit) => {
        document
            .querySelector(`.card${edit.index}`)
            .addEventListener("click", (e) => {
                editingBook = e.target.className;
                editThis(editingBook);
            });
        document
            .querySelector(`.del-${edit.index}`)
            .addEventListener("click", (e) => {
                editingBook = e.target.className;
                editingBook = editingBook.substring(15);
                deletingThis = true;
                editThis(editingBook);
            });
    });
}

function displayMessage(message) {
    messageArea.innerHTML = `<br>${message}`;
}

function openOrCloseForm() {
    newForm.classList.toggle("invisible");

    if (!newForm.classList.contains("invisible")) {
        newBtn.textContent = "✖️";
        newBtn.style.backgroundColor = "red";
        clearClicked();
    } else {
        newBtn.textContent = "➕";
        newBtn.style.backgroundColor = "turquoise";
    }
}

function saveClicked() {
    // ! check all fields completed and alert user if not
    // ! first, get values of all fields
    authorFormName = document.querySelector(".author").value;
    titleFormName = document.querySelector(".title").value;
    formatFormName = document.querySelector(".format").value;
    readFormName = document.querySelector(".read").value;
    // !check values are present and refuse to Save if not
    if (!authorFormName || !titleFormName || !formatFormName || !readFormName) {
        displayMessage("Complete All Fields");
        return;
    }
    // !add new object to Library array IF edit is not taking place

    if (!editInProgress) {
        const book = new Book(
            authorFormName,
            titleFormName,
            formatFormName,
            readFormName
        );
        theLibrary.push(book);
        displayMessage(`<p>${theLibrary.length} books in the library</p>`);
    } else {
        editingBook = parseInt(editingBook.substring(13) - 1);

        theLibrary[editingBook].author = authorFormName;
        theLibrary[editingBook].title = titleFormName;
        theLibrary[editingBook].format = formatFormName;
        theLibrary[editingBook].read = readFormName;
        editInProgress = false;
    }
    authorFormName = "";
    titleFormName = "";
    formatFormName = "";
    readFormName = "";
    clearClicked();
    updateDisplay();
}

function clearClicked() {
    // ! empty all fields, refresh form
    document.querySelector(".author").value = "";
    document.querySelector(".title").value = "";
    document.querySelector(".format").value = "";
    document.querySelector(".read").value = "";
}

// *****************************************
// *********** THE CONSTRUCTOR *************
// *****************************************

function Book(author, title, format, read) {
    this.author = author;
    this.title = title;
    this.format = format;
    this.read = read;
    this.index = index; // 'invisible' one
    index++;
}

// *****************************************
// ********* ASSIGN BUTTON CONTROLS ********
// *****************************************

const newBtn = document.querySelector(".new-button");
newBtn.addEventListener("click", () => {
    openOrCloseForm();
});

const newForm = document.querySelector(".new-form");

const saveBtn = document.querySelector(".save-btn");
const clearBtn = document.querySelector(".clear-btn");

saveBtn.addEventListener("click", saveClicked);
clearBtn.addEventListener("click", clearClicked);

const messageArea = document.querySelector(".message-area");

const mainDisplay = document.querySelector(".main-display");

let theLibrary = [];
let authorFormName;
let titleFormName;
let formatFormName;
let readFormName;
let index = 1;
let allBooks;
let editInProgress = false;
let editingBook = 0;
let deletingThis = false;

messageArea.innerHTML = `<p>${theLibrary.length} books in the library</p>`;
