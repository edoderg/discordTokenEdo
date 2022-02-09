// ==UserScript==
// @name         discordTokenEdo
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Discord Token Via Hotkey<33
// @author       edo
// @match        https://discord.com/*
// @icon         https://www.google.com/s2/favicons?domain=github.com
// @downloadURL https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @updateURL https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @grant all
// ==/UserScript==

(function () {
    let stop;
    let popup;
	function openPopup() {
		popup = window.open('', '', 'top=300,left=300,width=550,height=150');
		if(!popup || !popup.document || !popup.document.write) return alert('Popup Error. Mies.');
		popup.document.write(`
				<!DOCTYPE html>
				<html>
				<head>
        <title>edo ist der beste</title>
        <style>
            body {
                font-family: sans-serif;
            }

            input {
                background: lightgray;
                font-family: Consolas, serif;
                padding: 7.5px;
                border-radius: 7.5px;
                margin-right: 5px;
            }

            .warning {
                background: yellow;
                border: 5px solid red;
                padding: 7.5px;
                margin-top: 40px;
            }

            button {
                padding: 6px;
            }

            .noselect {

              -webkit-user-select: none;
                              -khtml-user-select: none;
                              -moz-user-select: none;
                              -ms-user-select: none;
                              -o-user-select: none;
                              user-select: none;
            }
        </style>
        </head>
                <body>
                    <h1>edo ist der beste</h1>
                    <input id="edoToken"></code>
                    <button class="noselect" id="kopieren">Kopieren</button>
                </body>
				</html>
			`);

      function getToken() {
  			window.dispatchEvent(new Event('beforeunload'));
  			popup.document.querySelector('input#edoToken').value = JSON.parse(popup.localStorage.token);

  		}
  		getToken();

      // KOPIERER CODE +EDO
      var kopierTaste = popup.document.getElementById("kopieren");
      kopierTaste.addEventListener('click', onkopierTasteClick);
      function onkopierTasteClick() {
      	var hure = popup.document.createElement("textarea");
  	    popup.document.body.appendChild(hure);
  	    hure.value = JSON.parse(popup.localStorage.token);
  	    hure.select();
  	    popup.document.execCommand("copy");
  	    popup.document.body.removeChild(hure);

    	    popup.alert("Dein Discord Token wurde erfolgreich in die Zwischenablage kopiert!")
          popup.close()
      }

	}

	document.onkeydown = function(e) {
		if(e.altKey && e.keyCode == 'G'.charCodeAt(0)){
			openPopup();
		}
	}
})();
