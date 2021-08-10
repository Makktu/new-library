"use strict";

// *****************************************
// ************** FUNCTIONS ****************
// *****************************************

function openOrCloseForm(e) {
    newForm.classList.toggle("invisible");

    if (!newForm.classList.contains("invisible")) {
        newBtn.textContent = "✖️";
        newBtn.style.backgroundColor = "red";
    } else {
        newBtn.textContent = "➕";
        newBtn.style.backgroundColor = "turquoise";
    }
}

function saveClicked() {
    console.log("Save clicked");
}

function clearClicked() {
    console.log("Clear clicked");
}

// *****************************************
// ********* ASSIGN BUTTON CONTROLS ********
// *****************************************

const newBtn = document.querySelector(".new-button");
newBtn.addEventListener("click", (e) => {
    openOrCloseForm(e);
});

const newForm = document.querySelector(".new-form");

const saveBtn = document.querySelector(".save-btn");
const clearBtn = document.querySelector(".clear-btn");

saveBtn.addEventListener("click", saveClicked);
clearBtn.addEventListener("click", clearClicked);

const messageArea = document.querySelector(".message-area");

let theLibrary = [];

messageArea.innerHTML = `<p>${theLibrary.length} books in the library</p>`;
