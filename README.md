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

## App urls
* Local app url: http://localhost:3000/
* Heroku app url: https://oddaja-sp.herokuapp.com/homepage

## Sign Up page - Inputs (defined in sign-up-validation.js)
* On Sign Up page, all of the fields need to be filled out. 
* Name needs to be at least 3 characters long.
* Email needs to have in a proper format 
* Both passwords on sign up page must match

## Feautured Screens

* ### [Sign Up screen](screenshots/signup.png):
	* User can create an account (sign up requirements listed above).
	
* ### [News Feed](screeshots/index.png):
	* Users can view the posts, and comment on them posts. If no posts are visible, that's because there's no post in the database yet. You can make your first post by entering some text in the "Write on the wall" field.
	
* ### [User Profile](screeshots/profile.png):
	* Users can see their profile page and edit it, by clicking on the edit button. Delete button deletes the user.

* ### [Edit profile](screeshots/editprofile.png):
	* Users can edit their profile by providing the new information about them and clicking submit. Not all fields are mandatory. If entered, both passwords must match.
	
* ### [Members](screeshots/members.png):
	* Users can se the other members of the Dancing Things App.
	
* ### [Groups](screeshots/groups.png):
	* Users can see various groups that exist on this social media app.

* ### [Photos](screeshots/photos.png):
	* Users can see their photo gallery.


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
	
