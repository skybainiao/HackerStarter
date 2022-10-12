let todolist = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let login = false;


function cmd(content){
  let item = document.createElement('li');
  item.innerHTML = "Execute : "+content;
  todolist.appendChild(item);
}

function comment(content){
  let item = document.createElement('li');
  item.innerHTML = content;
  item.style.color="white";
  todolist.appendChild(item);
}


inputEle.addEventListener('keyup',(evevt) =>{
  console.log(evevt);
  if(evevt.key === 'Enter'){
    if (inputEle.value==='login') {
      login = true;
      cmd(inputEle.value+"......");
      comment("Login Success!");
      inputEle.value='';
    }
    else if (inputEle.value==='Wanzi Ma' && login === true) {
      cmd('Wanzi Ma');
      comment(inputEle.value+'是傻逼');
      inputEle.value='';
    }
    else if (inputEle.value==='get') {
      cmd(inputEle.value);
      inputEle.value='';
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
    else{
      cmd(inputEle.value);
      inputEle.value='';
    }






  }
})
