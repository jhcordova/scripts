// ==UserScript==
// @name           Get Logos
// @version        2.5.1
// @grant          none
// @run-at         document-end
// @match          *
// @description    Creates a section with all the logos on logo bars, making it easy to read them, works with TCS and Net Driven
// @author         Julio Cordova
// @updateURL      
// @downloadURL    
// ==/UserScript==


function createList() {
    var logoList = document.createElement("div");
    logoList.setAttribute("id", "logoList");
    var style = '#logoList{top:0;right:0;width:300px;background-color:#f5f5f5;color:#000;position:fixed;margin:20px;z-index:999999;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;max-height:800px;-ms-flex-wrap:wrap;flex-wrap:wrap;overflow:scroll}';

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = style;
    document.head.appendChild(styleSheet);
    document.body.prepend(logoList);

}

function removeDupObj(list, logoContainer, site) {
    var noDupeObj = {}
    for (i = 0, n = list.length; i < n; i++) {
        var item = list[i];
        if (site) {
            noDupeObj[item.src] = item;
        } else {
            noDupeObj[item.firstElementChild.src] = item;
        }
    }

    var i = 0;
    var nonDuplicatedArray = [];
    for (var item in noDupeObj) {
        nonDuplicatedArray[i++] = noDupeObj[item];
    }

    for (let i = 0; i < nonDuplicatedArray.length; i++) {
        var div = document.createElement("div");
        if (site) {
            div.innerText = nonDuplicatedArray[i].alt;
        }
        else { //ND
            div.innerText = nonDuplicatedArray[i].firstElementChild.alt;
        }
        if ((i % 9) == 0 && i != 0) {
            incwidth();
        }
        logoContainer.appendChild(nonDuplicatedArray[i]);
        logoContainer.appendChild(div);
    }
}

function incwidth() {
    var el = document.getElementById("logoList");
    var width = el.offsetWidth;
    var newwidth = width + 200;
    el.style.width = newwidth + 'px';
}

function onClickBG(list, i) {
    list[i].onclick = function () { "blue" != list[i].style.backgroundColor ? list[i].style.backgroundColor = "blue" : list[i].style.backgroundColor = ""; };
}

var tcslogos = document.getElementsByClassName('simply-scroll');
var ndlogos = document.getElementsByClassName('logobar-slider');
var logos;
var images = [];
var isTCS = typeof (tcslogos) != 'undefined' && tcslogos != null && tcslogos.length > 0;
var isND = typeof (ndlogos) != 'undefined' && ndlogos != null && ndlogos.length > 0;

if (isTCS) {
    createList();
    logos = document.getElementsByClassName("simply-scroll")[0].getElementsByTagName("li");
    for (let i = 0; i < logos.length; i++) {
        images[i] = logos[i].getElementsByTagName("img")[0].cloneNode(true);
        onClickBG(images, i);
    }
    removeDupObj(images, document.getElementById("logoList"), true);

} else if (isND) {
    createList();
    logos = document.getElementsByClassName("logobar-slider")[0].getElementsByTagName("a");
    for (let i = 0; i < logos.length; i++) {
        images[i] = logos[i].cloneNode(true);
        onClickBG(images, i);
    }
    removeDupObj(images, document.getElementById("logoList"), false);
    var links = document.getElementById("logoList").getElementsByTagName("a");
    for (let i = 0; i < links.length; i++) {
        links[i].setAttribute("target", "_blank");
        links[i].setAttribute("rel", "noopener");
    }
}


