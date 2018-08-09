
let getEntry = require("./Journalhtml.js");
let dataManager = require("./dataManager.js");

//1. get contacts sfrom ls
//2. iterate over them
//3. render them to the DOM
function listEntries() {
    dataManager.fetchEntries().then( (entriesarray) => {
        entriesarray.forEach(entries => {
            let entryComponent = getEntry(entries.title,entries.content,entries.id);
            writeInfoToDOM(entryComponent);
        })
    })
}
function writeInfoToDOM(entry) {
    document.querySelector("#entryContainer").innerHTML += entry;
}
module.exports = listEntries