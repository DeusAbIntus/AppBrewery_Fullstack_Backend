//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const PASSWORD = 'ILoveProgramming';
var pwIsCorrect = false;

app.use(bodyParser.urlencoded({ extended:true }));
app.use(morgan('common'));

function passwordChecker(req, res, next) {
    const userPassword = req.body["password"];
    if(userPassword === PASSWORD){
        pwIsCorrect = true;
    }
    next();
}    

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.use(passwordChecker);

app.post('/check', (req, res) => {
    if(pwIsCorrect){
        res.sendFile(__dirname + '/public/secret.html');
    }else{
        res.sendFile(__dirname + '/public/index.html');    
    }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
