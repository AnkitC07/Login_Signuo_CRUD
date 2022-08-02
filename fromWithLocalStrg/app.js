var flag=false;
function username(e){
   let email = document.getElementById("email").value;
   if(email==""){
      document.getElementById("error0").innerHTML="**Enter Email**";
      flag = true;
   }else{
      document.getElementById("error0").innerHTML="";

   }
   e.preventDefault();
}
function password(e){
   let pass = document.getElementById("password").value;
   if(pass==""){
      document.getElementById("error1").innerHTML="**Enter Password**";
      console.log("username")
      flag = true;
   }else{
      document.getElementById("error1").innerHTML="";
   }
}
function checklogin(event)
        {
            flag=false;
            username(event);
            password(event);
            if(flag==true)
                return false;
            else
                login(event);
                event.preventDefault()
}


function login(e){
   let email = document.getElementById("email").value,
   password = document.getElementById("password").value;
   let flag=false
   

   const data_get = JSON.parse(localStorage.getItem(email));
   
   if(data_get == null){
      flag=false;
   }else if( password == btoa(data_get.password)){
      flag=true;
   }else{
      flag=false;
   }
   
   
   if(flag){
      var element = document.getElementById("popup");
      element.innerHTML = "Successful login ";
      element.classList.remove("popup");
      element.className += " " + "success";
      console.log(data_get.role);
      
      setTimeout(() => {
         sessionStorage.setItem("code","login");
         sessionStorage.setItem("role",data_get.role);

         location.href = "dashboard.html?role="+encodeURIComponent(data_get.role);
         // adminview(data_get.role);
         
      }, 1200);
   }else{
      var element = document.getElementById("popup");
      element.classList.remove("success");
      element.className += " " + "popup";

      element.innerHTML = "incorrect login credentials";
      // document.getElementById("popup").innerHTML= "incorrect login credentials";
   }
   
   e.preventDefault();
   
}


function signup(e){
   // let data = JSON.parse(localStorage.getItem("data")) || [];
  let data = {
         fname : document.getElementById("fname").value,
         lname : document.getElementById("lname").value,
         email : document.getElementById("email").value,
         role : document.querySelector("select").value,
         password : atob(document.getElementById("password").value)
      }
   const data_get = JSON.parse(localStorage.getItem(data.email));
   console.log(data_get)

      if(data_get==null ){
         flag=true;
      }else if(data.email == data_get.email){
      flag=false;
      }else{
         flag=true;
      }

      
      if(flag){
         var element = document.getElementById("popup");
         element.innerHTML = "Successfuly Siged up ";
         element.classList.remove("popup");
         element.className += " " + "success";
         
         localStorage.setItem(data.email,JSON.stringify(data));
      setTimeout(() => {
         location.href = "signup.html";
      }, 1000);
   }else{
      var element = document.getElementById("popup");
      element.classList.remove("success");
      element.className += " " + "popup";

      element.innerHTML = "Data Already Exists";
      // document.getElementById("popup").innerHTML= "incorrect login credentials";
   }
   e.preventDefault();
}
function fname(e){

   let fname = document.getElementById("fname").value;
   var letters = /^[a-zA-Z]+$/;
   if(fname==""){
      document.getElementById("error0").innerHTML="**Enter Name**";
      flag = true;
   }else if(fname.match(letters)){
      document.getElementById("error0").innerHTML="";
      flag=false;
   }else{
      document.getElementById("error0").innerHTML="**Enter Alphabates only**";
      
      flag = true;
   }
   e.preventDefault();

}
function lname(e){

   let lname = document.getElementById("lname").value;
   var letters = /^[a-zA-Z]+$/;
   if(lname==""){
      document.getElementById("error1").innerHTML="**Enter Name**";
      flag = true;
   }else if(lname.match(letters)){
      document.getElementById("error1").innerHTML="";
      flag=false;
   }else{
      document.getElementById("error1").innerHTML="**Enter Alphabates only**";
      flag = true;
   }
   e.preventDefault();

}
function email(e){
   let email = document.getElementById("email").value;  
   var string = email.toLowerCase();
   const word = string.split(" "); 

   for( var i = 0 ; i<word.length; i++){
      
       if("@" == word[i].match("@") && word[i].endsWith(".com")){
         document.getElementById("error2").innerHTML="";
         flag=false;
       }else if(email ==""){
         document.getElementById("error2").innerHTML="**Enter Email**";
         flag = true;
      }else{
         document.getElementById("error2").innerHTML="**Enter Valid Email **";
         flag = true;
      }
   }
   e.preventDefault();
}
function pass(e){

   let pass = document.getElementById("password").value;
  
   if(pass ==""){
      document.getElementById("error3").innerHTML="**Enter Password**";
      flag = true;
   }else if(pass.length<8){
      document.getElementById("error3").innerHTML="**Enter Min 8 Letters**";
      flag = true;
   }else{
      document.getElementById("error3").innerHTML="";
      flag = false;
   }
   e.preventDefault();

}
function checksignup(event)
        {
            flag=false;
            fname(event);
            lname(event);
             email(event);
             pass(event);
            if(flag==true)
                return false;
            else
                signup(event);
                event.preventDefault()
}

function edit(td){
   let modal = document.getElementById("modal");
   modal.style.display="block";

   selectedrow = td.parentElement.parentElement.parentElement;
   document.getElementById("")
   document.getElementById("editfname").value = selectedrow.cells[1].innerHTML;
   document.getElementById("editlname").value = selectedrow.cells[2].innerHTML;
   document.getElementById("editemail").value = selectedrow.cells[3].innerHTML;

  let edit= document.getElementById("edit");
   edit.addEventListener('click',()=>{
      update(selectedrow);   
   })
   
}
function update(row){
   console.log(row.cells[0].innerHTML-1)
   
   let fname = document.getElementById("editfname").value;
   let lname = document.getElementById("editlname").value;
   let email = document.getElementById("editemail").value;
   let key = localStorage.key((row.cells[0].innerHTML-1));
   let data= JSON.parse(localStorage.getItem(key));
   
   for(let i=0; i<localStorage.length; i++){
      if(i==(row.cells[0].innerHTML-1)){
         // localStorage.setItem(localStorage.key(i),)
         data.fname= fname;
         data.lname= lname;
         data.email= email;
         
      }
   }
   localStorage.setItem(key,JSON.stringify(data));  

}
function deleterow(td){
   selectedrow = td.parentElement.parentElement.parentElement;
   let key = localStorage.key((selectedrow.cells[0].innerHTML-1));
   console.log(key)

   localStorage.removeItem(key);

   location.href = "dashboard.html";

}