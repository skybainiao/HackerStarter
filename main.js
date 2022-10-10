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
    else if (inputEle.value==='get') {
      addNew(inputEle.value);
      inputEle.value='';
      $.ajax({
        url:'http://myblog-env.eba-scwpwmpk.eu-central-1.elasticbeanstalk.com/users',
        type:'get',
        dataType:'json',
        success(data){
          console.log(data);
          for (let i = 0; i < data.length; i++) {
            addNew(JSON.stringify(data[i]));
          }

        },
        error(err){
          console.log(err);
          addNew("Requested failed");
        }
      })
    }
    else{
      addNew(inputEle.value);
      inputEle.value='';
    }

  }
})
