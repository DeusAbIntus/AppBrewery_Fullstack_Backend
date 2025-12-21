//Imports
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


// 1. Use the inquirer npm package to get user input.*/

const answers = await inquirer.prompt([
  {
    type: 'input',
    name: 'url',
    message: 'Enter the URL you want to convert to a QR code:',
  },
]);

// 2. Use the qr-image npm package to turn the user entered URL into a QR code image.

const qrCodeImg = qr.image(answers.url, { type: 'png'});
var writeStream = fs.createWriteStream('qrcode.png');
qrCodeImg.pipe(writeStream);

writeStream.on('finish', () => {
  console.log("Generating QR code for URL:", answers.url);
  console.log('QR code image saved as qrcode.png');
});

// 3. Create a txt file to save the user input using the native fs node module.
fs.writeFile('user_input.txt', answers.url, (err) => {
  if (err) throw err;
  console.log('User input saved to user_input.txt');
});
