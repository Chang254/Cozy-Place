<div align="center">

# Cozy Place

![CozyLogo](https://user-images.githubusercontent.com/35904733/231628123-bfd0e385-6d88-419a-893f-539f5fcdbea5.gif)

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;&nbsp;![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;&nbsp;![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)<br/>![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;&nbsp;![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;&nbsp;![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

</div>
 
## Summary

Cozy Place is a fullstack application that provides a virtual desk space.  It is mainly targetted towards those studying computer science, but can be enjoyed by anyone looking for a cozy productivity app!

**Current features include:**

- Login/Create account form with authentication throughout the app
- Home page with access to weather by city
- Algorithm to do list
- Basic Calculator and Text Area to work through problems
- Garden app which tracks time studied and grows a tree if you study for a specified duration
- Music page connected to Spotify through Spotify Web API

[Click Here to Learn How to Try Cozy Place](#usage)

## Demos

This section includes all of the features of Cozy Place with demos and explanations of the technology used

### Technology Overview

Webpack was used to bundle frontend assets and proxy requests to the server. Webpack was chosen for it's large plugin ecosystem and highly tunable configuration.  The current configuration has hot module reloading enabled for enhanced developer experience. 

***Frontend:*** &nbsp;The frontend was built using React, JavaScript, HTML, & SASS/CSS. React is my JavaScript framework of choice for most projects due to the large amount of community support, vast library ecosystem, and use of a virtual DOM to make fast and efficient updates to the DOM. One major library used in this project is react-router-dom, which is used to handle routes to different 'pages' on the website.  React-router-dom allows the SPA (single page application) to conditionally render components associated with different routes while minimizing network requests.

***Backend:*** &nbsp;The backend server was built with Node.js/Express using the middleware pattern to enhance readability and debugging ability.  All data is stored in a non-relational MongoDB database for quick retrieval of user data and flexible data structuring.  This flexibility was useful as the vision for the project changed quickly and data modeling had to be changed frequently.
 
### Login Page & Sign Up Page

https://user-images.githubusercontent.com/35904733/230003989-61bbb407-fa72-4696-9367-f3f22c07a585.mov

<br/>

***Technology Used:***
&nbsp;Cozy Place's authentication was built using HTTP Only Cookies and Sessions.  Another common method to handle authentication is using JWTs (JSON Web Token), which are often more scalable due to their ability to minimize requests to the server (if stateless), however, Cozy Place was intentionally designed as a small scale project.  HTTP only cookies were chosen due to being lightweight, automatically sent with every request to the server (useful for the various requests we make to the server), and fairly secure.

***Features:***
&nbsp;Upon loading the application, users are navigated to the login page.  If the user does not yet have an account, they can create an account using the signup form.  The user's information is then sent to the server, where the password is encrypted using Bcrypt and their credentials are stored in the database.  Finally, the user is navigated back to the login page.

When a user logs in with verified credentials, an HTTP Only cookie with the user id is created and a session tied to the user that lasts 30 minutes is stored in the database.  Evertime a user accesses a page, a request is sent to the server and a query is made to the database looking for a session belonging to the user.  If the user no longer has a session, the user is alerted and navigated back to the login page.  Additionally, users cannot access the Login or Signup pages if they have an active session.  They must log out first, which clears their user id cookie and deletes the session from the database.

### Home Page

https://user-images.githubusercontent.com/35904733/230293361-fe531a0d-971a-44ea-b998-25f6bca7808f.mov

<br/>

***Technology Used:***
&nbsp;The home page weather app uses the <a href = "https://openweathermap.org/api"> Open Weather API <a/> to fetch weather data for a specified city using Axios.  Axios is a nice Javascript library that is similar to the Fetch API.  I like to incorporate it into my projects because it is less verbose than Fetch API and has robust error handling.  OpenWeather has some great free options if you need a weather API for your personal project and is fairly easy to navigate.

***Features:***
&nbsp;Upon logging in the user is greeted with the home page and can enter their city to check the weather!  Once the user enters the city, some key weather information is shared with them and a fun image is rendered conditionally depending on the weather.

### Algorithms Page

https://user-images.githubusercontent.com/35904733/230293398-b43142f5-7402-4f97-8a45-54fa9255fda7.mov
 
<br/>

***Technology Used:***
&nbsp;The algorithm page contains a to-do-list with data stored in the NoSQL database for each user.  The user interface is updated in sync with updates to the database using useContext and useReducer hooks to manage and update state.  Upon loading the page, a useEffect hook is used to fetch the data from the database once and the data is dispatched as a payload to the reducer with an action of 'SET_ALGOS', which sets the algorithms state.  This state (an array of algorithm objects) is then mapped onto to-do list items in the UI.  When a user creates an algo or updates/deletes an existing algo, the corresponding request is sent to the server to update the data in the database.  If this operation is executed successfully (response with status 200), the corresponding action is dispatched to the reducer to update state, which is then reflected in the UI.  In small applications useContext and useReducer hooks are great for managing state when the added complexity from a tool like Redux won't give you much benefit.  In larger applications, it may make more sense to use a state management tool like Redux to manage complex state interactions.

***Features:***
&nbsp;The algorithms page provides a to-do list for algorithms.  Users can add an algorithm with a description to describe an optimal approach to the problem or why they want to revisit a specific problem.  If the user enters a valid Leetcode problem as the title, the user can click on the title to open the Leetcode problem page as a new tab.  Users can also update and delete their to-do list items.  All of the items are tied to the specific user and stored in the database so that data is persisted between sessions.

### Scratch Page

https://user-images.githubusercontent.com/35904733/230296996-5da49a38-cbb3-415e-9c9d-14dcd3bcdb9e.mov
 
<br/>

***Technology Used:***
&nbsp;The calculator on this page was built by appending to a string when a calculator button is pressed.  When the delete button is pressed, the last element is popped from the string and when the AC button is pressed, the string is reset to an empty string.  There are conditional statements to check for invalid inputs like back-to-back operators (e.g '++'), in which case nothing is added to the string.  The Eval method is used to evaluate the string.  Please note that using Eval can be dangerous as it can allow attackers to inject malicious code into your program, known as code injection or remote code execution.  It ca also make it difficult to optimize and debug your code since it creates new scope and variable bindings dynamically at runtime. This can lead to performance issues and hard-to-debug errors. Because the calculator is very simple and the user does not manually input something (the user is limited by the buttons on the calculator to build out the string), this is a lower risk use case for Eval.  If you want to implement Eval() in your code, just be sure to think about the potential security and performance implications it might have.

***Features:***
&nbsp;This page allows users to sketch out their ideas for coding problems like algorithms.  Users can pseudocode on the notepad and use the calculator on the right to help with basic arithmetic.

### Garden Page

https://user-images.githubusercontent.com/35904733/230296462-564e9ba2-f6e3-470a-be4a-34d34f212d5a.mov

***Technology Used:***
&nbsp;The garden page uses the same approach as the algorithm page for updating the page in sync with the database using react useContext and useReducer hooks.  Read above if you are interested in that aspect of this page! The timer was implemented with useState and useEffect hooks!  A count state was initialized with useState and a useEffect dependant on the count state.  Within the useEffect scope, an interval is set using setInterval, to decrement the counter by 1 every second.  We need the useEffect in order to 'clean up' the interval later, otherwise it would run indefinitely.  We have a clean up function inside of the useEffect to clear the interval once the component unmounts or when the count changes.

***Features:***
&nbsp;The garden page is a focus app that tracks a user's total study time and trees planted.  Trees are planted when a user stays focussed for a specified amount of time (based on the user's input).

### Music Page

https://user-images.githubusercontent.com/35904733/230296600-6e7852cd-0b07-419d-8fbf-2c11fae947e8.mov

<br/>

https://user-images.githubusercontent.com/35904733/230296686-0286388b-6106-4413-93ba-218bb4590612.mov
 
<br/>

***Technology Used:***
&nbsp;The first component of this page is the login page.  Authorization was handled using the Authorization Code Flow, which is detailed extensively in Spotify's documentation of the API <a href = 'https://developer.spotify.com/documentation/web-api/tutorials/code-flow'> here </a>.  Two of my favorite libraries for working with the Spotify Web API are <a href = 'https://github.com/thelinmichael/spotify-web-api-node'> Spotify-Web-API-Node </a> and <a href = 'https://github.com/gilbarbara/react-spotify-web-playback'> React-Spotify-Web-Playback </a>.  I would definitely check both of those libraries out if you plan on working with the Spotify Web API!  

***Features:***
&nbsp;The music page provides a music player that is linked to Spotify. Users can search for songs and play them using the web player or choose to listen through another device. Users can also like songs and it will be added to their liked songs playlist on Spotify.

<a name = "usage" />

## Using Cozy Place on Your Local Machine

Cozy Place is not currently hosted, fork and clone this repository to your local machine to get started.  Once you have a copy of this repository on your local machine, follow these steps:

1. Install dependencies in the root, Frontend, and Backend directories
2. Create a new file named '.env' in the root directory.  Inside of this file, declare two variables:
    1. PORT = 4000
    2. MONGO_URI = [Your Mongo URI] 
    3. **Note: You will need to have your own MongoDB database, get started here: https://www.mongodb.com/**
3. Run the script 'npm run dev' in your terminal
4. Have fun studying!


