DROP database if exists employee_db;

CREATE database employee_db;

USE employee_db

CREATE TABLE `employee` (
  id int(11) NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_Name VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)

) ;

CREATE TABLE `role` (
id INT(11) NOT NULL AUTO_INCREMENT,
  title VARCHAR(255) DEFAULT NULL,
  salary int(11) NOT NULL,
  PRIMARY KEY (id)
); 
CREATE TABLE `department` (
  name VARCHAR(255) DEFAULT NULL,
  id PRIMARY KEY (`id`),
);
