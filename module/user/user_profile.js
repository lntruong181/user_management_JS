if (localStorage.getItem("authen") == 1) {
  const div = `<header><div class="navbar">
  <p>CSM <span>Code</span></p>
  <div class="search_bar">
    <input type="text" placeholder="Search...">  </input>
    <i class="fas fa-search"></i>
  </div>
    <div class="dropdown"><i class="icon fas fa-user"></i>
      <div class="dropdown-content">
        <button class="profileContent" id="view"><i class="fas fa-user" ></i> User Profile</button>
        <button  class="btn" id="logout"> <i class="fas fa-sign-out-alt"></i> Logout</button>
      </div>
    </div>
</div>


<!-- SIDE BAR -->


<div class="sidebar">
  
  <div class="category">
    <a class="viewContent" id="view" onclick = "openView('ViewContent')"><i class="fas fa-list"></i> <span>View contents</span> </a>
    <a class="FormContent" onclick = "openView('AddContent')"><i class="fas fa-book-open"></i> <span>Form content</span> </a>
  </div>
 
</div>

<!-- PROFILE CONTENT O DAY -->

<div id="profileContent" class="content" style="display: none">
  <p class='heading'>Edit Profile</p>
  <div class="sub-content">
    <p class="hero">Profile Form Elements</p>
    <div class="sub-content-hero">
      <p>First Name</p>
      <input class="info" id="firstname" placeholder="Enter the first name">
      <p>Last Name</p>
      <input class="info" id="lastname"  placeholder="Enter the last name" id="w3review" name="w3review" >
        </input>
        <p>Email</p>
        <input class="info" id="email" id="w3review" name="w3review" disabled >
        </input>
        <p>Phone</p>
        <input class="info" id="phone"  placeholder="Enter the phone number" id="w3review" name="w3review" >
        </input>
        <p>Descriptions</p>
        <textarea  id="descriptions" name="w3review" ></textarea>
        <button id="btn_submit">Submit Button</button>
        <button id="btn_reset">Reset Button</button>
    </div>
  </div>
</div>

<!-- VIEW CONTENT O DAY  -->


<div id="ViewContent" class="content" >
  <p class='heading'>View Profile</p>
  <div class="sub-content">
    <p class="hero">Profile Form Elements</p>
    <table id="content">
      <thead>
        <th>#</th>
        <th>Title</th>
        <th>Brief</th>
        <th>Descriptions</th>
        <th>Created Date</th>
        <th>Action</th>
      </thead>
      <tbody id="body">

      </tbody>
    </table>
  </div>
  <div class="pagination">
    <div class="page-content">
      <ul id="list_page">
        <!-- <li class ='btn prev'><span> <i class="fas fa-angle-left"></i> Prev</span></li>
        <li class ='numb '><span>1</span></li>
        <li class ='numb'><span>2</span></li>
        <li class ='numb'><span>3</span></li>
        <li class ='numb'><span>4</span></li>
        <li class ='numb'><span>...</span></li>
        <li class ='numb'><span>10</span></li>
        <li class ='btn next'><span>Next <i class="fas fa-angle-right"></i></span></li> -->
      </ul>
    </div>
   
</div>
</div>


<!-- FORM CONTENT O DAY -->



<div id="AddContent" class="content" style="display: none">
  <p class='heading edit'>Add Content</p>
  <div class="sub-content">
    <p class="hero">Profile Form Elements</p>
    <div class="sub-content-hero">
      <p>Title<span class="required">*</span></p>
      <input class="add_content" id="content_title" placeholder="Enter the title ">
      <span class="hint" id ='hint_title'></span>
      <p>Brief<span class="required">*</span></p>
      <textarea  id="content_brief" class="add_content" name="w3review" ></textarea>
      <span  class="hint" id ='hint_brief'></span>

        <p>Descriptions<span class="required">*</span></p>
        <textarea class="add_content"  id="content_descriptions" name="w3review" rows="5"></textarea>
      <span  class="hint" id ='hint_desc'></span>
        <button id="btn_content_submit">Submit Button</button>
        <button id="btn_content_reset">Reset Button</button>
        <i id="icon_success" class="icon_succes fas fa-check"></i>

    </div>
  </div>
 
</div>
  <!-- NAVBAR -->
</header>`;
  const RegisterPage = document.querySelector("body");
  RegisterPage.innerHTML = div;
} else {
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

function openView(form) {
  document.querySelector(".edit").textContent = "Add Content";
  title.disabled = false;
  brief.disabled = false;
  desc.disabled = false;
  btn_content_submit.disabled = false;
  btn_content_reset.disabled = false;
  title.value = "";
  brief.value = "";
  desc.value = "";
  header.textContent = "Add Content";
  let i;
  let x = document.getElementsByClassName("content");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(form).style.display = "block";
}
