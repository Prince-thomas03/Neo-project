const userhelpers=require('../helpers/userhelpers')
const adminhelpers=require('../helpers/adminhelpers')


module.exports={

getlogin:(req,res,next)=>{

    res.render('admin/admin-login',{layout:"admin-layout"})
},

postlogin:(req,res,next)=>{
console.log(req.body);
    adminhelpers.dologin(req.body).then((data)=>{
        console.log(data);
         if(data.isAdminValid){
            res.render('admin/admin-index',{layout:"admin-layout"})
            console.log('admin');
         }else{
            res.redirect('/admin/')
            console.log('no admin');
         }

    }).catch((err)=>{
        res.redirect('/admin/')
    })

}


}