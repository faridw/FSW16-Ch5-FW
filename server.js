const express = require("express");
const path = require("path");
const userList = require("./users.json");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send('Welcome, if you want login, please input "/login" on the url.');
});

app.get("/login", (req, res) => {
	res.render("login");
});

app.post("/login", (req, res) => {
	const { username, password } = req.body;
	const checkUsername = userList.filter((users) => {
		return username === users.username;
	});
	const checkPassword = checkUsername.filter((users) => {
		return password === users.password;
	});

	if (checkPassword.length > 0) {
		return res.redirect("/ch4");
	}

	res.redirect("/login");
});

app.get("/ch3", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/ch3/index.html"));
});

app.get("/ch4", (req, res) => {
	res.sendFile(path.join(__dirname, "./public/ch4/game-suit.html"));
});

app.use(function (req, res, next) {
	res.status(404).send("Are you lost?");
});

app.listen(port, console.log(`Server running on ${port}`));
