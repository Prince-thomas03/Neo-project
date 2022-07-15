var express = require('express');
var router = express.Router();
const usercontroller=require('../controllers/user')

// /* GET home page. */
//  router.get('/', function(req, res, next) {
//    res.render('user/index',{layout:'user-layout'});
//  });


router.get('/',usercontroller.gethome);


// /* GET login page.*/
//  router.get('/login', function(req, res, next) {
//   res.render('user/user-login',{layout:'user-layout' });
// });


router.get('/login',usercontroller.getlogin);


// /* post login page.*/

// router.post('/login',function(req,res,next){
//   res.render('user/index',{layout:'user-layout'})
// })


router.post('/login',usercontroller.postlogin)


// /* get signup page.*/

// router.get('/signup',function(req,res,next){
// res.render('user/user-signup',{layout:'user-layout'})

// })


router.get('/signup',usercontroller.getsignup)


// /* post signup page.*/

// router.post('/signup',function(req,res,next){
//   res.render('user/user-login',{layout:'user-layout'})
// })


router.post('/signup',usercontroller.postsignup)



router.get('/logout',usercontroller.userlogout)



// router.get('/', function (req, res, next) {
//   res.render('user/user-signup');
// });


module.exports = router;
