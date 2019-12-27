# All the News That's Fit to Scrape - MetalScrapes

![MetalScrapes](public/images/github-header.jpg)

[Project Demo](https://scrappies.herokuapp.com/)

### Overview

In this assignment, you'll create a web app that lets users view and leave comments on the latest news. But you're not going to actually write any articles; instead, you'll flex your Mongoose and Cheerio muscles to scrape news from another site.

**Scraping from https://metalinjection.net/**

### Npm packages used:

   1. express

   2. express-handlebars

   3. mongoose

   4. cheerio

   5. axios

   6. dotenv

   7. morgan

   8. moment


## Instructions

* Create an app that accomplishes the following:

  1. Whenever a user visits your site, the app should scrape stories from a news outlet of your choice and display them for the user. Each scraped article should be saved to your application database. At a minimum, the app should scrape and display the following information for each article:

     * Headline - the title of the article

     * Summary - a short summary of the article

     * URL - the url to the original article

     * Feel free to add more content to your database (photos, bylines, and so on).

  2. Users should also be able to leave comments on the articles displayed and revisit them later. The comments should be saved to the database as well and associated with their articles. Users should also be able to delete comments left on articles. All stored comments should be visible to every user.

  3. [Watch this demo of a possible submission](https://youtu.be/4ltZr3VPmno). See the deployed demo application [here](http://nyt-mongo-scraper.herokuapp.com/).

* Beyond these requirements, be creative and have fun with this!
