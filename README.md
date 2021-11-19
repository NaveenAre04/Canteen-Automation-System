# Canteen-Automation-System

CREATE DATABASE CAS;
USE CAS;

CREATE TABLE persons ( person_id int(11) NOT NULL AUTO_INCREMENT, firstname varchar(100) NOT NULL, lastname varchar(255) NOT NULL, gender varchar(255) NOT NULL, age int(10) DEFAULT NULL, PRIMARY KEY (person_id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

CREATE TABLE address ( address_id int(11) NOT NULL AUTO_INCREMENT, address varchar(1255) NOT NULL, person_id int(11) DEFAULT NULL, PRIMARY KEY (address_id), KEY person_id (person_id), CONSTRAINT address_ibfk_1 FOREIGN KEY (person_id) REFERENCES persons (person_id) ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE orders ( order_id int(11) NOT NULL AUTO_INCREMENT, order_number int(11) NOT NULL, person_id int(11) DEFAULT NULL, address_id int(11) DEFAULT NULL, PRIMARY KEY (order_id), KEY person_id (person_id), KEY address_id (address_id), CONSTRAINT orders_ibfk_1 FOREIGN KEY (person_id) REFERENCES persons (person_id), CONSTRAINT orders_ibfk_2 FOREIGN KEY (address_id) REFERENCES address (address_id) ) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

