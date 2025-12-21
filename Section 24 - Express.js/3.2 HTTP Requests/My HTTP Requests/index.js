import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
// console.log(req.rawHeaders);
// res.send("Hello World!");
res.send("<h1>This is the homepage.</h1>");
})

app.get("/about", (req, res) => {
    res.send("<h1>This is the about page.</h1>");
})

app.get("/contact", (req, res) => {
    res.send("<h1>This is the contact page.</h1>");
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})