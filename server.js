const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const path = require('path');

const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
}); 

app.listen(port, function(){
    console.log('Server started on port: ' + 5000);
});