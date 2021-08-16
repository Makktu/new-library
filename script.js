"use strict";

// *****************************************
// ************** FUNCTIONS ****************
// *****************************************

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
        // ? GET DATA NUMBER HERE
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
