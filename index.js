const inquirer = require("inquirer");

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
                name: "Update employee Manager",
                value: "View_All_Employees"
            },
        ]
    }]);
    switch (choice) {
        case "View_All_Employees":
            return viewEmployees()
        case "View_All_Departments":
            return viewDepartment()
    }

}
function viewEmployees() { console.log("ready employees") }

function viewDepartment() {console.log("ready departments")}

loadMainMenu();
