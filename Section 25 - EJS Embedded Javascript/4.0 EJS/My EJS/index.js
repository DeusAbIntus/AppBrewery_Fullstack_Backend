import express from 'express';
import ejs from 'ejs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

const today = new Date();
var day = today.getDay();


app.get('/', (req, res) => {
    if (day >=1 && day <=5) {
         res.render(__dirname + '/views/index.ejs', { currentDay: "a weekday", currentMessage: "work hard!" });
    }else {
         res.render(__dirname + '/views/index.ejs', { currentDay: "the weekend", currentMessage: "relax!" });
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});