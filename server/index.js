const express = require('express');
const jsonParser = require('./jsonParses')
const path = require('path');
const testJSON = require('./questions.json');
const router = express.Router();
router.use(express.urlencoded({
    extended: true
}));
module.exports = router;
router.get('/', function(req,res, next){
        res.sendFile(path.join(__dirname, '../static/index.html'), function (err) {
        if (err) {
            next(err);
        } else {
            console.log('Sent: ./static/loginpage.html');
        }
    });//returns main page
})
router.get('/startQuiz', function(req,res){
    var questions = jsonParser.returnQuestion(testJSON);
    res.send(questions);
});//responds with json object of questions
router.post('/checkAnswer', function(req,res){
    res.send(jsonParser.checkAnswer(testJSON, req.body));
})//check answer for given question
router.post('/submitTest', function(req,res){
res.send(jsonParser.submitTest(testJSON,req.body));
});//responds with a score