let todoList = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let login = false;
let isRegister = false;


function cmd(){
  let item = document.createElement('li');
  item.innerHTML = "Execute : "+inputEle.value;
  inputEle.value='';
  todoList.appendChild(item);
}

function comment(content){
  let item = document.createElement('li');
  item.innerHTML = content;
  item.style.color="white";
  todoList.appendChild(item);
}

function clearInput() {
  inputEle.value='';
}

inputEle.addEventListener('keyup',(evevt) =>{
  if(evevt.key === 'Enter'){

    if (inputEle.value==='/login') {
      login = true;
      cmd();
      comment("Login Success!");
    
    }

    else if (inputEle.value==='/register') {
      cmd();
      isRegister = true;
      comment("Enter username and password in this format(username!password!passwordAgain)");
    }

    else if (inputEle.value==='/test') {
      cmd();
      var str = "aaabbbc!ccddde!eefff";
      //str = str.match(/!(\S*)!/)[1];
      str = str.match(/(\S*)!/)[1];
      str = str.match(/(\S*)!/)[1];

      comment(str);
    }

    else if (isRegister===true) {
      comment("Registering...")

      var str = inputEle.value;
      var username = str.match(/(\S*)!/)[1];
      username = username.match(/(\S*)!/)[1];
      var password = str.match(/!(\S*)!/)[1];
      var passwordAgain = str.match(/!(\S*)/)[1];
      passwordAgain = passwordAgain.match(/!(\S*)/)[1];


      if (password=passwordAgain) {
        var user = {
          "username":username,
          "password":password
         }
         $.ajax({
           type:'post',
           url:'https://www.hackerstarters.com/add',
           data:JSON.stringify(user), 
           dataType:"text",
           contentType:"application/json", 
           success(data){
             comment("Success")
             clearInput();
           },
           error(err){
            console.log(err);
            comment(err);
          }
         });
      }
      else{
        comment("invalidPassword")
      }

      isRegister = false;
    }

    else if (inputEle.value==='/Wanzi Ma' && login === true) {
      cmd();
      comment(inputEle.value+'是傻逼');
  
    }

    else if (inputEle.value==='get') {
      cmd();
  
      $.ajax({
        url:'https://www.hackerstarters.com/users',
        type:'get',
        dataType:'json',
        success(data){
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            comment(JSON.stringify(data[i]));
          }
        },
        error(err){
          console.log(err);
          comment(err);
        }
      })
    }

    else if (inputEle.value==='post') {
      cmd();
      var user = {
        "username":"chen",
        "password":"1411"
       }
       $.ajax({
         type:'post',
         url:'https://www.hackerstarters.com/add',
         data:JSON.stringify(user), 
         dataType:"text",
         contentType:"application/json", 
         success(data){
           comment("Success")
         },
         error(err){
          console.log(err);
          comment(err);
        }
       });
  
    }

    

    else{
      cmd();
    

    }






  }
})
