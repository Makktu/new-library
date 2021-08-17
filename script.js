"use strict";

// *****************************************
// ************** FUNCTIONS ****************
// *****************************************

const deleteThisBook = (e) => {
    // get index number of book to be deleted
    deleteBookIndex = e;
    deleteBookIndex = parseInt(deleteBookIndex.substring(11));
    let confirmDelete = prompt(
        "Delete cannot be undone. Proceed? (Y)\nAny other response aborts deletion."
    );
    if (confirmDelete === "Y" || confirmDelete === "y") {
        theLibrary.forEach((book) => {
            if (book.index === deleteBookIndex) {
                book.show = 0;
                updateDisplay();
            }
        });
        confirmDelete = "";
    } else {
        confirmDelete = "";
        return;
    }
};

function updateDisplay() {
    let thisBook;
    mainDisplay.innerHTML = "";
    theLibrary.forEach((book) => {
        if (book.show === 1) {
            // stuff
            thisBook = `Book#${book.index}`;
            thisBook += `\n\nAuthor: ${book.author}`;
            thisBook += `Title: ${book.title}`;
            thisBook += `Format: ${book.format}`;
            thisBook += `Read: ${book.read}`;

            mainDisplay.innerHTML += `<div class="book-card">${thisBook}<div class="del-btn del${book.index}">🛑</div></div>`;

            document
                .querySelector(`.del${book.index}`)
                .addEventListener("click", (e) => {
                    deleteThisBook(e.target.className);
                });
            thisBook = "";
        }
    });
    // thisBook = "";

    // <div class="del-btn">🛑</div>
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
    authorFormName = document.querySelector(".author").value;
    titleFormName = document.querySelector(".title").value;
    formatFormName = document.querySelector(".format").value;
    readFormName = document.querySelector(".read").value;

    if (!authorFormName || !titleFormName || !formatFormName || !readFormName) {
        displayMessage("⚠️ Complete All Fields");
        return;
    }

    const book = new Book(
        authorFormName,
        titleFormName,
        formatFormName,
        readFormName
    );

    theLibrary.push(book);

    displayMessage(`<p>${theLibrary.length} books in the library</p>`);

    authorFormName = "";
    titleFormName = "";
    formatFormName = "";
    readFormName = "";

    clearClicked();

    updateDisplay();
}

function clearClicked() {
    // empty all fields, refresh form
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
    this.show = 1;
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
let allBooks = "";
let deleteBookIndex = "";
