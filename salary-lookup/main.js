const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Example dataset of average salaries by location
const averageSalaries =
    [
        { "id": 1, "name": "New York", "salary": 85000 },
        { "id": 2, "name": "Los Angeles", "salary": 80000 },
        { "id": 3, "name": "Chicago", "salary": 75000 },
        { "id": 4, "name": "Houston", "salary": 70000 },
        { "id": 5, "name": "Phoenix", "salary": 65000 }
    ];

// API endpoint to get average salary by location
app.get('/api/location/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const location = averageSalaries.find(loc => loc.id === id);

    if (location) {
        res.json({ id: id, name: location.name, averageSalary: location.salary });
    } else {
        res.status(404).send('ID not found');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});