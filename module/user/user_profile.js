if (localStorage.getItem("authen") == 0) {
  window.location = "/page/login.html";
}

const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const descriptions = document.getElementById("descriptions");
const btnView = document.getElementById("view");
const btn_reset = document.getElementById("btn_reset");
btnView.addEventListener("click", openUserProfile);
btn_reset.addEventListener("click", getData);

function openUserProfile() {
  openView("profileContent");
  getData();
}
function getData() {
  firstName.value = localStorage.getItem("username");
  lastName.value = localStorage.getItem("lastname");
  email.value = localStorage.getItem("email");
  phone.value = localStorage.getItem("phone");
  descriptions.value = localStorage.getItem("descriptions");
}

const btnsubmit = (document.getElementById("btn_submit").onclick = function () {
  localStorage.setItem("username", firstName.value);
  localStorage.setItem("lastname", lastName.value);
  localStorage.setItem("phone", phone.value);
  localStorage.setItem("descriptions", descriptions.value);
});

const btn_logout = (document.getElementById("logout").onclick = function () {
  localStorage.setItem("authen", "0");
  location.replace("/page/login.html");
});

const open = function openView(form) {
  let i;
  let x = document.getElementsByClassName("content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(form).style.display = "block";
};
let k;
export default open;
