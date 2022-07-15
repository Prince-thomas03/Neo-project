const db=require('../config/connection')
const collection=require('../config/collection')
const bcrypt=require('bcrypt')
// const admin = require('../controllers/admin')


module.exports={

dologin:(adminData)=>{

    return new Promise(async(resolve,reject)=>{
    const admininfo={}
    const admin= await db.get().collection(collection.adminCollection).findOne({email :adminData.email})

    // admininfo.isAdminValid=false;

    if(admin){
        console.log('user exists');
       if(admin.password===adminData.password){
admininfo.isAdminValid=true
admininfo.admin=admin
resolve(admininfo)
console.log('password');

       }else{
        admininfo.isAdminValid=false
        resolve(admininfo)
        console.log('no password');
       }

    }else{
        console.log('no user');
        admininfo.isAdminValid=false
        resolve(admininfo)
    }


    })

    
}

}