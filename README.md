# Note:
The env file will need to be create in the main directory. This contians the DATABASE credentials and the session secret key


# Introduction

Hello readers!. This is my submission for the Hashnode x PlantScale hackathon. This took me around 2 weeks to build. All the features make use of the PlantScale database in some way.

Check out the site : [NoteScape](https://note-scape.onrender.com/)


---

# Introducing NoteScape

As the tagline says, [NoteScape](https://note-scape.onrender.com/) is my attempt at creating a simple yet effective Note taking app. The main focus of this app is to give users all the essential features you would normally find in a todo/notes app, while keeping the User Interface simple and minimalistic.

Personally, I found that many popular Note taking and Todo List apps are not very beginner friendly and have a steep learning curve. [NoteScape](https://note-scape.onrender.com/) is not only very beginner friendly, but also quite powerful with all the essential features you would need.

# Tech Stack

- Plant Scale (the MYSQL database)

- Express and Node (for the backend)

- Axios (for http requests)

- React JS and Material UI (for the frontend)

- Framer Motion (for the animations)

- Heroku (for hosting)


# Features

These are all the main features you will find on my [app](https://note-scape.onrender.com/):

1.  Home Page : On the Home Page you have the option to Register/Login and also the features of the  app are listed too.

2. Register: You will need to create an account to use the App. Once you create an account, you will redirected to the login page to login.

3. Login : You can login with your email and password on the login page.

4. Dashboard: Once logged in, you are redirected to the dashboard where you also have the option to log out.

5. Create a new Note. Each Note contains the title and the main text. The date and time of creation are also automatically added. Progress bars show how many characters you can type while creating/editing the note title or body.
6. Edit a Note
7.  Delete a Note
8. Search for a Note
9. Sort the Notes. You can sort by date or by the note title.
10. Save Notes. To save the notes, you can click on the save button in the top right corner. This saves the Notes in the PlantScale database.


# Building Process

For the back-end, I created multiple APIs for different types of requests like login/logout, saving and retrieving notes etc using express js. Axios was used to send POST/GET requests. Express-sessions were used to keep user logged in. The PlantScale database connection was done using a .env file which contained the Database URL.

For the front-end many of the components were made using Material UI, although the Notes were all custom styled. The use of glass morphism is also prevalent. The page load animations were achieved using Framer Motion. Most of the actual Note functionality was done using React Hooks.


# The Role of PlantScale

Starting out, I was hesitant using PlantScale as it was my first time using it. However, I had a blast using it. It is not only **exteremely** fast and easy to scale, but also quite easy to connect to. In fact the best thing about the documentation is that complete tutorials are provided on how to connect to any type of language/tech stack. 

Overall it was a good experience and moving forwards I will definitly use it again.


# Challenges

Some of the challenges I faced:

- At one point while working on the backend I spend an absurd amount of time on a CORS issue☠️. I managed to fix it at the end using credentials.

- Although plantscale turned out my very easy to use, I still had to spent a considerable amount of time getting used to it. This was further exaggerated by the fact that It had been a whole since I used a MYSQL database with Node.js

- I was quite conflicted between choosing Axios or Fetch for making API requests. I ended up choosing Axios since it has better error handling and ease of use.

- Lastly deploying to Heroku was a big pain. I think I don't need to explain further here.😅


# Conclusion

In the end I just want to say thank you to the Hashnode and PlantScale teams for organizing this event. This was my first hackathon and I not only had a good time working on it, but also learned a ton of new things.

My app can still be **immensely** improved with newer features, but I am satisfied with what I have man aged to create with my meagre 1 year of experience with React.

Thank You 😊


# Links 🔗

Check out the site : [NoteScape](https://note-scape.onrender.com/)

And the Source Code : https://github.com/Saleh-Mubashar/NoteScape/

