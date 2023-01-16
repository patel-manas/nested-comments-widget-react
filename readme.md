# Nested Comments Widget

This section describes about the list of task and approach for developing the markdown features.

### Framework:

Used Vite preset with React and Typescript


### [P0] Tasks

- [x] - Adding a comment
- [x] Replying to a comment - ton N levels
- [x] Deleting the comment, which should delete all replies to that comment

### [P1] Tasks
- [x] Feature to Edit the comment / reply
- [x] Adding time stamps to comment / reply
- [x] Persist comments and replies
- [x] Form validation
- [x] Aesthetic design
- [x] Adding user level access - open ended 


### Localstorage

To Persist comments used local storage and wrote a custom hook which will can store/retrive a value in localstorage.

### User Level Access 

For the user level access I have created a simple dropdown which contains 4 hardcoded users and I have wrapped the App with a user context which provides the currentuser/users details.


