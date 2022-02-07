// ==UserScript==
// @name         discordTokenEdo
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Discord Token Via Hotkey<33
// @author       edo
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @downloadURL
// @updateURL
// @grant all
// ==/UserScript==

(function () {
    let stop;
    let popup;
	function openPopup() {
		popup = window.open('', '', 'top=300,left=300,width=600,height=20');
		if (!popup) return console.error('Popup Error. Mies.');
		popup.document.write(
			/*html*/`
				<!DOCTYPE html>
				<html>
				<head>
				</head>
				<body bgcolor='black'>
					<center>
						<a style='font-family: Courier; color: white; font-size: 25px' href='edo ist der beste'>edo ist der beste/</a>
					</center>
					<div class='centered'>
						<input id='authToken' size='75'>
					</div>
				<style>
					.centered {
						position: absolute;
						top: 50%;
						left: 50%;
						margin: 0;
						transform: translate(-50%, -50%);
					}
				</style>
				</body>
				</html>
			`);
		function getToken() {
			window.dispatchEvent(new Event('beforeunload'));
			popup.document.querySelector('input#authToken').value = JSON.parse(popup.localStorage.token);
		}
		getToken();
	}
	document.onkeydown = function(e) {
		if(e.altKey && e.keyCode == 'G'.charCodeAt(0)){
			openPopup();
		}
	}
})();
