// ==UserScript==
// @name         L5 lazy migration 500000
// @version      1.4
// @description  try to take over the world!
// @author       Julio Cordova
// @include      *
// @downloadURL  https://github.com/jhcordova/scripts/raw/main/l5m.user.js
// @updateURL    https://github.com/jhcordova/scripts/raw/main/l5m.user.js
// @grant        none
// @run-at       document-end
// @exclude      *://*ari-cms.*/*
// @exclude      *://*endeavorsuite.*/*
// @exclude      *://*.powerbi.*/*
// @noframes
// ==/UserScript==


var container = document.createElement("div");
container.setAttribute("id", "process");
container.innerHTML = '<div class="fixedbutton" id="btn1" style="margin-right: 200px;">Copy Specs</div><div id="btn2" class="fixedbutton">Copy Overview</div>';

document.body.prepend(container);
var styles = `.fixedbutton{position:fixed;top:0;right:0;z-index:9999;margin-right:50px;padding:10px;background-color:orange;color:#fff;cursor:pointer}.fixedbutton:hover{background-color:#000}`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


var button = document.getElementById("btn1");
button.addEventListener("click", lazy);

var button2 = document.getElementById("btn2");
button2.addEventListener("click", lazy2);


function lazy() {
    var list = document.getElementsByClassName("cd-specs-list")[0].getElementsByTagName("li");
    var label;
    var value;
    var stringBuilder = "";
    for (let i = 0; i < list.length; i++) {
        label = list[i].getElementsByClassName("cd-spec-label")[0].innerText;
        value = list[i].getElementsByClassName("cd-spec-value")[0].innerText;
        stringBuilder += label + ": " + value + '\n';
    }
    copyToClipboard(stringBuilder);
}

function lazy2() {
    var text = document.getElementById("cd-list-detail-2").innerText;
    copyToClipboard(text);
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}