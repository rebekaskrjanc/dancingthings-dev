# Dancing Things

Dancing Things is a social media app, connecting dancers, choreographers, teachers and dance companies all around the world. After sign up, a new user is created. User can view the news feed, add comments, view and edit his/her profile, view Groups, Photos and Members pages.

## How to install step by step
#### Clone this repository using command: 

```bash
$ git clone bitbucket_url
```

#### All of the following prerequisites must be installed in order to run Dancing Things app:
* npm
* node
* MongoDB (v3.6.*)
### Installation instructions:
* [MongoDB guide](https://docs.mongodb.com/manual/installation/)
* [Node.js + npm](https://nodejs.org/en/download/)
#### In order to set up your local database, run the following command in your pc's root folder: 

```bash
$ mongod
```

#### Intstall all of the dependecies using command inside the /app folder: 

```bash
$ npm install
```

#### After the dependecies are installed you can run the app  with command:
```bash
$ npm start
```
#### I'm using reCaptcha at registration. You need to install it with command:
```bash
$ npm install --save angular-recaptcha
```
#### Your .env file should include:

JWT_GESLO=toleNašeGeslo
RECAPTCHA_SECRET=6LflaIkUAAAAAAfR5X9W2ICth8VNNFuljBh8ymBT

#### Install UglifyJS

```bash
$ npm install uglify-js --save
```
### Install jsonwebtoken
```bash
$ npm install jsonwebtoken --save
```
### Install dotenv
```bash
$ npm install dotenv --save
```
#### Configuration of Passport
```bash
$ npm install passport --save
```
```bash
$ npm install passport-local --save
```
### Install express-jwt
```bash
$ npm install express-jwt --save
```





## App urls
* Local app url: http://localhost:3000/db
* Heroku app url: https://oddaja-sp.herokuapp.com/db

## Registration page - Inputs (defined in sign-up-validation.js)
* On Sign Up page, all of the fields need to be filled out. 
* Name needs to be at least 3 characters long.
* Email needs to be in a proper format.
* Both passwords on sign up page must match.
* Password has to be at least 5 characters long.

## Feautured Screens

* ### [Registration screen]:
	* User can create an account (sign up requirements listed above).

* ### [Log in screen]:
	* User can log in with the email and password he chose at registration.
	
* ### [News Feed]:
	* Users can view the posts, and comment on the posts. Creating the post is possible at the top of the homepage, by entering the content in the text box and clicking the "Submit" button. If there are no posts in the database, the user can see the message: "Hmm... it seems like there are no posts yet.". 
	If there are more than 10 posts, they will be split between pages. Posts per page limit is set to 10. 

* ### [Add Comment]:
	* Users can add a comment to any post by clicking on the "Add Comment" button. Modal window opens and user can enter his/her comment and save it.

* ### [Edit post]:
	* Users can edit only their posts by clicking on the "Edit Post" button whics appears only if current User is the author of the post. Modal window appears and user can provide a new content, click save and the post is edited and displayed. While editing, authors can also delete the post by clicking on the red "Delete" button, which is displayed when the modal window is open.
	
* ### [My Profile]:
	* Users can see their profile page and all the posts they made in the past. They can add new posts and comment on the posts displayed. 
	
* ### [Members]:
	* Users can se other members of the Dancing Things App. If there are no other members than the current user, this is the only user that will be displayed on this page. 

* ### [Groups]:
	* Users can see various groups that exist on this social media app. If there are no groups in the database, the user can see the message: "Hmm... it seems like there are no posts yet.". Users can always add new groups to the database, by clicking on the "Add Group" button. Modal window opens and the required fields need to be filled out. When clicking the "Create Group" button, the new group is created and displayed. The user who made the group is automatically set as an Admin of created group. 

* ### [Edit group]:
	* Users can edit their groups by clicking the "Edit Group" button which is only visible to group admins and the Admin. Modal window opens and the required fields need to be filled out. When clicking the "Save" button, group is edited and displayed. While editing, admins can also delete the group by clicking on the red "Delete" button, which is displayed when the modal window is open.

## User roles and permissions
* Admin - When logged in they can see all the posts, groups and members. All pages are fully visible to them. They can edit and delete EVERY post or group.
* Member - When logged in they can see all posts, groups and members. All pages are fully visible to them. They can edit and delete only the post or group which they created in the past (They have to be the post author or the group admin).
* Viewer - None of the pages are fully visible to them. There is a message displayed on every page which lets them know that they're not logged in. 


## Speed testing in Chrome and Firefox

| Views :                        |     Firefox   |  Chrome |
| -------------------------------|:-------------:| -------:|
| home                           | 273ms         |  589ms  |
| members                        | 251ms         |   521ms |
| groups                         | 262ms         |  453ms  |
| my profile                     | 245ms         |   572ms |
| registracija                   | 260ms         |  1270ms |
| prijava                        | 187ms         |   432ms |

Chrome needed significantly more time to load registration view beacuse of all the files it needed to load to make reCaptcha work. While Firefox also had to load reCaptcha related files, it did it much faster. The homepage was loaded the slowest in firefox but only slightly. With all the scripts and other files that are required to load to make all the views work, the home view had to make the most GET requests to get all the data from the database.

## Apache jMeter tests
* ### [Machine specifications]
	* Processor: 3,1 GHz Intel Core i5
	* RAM 16GB
	* 256GB PCIe-based onboard SSD

Test results are visible in the csv. tables which I provided in the folder "jMeter tables".

## Development guidelines:

* I'm working alone, so I mostly use the master branch. I always check if everything is working brfore pushing some changes to my repository. I follow the standard Git workflow:

* Commit
* Pull -> resolve merge conflicts if any
* Push

## Supported devices
* PC
* iphone X
* Samsung GalaxyS7
* iphone 6
	
