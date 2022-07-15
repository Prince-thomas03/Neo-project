const userhelpers=require('../helpers/userhelpers')
const  adminhelpers=require('../helpers/adminhelpers')



module.exports={



gethome:(req,res,next)=>{
    if(req.session.loggedIn){
     let user=req.session.user
console.log(user);
        res.render('user/index',{user}) 
    }else{
        res.render('user/index',{home: true})
    }
  
},

//////////////////////////////////////////////////////////////////////////////////////////

getlogin:(req,res,next)=>{
    
      res.render('user/user-login',{login: true})
    },

///////////////////////////////////////////////////////////////////////////////////////////////

postlogin:(req,res,next)=>{
    userhelpers.dologin(req.body).then((data) =>{
        if(data.isUserValid){
            req.session.loggedIn=true
            req.session.user=data.user

            res.redirect('/')

        }else{
            console.log(data);
            res.redirect('/login')
        }
    })
    
       
},
////////////////////////////////////////////////////////////////////////////////////////////////

getsignup:(req,res,next)=>{
    
        res.render('user/user-signup',{signup:true})  
},
///////////////////////////////////////////////////////////////////////////////////////////////////
postsignup:(req,res,next)=>{
    console.log(req.body);
    userhelpers.dosignup(req.body).then((data)=>{

        if(data.isUserValid){
            req.session.loggedIn=true;
            req.session.user=data.user
            res.redirect('/')
        }else{
            res.redirect('/user-signup')
        }
        // console.log(data);

        // console.log("signd");

//////test/////////////////
    }).catch((err)=>{
        res.redirect('/signup')
    })
},

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 userlogout:(req,res,next)=>{
    req.session.destroy()
    res.redirect('/login')
 }

}