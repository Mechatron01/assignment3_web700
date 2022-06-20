const fs = require("fs");

class Data{
    constructor(students, courses){
        this.students = students;
        this.courses = courses;
    }
}

var dataCollection= null

var initialize = function () {
    return new Promise( (resolve, reject) => {
        fs.readFile('./data/courses.json','utf8', (err, courseData) => {
            if (err) {
                reject("unable to load courses"); return;
            }

            fs.readFile('./data/students.json','utf8', (err, studentData) => {
                if (err) {
                    reject("unable to load students"); return;
                }

                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));
                resolve(dataCollection);
            });
        });
    });
}

var getAllStudents = function(){
    let data=null
    return new Promise((resolve,reject)=>{
        initialize().then(dataCollect=>{
            data=dataCollect
            //console.log(data)
            if (data.students.length == 0) {
                reject("query returned 0 results"); return;
        
        
        }

        resolve(dataCollect.students);
    })
})}

var getTAs = function () {
    let data =null
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];
        initialize().then(dataCollect=>{
            data=dataCollect
            //console.log(data)

        for (let i = 0; i < data.students.length; i++) {
            if (dataCollection.students[i].TA == true) {
                filteredStudents.push(data.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    })
    });
};

var getCourses = function(){
    let data=null
   return new Promise((resolve,reject)=>{
    initialize().then(dataCollect=>{
        data=dataCollect
        //console.log(data)
    if (data.courses.length == 0) {
        reject("query returned 0 results"); return;
    }

    resolve(dataCollect.courses);
   });
})
}

var getStudentByNum = function (num) {
    return new Promise(function (resolve, reject) {
        var foundStudent = null;
        initialize().then(dataCollection=>{
            //data=dataCollection
            //console.log(data)

        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].studentNum == num) {
                foundStudent = dataCollection.students[i];
            }
        }

        if (!foundStudent) {
            reject("query returned 0 results"); return;
        }

        resolve(foundStudent);
    })
    });
};

var getStudentsByCourse = function (course) {
    return new Promise(function (resolve, reject) {
        var filteredStudents = [];
        initialize().then(dataCollection=>{
            //data=dataCollection
            //console.log(data)
        for (let i = 0; i < dataCollection.students.length; i++) {
            if (dataCollection.students[i].course == course) {
                filteredStudents.push(dataCollection.students[i]);
            }
        }

        if (filteredStudents.length == 0) {
            reject("query returned 0 results"); return;
        }

        resolve(filteredStudents);
    })
    });
};



    module.exports={initialize,getAllStudents,getTAs,getCourses,getStudentByNum,getStudentsByCourse}

 