## Running the app

```bash
# development
$ npm install

# watch mode
$ npm run start:dev

### Create a new user
POST http://localhost:3000/auth/signup
content-type: application/json

{
  "username" : "username1",
  "email": "email1@test.com",
  "profile_pic_url": "https://instagram.ftbs6-2.fna.fbcdn.net/v/t51.2885-19/288951379_410816231096129_2821871128473994802_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.ftbs6-2.fna.fbcdn.net&_nc_cat=1&_nc_ohc=5zSUzqEY_1UAX-XrUx7&edm=AHG7ALcBAAAA&ccb=7-5&oh=00_AfChYa_n5Fph4utW255gnq-uQOw3uBDlnihayadNJb5a2A&oe=6366BCC9&_nc_sid=5cbaad",
  "password": "12345"
}

### Sign in as an existing user
POST http://localhost:3000/auth/signin
content-type: application/json

{
  "email": "email1@test.com",
  "password": "12345"
}

### Get the currently signed in user id
GET http://localhost:3000/auth/whoami

### Sign out
POST http://localhost:3000/auth/signout

### Find a particular user with a given ID
GET http://localhost:3000/auth/1

### Find all users with a given name
GET http://localhost:3000/auth?username=username1

### Delete a user given id
DELETE http://localhost:3000/auth/1

### Update a user
PATCH http://localhost:3000/auth/1
content-type: application/json

{
  "profile_pic_url": "newUrl",
  "username": "newUsername"
}



### Create a new tag
###(User must be signed in)
POST http://localhost:3000/tags
content-type: application/json

{
  "name": "tag2"
}



### get tags by name
GET http://localhost:3000/tags?name=tag1
content-type: application/json



###Update tag name
PATCH http://localhost:3000/tags/1
content-type: application/json

{
  "name": "tag1"
}

###increase media count by id (user should have differend id)
PATCH http://localhost:3000/tags/increase/1
content-type: application/json

### Delete a tag given id
DELETE http://localhost:3000/tags/1



You can test the application directly requests.http files with Rest Cliet vscode extension or with postman



```
