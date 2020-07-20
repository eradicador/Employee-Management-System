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
                name: "View all Departments",
                value: "View_All_Departments"
            },
            {
                name: "View all roles",
                value: "View_All_Managers"
            },
            {
                name: "Add Employee",
                value: "View_All_New_Employees"
            },
            {
                name: "Add Department",
                value: "Add_Department"
            },
            {
                name: "Add Role",
                value: "Add_Role"
            },
            {
                name: "Update Employee Role",
                value: "Update_Employee_Role"
            },

            // [message: "move up and down to reveal more choices"]
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
        case "Add_Department":
            addDepartment()
            break;
        case "Add_Role":
            addRole()
            break;
        case "Update_Employee_Role":
            updateEmployeeRole()
            break;
        default:

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
    console.log("inside view");
    var depQuery =
        "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
    connection.query(depQuery, function (err, answer) {
        console.log("answer form ve=iewDepartments: ", answer);
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

// allows user to add a new employee to database
function addEmployee() {
    let roleNames = []
    connection.query("SELECT * from role", function (err, data) {
        roleNames = data.map(role => role.title)
        inquirer.prompt([
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
                name: "roleName",
                message: "What is the employee's role?",
                choices: roleNames
            },
        ])
            .then(function (answer) {
                const chosen = data.filter(role => role.title === answer.roleName)
                connection.query(
                    "INSERT INTO employee SET ?",
                    {
                        first_name: answer.firstname,
                        last_name: answer.lastname,
                        role_id: chosen[0].id,
                        manager_id: null
                    },
                    function (err, answer) {
                        if (err) {
                            throw err;
                        }
                        console.log("employee Added Successfully");
                    }
                );
                loadMainMenu()
            });
    })
}

// allows user to add a new department to database
function addDepartment() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter new Department Name",
                name: "depName"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    name: answer.depName,
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.log("employee Added Successfully");
                }
            );
            loadMainMenu();
        });
}
// allows user to add a new role to database
function addRole() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter new Role Name",
                name: "roleName"
            },
        ])
        .then(function (answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    title: answer.roleName,
                },
                function (err, answer) {
                    if (err) {
                        throw err;
                    }
                    console.log("employee Added Successfully");
                }
            );
            loadMainMenu();
        });
}

function updateEmployeeRole() {
    inquirer.prompt([
        {
            message: "which employee would you like to update? (enter first name)",
            type: "input",
            name: "name"
        },
        {
            message: "enter the new role ID:",
            type: "number",
            name: "role_id"
        },
    ]).then(function (response) {
        connection.query(
            "UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
                console.table(data), function (err, answer) {
                    console.log("employee sucessfully updated"
                    );
                }
            }

        );
        loadMainMenu();
    });
}


//.connect() method on my connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`Connected as id: ${connection.threadId}`);
    loadMainMenu();
});
