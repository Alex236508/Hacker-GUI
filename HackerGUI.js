(function(){
  if(window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  let overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:1000000;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#00ff00;font-family:Consolas,monospace;pointer-events:none;';
  let canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  overlay.appendChild(canvas);
  let msg = document.createElement('div');
  msg.innerText = '[ BOOTING SYSTEM... ]';
  msg.style.cssText = 'font-size:20px;margin-bottom:10px;z-index:1000001;text-shadow:0 0 5px #00ff00;';
  overlay.appendChild(msg);
  let loading = document.createElement('div');
  loading.style.cssText = 'font-size:24px;font-weight:bold;z-index:1000001;text-shadow:0 0 10px #00ff00;';
  loading.innerText = 'Loading 0%';
  overlay.appendChild(loading);
  document.body.appendChild(overlay);

  // Matrix rain for bootup
  let ctx = canvas.getContext('2d');
  let chars = '1010';
  let cols = Math.floor(canvas.width/10);
  let drops = [];
  for(let i=0;i<cols;i++) drops[i] = Math.floor(Math.random()*canvas.height);
  let rain = setInterval(()=>{
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0F0';
    ctx.font='10px monospace';
    for(let i=0;i<cols;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
      if(drops[i]*10>canvas.height && Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  },33);

  // Loading counter
  let progress = 0;
  let int = setInterval(()=>{
    progress++;
    loading.innerText = 'Loading '+progress+'%';
    if(progress>=100){
      clearInterval(int);
      setTimeout(()=>{
        loading.innerText='Welcome, Hacker';
        setTimeout(()=>{
          clearInterval(rain);
          overlay.remove();
          spawnGUIs();
        },2000);
      },500);
    }
  },40);
  
    // ---------- UTILITY ----------
    function createElement(tag, props = {}, parent = null) {
        const el = document.createElement(tag);
        Object.assign(el, props);
        if (parent) parent.appendChild(el);
        return el;
    }

    function addBtn(container, label, onClick) {
        if (!container) {
            console.error("Container not found:", container);
            return;
        }
        const btn = createElement("button", { textContent: label, className: "hacker-btn" }, container);
        btn.addEventListener("click", onClick);
        return btn;
    }

    // ---------- STYLES ----------
    const style = document.createElement("style");
    style.textContent = `
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
    `;
    document.head.appendChild(style);

    // ---------- OVERLAY & PANELS ----------
    const overlay = createElement("div", { className: "hacker-overlay" }, document.body);

    const mainPanel = createElement("div", { className: "hacker-panel" }, overlay);
    mainPanel.innerHTML = "<strong>Main Control Panel</strong>";

    const secondaryPanel = createElement("div", { className: "hacker-panel" }, overlay);
    secondaryPanel.innerHTML = "<strong>Secondary Panel</strong>";

    // ---------- GUI SPAWNER ----------
    function spawnGUIs() {
        // ---------- UTILITIES GUI ----------
let util = document.getElementById('utilitiesGUI');
if (!util) {
    util = document.createElement('div');
    util.id = 'utilitiesGUI';
    util.style.cssText = `
        position:fixed;
        top:50px;
        left:50px;
        width:320px;
        background:#1b1b1b;
        color:#00ff00;
        font-family:Consolas,monospace;
        padding:10px;
        border:2px solid #00ff00;
        border-radius:8px;
        box-shadow:0 0 15px rgba(0,255,0,0.5);
        z-index:999999;
        user-select:none;
        cursor:move;
    `;
    util.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
    document.body.appendChild(util);
}

// ---------- VFX GUI ----------
let vfx = document.getElementById('vfxGUI');
if (!vfx) {
    vfx = document.createElement('div');
    vfx.id = 'vfxGUI';
    vfx.style.cssText = `
        position:fixed;
        top:100px;
        left:400px;
        width:320px;
        background:#1b1b1b;
        color:#00ff00;
        font-family:Consolas,monospace;
        padding:10px;
        border:2px solid #00ff00;
        border-radius:8px;
        box-shadow:0 0 15px rgba(0,255,0,0.5);
        z-index:999999;
        user-select:none;
        cursor:move;
    `;
    vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>VFX</b></div>';
    document.body.appendChild(vfx);
}

// ---------- HELPER: BUTTON CREATION ----------
function addBtn(container, text, onClick) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
        display:block;
        width:100%;
        margin:4px 0;
        padding:6px;
        background:#000;
        color:#0f0;
        border:1px solid #0f0;
        border-radius:4px;
        cursor:pointer;
        font-family:Consolas,monospace;
    `;
    btn.onclick = onClick;
    container.appendChild(btn);
}

// ---------- Utilities Buttons ----------
(function(){
    const activeUtilities = {}; // Track ongoing effects

    function addBtn(container, name, on, off){
        const b = document.createElement('button');
        b.innerText = name;
        b.style.cssText = 'width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
        b.onclick = on;
        container.appendChild(b);
        if(off) activeUtilities[name] = { on, off };
    }

    const util = window.utilGUI;

    // ------------------ Buttons ------------------

    // Global Chat (Firebase)
    addBtn(util,'Global Chat',()=>{
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

        function loadFirebase(cb){
            const s1 = document.createElement('script');
            s1.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
            s1.onload = function(){
                const s2 = document.createElement('script');
                s2.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js";
                s2.onload = cb;
                document.head.appendChild(s2);
            };
            document.head.appendChild(s1);
        }

        loadFirebase(initChat);

        function initChat(){
            const app = firebase.initializeApp(firebaseConfig);
            const db = firebase.database();
            const username = prompt("Enter your chat username:","Anonymous") || "Anonymous";

            const chatBox = document.createElement('div');
            chatBox.style.cssText = `
                position:fixed; bottom:10px; right:10px;
                width:300px; height:400px;
                background:rgba(0,0,0,0.85); color:white;
                font-family:sans-serif; font-size:14px; padding:5px;
                border-radius:8px; z-index:999999;
                display:flex; flex-direction:column;
                resize:both; overflow:hidden; cursor:move;
            `;

            const header = document.createElement('div');
            header.style.cssText = `
                display:flex; justify-content:space-between; align-items:center;
                background:rgba(255,255,255,0.1); padding:3px 5px; cursor:move;
            `;
            const title = document.createElement('span'); title.innerText='Global Chat';
            const closeBtn = document.createElement('button'); closeBtn.innerText='×';
            closeBtn.style.cssText="background:none; border:none; color:white; font-size:16px; cursor:pointer;";
            closeBtn.onclick=function(){ chatBox.remove(); window.globalChatActive=false; };
            header.appendChild(title); header.appendChild(closeBtn);
            chatBox.appendChild(header);

            const messagesDiv = document.createElement('div');
            messagesDiv.style.cssText="flex:1; overflow:auto; margin:5px 0; padding-right:3px;";
            chatBox.appendChild(messagesDiv);

            const inputDiv = document.createElement('div'); inputDiv.style.cssText="display:flex;";
            const input = document.createElement('input'); input.type="text"; input.placeholder="Type a message...";
            input.style.cssText="flex:1; margin-right:5px;";
            const sendBtn = document.createElement('button'); sendBtn.innerText="Send";
            inputDiv.appendChild(input); inputDiv.appendChild(sendBtn);
            chatBox.appendChild(inputDiv);
            document.body.appendChild(chatBox);

            // Draggable
            header.onmousedown=function(e){
                const ox=e.clientX-chatBox.offsetLeft, oy=e.clientY-chatBox.offsetTop;
                function moveHandler(e){ chatBox.style.left=(e.clientX-ox)+'px'; chatBox.style.top=(e.clientY-oy)+'px'; chatBox.style.bottom='auto'; chatBox.style.right='auto'; }
                function upHandler(){ document.removeEventListener('mousemove',moveHandler); document.removeEventListener('mouseup',upHandler); }
                document.addEventListener('mousemove',moveHandler);
                document.addEventListener('mouseup',upHandler);
            };

            // Send message
            function sendMessage(){ 
                const text=input.value.trim(); 
                if(!text) return; 
                db.ref('messages').push({user:username,text,time:Date.now()}); 
                input.value=''; 
            }
            sendBtn.onclick=sendMessage;
            input.addEventListener('keydown',e=>{ if(e.key==='Enter') sendMessage(); });

            // Listen for messages
            db.ref('messages').limitToLast(50).on('child_added',snap=>{
                const msg=snap.val();
                const msgDiv=document.createElement('div');
                msgDiv.innerHTML=`<b>${msg.user}:</b> ${msg.text}`;
                messagesDiv.appendChild(msgDiv);
                messagesDiv.scrollTop=messagesDiv.scrollHeight;
            });
        }
    });

    // Developer Console (Eruda)
    addBtn(util,'Developer Console',()=>{
        if(!window.erudaLoaded){
            let s=document.createElement('script');
            s.src='https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
            document.body.appendChild(s);
            s.onload = ()=>{
                eruda.init();
                eruda.theme='Dark';
                window.erudaInstance = eruda;
                window.erudaLoaded = true;
            };
            window.erudaScript=s;
        } else { window.erudaInstance.show(); }
    },()=>{
        if(window.erudaInstance){ window.erudaInstance.destroy(); window.erudaInstance=null; window.erudaLoaded=false; }
        if(window.erudaScript){ window.erudaScript.remove(); window.erudaScript=null; }
    });

    // Page Dark Theme
    addBtn(util,'Page Dark Theme',()=>document.body.style.filter='invert(1)',()=>document.body.style.filter='');

    // Calculator
    addBtn(util,'Calculator',()=>{
        let _o;
        while((_o = prompt("Expression:",""))){
            try{ alert(eval(_o)); } catch(e){ alert(e); }
        }
    });

    // DNS Lookup
    addBtn(util,'DNS Lookup',()=>window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank'));

    // FPS Counter
    addBtn(util,'FPS Counter',()=>{
        if(!window.stats){
            let s=document.createElement('script');
            s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
            s.onload=()=>{
                window.stats=new Stats();
                document.body.appendChild(window.stats.dom);
                requestAnimationFrame(function loop(){ window.stats.update(); requestAnimationFrame(loop); });
            };
            document.head.appendChild(s);
        }
    },()=>{ if(window.stats){ window.stats.dom.remove(); window.stats=null; } });

    // History Flooder
    addBtn(util,'History Flooder',()=>{
        let n=parseInt(prompt("Flood amount:"));
        for(let i=0;i<n;i++){ history.pushState(0,0,i==n-1?window.location.href:i.toString()); }
    });

    // IP Finder
    addBtn(util,'IP Finder',()=>{
        let ip=prompt("Enter IP:");
        if(ip){
            ['https://talosintelligence.com/reputation_center/lookup?search=',
             'https://www.virustotal.com/gui/ip-address/',
             'https://otx.alienvault.com/browse/global?section=All&q=',
             'https://censys.io/ipv4/',
             'https://www.shodan.io/search?query=',
             'https://www.abuseipdb.com/check/'].forEach(u=>window.open(u+ip,'_blank'));
        }
    });

    // Password Looker
    addBtn(util,'Password Looker',()=>{
        document.querySelectorAll('input[type=password]').forEach(i=>{ if(!i.dataset.originalType) i.dataset.originalType=i.type; i.type='text'; });
    },()=>{ document.querySelectorAll('input[type=text]').forEach(i=>{ if(i.dataset.originalType) i.type=i.dataset.originalType; }); });

    // Porta Proxy
    addBtn(util,'Porta Proxy',()=>{
        let f=document.createElement('iframe');
        f.src=prompt("Enter URL:");
        Object.assign(f.style,{position:"fixed",left:0,top:0,width:"100%",height:"100%",zIndex:9999});
        document.body.appendChild(f); window.portaFrame=f;
    },()=>{ if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; } });

    // Kill Script
    addBtn(util,'Kill Script',()=>fetch("https://raw.githubusercontent.com/Alex236508/Page-Killer/refs/heads/main/Website%20killer.js").then(r=>r.text()).then(eval));

    // Page Info Viewer
    addBtn(util,'Page Info Viewer',()=>alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`));

    // Stop All Utilities
    addBtn(util,'Stop All Utilities',()=>{ for(let key in activeUtilities){ if(activeUtilities[key].off) activeUtilities[key].off(); } });

})();

// ---------- DRAG + LOCK ----------
let utilLock = addLockIcon(util);
let vfxLock = addLockIcon(vfx);
makeDraggable(util, utilLock);
makeDraggable(vfx, vfxLock);


// ---------- Shared Lock + Dragging ----------
function addLockIcon(container) {
    const lock = document.createElement('div');
    lock.innerHTML = '🔒'; // Change icon if you want
    lock.style.cssText = `
        position:absolute;
        top:5px;
        right:5px;
        cursor:pointer;
        user-select:none;
    `;
    container.appendChild(lock);
    return lock;
}

function makeDraggable(el, lock) {
    let isDragging = false;
    let offsetX, offsetY;

    el.addEventListener('mousedown', e => {
        if (e.target === lock) return;
        isDragging = true;
        offsetX = e.clientX - el.getBoundingClientRect().left;
        offsetY = e.clientY - el.getBoundingClientRect().top;
        el.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        el.style.left = (e.clientX - offsetX) + 'px';
        el.style.top = (e.clientY - offsetY) + 'px';
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        el.style.cursor = 'move';
    });
}


 // ---------- UTILITIES BUTTONS ----------
(function(){
const activeUtilities = {}; // Track ongoing effects

// Helper to add a button
function addBtn(container, name, on, off) {
const b = document.createElement('button');
b.innerText = name;
b.style.cssText = 'width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
b.onclick = on;
container.appendChild(b);
if(off) activeUtilities[name] = { on, off };
}

// ---------- Global Chat ----------
(function() {
    if (window.globalChatActive) return;
    window.globalChatActive = false;

    // Firebase config
    const firebaseConfig = {
        apiKey: "AIzaSyDlmPq4bMKdOFHMdfevEa3ctd4-3WQ4u7k",
        authDomain: "hacker-gui-global-chat.firebaseapp.com",
        databaseURL: "https://hacker-gui-global-chat-default-rtdb.firebaseio.com/",
        projectId: "hacker-gui-global-chat",
        storageBucket: "hacker-gui-global-chat.firebasestorage.app",
        messagingSenderId: "410978781234",
        appId: "1:410978781234:web:ee08f15ee9be48970c542b"
    };

    // Load Firebase compat scripts if not already loaded
    function loadFirebase(cb) {
        if (window.firebase && window.firebase.database) return cb();
        const s1 = document.createElement('script');
        s1.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js";
        s1.onload = function() {
            const s2 = document.createElement('script');
            s2.src = "https://www.gstatic.com/firebasejs/9.22.0/firebase-database-compat.js";
            s2.onload = cb;
            document.head.appendChild(s2);
        };
        document.head.appendChild(s1);
    }

    // Initialize chat
    function initChat() {
        if (window.globalChatActive) return;
        window.globalChatActive = true;

        const app = firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const messagesRef = db.ref('global-chat');

        // Ask username
        const username = prompt("Enter your chat username:", "Anonymous") || "Anonymous";

        // Create chat UI
        const chatBox = document.createElement('div');
        chatBox.id = 'globalChatContainer';
        chatBox.style.cssText = `
            position:fixed; bottom:10px; right:10px;
            width:300px; height:400px;
            background:rgba(0,0,0,0.85); color:white;
            font-family:sans-serif; font-size:14px;
            padding:5px; border-radius:8px; z-index:999999;
            display:flex; flex-direction:column; resize:both; overflow:hidden;
        `;

        const header = document.createElement('div');
        header.style.cssText = `
            display:flex; justify-content:space-between; align-items:center;
            background:rgba(255,255,255,0.1); padding:3px 5px; cursor:move;
        `;
        const title = document.createElement('span'); title.innerText = 'Global Chat';
        const closeBtn = document.createElement('button'); closeBtn.innerText = '×';
        closeBtn.style.cssText = "background:none; border:none; color:white; font-size:16px; cursor:pointer;";
        closeBtn.onclick = () => { chatBox.remove(); window.globalChatActive = false; };
        header.appendChild(title); header.appendChild(closeBtn);
        chatBox.appendChild(header);

        const messagesDiv = document.createElement('div');
        messagesDiv.style.cssText = "flex:1; overflow:auto; margin:5px 0; padding-right:3px;";
        chatBox.appendChild(messagesDiv);

        const inputDiv = document.createElement('div'); inputDiv.style.cssText = "display:flex;";
        const input = document.createElement('input'); input.type="text"; input.placeholder="Type a message...";
        input.style.cssText = "flex:1; margin-right:5px; padding:4px; border-radius:4px; border:none;";
        const sendBtn = document.createElement('button'); sendBtn.innerText="Send";
        inputDiv.appendChild(input); inputDiv.appendChild(sendBtn);
        chatBox.appendChild(inputDiv);

        document.body.appendChild(chatBox);

        // Drag support
        header.onmousedown = function(e) {
            const ox = e.clientX - chatBox.offsetLeft;
            const oy = e.clientY - chatBox.offsetTop;
            function moveHandler(e){ chatBox.style.left=(e.clientX-ox)+'px'; chatBox.style.top=(e.clientY-oy)+'px'; chatBox.style.bottom='auto'; chatBox.style.right='auto'; }
            function upHandler(){ document.removeEventListener('mousemove',moveHandler); document.removeEventListener('mouseup',upHandler); }
            document.addEventListener('mousemove', moveHandler);
            document.addEventListener('mouseup', upHandler);
        };

        // Send message
        function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            messagesRef.push({ user: username, text: text, time: Date.now() });
            input.value = '';
        }
        sendBtn.onclick = sendMessage;
        input.addEventListener('keydown', e => { if (e.key==='Enter') sendMessage(); });

        // Listen for messages
        messagesRef.limitToLast(50).on('child_added', snap => {
            const msg = snap.val();
            const msgDiv = document.createElement('div');
            msgDiv.innerHTML = `<b>${msg.user}:</b> ${msg.text}`;
            messagesDiv.appendChild(msgDiv);
            messagesDiv.scrollTop = messagesDiv.scrollHeight;
        });
    }

    // Add button to utilities GUI
    addBtn(utilGUI, 'Global Chat', initChat, () => {
        const chatEl = document.getElementById('globalChatContainer');
        if (chatEl) chatEl.remove();
        window.globalChatActive = false;
    });

    // Load Firebase and initialize
    loadFirebase(initChat);

})();
    
// Developer Console (Eruda)
addBtn(util, 'Developer Console', () => {
if (!window.erudaLoaded) {
let s = document.createElement('script');
s.src = 'https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
document.body.appendChild(s);
s.onload = () => {
eruda.init();
eruda.theme = 'Dark';
window.erudaInstance = eruda; // keep reference
window.erudaLoaded = true;
};
window.erudaScript = s; // keep script reference for removal
} else {
window.erudaInstance.show();
}
}, () => {
// off function for Stop All
if (window.erudaInstance) {
window.erudaInstance.destroy();
window.erudaInstance = null;
window.erudaLoaded = false;
}
if (window.erudaScript) {
window.erudaScript.remove();
window.erudaScript = null;
}
});


// Page Dark Theme
addBtn(util,'Page Dark Theme',()=>{
document.body.style.filter = 'invert(1)';
},()=>{
document.body.style.filter = '';
});

// Calculator
addBtn(util,'Calculator',()=>{
let _o;
while((_o = prompt("Expression:",""))){
try{ alert(eval(_o)); } catch(e){ alert(e); }
}
});

// ================= Web X-Ray Integration for Utilities GUI =================
function startXRaySafe() {
if (window.webXrayUI) return; // already running

function init() {
// Ensure jQuery is loaded
if (!window.jQuery) {
const s = document.createElement('script');
s.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
s.onload = init; // try again after load
document.head.appendChild(s);
return;
}

// Ensure Web X-Ray script loaded
if (!window.Localized || !jQuery.xRayUI) {
const s = document.createElement('script');
s.src = 'https://goggles.mozilla.org/webxray.js';
s.onload = init; // try again after load
document.head.appendChild(s);
return;
}

// Ensure body exists
if (!document.body) {
setTimeout(init, 50);
return;
}

try {
// Initialize X-Ray
const ui = jQuery.xRayUI({ eventSource: document });
window.webXrayUI = ui;
ui.start();

window.addEventListener('beforeunload', () => {
if (ui) ui.unload();
});
} catch(e) {
console.error('Web X-Ray initialization failed:', e);
}
}

if (document.readyState === 'complete') {
init();
} else {
window.addEventListener('load', init);
}
}


// DNS Lookup
addBtn(util,'DNS Lookup',()=>{ 
window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank'); 
});

// FPS Counter
addBtn(util,'FPS Counter',()=>{
if(!window.stats){
let s=document.createElement('script');
s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';
s.onload=()=>{
window.stats=new Stats();
document.body.appendChild(window.stats.dom);
requestAnimationFrame(function loop(){ window.stats.update(); requestAnimationFrame(loop); });
};
document.head.appendChild(s);
}
},()=>{
if(window.stats){ window.stats.dom.remove(); window.stats=null; }
});

// History Flooder
addBtn(util,'History Flooder',()=>{
let n = parseInt(prompt("Flood amount:"));
for(let i=0;i<n;i++){
history.pushState(0,0,i==n-1?window.location.href:i.toString());
}
});

// IP Finder
addBtn(util,'IP Finder',()=>{
let ip = prompt("Enter IP:");
if(ip){
['https://talosintelligence.com/reputation_center/lookup?search=',
'https://www.virustotal.com/gui/ip-address/',
'https://otx.alienvault.com/browse/global?section=All&q=',
'https://censys.io/ipv4/',
'https://www.shodan.io/search?query=',
'https://www.abuseipdb.com/check/'].forEach(u=>window.open(u+ip,'_blank'));
}
});

// Password Looker
addBtn(util,'Password Looker',()=>{
document.querySelectorAll('input[type=password]').forEach(i=>{
if(!i.dataset.originalType) i.dataset.originalType = i.type;
i.type = 'text';
});
},()=>{
document.querySelectorAll('input[type=text]').forEach(i=>{
if(i.dataset.originalType) i.type = i.dataset.originalType;
});
});

// Porta Proxy
addBtn(util,'Porta Proxy',()=>{
let f = document.createElement('iframe');
f.src = prompt("Enter URL:");
Object.assign(f.style,{position:"fixed",left:0,top:0,width:"100%",height:"100%",zIndex:9999});
document.body.appendChild(f);
window.portaFrame = f;
},()=>{
if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }
});

// Kill Script
addBtn(util,'Kill Script',()=>{
fetch("https://raw.githubusercontent.com/Alex236508/Page-Killer/refs/heads/main/Website%20killer.js")
.then(r=>r.text())
.then(eval);
});

// Page Info Viewer
addBtn(util,'Page Info Viewer',()=>{
alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`);
});

// Stop All Utilities
addBtn(util,'Stop All Utilities',()=>{
for(let key in activeUtilities){
if(activeUtilities[key].off) activeUtilities[key].off();
}
});

})();

// -------------------- FONT SIZE SLIDER --------------------
(function(){
const section = document.createElement('div');
section.style.marginTop = '10px';
section.style.padding = '8px';
section.style.background = '#252525';
section.style.borderRadius = '10px';
section.style.color = '#00ff00';
section.innerHTML = `<b>Font Size</b><br>`;
const slider = document.createElement('input');
slider.type = 'range';
slider.min = '10';
slider.max = '50';
slider.value = '16';
slider.style.width = '100%';
slider.oninput = () => {
document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el => el.style.fontSize = slider.value + 'px');
};
section.appendChild(slider);
util.appendChild(section);
})();
  
// Reuse existing vfxGUI
vfxGUI.style.cssText='position:fixed;top:100px;left:350px;width:200px;background:#111;color:#0f0;z-index:999999;padding:5px;';
makeDraggable(vfxGUI,'vfxLock');
document.body.appendChild(vfxGUI);

  // ---------- VFX GUI ----------
if (!window.vfxGUI) {
    window.vfxGUI = document.createElement('div');
    window.vfxGUI.id = 'vfxGUI';
    window.vfxGUI.style.cssText = `
        position:fixed;
        top:50px;
        right:50px;
        width:320px;
        background:#1b1b1b;
        color:#00ff00;
        font-family:Consolas,monospace;
        padding:10px;
        border:2px solid #00ff00;
        border-radius:8px;
        box-shadow:0 0 15px rgba(0,255,0,0.5);
        z-index:999999;
        user-select:none;
        cursor:move;
    `;
    window.vfxGUI.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>VFX</b></div>';
    document.body.appendChild(window.vfxGUI);
    makeDraggable(window.vfxGUI, addLockIcon(window.vfxGUI));
}

// Utility function to create buttons
function addBtn(parent, text, on, off) {
    const btn = document.createElement('button');
    btn.textContent = text;
    btn.style.cssText = `
        display:block;
        width:100%;
        margin:4px 0;
        padding:6px;
        background:#111;
        color:#0f0;
        border:1px solid #0f0;
        border-radius:4px;
        cursor:pointer;
    `;
    btn.onclick = () => {
        if (btn._active) { btn._active = false; if (off) off(); }
        else { btn._active = true; if (on) on(); }
    };
    parent.appendChild(btn);
}

// ---------- VFX Buttons ----------

addBtn(window.vfxGUI,'3D Page',()=>{
    if(!window.triScript){
        let s=document.createElement('script');
        s.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js';
        document.body.appendChild(s);
        window.triScript=s;
    }
},()=>{
    if(window.triScript){window.triScript.remove();window.triScript=null;}
});

addBtn(window.vfxGUI,'Explode Page',()=>{
    if(window.explodeActive) return;
    window.explodeActive=true;
    let o=document.createElement('div');
    o.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;';
    document.body.appendChild(o);
    let c=3; o.innerText=c;
    window.explodeInt=setInterval(()=>{
        c--;
        if(c>0){ o.innerText=c; } 
        else{
            clearInterval(window.explodeInt); o.remove();
            document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
                e.style.transition='transform 1s ease-out';
                let x=(Math.random()-0.5)*1000,
                    y=(Math.random()-0.5)*1000,
                    z=(Math.random()-0.5)*200;
                e.style.transform=`translate3d(${x}px,${y}px,${z}px) rotate(${Math.random()*720-360}deg)`;
            });
            setTimeout(()=>{
                document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
                    e.style.transform='';
                    e.style.transition='';
                });
                window.explodeActive=false;
            },1500);
        }
    },1000);
},()=>{
    clearInterval(window.explodeInt); window.explodeInt=null; window.explodeActive=false;
    document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
        e.style.transform=''; e.style.transition='';
    });
});

addBtn(window.vfxGUI,'Image Glitch',()=>{
    if(window.imgGlitchInt) return;
    window.imgGlitchInt=setInterval(()=>{
        document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
            e.style.position='absolute';
            e.style.left=Math.random()*window.innerWidth+'px';
            e.style.top=Math.random()*window.innerHeight+'px';
        });
    },50);
},()=>{
    if(window.imgGlitchInt){clearInterval(window.imgGlitchInt); window.imgGlitchInt=null;
        document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
            e.style.position=''; e.style.left=''; e.style.top='';
        });
    }
});

addBtn(window.vfxGUI,'Random Link Redirects',()=>{
    window.linkRedirectsInt=setInterval(()=>{
        document.querySelectorAll('a:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(a=>{
            a.href=['https://longdogechallenge.com/','https://puginarug.com/','https://onesquareminesweeper.com/'][Math.floor(Math.random()*3)];
        });
    },500);
},()=>{
    clearInterval(window.linkRedirectsInt);
});

addBtn(window.vfxGUI,'Matrix Rain',()=>{
    if(window.matrixActive) return;
    window.matrixActive=true;
    if(!window.matrixCanvas){
        let c=document.createElement('canvas');
        c.width=window.innerWidth; c.height=window.innerHeight;
        c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none';
        document.body.appendChild(c);
        window.matrixCanvas=c;
        let ctx=c.getContext('2d');
        let chars='1010';
        let cols=Math.floor(window.innerWidth/10);
        let drops=[]; for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*c.height);
        window.matrixInt=setInterval(()=>{
            ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(0,0,c.width,c.height);
            ctx.fillStyle='#0F0'; ctx.font='10px monospace';
            for(let i=0;i<cols;i++){
                ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
                if(drops[i]*10>c.height && Math.random()>0.975) drops[i]=0;
                drops[i]++;
            }
        },33);
    }
},()=>{
    clearInterval(window.matrixInt); window.matrixInt=null;
    if(window.matrixCanvas){window.matrixCanvas.remove(); window.matrixCanvas=null;}
    window.matrixActive=false;
});

addBtn(window.vfxGUI,'Glitch',()=>{
    if(window.glitchActive) return;
    window.glitchActive=true;
    window.glitchInt=setInterval(()=>{
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
        });
    },25);
},()=>{
    if(window.glitchInt){clearInterval(window.glitchInt); window.glitchInt=null; window.glitchActive=false;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
    }
});

addBtn(window.vfxGUI,'Smooth Disco',()=>{
    if(window.discoSmoothActive) return;
    window.discoSmoothActive=true;
    let colors="red orange yellow green blue purple pink".split(" "),i=0;
    window.discoSmoothInt=setInterval(()=>{
        i>=colors.length?i=0:i++;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.transition="background-color 1s"; e.style.backgroundColor=colors[i];
        });
    },1000);
},()=>{
    if(window.discoSmoothInt){clearInterval(window.discoSmoothInt); window.discoSmoothInt=null; window.discoSmoothActive=false;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
    }
});

// Text Corruption
addBtn(window.vfxGUI,'Text Corruption',()=>{
    if(window.textCorruptStyle) return;
    let s = document.createElement('style'); 
    s.id = 'textCorruptStyle'; 
    s.innerHTML = `
       body { background:black !important; }
       body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *) {
         color: green !important;
         font-family: Courier New, monospace !important;
       }
       p, span, li, h1, h2, h3, h4, h5, h6 {
         font-size: 16px !important;
         text-shadow: 1px 1px #FF0000 !important;
       }
       #vfxGUI,#utilitiesGUI{animation:none !important;}
     `; 
    document.head.appendChild(s); 
    window.textCorruptStyle = s;
},()=>{
    if(window.textCorruptStyle){window.textCorruptStyle.remove(); window.textCorruptStyle=null;}
});

// Bubble Text
addBtn(window.vfxGUI,'Bubble Text',()=>{
    if(window.bubbleActive) return;
    window.bubbleActive = true;
    if(!window.originalTextMap) window.originalTextMap = new Map();

    const bubbleMap = {
        a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ',
        A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ',
        '0':'⓪','1':'①','2':'②','3':'③','4':'④','5':'⑤','6':'⑥','7':'⑦','8':'⑧','9':'⑨'
    };

    function transform(node){
        if(!node) return;
        if(node.nodeType === Node.ELEMENT_NODE){
            try{if(node.id==='vfxGUI'||node.id==='utilitiesGUI'||(node.closest && node.closest('#vfxGUI,#utilitiesGUI'))) return;}catch(e){return;}
            node.childNodes.forEach(transform);
            return;
        }
        if(node.nodeType === Node.TEXT_NODE){
            const txt = node.nodeValue;
            if(!txt || !txt.trim()) return;
            const parent = node.parentElement;
            if(parent){try{if(parent.closest && parent.closest('#vfxGUI,#utilitiesGUI')) return;}catch(e){return;}}
            if(!window.originalTextMap.has(node)) window.originalTextMap.set(node, txt);
            node.nodeValue = txt.replace(/[a-zA-Z0-9]/g, ch => bubbleMap[ch] || ch);
        }
    }

    transform(document.body);

    const cleanup = () => {
        if(window.originalTextMap){
            window.originalTextMap.forEach((orig, textNode)=>{try{textNode.nodeValue = orig;}catch(e){}});
            window.originalTextMap = null;
        }
        window.bubbleActive=false;
    };
    window._bubbleCleanup = cleanup;
    if(!window.stopAllVFX) window.stopAllVFX = [];
    window.stopAllVFX.push(cleanup);
},()=>{
    if(window._bubbleCleanup){window._bubbleCleanup(); window._bubbleCleanup=null;}
});

// Page Spin
addBtn(window.vfxGUI,'Page Spin',()=>{
    if(window.pageSpinActive) return;
    window.pageSpinActive=true;
    let s=document.createElement('style');
    s.id='pageSpinStyle';
    s.innerHTML='@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#vfxGUI):not(#utilitiesGUI){animation:roll 140s linear 360;} body > *:not(#vfxGUI):not(#utilitiesGUI) *{animation:roll 140s linear 360;}';
    document.head.appendChild(s);
    window.pageSpinStyle=s;
},()=>{
    if(window.pageSpinStyle){window.pageSpinStyle.remove();window.pageSpinStyle=null;}
    window.pageSpinActive=false;
});

// Full Chaos
addBtn(window.vfxGUI, 'Full Chaos', () => {
    if (!window.fullChaosActive) {
        window.fullChaosActive = true;
        let chaosContainer = document.createElement('div');
        chaosContainer.id = 'chaosContainer';
        chaosContainer.style.cssText = `
             position:fixed;
             top:0; left:0;
             width:100%; height:100%;
             pointer-events:none;
             z-index:99998;
        `;
        document.body.appendChild(chaosContainer);

        function randColor() { return '#' + Math.floor(Math.random() * 16777215).toString(16); }
        function rand(n) { return Math.floor(Math.random()*n)+1; }

        let h = window.innerHeight;
        for (let i=0;i<h;i++){
            let bar = document.createElement('div');
            bar.id = 'chaosBar'+i;
            bar.style.cssText=`width:100%; height:1px; background:${randColor()};`;
            chaosContainer.appendChild(bar);
        }

        window.fullChaosLoop1 = setInterval(()=>{
            for(let e=0;e<10;e++){
                let bar = document.getElementById('chaosBar'+rand(h));
                if(bar){bar.style.backgroundColor=randColor(); bar.style.height=rand(4)+'px';}
            }
            chaosContainer.style.backgroundColor=randColor();
            chaosContainer.style.transform = rand(256)>128?`scale(3) rotate(${rand(35)}deg)`:'scale(1) rotate(0deg)';
            window.scrollTo(0, document.body.scrollHeight);
        },10);

        window.fullChaosLoop2 = setInterval(()=>{window.scrollTo(0,0);},50);

        if(!window.stopAllVFX) window.stopAllVFX=[];
        window.stopAllVFX.push(()=>{
            clearInterval(window.fullChaosLoop1);
            clearInterval(window.fullChaosLoop2);
            let c=document.getElementById('chaosContainer');
            if(c) c.remove();
            window.fullChaosActive=false;
        });
    } else {
        clearInterval(window.fullChaosLoop1);
        clearInterval(window.fullChaosLoop2);
        let c=document.getElementById('chaosContainer');
        if(c) c.remove();
        window.fullChaosActive=false;
    }
});

// -------------------- FONT COLOR SLIDER --------------------
(function(){
const section = document.createElement('div');
section.style.marginTop = '10px';
section.style.padding = '8px';
section.style.background = '#252525';
section.style.borderRadius = '10px';
section.style.color = '#00ff00';
section.innerHTML = `<b>Text Color</b><br>`;
const picker = document.createElement('input');
picker.type = 'color';
picker.value = '#00ff00';
picker.oninput = () => {
document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el => el.style.color = picker.value);
};
section.appendChild(picker);
vfx.appendChild(section);
})();
      // ---------- STOP ALL BUTTON ----------
  const stopAllBtn = document.createElement('button');
  stopAllBtn.textContent='STOP ALL';
  stopAllBtn.style.cssText='position:fixed;bottom:10px;left:10px;padding:5px;background:red;color:#fff;z-index:100000;';
  stopAllBtn.onclick=()=>{ stopAllIntervals(); // Stop all VFX
if (window.matrixInt) { clearInterval(window.matrixInt); window.matrixInt = null; }
if (window.matrixCanvas) { window.matrixCanvas.remove(); window.matrixCanvas = null; }
window.matrixActive = false;

if (window.pageSpinStyle) { window.pageSpinStyle.remove(); window.pageSpinStyle = null; }
window.pageSpinActive = false;

if (window.discoSmoothInt) { clearInterval(window.discoSmoothInt); window.discoSmoothInt = null; }
window.discoSmoothActive = false;

if (window.glitchInt) { clearInterval(window.glitchInt); window.glitchInt = null; }
window.glitchActive = false;

if (window.fullChaosLoop1) { clearInterval(window.fullChaosLoop1); window.fullChaosLoop1 = null; }
if (window.fullChaosLoop2) { clearInterval(window.fullChaosLoop2); window.fullChaosLoop2 = null; }
window.fullChaosActive = false;
const chaosContainer = document.getElementById('chaosContainer');
if (chaosContainer) chaosContainer.remove();

if (window.imgGlitchInt) { clearInterval(window.imgGlitchInt); window.imgGlitchInt = null; }
document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
    e.style.position = '';
    e.style.left = '';
    e.style.top = '';
});

if (window.textCorruptStyle) { window.textCorruptStyle.remove(); window.textCorruptStyle = null; }
if (window._bubbleCleanup) { window._bubbleCleanup(); window._bubbleCleanup = null; }
window.bubbleActive = false;

// Reset page transforms, colors, filters
document.body.style.transform = '';
document.body.style.backgroundColor = '';
document.body.style.filter = '';
document.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
    e.style.backgroundColor = '';
    e.style.height = '';
    e.style.transform = '';
    e.style.transition = '';
    e.style.color = '';
    e.style.fontSize = '';
    e.style.position = '';
    e.style.left = '';
    e.style.top = '';
});
 };
  document.body.appendChild(stopAllBtn);
// ---------- KEYBOARD SHORTCUT ----------
  document.addEventListener('keydown', e=>{
    if(e.shiftKey && e.key.toLowerCase()==='h'){
      utilGUI.style.display = (utilGUI.style.display==='none')?'block':'none';
      vfxGUI.style.display = (vfxGUI.style.display==='none')?'block':'none';
    }
  });

})();
