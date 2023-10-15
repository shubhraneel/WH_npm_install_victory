# Website Hackathon - npm install victory

## Technologies Used

1. Frontend - ReactJs
2. Backend - NodeJs + ExpressJs
3. Database - MongoDB
4. File Storage - AWS S3

## Important Link

* [Website Link](https://website-hackathon-hosting.web.app/)
* [Postman Collection Link](https://documenter.getpostman.com/view/12525821/UVXqECs9)

## Quick Start

**Admin Setup**

```bash
# Install dependencies for admin by moving to admin folder  
cd admin
npm install

# Run the react application only by moving to admin folder
npm start
```

**Client Setup**

```bash
# Install dependencies for client by moving to client folder  
cd ../client
npm install

# Run the react application only by moving to client folder
npm start
```

**Server Setup**

```bash
# Move to server folder  
cd ../server
```

Create a .env file with following variables

```bash
DATABASE=mongodb+srv://ronak3434:ronak3434@cluster0.au5dt.mongodb.net/websitehackathon?retryWrites=true&w=majority

EMAIL=lankapatiravanfromlanka@gmail.com
PASSWORD=ihrmwabpjykslhat

JWT_SECRET=cvhfgr3qg46whthhebvhkuhrvabkuhe
CLIENT_URL=http://localhost:3000/

AWS_ACCESS_KEY=AKIA2Y55M4WWDJFWK2WD
AWS_SECRET_KEY=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

ALGOLIA_ID=99S8RIU266
ALGOLIA_ADMIN_KEY=d10c0960a7dd27cc8e5ed12b8b20480e
```
```bash
# Install dependencies for server 
cd ../server
npm install

# Run the node + express application only by moving to server folder
npm start

```

```bash
# Server runs on http://localhost:8000, client on http://localhost:3000 and admin on http://localhost:4000.
```

**Register Users To Login**
* Login As Admin with the credentials: ``` Username: 'Admin--HarshKumarJha' Password: 'admin1234' ```
* Go to the `Student's Data` tab on the side-menu
* Add your email, name and other data in the `sample-student-data.xlsx` file provided in the repo.
* On the Admin Dashboard, Click on `Add Students` and select that excel sheet.
* Login with your email as a student to view the student's side of the web-app

**Login as a Society Official**
* Login As Admin with the credentials: ``` Username: 'Admin--HornDoe' Password: 'admin1234' ```
* You are good to go, explore the admin dashboard as a society official

## Features

* **Scalability** - MongoDB database is used giving options for both horizontal and vertical scaling. The support of MongoDB Atlas will make managing the scaling easy. 
* **Viability** - The app has been made keeping in mind the quality of the production environment. SEO has been taken care by following SEO friendly practices, for example, uasge of React Helmet.
* **Ease of development** - MERN (MongoDB, Node, Express, React) stack is used which is one the most popular web stack. Addition and editing of features is made easy by a modular design using components and containers and state management with React-Redux. Redux-Saga is used to make API calls and managing their side effects easy. Common components like customized headings, navbar, footer, buttons have been separated for ease of reuse.
* **Ease of updating** - An admin page has been made where data can be easily modified by non-developers. 
* **Separation of responsibility** - State management is done at the container level only and has been separated from Components. Styled Components have been used to separated style from functionality. Styles have mostly been kept away from the container level.

## Innovative Feature

* **Fundae Finder** - Students can search for seniors using tags of the field of expertise of the seniors they want to ask fundae from. They can send a request to the senior for their contact details and the senior will be notified of the request and the senior can accept and reject the request. The student shall be notified back with the contact details if accepted, else notified about rejection.

* **Notifications** - Users will get the notification regarding the requests from FundeFinder that they might have sent or received.

* **Event Share** - Users have an option to share the events page.

## Other Details

* Officials in our design are Admin, TSG Officials, Society officials.
* So, Bill reimbursement feature is not in Society Point page.

## Todos
 
 - [x] Admin Page
 - [x] Home Page
 - [x] Student Profile
 - [x] Events
 - [x] Society Point
 - [x] News Bulletin
 - [x] Students’ Point
 - [x] Quick Info
 - [x] Archives
 - [x] Notifications (Innovative Feature)
 - [x] Fundae Finder (Innovative Feature)
 - [ ] Archives
 - [ ] Events Stats and Results 
 - [ ] Explore 

## Next Up ...

* Application is designed in such a manner that a student can be society official of one society. Can fix this.
* On achievemant upload by the user, the achievement gets added to the users achievement without any official review. Can fix this.


### Author

Harsh Jha
[Harsh Jha](https://github.com/hkjal1605)

Shubhraneel Pal
[Shubhraneel Pal](https://github.com/shubhraneel)

Ronak Agarwal
[Ronak Agarwal](https://github.com/ronakagarwal3434)
