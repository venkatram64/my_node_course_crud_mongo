const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;


class Course {

    constructor(courseId, courseName, description, amount, id){
        this.courseId = courseId;
        this.courseName = courseName;
        this.description = description;
        this.amount = amount;
        this._id = id ? new mongodb.ObjectId(id) : null;
    }

    save(){

        const db = getDb();
        let dbOp;
        if(this._id){
            dbOp = db.collection('courses')
                    .updateOne({_id: this._id}, {$set: this});
        }else{
            dbOp = db.collection('courses')
                    .insertOne(this);
        }
        return dbOp
                .then(result => {
                    console.log(result);
                }).catch(err => {
                    console.log(err);
                });
    }

    static fetchAll(){

        const db = getDb();
        return db
                .collection('courses')
                .find()
                .toArray()
                .then(courses => {
                    console.log(courses);
                    return courses;
                })
                .catch(err => {
                    console.log(err);
                });
    }

    static findById(courseId){

        const db = getDb();
        return db.collection('courses')
            .find({_id: new mongodb.ObjectId(courseId)})
            .next()
            .then(course => {
                console.log(course);
                return course;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static deleteById(courseId){
        const db = getDb();
        return db.collection('courses')
                .deleteOne({_id: new mongodb.ObjectId(courseId)})
                .then(result => {
                    console.log('Deleted...');
                })
                .catch(err => {
                    console.log(err);
                });
    }
}

module.exports = Course;