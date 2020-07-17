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
        case "View_All_Managers":
            viewManagers()
            break;
        case "View_All_New_Employees":
            addEmployee()
            break;
        // // case "Remove_employee":
        // //     viewEmployees()
        // break;
        // // case "Upadate_Role":
        // //     viewEmployees()
        // break;
        // // case "Upadate_Manager":
        // //     viewEmployees()
    }

}

function viewEmployees() {
    var empQuery =
        "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    connection.query(empQuery, function (err, answer) {
        console.table(answer);
        loadMainMenu();
    });
}

function viewDepartment() {
    var depQuery =
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    connection.query(depQuery, function (err, answer) {
        console.table(answer);
        loadMainMenu();
    });
}

function viewManagers() {
    connection.query("SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;", function (err, answer) {
        console.table(answer);
        loadMainMenu();
    });
}


function addEmployee() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter employee first name",
                name: "firstname"
            },
            {
                type: "input",
                message: "Enter employee last name",
                name: "lastname"
            },
            {
                type: "list",
                name: "roleId",
                message: "What is the employee's role?",
                choices: roleChoices
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    first_name: answer.firstname,
                    last_name: answer.lastname,
                    role_id: null,
                    manager_id: null
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.table(answer);
                }
            );
            loadMainMenu()
        });
}



//.connect() method on my connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    loadMainMenu();
});