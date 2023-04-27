const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const questions = [
    {
        question: "What is the capital of India?",
        options: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
        answer: "New Delhi"
    },
    {
        question: "What is the currency of Japan?",
        options: ["Dollar", "Yen", "Euro", "Pound"],
        answer: "Yen"
    },
    {
        question: "Who is the CEO of Amazon?",
        options: ["Bill Gates", "Mark Zuckerberg", "Jeff Bezos", "Sundar Pichai"],
        answer: "Jeff Bezos"
    }
];

mongoose.connect('mongodb://127.0.0.1:27017/blogDB',{useNewUrlParser: true});

const postSchema = {

  title: String,
 
  content: String
 
}; 

const Post = mongoose.model("Post", postSchema);

// app.get("/",function(req,res){

    
    
//   });
  

app.get('/', (req, res) => {
    res.render('ques', { questions: questions });
    Post.find({})
      .then(posts => {
        res.render("ques", {
          startingContent : homeStartingContent,
          posts : posts
        });
      })
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      });
});
app.get("/compose", function(req,res){
    res.render("compose");
})


app.post('/submit', (req, res) => {
    let score = 0;
    for (let i = 0; i < questions.length; i++) {
        let userAnswer = req.body[`q${i+1}`];
        if (userAnswer === questions[i].answer) {
            score++;
        }
    }
    res.render('score', { score: score, total: questions.length });
});

// app.post("/compose", function(req,res){
//     const post = new Post({
//       title : req.body.composeTitle,
//       content : req.body.composePost
//     })
  
//     post.save();
  
//     res.redirect("/");
    
//   })


  app.post('/compose', (req, res) => {
    const newQuestion = {
      question: req.body.question,
      options: [
        req.body.option1,
        req.body.option2,
        req.body.option3,
        req.body.option4
      ]
    };
    questions.push(newQuestion);
    res.redirect('/');
  });
  

app.listen(5000, () => {
    console.log('Server started on port 3000');
});
