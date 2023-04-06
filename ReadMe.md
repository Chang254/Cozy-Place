# Cozy Place

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;&nbsp;![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;&nbsp;![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)<br/>![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)&nbsp;&nbsp;![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)&nbsp;&nbsp;![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)

## Summary

Cozy Place is a fullstack application that provides a virtual desk space.  It is mainly targetted towards those studying computer science, but can be enjoyed by anyone looking for a cozy productivity app!

**Current features include:**

- Login/Create account form with authentication throughout the app using sessions and HTTP only cookies
    - All data is tied to users and stored in a non-relational MongoDB databae
- Home page with access to weather by city
- Algorithm to do list
- Basic Calculator and Text Area to work through problems
- Garden app which tracks time studied and grows a tree if you study for a specified duration
- Music page connected to Spotify through Spotify Web API

[Click Here to Learn How to Try Cozy Place](#usage)

## Demos

This section includes all of the features of Cozy Place with demos and explanations of the technology used

### Login Page & Sign Up Page

https://user-images.githubusercontent.com/35904733/230003989-61bbb407-fa72-4696-9367-f3f22c07a585.mov

<br/>

***Technology Used:***
Cozy Place's authentication was built using HTTP Only Cookies and Sessions.  Another common method to handle authentication is using JWTs (JSON Web Token), which are often more scalable due to their ability to minimize requests to the server (if stateless), however, Cozy Place was intentionally designed as a small scale project.  HTTP only cookies were chosen due to being lightweight, automatically sent with every request to the server (useful for the various requests we make to the server), and fairly secure.

***Features***
Upon loading the application, users are navigated to the login page.  If the user does not yet have an account, they can create an account using the signup form.  The user's information is then sent to the server, where the password is encrypted using Bcrypt and their credentials are stored in the database.  Finally, the user is navigated back to the login page.

When a user logs in with verified credentials, an HTTP Only cookie with the user id is created and a session tied to the user that lasts 30 minutes is stored in the database.  Evertime a user accesses a page, a request is sent to the server and a query is made to the database looking for a session belonging to the user.  If the user no longer has a session, the user is alerted and navigated back to the login page.  Additionally, users cannot access the Login or Signup pages if they have an active session.  They must log out first, which clears their user id cookie and deletes the session from the database.

### Home Page

https://user-images.githubusercontent.com/35904733/230005139-775a30b6-5284-4b67-8b63-212fd7cbae67.mov

Tech used:

React Hooks, React-Router, Axios & Fetch
SASS (CSS) HTML

Express, MongoDB, Js-cookie, sessions

Digital office desk/space 

Framer Motion

Spotify-web-api-node
Spotify
react-spotify-web-playback
axios + fetch

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


