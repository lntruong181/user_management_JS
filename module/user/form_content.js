// import changeView from "./user_profile.js";
const endpoint = "https://60fe719525741100170785bd.mockapi.io/api/v1/contents";
const ultag = document.querySelector("ul");
createTable();
let page = 1;
let perPage = 10;
let start = 0;
let end = perPage;
async function createTable() {
  const content = await fetch(endpoint).then((response) =>
    response.json().then((content) => {
      return content;
    })
  );

  const userEmail = localStorage.getItem("email");
  let rawListUser = content.filter((e) => e.userID == userEmail);
  let listUserContent = content
    .filter((e) => e.userID == userEmail)
    .slice(start, end);
  var totalPage = Math.ceil(rawListUser.length / perPage);
  handlePagination(totalPage, page);

  renderContent(listUserContent);
}

function renderContent(listUserContent) {
  let tdTag = "";
  for (let i = 0; i < perPage; i++) {
    try {
      const body = document.getElementById("body");
      let row = document.createElement("tr");
      row.innerHTML = "";
      tdTag += "<tr>";
      tdTag += "<td>" + listUserContent[i].id + "</td>";
      tdTag += "<td>" + listUserContent[i].title + "</td>";
      tdTag += "<td>" + listUserContent[i].brief + "</td>";
      tdTag += "<td>" + listUserContent[i].description + "</td>";
      tdTag += "<td>" + listUserContent[i].createdDate + "</td>";
      tdTag += `<td>
    <div class="action-content">
        <i  class="action far fa-eye" onclick='handleActionContent(${listUserContent[i].id},"view")'></i>
        <i  class='action fas fa-wrench'  onclick='handleActionContent(${listUserContent[i].id},"update")'></i>
        <i  class='action fas fa-trash-alt' onclick = 'handleActionContent(${listUserContent[i].id},"delete")'></i>
    </div>
  </td>`;
      tdTag += "</tr>";
    } catch {}
  }
  body.innerHTML = tdTag;
}

function handlePagination(totalPages, page) {
  const listPage = document.getElementById("list_page");
  let activeLi;
  let beforePage = page - 1;
  let afterPage = page + 1;
  let liTag = "";
  // OK
  if (page > 1) {
    // nếu page < 1 thì add thêm buttom prev
    liTag += `<li class ='btn prev' 
    onclick='handlePagination(${totalPages},${page - 1});onChangePage(${
      page - 1
    })'><span> <i class="fas fa-angle-left"></i> Prev</span></li>`;
  }

  if (page > 2) {
    liTag += `<li class ='numb' onclick = 'handlePagination(${totalPages},1);onChangePage(1)'><span>1</span></li>`;
    if (page > 3) liTag += `<li class ='dot'><span>...</span></li>`;
  }
  // if (page == totalPages) {
  //   beforePage = beforePage - 2;
  // } else if (page == totalPages - 1) {
  //   beforePage = beforePage - 1;
  // }
  // if (page == 1) {
  //   afterPage = afterPage + 2;
  // } else if (page == 2) {
  //   afterPage = afterPage + 1;
  // }
  for (let pagelength = beforePage; pagelength <= afterPage; pagelength++) {
    if (pagelength > totalPages) {
      continue;
    }
    if (pagelength == 0) {
      pagelength = pagelength + 1;
    }
    if (page == pagelength) {
      // Nếu page = pagelength thì thêm active vào li
      activeLi = "active";
    } else {
      // ngược lại
      activeLi = "";
    }

    liTag += ` <li class ='numb ${activeLi}' onclick = 'handlePagination(${totalPages},${pagelength});onChangePage(${pagelength})'><span>${pagelength}</span></li>`;
  }
  //ok
  //1 3
  if (page < totalPages - 1) {
    if (page < totalPages - 2) {
      liTag += `<li class ='dot'><span>...</span></li>`;
    }
    liTag += `<li class ='numb' onclick = 'handlePagination(${totalPages},${totalPages});onChangePage(${totalPages})'><span>${totalPages}</span></li>`;
  }

  //ok
  if (page < totalPages) {
    // nếu page > 1 thì add thêm buttom number
    liTag += ` <li class ='btn next' onclick='handlePagination(${totalPages},${
      page + 1
    });onChangePage(${page + 1})'><span>Next <i class="fas fa-angle-right"
    >
    </i></span></li>`;
  }
  listPage.innerHTML = liTag;
}

function onChangePage(newPage) {
  page = newPage;
  start = (page - 1) * perPage;
  end = page * perPage;
  createTable();
}

/*************************************






HANDLE ACTION EVENT







**************************************/

async function handleActionContent(contentID, method) {
  let content = await fetch(endpoint).then((response) =>
    response.json().then((content) => {
      return content;
    })
  );
  let contentDetail = content.filter((e) => e.id == contentID);
  console.log(method);
  switch (method) {
    case "view": {
      ViewContent(contentID, contentDetail);
      break;
    }
    case "update": {
      UpdateContent(contentID, contentDetail);
      break;
    }
    case "delete": {
      DeleteContent(contentID);
      break;
    }
  }
}

function UpdateContent(contentID, contentDetail) {
  localStorage.setItem("contentID", contentDetail[0].id);
  localStorage.setItem("title", contentDetail[0].title);
  localStorage.setItem("brief", contentDetail[0].brief);
  localStorage.setItem("desc", contentDetail[0].description);
  title.value = contentDetail[0].title;
  brief.value = contentDetail[0].brief;
  desc.value = contentDetail[0].description;
  header.textContent = "Edit Content";
  btn_content_submit.disabled = true;
  document.getElementById("ViewContent").style.display = "none";
  document.getElementById("AddContent").style.display = "block";
}
function DeleteContent(contentID) {
  fetch(endpoint2 + "/" + contentID, {
    method: "DELETE", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then(() => {
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
function ViewContent(contentID, contentDetail) {
  localStorage.setItem("title", contentDetail[0].title);
  localStorage.setItem("brief", contentDetail[0].brief);
  localStorage.setItem("desc", contentDetail[0].description);
  title.value = contentDetail[0].title;
  brief.value = contentDetail[0].brief;
  desc.value = contentDetail[0].description;
  header.textContent = "View Content";
  title.disabled = true;
  brief.disabled = true;
  desc.disabled = true;
  btn_content_submit.disabled = true;
  btn_content_reset.disabled = true;
  document.getElementById("ViewContent").style.display = "none";
  document.getElementById("AddContent").style.display = "block";
}
