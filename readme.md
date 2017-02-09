#Session 3

Today we continue to work with NPM, responsive design and start looking at Expressjs - exploring some of its capabilities.

##Homework

* download this repo and review the steps below - try to get the communication between the form and mLab working. 

* upload a finished version to github (remember to use a .gitignore file)

* see the session-3-work (working branch) repo for an example of a working repo.

##NPM Review

https://github.com/sass/node-sass#command-line-interface

https://www.browsersync.io/docs/command-line



##GIT and GITHUB

Since we've just created a nice reusable setup we should save it. 

Git - a version control system originally invented for use developing Linux by Linus Torvalds. It is the standard version tool and integrates with Github to permit collaboration.

There is a handy and very simple tutorial for Git on [the Git Website](https://try.github.io/levels/1/challenges/1) which is highly recommended for those new to git and github.

1. make sure terminal is in the `basic-dom` directory using `cd` (drag-and-drop, copy paste)
1. initialize the repo:

```
git init
```

Configuring Git - only if you haven't done this before, and you only need to do this once:

```
git config
git config --global user.name " ***** "
git config --global user.email " ***** "
git config --list
```

* Add (watch) all your files:

```
git add .
```

Once you have made changes you need to commit them

```
git commit -m 'initial commit'
```

Note: `git commit`  without the `-m` flag goes into VI - a text popular UNIX text editor. To avoid this always using the -m flag when committing. (If you end up in VI, hit ESC and type “:q” to exit.)

Git Status

```
git status
On branch master
nothing to commit, working directory clean
```

* Create a new branch:

```
git branch <new branchname>
git checkout <new branchname>
git branch
```

To merge branches

* make sure the branch you want to merge is clear (`$ git status`)
* checkout the branch you want to merge into
* run status on that branch too (make sure it is clear)

```
git checkout master
git status
git merge <new branchname>
```

Delete branches:

```
git branch -d <branchname>
```

Pushing Files to Remote Repos - Github

Note: always create a .gitignore file to prevent local working/utility files from being pushed.

```
.sass_cache
.DS_store
node_modules
```

* Log into Github, create and new repo and follow the instructions e.g.

```
git remote add origin https://github.com/<nameofgithubrepo>
git push -u origin master
```

Finally - when downloading a github repo use the `clone` method to move it to your local disk while retaining the git history and branches.

Use of MSCode as a Git / diff client?


##Responsive Navigation

Move all nav related css into a new partial `_nav.scss` and import:

`@import "imports/nav";`


Nest the CSS rules:

```css
nav {
  display: flex;
  background: #007eb6;
  top: 0;
  width: 100%;
  transition: all 0.5s;
  position: relative;
  z-index: 1; 
  .fixed-nav & {
    position: fixed;
    box-shadow: 0 5px 3px rgba(0, 0, 0, 0.1); 
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    min-height: 2.25rem; 
  }
  li {
    flex: 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  a {
    text-decoration: none;
    display: inline-block;
    color: white; 
  }
}

.logo {
  max-width:0;
  overflow: hidden;
  transition: all 0.5s;
  img {
    padding-top: 0.25rem;
    width: 2rem;
    margin-left: 0.5rem;
  }
  .fixed-nav & {
    max-width:500px;
  }
}

```

Get the navigation to display vertically on small screens. 

Flip the default  `<ul>` flex direction to column:

```css
  ul {
    ...
    flex-direction: column;
    @media screen and (min-width: $break-two) {
      flex-direction: row;
    }
  }
```

Hide the nav-liks initially on small screens while maintaining the flex display characteristics on wide:

```css
  ul {
    ...
    display: none;
    // display: flex;
    @media (min-width: $break-two){
      display: flex;
      flex-direction: row;
    }
  }
```

Show the logo in small screens to use as a button (e.g. hamburger icon) and hide it on wide screens:

```css
.logo {
	display: block;
	max-width:100%;
	img {
		padding: 0.25rem;
		width: 2rem;
	}
	@media (min-width: $break-two) {
		max-width: 0;
		overflow: hidden;
	}
}
```

Make clicking on the logo show the menu on narrow screens:

```
$0.classList

window.matchMedia('only screen and (max-width: 700px)')

window.matchMedia('only screen and (max-width: 700px)').matches
```

```js
const logo = document.querySelector('.logo');
if (document.documentElement.clientWidth <= 740) {
  logo.addEventListener('click', showMenu);
}

function showMenu(e){
  if (window.matchMedia('only screen and (max-width: 740px)').matches){
    document.body.classList.toggle('show');
  }
  e.preventDefault();
}
```

Add to `_nav.scss`:

```css
.show #main ul {
  display: block !important;
}
```


Adjust the display of the list items moving most of the existing CSS into the media query.

```css
	li {
		padding: 0.5rem;
		align-items: center; 
		@media screen and (min-width: $break-two) {
			display: flex;
			flex: 1;
			justify-content: center;
			text-align: center;
		}
	}
```

Remove display: flex from the default state of nav and at it to the wide screen only:

```css
nav {
  ...
  // display: flex;
  @media screen and (min-width: $break-two){
    display: flex;
  }
```

Hide the hamburger icon after it has been clicked on:

```js
window.onhashchange = function() {
  let newloc = window.location.hash;
  let newContent = navItems.filter(navItem => navItem.link == newloc);
  siteWrap.innerHTML = `
  <h1>${newContent[0].label}</h1>
  <h2>${newContent[0].header}</h2>
  <p>${newContent[0].content}</p>
  `;
  document.body.classList.remove('show');
}
```

Other cleanup items?

Make the menu overlay the content:

```
  ul {
    flex-direction: column;
    margin: 0;
    padding: 0;
    list-style: none;
    display: none;
    flex:1;
    min-height: 2.25rem;
    position: absolute;
    background: #007eb6;
    z-index: 1000;
    width: 100%;
    @media screen and (min-width: $break-two) {
      display: flex;
      flex-direction: row;
    }
  }
```

Maximize space:

```
.site-wrap {
  max-width: 780px;
  margin: 10px auto;
  background: white;
  padding: 10px;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.05);
  transform: scale(0.98);
  transition: transform 0.5s;
  @media (min-width: $break-two){
    padding: 10px;
    margin: 20px auto;
  }
  body.fixed-nav & {
    transform: scale(1); 
  }
  h1, h2 {
    font-weight: normal;
  }
  ul {
    padding: 1rem;
  }
}
```

* Reminder - use the meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` to ensure this works on devices


##Babel

Install the dependencies babel-cli and babel-preset-es2015 and add presets to package.json.

`$ sudo npm install babel-cli --save-dev`

`$ sudo npm install --save-dev babel-preset-es2015`

Here is the documentation for [babel-cli](https://babeljs.io/docs/usage/cli/)

Add a babel script (note the output path references a min folder we need to create) and babel presets to package.json:

```
{
  "name": "basic-dom-dd2",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "watch-node-sass": "node-sass --watch scss/styles.scss --output public/css/  --source-map true",
    "start": "browser-sync start --browser \"google chrome\" --server 'public' --files 'public'",
    "babel": "babel public/js/main.js --watch --source-maps --out-file public/js/min/main-compiled.js",
    "boom!": "concurrently \"npm run start\" \"npm run watch-node-sass\" "
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.22.2",
    "babel-preset-es2015": "^6.22.0",
    "browser-sync": "^2.18.6",
    "concurrently": "^3.1.0",
    "node-sass": "^4.4.0"
  },
  "babel": {
    "presets": [
      "es2015"
    ]
  }
}

```

Add babel to our concurrent commands:

```
"boom!": "concurrently \"npm run start\" \"npm run watch-node-sass\"  \"npm run babel\" "
```

Change the link to the main.js in index.html to point to the new file.

`<script src="js/min/main-compiled.js"></script>`



#NODE and Express JS

##NODE

A simple node.js [server](https://nodejs.org/en/about/). 

Note the use of const, template strings, arrow functions and the request and response variables.

DEMO: Save this as script.js in the basic-dom folder and run it using `node script.js`

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```


##Express

The server we are using (browser sync) won't cut it when it comes to all the features needed to develop a website with all the http services we need.

Express is a framework for building web applications on top of Node.js. It simplifies the server creation process that is already available in Node and allows you to use JavaScript as your server-side language.

Aside: Here is the [generator](https://expressjs.com/en/starter/generator.html). Note the directory structure and the use of [Jade](http://learnjade.com) as a template tool. Here's a [Jade converter](http://www.html2jade.org). Note: Jade has been renamed to Pug due to a software trademark claim.

Let's look at the canonical "Hello world" [example](https://expressjs.com/en/starter/hello-world.html).

Install express using npm `$ npm install --save express`

Create `app.js` in the root folder of our project.

```js
const express = require('express') 
// require the npm library
const app = express() 
// create a var for the app to be built using express
// app is the global variable namespace for the program we are building
const port = 9000

app.get('/', (req, res) => res.send('Hello World!')) // our first route

app.get('/watchlist', function(req, res){
  res.send(`
    <h1>Watchlist</h1>
    <p>Commentary on Watchlists will go here.</p>
    `)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}!`)
})
```

Run with `$ node app.js`

Note the routing above. Change the second route to include a variable:

```
app.get('/entry/:name?', function(req, res){
  let name = req.params.name
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    `)
})
```

Test in the browser after restart: `http://localhost:9000/entry/watchlist`.

Multiple parameters are common:

```
app.get('/entry/:name?/:link?', function(req, res){
  let name = req.params.name
  let hashlink = `#${req.params.link}`
  res.send(`
    <h1>${name}</h1>
    <p>Commentary on ${name} will go here.</p>
    <p>${hashlink}
    `)
})
```

Test in the browser after restart: `http://localhost:9000/entry/watchlist/test`.

##Nodemon

We need to restart the server whenever we make a change to app.js. Let’s streamline it by using nodemon.

`$ npm install -save-dev nodemon`

To use nodemon we simply call it (instead of node) in the terminal with the name of our file:

`nodemon app.js`

We no longer need to restart our server after making changes. Nodemon will watch for changes and take care of that for us.

##Test Nodemon

Add this after the last route:

```
app.get('*', function(req, res){
  res.send(`
    <h1>Page not found</h1>
    `)
})
```

Upon save nodemon should restart the server.

===

DEMO: We will eventually be using [static](https://expressjs.com/en/starter/static-files.html) files in our exercise.

Add to app.js (above the app.get... line):

```
app.use(express.static('public'))
```

Note again that we have to stop and start the server whenever we change app.js.

Comment out `app.use(express.static('public'))` - we'll make use of this later.

===

##CRUD

CRUD is an acronym for Create, Read, Update and Delete. It is a set of operations we get servers to execute (using the http verbs POST, GET, PUT and DELETE respectively). This is what each operation does:

* Create (POST) - Make something
* Read (GET)_- Get something
* Update (PUT) - Change something
* Delete (DELETE)- Remove something

As we have seen, in Express, we handle a GET request with the get method: 

`app.get('/', (req, res) => res.send('Hello World!'))`

The first argument,  /, is the path of the GET request (anything that comes after your domain name). For localhost:3000, the browser is actually looking for localhost:3000/. The path argument in this case is /.

The second argument is a callback function that tells the server what to do when the path is matched. It takes in two arguments, a request object and a response object (req, res).

Let’s use the res object to serve an index.html page back to the browser. 

sendFile is a method that’s provided by the res object:

```
app.get('/', (req, res) => {
  // console.log(__dirname)
  res.sendFile(__dirname + '/index.html')
})
```

__dirname is a global variable for the directory that contains the app.js. 

Create index.html in the top level:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Test</title>
</head>
<body>
  <p>Testing 1 2 3</p>
</body>
</html>
```

You should be able to see the HTML file now.

##CRUD - CREATE
The CREATE operation is performed only by the browser if a POST request is sent to the server. This POST request can triggered either with JavaScript or through a <form> element.

Add the following to index.html

```
<form action="/entries" method="POST">
  <input type="text" placeholder="label" name="label">
  <input type="text" placeholder="header" name="header">
  <textarea type="text" placeholder="content" name="content"></textarea>
  <button type="submit">Submit</button>
</form>
```

```
<style>
  input, textarea {
    display: block;
    margin: 1rem;
    width: 70%;
</style>
```

Our form requires:

1. an action attribute
2. a method attribute
3. and name attributes on all <input> elements within the form

The action attribute tells the browser where to navigate to in our Express app. 

The method attribute tells the browser what to request to send. In this case, it’s a POST request.

On our server, we can handle this POST request with a post method that Express provides. It takes the same arguments as the GET method:

```
app.post('/entries', (req, res) => {
  console.log('Hello')
})
```

Refresh your browser then enter something into your form element. You should  see 'Hello' in your command line.

Express doesn’t handle reading data from the <form> element on it’s own. We have to add another package called body-parser to gain this functionality.

`$ npm install body-parser --save`

Make the following changes to app.js:

```
const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const port = 9000
app.use(bodyParser.urlencoded({extended: true}))
```

The urlencoded method within body-parser tells body-parser to extract data from the <form> element and add them to the body property in the request object.

Now, when you test your form, you should be able to see everything in the form field within the req.body object. Try doing a console.log:

```
app.post('/entries', (req, res) => {
  console.log(req.body)
})
```

##MongoDB

We first have to install MongoDB through npm if we want to use it as our database.

`$ npm install mongodb --save`

Once installed, we can connect to MongoDB through the Mongo.Client‘s connect method as shown in the code below:

```
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('link-to-mongodb', (err, database) => {
  // ... start the server
})
```

The next part is to get the correct link to our database. For our first attempt we'll use a cloud service - [MongoLab](https://mlab.com).

Create a free account with MongoLab. Once you’re done, create a new MongoDB database and set the plan to sandbox (free) and call it bcl.

Once you’re done creating the deployment, click into it and create a database user and database password. Remember these because you’re going to use it to connect the database you’ve just created.

Finally, grab the MongoDB url and add it to your MongoClient.connect method. Make sure you use your database user and password!

`MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {...}`

We want to start our servers only when the database is connected so let’s move app.listen into the connect method. We’re also going to create a db variable to allow us to use the database when we handle requests from the browser.

```js
MongoClient.connect('mongodb://dannyboynyc:dd2345@ds139969.mlab.com:39969/bcl', (err, database) => {
   if (err) return console.log(err)
    db = database
  app.listen(port, () => {
    console.log(`Listening on port ${port}!`)
  })
})
```

We’re done setting up MongoDB. Start the server using `nodemon app.js` and make sure you don't get any errors.

Now, let’s create a collection - a named location to store data - to store content for our application.

We can create the collection by using the string `entries` while calling MongoDB’s db.collection() method. Since a collection is created if it doesn't already exist we can save our first entry into the database while using the `save` method.

Also, once we’re done saving, we have to redirect the user somewhere (or they’ll be stuck waiting for our server to go the `/entries` which doesn't exist except as a post route). In this case, we’re going to redirect them back to `/`.

```js
app.post('/entries', (req, res) => {
  db.collection('entries').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
```

Now enter something into the <form> element and you’ll be able to see an entry in your MongoDB collection.

####Showing entries to users

We have to do two things to show the entries stored in MongoLab to our users.

1. Get entries from MongoLab
2. Use a some form of dynamic html (a template engine) to display the entries

We can get the entries from MongoLab by using the find method that’s available in the collection method.

```
app.get('/', (req, res) => {
  var cursor = db.collection('entries').find()
  console.log(cursor)
  res.sendFile(__dirname + '/index.html')
})
```

The find method returns a cursor (A Mongo Object) that probably doesn’t make sense when you console.log it out.

Yet this cursor object contains all entries from our database. It also contains a bunch of other properties and methods that allow us to work with data easily. One such method is the toArray method.

The toArray method takes in a callback function that allows us to do stuff with entries we retrieved from MongoLab. Let’s try doing a console.log() for the results and see what we get!


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, results) => {
    console.log(results)
    res.sendFile(__dirname + '/index.html')
  })
})
```

You now see an array of entries in the terminal. 

Next part we generate HTML that contains all our entries.

We can’t serve our index.html file and expect entries to magically appear because there’s no way to add dynamic content to a plain HTML file. What we can do instead, is to use template engines to help us out. Some popular template engines include Jade/pug, Embedded JavaScript and Nunjucks.

For this tutorial, we’re going to use Embedded JavaScript (ejs) as our template engine because it’s the easiest to start with.

We can use EJS by first installing it, then setting the view engine in Express to ejs.

`$ npm install ejs --save`

and in app.js:

`app.set('view engine', 'ejs')`

Let’s first create an index.ejs file within a views folder so we can start populating data.

```
mkdir views
touch views/index.ejs
```

Now, copy the contents of index.html into index.ejs and add.

```
<div>
  <% for(var i=0; i<entries.length; i++) { %>
    <h2><%= entries[i].label %></h2>
    <p><%= entries[i].content %></p>
  <% } %>
</div>
```

In EJS, you can write JavaScript within <% and %> tags. You can also output JavaScript as strings if you use the <%= and %> tags.

Here, you can see that we’re basically looping through the entries array and creating strings with entries[i].label and entries[i].content.

The complete index.ejs file so far should be:

```
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>MY APP</title>
    <style>
      input, textarea {
        display: block;
        margin: 1rem;
        width: 70%;
      }
    </style>
  </head>
  <body>
    <p>Testing 1 2 3</p>

    <form action="/entries" method="POST">
      <input type="text" placeholder="label" name="label">
      <input type="text" placeholder="header" name="header">
      <textarea type="text" placeholder="content" name="content"></textarea>
      <button type="submit">Submit</button>
    </form>

    <div>
      <% for(var i=0; i<entries.length; i++) { %>
      <h2><%= entries[i].label %></h2>
      <p><%= entries[i].content %></p>
      <% } %>
    </div>

  </body>
  </html>
```

Finally, we have to render this index.ejs file when handling the GET request. Here, we’re setting the results (an array) as the entries array we used in index.ejs above.


```js
app.get('/', (req, res) => {
  db.collection('entries').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {entries: result})
  })
})
```

Now, refresh your browser and you should be able to see all entries.

##Integration with the old site

We need to move the old index.html into index.ejs and re-enable app.use static. 

We can edit our package.json to proxy the browser sync to our express port number and add nodemon to our list of currently running scripts.

```
 "scripts": {
    "watch-node-sass": "node-sass --watch scss/styles.scss --output public/css/  --source-map true",
    "start": "browser-sync start --proxy 'localhost:9000' --browser \"google chrome\"  --files 'public'",
    "boom!": "concurrently \"nodemon app.js\" \"npm run start\" \"npm run watch-node-sass\" "
  },
```

You will have to comment out the onload function in order to see index.ejs:

```
// window.onload = function () {
//   window.location.hash = '#watchlist' 
// }
```


###Notes

Some interesting applications of SVG:

* http://responsivelogos.co.uk
* http://www.svgeneration.com/recipes/Beam-Center/

##Server Accounts

Username is the first seven letters of your last name + first letter of first name

Hostname is oit2.scps.nyu.edu

Password is first initial, last initial, 123890

e.g. devereld // dd123890

Test to see if your account is active by entering this URL into a new browser tab (use your username after the tilde):

http://oit2.scps.nyu.edu/~******

Ensure you are using sFTP (port 22).

Suggested clients: Cyberduck, FileZilla



