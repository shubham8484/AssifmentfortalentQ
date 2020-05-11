const dbconnection = require('./connection')
const Detailsmodel = require('./Model/schema')
const express = require('express')
const app = express();
const fs = require("fs");
const fastcsv = require("fast-csv");
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
let stream = fs.createReadStream("Data.csv");
dbconnection.StartConnection();
app.post('/', (req, res) => {
    res.send("Hello word by express")

})
app.get('/import', (req, res) => {
    let csvData = [];
    let csvStream = fastcsv
        .parse()
        .on("data", function (data) {
            var details = new Detailsmodel({
                sno: data[0],
                name: data[1],
                city: data[2],
                state: data[3],
                country: data[4]
            })
            console.log(data);
            details.save(function (err) {
                if (err) {
                    throw err;
                }
            })
        })


        .on("end", function () {
            console.log(" End of file import");
            // csvData.shift();

        });

    stream.pipe(csvStream);

    res.send({
        success: "data imported successfully",
        status: 200
    })

})
app.post('/add', (req, res) => {
    let data = {
        sno: req.body.sno,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        countary: req.body.countary
    }

    var schema = new Detailsmodel(data);

    schema.save(err => {
        if (err) {
            console.log("error while adding!!!")
        }
        res.send({
            message: "data added successfully"
        })
        console.log("successfully save......... ")
    })
})
app.post('/edit/:Id', (req, res) => {
    Detailsmodel.findByIdAndUpdate(req.params.Id, {
        sno: req.body.sno,
        name: req.body.name,
        city: req.body.city,
        state: req.body.state,
        countary: req.body.countary
    }, (err, data) => {
        if (err) {
            res.send({
                error: err,
                message: "error while updating data"
            })
        } else {
            res.send({
                data: data,
                message: "data updated successfully"
            })
        }
    })
})

app.delete('/delete/:Id', (req, res) => {
    Detailsmodel.findByIdAndRemove(req.params.Id)
        .then(data => {
            res.send({
                message: "Data deleted successfully!",
                data: data
            });
        }).catch(err => {
            res.send({
                message: "Could not delete with id " + req.params.Id,
                error: err
            });
        });
})
app.listen(3000, () => console.log("running on port 3000"))