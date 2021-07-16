# Cazoo Code Challenge

## Intro

I took the frontend challenge but created a basic API and database instance to interact with it.

The frontend is done with Angular 12, using Sass for styling and Kasma/Jasmine for unit testing.
The basic backend solution is done with node.js with express.js and mongoose.js.

For the database was used Mongo.DB.

## Assumptions

- There are no users and no login screen: everyone can edit the car.
- The list will show only the car details that were required.
- On the car details we can see the remaining properties that were created and not mentioned on the challenge added by me.
- The car availability cannot be in the past.
- The car year should be from 1970 until the present.
- The car properties color, fuel type, and transmission are dependent on the model.
- The car properties added are just examples and there are other missing that are critical in teams of a real car demonstration like the engine power or the number of doors.
- No cars can be deleted throughout the application, only edited.

## Car Properties

The car object that is represented on the database has the following properties:

- Maker\*
- Model\*
- Year\*
- Color\*
- Monthly, subscription price\*
- Available from, when the car is available for booking\*
- Fuel Type
- Mileage
- Transmission
- Seats

## Possible improvements

Due to the lack of time that I had on the time given to make the challenge, some improvements are needed to be done being some of them:

### Frontend

- Better tests and test coverage: I tried to put some examples of tests on services, pipes, and components, including async tests as a demonstration, but to have the application working from end-to-end in the time I had available, I consider that a lot of tests are missing. I can then give examples of how and what there is needed to be tested.
- Better styling and class attribution using a methodology like BEM and using more the global style files.
- Better error handling, giving use to the interceptor, like sending the errors to a Kibana stack or something similar.
- Add some functional/end-to-end tests, at least smoke tests.
- Linting rules could be added, one of my references if for example the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).
- Constants like the car makes and models should be stored and fetched from the database for example.
- Better styles for responsiveness, despite the short time I worked to make all the screens as much responsive as possible, it could be achieved using mixins for example.
- ...

### Backend

- I created a backend to try node.js, express.js, and Mongo.DB for the first time so it could not only help me present the application but I could also learn along the way and experiment with new technologies.
  There are no validations on the backend, neither correct error handling, response codes, or tests.

## Running the application

### Dockerized version

We need to build the images first since they are currently not distributed.

1.  Enter the directory /cazoo-frontend and run

        $ npm install

2.  After the installation run

        $ npx ng build

3.  After the build we create the image with

        $ docker build -t cazoo-challenge-frontend .

4.  Open the terminal on the directory /cazoo-backend run

        $ npm install

5.  After the installation we create the image with

        $ docker build -t cazoo-challenge-backend .

6.  After both images are created we go back to the root folder and run the docker-compose
        
        $ cd ..
        $ docker-compose up

This would start the following containers:

- mongo on localhost:27017
- cazoo-challenge-backend on localhost:8080
- cazoo-challenge-frontend on localhost:80

To access the application just open the [localhost](https://localhost) on your browser

### Running the application locally

1.  On the root of the project we start the mongo.db image with the command

        docker-compose up mongo

2.  Enter the directory /cazoo-frontend and run

        $ npm install

3.  After the installation run

        $ npx ng serve

4.  Enter the directory /cazoo-backend and run

        $ npm install

5.  Run npm start to start the frontend

        $ npm start

You can now access the application on [localhost:4200](https://localhost:4200)
