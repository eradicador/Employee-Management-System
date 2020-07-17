DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_Name VARCHAR(255) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NULL,
  salary INT(11) NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
); 
CREATE TABLE department (
  id INT AUTO_INCREMENT NOT null,
  name VARCHAR(255) NULL,
  PRIMARY KEY (id)
);

select * from employee;
select * from role;
select * from department;

INSERT into department (name)
VALUES ("Sales");
INSERT into department (name)
VALUES ("Engineering");
INSERT into department (name)
VALUES ("Finance");
INSERT into department (name)
VALUES ("Legal");
INSERT into department (name)
VALUES ("Management");

select * from department;

INSERT into role (title, salary, department_id)
VALUES ("Sales Lead", 30000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Salesperson", 27000, 1);
INSERT into role (title, salary, department_id)
VALUES ("Lead Engineer", 41000, 2);
INSERT into role (title, salary, department_id)
VALUES ("Accountant", 50000, 3);
INSERT into role (title, salary, department_id)
VALUES ("Legal", 50000, 4);
INSERT into role (title, salary, department_id)
VALUES ("Manager", 60000, 5);

select * from role;

INSERT into employee (first_name, last_name, role_id, manager_id)
values ("John", "Burros", 3, 4); 
INSERT into employee (first_name, last_name, role_id, manager_id)
values ("Jim", "Baker", 4, 4);
INSERT into employee (first_name, last_name, role_id, manager_id)
values ("George", "Reyes", 5, NULL);
INSERT into employee (first_name, last_name, role_id, manager_id)
values ("Mary", "Jones", 6, 4);
INSERT into employee (first_name, last_name, role_id, manager_id)
values ("Tonny", "Ipkins", 7, 4);
INSERT into employee (first_name, last_name, role_id, manager_id)
values ("Michelle", "Ramos", 8, 4);

select * from employee;