const endpoint2 = "https://60fe719525741100170785bd.mockapi.io/api/v1/contents";
const Time = new Date();
const currentTime =
  Time.getDate() + "/" + Time.getMonth() + "/" + Time.getFullYear();

const btn_content_submit = document.getElementById("btn_content_submit");
const title = document.getElementById("content_title");
const brief = document.getElementById("content_brief");
const desc = document.getElementById("content_descriptions");
const header = document.querySelector(".edit");

btn_content_submit.addEventListener("click", () => {
  const contentID = localStorage.getItem("contentID");
  if (contentID != null) {
    putData(contentID, title, brief, desc);
  } else {
    postData(title, brief, desc);
  }
});

btn_content_reset.addEventListener("click", () => {
  if (localStorage.getItem("title") != null) {
    title.value = localStorage.getItem("title");
    brief.value = localStorage.getItem("brief");
    desc.value = localStorage.getItem("desc");
    btn_content_submit.disabled = true;
  } else {
    title.value = "";
    brief.value = "";
    desc.value = "";
  }
});
async function putData(contentID, title, brief, desc) {
  const newData = {
    title: title.value,
    brief: brief.value,
    description: desc.value,
  };
  if (title.value != "" && brief.value != "" && desc.value != "") {
    await fetch(endpoint2 + "/" + contentID, {
      method: "PUT", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.removeItem("contentID");
        localStorage.removeItem("title");
        localStorage.removeItem("brief");
        localStorage.removeItem("desc");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    validData(title, brief, desc);
  }
}

async function postData(title, brief, desc) {
  const newData = {
    title: title.value,
    brief: brief.value,
    description: desc.value,
    userID: localStorage.getItem("email"),
    createdDate: currentTime,
  };
  if (title.value != "" && brief.value != "" && desc.value != "") {
    await fetch(endpoint2, {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        refreshData(title, brief, desc);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    validData(title, brief, desc);
  }
}

title.addEventListener("change", function () {
  btn_content_submit.disabled = false;
  validTitle(title);
});
brief.addEventListener("change", function () {
  btn_content_submit.disabled = false;
  validBrief(brief);
});
desc.addEventListener("change", function () {
  btn_content_submit.disabled = false;
  validDesc(desc);
});
function validData(title, brief, desc) {
  validDesc(desc);
  validBrief(brief);
  validTitle(title);
}
function validDesc(desc) {
  const text_desc = document.getElementById("hint_desc");
  if (desc.value == "") {
    desc.setAttribute("style", "border-color: red");
    desc.focus();
    text_desc.textContent = "Nhập mô tả chi tiết";
    text_desc.setAttribute("style", "display: block");
  } else {
    desc.setAttribute("style", "border-color: #1a73e8");
    text_desc.setAttribute("style", "display: none");
    return true;
  }
}

function validBrief(brief) {
  const text_brief = document.getElementById("hint_brief");
  if (brief.value == "") {
    brief.setAttribute("style", "border-color: red");
    brief.focus();
    text_brief.textContent = "Nhập tóm tắt";
    text_brief.setAttribute("style", "display: block");
  } else {
    brief.setAttribute("style", "border-color: #1a73e8");
    text_brief.setAttribute("style", "display: none");
    return true;
  }
}
function validTitle(title) {
  const text_title = document.getElementById("hint_title");
  if (title.value == "") {
    title.setAttribute("style", "border-color: red");
    title.focus();
    text_title.textContent = "Nhập tiêu đề";
    text_title.setAttribute("style", "display: block");
  } else {
    title.setAttribute("style", "border-color: #1a73e8");
    text_title.setAttribute("style", "display: none");
    return true;
  }
}

function refreshData() {
  title.value = "";
  brief.value = "";
  desc.value = "";
  document
    .getElementById("icon_success")
    .setAttribute("style", "display:inline-block");
  setInterval(() => {
    document
      .getElementById("icon_success")
      .setAttribute("style", "display:none");
  }, 2000);
}
