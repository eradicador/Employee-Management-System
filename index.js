const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
	host: "localhost",

	// Your port
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: "qwerty77",
	database: "employee_db",
});

async function loadMainMenu() {
    const { choice } = await inquirer.prompt([{
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            {
                name: "View All Employees",
                value: "View_All_Employees"
            },
            {
                name: "View all Employees by Department",
                value: "View_All_Departments"
            },
            {
                name: "View all Employees by Manager",
                value: "View_All_Managers"
            },
            {
                name: "Add Employee",
                value: "View_All_New_Employees"
            },
            {
                name: "Remove Employee",
                value: "View_All_Employees"
            },
            {
                name: "Update Employee Role",
                value: "View_All_Employees"
            },
            {
                name: "Update Employee Manager",
                value: "View_All_Employees"
            },
        ]
    }]);
    switch (choice) {
        case "View_All_Employees":
            viewEmployees()
            break;
        case "View_All_Departments":
            viewDepartment()
            break;
        // case "View_All_Managers":
        //     viewManagers()
        // case "Add_Employee":
        //     viewNewEmployees()
        // case "Remove_employee":
        //     viewEmployees()
        // case "Upadate_Role":
        //     viewEmployees()
        // case "Upadate_Manager":
        //     viewEmployees()
    }

}
function viewEmployees() {
    console.log("retrieving employess from database");
    var fancyQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
    connection.query(fancyQuery, function (err, answer) {
        console.log("\n Employees retrieved from Database \n");
        console.table(answer);
    });
}

function viewDepartment() {
    connection.query("SELECT * FROM department", function(err, answer) {
      console.log("\n Departments Retrieved from Database \n");
      console.table(answer);
    });
  }
  function viewallroles() {
    connection.query("SELECT * FROM role", function(err, answer) {
      console.log("\n Roles Retrieved from Database \n");
      console.table(answer);
    });
    askQ();
  }

  //.connect() method on my connection
  connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    loadMainMenu();
  });

