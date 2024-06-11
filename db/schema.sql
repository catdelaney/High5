DROP DATABASE IF EXISTS perfreview_db;
CREATE DATABASE perfreview_db;

-- \c perfreview_db

-- CREATE TABLE employeeInfo (
--     employee_id SERIAL PRIMARY KEY,
--     fName VARCHAR(50),
--     lName VARCHAR(50),
--     department VARCHAR(50)
-- );

-- CREATE TABLE performance (
--     review_id SERIAL PRIMARY KEY,
--     employee_id INT REFERENCES employeeInfo(employee_id),
--     review_date DATE,
--     revenue_generated INT CHECK (revenue_generated BETWEEN 1 AND 5),
--     work_quality INT CHECK (work_quality BETWEEN 1 AND 5),
--     new_existing_business INT CHECK (new_existing_business BETWEEN 1 AND 5)
-- );

-- CREATE TABLE recognition (
--     recognition_id SERIAL PRIMARY KEY,
--     employee_id INT REFERENCES employeeInfo(employee_id),
--     recognition_date DATE
-- );

-- SELECT e.employee_id, e.fName, e.lName,
--     (p.revenue_generated + p.work_quality + p.new_existing_business) / 3 AS average_ranking
-- FROM employeeInfo e
-- JOIN performance p ON e.employee_id = p.employee_id
-- WHERE DATE_TRUNC('month', p.review_date) = DATE_TRUNC('month', CURRENT_DATE - INTERVAL '1 month')
-- ORDER BY average_ranking DESC
-- LIMIT 3;