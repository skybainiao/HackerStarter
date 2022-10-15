let todoList = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let login = false;
let isRegister = false;
let isName = false;
let key = "EVQeP83jOOGNNvajzZEeQLSXBNTO4d62qrSxQRU1";



window.onload = function(){
  comment("Enter /help get commands");
}

function cmd(){
  let item = document.createElement('li');
  item.innerHTML = "Execute : "+inputEle.value;
  item.style.marginTop='2px';
  inputEle.value='';
  todoList.appendChild(item);
}

function comment(content){
  let item = document.createElement('li');
  item.innerHTML = content;
  item.style.marginTop='5px';
  item.style.color="white";
  todoList.appendChild(item);
}

function img(url) {
  let item = document.createElement('img');
  item.src=url;
  todoList.appendChild(item);
}

function web(url,width,height) {
  let item = document.createElement('iframe');
  item.src=url;
  item.height=height+"px";
  todoList.appendChild(item);
}

function clearInput() {
  inputEle.value='';
}


$.getJSON("https://ipgeolocation.abstractapi.com/v1/?api_key=6b3e59b4b36d4482830f75aaa9491dd9", 
function(data) {
    console.log(data);
    comment("Your IP: "+data.ip_address);
    comment("Your Address: "+data.city+","+data.country);
    comment("Enter /ip get more info");
})
      
inputEle.addEventListener('keyup',(evevt) =>{
  if(evevt.key === 'Enter'){

    if (inputEle.value==='/login') {
      login = true;
      cmd();
      comment("Login Success!");
    
    }

    else if (inputEle.value==='/Wanzi Ma') {
      cmd();
      comment(inputEle.value+'是傻逼');
    }

    else if (inputEle.value==='/ip') {
      cmd();
      $.getJSON("https://ipgeolocation.abstractapi.com/v1/?api_key=6b3e59b4b36d4482830f75aaa9491dd9", 
      function(data) {
        console.log(data);
        comment(JSON.stringify(data));
        
      })
    
    }
    

    else if (inputEle.value==='/ikunTest') {
      cmd();
      web("https://ikuntest.com","",650);
    }

    else if (inputEle.value==='/help') {
      cmd();
      comment("/register");
      comment("/APOD (NASA:Astronomy Picture of the Day)");
      comment("/dailyTips (Feel boring?)");
      comment("/ikunTest (Ikun knows)");
      comment("/Agify (Guess your age)");
      comment("/ip(Get your ipInfo)");
  
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


    else if (inputEle.value==='/Agify') {
      cmd();
      comment("Enter your name")
      isName=true;

    }

    else if (isName===true){
      isName=false;

      $.ajax({
        url:'https://api.agify.io/?name='+inputEle.value,
        type:'get',
        dataType:'json',
        success(data){
          console.log(data);       
          comment(inputEle.value+", Your age is "+data.age);
          clearInput();
        
        },
        error(err){
          console.log(err);
          comment(err);
        }
      })
    }

    else if (inputEle.value==='/APOD') {
      cmd();
      $.ajax({
        url:'https://api.nasa.gov/planetary/apod?api_key=EVQeP83jOOGNNvajzZEeQLSXBNTO4d62qrSxQRU1',
        type:'get',
        dataType:'json',
        success(data){
          console.log(data);       
          comment(data.date);
          comment(data.explanation);
          img(data.hdurl);      
        },
        error(err){
          console.log(err);
          comment(err);
        }
      })
  
    }

    else if (inputEle.value==='/dailyTips') {
      cmd();
      
      $.ajax({
        url:'https://www.boredapi.com/api/activity?participants=1',
        type:'get',
        dataType:'json',
        success(data){
          console.log(data);       
          comment(JSON.stringify(data.activity));
           
        },
        error(err){
          console.log(err);
          comment(err);
        }
      })
  
    }

    else if (inputEle.value==='/get') {
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

    else if (inputEle.value==='/post') {
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
