// ==UserScript==
// @name         discordTokenEdo
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Discord Token Via Hotkey<33
// @author       edo
// @match        https://discord.com/*
// @icon         https://cdn.discordapp.com/embed/avatars/1.png
// @downloadURL https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @updateURL   https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @grant        none
// ==/UserScript==

(function () {
    let popup;
  
    function openPopup() {
      popup = window.open('', '', 'top=300,left=300,width=1000,height=220');
      if (!popup || !popup.document || !popup.document.write) {
        return alert('Popup Error. Mies.');
      }
      popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Your Discord Token | @edoderg 2023</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  background-color: #f0f0f0;
                  margin: 0;
                  padding: 0;
              }
              h1 {
                  font-size: 18px;
                  margin-top: 10px;
              }
              input {
                  background: #eee;
                  font-family: Consolas, serif;
                  padding: 7.5px;
                  border: 1px solid #ccc;
                  border-radius: 7.5px;
                  margin: 5px;
                  width: 80%;
                  text-align: center;
              }
              .warnung {
                  border: 1px solid red;
                  padding: 7.5px;
                  margin: 20px auto;
                  font-size: 14px;
                  text-align: center;
                  display: inline-block;
              }
              .warnung div {
                  background: yellow;
                  display: inline-block;
                  padding: 5px 10px;
              }
              .button-container {
                  margin-top: 10px;
                  text-align: center;
              }
              button {
                  padding: 6px 12px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  margin: 5px;
              }
              .censored-token {
                  background: #eee;
                  font-family: Consolas, serif;
                  padding: 7.5px;
                  border: 1px solid #ccc;
                  border-radius: 7.5px;
                  margin: 5px;
                  width: 80%;
                  text-align: center;
                  color: transparent;
                  text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
                  height: 30px;
                  line-height: 30px;
              }
              button:hover {
                  background-color: #0056b3;
              }
              .noselect {
                  user-select: none;
              }
          </style>
      </head>
      <body>
      <h1>Your Discord Token:</h1>
      <div id="token-container">
          <input id='edoToken' size='100' readonly value="******************************************************************************************" style="display: none;"></input>
          <span id="censored-text" class="censored-token">******************************************************************************************</span>
          <button id="show-token" class="noselect">Show Token</button>
      </div>
      <div class="button-container">
          <button class="noselect" id="kopieren">Copy</button>
      </div>
      <h2 class="warnung">NEVER GIVE YOUR DISCORD TOKEN TO ANYONE!</h2>
      <script>
          var tokenVisible = false;
          var tokenInput = document.getElementById('edoToken');
          var censoredText = document.getElementById('censored-text');
          var zeigDiscordToken = document.getElementById('show-token');
    
          function updateButtonLabel() {
            zeigDiscordToken.textContent = tokenVisible ? 'Hide Token' : 'Show Token';
          }
    
          zeigDiscordToken.addEventListener('click', function () {
              tokenVisible = !tokenVisible;
              if (tokenVisible) {
                  tokenInput.style.display = 'inline';
                  censoredText.style.display = 'none';
              } else {
                  tokenInput.style.display = 'none';
                  censoredText.style.display = 'inline';
              }
              updateButtonLabel();
          });
    
          updateButtonLabel();
      </script>
    </body>
    </html>
  `);
  
      getToken();
  
      function getToken() {
        // function to get the discord token from the local storage and display it in the popup
        window.dispatchEvent(new Event('beforeunload'));
        popup.document.querySelector('input#edoToken').value = JSON.parse(popup.localStorage.token);
      }
  
      // KOPIERER CODE +EDO
      var kopierTaste = popup.document.getElementById("kopieren");
      kopierTaste.addEventListener('click', onkopierTasteClick);
      function onkopierTasteClick() {
        // function to copy discord token to clipboard
        var textarea = popup.document.createElement("textarea");
        popup.document.body.appendChild(textarea);
        textarea.value = JSON.parse(popup.localStorage.token);
        textarea.select();
        popup.document.execCommand("copy");
        popup.document.body.removeChild(textarea);
        popup.alert("Your Discord token was successfully copied to the clipboard!");
        popup.close();
      }
    }
  
    document.onkeydown = function (e) {
      // listen for the alt+g hotkey to popup
      if (e.altKey && e.keyCode === 'G'.charCodeAt(0)) {
        openPopup();
      }
    };
  })();
  