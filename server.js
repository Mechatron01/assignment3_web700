/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Mohammed Muzakkir Ahmed Student ID: 128158219 Date: 19/06/2022
*
********************************************************************************/ 



var collegedata= require('./modules/collegeData')
var express= require('express')
var app= express()


var HTTP_PORT = process.env.PORT || 8080;
var path=require('path')

// setup a 'route' to listen on the default url path
app.get("/", (req, res) => {
    res.send("Hello World!");
});



// Add middleware for static contents
app.use(express.static('views'))
app.use(express.static('modules'))

// Get request for student details
app.get('/students', (req, res) => {

    if( req.query.course &&  req.query.course !== undefined){
        let courseParas = req.query.course;
        console.log(courseParas);

         collegedata.getStudentsByCourse(courseParas).then(course => {
                res.send(course)
                console.log("courses data retrieved")
            }).catch(err => {
                err = {
                message : "no results"}
            res.send()})
           
        }
        else {
            collegedata.getAllStudents().then(students => {
            res.send(students)
            }).catch(err => {
                err = {
                message : "no results"}
            res.send()
        })
    }
})

app.get("/tas", (req, res) => {
        collegedata.getTAs().then(tas => {
        res.send(tas)
        console.log("TAs Loaded successfully" )
        }).catch(err => {
        err = {
            message : "no results"}
        res.send()
    })
})


app.get("/courses", (req, res) => {
        collegedata.getCourses().then(courses => {
        res.send(courses)
        console.log("Get courses called successfully" )
        }).catch(err => {
        err = {
            message : "no results"}
        res.send()
    })
})


app.get("/student/:studentnum", (req, res) => {
    console.log("Entering student num")
    let studentnumber = req.params.studentnum
            collegedata.getStudentByNum(studentnumber).then(students => {
                res.send(students)
                console.log("Student found")
            }).catch(err => {
                console.log(err)
            })
           
        })

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/home.html"));
});



app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname,"./views/htmlDemo.html"));
});

app.get('*', function(req, res){
    res.send('Page Not Found', 404);
});

// setup http server to listen on HTTP_PORT
collegedata.initialize()
.then(app.listen(HTTP_PORT, ()=>{
    
    console.log("server listening on port: " + HTTP_PORT)
}))
.catch(err => {
    console.log("Error: Can't intialize the json files")
})
