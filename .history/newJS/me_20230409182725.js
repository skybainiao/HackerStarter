let todoList = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let fileInput = document.getElementById('fileInput');
let submit = document.getElementById('submit-1');
let p2 = document.getElementById('p2');
let p3 = document.getElementById('p3');
let i = 0;
let users = [];
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

let name1=document.getElementById('name');
let email=document.getElementById('email');
let messages=document.getElementById('message');
let sender=document.getElementById('send');
    
//sender.onclick = () =>send();

    function send(){
        let message = {
            "username":name1.data,
            "content":"message:"+name1.data+","+email.data+","+messages.data,
            "time":date.toLocaleString(),
           }

           $.ajax({
            type:'post',
            url:'https://www.hackerstarters.com/send',
            data:JSON.stringify(message),
            dataType:"text",
            contentType:"application/json",
            success(data){
                sender.innerHTML='Sent';
            },
            error(err){
             console.log(err);
           }
          });
    }