const fs = require("fs");

// fs.writeFile("example.txt", "Hello, Native modules!", (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// }); 

fs.readFile("example.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});