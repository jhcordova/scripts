
// ==UserScript==
// @name         alt
// @version      1.1
// @downloadURL  https://github.com/jhcordova/scripts/raw/main/alt.user.js
// @updateURL    https://github.com/jhcordova/scripts/raw/main/alt.user.js
// @description  Shows the alt text of all the images on the page
// @author       Julio Cordova
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==



var images = document.getElementsByTagName("img");

var styles = `
  .border-white{
    -webkit-text-stroke: 0.2px white;
    color:black;
  }
  ::-moz-selection { background: red; color: #fff; text-shadow: none; }
  ::selection { background: red; color: #fff; text-shadow: none; }
`;
var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

for (let i = 0; i < images.length; i++) {
    var alt = document.createElement("h3");
    alt.setAttribute("id", i.toString());
    alt.setAttribute("class", images[i].className);
    alt.setAttribute("class", "border-white");
    images[i].parentElement.appendChild(alt);
}

var altArray = document.getElementsByTagName("h3");
for (let i = 0; i < altArray.length; i++) {
    var currentAlt = document.getElementById(i);

    if (images[i].alt == "") {
        currentAlt.innerHTML = "NO ALT";
    }
    else {
        currentAlt.innerHTML = "ALT: " + images[i].alt;

    }
}
