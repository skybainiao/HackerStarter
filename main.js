let todoList = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let fileInput = document.getElementById('fileInput');
let submit = document.getElementById('submit-1');
let p2 = document.getElementById('p2');
let p3 = document.getElementById('p3');
let i = 0;
let users = [];
let messages = [];
let date = new Date();
let username1 = "UndefinedUser";
let login = false;
let status = '';
let isLogin = false;
let chatter = 0;
let chat;
let newMessage = "";
let usernameforMessage = "";
let time = "";
let isRegister = false;
let pic = false;
let isChatting = false;
let isName = false;
 



window.onload = function(){
  comment("Enter /help get commands");
  getUsers();
  //getMessages();
}

function getUsers() {
  $.ajax({
    url:'https://www.hackerstarters.com/users',
    type:'get',
    dataType:'json',
    success(data){
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        users.push(data[i]);
      }
    },
    error(err){
      console.log(err);
      comment(err);
    }
  })
}

function getMessages() {
  $.ajax({
    url:'https://www.hackerstarters.com/messages',
    type:'get',
    dataType:'json',
    success(data){
      console.log(data);
      let a = 0;
      for (let i = 0; i < data.length; i++) {
        messages.push(data[i]);
        a=i;
      }

      for (let i = 0; i < data.length; i++) {
        
        if(data[a].time!==time||data[a].content!==newMessage){
          comment(data[a].username+":"+data[a].content);
          if(content==="lz"){
            pic=true;
          }
          newMessage=data[a].content;
          usernameforMessage=data[a].username;
          time=data[a].time;
          break;
        }
        
      }
    },
    error(err){
      console.log(err);
      comment(err);
    }
  })
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
  todoList.appendChild(item);
  item.style.marginTop='5px';
  item.style.color="rgb(0, 255, 0)";
  let a = setInterval(function(){
    item.innerHTML = content.slice(0,i);
    i++;
    if(i>content.length){
      i=0;
      clearInterval(a);
    }
  },0.1);
}



function img(url) {
  let item = document.createElement('img');
  item.src=url;
  todoList.appendChild(item);
}

function web(url,width,height) {
  let item = document.createElement('iframe');
  item.src=url;
  item.width=width+"px";
  item.height=height+"px";
  todoList.appendChild(item);
}

function clearInput() {
  inputEle.value='';
}


function sendMessage(name,content) {
  var message = {
    "username":name,
    "content":content,
    "time":date.toLocaleString(),
   }
  $.ajax({
    type:'post',
    url:'https://www.hackerstarters.com/send',
    data:JSON.stringify(message),
    dataType:"text",
    contentType:"application/json",
    success(data){
     //comment(username1+":"+inputEle.value);
    },
    error(err){
     console.log(err);
     comment(err);
   }
  });
}


inputEle.addEventListener('keyup',(evevt) =>{
  if(evevt.key === 'Enter'){

    if (inputEle.value==='/login') {
      if(login===false){
        isLogin = true;
        cmd();
        comment("Enter username and password in this format (username!password)");
      }
      else{
        comment("You are already logged in!")
        clearInput();
      }
      
      
    }

     
    else if (inputEle.value==='/cc'&&isChatting===false&&login===true) {
      cmd();
      comment("Connecting...");
      isChatting=true;
      $.ajax({
        url:'https://www.hackerstarters.com/messages',
        type:'get',
        dataType:'json',
        success(data){
          comment("Success");
        },
        error(err){
          console.log(err);
          comment(err);
        }
      });
      sendMessage("System",username1+" joined the channel");
      chat = setInterval(function(){
        getMessages();
      },500);
    }
    else if (isChatting===true) {
      var message = {
        "username":username1,
        "content":inputEle.value,
        "time":date.toLocaleString(),
       }
       clearInput();
       $.ajax({
         type:'post',
         url:'https://www.hackerstarters.com/send',
         data:JSON.stringify(message),
         dataType:"text",
         contentType:"application/json",
         success(data){
          //comment(username1+":"+inputEle.value);
         },
         error(err){
          console.log(err);
          comment(err);
        }
       });
    }
    else if (inputEle.value==='/lz') {
      cmd();
      img("https://firebasestorage.googleapis.com/v0/b/cloudshare-f4727.appspot.com/o/WechatIMG393.jpeg?alt=media&token=d4a8bc52-9326-4fc7-9c17-9862078c7887");
    
    }

    else if (inputEle.value==='/merryc') {
      cmd();
      web('https://skybainiao.github.io/MerryChristmas/','800','800');    
    }
    

    else if (isLogin===true) {
      let test=false;
      if (login===false) {
      var str = inputEle.value;
      try{
        var username = str.match(/(\S*)!/)[1]; 
        var password = str.match(/!(\S*)/)[1];
        console.log(username);
        console.log(password);
      }
      catch{
        isLogin=false;
        comment("Invalid Format!");
        clearInput();
      }
  
      for (let i = 0; i < users.length; i++) {
        test=true;
        if (users[i].username===username && users[i].password===password) {
          login=true;
          isLogin=false;
          comment("Login Success!");
          username1=username;
          clearInput();
          break;
        }
        else{
          clearInput();
          test=false;
        } 
      }
      
    }
    else{
      comment("You are already logged in!")
      clearInput();
    }
      
    }

     

    


    

    else if (inputEle.value==='/help') {
      cmd();
      comment("/cc(chat channel)need login");
      comment("/register");
      comment("/login");
      comment("/APOD (NASA:Astronomy Picture of the Day)");
    }

    else if (inputEle.value==='/register') {
      cmd();
      isRegister = true;
      comment("Enter username and password in this format (username!password!passwordAgain)");
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
      let test=true;
      comment("Registering...")

      try{
        var str = inputEle.value;
        var username = str.match(/(\S*)!/)[1];
        username = username.match(/(\S*)!/)[1];
        var password = str.match(/!(\S*)!/)[1];
        var passwordAgain = str.match(/!(\S*)/)[1];
        passwordAgain = passwordAgain.match(/!(\S*)/)[1];
        console.log(username);
        console.log(password);
        console.log(passwordAgain);
      }
      catch{
        comment("Invlid Format");
        comment("Register Failed");
        clearInput();
        isRegister = false;
        test=false;
      }
      
      if(test===true){
        if (password===passwordAgain) {
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
          clearInput();
        }
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
          img(data.url);
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
      comment("Invlid Command")
    }






  }
})
