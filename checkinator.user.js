// ==UserScript==
// @name         Checkinator 5000000
// @version      3.8.2
// @description  try to take over the world!
// @author       Julio Cordova
// @include      *://*.netdrivenwebs.com/*
// @include      *://*/tires
// @downloadURL  https://github.com/jhcordova/scripts/raw/main/checkinator.user.js
// @updateURL    https://github.com/jhcordova/scripts/raw/main/checkinator.user.js
// @grant        none
// @run-at       document-end
// ==/UserScript==


function checkURL() {
    var url = new URL(window.location.href);
    var check = [false, false, false, false, false];

    if (url.pathname.includes("Clients/mode/SetupForm/sfid") && url.hostname.includes("prime")) {
        check[0] = true; //isPrime
        check[1] = true; //isServicesPrime

    } else if (url.pathname.includes("Tires/ctl/TireAdministration/mid") && url.hostname.includes("web1")) {
        check[2] = true; // isWeb1 = true;

    } else if (url.pathname == "/Tires" && url.hostname.includes("web1")) {
        check[3] = true; //isCommercial = true;

    } else if (url.pathname.includes("Services/program") && url.hostname.includes("web1")) {
        check[4] = true; // isServicesWeb1 = true;
    }
    return check;
}



var container = document.createElement("div");
container.setAttribute("id", "process");

container.innerHTML = '<div class=\"tab\"> <div class=\"tablinks buttons\" onclick=\"switchTab(event, \'BrandsPage\')\">From Brands Page<\/div> <div class=\"tablinks buttons\" onclick=\"switchTab(event, \'DS\')\">From DS<\/div><\/div><div id=\"BrandsPage\" class=\"tabcontent\"> <div class=\"internalC\"> <div class=\"row\"> <div class=\"col\"> <textarea type=\"text\" name=\"txtBrands\" id=\"inputBrands\"><\/textarea> <\/div> <\/div> <div class=\"row\"> <div class=\"col\"> <label > Number of brands that will be custom sorted (first three, first four, etc.)<\/label> <\/div> <div class=\"col\"> <textarea id=\"numberOfBrands\"><\/textarea> <\/div> <div class=\"col\"> <input type=\"checkbox\" id=\"idkWhereToEnd\"> <\/div> <div class=\"col\"> <label>Don\'t know how many brands are custom sorted<\/label> <\/div> <\/div> <div class=\"row\"> <div class=\"col\"> <div class=\"buttons\" id=\"btn1\">Process<\/div> <\/div> <div class=\"col\"> <div class=\"buttons\" id=\"btn2\">Check<\/div> <\/div> <\/div> <\/div><\/div><div id=\"DS\" class=\"tabcontent\"><\/div>';

document.body.prepend(container);
var dsContainer = document.getElementById("DS");
dsContainer.innerHTML = '<div class=\"fromDS\"> <div class=\"row\"> <div class=\"col\"> <label>Brands here:<\/label> <textarea id=\"inputFromDS\"><\/textarea> <\/div> <\/div> <div class=\"row\"> <div class=\"col\"> <div id=\"button3\" class=\"buttons\"> Check Brands <\/div> <\/div> <\/div> <div class=\"row\"> <div class=\"col\"> <label>Services here:<\/label> <textarea id=\"servicesInputFromDS\"><\/textarea> <\/div> <\/div> <div class=\"row\"> <div class=\"col\"> <div id=\"button4\" class=\"buttons\"> Check Services <\/div> <\/div> <\/div><\/div>';


var styles = `
#process{margin:20px;padding:10px;position:fixed;top:0;right:0;z-index:9998!important;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;background-color:#f5f5f5;border-style:solid;border-radius:12px;border-color:#008cba}#process #inputFromDS{width:400px;height:200px}#process #servicesInputFromDS{width:400px;height:200px}#process .buttons{padding:15px 25px;font-size:24px;cursor:pointer;text-align:center;text-decoration:none;outline:0;color:#fff;background-color:#008cba;border:none;border-radius:15px}#process .buttons:hover{background-color:#023a4d}#process .buttons:active{background-color:#002836;-webkit-transform:translateY(1px);transform:translateY(1px)}#process #inputBrands{width:400px;height:500px}#process label{text-align:center}#process #numberOfBrands{width:50px;resize:none!important;text-align:center;height:40px;line-height:40px;padding:0 5px;overflow:hidden}#process textarea{resize:vertical}#process .fromDS .row,#process .internalC .row{margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}#process .fromDS .col,#process .internalC .col{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;padding:10px}#process .tablinks{width:100%}#process .tab{overflow:hidden;background-color:#008cba;border-radius:20px;text-align:center}#process .tab div{background-color:inherit;float:left;border:none;outline:0;cursor:pointer;padding:14px 16px;-webkit-transition:.3s;transition:.3s;font-size:17px}#process .tab div:hover{background-color:#023a4d}#process .tab div.active{background-color:#015b79}#process .tabcontent{display:none;padding:6px 12px;border-top:none}`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
/*
var mousePosition;
var offset = [0, 0];
var isDown = false;
container.style.position = "absolute";
container.addEventListener('mousedown', function (e) {
    isDown = true;
    offset = [
        container.offsetLeft - e.clientX,
        container.offsetTop - e.clientY
    ];
}, true);

document.addEventListener('mouseup', function () {
    isDown = false;
}, true);

document.addEventListener('mousemove', function (event) {
    event.preventDefault();
    if (isDown) {
        mousePosition = {

            x: event.clientX,
            y: event.clientY

        };
        container.style.left = (mousePosition.x + offset[0]) + 'px';
        container.style.top = (mousePosition.y + offset[1]) + 'px';
    }
}, true);*/



function switchTab(evt, contentPanel) {
    var i, tabcontent, tablinks;
    tablinks = document.getElementsByClassName("tablinks");
    tabcontent = document.getElementsByClassName("tabcontent");
    if (evt.currentTarget.className.includes("active")) {
        document.getElementById(contentPanel).style.display = "none";
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    }
    else {
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(contentPanel).style.display = "block";
        evt.currentTarget.className += " active";
    }
}

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

appendPOWAH(switchTab);

function appendPOWAH(text, s_URL, funcToRun, runOnLoad) {
    var D = document;
    var scriptNode = D.createElement('script');
    if (runOnLoad) {
        scriptNode.addEventListener("load", runOnLoad, false);
    }
    scriptNode.type = "text/javascript";
    if (text) {
        scriptNode.textContent = text;
    }
    if (s_URL) {
        scriptNode.src = s_URL;
    }
    if (funcToRun) {
        scriptNode.textContent = '(' + funcToRun.toString() + ')()';
    }
    var targ = D.getElementsByTagName('head')[0] || D.body || D.documentElement;
    targ.appendChild(scriptNode);
}

function processBrands(numberOfBrands) {
    var brands = document.getElementsByClassName("manName");
    var brandsValue = [];
    var numberedBrandsArray = new Array();
    for (let i = 0; i < brands.length; i++) {
        brandsValue[i] = brands[i].innerText.replace(' Tire', '');
    }
    for (let j = 0; j < brandsValue.length; j++) {
        var numberedBrands = new Object();
        numberedBrands.name = brandsValue[j];
        if (!document.getElementById("idkWhereToEnd").checked) {
            if (j < numberOfBrands) {
                numberedBrands.value = j + 1;
            }
            else {
                numberedBrands.value = 50;
            }
        } else {
            numberedBrands.value = j + 1;
        }
        numberedBrandsArray.push(numberedBrands);
    }
    var jsonArray = JSON.parse(JSON.stringify(numberedBrandsArray));
    var myJSON = JSON.stringify(jsonArray);
    document.getElementById("inputBrands").value = myJSON;
    copyToClipboard(myJSON);
}

function cleanStringFromInput(inputTXT) {
    var customList = [];
    var clean;
    var array_raw = null;
    var text = document.getElementById(inputTXT).value;
    array_raw = text
        .replace(/,/g, ".")
        .replace(/\n/g, ".")
        .replace(/[^\w\.]/g, " ")
        .split(".");
    array_raw = array_raw.filter(Boolean);
    var brands = [];
    for (let i = 0; i < array_raw.length; i++) {
        if (!array_raw[i].includes("Brands")) {
            brands[i] = array_raw[i].trim();
        }

    }
    brands = brands.filter(Boolean);
    array_raw = brands;
    for (let i = 0; i < array_raw.length; i++) {
        if (array_raw[i].charAt(0) == "o") {
            clean = array_raw[i].trim().substr(1);
        } else {
            clean = array_raw[i].trim();
        }
        customList[i] = clean.trim();
    }
    array_raw = customList;
    return array_raw;
}


function cleanStringFromInputServices(inputTXT) {
    var customList = [];
    var clean;
    var cleanInputServices = null;
    var servicesTableList = [];
    var text = document.getElementById(inputTXT).value;
    cleanInputServices = text
        .replace(/,/g, "")
        .replace(/\n/g, ".")
        .replace(/& /g, "")
        .replace(/  /g, " ")
        .split(".");
    cleanInputServices = cleanInputServices.filter(Boolean);

    for (let i = 0; i < cleanInputServices.length; i++) {
        if (cleanInputServices[i].charAt(0) == "o") {
            clean = cleanInputServices[i].trim().substr(1);
        } else {
            clean = cleanInputServices[i].trim();
        }
        customList[i] = clean.trim();
    }
    cleanInputServices = customList;
    return cleanInputServices;
}
/*

function getServicesFromTable() {
    var servicesTableList = [];
    var servicesTable = document.getElementById("dnn_ctr450_View_ma_categoryPanel").getElementsByTagName("tr")[i].getElementsByTagName("span")[0].innerText;
    for (let i = 0; i < servicesTable.length; i++) {
        servicesTableList[i] = servicesTable[i].getElementsByTagName("span")[0].innerText;
    }
    for (let i = 0; i < servicesTableList.length; i++) {
        var temp = servicesTableList[i];
        servicesTableList[i] = temp.replace(/,/g, "").replace(/& /g, "").replace(/  /g, " ");
    }
    return servicesTableList;
}*/
//container dnn_ctr450_View_ma_categoryPanel
//tag tr
//tagText span

function dataFromDSCheckServices(inputTXT, container, tag, tagText, start) {
    var services = cleanStringFromInputServices(inputTXT);
    var missing = [];
    var found = false;
    var rowServices = document.getElementById(container).getElementsByTagName(tag);

    for (let i = 0; i < services.length; i++) {
        found = false;
        for (let j = start; j < rowServices.length; j++) {
            var valid = rowServices[j].getElementsByTagName(tagText)[0];
            if (typeof valid != 'undefined') {
                if (services[i] == valid.innerText.replace(/,/g, "").replace(/& /g, "").replace(/  /g, " ")) {
                    if (checkURL()[1]) {
                        document.getElementById(container).getElementsByTagName(tag)[j].getElementsByTagName("input")[0].checked = true;
                    }
                    else {
                        /* document.getElementById(container).getElementsByTagName(tag)[j].getElementsByTagName(tagText)[0].getElementsByTagName("input")[2].checked = true;*/

                        document.getElementById(container).getElementsByTagName(tag)[j].getElementsByTagName("input")[2].checked = true;

                    }
                    rowServices[j].style.backgroundColor = "#008000";
                    found = true;
                }
            }


        }
        if (!found) {
            missing.push(services[i]);

        }
    }

    for (let i = 0; i < missing.length; i++) {
        for (let j = 0; j < rowServices.length; j++) {
            var valid = rowServices[j].getElementsByTagName(tagText)[0];
            if (typeof valid != 'undefined') {
                if (similitude(missing[i], rowServices[j].getElementsByTagName(tagText)[0].innerText.replace(/,/g, "").replace(/& /g, "").replace(/  /g, " ")) > 55) {
                    rowServices[j].style.backgroundColor = "#FFA500";
                }
            }
        }
    }

    document.getElementById("servicesInputFromDS").value = "Missing Services: " + missing.toString();
}


function similitude(a, b) {
    var x = 0;
    var acc = 0;
    var counter = 0;
    if (a != null) {
        if (b.length > a.length) {
            var pivot = a;
            a = b;
            b = pivot;
        }

        for (var i = 0; i < b.length; i++) {
            if (a.charAt(x) != b.charAt(i)) {
                x++;
                counter = 0;
                while ((a.charAt(x) != b.charAt(i)) & (counter <= b.length)) {
                    x++;
                    counter++;
                }

                if (a.charAt(x) == b.charAt(i)) {
                    x++;
                    acc++;
                }
            } else {
                x++;
                acc++;
            }
        }
        i--;
        return Math.round((acc / a.length) * 100);
    }
}




function dataFromDSCheckBrands(container, element, index, inputTXT) {
    var brands = container;
    var missing = [];
    var found = false;
    var list = cleanStringFromInput(inputTXT);
    for (let i = 0; i < list.length; i++) {
        found = false;
        for (let j = 0; j < brands.length; j++) {
            if (brands[j].getElementsByTagName(element).length > 0) {
                if (list[i] + ' Tire' == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || list[i] + ' Ag' == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || list[i] + ' Tires' == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || (similitude(list[i], brands[j].getElementsByTagName(element)[index].innerText.trim()) > 55)) {
                    brands[j].style.backgroundColor = "orange";
                }
                if (list[i] == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || list[i] + '®' == brands[j].getElementsByTagName(element)[index].innerText.trim()) {
                    brands[j].getElementsByTagName('input')[0].checked = true;
                    brands[j].style.backgroundColor = "green";
                    found = true;
                }
            }
        }
        if (!found) {
            missing.push(list[i]);
        }
    }

    document.getElementById("inputFromDS").value = "Missing Brands: " + missing.toString();
}

function dataFromJsonBrands(container, element, index) {
    var json = JSON.parse(document.getElementById("inputBrands").value);
    var brands = container;
    var missing = [];
    var found = false;
    for (let i = 0; i < json.length; i++) {
        found = false;
        for (let j = 0; j < brands.length; j++) {
            if (brands[j].getElementsByTagName(element).length > 0) {
                if (json[i].name + ' Tire' == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || json[i].name + ' Ag' == brands[j].getElementsByTagName(element)[index].innerText.trim()
                    || json[i].name + ' Tires' == brands[j].getElementsByTagName(element)[index].innerText.trim()) {
                    brands[j].style.backgroundColor = "orange";
                }
                if (json[i].name == brands[j].getElementsByTagName(element)[index].innerText.trim()) {
                    brands[j].getElementsByTagName('input')[0].checked = true;
                    brands[j].style.backgroundColor = "green";
                    if (!checkURL()[0]) {
                        brands[j].getElementsByTagName('input')[1].value = json[i].value;
                    }
                    found = true;
                }
            }
        }
        if (!found) {
            missing.push(json[i].name);
        }
    }
    document.getElementById("inputBrands").value = "Missing Brands: " + missing.toString();
}

var button = document.getElementById("btn1");
button.addEventListener("click", function () {
    processBrands(document.getElementById("numberOfBrands").value);
});

var button2 = document.getElementById("btn2");
button2.addEventListener("click", function () {
    if (checkURL()[2]) {
        dataFromJsonBrands(document.getElementById("dnn_ctr449_ContentPane").getElementsByClassName("BrandItem"), "span", 0);
    }
    if (checkURL()[0]) {
        dataFromJsonBrands(document.getElementById("dnn_ctr447_View_SetupForm_cblBrands").getElementsByTagName("td"), "label", 0);
    }
    if (checkURL()[3]) {
        dataFromJsonBrands(document.getElementById("dnn_ctr449_ModuleContent").getElementsByTagName("tr"), "td", 2);
    }
});

var button3 = document.getElementById("button3");
button3.addEventListener("click", function () {
    if (checkURL()[0]) {
        dataFromDSCheckBrands(document.getElementById("dnn_ctr447_View_SetupForm_cblBrands").getElementsByTagName("td"), "label", 0, "inputFromDS");
    }
    else if (checkURL()[2]) {
        dataFromDSCheckBrands(document.getElementById("dnn_ctr449_ContentPane").getElementsByClassName("BrandItem"), "span", 0, "inputFromDS");
    }
    else if (checkURL()[3]) {
        dataFromDSCheckBrands(document.getElementById("dnn_ctr449_ModuleContent").getElementsByTagName("tr"), "td", 2, "inputFromDS");
    }
});

var button4 = document.getElementById("button4");
button4.addEventListener("click", function () {
    if (checkURL()[4]) {
        dataFromDSCheckServices("servicesInputFromDS", "dnn_ctr450_View_ma_categoryPanel", "tr", "span", 1);
    }
    else if (checkURL()[1]) {
        dataFromDSCheckServices("servicesInputFromDS", "dnn_ctr447_View_SetupForm_cblServiceTypes", "td", "label", 0);
    }


});
