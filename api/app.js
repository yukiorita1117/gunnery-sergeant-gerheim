var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mysql = require("mysql");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

// TODO(orita)環境変数ちゃんと理解する。
// var { MYSQL_ROOT_PASSWORD } = require("./env.js");

var app = express();
// Default port 3000 is already in use by the app
app.listen(3001);

// MySQLデータベースへの接続
var connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: "testdb",
});

// INSERT
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to db! DBに接続しました。");

  const sql = "select * from users";
  connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    // インサートの結果 [ RowDataPacket { id: 2, name: 'Yukio Orita' } ]
    console.log("インサートの結果", result);
  });
});

// // tableの中にdataを入れる。
// const sql =
//   "CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, name VARCHAR(255) NOT NULL)";
// connection.query(sql, function (err, result) {
//   if (err) throw err;
//   console.log("TABLEを作成しました！");
// });

// TODO ここにcreate等のmysqlへの処理かく？参考コード探す。

// setup cors
// TODO cors調べる。
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/api/create", (req, res) => {
  console.log("api create できている");
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
