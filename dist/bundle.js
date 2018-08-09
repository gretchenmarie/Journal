(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){

const FormManager = Object.create(null, {
    clearForm: {
        value: () => {
            document.querySelector("#entryTitle").value = ""
            document.querySelector("#entryContent").value = ""
        }
    },

    renderEntryForm: {
        value: () => {
            return `
                <fieldset>
                    <label for="entryTitle">Title:</label>
                    <input required type="text" id="entryTitle">
                </fieldset>
                <fieldset>
                    <label for="entryContent">Deep thoughts:</label>
                    <textarea id="entryContent"></textarea>
                </fieldset>
                <button id="saveEntryButton">Save Journal Entry</button>
                </fieldset>
               
            `
        }
    }

})


module.exports = FormManager
},{}],3:[function(require,module,exports){
function createJournalEntry(title, content, id) {
    return `<h3>${title}</h3>
            <p>${content}</p>
            <button id="deleteEntryButton--${id}">Delete Journal Entry</button> `;
}


module.exports = createJournalEntry;
},{}],4:[function(require,module,exports){

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
},{"./Journalhtml.js":3,"./dataManager.js":5}],5:[function(require,module,exports){
arguments[4][1][0].apply(exports,arguments)
},{"dup":1}],6:[function(require,module,exports){
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
},{"./DataManager.js":1,"./JournalForm.js":2,"./Journalhtml.js":3,"./Journallist.js":4}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9zY3JpcHRzL0RhdGFNYW5hZ2VyLmpzIiwiLi4vc2NyaXB0cy9Kb3VybmFsRm9ybS5qcyIsIi4uL3NjcmlwdHMvSm91cm5hbGh0bWwuanMiLCIuLi9zY3JpcHRzL0pvdXJuYWxsaXN0LmpzIiwiLi4vc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImNvbnN0IGRhdGFNYW5hZ2VyID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcblxyXG4gICAgc2F2ZUpvdXJuYWxFbnRyeToge1xyXG4gICAgICAgIHZhbHVlOiAoZW50cnkpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIiwge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIlxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGVudHJ5KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgZmV0Y2hFbnRyaWVzOiB7XHJcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGZldGNoKFwiaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXNcIilcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG5cclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgZGVsZXRlSm91cm5hbEVudHJ5OiB7XHJcbiAgICAgICAgdmFsdWU6IChlbnRyeUlkKSA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaChgaHR0cDovL2xvY2FsaG9zdDo4MDg4L2VudHJpZXMvJHtlbnRyeUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJERUxFVEVcIixcclxuXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbn0pXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGRhdGFNYW5hZ2VyIiwiXHJcbmNvbnN0IEZvcm1NYW5hZ2VyID0gT2JqZWN0LmNyZWF0ZShudWxsLCB7XHJcbiAgICBjbGVhckZvcm06IHtcclxuICAgICAgICB2YWx1ZTogKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5VGl0bGVcIikudmFsdWUgPSBcIlwiXHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb250ZW50XCIpLnZhbHVlID0gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcmVuZGVyRW50cnlGb3JtOiB7XHJcbiAgICAgICAgdmFsdWU6ICgpID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgIDxmaWVsZHNldD5cclxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgZm9yPVwiZW50cnlUaXRsZVwiPlRpdGxlOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgaWQ9XCJlbnRyeVRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgPGZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCBmb3I9XCJlbnRyeUNvbnRlbnRcIj5EZWVwIHRob3VnaHRzOjwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRleHRhcmVhIGlkPVwiZW50cnlDb250ZW50XCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgICAgIDwvZmllbGRzZXQ+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGlkPVwic2F2ZUVudHJ5QnV0dG9uXCI+U2F2ZSBKb3VybmFsIEVudHJ5PC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2ZpZWxkc2V0PlxyXG4gICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgYFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0pXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBGb3JtTWFuYWdlciIsImZ1bmN0aW9uIGNyZWF0ZUpvdXJuYWxFbnRyeSh0aXRsZSwgY29udGVudCwgaWQpIHtcclxuICAgIHJldHVybiBgPGgzPiR7dGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgPHA+JHtjb250ZW50fTwvcD5cclxuICAgICAgICAgICAgPGJ1dHRvbiBpZD1cImRlbGV0ZUVudHJ5QnV0dG9uLS0ke2lkfVwiPkRlbGV0ZSBKb3VybmFsIEVudHJ5PC9idXR0b24+IGA7XHJcbn1cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUpvdXJuYWxFbnRyeTsiLCJcclxubGV0IGdldEVudHJ5ID0gcmVxdWlyZShcIi4vSm91cm5hbGh0bWwuanNcIik7XHJcbmxldCBkYXRhTWFuYWdlciA9IHJlcXVpcmUoXCIuL2RhdGFNYW5hZ2VyLmpzXCIpO1xyXG5cclxuLy8xLiBnZXQgY29udGFjdHMgc2Zyb20gbHNcclxuLy8yLiBpdGVyYXRlIG92ZXIgdGhlbVxyXG4vLzMuIHJlbmRlciB0aGVtIHRvIHRoZSBET01cclxuZnVuY3Rpb24gbGlzdEVudHJpZXMoKSB7XHJcbiAgICBkYXRhTWFuYWdlci5mZXRjaEVudHJpZXMoKS50aGVuKCAoZW50cmllc2FycmF5KSA9PiB7XHJcbiAgICAgICAgZW50cmllc2FycmF5LmZvckVhY2goZW50cmllcyA9PiB7XHJcbiAgICAgICAgICAgIGxldCBlbnRyeUNvbXBvbmVudCA9IGdldEVudHJ5KGVudHJpZXMudGl0bGUsZW50cmllcy5jb250ZW50LGVudHJpZXMuaWQpO1xyXG4gICAgICAgICAgICB3cml0ZUluZm9Ub0RPTShlbnRyeUNvbXBvbmVudCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbn1cclxuZnVuY3Rpb24gd3JpdGVJbmZvVG9ET00oZW50cnkpIHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb250YWluZXJcIikuaW5uZXJIVE1MICs9IGVudHJ5O1xyXG59XHJcbm1vZHVsZS5leHBvcnRzID0gbGlzdEVudHJpZXMiLCJsZXQgRm9ybU1hbmFnZXIgPSByZXF1aXJlKFwiLi9Kb3VybmFsRm9ybS5qc1wiKVxyXG5sZXQgZGF0YU1hbmFnZXIgPSByZXF1aXJlKFwiLi9EYXRhTWFuYWdlci5qc1wiKVxyXG5sZXQgbGlzdEVudHJpZXMgPSByZXF1aXJlKFwiLi9Kb3VybmFsbGlzdC5qc1wiKVxyXG5sZXQgY3JlYXRlSm91cm5hbEVudHJ5ID0gcmVxdWlyZShcIi4vSm91cm5hbGh0bWwuanNcIik7XHJcblxyXG4vLyBSZW5kZXIgdGhlIGpvdXJuYWwgZW50cnkgZm9ybVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2pvdXJuYWxFbnRyeVwiKS5pbm5lckhUTUwgPSBGb3JtTWFuYWdlci5yZW5kZXJFbnRyeUZvcm0oKVxyXG5cclxuLy8gQWRkIGFuIGV2ZW50IGxpc3RlbmVyIGZvciB0aGUgc2F2ZSBidXR0b25cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzYXZlRW50cnlCdXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgIC8vIEdldCBmb3JtIGZpZWxkIHZhbHVlc1xyXG4gICAgLy8gQ3JlYXRlIG9iamVjdCBmcm9tIHRoZW1cclxuICAgIC8vIEFkZCB0aW1lc3RhbXBcclxuICAgIGNvbnN0IG5ld0VudHJ5ID0ge1xyXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5VGl0bGVcIikudmFsdWUsXHJcbiAgICAgICAgY29udGVudDogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNlbnRyeUNvbnRlbnRcIikudmFsdWUsXHJcbiAgICAgICAgZGF0ZTogRGF0ZS5ub3coKVxyXG4gICAgfVxyXG4gICAgY29uc29sZS5sb2cobmV3RW50cnkpO1xyXG4gICAgLy8gUE9TVCB0byBBUElcclxuICAgIGRhdGFNYW5hZ2VyLnNhdmVKb3VybmFsRW50cnkobmV3RW50cnkpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIC8vIENsZWFyIHRoZSBmb3JtIGZpZWxkc1xyXG4gICAgICAgIEZvcm1NYW5hZ2VyLmNsZWFyRm9ybSgpXHJcblxyXG4gICAgICAgIC8vIFB1dCBIVE1MIHJlcHJlc2VudGF0aW9uIG9uIHRoZSBET01cclxuICAgIH0pXHJcblxyXG59KVxyXG4vL2NvbnN0IGdldEFsbEVudHJpZXMgPSBmZXRjaChcIlwiKVxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2VudHJ5Q29udGFpbmVyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcclxuICAgIGNvbnN0IGVudHJ5SWQgPSBldmVudC50YXJnZXQuaWQuc3BsaXQoXCItLVwiKVsxXVxyXG4gICAgZGF0YU1hbmFnZXIuZGVsZXRlSm91cm5hbEVudHJ5KGVudHJ5SWQpLnRoZW4oKCkgPT4ge1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZW50cnlDb250YWluZXJcIikuaW5uZXJIVE1MID0gXCJcIlxyXG4gICAgICAgIGxpc3RFbnRyaWVzKClcclxuICAgIH0pXHJcblxyXG59KVxyXG5saXN0RW50cmllcygpIl19
