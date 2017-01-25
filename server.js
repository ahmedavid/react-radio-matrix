const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ type: '*/*' }));


var port = process.env.PORT || 3000;

app.listen(port,function () {
    console.log('Server starting on port '+port);
});