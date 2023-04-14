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

***Backend:*** &nbsp;The backend server was built with Node.js/Express using the middleware pattern to enhance readability and debugging ability.  All data is stored in a non-relational MongoDB database for quick retrieval of user data and flexible data structuring.  Mongoose was used to model and interact with the data.
 
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

***Technology Used:***
&nbsp;The home page weather app uses the <a href = "https://openweathermap.org/api"> Open Weather API <a/> to fetch weather data for a specified city using Axios.  Axios is a nice Javascript library that is similar to the Fetch API.  I like to incorporate it into my projects because it is less verbose than Fetch API and has robust error handling.  OpenWeather has some great free options if you need a weather API for your personal project and is fairly easy to navigate.

***Features:***
&nbsp;Upon logging in the user is greeted with the home page and can enter their city to check the weather!  Once the user enters the city, some key weather information is shared with them and a fun image is rendered conditionally depending on the weather.

### Algorithms Page

https://user-images.githubusercontent.com/35904733/230293398-b43142f5-7402-4f97-8a45-54fa9255fda7.mov

***Technology Used:***
&nbsp;

***Features:***
&nbsp;

### Scratch Page

https://user-images.githubusercontent.com/35904733/230296996-5da49a38-cbb3-415e-9c9d-14dcd3bcdb9e.mov

***Technology Used:***
&nbsp;

***Features:***
&nbsp;

### Garden Page

https://user-images.githubusercontent.com/35904733/230296462-564e9ba2-f6e3-470a-be4a-34d34f212d5a.mov

***Technology Used:***
&nbsp;

***Features:***
&nbsp;

### Music Page

https://user-images.githubusercontent.com/35904733/230296600-6e7852cd-0b07-419d-8fbf-2c11fae947e8.mov

<br/>

https://user-images.githubusercontent.com/35904733/230296686-0286388b-6106-4413-93ba-218bb4590612.mov

***Technology Used:***
&nbsp;

https://developer.spotify.com/documentation/web-api/tutorials/code-flow

***Features:***
&nbsp;

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


