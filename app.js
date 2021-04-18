const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;

const courseRouter = require('./routes/courseRouter');
const get404 = require('./routes/errorRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

//middleware
app.use((req, res, next) => {
    next();
});

//routers
app.use(courseRouter);
app.use(get404);

mongoConnect(() => {
    app.listen(3000, () => {
        console.log("Server is running on 3000 post");
    })
})