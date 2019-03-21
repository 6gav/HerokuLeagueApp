//Module imports
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

//Setup App
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));


//Route imports
const routes = require('./server/routes.js');
routes.registerPaths(app);


//Production route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
}); 


//Start server listening for connections
app.listen(port, function(){
    console.log('Server started on port: ' + 5000);
});