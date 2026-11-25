
const http = require('http');
const fs = require('fs');

const patients = [
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

const server = http.createServer((req, res) => {

    if (req.url === "/" && req.method === "GET") {

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end("<h1>Welcome to Hospital Patient Management System</h1>");
    }

    else if (req.url === "/patients" && req.method === "GET") {

        res.writeHead(200, { "Content-Type": "application/json" });

        res.end(JSON.stringify(patients));
    }

    else if (req.url === "/about" && req.method === "GET") {

        res.writeHead(200, { "Content-Type": "text/html" });

        res.end("<h1>About Us</h1><p>Our hospital provides quality healthcare services.</p>");
    }
else if (req.url === "/add-patient" && req.method === "POST") {

    let body = "";

    req.on("data", (chunk) => {
        body = body + chunk;
    });

    req.on("end", () => {

        try {
            const newPatient = JSON.parse(body);

            if (
                newPatient.id === undefined ||
                !newPatient.name ||
                newPatient.age === undefined ||
                !newPatient.disease ||
                !newPatient.doctorName
            ) {
                res.writeHead(400, { "Content-Type": "text/plain" });
                res.end("Please provide all patient details");
                return;
            }

            patients.push(newPatient);

            res.writeHead(201, { "Content-Type": "application/json" });

            res.end(JSON.stringify({
                message: "Patient added successfully",
                patient: newPatient
            }));

        } catch (error) {
            res.writeHead(400, { "Content-Type": "text/plain" });
            res.end("Invalid JSON data");
        }
    });
}
else if (req.url === "/home" && req.method === "GET") {

    fs.readFile("index.html", (err, data) => {

        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error loading file");
        }
        else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        }

    });
}
    else {

        res.writeHead(404, { "Content-Type": "text/plain" });

        res.end("404 - Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("HTTP Server running at http://localhost:3000");
});
