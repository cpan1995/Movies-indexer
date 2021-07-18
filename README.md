# Movies-indexer

How To Use:
1. Clone Repo to local directory
2. Change API in line 3
3. Run command explorer.exe/open index.html

This was minimum viable product assignement/project. We used OMDB api as our restful api. Unforunately we were only allowed 1000 calls per day per api key. So experience may vary. 

#Index.js

1 get fetch to find total amount of pages and 1 looped get fetch to display search movies/titles listed. Applies filtering by year and genre. As well as displaying titles in a nested container. 

#imdb_scraper.js

Scarped https://www.imdb.com/chart/top to find all imdbID of the top 250 titles listed on the page then applied a fetch get call from OMDB to receive meta data of each imdbID. Results were appended to db.json to be used at a later time. Script runs in Node.Js
