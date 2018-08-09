function createJournalEntry(title, content, id) {
    return `<h3>${title}</h3>
            <p>${content}</p>
            <button id="deleteEntryButton--${id}">Delete Journal Entry</button> `;
}


module.exports = createJournalEntry;