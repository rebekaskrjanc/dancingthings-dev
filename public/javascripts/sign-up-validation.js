document.getElementById("gumb").addEventListener("click", Validate);
console.log("connected")
function Validate() {
  var username=document.getElementById("username_div");
  var email=document.getElementById("email_div");
  var password1=document.getElementById("password_div");
  var password2=document.getElementById("pass_confirm_div");

  username.style.border = "1px solid grey";
  document.getElementById('username_div').style.color = "grey";
  username.setCustomValidity("");
  email.style.border = "1px solid grey";
  document.getElementById('email_div').style.color = "grey";
  email.setCustomValidity("");
  password1.style.border = "1px solid grey";
  document.getElementById('password_div').style.color = "grey";
  password1.setCustomValidity("");
  password2.style.border = "1px solid grey";
  document.getElementById('pass_confirm_div').style.color = "grey";
  password2.setCustomValidity("");

  username.addEventListener("input", function (event) {
      username.setCustomValidity("");
  });
  email.addEventListener("input", function (event) {
      email.setCustomValidity("");
  });
  password1.addEventListener("input", function (event) {
      password1.setCustomValidity("");
  });
  password2.addEventListener("input", function (event) {
      password2.setCustomValidity("");
  });
  // validate username
  if (username.value == "") {
    username.style.border = "1px solid red";
    document.getElementById('username_div').style.color = "red";
    username.setCustomValidity("This field is mandatory!");
    username.focus();
    return false;
  }
  // validate username length
  if (username.value.length < 3) {
    username.style.border = "1px solid red";
    document.getElementById('username_div').style.color = "red";
    username.setCustomValidity("Username should be at least 3 characters long!");
    username.focus();
    return false;
  }
  // validate email
  if (email.value == "") {
    email.style.border = "1px solid red";
    document.getElementById('email_div').style.color = "red";
    email.setCustomValidity("This field is mandatory!");
    email.focus();
    return false;
  }
  //validate email structure
  if (email.value.indexOf('@')<0) {
    email.style.border = "1px solid red";
    document.getElementById('email_div').style.color = "red";
    email.setCustomValidity("Enter a valid email adress!");
    email.focus();
    return false;
  }
  // validate password
  if (password1.value == "") {
    password1.style.border = "1px solid red";
    document.getElementById('password_div').style.color = "red";
    password1.setCustomValidity("Enter password!");
    password2.style.border = "1px solid red";
    password1.focus();
    return false;
  }
   // validate password length
  if (password1.value.length < 8) {
    password1.style.border = "1px solid red";
    document.getElementById('password_div').style.color = "red";
    password1.setCustomValidity("Password should be at least 8 characters long!");
    password1.focus();
    return false;
  }
  // check if the two passwords match
  if (password1.value != password2.value) {
    console.log("enter if")
    password2.style.border = "1px solid red";
    document.getElementById('pass_confirm_div').style.color = "red";
    password2.style.border = "1px solid red";
    password2.setCustomValidity("Passwords do not match!");
    return false;
  }
}
