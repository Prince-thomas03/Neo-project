var express = require('express');
var router = express.Router();
const admincontroller=require('../controllers/admin')

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('admin/admin-login',{layout:'admin-layout'});
// });

router.get('/',admincontroller.getlogin)



router.post('/signin',admincontroller.postlogin)


// router.get('/index',function(req,res,next){
//   res.render('admin/admin-index',{layout:'admin-layout'})
// })

// router.post('/signin',function(req,res,next){
  
//    res.render('admin/admin-index',{layout:'admin-layout'})
 
// })






module.exports = router;