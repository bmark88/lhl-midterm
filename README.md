## About Resource Wall

Resource wall was created with the idea in mind, that learning should be fun and attractive!
- Organize your learning by category
- Find the pin that suits your learning style
- Enjoy the content
- Make sure to contribute your own pins so others can learn from you!

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information 
  - username: `labber` 
  - password: `labber` 
  - database: `midterm`
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Reset database: `npm run db:reset`
  - Check the db folder to see what gets created and seeded in the SDB
7. Run the server: `npm run local`
  - Note: nodemon is used, so you should not have to restart your server
8. Visit `http://localhost:8080/`

## Dependencies
- bcrypt: 3.x or above
- body-parser: 1.19.x or above
- chalk: 2.x or above
- cookie-parser: 1.4.x or above
- cookie-session: 1.4.x or above
- dotenv: 2.x or above
- ejs: 2.x or above
- express: 4.x or above
- morgan: 1.9.x or above
- nodemon 1.19.x or above
- node-sass-middleware: 0.11.x or above
- pg: 6.x or above
- pg-native: x or above
