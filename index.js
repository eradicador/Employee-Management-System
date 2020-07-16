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
                name: "view all departments",
                value: "View_All_Departments"
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
