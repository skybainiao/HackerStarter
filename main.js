let todolist = document.getElementsByTagName('ul')[0];
let inputEle = document.getElementById('content');
let login = false;


function addNew(content){
  let item = document.createElement('li');
  item.innerHTML = content;
  todolist.appendChild(item);
}


inputEle.addEventListener('keyup',(evevt) =>{
  console.log(evevt);
  if(evevt.key === 'Enter'){
    if (inputEle.value==='login') {
      login = true;
      addNew(inputEle.value+"......");
      addNew("Login Success!");
      inputEle.value='';
    }
    else if (inputEle.value==='Wanzi Ma' && login === true) {
      addNew(inputEle.value+'是傻逼');
      inputEle.value='';
    }
    else{
      addNew(inputEle.value);
      inputEle.value='';
    }

  }
})
