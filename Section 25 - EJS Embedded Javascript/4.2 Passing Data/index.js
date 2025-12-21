import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/submit", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  
  var totalCharacters = firstName.trim().length + lastName.trim().length;
  var sendTitle = firstName + ' ' + lastName + ' has ' + totalCharacters + ' characters!';
  res.render("index.ejs", { title: sendTitle });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
