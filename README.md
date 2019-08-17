# Streetrod Scrape
This full-stack app allows hotrod fans to scrape articles from Hotrod Network, save articles to a saved article page, post or delete comments on each saved article, and removed articles from the saved list. Articles and notes are saved to a MongoDB database for persistent data.

Heroku URL: https://aqueous-beach-96337.herokuapp.com

## Technologies used:
* MongoDB
* Mongoose
* Cheerio
* Node.js
* Express
* Handlebars
* Bootstrap
* jQuery

## How it works
* Clicking the "Scrape New Articles" button in the navbar triggers a cheerio scrape of https://www.hotrod.com/. 
* If the results include the required database fields and are not duplicates of existing articles in the database a new document is created in the database for each article.
* Articles in the database are displayed on the page using Handlebars "each" method.
* Clicking "Save article" triggers a put route to update the article's saved status and redirects to the saved articles page.
* From the saved page, a user can remove a saved article without deleting it from the database. This is done by updating the saved status to false.
* Notes can be added to any saved article. Notes are stored in a separate collection and populated to the corresponding article document.
* Clicking "Clear Articles" deletes all documents from the database.

<img src="public/images/streetrod-scrape_600x300.jpg" alt="home page" />

