const express = require('express');
const app = express();
const toml = require('toml');
const fs = require('fs').promises;  // Use promises API for simpler async handling
const path = require('path');

app.set("views", path.join(__dirname, "public"));
app.set("view engine", "ejs");

function newRoute(filePath) {
    return function (req, res) {
        res.render(filePath);
    };
}

console.log("Starting server...");

app.listen(3000, function () {
    console.log("Server is running at http://localhost:3000");
});

app.use(express.static(path.join(__dirname, "public")));

app.get('/', async (req, res) => {
    try {
        const data = await fs.readFile('./data/posts.toml', 'utf8');
        const parsed = toml.parse(data);
        console.log(parsed.posts); // Log the parsed posts for debugging
        res.render('index', { posts: parsed.posts });
    } catch (error) {
        console.error('Error reading or parsing TOML file:', error);
        res.status(500).send('Server error occurred');
    }
});

app.get("/contact", newRoute("contact/contact"));

app.get("/support", newRoute("support/support"));

app.get("/about", newRoute("about/about"));

app.get("/raw", newRoute("raw/raw"));

app.use((req, res) => {
    res.status(404).render("404.ejs"); // Render 404.ejs for any undefined routes
});
