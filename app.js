// const fs = require('fs');
// const https = require('https');
// const express = require('express');
// const path = require('path');

// const app = express();
// const port = 3000;

// // Load SSL certificates
// const certsDir = path.join(__dirname, 'certs');
// const privateKey = fs.readFileSync(path.join(certsDir, 'key.pem'), 'utf8');
// const certificate = fs.readFileSync(path.join(certsDir, 'cert.pem'), 'utf8');
// const ca = fs.readFileSync(path.join(certsDir, 'ca.pem'), 'utf8');
// const credentials = { key: privateKey, cert: certificate, ca: ca };

// // Middleware to handle requests
// app.get('/', (req, res) => {
//   res.send('Hello, HTTPS world!');
// });

// // Create HTTPS server
// const httpsServer = https.createServer(credentials, app);

// // Start the server
// httpsServer.listen(port, () => {
//   console.log(`HTTPS Server is running on https://localhost:${port}`);
// });


const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, HTTP world!');
});

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`);
});
