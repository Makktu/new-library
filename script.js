"use strict";

// *****************************************
// ************** FUNCTIONS ****************
// *****************************************

const deleteThisBook = (e) => {
    theLibrary.splice(parseInt(e.substring(11)), 1);
    updateDisplay();
};

function updateDisplay() {
    if (readFlagError) {
        document.querySelector(".read").style.cssText = "transition: 1s";
        readFlagError = false;
    }
    let thisBook;
    mainDisplay.innerHTML = "";
    theLibrary.forEach((book, ind) => {
        // stuff
        thisBook = `<p>Book#${ind + 1}</p>`;
        thisBook += `<p>Author: ${book.author}</p>`;
        thisBook += `<p>Title: ${book.title}</p>`;
        thisBook += `<p>Format: ${book.format}</p>`;
        thisBook += `<p class="read-toggle">Read: ${book.read} ${
            book.read === "Yes" ? "☑️" : "🚫"
        }</p>`;
        book.index = ind;

        mainDisplay.innerHTML += `<div class="book-card"><div class="del-btn del${book.index}">⛔️</div>${thisBook}</div>`;
        thisBook = "";
    });

    const allDeleteBtns = document.querySelectorAll(`.del-btn`);

    allDeleteBtns.forEach((button) => {
        button.addEventListener("click", (e) => {
            deleteThisBook(e.target.className);
        });
    });

    const allReadBtns = document.querySelectorAll(".read-toggle");
    allReadBtns.forEach((button, ind) => {
        button.addEventListener("click", () => {
            theLibrary[ind].read === "Yes"
                ? (theLibrary[ind].read = "No")
                : (theLibrary[ind].read = "Yes");
            updateDisplay();
        });
    });

    displayMessage(`${theLibrary.length} books in the Library`);
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
    messageArea.innerHTML = "";
    authorFormName = document.querySelector(".author").value;
    titleFormName = document.querySelector(".title").value;
    formatFormName = document.querySelector(".format").value;
    readFormName = document.querySelector(".read").value;

    if (!authorFormName || !titleFormName || !formatFormName || !readFormName) {
        displayMessage("⚠️ Complete All Fields");
        return;
    }

    if (
        readFormName !== "Y" &&
        readFormName !== "y" &&
        readFormName !== "N" &&
        readFormName !== "n"
    ) {
        displayMessage("⚠️ Enter 'Y' or 'N'");
        document.querySelector(".read").style.cssText =
            "background-color: yellow; transition: 1s";
        readFlagError = true;
        return;
    }

    if (readFormName === "Y" || readFormName === "y") {
        readFormName = "Yes";
    } else readFormName = "No";

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
    readFormName = ""; // reset the displayed vars and

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

// *********** THE CONSTRUCTOR *************
class Book {
    constructor(author, title, format, read) {
        this.author = author;
        this.title = title;
        this.format = format;
        this.read = read;
        this.index = 0;
    }
}

// ********* ASSIGN BUTTON CONTROLS ********
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

// *********** STARTING VARIABLES ****************
let theLibrary = [];
let authorFormName;
let titleFormName;
let formatFormName;
let readFormName;
let index = 1;
let allBooks = "";
let deleteBookIndex = "";
let readFlagError = false;
