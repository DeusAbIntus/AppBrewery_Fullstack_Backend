import express from "express";
const app = express();
const myPort=3000;

app.listen(myPort, () => {
    console.log(`Server is running on port ${myPort}`);
})