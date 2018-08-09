Given the user wants to create a journal entry
When the user loads the application
Then the user should see the entry form
And if there are current entries, they should be listed beneath the form

Given the user has filled out all form fields
When the user clicks on the save affordance
Then the form fields should be cleared
And an HTML representation of the journal entry should immediately appear in the form
And it should be the first entry in the list
And the HTML representation should have the following content

1. Title of entry
2. Content of entry
3. Date of entry
4. Delete hyperlink

Given the user wants to remove a journal entry
When the user clicks on the delete affordance
Then the journal entry should immediately disappear# Journal
