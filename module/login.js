if (localStorage.getItem("authen") == 1) {
  window.location = "/page/UserProfile.html";
}
const btn = document.querySelector("button");
btn.addEventListener("click", dangnhap);

function Page() {
  const params = new URLSearchParams(window.location.search);
  params.set("page", 123);
  window.history.replaceState(
    {},
    "",
    decodeURIComponent(`${window.location.pathname}?${params}`)
  );

  // const search = Object.search("page", 123);
  // const parsedUrl = new URL(window.location.href);
  // parsedUrl.searchParams.get("page");
}
async function dangnhap() {
  let userID;
  const url = "https://60fe719525741100170785bd.mockapi.io/api/v1/users";
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  if (email.value != "" && password.value != "") {
    {
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
          userID = handleData(data, email);
          if (userID != "") {
            localStorage.setItem("authen", "1");
            localStorage.setItem("username", userID[0].firstName);
            localStorage.setItem("email", userID[0].email);
            localStorage.setItem("password", userID[0].password);
            location.replace("/page/UserProfile.html");
          } else {
            validEmail(email, false);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  } else {
    validPassword(password, true);
    validEmail(email, true);
  }
}

function handleData(content, email) {
  const userID = content.filter((e) => e.email == email.value);
  return userID;
}

function validPassword(password) {
  const text_password = document.getElementById("text_password");
  const labelPassword = document.getElementsByTagName("p")[3];
  if (password.value != "") {
    text_password.textContent = "";
  } else {
    labelPassword.setAttribute("style", "color:red");
    password.setAttribute("style", "border-color:red");
    text_password.textContent = "Nhập mật khẩu";
    password.focus();
  }
}

function validEmail(email, flaq) {
  const labelPassword = document.getElementsByTagName("p")[3];
  const text_email = document.getElementById("text_email");
  const labelEmail = document.getElementsByTagName("p")[1];
  if (flaq == false) {
    validPassword(labelPassword);
    labelEmail.setAttribute("style", "color:red");
    email.setAttribute("style", "border-color:red");
    text_email.textContent = "Email hoặc mật khẩu sai!";
    email.focus();
  } else {
    if (email.value != "") {
      if (validationEmail(email.value) == true) {
        labelEmail.setAttribute("style", "color:#1a73e8");
        email.setAttribute("style", "border-color:#1a73e8");
        text_email.textContent = "";
      } else {
        labelEmail.setAttribute("style", "color:red");
        email.setAttribute("style", "border-color:red");
        text_email.textContent = "Email không hợp lệ !";
        email.focus();
      }
    } else {
      labelEmail.setAttribute("style", "color:red");
      email.setAttribute("style", "border-color:red");
      email.focus();
      text_email.textContent = "Nhập địa chỉ email";
    }
  }
}

function validationEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
