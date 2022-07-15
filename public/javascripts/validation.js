// $(document).ready(function(){
    $("#Signup").validate({
      errorClass: "valierrors",
  
      rules:{
        name:{
          required:true,
          minlength:4
        },
  
        email:{
          required:true,
          email:true
        },
  
        mobile:{
          required:true,
          minlength:10
        },
  
        password:{
          required:true,
          minlength: 5
        },
        // c_password:{
        //     required:true,
        //     equalTo:'#password'
        // }
      }
    })


    $("#login").validate({
        errorClass: "valierrors",
    
        rules:{
          name:{
            required:true,
            minlength:4
          },
    
          email:{
            required:true,
            email:true
          },
    
          mobile:{
            required:true,
            minlength:10
          },
    
          password:{
            required:true,
            minlength: 5
          },
          // c_password:{
          //     required:true,
          //     equalTo:'#password'
          // }
        }
      })
  



//   })