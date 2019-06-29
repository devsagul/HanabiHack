var mysql 		= require('mysql');
var nodemailer 	= require('nodemailer');
var db 			= require('../config/database.js')

var times = ['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00',
'16:30','17:00','17:30'];
var id_inc = 0;


var connection = mysql.createConnection({
    host: db.sql_host,
    user: db.sql_user,
    password: db.sql_password,
    database: db.sql_database
})
console.log("attempting connection");
connection.connect();

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}


// function getAppointments(res) {


//     Appointment.find(function (err, appointments) {

//         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
//         if (err) {
//             res.send(err);
//         }
//         console.log(appointments)
//         res.json(appointments); // return all todos in JSON format
//     });
// };

// function getBlackouts(res){
//     Blackout.find(function (err, blackouts){
//         if(err)
//             res.send(err)

//         res.json(blackouts);
//     });
// };

function sendMail(req, code){
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'doitemailtest@gmail.com',
            pass: 'DoIT2015'
        }
    })
    var mailOptions = {
        from: '"DoIT Tech Store" <doitemailtest@gmail.com>',
        to: req.body.email,
        subject: 'Cherwell Appointment',
        text: 'name='+req.body.name+'\n\nThis is an email confirmation for the appointment that you have scheduled for ' + req.body.date.substring(0, 15) + ' at ' + req.body.time
    }
    if (code == 1) {
        // going to cherwell
        mailOptions = {
        from: '"DoIT Tech Store" <doitemailtest@gmail.com>',
        to: req.body.email,
        subject: 'Cherwell Appointment',
        text: 'name='+req.body.name+'\n\nThis is an email confirmation for the appointment that you have scheduled for ' + req.body.date.substring(0, 15) + ' at ' + req.body.time
    }
    } else {
        mailOptions = {
        from: '"DoIT Tech Store" <doitemailtest@gmail.com>',
        to: req.body.email,
        subject: 'DoIT Appointment',
        text: 'Hello! '+req.body.name+'\n\nThis is an email confirmation for the appointment that you have scheduled for ' + req.body.date.substring(0, 15) + ' at ' + req.body.time
    }
    }

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log("Failed Message Send")
            return console.log(error)
        }
        console.log("Message Sent")
    })
}

function isInArray(value, array) {
    return array.indexOf(value) > -1;
}


module.exports = function (app) {

        // get all appointments
        app.get('/api/appointments', function (req, res){
                // use mongoose to get all appointments
                // getAppointments(res);
            });




        app.get('/api/schedule', function(req, res){

            var schedule = [];
            function addDays(date, days) {
                var result = new Date(date);
                result.setDate(result.getDate() + days);
                return result;
            }




            var today = new Date;
            var firstday = new Date(today.setDate(today.getDate() - today.getDay()));
            var last_week_day = new Date(today.setDate(today.getDate() - today.getDay()+6))
            var lastday = new Date(today.setDate(today.getDate() - today.getDay()+13));

            var month1 = firstday.getMonth()+1;
            var month2 = lastday.getMonth()+1;


            // console.log("MONTHS!!!!")
            // console.log(lastday)
            if(month1.toString().length === 1){
                // console.log(month1)
                month1 = "0" + (month1);
            }
            if(month2.toString().length === 1){
                // console.log(month2);
                month2 = "0" + (month2);
            }

            var temp_mon = firstday.getDate().toString();
            if(firstday.getDate().length === 1 ){
                temp_mon = "0" + firstday.getDate()
            }
            var temp_fri = lastday.getDate().toString();
            // console.log(temp_fri, "<------------------------------------------")
            // console.log(temp_fri.length)
            if(temp_fri.length === 1){
                temp_fri = "0" + lastday.getDate()
            }

            var mon= firstday.getFullYear() + "-" + month1 + "-" + temp_mon;
            var fri= lastday.getFullYear() + "-" + month2 + "-" + temp_fri;

            // console.log(mon)
            // console.log(fri)





            // GET TEAM LEADS AND SUPERVISORS TO REMOVE FROM SCHEDULE
            var leads = []
            var leadQuery = "SELECT emp.Nick_Name, emp.Last_Name\n" +
            "FROM SS_Employee as emp\n" +
            "JOIN SS_Employee_TS as ets on emp.Employee_ID = ets.Employee_ID\n" +
            "WHERE ets.`Position` != 37\n" +
            "AND emp.Employment_Active = 1"
                            // console.log(leadQuery)
                            connection.query(leadQuery, function(err, data){
                                for(var i = 0; i < data.length; i++){
                                    leads.push(data[i].Nick_Name + " " + data[i].Last_Name)
                                }
                                // console.log(leads)
                            })



                            var query = "SELECT emp.Nick_Name, emp.Last_Name, sch.`date`,`8:00`, `8:30`, `9:00`, `9:30`, `10:00`, `10:30`, `11:00`, `11:30`, `12:00`, `12:30`, `13:00`, `13:30`, `14:00`, `14:30`, `15:00`, `15:30`, `16:00`, `16:30`, `17:00`, `17:30`\n" +
                            "FROM SS_Employee as emp\n" +
                            "JOIN SS_Group_Assignments as grp on emp.Employee_ID = grp.Employee_ID\n" +
                            "JOIN SS_Schedule as sch on emp.Employee_ID = sch.agent\n" +
                            "JOIN SS_Schedule_Shift_Types as sst\n" +
                            "JOIN SS_Statuses as sts on sts.Status_ID = emp.`Status`\n" +
                            "WHERE grp.`Primary` = true\n" +
                            "AND emp.Employment_Active= 1\n" +
                            "AND sts.Status_ID = 5\n" +
                            "AND sst.id = 70\n" +
                            "AND sch.`date` BETWEEN '" + mon + "' AND '" + fri + "'\n" +
                            "AND grp.Group_ID = 2\n" +
                            "AND (`8:00`, `8:30`, `9:00`, `9:30`, `10:00`, `10:30`, `11:00`, `11:30`, `12:00`, `12:30`, `13:00`, `13:30`, `14:00`, `14:30`, `15:00`, `15:30`, `16:00`, `16:30`, `17:00`, `17:30`) != (0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)";

                    // console.log(query);
                    var loadSchedule = function(chunk, day, schedule, date){
                        var temp_date = new Date(chunk['date'])
                        var week = ""
                        // console.log("--------------------------------------------------------------------------")
                        // console.log(temp_date)
                        // console.log(last_week_day)
                        if(temp_date.getDate() < last_week_day.getDate() && temp_date.getMonth() <= last_week_day.getMonth()){
                            week = "week1"
                        }
                        else {
                            week = "week2"
                            // console.log("week 2 baby")
                        }
                        var name = chunk.Nick_Name + " " + chunk.Last_Name;

                        if(schedule[week][day]['date'] === ""){
                            schedule[week][day]['date'] = date;
                        }
                        if(isInArray(name, leads) === false){
                        // console.log(chunk);
                        // console.log(schedule[date][name])
                        if(schedule[week][day]["agents"][name] === undefined){
                            // console.log(1);
                            schedule[week][day]["agents"][name] = [];
                            // console.log(schedule[date][name])
                            // console.log(2);
                            for(var i = 0; i < times.length; i++){
                                // console.log(chunk[times[i]])
                                if(chunk[times[i]] === 70){
                                    (schedule[week][day]["agents"][name]).push(times[i]);
                                }
                            }
                        }
                    }
                }
                connection.query(query, function(err, data){
                           // console.log(query)
                            // console.log(data)
                            var schedule = {
                                "week1": {
                                    "Mon" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Tue" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Wed" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Thu" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Fri" : {
                                        "date" : "",
                                        "agents": {}
                                    }
                                },
                                "week2": {
                                    "Mon" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Tue" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Wed" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Thu" : {
                                        "date" : "",
                                        "agents": {}
                                    },
                                    "Fri" : {
                                        "date" : "",
                                        "agents": {}
                                    }
                                }
                            };
                            for(var i = 0; i<data.length; i++){
                                // console.log(data)
                                var temp = data[i].date.toString();
                                // console.log(temp)
                                var switchcase = temp.split(" ")[0];
                                switch(switchcase){
                                    case "Mon" : loadSchedule(data[i], "Mon", schedule, temp);
                                    break;
                                    case "Tue" : loadSchedule(data[i], "Tue", schedule, temp);
                                    break;
                                    case "Wed" : loadSchedule(data[i], "Wed", schedule, temp);
                                    break;
                                    case "Thu" : loadSchedule(data[i], "Thu", schedule, temp);
                                    break;
                                    case "Fri" : loadSchedule(data[i], "Fri", schedule, temp);
                                    break;
                                    default: console.log("error", switchcase)
                                }

                            }
                            // console.log(schedule);
                            return res.send(schedule);

                        })

            })

app.put('/api/schedule', function(req, res){
    var __time1 = req.body.time1
    var __time2 = req.body.time2
    var agent = req.body.agent
    var __date = new Date(req.body.date)
    var __firstname = agent.split(" ")[0].capitalize()
    var __lastname = agent.split(" ")[1].capitalize()
    var _mon = __date.getMonth() + 1
    if(_mon.toString().length === 1){
        _mon = "0" + _mon
    }
    var _day = __date.getDate()
    if(_day.toString().length === 1){
        _day = "0" + _day
    }
    var _date_convert = __date.getFullYear() + "-" + _mon + "-" + _day
    var query = "UPDATE SS_Schedule as sch \n" +
    "INNER JOIN SS_Employee as emp on emp.Employee_ID = sch.agent\n" +
    "SET sch.`" + __time1 + "`=" + 64 + ", sch.`" + __time2 + "`=" + 64 +"\n" +
    "WHERE emp.Last_Name='" + __lastname + "'\n" +
    "AND emp.First_Name='" + __firstname + "'\n" +
    "AND sch.`date`='" + _date_convert + "'"
    console.log(query)
    connection.query(query, function(err, data){
        if(err)
            console.log(err)
        sendMail(req, 1)
        console.log(data)
    })

})

    /*
        INSERT INTO SS_Appointments (id, Device, Consult, Brand, Name, Email, Description, Date, Time)
VALUES (1, 'Laptop', 'Software', 'Apple', 'Cormick', 'cvhnilicka@gmail.com', 'Email doesnt work', '1/20', '3:30pm')


    */


        // create appointment and send back to all appointments in database
        app.post('/api/appointments', function(req, res) {

            var __device_type = req.body.device_type
            var __consult_type = req.body.consult_type
            var __device_brand = req.body.device_brand
            var __name = req.body.name
            var __email = req.body.email
            var __description = String(req.body.description)
            var __date = req.body.date.toString();
            var __time = req.body.time

            console.log("date: " + __date)

            var __query = "INSERT INTO SS_Appointments\nVALUES ('"+ id_inc + "', '" + __device_type + "', '" + __consult_type +
                          "', '" + __device_brand + "', '" + __name + "', '" + __email + "', '" + __description + "', '" + __date + "', '" +
                          __time + "')"


                          console.log("query: "+ __query)

            connection.query(__query, function(err, data){
                if(err)
                    res.send(err)
                console.log(data)
                sendMail(req, 0)
                res.json(data)
            })

            // console.log(__device_type)
            // console.log(__consult_type)
            // console.log(__device_brand)

            // console.log(__email)
            // console.log(__description)
            // console.log(__date)
            // console.log(__time)

                // create an appoint, information comes from ajax request from angular
                // Appointment.create({
                //     device_type : req.body.device_type,
                //     consult_type : req.body.consult_type,
                //     device_brand : req.body.device_brand,
                //     name : req.body.name,
                //     email: req.body.email,
                //     description : req.body.description,
                //     date : req.body.date,
                //     time : req.body.time,
                //     done : false
                // }, function(err, data){
                //     if (err)
                //         res.send(err);

                //                 // get and return all appointments
                //                 sendMail(req);
                //                 getAppointments(res);

                //             });
            });

        // delete an appointment
        app.delete('/api/appointments/:appointment_id', function (req, res){
            // Appointment.remove({
            //     _id: req.params.appointment_id
            // }, function (err, todo){
            //     if(err)
            //         res.send(err)
            //     // getAppointments(res);
            // });
        });

        // app.get("/api/blackouts/:blackout_id", function(req, res){
        //     // Blackout.findOne()



        //     // Blackout.find({
        //     //     date: req.params.date
        //     // }, function(err, blackout){
        //     //     if(err)
        //     //         console.log(err)
        //     //     res.json(blackout)
        //     // })
        // })


        // // SECTION TO HANDLE BLACKOUT CALLS
        // app.get('/api/blackouts', function(req, res){
        //     getBlackouts(res);
        // });



        // app.post('/api/blackouts', function(req, res){
        //     Blackout.create({
        //         date : req.body.date,
        //         times : req.body.times
        //     })
        // })


        app.get('*', function (req, res) {
        res.sendFile(__dirname + '/index.html'); // the single view file (angular will handle the page changes on the front-end)
    });
    };
