const userhelpers=require('../helpers/userhelpers')
const adminhelpers=require('../helpers/adminhelpers')


module.exports={

getlogin:(req,res,next)=>{
    if(req.session.isLoggedin){
        res.redirect('/admin/')
    }else{
        res.render('admin/admin-login',{layout:"admin-layout"})

    }


},

postlogin:(req,res,next)=>{
console.log(req.body);
    adminhelpers.dologin(req.body).then((data)=>{
        console.log(data);
         if(data.isAdminValid){
            req.session.isLoggedin=true
            req.session.admin=data.admin
          res.redirect('/admin/')
            console.log('admin');
         }else{
            res.redirect('/admin/login')
            console.log('no admin');
         }

    }).catch((err)=>{
        res.redirect('/admin/login')
    })

},

adminlogout:(req,res,next)=>{
    req.session.isLoggedin=null
    req.session.admin=null
    res.redirect('/admin/login')

},

gethome:(req,res,next)=>{
    if(req.session.isLoggedin){
        res.render('admin/admin-index',{layout:'admin-layout'})
    }else{
        res.redirect('/admin/login')
    }
}


}