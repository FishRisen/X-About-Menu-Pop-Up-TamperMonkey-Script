//NOTE
//(Use this script at your own risk. I’m not responsible for anything that happens to your X/Twitter account as a result of using it.
//(By choosing to run it, you accept full responsibility for any actions, restrictions, or consequences that may occur.)
//(This script exists purely to work around X’s rate-limit issues by skipping the full profile load and going straight to the /about page inside an embedded frame.)
//(It does not use the API and does not perform any actions on your behalf; but as with any third-party script, please use it with caution.)

// ==UserScript==
// @name         X About Popup Window
// @namespace    idk
// @version      2.7
// @match        https://x.com/*
// @match        https://twitter.com/*
// @grant        none
// ==/UserScript==

(function(){

    let popup=null, backdrop=null;
    let mouseInside = false;
    let lastUser = "";
    window._popupOpen = false;   // <--- NEW: block popup stacking

    function closePopup(){
        if(popup){ popup.remove(); popup=null; }
        if(backdrop){ backdrop.remove(); backdrop=null; }

        document.removeEventListener("click", outsideClick, true);
        window.removeEventListener("scroll", scrollCheck, true);

        window._popupOpen = false;   // <--- allow new popups now
    }

    function outsideClick(e){
        if(!popup) return;
        if(!popup.contains(e.target)) closePopup();
    }

    function scrollCheck(){
        if(!popup) return;
        // only kill on scroll if mouse was *already* outside
        if(!mouseInside) closePopup();
    }

    function make(url, name){
        closePopup();

        window._popupOpen = true;  // <--- NEW: lock popup system immediately

        backdrop = document.createElement("div");
        backdrop.style.cssText = `
            position:fixed; inset:0; background:rgba(0,0,0,.45);
            z-index:9999998;
        `;

        popup = document.createElement("div");
        popup.style.cssText = `
            position:fixed;
            top:50%; left:50%;
            transform:translate(-50%, -50%);
            width:650px; max-width:90%;
            height:520px; max-height:85%;
            background:#fff;
            border-radius:8px;
            box-shadow:0 4px 25px rgba(0,0,0,.4);
            overflow:hidden;
            z-index:9999999;
            display:flex;
            flex-direction:column;
        `;

        let bar = document.createElement("div");
        bar.style.cssText = `
            background:#777;
            height:40px;
            display:flex;
            align-items:center;
            padding:0 14px;
            color:#fff;
            font-size:16px;
            font-weight:500;
        `;
        bar.textContent = name ? "@" + name : "Profile";

        let frame = document.createElement("iframe");
        frame.src = url;
        frame.style.cssText = `
            border:none;
            width:100%;
            flex:1;
            height:100%;
        `;

        popup.appendChild(bar);
        popup.appendChild(frame);

        document.body.appendChild(backdrop);
        document.body.appendChild(popup);

        popup.addEventListener("mouseenter", ()=>{ mouseInside = true; });
        popup.addEventListener("mouseleave", ()=>{ mouseInside = false; });

        document.addEventListener("click", outsideClick, true);
        window.addEventListener("scroll", scrollCheck, true);
    }

    document.addEventListener("contextmenu", function(e){
        // ONLY allow when F is held
        if(!window._holdF) return;

        // *** NEW: block if popup is already open ***
        if(window._popupOpen) {
            return; // do nothing, can't stack windows
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

