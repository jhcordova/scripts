// ==UserScript==
// @name         UNLIMITEDPOWERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
// @version      1.0
// @description  try to take over the world!
// @author       Julio Cordova
// @match        *://eventrac.arinet.com/*
// @grant        none
// @updateURL      https://github.com/jhcordova/scripts/raw/main/powah.user.js
// @downloadURL    https://github.com/jhcordova/scripts/raw/main/powah.user.js
// @run-at       document-end
// ==/UserScript==



function textCounter(field, countfield, maxlimit) {
    maxlimit = 100000000000;
    if (field.value.length > maxlimit) // if too long...trim it, or not huehueheuheuehuehuehueuhehu!
        field.value = field.value.substring(0, maxlimit);
    // otherwise, update 'characters left' counter
    else
        countfield.value = maxlimit - field.value.length;
}
appendPOWAH(textCounter);

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