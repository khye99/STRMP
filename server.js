// express
const express = require('express');
const mysql = require('mysql');
const app = express();
const port = process.env.PORT || 3001;
const bodyParser = require('body-parser')
app.use(bodyParser.json());    
app.use(bodyParser.urlencoded({
  extended: true
})); 
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password',
    database : 'strmp'
});
connection.connect();
app.listen(port, () => console.log(`Listening on port ${port}`));
app.post('/signin', (req, res) => {
    connection.query(`select count(*), id, hashed_password, identity from users where username='${req.body.username}' group by id`, (err, rows, fields) => {
        if (err) throw err;
        const guess = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
        if (rows[0]['count(*)'] == 1) {
            if (rows[0]['hashed_password'] == guess) {
                const data = {id: rows[0]['id'], username: req.body.username, identity: rows[0]['identity']}
                res.send(data)
                console.log(`Successful sign in for user: ${req.body.username}`);
            }
        } else {
            console.log(`Unsuccessful sign in for user: ${req.body.username}`);
        }
    })
});
app.post('/signup', (req, res) => {
    const hashed_password = require('crypto').createHash('sha256').update(req.body.password).digest('hex');
    connection.query(`insert into users(firstname, lastname, username, hashed_password, identity) values ('${req.body.firstName}', '${req.body.lastName}', '${req.body.username}', '${hashed_password}', '${req.body.identity}')`, (err, rows, fields) => {
        if (err) throw err;
        const data = {message: "Successful sign up. Please sign in."}
        res.send(data);
        console.log(`Successful sign up for user: ${req.body.username}`);
    })
});
app.post('/createclass', (req, res) => {
    connection.query(`insert into classes(code, name, owner_id, owner_name, student_id, student_name) values ('${req.body.code}', '${req.body.name}', ${req.body.owner_id}, '${req.body.owner_name}', ${req.body.student_id}, '${req.body.student_name}')`, (err, rows, fields) => {
        if (err) throw err;
        const data = {message: `Class ${req.body.name} successfully created with code ${req.body.code}`}
        res.send(data);
        console.log(`Successful creation of class ${req.body.name} with code ${req.body.node}`);
    })
});
app.post('/schedule', (req, res) => {
    connection.query(`select distinct name from classes where student_id = ${req.body.id}`, (err, rows, fields) => {
        if (err) throw err;
        const data = [];
        rows.forEach( (className) => {
            data.push(className.name);
        })
        res.send(data);
    })
})
app.post('/findclass', (req, res) => {
    connection.query(`select count(*), id, code, name, owner_id, owner_name from classes where code = ${req.body.code} group by id`, (err, rows, fields) => {
        if (err) throw err;
        if (rows[0]['count(*)'] > 0) {
            code = rows[0]['code'];
            name = rows[0]['name'];
            owner_id = rows[0]['owner_id'];
            owner_name = rows[0]['owner_name'];
            data = {
                code: rows[0]['code'],
                name: rows[0]['name'],
                owner_id: rows[0]['owner_id'],
                owner_name: rows[0]['owner_name'],
                student_id: req.body.student_id,
                student_name: req.body.student_name
            }
            res.send(data);
            console.log("Class found");
        } else {
            console.log("Class not found");
            return;
        }
    })
})
app.post('/joinclass', (req, res) => {
    console.log(req.body);
    connection.query(`insert into classes(code, name, owner_id, owner_name, student_id, student_name) values ('${req.body.code}', '${req.body.name}', ${req.body.owner_id}, '${req.body.owner_name}', ${req.body.student_id}, '${req.body.student_name}')`, (err, rows, fields) => {
        if (err) throw err;
        const data = {message: `Class ${req.body.name} successfully join with code ${req.body.code}`}
        res.send(data);
        console.log(`Successful join of class ${req.body.name} with code ${req.body.code}`);
    })
})
app.post('/findstudent', (req, res) => {
    connection.query(`select count(*), id from users where username = '${req.body.student_name}'`, (err, rows, fields) => {
        if (err) throw err;
        if (rows[0]['count(*)'] > 0) {
            const data = {
                code: req.body.code,
                student_id: rows[0]['id'],
                grade: req.body.grade
            };
            res.send(data);
        } else {
            return;
        }
        console.log(`Student found`);
    })
})
app.post('/addgrade', (req, res) => {
    connection.query(`insert into grades (class_code, student_id, grade) values ('${req.body.code}', ${req.body.student_id}, ${req.body.grade})`, (err, rows, fields) => {
        if (err) throw err;
        const data = {message: `Grade of ${req.body.grade} for student with id ${req.body.student_id} successfully added to class with code ${req.body.code}`}
        res.send(data);
        console.log(`Grade added`);
    })
})
app.post('/roster', (req, res) => {
    connection.query(`select distinct student_name from classes where code=${req.body.code}`, (err, rows, fields) => {
        if (err) throw err;
        let data = [];
        rows.forEach( (name) => {
            data.push(name.student_name);
        })
        res.send(data);
        console.log(`Roster retrieved`);
    })
})
app.post('/getgradesstudent', (req, res) => {
    connection.query(`select grade from grades where class_code='${req.body.code}' and student_id=${req.body.student_id}`, (err, rows, fields) => {
        if (err) throw err;
        let data = [];
        rows.forEach( (grade) => {
            data.push(grade.grade);
        })
        res.send(data);
        console.log(`Grades retrieved`);
    })
})
app.post('/getgradesteacher', (req, res) => {
    connection.query(`select grade, student_id from grades where class_code='${req.body.code}'`, (err, rows, fields) => {
        if (err) throw err;
        let data = [];
        rows.forEach( (grade) => {
            let string = `Student ID: ${grade.student_id}, Grade: ${grade.grade}`
            data.push(string);
        })
        res.send(data);
        console.log(`Grades retrieved`);
    })
})
app.post('/getgradesgraph', (req, res) => {
    connection.query(`select grade from grades where class_code='${req.body.code}'`, (err, rows, fields) => {
        if (err) throw err;
        let data = [];
        rows.forEach( (grade) => {
            data.push(grade.grade);
        })
        res.send(data);
        console.log(`Grades retrieved`);
    })
})
//socket
const io = require('socket.io')();

let messages = [];

io.on('connection', (client) => {
  client.on('sendMsg', (msg) => {
    messages.push(msg);
    setInterval(() => {
        client.emit('getMsg', messages);
      }, 100);
  });
});

io.listen(3002);
console.log('listening on port ', 3002);


