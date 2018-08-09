const dataManager = Object.create(null, {

    saveJournalEntry: {
        value: (entry) => {
            return fetch("http://localhost:8088/entries", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(entry)
            })
                .then(response => response.json())
        }
    },

    fetchEntries: {
        value: () => {
            return fetch("http://localhost:8088/entries")
                .then(res => res.json())

        }
    },
    deleteJournalEntry: {
        value: (entryId) => {
            return fetch(`http://localhost:8088/entries/${entryId}`, {
                method: "DELETE",

            })
                .then(response => response.json())
        }
    },

})

module.exports = dataManager