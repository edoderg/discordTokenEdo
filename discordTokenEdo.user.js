// ==UserScript==
// @name         discordTokenEdo
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Discord Token Via Hotkey<33
// @author       edo
// @match        https://discord.com/*
// @icon         https://cdn.discordapp.com/embed/avatars/1.png
// @downloadURL  https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @updateURL    https://github.com/edoderg/discordTokenEdo/raw/main/discordTokenEdo.user.js
// @grant        none
// ==/UserScript==

(function () {
    const overlay = document.createElement('div');
    overlay.id = 'edo-token-overlay';
    overlay.style.display = 'none';
    overlay.style.position = 'fixed';
    overlay.style.top = '50%';
    overlay.style.left = '50%';
    overlay.style.transform = 'translate(-50%, -50%)';
    overlay.style.backgroundColor = '#36393f';
    overlay.style.padding = '24px';
    overlay.style.borderRadius = '8px';
    overlay.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '9999';
    overlay.style.width = '750px';
    overlay.style.maxWidth = '90%';
    overlay.style.textAlign = 'center';
    overlay.style.fontFamily = 'Whitney, "Helvetica Neue", Helvetica, Arial, sans-serif';
    overlay.style.color = '#dcddde';
    overlay.style.transition = 'all 0.2s ease-in-out';
    overlay.style.border = '1px solid rgba(4,4,5,0.2)';

    function getToken() {
        let token = "";
        try {
            window.webpackChunkdiscord_app.push([
                [Math.random()],
                {},
                req => {
                    if (!req.c) return;
                    for (const m of Object.keys(req.c)
                        .map(x => req.c[x].exports)
                        .filter(x => x)) {
                        if (m.default && m.default.getToken !== undefined) {
                            token = m.default.getToken();
                            return;
                        }
                        if (m.getToken !== undefined) {
                            token = m.getToken();
                            return;
                        }
                    }
                },
            ]);
            window.webpackChunkdiscord_app.pop();
        } catch (e) {
            console.error("Failed to get token:", e);
        }
        return token || "Could not retrieve Discord token";
    }

    function setupOverlay() {
        const token = getToken();

        const censoredToken = token.replace(/[a-zA-Z0-9]/g, '•');

        overlay.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; margin-bottom: 15px;">
            <h2 style="font-size: 24px; margin: 0; color: white; font-weight: 600;">Your Discord Token:</h2>
            <span style="color: #b9bbbe; font-size: 12px; position: absolute; right: 24px;">@edoderg 2025</span>
        </div>
        <div style="position: relative; margin: 10px auto 20px; width: 100%;">
            <input id="edoToken" type="text" readonly value="${token}"
                   style="background: #2f3136; color: #00b0f4; font-family: 'Consolas', monospace; padding: 14px;
                          border: 1px solid #202225; border-radius: 4px; margin: 0 auto; width: 100%;
                          text-align: center; display: none; font-size: 14px; box-sizing: border-box;
                          box-shadow: inset 0 0 0 1px rgba(24, 25, 28, 0.3); outline: none;
                          overflow: hidden; text-overflow: ellipsis; white-space: nowrap; height: 52px;">
            <div id="censored-text"
                 style="background: #2f3136; font-family: 'Consolas', monospace; padding: 14px;
                        border: 1px solid #202225; border-radius: 4px; margin: 0 auto; width: 100%;
                        text-align: center; display: block; letter-spacing: 1px; font-size: 14px;
                        color: #00b0f4; height: 52px; line-height: 24px; box-sizing: border-box;
                        position: relative; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(24, 25, 28, 0.3);
                        user-select: none; white-space: nowrap;">
                ${censoredToken}
            </div>
        </div>
            <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
                <button id="showTokenBtn"
                        style="padding: 10px 16px; background-color: #5865f2; color: white; border: none;
                               border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;
                               transition: background-color 0.2s; min-width: 120px;">
                    Show Token
                </button>
            </div>
            <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 20px;">
                <button id="copyTokenBtn"
                        style="padding: 10px 16px; background-color: #3ba55d; color: white; border: none;
                               border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;
                               transition: background-color 0.2s; min-width: 120px;">
                    Copy Token
                </button>
                <button id="closeOverlayBtn"
                        style="padding: 10px 16px; background-color: #ed4245; color: white; border: none;
                               border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: 500;
                               transition: background-color 0.2s; min-width: 120px;">
                    Close
                </button>
            </div>
            <div style="border: 2px solid #f04747; padding: 12px; margin: 0 auto; display: inline-block;
                        border-radius: 4px; background-color: rgba(240, 71, 71, 0.1);">
                <strong style="color: #f04747; font-size: 15px;">WARNING: NEVER GIVE YOUR DISCORD TOKEN TO ANYONE!</strong>
            </div>
        `;

        document.getElementById('showTokenBtn').addEventListener('click', toggleTokenVisibility);
        document.getElementById('copyTokenBtn').addEventListener('click', copyToken);
        document.getElementById('closeOverlayBtn').addEventListener('click', hideOverlay);

        const buttons = overlay.querySelectorAll('button');
        buttons.forEach(btn => {
            btn.addEventListener('mouseover', function() {
                const currentColor = this.style.backgroundColor;
                const darkerColor = getDarkerColor(currentColor, 0.85);
                this.style.backgroundColor = darkerColor;
            });

            btn.addEventListener('mouseout', function() {
                if (this.id === 'showTokenBtn') this.style.backgroundColor = '#5865f2';
                if (this.id === 'copyTokenBtn') this.style.backgroundColor = '#3ba55d';
                if (this.id === 'closeOverlayBtn') this.style.backgroundColor = '#ed4245';
            });
        });
    }

    function getDarkerColor(color, factor) {
        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!rgbMatch) return color;

        const r = Math.floor(parseInt(rgbMatch[1]) * factor);
        const g = Math.floor(parseInt(rgbMatch[2]) * factor);
        const b = Math.floor(parseInt(rgbMatch[3]) * factor);

        return `rgb(${r}, ${g}, ${b})`;
    }

    function toggleTokenVisibility() {
        const tokenInput = document.getElementById('edoToken');
        const censoredText = document.getElementById('censored-text');
        const showBtn = document.getElementById('showTokenBtn');

        if (tokenInput.style.display === 'none') {
            censoredText.style.opacity = '0';
            censoredText.style.transform = 'scale(0.98)';

            setTimeout(() => {
                censoredText.style.display = 'none';
                tokenInput.style.display = 'block';
                tokenInput.style.opacity = '0';
                tokenInput.style.transform = 'scale(0.98)';

                void tokenInput.offsetWidth;

                setTimeout(() => {
                    tokenInput.style.opacity = '1';
                    tokenInput.style.transform = 'scale(1)';
                }, 10);
            }, 150);

            showBtn.textContent = 'Hide Token';
            showBtn.style.backgroundColor = '#4752c4';
        } else {
            tokenInput.style.opacity = '0';
            tokenInput.style.transform = 'scale(0.98)';

            setTimeout(() => {
                tokenInput.style.display = 'none';
                censoredText.style.display = 'block';
                censoredText.style.opacity = '0';
                censoredText.style.transform = 'scale(0.98)';

                void censoredText.offsetWidth;

                setTimeout(() => {
                    censoredText.style.opacity = '1';
                    censoredText.style.transform = 'scale(1)';
                }, 10);
            }, 150);

            showBtn.textContent = 'Show Token';
            showBtn.style.backgroundColor = '#5865f2';
        }
    }

    function copyToken() {
        const token = document.getElementById('edoToken').value;
        navigator.clipboard.writeText(token).then(() => {
            const copyBtn = document.getElementById('copyTokenBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#2d8147';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '#3ba55d';
            }, 1000);
        }).catch(err => {
            console.error('Failed to copy token: ', err);
            const textarea = document.createElement('textarea');
            textarea.value = token;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);

            const copyBtn = document.getElementById('copyTokenBtn');
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            copyBtn.style.backgroundColor = '#2d8147';

            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.backgroundColor = '#3ba55d';
            }, 1000);
        });
    }

    function showOverlay() {
        setupOverlay();
        overlay.style.display = 'block';
        overlay.style.opacity = '0';
        overlay.style.transform = 'translate(-50%, -50%) scale(0.95)';

        setTimeout(() => {
            overlay.style.opacity = '1';
            overlay.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 10);
    }

    function hideOverlay() {
        overlay.style.opacity = '0';
        overlay.style.transform = 'translate(-50%, -50%) scale(0.95)';

        setTimeout(() => {
            overlay.style.display = 'none';
        }, 200);
    }

    document.body.appendChild(overlay);

    document.addEventListener('keydown', function(e) {
        if (e.altKey && (e.key === 'g' || e.key === 'G')) {
            e.preventDefault();
            if (overlay.style.display === 'none') {
                showOverlay();
            } else {
                hideOverlay();
            }
        }
    });
})();
