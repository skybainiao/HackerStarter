let todoList = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let fileInput = document.getElementById('fileInput');
let submit = document.getElementById('submit-1');
let p2 = document.getElementById('p2');
let p3 = document.getElementById('p3');
let users = [];
let login = false;
let isLogin = false;
let isRegister = false;
let isName = false;
let key = "EVQeP83jOOGNNvajzZEeQLSXBNTO4d62qrSxQRU1";
let docToPDFKey = "538a700e-f896-4246-b324-232a9e19d26f";
//<form id="fromCont" action="" method="post">
  //<input type="file" id="fileInput" name="content">
    //<input type="submit" id="submit-1" value="submit">
//</form>



window.onload = function(){
  comment("Enter /help get commands");
  $.ajax({
    url:'https://www.hackerstarters.com/users',
    type:'get',
    dataType:'json',
    success(data){
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        users.push(data[i])
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
    p2.innerHTML="IP: "+data.ip_address;
    p3.innerHTML="CY: "+data.country
    
})




inputEle.addEventListener('keyup',(evevt) =>{
  if(evevt.key === 'Enter'){

    if (inputEle.value==='/login') {
      isLogin = true;
      cmd();
      comment("Enter username and password in this format (username!password)");
      
    }

    else if (inputEle.value==='/Wanzi Ma') {
      cmd();
      comment(inputEle.value+'是傻逼');
    }
    else if (inputEle.value==='/sushan') {
      cmd();
      comment('苏珊快餐店开业啦！');
      comment('招牌蔡：鸡泥太美');
      comment('甜点：荔枝，小黑籽，绿湿含金糕，葡心腩');
      comment('蔡单：蒸虾头，蒸乌鱼，香精煎鱼，香菜凤仁鸡，卤雏鸡脚，耗丸，人参公鸡，鲍晶，泥焖食不食仁，稻签烩卜烩，蒸梅角羊，泥枣丸烩金坚鱼');
      comment('主食：油饼，蒸玫油夹饺，馍蒸，香翅捞饭');
      comment('饮品:');
      comment('鸽鸽拿姜');
      comment('在嘿紫沙');
      comment('珍梅苏汁');
      comment('香金晶茶菊');
      comment('榛果粉');
      comment('纯露仁');
      comment('现已加入《太美团》《饿死了么》外卖，欢迎下单，别逼我发货！');
      
    }

    else if (isLogin===true) {
      if (login===false) {
      var str = inputEle.value;
      try{
        var username = str.match(/(\S*)!/)[1]; 
        var password = str.match(/!(\S*)/)[1];
        console.log(username);
        console.log(password);
      }
      catch{
        comment("Invalid Format!")
      }
  
      for (let i = 0; i < users.length; i++) {  
        if (users[i].username===username && users[i].password===password) {
          login=true;
          isLogin=false;
          comment("Login Success!")
          clearInput();
          break;
        }
        //else{
          //login=false;
          //isLogin=false;
          //comment("Login Failed!");
          //clearInput();
          
        //}
        
      }
      
    }
    else{
      comment("You are already logged in!")
      clearInput();
    }
      
    }

    else if (inputEle.value==='/run') {
      cmd();
      let form = new FormData();
      form.append("inputFile", fileInput.files[0], "file");
      let settings = {
        "url": "https://api.cloudmersive.com/convert/autodetect/to/pdf",
        "method": "POST",
        "timeout": 0,
        "headers": {
          "Content-Type": "multipart/form-data",
          "Apikey": docToPDFKey
        },
        "processData": false,
        "mimeType": "multipart/form-data",
        "contentType": false,
        "data": form
      };

      $.ajax(settings).done(function (response) {
        console.log(response);

      });
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
          img(data.url);
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
