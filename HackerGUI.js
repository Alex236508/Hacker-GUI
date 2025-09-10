(function(){
  if (window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  const bootOverlay = document.createElement('div');
  bootOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #00ff00;
    font-family: Consolas, monospace;
    pointer-events: none;
  `;

  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  bootOverlay.appendChild(canvas);

  const msg = document.createElement('div');
  msg.innerText = '[ BOOTING SYSTEM... ]';
  msg.style.cssText = `
    font-size: 20px;
    margin-bottom: 10px;
    z-index: 1000001;
    text-shadow: 0 0 5px #00ff00;
  `;
  bootOverlay.appendChild(msg);

  const loading = document.createElement('div');
  loading.style.cssText = `
    font-size: 24px;
    font-weight: bold;
    z-index: 1000001;
    text-shadow: 0 0 10px #00ff00;
  `;
  loading.innerText = 'Loading 0%';
  bootOverlay.appendChild(loading);

  document.body.appendChild(bootOverlay);

  // ---------- Matrix rain ----------
  const ctx = canvas.getContext('2d');
  const chars = '1010';
  const cols = Math.floor(canvas.width / 10);
  const drops = Array.from({length: cols}, () => Math.floor(Math.random() * canvas.height));

  const rain = setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = '10px monospace';

    drops.forEach((drop, i) => {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 10, drop * 10);
      drops[i] = (drop * 10 > canvas.height && Math.random() > 0.975) ? 0 : drop + 1;
    });
  }, 33);

  // ---------- Loading counter ----------
  let progress = 0;
  const int = setInterval(() => {
    progress++;
    loading.innerText = `Loading ${progress}%`;
    if (progress >= 100) {
      clearInterval(int);
      setTimeout(() => {
        loading.innerText = 'Welcome, Hacker';
        setTimeout(() => {
          clearInterval(rain);
          overlay.remove();
          spawnGUIs();
        }, 2000);
      }, 500);
    }
  }, 40);
})();
  
   // ---------- UTILITY ----------
function createElement(tag, props = {}, parent = null) {
    const el = document.createElement(tag);

    // Assign properties safely
    for (const [key, value] of Object.entries(props)) {
        if (key === "style" && typeof value === "object") {
            Object.assign(el.style, value);
        } else {
            el[key] = value;
        }
    }

    if (parent) parent.appendChild(el);
    return el;
}

function addBtn(container, label, onClick) {
    if (!container) {
        console.error("Container not found:", container);
        return null;
    }
    const btn = createElement("button", { textContent: label, className: "hacker-btn" }, container);
    btn.addEventListener("click", onClick);
    return btn;
}

// ---------- STYLES ----------
const style = createElement("style", { textContent: `
    .hacker-overlay {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: black;
        z-index: 999999;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #0f0;
        font-family: monospace;
    }
    .hacker-panel {
        background: #111;
        padding: 10px;
        border-radius: 8px;
        margin: 5px;
        min-width: 300px;
    }
    .hacker-btn {
        margin: 3px;
        padding: 5px 10px;
        background: #0f0;
        color: #000;
        border: none;
        cursor: pointer;
        border-radius: 4px;
        font-family: monospace;
    }
`});
document.head.appendChild(style);

// ---------- OVERLAY & PANELS ----------
const bootOverlay = createElement("div", { className: "hacker-overlay" }, document.body);

const mainPanel = createElement("div", { className: "hacker-panel" }, overlay);
mainPanel.textContent = "Main Control Panel";

const secondaryPanel = createElement("div", { className: "hacker-panel" }, overlay);
secondaryPanel.textContent = "Secondary Panel";

// ---------- GUI SPAWNER ----------
function spawnGUIs() {
    // ---------- UTILITIES GUI ----------
    let util = document.getElementById('utilitiesGUI');
    if(!util){
        util = document.createElement('div');
        util.id='utilitiesGUI';
        util.style.cssText=`
            position:fixed; top:50px; left:50px; width:320px;
            background:#1b1b1b; color:#00ff00; font-family:Consolas,monospace;
            padding:10px; border:2px solid #00ff00; border-radius:8px;
            box-shadow:0 0 15px rgba(0,255,0,0.5); z-index:999999;
            user-select:none; cursor:move;
        `;
        util.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
        document.body.appendChild(util);
    }
    window.utilGUI = util; // for later reference

    // ---------- VFX GUI ----------
    let vfx = document.getElementById('vfxGUI');
    if(!vfx){
        vfx = document.createElement('div');
        vfx.id='vfxGUI';
        vfx.style.cssText=`
            position:fixed; top:100px; left:400px; width:320px;
            background:#1b1b1b; color:#00ff00; font-family:Consolas,monospace;
            padding:10px; border:2px solid #00ff00; border-radius:8px;
            box-shadow:0 0 15px rgba(0,255,0,0.5); z-index:999999;
            user-select:none; cursor:move;
        `;
        vfx.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>VFX</b></div>';
        document.body.appendChild(vfx);
    }

    // ---------- Unified Button Helper ----------
window.addBtn = function(container, label, on, off=null){
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.cssText='width:100%;margin:2px 0;background:#252525;color:#0f0;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
    btn.onclick = on;
    container.appendChild(btn);
    if(off) window.activeUtilities[label] = {on, off};
    return btn;
};


 // ---------- Utilities Buttons ----------
(function(util){
    const activeUtilities = window.activeUtilities || {};

    function addBtn(container, label, on, off=null){
        const btn = document.createElement('button');
        btn.textContent = label;
        btn.style.cssText = 'width:100%;margin:2px 0;background:#252525;color:#0f0;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
        btn.onclick = on;
        container.appendChild(btn);
        if(off) activeUtilities[label] = {on, off};
        return btn;
    }

    // --- Buttons ---

    // Global Chat (Firebase)
    addBtn(util, 'Global Chat', () => {
        if(window.globalChatActive) return;
        window.globalChatActive = true;

        const firebaseConfig = {
            apiKey: "AIzaSyDlmPq4bMKdOFHMdfevEa3ctd4-3WQ4u7k",
            authDomain: "hacker-gui-global-chat.firebaseapp.com",
            databaseURL: "https://hacker-gui-global-chat-default-rtdb.firebaseio.com/",
            projectId: "hacker-gui-global-chat",
            storageBucket: "hacker-gui-global-chat.firebasestorage.app",
            messagingSenderId: "410978781234",
            appId: "1:410978781234:web:ee08f15ee9be48970c542b"
        };

        function initFirebaseChat(){
            const app = firebase.initializeApp(firebaseConfig);
            const db = firebase.database();
            const username = prompt("Enter your chat username:", "Anonymous") || "Anonymous";

            const chatBox = document.createElement('div');
            Object.assign(chatBox.style, {
                position:"fixed", bottom:"10px", right:"10px", width:"300px", height:"400px",
                background:"rgba(0,0,0,0.85)", color:"white", fontFamily:"sans-serif", fontSize:"14px",
                padding:"5px", borderRadius:"8px", zIndex:999999, display:"flex", flexDirection:"column",
                resize:"both", overflow:"hidden", cursor:"move"
            });

            const header = document.createElement('div');
            Object.assign(header.style, {
                display:"flex", justifyContent:"space-between", alignItems:"center",
                background:"rgba(255,255,255,0.1)", padding:"3px 5px", cursor:"move"
            });
            const title = document.createElement('span'); title.innerText='Global Chat';
            const closeBtn = document.createElement('button'); closeBtn.innerText='×';
            Object.assign(closeBtn.style, {background:'none', border:'none', color:'white', fontSize:'16px', cursor:'pointer'});
            closeBtn.onclick = () => { chatBox.remove(); window.globalChatActive=false; };
            header.append(title, closeBtn);
            chatBox.appendChild(header);

            const messagesDiv = document.createElement('div');
            Object.assign(messagesDiv.style, {flex:1, overflow:"auto", margin:"5px 0", paddingRight:"3px"});
            chatBox.appendChild(messagesDiv);

            const inputDiv = document.createElement('div'); inputDiv.style.display="flex";
            const input = document.createElement('input'); input.type="text"; input.placeholder="Type a message...";
            input.style.flex="1"; input.style.marginRight="5px";
            const sendBtn = document.createElement('button'); sendBtn.innerText="Send";
            inputDiv.append(input, sendBtn);
            chatBox.appendChild(inputDiv);

            document.body.appendChild(chatBox);

            // Draggable chat box
            header.onmousedown = e => {
                const ox = e.clientX - chatBox.offsetLeft, oy = e.clientY - chatBox.offsetTop;
                function moveHandler(e){ chatBox.style.left=(e.clientX-ox)+'px'; chatBox.style.top=(e.clientY-oy)+'px'; chatBox.style.bottom='auto'; chatBox.style.right='auto'; }
                function upHandler(){ document.removeEventListener('mousemove',moveHandler); document.removeEventListener('mouseup',upHandler); }
                document.addEventListener('mousemove', moveHandler);
                document.addEventListener('mouseup', upHandler);
            };

            function sendMessage(){
                const text = input.value.trim();
                if(!text) return;
                db.ref('messages').push({user:username, text, time:Date.now()});
                input.value='';
            }
            sendBtn.onclick = sendMessage;
            input.addEventListener('keydown', e => { if(e.key==='Enter') sendMessage(); });

            db.ref('messages').limitToLast(50).on('child_added', snap => {
                const msg = snap.val();
                const msgDiv = document.createElement('div');
                msgDiv.innerHTML=`<b>${msg.user}:</b> ${msg.text}`;
                messagesDiv.appendChild(msgDiv);
                messagesDiv.scrollTop=messagesDiv.scrollHeight;
            });
        }

        if(!window.firebaseLoaded){
            window.firebaseLoaded = true;
            const s1 = document.createElement('script');
            s1.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
            s1.onload = () => {
                const s2 = document.createElement('script');
                s2.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js";
                s2.onload = initFirebaseChat;
                document.head.appendChild(s2);
            };
            document.head.appendChild(s1);
        } else initFirebaseChat();
    });

    // Developer Console (Eruda)
    addBtn(util,'Developer Console', ()=>{
        if(!window.erudaLoaded){
            const s = document.createElement('script');
            s.src='https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
            s.onload = ()=>{ eruda.init(); eruda.theme='Dark'; window.erudaInstance=eruda; window.erudaLoaded=true; };
            document.body.appendChild(s);
        } else window.erudaInstance.show();
    }, ()=>{
        if(window.erudaInstance){ window.erudaInstance.destroy(); window.erudaInstance=null; window.erudaLoaded=false; }
    });

    // Page Dark Theme
    addBtn(util,'Page Dark Theme', ()=>document.body.style.filter='invert(1)', ()=>document.body.style.filter='');

    // Calculator
    addBtn(util,'Calculator', ()=>{
        let expr;
        while((expr = prompt("Expression:",""))){
            try{ alert(eval(expr)); } catch(e){ alert(e); }
        }
    });

    // DNS Lookup
    addBtn(util,'DNS Lookup', ()=>window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank'));

    // FPS Counter
    addBtn(util,'FPS Counter', ()=>{
        if(!window.stats){
            const s = document.createElement('script');
            s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
            s.onload=()=>{
                window.stats = new Stats();
                document.body.appendChild(window.stats.dom);
                (function loop(){ window.stats.update(); requestAnimationFrame(loop); })();
            };
            document.head.appendChild(s);
        }
    }, ()=>{ if(window.stats){ window.stats.dom.remove(); window.stats=null; } });

    // History Flooder
    addBtn(util,'History Flooder', ()=>{
        const n = parseInt(prompt("Flood amount:"));
        if(isNaN(n)) return;
        for(let i=0; i<n; i++) history.pushState(0,0,i==n-1?window.location.href:i.toString());
    });

    // IP Finder
    addBtn(util,'IP Finder', ()=>{
        const ip = prompt("Enter IP:");
        if(ip){
            ['https://talosintelligence.com/reputation_center/lookup?search=',
             'https://www.virustotal.com/gui/ip-address/',
             'https://otx.alienvault.com/browse/global?section=All&q=',
             'https://censys.io/ipv4/',
             'https://www.shodan.io/search?query=',
             'https://www.abuseipdb.com/check/'].forEach(u => window.open(u + ip, '_blank'));
        }
    });

    // Password Looker
    addBtn(util,'Password Looker', ()=>{
        document.querySelectorAll('input[type=password]').forEach(i=>{
            if(!i.dataset.originalType) i.dataset.originalType=i.type; 
            i.type='text';
        });
    }, ()=>{
        document.querySelectorAll('input[type=text]').forEach(i=>{
            if(i.dataset.originalType) i.type=i.dataset.originalType;
        });
    });

    // Porta Proxy
    addBtn(util,'Porta Proxy', ()=>{
        const f = document.createElement('iframe');
        f.src = prompt("Enter URL:");
        Object.assign(f.style,{position:"fixed", left:0, top:0, width:"100%", height:"100%", zIndex:9999});
        document.body.appendChild(f); window.portaFrame=f;
    }, ()=>{
        if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }
    });

    // Kill Script
    addBtn(util,'Kill Script', ()=>fetch("https://raw.githubusercontent.com/Alex236508/Page-Killer/refs/heads/main/Website%20killer.js").then(r=>r.text()).then(eval));

    // Page Info Viewer
    addBtn(util,'Page Info Viewer', ()=>alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`));

    // Stop All Utilities
    addBtn(util,'Stop All Utilities', ()=>{
        for(let key in activeUtilities){
            if(activeUtilities[key].off) activeUtilities[key].off();
        }
    });

})(window.utilGUI);

  
// ---------- VFX GUI ----------
(function() {
    // ---------- Shell ----------
    if (!window.vfxGUI) {
        const gui = document.createElement('div');
        gui.id = 'vfxGUI';
        gui.style.cssText = `
            position: fixed;
            top: 50px;
            right: 50px;
            width: 320px;
            background: #1b1b1b;
            color: #00ff00;
            font-family: Consolas, monospace;
            padding: 10px;
            border: 2px solid #00ff00;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0,255,0,0.5);
            z-index: 999999;
            user-select: none;
            cursor: move;
        `;
        gui.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>VFX</b></div>';
        document.body.appendChild(gui);
        window.vfxGUI = gui;
    }

    // Storage for active effects
    if (!window.stopAllVFX) window.stopAllVFX = [];

    // Unified add button helper
    window.vfxAddBtn = function(text, on, off) {
        const btn = document.createElement('button');
        btn.textContent = text;
        btn.style.cssText = `
            display: block;
            width: 100%;
            margin: 4px 0;
            padding: 6px;
            background: #111;
            color: #0f0;
            border: 1px solid #0f0;
            border-radius: 4px;
            cursor: pointer;
        `;
        btn._active = false;
        btn.onclick = () => {
            if (btn._active) { btn._active = false; if (off) off(); }
            else { btn._active = true; if (on) on(); }
        };
        window.vfxGUI.appendChild(btn);
        return btn;
    };

    // ---------- Full Chaos ----------
    vfxAddBtn('Full Chaos', () => {
        if (window.fullChaosActive) return;
        window.fullChaosActive = true;

        const chaosContainer = document.createElement('div');
        chaosContainer.id = 'chaosContainer';
        chaosContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
        document.body.appendChild(chaosContainer);

        function randColor() { return '#' + Math.floor(Math.random()*16777215).toString(16); }
        function rand(n) { return Math.floor(Math.random()*n)+1; }

        const h = window.innerHeight;
        for (let i=0; i<h; i++){
            const bar = document.createElement('div');
            bar.id = 'chaosBar'+i;
            bar.style.cssText = `width:100%;height:1px;background:${randColor()};`;
            chaosContainer.appendChild(bar);
        }

        window.fullChaosLoop1 = setInterval(() => {
            for (let e=0; e<10; e++){
                const bar = document.getElementById('chaosBar'+rand(h));
                if (bar) { bar.style.backgroundColor = randColor(); bar.style.height = rand(4)+'px'; }
            }
            chaosContainer.style.backgroundColor = randColor();
            chaosContainer.style.transform = rand(256)>128 ? `scale(3) rotate(${rand(35)}deg)` : 'scale(1) rotate(0deg)';
            window.scrollTo(0, document.body.scrollHeight);
        }, 10);

        window.fullChaosLoop2 = setInterval(() => { window.scrollTo(0,0); }, 50);

        window.stopAllVFX.push(() => {
            clearInterval(window.fullChaosLoop1);
            clearInterval(window.fullChaosLoop2);
            const c = document.getElementById('chaosContainer');
            if (c) c.remove();
            window.fullChaosActive = false;
        });

    }, () => {
        clearInterval(window.fullChaosLoop1);
        clearInterval(window.fullChaosLoop2);
        const c = document.getElementById('chaosContainer');
        if (c) c.remove();
        window.fullChaosActive = false;
    });

    // ---------- VFX Extras ----------
    (function() {
        if (!window.vfxGUI) return;

        // Font color picker
        const colorSection = document.createElement('div');
        colorSection.style.cssText = 'margin-top:10px;padding:8px;background:#252525;border-radius:10px;color:#00ff00;';
        colorSection.innerHTML = '<b>Text Color</b><br>';

        const colorPicker = document.createElement('input');
        colorPicker.type = 'color';
        colorPicker.value = '#00ff00';
        colorPicker.oninput = () => {
            document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el => el.style.color = colorPicker.value);
        };

        colorSection.appendChild(colorPicker);
        window.vfxGUI.appendChild(colorSection);

        // Stop all button
        const stopBtn = document.createElement('button');
        stopBtn.textContent = 'STOP ALL';
        stopBtn.style.cssText = `
            position: fixed;
            bottom: 10px;
            left: 10px;
            padding: 5px 10px;
            background: red;
            color: #fff;
            font-family: monospace;
            z-index: 100000;
            cursor: pointer;
            border: none;
            border-radius: 4px;
        `;

        stopBtn.onclick = () => {
            if (window.stopAllVFX && window.stopAllVFX.length) {
                window.stopAllVFX.forEach(fn => { try{ fn(); } catch(e){} });
                window.stopAllVFX = [];
            }
            // Reset page styles
            document.body.style.transform = '';
            document.body.style.backgroundColor = '';
            document.body.style.filter = '';
            document.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *)').forEach(e => {
                e.style.transform = '';
                e.style.transition = '';
                e.style.backgroundColor = '';
                e.style.color = '';
                e.style.fontSize = '';
                e.style.position = '';
                e.style.left = '';
                e.style.top = '';
            });
        };

        document.body.appendChild(stopBtn);
    })();

    // ---------- Keyboard Shortcut ----------
    document.addEventListener('keydown', e => {
        if (e.shiftKey && e.key.toLowerCase() === 'h') {
            if (window.utilGUI) utilGUI.style.display = (utilGUI.style.display==='none')?'block':'none';
            if (window.vfxGUI) vfxGUI.style.display = (vfxGUI.style.display==='none')?'block':'none';
        }
    });

})();
