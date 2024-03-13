let _express = require("express");
let _mysql2 = require("mysql2");
let body_parser = require("body-parser");
let app = _express();



//let _encoded = body_parser.urlencoded()
app.use(body_parser.urlencoded());
app.use(body_parser.json());
app.set("view engine", "ejs");

/*_________________   onnect database  ______________________*/

let con = _mysql2.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "techrel_emp",
});

/*_________________  show table data  ______________________*/

app.get("", function (req, res) {
  con.connect(function (error) {
    if (error) throw error;
    con.query("SELECT * FROM emp_data", function (err, result) {
      if (err) throw err;
      console.log(result);
      res.render("table.ejs", { data: result });
    });
  });
});

/*_________________  insert form render  ______________________*/

app.get("/form", function (req, res) {
  res.render("form.ejs");
});

app.get("/register", function (req, res) {
  res.render("register.ejs");
});
/*_________________   create data  ______________________*/

app.post("/insert", function (req, res) {
  let data = req.body;
  con.connect(function (error) {
    if (error) throw error;

    let sql = `INSERT INTO emp_data(name,email,contact,address) VALUES ('${data.name}','${data.email}','${data.contact}','${data.address}')`;

    con.query(sql, function (err, result) {
      console.log(err);
      res.redirect("/form");
    });
  });
});

/*___________________  Delete One data  ______________________*/

app.get("/delete/:id", function (req, res) {
  let data = req.body;
  let user_id = req.params.id;
  // console.log(user_id);
  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `DELETE FROM emp_data WHERE id = ${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data delete.");
        res.redirect("/");
      }
    );
  });
});

/*_________________  Update One data  ______________________*/

app.get("/update/:id", function (req, res) {
  let user_id = req.params.id;
  // let data = req.body
  // console.log(data);
  // console.log(user_id);
  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `SELECT * FROM emp_data WHERE id=${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data Update.");
        // res.redirect('/')
        console.log(result);
        res.render("edit.ejs", { user: result });
      }
    );
  });
});

/*_________________  Update One data  ______________________*/

app.post("/edit/:id", function (req, res) {
  let user_id = req.params.id;
  let update_data = req.body;

  con.connect(function (error) {
    if (error) throw error;

    con.query(
      `UPDATE emp_data SET name = '${update_data.name}',email='${update_data.email}' ,contact = '${update_data.contact}' , address = '${update_data.address}' WHERE id = ${user_id}`,
      function (err, result) {
        if (err) throw err;
        console.log("One data Update.");
        console.log(result);
        res.redirect("/");
      }
    );
  });
});



/*_________________ connect Server______________________*/
app.listen(8000, function () {
  console.log("Server is running.....!");
});