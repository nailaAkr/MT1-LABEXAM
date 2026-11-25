const express = require('express');

const app = express();

console.log("NEW EXPRESS FILE IS RUNNING");

app.use(express.json());

let patients = [
    {
        id: 1,
        name: "Amit Kumar",
        age: 35,
        disease: "Fever",
        doctorName: "Dr. Sharma"
    },
    {
        id: 2,
        name: "Priya Singh",
        age: 28,
        disease: "Cold",
        doctorName: "Dr. Verma"
    },
    {
        id: 3,
        name: "Rahul Gupta",
        age: 40,
        disease: "Diabetes",
        doctorName: "Dr. Mehta"
    }
];

app.get('/patients', (req, res) => {
    res.json(patients);
});

app.get('/patients/:id', (req, res) => {

    const patientId = parseInt(req.params.id);

    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        return res.status(404).json({
            message: "Patient not found"
        });
    }

    res.json(patient);
});

app.post('/patients', (req, res) => {

    const newPatient = req.body;

    patients.push(newPatient);

    res.status(201).json({
        message: "Patient added successfully",
        patient: newPatient
    });
});

app.listen(4000, () => {
    console.log("Express Server running at http://localhost:4000");
});