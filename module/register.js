if (localStorage.getItem("authen") == 1) {
  window.location = "/page/UserProfile.html";
}

const userEndpoint = "https://60fe719525741100170785bd.mockapi.io/api/v1/users";
const email = document.getElementById("email");
const labelEmail = document.getElementsByTagName("p")[3];

const btn = document.querySelector("button");
btn.addEventListener("click", dangky);

email.addEventListener("change", function () {
  validEmail(email, true);
});
async function dangky() {
  const userName = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const repassword = document.getElementById("repassword");
  const labelName = document.getElementsByTagName("p")[1];
  const labelEmail = document.getElementsByTagName("p")[3];
  const labelPassword = document.getElementsByTagName("p")[5];
  const labelRepassword = document.getElementsByTagName("p")[7];

  const newData = {
    firstName: userName.value,
    email: email.value,
    password: password.value,
    createdDate: new Date(),
  };

  if (
    userName.value != "" &&
    email.value != "" &&
    password.value != "" &&
    password.value == repassword.value &&
    validationPassword(password.value) == true
  ) {
    document.getElementById("text_repassword").textContent = "";
    const flaq = await handleData(email.value);
    if (flaq == true) {
      await fetch(userEndpoint, {
        method: "POST", // or 'PUT'
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      })
        .then((response) => response.json())
        .then((data) => {
          location.replace("/page/login.html");
        })
        .catch((error) => {
          alert("Lỗi: " + data);
        });
    } else {
      validEmail(email, false);
    }
  } else {
    validPassword(password);
    validEmail(email, true);
    validUserName(userName);
  }

  async function handleData(email) {
    const item = await fetch(userEndpoint)
      .then((response) => response.json())
      .then((data) => {
        return data;
      })
      .catch((error) => {
        alert("Lỗi: " + data);
      });
    const user = item.filter((e) => e.email === email);
    return user.length == 0 ? true : false;
  }

  function validPassword(password) {
    const text_password = document.getElementById("text_password");
    const text_repassword = document.getElementById("text_repassword");
    if (password.value != "") {
      const flaq = validationPassword(password.value);
      if (flaq == false) {
        text_password.textContent =
          "Sử dụng 8 ký tự trở lên cho mật khẩu của bạn";
        password.focus();
      } else {
        text_password.textContent = "";
        if (repassword.value == "") {
          labelRepassword.setAttribute("style", "color:red");
          repassword.setAttribute("style", "border-color:red");
          repassword.focus();
          text_repassword.textContent = "Xác nhận mật khẩu của bạn!";
        } else {
          if (password.value != repassword.value) {
            text_repassword.textContent =
              "Các mật khẩu đã nhập không khớp. Hãy thử lại.";
            repassword.focus();
          }
        }
      }
    } else {
      labelPassword.setAttribute("style", "color:red");
      password.setAttribute("style", "border-color:red");
      text_password.textContent = "Nhập mật khẩu";
      password.focus();
    }
  }

  function validUserName(userName) {
    const text_username = document.getElementById("text_username");
    if (userName.value != "") {
      text_username.textContent = "";
    } else {
      labelName.setAttribute("style", "color:red");
      userName.setAttribute("style", "border-color:red");
      userName.focus();
      text_username.textContent = "Nhập tên người dùng";
    }
  }

  function validationPassword(password) {
    const re = /.{8,}/;
    return re.test(password);
  }
}
function validEmail(email, flaq) {
  const text_email = document.getElementById("text_email");

  if (flaq == true) {
    if (email.value != "") {
      if (validationEmail(email.value) == true) {
        email.setAttribute("style", "border-color:#1a73e8");
        labelEmail.setAttribute("style", "border-color:#1a73e8");
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
  } else {
    labelEmail.setAttribute("style", "color:red");
    email.setAttribute("style", "border-color:red");
    text_email.textContent = "Email này đã được đăng ký!";
    email.focus();
  }
}
function validationEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}
