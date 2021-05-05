// ==UserScript==
// @name         Checkinator 5000000
// @version      3.9.0
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

container.innerHTML = '<div class=\"tab\">\r\n <div class=\"tablinks buttons\" onclick=\"switchTab(event, \'BrandsPage\')\">From Brands Page<\/div>\r\n <div class=\"tablinks buttons\" onclick=\"switchTab(event, \'DS\')\">From DS<\/div>\r\n<\/div>\r\n<div id=\"BrandsPage\" class=\"tabcontent\">\r\n <div class=\"internalC\">\r\n <div class=\"row\">\r\n <div class=\"col\"> <textarea type=\"text\" name=\"txtBrands\" id=\"inputBrands\"><\/textarea> <label readonly\r\n type=\"text\" name=\"missingBrands\" id=\"missingBrands\"><\/label> <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"group\">\r\n <div class=\"col\"> <label> Number of brands that will be custom sorted (first three, first four, etc.)\r\n Numbers only<\/label> <\/div>\r\n <div class=\"col\"> <textarea id=\"numberOfBrands\"><\/textarea> <\/div>\r\n <\/div>\r\n <div class=\"group\">\r\n <div class=\"col\"> <label>Don\'t know how many brands are custom sorted<\/label> <\/div>\r\n <div class=\"col\"> <input type=\"checkbox\" id=\"idkWhereToEnd\"> <\/div>\r\n <\/div>\r\n <div class=\"group\">\r\n <div class=\"col\"> <label>Does the site need AG tire data?<\/label> <\/div>\r\n <div class=\"col\"> <input type=\"checkbox\" id=\"agData\"> <\/div>\r\n <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col group\">\r\n <div class=\"buttons\" id=\"btnCompare\">Compare and sort the brands from the DS and Site<\/div>\r\n <div class=\"tablinksI\" onclick=\"switchTabInternal(event, \'first\')\">Show Description<\/div>\r\n <div id=\"first\" class=\"tabcontentI\">\r\n <p>This option compares the Brands on the DS (you need to put them on the text box) with the brands\r\n on the current site, generally \/tires, useful when the DS requests this option <strong><em>Yes -\r\n Sort order can be seen on the tire brand page. <\/em><\/strong> <\/p>\r\n <p>The script can sort every single brand on the site OR it can sort on a given range, for example,\r\n if the site has 50 brands enabled but only the first 3 are custom sorted and the other 47 are\r\n alphabetically sorted, place the brands from the DS on the text box and on the <strong>small\r\n text<\/strong> box add a number 3, OR if you do not know how many are custom sorted you can\r\n just leave <strong>blank the small text<\/strong> box and hit the check box \"<em>Don\'t know how\r\n many brands are custom sorted<\/em>\" and it will sort every single brand so it matches the\r\n site. <\/p>\r\n <\/div>\r\n <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col group\">\r\n <div class=\"buttons\" id=\"btn1\">Process brands from site<\/div>\r\n <div class=\"tablinksI\" onclick=\"switchTabInternal(event, \'second\')\">Show Description<\/div>\r\n <div id=\"second\" class=\"tabcontentI\">\r\n <p>This option DOES NOT use the brands from the DS, instead, it just processes the brands on the TCS\r\n or ND site, useful when the DS does not state the brands that are going to be used\r\n \"<em><strong>Use the brands from the Tires page on the original site<\/strong><\/em>\".<\/p>\r\n <p>To use it just hit \"Process brands from site\", if you want them sorted exactly as they are on the\r\n site, you can add a number on the small text box, for example, the first 4 brands are custom\r\n sorted out of the 50 brands that are enabled on the site. You add a number 4 and hit Process OR\r\n if you do not know how many are custom sorted you just enable the check box and every single\r\n brand on the site will be custom sorted.<\/p>\r\n <\/div>\r\n <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col group\">\r\n <div class=\"buttons\" id=\"btn3\">Check the processed brands on web1 or prime<\/div>\r\n <div class=\"tablinksI\" onclick=\"switchTabInternal(event, \'third\')\">Show Description<\/div>\r\n <div id=\"third\" class=\"tabcontentI\">\r\n <p>Once you have processed the brands, you can go to web1, prime link to enable the brands, just\r\n paste the generated <strong>STRING, JSON STRING, TEXT,<\/strong> or however you want to call it\r\n this is an example of what you need to paste in the big text box:<\/p>\r\n <ul>\r\n <li><strong><em>\r\n [{\"name\":\"Michelin\",\"value\":50},{\"name\":\"Continental\",\"value\":50},{\"name\":\"Pirelli\",\"value\":50},{\"name\":\"BFGoodrich\",\"value\":50},{\"name\":\"General\",\"value\":50},{\"name\":\"Cooper\",\"value\":50},{\"name\":\"Uniroyal\",\"value\":50},{\"name\":\"Yokohama\",\"value\":50}]<\/em><\/strong>\r\n <\/li>\r\n <\/ul>\r\n <\/div>\r\n <\/div>\r\n <\/div>\r\n <\/div>\r\n<\/div>\r\n<div id=\"DS\" class=\"tabcontent\"><\/div>';

document.body.prepend(container);
var dsContainer = document.getElementById("DS");
dsContainer.innerHTML = '<div class=\"fromDS\">\r\n <div class=\"row\">\r\n <div class=\"col\"> <label>Brands here:<\/label> <textarea id=\"inputFromDS\"><\/textarea> <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col\">\r\n <div id=\"button3\" class=\"buttons\"> Check Brands <\/div>\r\n <\/div>\r\n <div class=\"group\">\r\n <div class=\"col\"> <label>Does the site need AG tire data?<\/label> <\/div>\r\n <div class=\"col\"> <input type=\"checkbox\" id=\"agData2\"> <\/div>\r\n <\/div>\r\n\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col\"> <label>Services here:<\/label> <textarea id=\"servicesInputFromDS\"><\/textarea> <\/div>\r\n <\/div>\r\n <div class=\"row\">\r\n <div class=\"col\">\r\n <div id=\"button4\" class=\"buttons\"> Check Services <\/div>\r\n <\/div>\r\n <\/div>\r\n<\/div>';


var styles = `#process{margin:20px;padding:10px;position:fixed;top:0;right:0;z-index:9998 !important;-webkit-box-pack:end;-ms-flex-pack:end;justify-content:flex-end;background-color:#f5f5f5;border-style:solid;border-radius:12px;border-color:#008cba;overflow-y:scroll;max-height:900px;opacity:20%;width:200px}#process:hover{opacity:100%;width:500px}#process #inputFromDS{width:400px;height:200px}#process #servicesInputFromDS{width:400px;height:200px}#process .buttons{padding:15px 25px;font-size:24px;cursor:pointer;text-align:center;text-decoration:none;outline:0;color:#fff;background-color:#008cba;border:none;border-radius:15px}#process .buttons:hover{background-color:#023a4d}#process .buttons:active{background-color:#002836;-webkit-transform:translateY(1px);transform:translateY(1px)}.group{border-style:solid;border:2px solid #008CBA;border-radius:16px;margin:5px;width:200px;padding:10px}#process #inputBrands{width:300px;height:200px}#process label{text-align:center}.tablinksI:hover{color:blue;cursor:pointer}#process #numberOfBrands{width:50px;resize:none !important;text-align:center;height:40px;line-height:40px;padding:0 5px;overflow:hidden}#process textarea{resize:vertical}#process .fromDS .row,#process .internalC .row{margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}#process .fromDS .col,#process .internalC .col{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;padding:10px}#process .tablinks{width:100%}#process .tab{overflow:hidden;background-color:#008cba;border-radius:20px;text-align:center}#process .tab div{background-color:inherit;float:left;border:none;outline:0;cursor:pointer;padding:14px 16px;-webkit-transition:.3s;transition:.3s;font-size:17px}#process .tab div:hover{background-color:#023a4d}#process .tab div.active{background-color:#015b79}#process .tabcontent{display:none;padding:6px 12px;border-top:none}.tabcontentI{display:none;padding:6px 12px;border-top:none}`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


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


function switchTabInternal(evt, contentPanel) {
    var i, tabcontent, tablinks;
    tablinks = document.getElementsByClassName("tablinksI");
    tabcontent = document.getElementsByClassName("tabcontentI");
    if (evt.currentTarget.className.includes("activeI")) {
        document.getElementById(contentPanel).style.display = "none";
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeI", "");
        }
    }
    else {
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" activeI", "");
        }
        document.getElementById(contentPanel).style.display = "block";
        evt.currentTarget.className += " activeI";
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
appendPOWAH(switchTabInternal);

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
        brandsValue[i] = brands[i].innerText.replace(" Tire", "").replace(" Tires", "").replace("®", "").trim();
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


function processBrandsCOMPARE(numberOfBrands, inputBrandsTXT) {
    var brands = document.getElementsByClassName("manName");
    var list = cleanStringFromInput(inputBrandsTXT);

    var numberedBrandsArray = new Array();
    var found = false;
    var missing = [];
    var brandsSiteClean = [];
    var brandsDSClean = [];

    for (let i = 0; i < brands.length; i++) {
        brandsSiteClean[i] = brands[i].innerText.replace(" Tire", "").replace(" Tires", "").replace("®", "").trim();
    }

    for (let i = 0; i < list.length; i++) {
        brandsDSClean[i] = list[i].replace(" Tire", "").replace(" Tires", "").replace("®", "").trim();;
    }


    for (let i = 0; i < brandsDSClean.length; i++) {
        found = false;
        for (let j = 0; j < brandsSiteClean.length; j++) {
            if (brandsDSClean[i] == brandsSiteClean[j]) {
                var numberedBrands = new Object();
                numberedBrands.name = brandsDSClean[i];
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
                found = true;
            }
        }
        if (!found) {
            missing.push(list[i]);
            var MissingnumberedBrands = new Object();
            MissingnumberedBrands.name = list[i];
            MissingnumberedBrands.value = 50;
            numberedBrandsArray.push(MissingnumberedBrands);
        }

    }

    var jsonArray = JSON.parse(JSON.stringify(numberedBrandsArray));
    var myJSON = JSON.stringify(jsonArray);
    document.getElementById(inputBrandsTXT).value = myJSON;
    copyToClipboard(myJSON);

    document.getElementById("missingBrands").value += "\n\nMissing brands on the site: " + missing.toString();




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
    var brandsFromInput = cleanStringFromInput(inputTXT);
    var brandOnSite;

    var orange = [' Tire', ' Tires', ' Tires'];
    var green = ['®']

    if (document.getElementById("agData2").checked) {
        green.push(' Ag');
    }

    for (let i = 0; i < brandsFromInput.length; i++) {
        found = false;
        for (let j = 0; j < brands.length; j++) {
            brandOnSite = brands[j].getElementsByTagName(element)[index].innerText.trim();
            if (brands[j].getElementsByTagName(element).length > 0) {
                if (includesString(orange, brandsFromInput[i], brandOnSite)
                    || (similitude(brandsFromInput[i], brandOnSite) > 55)) {
                    brands[j].style.backgroundColor = "orange";
                }
                if (brandsFromInput[i] == brandOnSite ||
                    includesString(green, brandsFromInput[i], brandOnSite)) {
                    brands[j].getElementsByTagName('input')[0].checked = true;
                    brands[j].style.backgroundColor = "green";
                    found = true;
                }
            }
        }
        if (!found) {
            missing.push(brandsFromInput[i]);
        }
    }

    document.getElementById("inputFromDS").value = "Missing Brands: " + missing.toString();
}

function includesString(array, brandOnJson, brandOnSite) {
    var included;
    for (let i = 0; i < array.length; i++) {
        if ((brandOnJson + array[i]) == brandOnSite) {
            included = true;
        }
    }
    return included;
}


function dataFromJsonBrands(container, element, index) {
    var json = JSON.parse(document.getElementById("inputBrands").value);
    var brands = container;
    var missing = [];
    var found = false;
    var brandOnSite;


    var orange = [' Tire', ' Tires'];
    var green = ['®']

    if (document.getElementById("agData").checked) {
        green.push(' Ag');
    }


    for (let i = 0; i < json.length; i++) {
        found = false;
        for (let j = 0; j < brands.length; j++) {
            brandOnSite = brands[j].getElementsByTagName(element)[index].innerText.trim();
            if (brands[j].getElementsByTagName(element).length > 0) {
                if (includesString(orange, json[i].name, brandOnSite)) {
                    brands[j].style.backgroundColor = "orange";
                }

                if (json[i].name == brandOnSite || includesString(green, json[i].name, brandOnSite)) {
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
    processBrands(document.getElementById("numberOfBrands").value, "inputBrands");
});

var btnCompare = document.getElementById("btnCompare");
btnCompare.addEventListener("click", function () {

    processBrandsCOMPARE(document.getElementById("numberOfBrands").value, "inputBrands");
});

var button2 = document.getElementById("btn3");
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



if (checkURL()[2] || checkURL()[3]) {
    document.querySelector("#BrandsPage > div > div:nth-child(3)").style.display = "none";
    document.querySelector("#BrandsPage > div > div:nth-child(4)").style.display = "none";
    document.querySelector("#BrandsPage > div > div:nth-child(2) > div:nth-child(2)").style.display = "none";
    document.querySelector("#BrandsPage > div > div:nth-child(2) > div:nth-child(1)").style.display = "none";

}

var url = new URL(window.location.href);
if (url.pathname.includes("/tires")) {
    document.querySelector("#BrandsPage > div > div:nth-child(5)").style.display = "none";
    document.querySelector("#BrandsPage > div > div:nth-child(2) > div:nth-child(3)").style.display = "none";
}