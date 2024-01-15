"use strict";
/**
 * @type {HTMLFormElement}
 */
const form = document.getElementById("uv-form");
/**
 * @type {HTMLInputElement}
 */
const address = document.getElementById("address");
/**
 * @type {HTMLInputElement}
 */
const searchEngine = document.getElementById("engine");
/**
 * @type {HTMLParagraphElement}
 */
const error = document.getElementById("uv-error");
/**
 * @type {HTMLPreElement}
 */
const errorCode = document.getElementById("uv-error-code");

var logID = document.getElementById("logs")

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    document.getElementById('frame').contentWindow.document.write("<h1 style=\"background-color: white;\">Failed to register Service worker | " + err.toString() + " | <button onclick='location.reload()'>Return</button></h1>");
    throw err;
  }

  const url = search(address.value, searchEngine.value);
  document.getElementById("frame").src = __uv$config.prefix + __uv$config.encodeUrl(url);
});

var bookMarkJson = [];

function isLocalFile() {
  return window.location.protocol === "file:";
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

function setCookie(name, value, days) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);
  const cookieString = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  document.cookie = cookieString;
}

function deleteCookie(name) {
  setCookie(name, '', -1);
}

document.addEventListener("DOMContentLoaded", function () {
  var jsonData = isLocalFile() ? localStorage.getItem("Markjson") : getCookie("Markjson");
  console.warn(jsonData);
  if (jsonData != null) {
    console.log("Loading from data");
    bookMarkJson = JSON.parse(jsonData);

    for (var i = 0; i < bookMarkJson.length; i++) {
      var convertedJson = bookMarkJson[i];
      console.log(convertedJson);

      var bookmarkContainer = document.createElement("div");
      document.getElementById("mark-contanier").appendChild(bookmarkContainer);

      var faviconImg = document.createElement("img");
      faviconImg.classList.add("mark-img")
      faviconImg.src = `https://s2.googleusercontent.com/s2/favicons?domain_url=${convertedJson.link}`;
      faviconImg.alt = "Favicon";

      var bookButton = document.createElement("a");
      bookButton.innerHTML = convertedJson.name;
      
      bookButton.classList.add("bookButton");
      bookButton.id = convertedJson.link;
      bookButton.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
          await registerSW();
        } catch (err) {
          document.getElementById('frame').contentWindow.document.write("<h1 style=\"background-color: white;\">Failed to register Service worker | " + err.toString() + " | <button onclick='location.reload()'>Return</button></h1>");
          throw err;
        }

        const url = search(bookButton.id, searchEngine.value);
        document.getElementById("frame").src = __uv$config.prefix + __uv$config.encodeUrl(url);
      });
      bookButton.appendChild(faviconImg);
      bookmarkContainer.appendChild(bookButton);
    }
  }
});

document.getElementById("add-mark").addEventListener("click", function () {
  var B_Num = prompt("Bookmark name");
  var B_Link = prompt("Bookmark link");

  var convertedJson = {
    "name": B_Num,
    "link": B_Link
  };

  var bookmarkContainer = document.createElement("div");
  bookmarkContainer.classList.add("bookmark-container");
  document.getElementById("mark-contanier").appendChild(bookmarkContainer);

  var bookButton = document.createElement("a");
  bookButton.innerHTML = convertedJson.name;
  bookButton.classList.add("bookButton");
  bookButton.id = B_Link;
  bookButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await registerSW();
    } catch (err) {
      document.getElementById('frame').contentWindow.document.write("<h1 style=\"background-color: white;\">Failed to register Service worker | " + err.toString() + " | <button onclick='location.reload()'>Return</button></h1>");
      throw err;
    }

    const url = search(bookButton.id, searchEngine.value);
    document.getElementById("frame").src = __uv$config.prefix + __uv$config.encodeUrl(url);
  });
  bookmarkContainer.appendChild(bookButton);
  bookMarkJson.push(convertedJson);

  if (isLocalFile()) {
    localStorage.setItem("Markjson", JSON.stringify(bookMarkJson));
  } else {
    setCookie("Markjson", JSON.stringify(bookMarkJson), 365);
  }
  console.log(bookMarkJson);
});

document.getElementById("reset-mark").addEventListener("click", function () {
  var markContainer = document.getElementById("mark-contanier");
  var confirmDelete = prompt("This will REMOVE ALL of your bookmarks. Are you sure you want to do this? Type \"sudo delete\" to confirm.");

  if (confirmDelete === "sudo delete") {
    while (markContainer.firstChild) {
      markContainer.removeChild(markContainer.firstChild);
    }

    if (isLocalFile()) {
      localStorage.removeItem("Markjson");
    } else {
      deleteCookie("Markjson");
    }
  }
});

document.getElementById("game").addEventListener("click", async function (event) {
  event.preventDefault();

  try {
    await registerSW();
  } catch (err) {
    document.getElementById('frame').contentWindow.document.write("<h1 style=\"background-color: white;\">Failed to register Service worker | " + err.toString() + " | <button onclick='location.reload()'>Return</button></h1>");
    throw err;
  }

  const url = search(location.href+"/games/", searchEngine.value);
  document.getElementById("frame").src = __uv$config.prefix + __uv$config.encodeUrl(url);
});
