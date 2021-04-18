const mongodb = require('mongodb');
const path = require('path');
const Course = require('../models/course');

const express = require('express');

const router = express.Router();


router.get('/courses', (req, res, next) => {
    Course.fetchAll()
        .then(courses => {
            res.render('course-list', {
                courses: courses,
                path:'/courses'
            });
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/', (req, res, next) => {
    res.render('add-course', {
        path: '/'
    });
});

router.post('/add-course', (req, res, next) => {
    const courseId = req.body.courseId;
    const courseName = req.body.courseName;
    const description = req.body.description;
    const amount = req.body.amount;

    const course = new Course(courseId, courseName, description, amount);

    course
        .save()
        .then(result => {
            console.log('Course is created.')
            res.redirect('/courses');
        })
        .catch(err => {
            console.log(err);
        })
});

router.get('/edit-course/:id', (req, res, next) => {
    const id = req.params.id;
    Course.findById(id)
        .then(course =>{
            if(!course){
                return res.redirect('/');
            }
            res.render('edit-course', {
                path: '/edit-course',
                cr: course
            });
        })
        .catch(err => {
            console.log(err);
        })
});


router.post('/edit-course', (req, res, next) => {

    const id = req.body.id;
    const courseId = req.body.courseId;
    const courseName = req.body.courseName;
    const description = req.body.description;
    const amount = req.body.amount;

    const course = new Course(courseId,courseName,description, amount, id);

    course
        .save()
        .then(result => {
            console.log("Updating the course.")
            res.redirect('/courses');
        })
        .catch(err => {
            console.log(err);
        });
});

router.post('/delete-course', (req, res, next) => {
    const id = req.body.id;
    Course.deleteById(id)
        .then(() => {
            console.log('Deleting the Course...');
            res.redirect('/courses');
        }).catch(err => {
            console.log(err);
        });
})

module.exports = router;