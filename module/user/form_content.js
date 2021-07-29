import changeView from "./user_profile.js";
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
  let listUserContent = content
    .filter((e) => e.userID == userEmail)
    .slice(start, end);
  var totalPage = Math.ceil(content.length / perPage) - 1;
  handlePagination(totalPage, page);

  renderContent(listUserContent);
}

function renderContent(listUserContent) {
  let tdTag = "";
  for (let i = 0; i < perPage; i++) {
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
        <i  class="action far fa-eye"></i>
        <i  class='action fas fa-wrench'  onclick='handleAction(${listUserContent[i].id})'></i>
        <i  class='action fas fa-trash-alt'></i>
    </div>
  </td>`;
    tdTag += "</tr>";
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

function handleAction(contentID) {
  localStorage.setItem("contentID", contentID);
  const title = document.getElementById("content_title");
  const brief = document.getElementById("content_brief");
  const desc = document.getElementById("content_descriptions");
  title.value = contentID;
  changeView("FormContent");
  // let x = document.getElementsByClassName("content");
  // for (i = 0; i < x.length; i++) {
  //   x[i].style.display = "none";
  // }
  // document.getElementById("FormContent").style.display = "block";
}
