let FormManager = require("./JournalForm.js")
let dataManager = require("./DataManager.js")
let listEntries = require("./Journallist.js")
let createJournalEntry = require("./Journalhtml.js");

// Render the journal entry form
document.querySelector("#journalEntry").innerHTML = FormManager.renderEntryForm()

// Add an event listener for the save button
document.querySelector("#saveEntryButton").addEventListener("click", () => {
    // Get form field values
    // Create object from them
    // Add timestamp
    const newEntry = {
        title: document.querySelector("#entryTitle").value,
        content: document.querySelector("#entryContent").value,
        date: Date.now()
    }
    console.log(newEntry);
    // POST to API
    dataManager.saveJournalEntry(newEntry).then(() => {
        // Clear the form fields
        FormManager.clearForm()

        // Put HTML representation on the DOM
    })

})
//const getAllEntries = fetch("")
document.querySelector("#entryContainer").addEventListener("click", (event) => {
    const entryId = event.target.id.split("--")[1]
    dataManager.deleteJournalEntry(entryId).then(() => {
        document.querySelector("#entryContainer").innerHTML = ""
        listEntries()
    })

})
listEntries()