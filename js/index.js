// ~ HTML Elements
var nameInput = document.getElementById("name");

var urlInput = document.getElementById("url");

var urlContainer = document.getElementById("urlContainer");

var myModal = document.getElementById("Modal");

// ! App Variables
var nameRegex = /^[A-Za-z]{3,}$/;
var urlRegex = /^(https:\/\/)?www\.[a-z]{4,}\.com$/;

// * Functions

var urlList = JSON.parse(localStorage.getItem("urls")) || [];

function addUrl() {
  if (validate(nameRegex, nameInput) && validate(urlRegex, urlInput)) {
    var url = {
      name: nameInput.value,
      url: urlInput.value,
    };
    urlList.push(url);
    localStorage.setItem("urls", JSON.stringify(urlList));
    displayUrl(urlList.length - 1);
    clearInput();
    myModal.classList.add("d-none");
  } else {
    myModal.classList.remove("d-none");
  }
}

function displayUrl(index) {
  var urlHtml = `<tr class="text-center">
   <th scope="row">${index + 1}</th>
   <td>${urlList[index].name}</td>
   <td>
   <a href="${urlList[index].url}" target="_blank">
     <button type="button" class="btn btn-success">
       <i class="fa-solid fa-eye"> </i>  Visit
     </button>
     </a>
   </td>
   <td>
     <button type="button" class="btn btn-danger" onclick="deleteUrl(${index})">
       <i class="fa-solid fa-trash-can"> </i> Delete
     </button>
   </td>
 </tr>`;
  urlContainer.innerHTML = urlContainer.innerHTML + urlHtml;
}

function displayAllUrl() {
  for (var i = 0; i < urlList.length; i++) {
    displayUrl(i);
  }
}

function clearInput() {
  nameInput.value = "";
  urlInput.value = "";
}

function deleteUrl(index) {
  urlList.splice(index, 1);
  localStorage.setItem("urls", JSON.stringify(urlList));
  urlContainer.innerHTML = "";
  displayAllUrl();
}

function validate(regex, element) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
  return false;
}
