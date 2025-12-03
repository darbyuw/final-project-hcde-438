# Final Project HCDE 438
By Darby Moore

## Project overview and purpose
A demo of this project can be viewed at the following link: https://youtu.be/3rBzP3r16Vc
The current version of this game can be played at the following link: https://final-project-hcde-438-2f1f6.web.app/
This web application is an Interactive Choose Your Own Adventure game. It follows the journey of a cat as it searches for fish in its neighborhood. The user plays the game from the perspective of the cat. This game aims to provide joy and entertainment to people of any age. Users are able to select between multiple options at each page of the game, leading them through different questions and scenarios. The game ends when the user has found four fish, or the cat has gotten distracted in some way. There are multiple different endings depending on the path that the user chooses.

## Technologies used
React components were used for the Navigation bar, Quote, and Options. The navigation bar includes the number of fish found which will change throughout the game using a Context that is available to multiple pages. The quote text changes at every location in the game, fetching a different quote from the API each time. The quotes are filtered based on categories determined by the API. The categories for each location in the game are intended to match the tone of the game at that point. The API Ninjas Quote API was used to fetch quotes. The location descriptive text and option buttons change depending on the previous location and user choice. 
React hooks are used to access data and store the number of fish, as well as storing other variables within the game. useEffect was used to fetch API data. useState was used to change the number of fish when a user comes across a location where there is a fish. useState was also notably used to keep track of the index and quote category. 
Firebase authentication was used by asking users to enter their email and create a password. This used to store the progress of each user, so when they choose to move onto a new location, their progress was saved in Firestore. This allows users to close and tab and return to the game where they left off. It also allows them to log out and log back in and be in the same locaiton in the game. 
Five pages were used to create this web app: Home, Login, Register, Questions, and Game Over. Home, Login and Register are used to authenticate a user with email and password. Home also describes the goal of the game. Questions is the page that contains all of the game logic. The Game Over page is rendered when a user wins the game by collecting four fish. 
The textNodes.jsx file contains an array strucutre that includes all the the descriptions, options, and indicies of the game. Each object in the array holds an id (number), text (String), options (array of text and index of the next location to be used for each button in the game), and a cateogry indicating the type of quote that should be fetched at that locaiton. 
For more details on each element, view the comments on each file. 

## Setup and installation instructions
To setup this web app, download the Git files and run the command 'npm install'.
To setup this web app, visit API Ninja's quote API: https://api-ninjas.com/api/quotes. From this site, create an account in the upper right corner. On your account page, copy and paste the API key connected to your account. Create a secrets.jsx file in the src folder. Ensure that secrets.jsx is hidden in .gitignore if commiting to a repository. Create and export a variable in secrets.jsx called apiKey. This will be used in the Quote component. 
To setup firebase (used to store game progress), visit https://console.firebase.google.com/u/0/ sign in, create a new project, connect a web app in settings, and copy the corresponding apiKey code into the firebase.js file in src --> services. 

## Usage guidelines
This project is intended to be used as a game that is appropriate for all ages. All senarios in the game are fictional. The background image was drawn by Darby Moore and should not be distributed without credit. 

## API documentation (if applicable)
API documentation can be seen here: https://api-ninjas.com/api/quotes

## Future enhancements or known issues
If I had more time for this project, I would filter the quotes futher so that they align with the storyline better. This might include removing quotes with religous terms. A different API might provide better quotes for this game, especially if they could be sorted to be about cats. 
In the future, if I had more time I would draw more backgrounds for the game to make it more imersive. The background would change based on where the user is in the story. 
In the future, the game would benefit from including more locaitons in the textNodes.jsx file. This would make the storyline longer and more complex, increasing user satisfaction. 

## AI use statement (even if no AI was used). Include the prompts you used and the help you received
I used the following prompt in ChatGPT: “Why do i get this error when trying to use the Zen Quotes API: Access to fetch at 'https://zenquotes.io/api/quotes/' from origin 'http://localhost:5173' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.” Based on this I received information that I needed to add a header to the API request, after trying this, I still received the same error. So I revisited the API documentation and saw that there were certain features locked behind a paywall, including the ability to filter quotes based on keywords. I searched on Google for free quote APIs and found the API Ninja Quote API. 
I struggled with fixing a CSS bug and used the following prompt in ChatGPT: "i am making a web app with react jsx and when i shrink the width to below 550px the background color shrinks very fast and it reveals a white background. it is as if the container holding all the content is not takign up the entire width. what are some possible fixes?" Based on this I recived information that this code chunk: 
```html, body {
  width: 100%;
  overflow-x: hidden;
}``` ususally fixes the problem, and after including this the bug was fixed. 

## Personal reflection on what you learned during the project
This project helped me learn React, Firebase, responsive design, and debugging. Before this project, I had only briefly looked at React code before. Through this project I learned how React components and hooks are useful to improve efficiency of repetitive code. useEffect is helpful to run functions under specific conditions. useState is useful for declaring variables that will be present throughout many files in the web app and updated often. Components are helpful to organize pieces of a web application. It is helpful for programmers to focus on one piece of code within a larger framework of the project. Rather than having one or two files with all of the code, components help compartmentalize the framework of a project. Before this project, I had no experience with data storage. Firebase was easy to learn and helped me understand how websites store your data. Using Firebase, I learned how to store variables and access them at a later time, build an authentication sequence, and host a web application. By encountering several bugs in the game while I was working, I learned when it is important to store user progress. This project also helped me learn responsive design through media queries. By using the inspector mode on Google Chrome, I was able to adjust the window size to determine when elements would go off the page and adjust the media queries accordingly. This also allowed me to see where to implement grids and flex boxes in CSS. By debugging my code and researching solutions online, I learned a lot about React and Javascript. 

## Discussion of how the project helped you develop your web development skills
Through this project I learned how to set up a React project, how to set up a Firebase project and store data using Firestore. I also learned how to host a web applocation through Firebase. I learned more about responsive design, debugging, and CSS. By expirimenting, researching, and asking for feedback from friends and family, I developed my web development skills through this project. 
