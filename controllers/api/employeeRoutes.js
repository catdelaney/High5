const router = require('express').Router();
const Employee = require('../../models/Employee');
const Department = require('../../models/Department');


router.post('/', async (req, res) => {
  try {

    console.log(req.body);

    const departmentData = await Department.findOne({
      where: {
        name: req.body.department
      }
    });

    // Serialize data so the template can read it and render it
    const department = departmentData.get({ plain: true });

    const payload = { 
      first_name: req.body.firstName,
      last_name: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      department_id: department.id,
    };

    console.log(payload);

    const employeeData = await Employee.create(payload);
    const employeefetchData = await Employee.findAll({});
    console.log(employeefetchData);
    req.session.save(() => {
      req.session.employee_id = employeeData.id;
      req.session.logged_in = true;

      res.status(200).json(employeeData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const employeeData = await Employee.findOne({
      where: { email: req.body.email },
    });

    if (!employeeData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await employeeData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.employee_id = employeeData.id;
      req.session.logged_in = true;

      res.json({ employee: employeeData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
