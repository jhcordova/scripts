// ==UserScript==
// @name         PrimeTester
// @version      2.6.3
// @author       Julio Cordova
// @updateURL    
// @downloadURL  
// @description  Check for brands, services and tokens on the Prime link
// @grant        none
// @run-at       document-end
// @match        *://prime.netdrivenwebs.com/Clients/mode/SetupForm/*
// ==/UserScript==

function structures(
    divListContainer,
    list,
    listItemID,
    boxContainer,
    colID1,
    colID2,
    colID3,
    inputDivP,
    txtInput,
    customListP,
    title,
    tittleList
) {
    ///////////////
    var servicesListPage; //dnn_ctr447_View_SetupForm_pnlBrand
    if (document.getElementById(divListContainer) == null) {
        servicesListPage = document.getElementById("h2Tokens");
        servicesListPage.previousSibling.parentNode.setAttribute(
            "id",
            boxContainer
        );
    } else {
        servicesListPage = document.getElementById(divListContainer).firstChild;
    }

    var container = document.getElementById(divListContainer);



    container.previousSibling.previousSibling.setAttribute("id", tittleList);
    var el = document.querySelector("#" + tittleList);
    el.parentNode.insertBefore(container, el);
    container.prepend(el);

    servicesListPage = servicesListPage.nextSibling;
    servicesListPage.setAttribute("id", list);

    ////////////////
    var lis = document.getElementById(list).getElementsByTagName("li");
    for (let i = 0; i < lis.length; i++) {
        lis[i].setAttribute("id", listItemID + i.toString());
    }

    var selectedServicesList = document.querySelector("ul#" + list);
    var rowDiv = document.createElement("div");
    selectedServicesList.parentNode.insertBefore(rowDiv, selectedServicesList);
    rowDiv.appendChild(selectedServicesList);
    rowDiv.setAttribute("class", "row");
    rowDiv.setAttribute("id", boxContainer);
    ////////////////
    var servicesListToDiv = document.querySelector("ul#" + list);
    var div = document.createElement("div");
    servicesListToDiv.parentNode.insertBefore(div, servicesListToDiv);
    div.appendChild(servicesListToDiv);
    div.setAttribute("class", "col");
    div.setAttribute("id", colID1);
    ////////////////
    var colDivCustomList = document.createElement("div");
    colDivCustomList.setAttribute("class", "col");
    colDivCustomList.setAttribute("id", colID2);
    document.getElementById(boxContainer).appendChild(colDivCustomList);
    ////////////////
    var colDivCustomList2 = document.createElement("div");
    colDivCustomList2.setAttribute("class", "col");
    colDivCustomList2.setAttribute("id", colID3);
    document.getElementById(boxContainer).appendChild(colDivCustomList2);
    ///////////////
    var ServicesOnDS = document.createElement("h2");
    document.getElementById(colID2).appendChild(ServicesOnDS);
    ServicesOnDS.innerHTML = title;
    ///////////////
    var selectfistList = document.querySelector("#" + colID1);
    selectfistList.prepend(document.getElementById(tittleList));
    //////////////
    var customList = document.createElement("ul");
    customList.setAttribute("id", customListP);
    document.getElementById(colID2).appendChild(customList);
    ////////
    var inputDiv = document.createElement("div");
    inputDiv.setAttribute("class", "row");
    inputDiv.setAttribute("class", "inputTxt");
    inputDiv.setAttribute("id", inputDivP);
    document.getElementById(colID3).appendChild(inputDiv);

    var textBoxServicesInput = document.createElement("textarea");
    textBoxServicesInput.setAttribute("id", txtInput);
    textBoxServicesInput.setAttribute("class", "txtInputArea");
    document.getElementById(inputDiv.id).appendChild(textBoxServicesInput);
}


function createButton(container) {
    var buttonSubmit = document.createElement("div");
    buttonSubmit.setAttribute("class", "btn");
    buttonSubmit.innerHTML = "Submit";
    document.getElementById(container).appendChild(buttonSubmit);
    return buttonSubmit;
}

function styles() {
    var styles = `
          .btn {
              display: inline-block;
              font-size: 24px;
              cursor: pointer;
              text-align: center;
              text-decoration: none;
              outline: none;
              color: #fff;
              background-color: #008CBA;
              border: none;
              border-radius: 15px;
              width:100%;
            }

            .btn:hover {background-color: #023a4d}

            .jajaybutton:active {
              background-color: #002836;
              transform: translateY(1px);
            }
          .row {
              display: flex;
          }

          .col {
              flex: 50%;
          }

          .txtInputArea {
              height: 400px;
              width: 100%;
              flex-direction: column;
          }
          #list2, #customList2, #customList1, #list1 {
            height: 800px;
            overflow: scroll;
          }
          `;
    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}







(function () {
    var array_raw, newList1, newList2, newServices2;

    function createList() {
        getTokens();
        var element = document.getElementById('dnn_ctr447_View_SetupForm_pnlService');
        if (typeof (element) != 'undefined' && element != null) {
            structures(
                "dnn_ctr447_View_SetupForm_pnlService",
                "list1",
                "SiteServices",
                "rowBox1",
                "colSer1",
                "colSer2",
                "colSer3",
                "inputDiv1",
                "textBoxServicesInput1",
                "customList1",
                "Services on DS",
                "title1"
            );
        }
        var element = document.getElementById('dnn_ctr447_View_SetupForm_pnlBrand');
        if (typeof (element) != 'undefined' && element != null) {

            structures(
                "dnn_ctr447_View_SetupForm_pnlBrand",
                "list2",
                "SiteBrands",
                "rowBox2",
                "colBran1",
                "colBran2",
                "colBran3",
                "inputDiv2",
                "textBoxServicesInput2",
                "customList2",
                "Brands on DS",
                "title2"
            );
        }

        var element = document.getElementById('inputDiv1');
        if (typeof (element) != 'undefined' && element != null) {
            createButton("inputDiv1").addEventListener("click", function () {
                processStrings();
                hoverStrings("list1", "customList1", "S", 'S');
            });
        }
        var element = document.getElementById('inputDiv2');
        if (typeof (element) != 'undefined' && element != null) {

            createButton("inputDiv2").addEventListener("click", function () {
                brands();
                hoverStrings("list2", "customList2", "B", 'B');
            });
        }
        var element = document.getElementById('colTokens3');
        if (typeof (element) != 'undefined' && element != null) {
            createButton("colTokens3").addEventListener("click", function () {
                processTokens();

            });
        }

        styles();
    }

    createList();

    function clean(string, id) {

        if (id == 'B') {
            return string.innerHTML.replace(/\n/g, ".")
                .replace(/[^\w\.]/g, " ")
                .replace(" Ag", "")
                .replace(" Tires", "")
                .replace(" Tire", "")
                .toLowerCase()
                .trim();
        }
        else {
            return string.innerHTML.replace("amp;", "")
                .replace("amp", "")
                .replace(/\n/g, "")
                .replace(/[^\w\.]/g, " ")
                .replace(/  /g, " ")
                .trim();
        }


    }


    function hoverStrings(leftList, rightList, ID, id2) {

        var left = document.getElementById(leftList);
        var singleElementsL = left.getElementsByTagName("li");

        var right = document.getElementById(rightList);
        var singleElementsR = right.getElementsByTagName("li");
        var classes = [];




        for (let i = 0; i < singleElementsL.length; i++) {

            for (let j = 0; j < singleElementsR.length; j++) {
                if (clean(singleElementsL[i], id2) == clean(singleElementsR[j], id2)) {
                    singleElementsL[i].setAttribute("class", ID + "hover" + i);
                    singleElementsR[j].setAttribute("class", ID + "hover" + i);
                    classes[i] = ID + "hover" + i;
                }
            }
        }

        var elms = {};
        var n = {}, nclasses = classes.length;
        function changeColor(classname, color) {
            var curN = n[classname];
            for (var i = 0; i < curN; i++) {
                elms[classname][i].style.backgroundColor = color;
            }
        }
        for (var k = 0; k < nclasses; k++) {
            var curClass = classes[k];
            elms[curClass] = document.getElementsByClassName(curClass);
            n[curClass] = elms[curClass].length;
            var curN = n[curClass];
            for (var i = 0; i < curN; i++) {
                elms[curClass][i].onmouseover = function () {
                    changeColor(this.className, "yellow");
                };
                elms[curClass][i].onmouseout = function () {
                    changeColor(this.className, "white");
                };
            }
        };

    }


    function brands() {
        var customList = [];
        var myList = document.getElementById("customList2");
        var clean;
        myList.innerHTML = "";
        array_raw = null;
        var text = document.getElementById("textBoxServicesInput2").value;
        array_raw = text
            .replace(/,/g, ".")
            .replace(/\n/g, ".")
            .replace(/[^\w\.]/g, " ")
            .split(".");
        array_raw = array_raw.filter(Boolean);


        for (let i = 0; i < array_raw.length; i++) {
            if (array_raw[i].charAt(0) == "o") {
                clean = array_raw[i].trim().substr(1);
            } else {
                clean = array_raw[i].trim();
            }
            customList[i] = clean;
        }
        array_raw = customList;

        var productList = array_raw;
        productList.forEach(renderProductList);

        function renderProductList(element) {
            var li = document.createElement("li");
            li.setAttribute("class", "item");
            myList.appendChild(li);
            var t = document.createTextNode(element);
            li.innerHTML = li.innerHTML + element;
        }

        var lis3 = document
            .getElementById("customList2")
            .getElementsByTagName("li");

        for (let i = 0; i < lis3.length; i++) {
            lis3[i].setAttribute("id", "DSB" + i.toString());
        }

        newList2 = getElementsList("list2", newList2, "customList2");
        getMissing(productList, newList2, "B", "tires", "list2");
    }

    function processStrings() {
        var customList = [];
        var myList = document.getElementById("customList1");
        var clean;
        myList.innerHTML = "";
        array_raw = null;
        var text = document.getElementById("textBoxServicesInput1").value;
        array_raw = text
            .replace(/\n/g, ".")
            .replace(/[^\w\.]/g, " ")
            .split(".");
        array_raw = array_raw.filter(Boolean);
        for (let i = 0; i < array_raw.length; i++) {
            if (array_raw[i].charAt(0) == "o") {
                clean = array_raw[i].trim().substr(1);
            } else {
                clean = array_raw[i].trim();
            }
            customList[i] = clean;
        }
        array_raw = customList;
        var productList = array_raw;
        productList.forEach(renderProductList);

        function renderProductList(element) {
            var li = document.createElement("li");
            li.setAttribute("class", "item");
            myList.appendChild(li);
            var t = document.createTextNode(element);
            li.innerHTML = li.innerHTML + element;
        }

        var lis3 = document
            .getElementById("customList1")
            .getElementsByTagName("li");

        for (let i = 0; i < lis3.length; i++) {
            lis3[i].setAttribute("id", "DSS" + i.toString());
        }
        newList1 = getElementsList("list1", newList1, "customList1", "services");
        getMissing(productList, newList1, "S", "services", "list1");
    }

    function getElementsList(list, newList, customList) {
        var lis1 = document.getElementById(list).getElementsByTagName("li");
        newList = [];
        for (let i = 0; i < lis1.length; i++) {
            newList[i] = lis1[i].innerHTML
                .replace("amp;", "")
                .replace("amp", "")
                .replace(/\n/g, ".")
                .replace(/[^\w\.]/g, " ")
                .split(".");
        }

        var lis2 = document.getElementById(customList).getElementsByTagName("li");
        newServices2 = [];
        for (let i = 0; i < lis2.length; i++) {
            newServices2[i] = lis2[i].innerHTML
                .replace("amp;", "")
                .replace(/\n/g, ".")
                .replace("amp", "")
                .replace(/[^\w\.]/g, " ")
                .split(".");
        }
        return newList;
    }

    function getMissing(a, b, id, select, list) {


        var missings = [];
        var matches = false;

        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.setAttribute("id", "stylesheet1");

        var styles = ``;
        var container = document.getElementById(list).getElementsByTagName("li");
        for (let y = 0; y < container.length; y++) {
            container[y].style.color = "black";
        }
        for (var i = 0; i < a.length; i++) {
            matches = false;
            for (var e = 0; e < b.length; e++) {

                if (select == "tires") {
                    if (a[i].replace(" Tires", "").replace(" Tire", "").replace(" Ag", "").toLowerCase().trim() == b[e][0].replace(" Ag", "").replace(" Tires", "").replace(" Tire", "").toLowerCase().trim()) {
                        styles += "#DS" + id + i + "{color:blue;}";


                        for (let p = 0; p < container.length; p++) {
                            if (container[p].innerText.replace(/\n/g, ".")
                                .replace(/[^\w\.]/g, " ")
                                .replace(" Ag", "").replace(" Tires", "").replace(" Tire", "").toLowerCase().trim() == a[i].replace(" Tires", "").replace(" Tire", "").replace(" Ag", "").toLowerCase().trim()) {
                                container[p].style.color = "blue";
                            }

                        }

                        matches = true;
                    }
                }
                else {
                    if (a[i].trim() == b[e][0].trim()) {
                        styles += "#DS" + id + i + "{color:blue;}";

                        for (let p = 0; p < container.length; p++) {
                            if (container[p].innerText.replace("amp;", "")
                                .replace("amp", "")
                                .replace(/\n/g, ".")
                                .replace(/[^\w\.]/g, " ").trim() == a[i].trim()) {
                                container[p].style.color = "blue";
                            }

                        }

                        matches = true;
                    }
                }
            }
            if (!matches) {
                missings.push(a[i]);
            }
            if (select == "tires") {
                for (let i = 0; i < missings.length; i++) {
                    for (let j = 0; j < b.length; j++) {
                        var sim = similitude(missings[i].replace(" Tires", "").replace(" Tire", "").toLowerCase(), b[j][0].replace(" Tires", "").replace(" Tire", "").replace(" Ag", "").toLowerCase());
                        if (sim >= 55) {
                            styles +=
                                "#" +
                                findElement(missings[i], "customList2").toString() +
                                "{color:orange;}";
                            styles +=
                                "#" +
                                findElement(missings[i], "list2").toString() +
                                "{color:orange;}";
                        }

                    }
                }
            } else {
                for (let i = 0; i < missings.length; i++) {
                    for (let j = 0; j < b.length; j++) {
                        sim = similitude(missings[i], b[j][0]);
                        if (sim >= 55) {
                            styles +=
                                "#" +
                                findElement(missings[i], "customList1").toString() +
                                "{color:orange;}";
                            styles +=
                                "#" +
                                findElement(missings[i], "list1").toString() +
                                "{color:orange;}";
                        }

                    }
                }
            }
        }

        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

        return missings;
    }

    function findElement(element, list) {
        var lista = document.getElementById(list).getElementsByTagName("li");
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].innerHTML == element) {
                return lista[i].getAttribute("id");
            }
        }
        return 0;
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

    function getTokens() {
        var h2 = document.getElementsByTagName("h2");

        for (let i = 0; i < h2.length; i++) {
            if (h2[i].innerHTML == "Token Fields") {
                h2[i].setAttribute("id", "h2Tokens");
            }
        }
        var container = document.getElementById("h2Tokens");
        container.previousSibling.parentNode.setAttribute("id", "colToken1");
        var col = document.querySelector("div#colToken1");
        col.setAttribute("class", "col");
        var row = document.createElement("div");
        row.setAttribute("class", "row");
        row.setAttribute("id", "rowTokens");
        var el = document.querySelector("div#colToken1");
        el.parentNode.insertBefore(row, el);
        row.appendChild(el);

        col = document.createElement("div");
        col.setAttribute("class", "col");
        col.setAttribute("id", "colToken2");
        el.parentNode.insertBefore(col, el.nextElementSibling);
        row.appendChild(el.nextElementSibling);

        col = document.createElement("div");
        col.setAttribute("class", "col");
        col.setAttribute("id", "colTokens3");
        el.parentNode.insertBefore(col, el.nextElementSibling);
        row.appendChild(el.nextElementSibling);

        var textBoxServicesInput = document.createElement("textarea");
        textBoxServicesInput.setAttribute("id", "txtInput3");
        textBoxServicesInput.setAttribute("class", "txtInputArea");
        document.getElementById("colTokens3").appendChild(textBoxServicesInput);
    }

    function processTokens() {


        var styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.setAttribute("id", "stylesheet2");
        var styles = ``;
        styles += "#dnn_ctr447_View_SetupForm_txtName {color:black;}";
        styles += "#dnn_ctr447_View_SetupForm_txtCityStateFull {color:black;}";
        styles += "#dnn_ctr447_View_SetupForm_txtCityStateSmall {color:black;}";
        styles += "#dnn_ctr447_View_SetupForm_txtFocus1 {color:black;}";
        styles += "#dnn_ctr447_View_SetupForm_txtFocus2 {color:black;}";
        styles += "#dnn_ctr447_View_SetupForm_txtFocus3 {color:black;}";

        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
        styles = ``;
        var sheet = document.getElementById("stylesheet2");
        if (sheet != null) {
            sheet.disabled = true;
            sheet.parentNode.removeChild(sheet);
        }

        var text = document.getElementById("txtInput3").value;
        var tokensRaw = text.split("\n");
        var name = document.getElementById("dnn_ctr447_View_SetupForm_txtName").value;
        var cityfullstate = document.getElementById("dnn_ctr447_View_SetupForm_txtCityStateFull").value;
        var citystateAb = document.getElementById("dnn_ctr447_View_SetupForm_txtCityStateSmall").value;
        var focus1 = document.getElementById("dnn_ctr447_View_SetupForm_txtFocus1").value;
        var focus2 = document.getElementById("dnn_ctr447_View_SetupForm_txtFocus2").value;
        var focus3 = document.getElementById("dnn_ctr447_View_SetupForm_txtFocus3").value;

        if (tokensRaw[0].slice(tokensRaw[0].indexOf(':') + 1).trim() == name.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtName {color:blue;}";
        }
        if (tokensRaw[1].slice(tokensRaw[1].indexOf(':') + 1).trim() == cityfullstate.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtCityStateFull {color:blue;}";
        }
        if (tokensRaw[2].slice(tokensRaw[2].indexOf(':') + 1).trim() == citystateAb.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtCityStateSmall {color:blue;}";
        }
        if (tokensRaw[3].slice(tokensRaw[3].indexOf(':') + 1).trim() == focus1.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtFocus1 {color:blue;}";
        }
        if (tokensRaw[4].slice(tokensRaw[4].indexOf(':') + 1).trim() == focus2.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtFocus2 {color:blue;}";
        }
        if (tokensRaw[5].slice(tokensRaw[5].indexOf(':') + 1).trim() == focus3.trim()) {
            styles += "#dnn_ctr447_View_SetupForm_txtFocus3 {color:blue;}";
        }

        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);

    }

})();
