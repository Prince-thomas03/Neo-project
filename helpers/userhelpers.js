const db =require('../config/connection')
const collection=require('../config//collection')
const bcrypt=require('bcrypt')



module.exports={
    dosignup:(userdata)=>{
        console.log(userdata);
        return new Promise(async(resolve,reject)=>{
        const userinfo={}
            userdata.password=await bcrypt.hash(userdata.password,10);
            db.get().collection(collection.userCollections).insertOne(userdata).then((data)=>{
                if(data){
                    userinfo.isUserValid=true;
                    userinfo.user=userdata
                    resolve(userinfo)
                }else{
                    userinfo.isUserValid=false;
                    resolve(userinfo)
                }

            }).catch((err)=>{
                reject(err)
            })
           
            

        })
        
    },


    dologin:(userdata)=>{
        return new Promise(async(resolve,reject)=>{
      const userinfo={};
      const user=await db.get().collection(collection.userCollections).findOne({email : userdata.email})

      if(user){
        console.log(user);
        bcrypt.compare(userdata.password,user.password).then((data)=>{
            if(data){

                userinfo.isUserValid=true;
                userinfo.user=user;
                resolve(userinfo)
            }else{
                console.log('login failed passwordd');
                userinfo.isUserValid=false;
                resolve(userinfo)
            }
        })
      }else{
        console.log('login failed');
        userinfo.isUserValid=false;
        resolve(userinfo)
      }

        })
    }

}