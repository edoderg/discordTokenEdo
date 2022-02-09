// ==UserScript==
// @name         discordTokenEdo
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Discord Token Via Hotkey<33
// @author       edo
// @match        https://discord.com/*
// @icon         https://cdn.discordapp.com/embed/avatars/1.png
// @downloadURL https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @updateURL https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @grant all
// ==/UserScript==

(function () {
    let stop;
    let popup;
	function openPopup() {
		popup = window.open('', '', 'top=300,left=300,width=1000,height=220');
		if(!popup || !popup.document || !popup.document.write) return alert('Popup Error. Mies.');
		popup.document.write(`
				<!DOCTYPE html>
				<html>
				<head>
        <title>Dein Discord Token | edoderg 2022</title>
        <style>
            body {
                font-family: sans-serif;
                text-align: center;
            }

            input {
                background: lightgray;
                font-family: Consolas, serif;
                padding: 7.5px;
                border-radius: 7.5px;
                margin-right: 5px;
            }

            .warnung {
                background: yellow;
                border: 5px solid red;
                padding: 7.5px;
                margin-top: 30px;
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
                    <h1>Dein Discord Token:</h1>
                    <input id='edoToken' size='90'></code>
                    <button class="noselect" id="kopieren">Kopieren</button>
                    <h2 class="warnung">TEILE NIEMALS DEINEN DISCORD TOKEN!</h2>
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
