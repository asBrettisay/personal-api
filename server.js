var express = require('express'),
    bodyParser = require('body-parser'),
    middleware = require('./controllers/middleware.js'),
    mainCtrl = require('./controllers/mainCtrl.js');

var app = express();

var logger = function(req, res, next) {
  console.log(req.body);
  next();
}

app.use(middleware.addHeaders)

app.use(bodyParser.json());

app.get('/name', mainCtrl.getName);
app.get('/location', mainCtrl.getLocation);
app.get('/occupations', mainCtrl.getOccupations);
app.get('/occupations/latest', mainCtrl.getLatestOccupation);
app.get('/occupations/:search', mainCtrl.searchOccupations);
app.get('/hobbies', mainCtrl.getHobbies);
app.get('/hobbies/:type', mainCtrl.getHobbiesByType);
app.get('/skillz', mainCtrl.getSkillz);
app.get('/secrets/:username/:pin', middleware.verifyUser, mainCtrl.getSecrets);

app.put('/name', mainCtrl.putName);
app.put('/location', mainCtrl.putLocation);

app.post('/hobbies', mainCtrl.postHobbies);
app.post('/occupations', mainCtrl.postOccupations);
app.post('/skillz', logger, middleware.generateId, mainCtrl.postSkillz);

app.listen(8001, function() {
  console.log('Listening on 8001');
})
