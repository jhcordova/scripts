// ==UserScript==
// @name         Time
// @namespace    http://tampermonkey.net/
// @version      2.3.6
// @updateURL    https://github.com/jhcordova/scripts/raw/main/time.user.js
// @downloadURL  https://github.com/jhcordova/scripts/raw/main/time.user.js
// @description  try to take over the world! hueheuheuheuehuh
// @author       Julio Cordova
// @match        *://*/*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

var element = document.getElementById('actualMinutes');
if (typeof (element) != 'undefined' && element != null) {

	var timeContainer = document.createElement("div");
	timeContainer.setAttribute("id", "timeContainer");
	timeContainer.innerHTML = ' <div class="row"> <div class="col"> <label>Time Start</label> </div> <div class="col"> <input id="input"> </div></div><div class="row"> <div class="col"> <label>Points</label> </div> <div class="col"> <input id="points"> </div></div><div class="row"> <div class="col"> <label>Subtract Time (minutes)</label> </div> <div class="col"> <input id="subs" value="0"> </div></div><div class="row"> <div class="col"> <div class="buttons" id="button1">Time!!</div> </div></div><div class="row"> <div class="col"> <label>1 PM or higher</label> </div> <div class="col"> <input type="checkbox" id="time12"> </div></div>';

	document.getElementById("actualMinutes").setAttribute("maxlength", "50");
	var cont = document.getElementById("actualMinuteField");
	cont.append(timeContainer);

	var styles = `
	.buttons{display:inline-block;cursor:pointer;text-align:center;text-decoration:none;outline:0;color:#fff;background-color:#008cba;border:none;padding:10px}.buttons:hover{background-color:#023a4d}.buttons:active{background-color:#002836;-webkit-transform:translateY(1px);transform:translateY(1px)}#timeContainer{clear:both;margin-left:-20px}#timeContainer .row{margin:0;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}#timeContainer .col{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center}#timeContainer .col label{text-align:center}#timeContainer input{width:50px}
`
	var styleSheet1 = document.createElement("style");
	styleSheet1.type = "text/css";
	styleSheet1.innerText = styles;
	document.head.appendChild(styleSheet1);
	var button1 = document.getElementById("button1");

	button1.addEventListener("click", function () {
		var today = new Date();
		document.getElementById("actualMinutes").setAttribute("maxlength", "50");
		var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
		var timeClaimed = document.getElementById("input").value;
		var timeEnd = new Date("Mon Jan 01 2020 " + time + ":00 GMT-0700").getTime();  // la paz time
		var timeStart = new Date("Mon Jan 01 2020 " + timeClaimed + ":00 GMT-0600").getTime();  // duluth time
		var hourDiff;
		//if to check if time is after 1 pm, add 12h to current time to take into accout the 24h format on javascript Date variable
		if (document.getElementById("time12").checked) {
			hourDiff = (timeEnd) - ((timeStart + 43200000));
		}
		else {
			hourDiff = timeEnd - (timeStart);
		}
		//hourDiff = hourDiff;
		//var secDiff = hourDiff / 1000;
		var minDiff = hourDiff / 60 / 1000;
		var hDiff = hourDiff / 3600 / 1000;
		var hours = Math.floor(hDiff);
		var minutes = minDiff - 60 * hours;
		var timeResult = Math.floor((hours * 60) + minutes);
		var substractTime = document.getElementById("subs").value;
		document.getElementById("actualMinutes").value = timeResult - substractTime;
		var pointsValue = ((timeResult * 5) / 25) - ((substractTime * 5) / 25);
		document.getElementById("points").value = pointsValue;

	});
}
