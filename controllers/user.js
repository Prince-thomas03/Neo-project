const userhelpers=require('../helpers/userhelpers')
const  adminhelpers=require('../helpers/adminhelpers');
const twlioHelpers = require('../helpers/twlio-helpers');



module.exports={



gethome:(req,res,next)=>{
    if(req.session.isloggedin){
     console.log("reached here");
     let user=req.session.user
console.log(user);
        res.render('user/index',{user}) 
    }else{
        console.log("reach failed");
        res.render('user/index',{home: true})       
         req.session.isloggedin=false

    }
  
},

//////////////////////////////////////////////////////////////////////////////////////////

getlogin:(req,res,next)=>{
    if(req.session.isloggedin){
        console.log("reached here to nobackoff");
        res.redirect('/')
    }else{
        console.log("reached here and login itself");
        res.render('user/user-login',{login: true})


    }
      
    },

///////////////////////////////////////////////////////////////////////////////////////////////

postlogin:(req,res,next)=>{
    userhelpers.dologin(req.body).then((data) =>{
        if(data.isUserValid){
            console.log("loginuser data is valid");
            req.session.isloggedin=true
            req.session.user=data.user

            res.redirect('/')

        }else{
            req.session.isloggedin=false
            console.log("login user data is not valid");
            console.log(data);
            res.redirect('/login')
        }
    }).catch((err)=>{
        res.redirect('/login')
    })
    
       
},


////////////////////////////////////////////////////////////////////////////////////////////////

getsignup:(req,res,next)=>{
    
    if(req.session.isloggedin){
        res.redirect('/')

    }else{
        res.render('user/user-signup',{signup:true})  
    }
       
},




///////////////////////////////////////////////////////////////////////////////////////////////////
postsignup:(req,res,next)=>{
    // console.log(req.body);
    req.session.body=req.body
twlioHelpers.dosms(req.session.body).then((data)=>{
    console.log(data);
    if (data){
        console.log("enetred sucess");
        res.redirect('/otp')
    }else{
        console.log("entry failed");
        res.redirect('/signup')

    }
})
},
    
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 getotp:(req,res,next)=>{
    if(req.session.isloggedin){
        res.redirect('/')
    }else{

        res.render('user/otp')

    }

   

 },

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 otppost:(req,res,next)=>{
    console.log("first here");
   console.log(req.body);
   twlioHelpers.otpVerify(req.body,req.session.body).then((data)=>{

    if(data.valid){
        console.log("otp verification success");

        userhelpers.dosignup(req.session.body).then((data)=>{
            if(data.isUserValid){

                console.log("userdata valid");

                 req.session.isloggedin=true;
                 req.session.user=data.user
                res. redirect('/')
            }else{
                console.log("userdata not valid");
                req.session.isloggedin=false;
                res.redirect('/signup')
            }
        }).catch((err)=>{
            req.session.err=err
            res.redirect('/signup')

    })

   }

   })

 },

 userlogout:(req,res,next)=>{

    req.session.isloggedin=null
    req.session.user=false
    res.redirect('/')

 }



}