
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
let status1 = '';
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

let fullname='';
let age='';
let sex='';
let email='';

let arr=[];
arr.push(fullname);
arr.push(age);
arr.push(sex);
arr.push(email);

window.onload = function(){
    questions();
}

function questions(){
    if(arr[0,1,2,3]==''){
        status1=0;
        comment("Enter your fullname:");
    }
    
}

function generateRandomPassword(length) {
    // 字符集
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()-_=+{}[]|;:,.<>?/`~';

    const allCharacters = lowerCaseLetters + upperCaseLetters + numbers + symbols;
    const maxIndex = allCharacters.length - 1;
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
        password += allCharacters.charAt(randomIndex);
    }

    return password;
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
  

  function cmd(){
    let item = document.createElement('li');
    item.innerHTML = "Execute : "+inputEle.value;
    item.style.marginTop='2px';
    inputEle.value='';
    todoList.appendChild(item);
  }

  function img(url) {
    let item = document.createElement('img');
    item.src=url;
    todoList.appendChild(item);
  }


function clearInput() {
    inputEle.value='';
  }


  inputEle.addEventListener('keyup',(evevt) =>{
    if(evevt.key === 'Enter'){
      if (status1=='0') {
        fullname=inputEle.value;
        status1=1;
        cmd();
        comment("Enter your age:");
    }
    else if(status1=='1'){
        age=inputEle.value;
        status1=2;
        cmd();
        comment("Enter your sex(male or female):");
    }
    else if(status1=='2'){
        sex=inputEle.value;
        status1=3;
        cmd();
        comment("Enter your email:");
    }
    else if(status1=='3'){
        email=inputEle.value;
        status1='';
        cmd();
        password=generateRandomPassword(8);
        var user = {
            "username":fullname+age,
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


        comment("Welcome to IDFC Virtual Republic");
    }
    else if(status1==''){
        cmd();
        comment("Invlid Command")
    }
    }
    
  })
  
  