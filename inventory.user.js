// ==UserScript==
// @name         Inventory Site Map Check
// @version      1.0
// @description  try to take over the world!
// @author       Julio Cordova
// @include      *://*/inventory-site-map
// @grant        none
// @run-at       document-end
// ==/UserScript==

var inventory = document.getElementsByClassName("Inventory-Sitemap_1-0-1 ari-componentinstance");
var bread = document.getElementsByClassName("CrumbNav_1-0-0 ari-componentinstance");
inventory.length > 0 ? bread[0].append("Inventory Site Map Enabled.") : bread[0].append("Inventory Site Map NOT Present, please add it.");