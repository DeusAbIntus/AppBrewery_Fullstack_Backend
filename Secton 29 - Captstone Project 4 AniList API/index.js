//imports
import express from 'express';
import axios from 'axios';
import striptags from 'striptags';

//create express app and set port number
const app = express();
const PORT = 3000;
const API_URL = 'https://graphql.anilist.co';

//use public folder for static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

//query to fetch data from API
const query = `query AnimeQuery($type: MediaType, $page: Int, $perPage: Int, $sort: [MediaSort], $seasonYear: Int, $isAdult: Boolean, $formatIn: [MediaFormat], $genreIn: [String]) {
  GenreCollection
  Page(page: $page, perPage: $perPage) {
    media(type: $type, sort: $sort, seasonYear: $seasonYear, isAdult: $isAdult, format_in: $formatIn, genre_in: $genreIn) {
      title {
        english
        romaji
      }
      averageScore
      genres
      description
      coverImage {
         large
         medium
      }
      isAdult
      format
    }
  }   
}`;

// variables for the query
const variables = {
  type : "ANIME",
  perPage : 5,
  page: 1,
  sort: "POPULARITY",
  seasonYear: 2025,
  isAdult: false,
  formatIn: [
    "TV",
    "MOVIE"
  ],
  genreIn: null
};

let selectGenres = [];

//home page route
app.get ( '/' , async (req, res) => { 
    try {
        const response = await axios.post(API_URL, {
            query: query,
            variables: variables
        });

        const media = response.data.data.Page.media;
        const animes =[];
        media.forEach(item => {
            const anime = new Object({
                title : item.title.romaji ?? item.title.english,
                score : item.averageScore ?? 'N/A',
                image : item.coverImage.large ?? item.coverImage.medium,
                description : striptags(item.description) ,
                genre : item.genres.join(', ') ?? 'N/A',
            });
            animes.push(anime);
        })

        const genres = response.data.data.GenreCollection.filter(genre => {
          return !['Hentai', 'Ecchi'].includes(genre);
        });
        res.render('index', { 
            animes: animes,
            genres: genres
        });
 
    } catch (error) {
        console.error(error);
    }
 })

 app.post ( '/' , async (req, res) => { 
    console.log(req.body);
    selectGenres = req.body.genres;
    variables.genreIn = selectGenres;
    
    try {
      const response = await axios.post(API_URL, {
            query: query,
            variables: variables
      });

       const media = response.data.data.Page.media;
        const animes =[];
        media.forEach(item => {
            const anime = new Object({
                title : item.title.romaji ?? item.title.english,
                score : item.averageScore ?? 'N/A',
                image : item.coverImage.large ?? item.coverImage.medium,
                description : striptags(item.description) ,
                genre : item.genres.join(', ') ?? 'N/A',
            });
            animes.push(anime);
        })

        const genres = response.data.data.GenreCollection.filter(genre => {
          return !['Hentai', 'Ecchi'].includes(genre);
        });
        
        res.render('index', { 
            animes: animes,
            genres: genres
        });
      
    } catch (error) {
      console.error(error);
    }
 });

 //start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});