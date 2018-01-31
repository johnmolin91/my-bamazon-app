var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayAll();
});

function displayAll() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
		for (var i = 0; i < res.length; i++) {
			console.log("ID: " + res[i].item_id + " || Product: " + res[i].product_name + " || Price: " + res[i].price + " || Stock Quantity: " + res[i].stock_quantity);
		}
		prompt();
	})
}

function prompt() {
	inquirer
		.prompt({
			name: "action",
			type: "input",
			message: "What is the ID of the item you would like to buy?"
		})
		.then(function(answer) {
			var selection = answer.action;
		});
}