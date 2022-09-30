// ==UserScript==
// @name         TSN Services
// @namespace    http://tampermonkey.net/
// @version      1.0
// @updateURL    https://github.com/jhcordova/scripts/raw/main/services.user.js
// @downloadURL  https://github.com/jhcordova/scripts/raw/main/services.user.js
// @description  try to take over the world! hueheuheuheuehuh
// @author       Julio Cordova
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

$('.service-item .btnBox').append('<input type="checkbox">');

