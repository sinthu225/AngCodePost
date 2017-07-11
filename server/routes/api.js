const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const post = require('../models/post');

const db = "mongodb://localhost:27017/codepostDB";

mongoose.Promise = global.Promise;
mongoose.connect(db, function(err) {
    if(err){
        console.log(err);
    }
});

router.get('/posts', function(req, res) {
    post.find({})
        .exec(function(err, posts){
            if(err){
                console.log('Error getting the posts');
            }
            else{
                res.json(posts);               
            }
        })
});

router.get('/details/:id', function(req, res) {
    post.findById(req.params.id)
        .exec(function(err, post){
            if(err){
                console.log('Error getting the post');
            }
            else{
                res.json(post);               
            }
        })
});

router.post('/posts', function(req, res) {
    var newpost = new post();
    newpost.title = req.body.title;
    newpost.url = req.body.url;
    newpost.description = req.body.description;
    newpost.save(function(err, addedPost) {
        if(err) {
            console.log('Error inserting the post');
        }
        else {
            res.json(addedPost);   
        }
    })

});

module.exports = router;



