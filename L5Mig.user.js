

var container = document.createElement("div");
container.setAttribute("id", "process");
container.innerHTML = '<div id="fixedbutton">Copy</div>';
document.body.prepend(container);


var styles = `#fixedbutton{position:fixed;top:0;right:0;z-index:9999;margin-right:50px;padding:10px;background-color:orange;color:#fff;cursor:pointer}#fixedbutton:hover{background-color:#000}`;

var styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);


var button = document.getElementById("fixedbutton");
button.addEventListener("click", lazy);

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

function copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

