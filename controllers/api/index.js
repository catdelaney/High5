const router = require('express').Router();
const employeeRoutes = require('./employeeRoutes');
const performanceRoutes = require('./performanceRoutes');
const recognitionRoutes = require('./recognitionRoutes')

router.use('/employees', employeeRoutes);
router.use('/performances', performanceRoutes);
router.use('/recognition', recognitionRoutes);

module.exports = router;
