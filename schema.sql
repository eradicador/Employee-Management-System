DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db

CREATE TABLE employee(
  id INT auto_increment NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_Name VARCHAR(255) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT,
  PRIMARY KEY(id)
);

CREATE TABLE role (
id INT(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(255) NOT NULL,
  salary INT(11) NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
); 
CREATE TABLE department (
  id INT  auto_increment NOT null,
  name VARCHAR(255) NOT NULL,
  id PRIMARY KEY (id),
);
