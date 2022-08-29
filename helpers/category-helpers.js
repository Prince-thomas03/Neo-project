const db = require('../config/connection')
const collection = require('../config/collection')
const bcrypt = require('bcrypt')
const { response } = require('express')
// const { Collection } = require('mongodb')
const objectId = require('mongodb').ObjectId
// const admin = require('../controllers/admin')


module.exports = {


  postcategory: (category) => {
console.log("this is what in categoy");
    console.log(category );
//     console.log("got into post category of db operation");

    return new Promise(async (resolve, reject) => {
      const { name } = category.name

      console.log("this what in name");

      console.log(name);
      let existData = await db.get().collection(collection.categoryCollection).aggregate([
        {
          '$match': {
            'name': name
          }
        }
      ]).toArray()
      console.log("this is what in exsistdata");
      console.log(existData);
      console.log("the end");
      if (existData[0]) {
       
        
        resolve({ valid: true })
      } else {
        resolve({ valid: false })
      }
    })
  },
  addCategory: (category,images) => {
    return new Promise((resolve, reject) => {
      db.get().collection(collection.categoryCollection).insertOne({ name: category.name,images,'delete': false }).then((response) => {
        resolve(response)
      })
    })

  },

  displayCategory: () => {

    return new Promise(async (resolve, reject) => {


      let category = await db.get().collection(collection.categoryCollection).find({ delete: false }).toArray()
      // console.log("this is whta in category");
      //   console.log(category);

      resolve(category)

    })



  },


  geteditCategory: (catId) => {

    console.log("got into geteditCategory of database ");

    return new Promise((resolve, reject) => {

      db.get().collection(collection.categoryCollection).findOne({ _id: objectId(catId) }).then((response) => {


        resolve(response)


      })



    })


  },






  updateCategory: (catId, catDetails,images) => {

    return new Promise((resolve, reject) => {

      db.get().collection(collection.categoryCollection).updateOne({ _id: objectId(catId) }, { $set: { name: catDetails.name ,images:images} }).then(() => {

        resolve()

      })

    })


  },

  deletecategory: (catId) => {

    console.log("got into deletecategory of the category hrlpers");

    return new Promise((resolve, reject) => {

      db.get().collection(collection.categoryCollection).updateOne({ _id: objectId(catId) }, {
        $set: {
          delete: true
        }
      }).then((response) => {

        console.log("delete operation successful");

        console.log(response);

        resolve(response)

      })


    })



  }



}
