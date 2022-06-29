const express = require("express");
const ejs = require("ejs");
const path = require("path");

const app = express();
// TEMPLATE ENGINE
app.set("view engine", "ejs");

//static dosyaların klasörünü belirtir. MIDDLEWARES
app.use(express.static("public"));

app.get("/", (req, res) => {
  //statik html sayfası göndermek için, klasörden dosyayı buluyoruz!
  //   res.sendFile(path.resolve(__dirname, "temp/index.html"));
  res.render("index");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add", (req, res) => {
  res.render("add");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı`);
});
