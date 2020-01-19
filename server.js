const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(
  express.static(__dirname + '/dist/robsegers')
);

app.get('/*', (req,res) => {
  res.sendFile(
    path.join(`${__dirname}/dist/robsegers/index.html`)
  );
});

// Start & listen on the default Heroku port
app.listen(process.env.PORT || 8080);