DROP DATABASE IF EXISTS perfreview_db;
CREATE DATABASE perfreview_db;

\c perfreview_db

CREATE TABLE employeeInfo (
    employee_id SERIAL PRIMARY KEY,
    fName VARCHAR(50),
    lName VARCHAR(50),
    department VARCHAR(50),
);

CREATE TABLE performance (
    review_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employeeInfo(employee_id),
    review_date DATE,
    revenue_generated INT CHECK (revenue_generated BETWEEN 1 AND 5),
    work_quality INT CHECK (work_quality BETWEEN 1 AND 5),
    new_existing_business INT CHECK (new_existing_business BETWEEN 1 AND 5),
);

CREATE TABLE recognition (
    recognition_id SERIAL PRIMARY KEY,
    employee_id INT REFERENCES employeeInfo(employee_id),
    recognition_date DATE,
)