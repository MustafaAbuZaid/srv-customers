const express = require('express');
const router = express.Router();
let customersBll = require('../../business/customers');

router.get('/getAllCustomers',
  (req, res) => {
    customersBll.getAll((allVehicle)=>{
       res.end(JSON.stringify(
      allVehicle
    ));
    });
    // let allVehicle = [{ firstName: "a", lastName: "a", customername: "d", password: "123456" }];
   
  });
router.post('/register', (req, res) => {
  customersBll.register(req.body, (data) => {
    res.end(JSON.stringify(
      data
    ));
  })
});
router.post('/delete', (req, res) => {
  customersBll.register(req.body, (data) => {
    res.end(JSON.stringify(
      data
    ));
  })
});

router.post('/login', (req, res) => {
  customersBll.login(req.body, (data) => {
    res.end(JSON.stringify(
      data
    ));
  })
});
module.exports = router;
