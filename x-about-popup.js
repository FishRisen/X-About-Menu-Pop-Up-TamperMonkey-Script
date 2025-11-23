// ==UserScript==
// @name         X About Popup Window
// @namespace    idk
// @version      2.7
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

//NOTE
//(Use this script at your own risk. I’m not responsible for anything that happens to your X/Twitter account as a result of using it. By choosing to run it, you accept full responsibility for any actions, restrictions, or consequences that may occur.)
//(This script exists purely to work around X’s rate-limit issues by skipping the full profile load and going straight to the /about page inside an embedded frame. It does not use the API and does not perform any actions on your behalf; but as with any third-party script, please use it with caution.)

// --IMPORTANT!--

// THIS SCRIPT ONLY WORKS AS INTENDED ON FIREFOX.
// USING THIS ON CHROME WILL REPLACE THE EMBEDDED WINDOW FRAME WITH A BROWSER POP-UP.




(function(){

    let popup=null, backdrop=null;
    let mouseInside = false;
    let lastUser = "";
    window._popupOpen = false;

    function closePopup(){
        if(popup){ popup.remove(); popup=null; }
        if(backdrop){ backdrop.remove(); backdrop=null; }

        document.removeEventListener("click", outsideClick, true);
        window.removeEventListener("scroll", scrollCheck, true);

        window._popupOpen = false;   // allow new popups
    }

    function outsideClick(e){
        if(!popup) return;
        if(!popup.contains(e.target)) closePopup();
    }

    function scrollCheck(){
        if(!popup) return;
        if(!mouseInside) closePopup();
    }

    function make(url, name) {
        closePopup();
        window._popupOpen = true;


        if (!navigator.userAgent.includes("Firefox")) {                                      //CHROME - Block iframe
            const win = window.open(
                url,
                "x_about_popup_" + Date.now(), // set unique name
                "width=700,height=620,resizable=yes,scrollbars=yes,toolbar=no,menubar=no,location=no,status=no"
            );

            if (win) {
                const checkClosed = setInterval(() => {
                    if (win.closed) {
                        clearInterval(checkClosed);
                        window._popupOpen = false;
                    }
                }, 300);
                win.focus();
            } else {
                alert("Popup blocked! Please allow popups for x.com");
                window._popupOpen = false;
            }
            return;
        }


        backdrop = document.createElement("div");                                            //FIREFOX - Allow iframe
        backdrop.style.cssText = `
            position:fixed; inset:0; background:rgba(0,0,0,.45); z-index:9999998;
        `;

        popup = document.createElement("div");
        popup.style.cssText = `
            position:fixed; top:50%; left:50%; transform:translate(-50%,-50%);
            width:650px; max-width:90%; height:520px; max-height:85%;
            background:#fff; border-radius:12px; box-shadow:0 8px 32px rgba(0,0,0,.4);
            overflow:hidden; z-index:9999999; display:flex; flex-direction:column;
            font-family: system-ui, sans-serif;
        `;

        const bar = document.createElement("div");
        bar.style.cssText = `
            background:#1da1f2; height:44px; display:flex; align-items:center;
            padding:0 16px; color:#fff; font-size:17px; font-weight:600; cursor:default;
        `;
        bar.textContent = name ? "@" + name : "Profile";

        const frame = document.createElement("iframe");
        frame.src = url;
        frame.style.cssText = `border:none; width:100%; flex:1; background:#fff;`;

        popup.append(bar, frame);
        document.body.append(backdrop, popup);

        popup.addEventListener("mouseenter", () => mouseInside = true);
        popup.addEventListener("mouseleave", () => mouseInside = false);
        document.addEventListener("click", outsideClick, true);
        window.addEventListener("scroll", scrollCheck, true);
    }

    document.addEventListener("contextmenu", function(e){
        // Check if F is held
        if(!window._holdF) return;

        // Block popup if one is open
        if(window._popupOpen) {
            return;
        }

        if(!e.target) return;

        let a = e.target.closest('a[href^="/"]');
        if(!a) return;

        let href = a.getAttribute("href") || "";
        if(href.length < 2) return;

        let u = href.split("/")[1];
        if(!u || u.startsWith("home") || u.startsWith("i")) return;

        e.preventDefault();

        lastUser = u;

        make("https://x.com/" + u + "/about", u);
    }, true);

    // F key tracker
    window._holdF = false;

    document.addEventListener("keydown", e=>{
        if(e.key === "f" || e.key === "F") window._holdF = true;
    });
    document.addEventListener("keyup", e=>{
        if(e.key === "f" || e.key === "F") window._holdF = false;
    });

})();
