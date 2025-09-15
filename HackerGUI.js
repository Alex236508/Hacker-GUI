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
        loading.innerText='Welcome Hacker';
        setTimeout(()=>{
          clearInterval(rain);
          overlay.remove();
          spawnGUIs();
        },2000);
      },500);
    }
  },40);

  // ---------- MAIN FUNCTION TO SPAWN GUIs ----------
  function spawnGUIs() {
    // -------------------- UTILITIES GUI --------------------
    const util = document.createElement('div');
  util.id = 'utilitiesGUI';
  util.style.cssText = `
    position:fixed;top:50px;left:50px;width:280px;
    background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;
    padding:10px;border:2px solid #00ff00;border-radius:8px;
    box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;
    user-select:none;cursor:move;
  `;
  util.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
  document.body.appendChild(util);
    // -------------------- VFX GUI --------------------
    const vfx = document.createElement('div');
  vfx.id = 'vfxGUI';
  vfx.style.cssText = `
    position:fixed;top:50px;right:50px;width:320px;
    background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;
    padding:10px;border:2px solid #00ff00;border-radius:8px;
    box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;
    user-select:none;cursor:move;
  `;
  vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
  document.body.appendChild(vfx);

    // -------------------- BUTTON HELPER --------------------
     function addBtn(container,name,on,off){
  const b=document.createElement('button');
  b.innerText=name;
  b.style.cssText='width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
  b.onclick=on;
  container.appendChild(b);
  }

    // -------------------- ADD LOCK ICON --------------------
     function addLockIcon(gui){
    const lock = document.createElement('div');
    lock.innerText = '🔓';
    lock.style.cssText = 'position:absolute;top:5px;right:5px;font-size:16px;cursor:pointer;user-select:none;';
    lock.locked = false;
    lock.onclick = () => {
      lock.locked = !lock.locked;
      lock.innerText = lock.locked ? '🔒' : '🔓';
    };
    gui.appendChild(lock);
    return lock;
  }
  let utilLock = addLockIcon(util);
  let vfxLock = addLockIcon(vfx);

     // -------------------- DRAGGING --------------------
function makeDraggable(g, lock){
  g.style.position = 'fixed'; 
  g.onmousedown = function(e){
    if(lock.locked) return; 
    let ox = e.clientX - g.getBoundingClientRect().left,
        oy = e.clientY - g.getBoundingClientRect().top;
    function move(e){
      let x = e.clientX - ox;
      let y = e.clientY - oy;
      x = Math.max(0, Math.min(window.innerWidth - g.offsetWidth, x));
      y = Math.max(0, Math.min(window.innerHeight - g.offsetHeight, y));
      g.style.left = x + 'px';
      g.style.top = y + 'px';
      g.style.right = 'auto';
      g.style.bottom = 'auto';
    }
    function up(){
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mouseup', up);
    }
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
  };
}


makeDraggable(util, utilLock);
makeDraggable(vfx, vfxLock);

    // ---------- UTILITIES BUTTONS ----------
(function(){
    const activeUtilities = {};

    // Helper to add a button
    function addBtn(container, name, on, off) {
        const b = document.createElement('button');
        b.innerText = name;
        b.style.cssText = 'width:100%;margin:2px 0;background:#252525;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
        b.onclick = on;
        container.appendChild(b);
        if(off) activeUtilities[name] = { on, off };
    }

    addBtn(util, 'Embedded Browser', () => {
    // If the browser already exists, just toggle visibility
    const existingBrowser = document.getElementById('embeddedBrowserContainer');
    if (existingBrowser) {
        if (existingBrowser.style.display === 'none') {
            existingBrowser.style.display = 'block';
        } else {
            existingBrowser.style.display = 'none';
        }
        return;
    }

    // Otherwise, load it for the first time
    fetch('https://raw.githubusercontent.com/Alex236508/EmbeddedBrowser/refs/heads/main/Browser.js')
        .then(r => r.text())
        .then(t => {
            eval(t);

            // Optional: mark it as loaded
            window.browserLoaded = true;

            // Make the browser immune to all VFX
            if (!window.immuneChats) window.immuneChats = [];
            const browserEl = document.getElementById('embeddedBrowserContainer');
            if (browserEl && !window.immuneChats.includes(browserEl)) {
                window.immuneChats.push(browserEl);
            }
        })
        .catch(err => {
            console.error('Failed to load Embedded Browser:', err);
        });
});

  
// ---------- Global Chat (Firebase) ----------
addBtn(util, 'Global Chat', () => {
    if (window.chatActive) return;
    window.chatActive = true;

    const loadFirebase = () => {
    if (!window.firebase) {
        const s1 = document.createElement('script');
        s1.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
        s1.onload = () => {
            const s2 = document.createElement('script');
            s2.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
            s2.onload = () => {
                const s3 = document.createElement('script');
                s3.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-storage-compat.js';
                s3.onload = initChat;
                document.body.appendChild(s3);
            };
            document.body.appendChild(s2); // <--- THIS WAS MISSING
        };
        document.body.appendChild(s1);
    } else {
        initChat();
    }
};


    loadFirebase();

    async function getUsername(db) {
    let name;
    while (!name) {
        name = prompt("Enter your username for chat:");
        if (!name) return null; // user pressed Cancel or left blank
        const snapshot = await db.ref('users').get(); // get all users
        const existingUsers = snapshot.exists() ? Object.keys(snapshot.val()) : [];
        // Case-insensitive check
        if (existingUsers.some(u => u.toLowerCase() === name.toLowerCase())) {
            alert("Username already taken! Pick another one.");
            name = null;
            continue;
        }
        // Save the username as typed
        db.ref('users/' + name).set(true);
    }
    return name;
}

    async function initChat() {
        const firebaseConfig = {
            apiKey: "AIzaSyDlmPq4bMKdOFHMdfevEa3ctd4-3WQ4u7k",
            authDomain: "hacker-gui-global-chat.firebaseapp.com",
            databaseURL: "https://hacker-gui-global-chat-default-rtdb.firebaseio.com",
            projectId: "hacker-gui-global-chat",
            storageBucket: "hacker-gui-global-chat.appspot.com",
            messagingSenderId: "410978781234",
            appId: "1:410978781234:web:ee08f15ee9be48970c542b",
            measurementId: "G-SB0B1FLF29"
        };
        if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
        const db = firebase.database();
        const storage = firebase.storage();


        const username = await getUsername(db);
if (!username) {
    window.chatActive = false; // stop chat initialization
    return; // exit, no chat created
}


        // ---------- Chat Window ----------
        const chat = document.createElement('div');
        chat.id = 'globalChatContainer';
        chat.style.cssText = `
            position:fixed; bottom:50px; right:50px;
            width:300px; height:400px;
            background:rgba(0,0,0,0.90);
            color:#0f0; font-family:monospace;
            border-radius:8px; z-index:10000000; display:flex; flex-direction:column;
            user-select:none; overflow:hidden;
        `;
        document.body.appendChild(chat);

        // Rainbow Pulsing Glow Border
const chatBox = document.getElementById('globalChatContainer');
if(chatBox){
    const oldStyle = document.getElementById('rainbowGlowStyle');
    if(oldStyle) oldStyle.remove();

    const style = document.createElement('style');
    style.id = 'rainbowGlowStyle';
    style.innerHTML = `
        #globalChatContainer {
            position: relative;
            border-radius: 8px;
            border: 4px solid;
            padding: 2px;
            background-clip: padding-box;
            animation: rainbowBorder 6s linear infinite, rainbowGlow 6s ease-in-out infinite alternate;
            border-image-slice: 1;
        }

        @keyframes rainbowBorder {
            0%   { border-image-source: linear-gradient(90deg, red, orange, yellow, green, blue, purple); }
            20%  { border-image-source: linear-gradient(90deg, orange, yellow, green, blue, purple, red); }
            40%  { border-image-source: linear-gradient(90deg, yellow, green, blue, purple, red, orange); }
            60%  { border-image-source: linear-gradient(90deg, green, blue, purple, red, orange, yellow); }
            80%  { border-image-source: linear-gradient(90deg, blue, purple, red, orange, yellow, green); }
            100% { border-image-source: linear-gradient(90deg, red, orange, yellow, green, blue, purple); }
        }

        @keyframes rainbowGlow {
            0%   { box-shadow: 0 0 10px red, 0 0 20px red; }
            16%  { box-shadow: 0 0 15px orange, 0 0 30px orange; }
            33%  { box-shadow: 0 0 20px yellow, 0 0 40px yellow; }
            50%  { box-shadow: 0 0 25px green, 0 0 50px green; }
            66%  { box-shadow: 0 0 30px blue, 0 0 60px blue; }
            83%  { box-shadow: 0 0 25px purple, 0 0 50px purple; }
            100% { box-shadow: 0 0 10px red, 0 0 20px red; }
        }
    `;
    document.head.appendChild(style);
}


        // ---------- Close Button ----------
        const closeBtn = document.createElement('div');
        closeBtn.innerText = '✖';
        closeBtn.style.cssText = `
            position:absolute; top:5px; right:5px; cursor:pointer;
            font-weight:bold; font-size:16px; z-index:10000002;
        `;
        chat.appendChild(closeBtn);

        // ---------- Messages ----------
        const messagesDiv = document.createElement('div');
        messagesDiv.style.cssText = 'flex:1; overflow-y:auto; padding:5px;';
        chat.appendChild(messagesDiv);

        // ---------- Input + Upload ----------
const inputWrapper = document.createElement('div');
inputWrapper.style.cssText = 'display:flex;align-items:center;background:black;';

const input = document.createElement('input');
input.type = 'text';
input.placeholder = 'Type a message...';
input.style.cssText = 'flex:1;border:none;outline:none;padding:5px;background:black;color:#0f0;';

const uploadBtn = document.createElement('button');
uploadBtn.textContent = '📎';
uploadBtn.style.cssText = 'background:black;color:#0f0;border:none;cursor:pointer;font-size:16px;padding:5px;';

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*,video/*,.gif';
fileInput.style.display = 'none';

uploadBtn.onclick = () => fileInput.click();

inputWrapper.appendChild(input);
inputWrapper.appendChild(uploadBtn);
chat.appendChild(inputWrapper);
chat.appendChild(fileInput);
      // ------------------- Send text messages -------------------
input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && input.value.trim()) {
        const msg = input.value.trim();
        db.ref('messages').push({ 
            user: username, 
            text: msg, 
            timestamp: Date.now()
        });
        input.value = '';
    }
});

// ------------------- Handle file uploads -------------------
fileInput.addEventListener('change', async () => {
    const file = fileInput.files[0];
    if (!file) return;

    try {
        const fileRef = storage.ref('uploads/' + Date.now() + "_" + file.name);
        await fileRef.put(file);
        const fileURL = await fileRef.getDownloadURL();

        db.ref('messages').push({
            user: username,
            text: '',
            file: fileURL,
            fileType: file.type,
            timestamp: Date.now()
        });
    } catch (err) {
        console.error("Upload failed:", err);
        alert("Failed to upload file. Try again.");
    }

    fileInput.value = ''; // reset input after upload
});

// ------------------- Listen for new messages -------------------
db.ref('messages').on('child_added', snap => {
    const msg = snap.val();
    addMessage(msg.user, msg.text, msg.timestamp, username, msg.file, msg.fileType);
});

        // ---------- Resizable ----------
const resizeHandle = document.createElement('div');
resizeHandle.style.cssText = `
    width:10px; height:10px; background:#0f0;
    position:absolute; bottom:2px; right:2px; cursor:se-resize; z-index:10000003;
`;
chat.appendChild(resizeHandle);

resizeHandle.addEventListener('mousedown', e => {
    e.stopPropagation(); // stop drag
    e.preventDefault();

    const startWidth = chat.offsetWidth;
    const startHeight = chat.offsetHeight;
    const startX = e.clientX;
    const startY = e.clientY;

    function onMouseMove(e) {
        chat.style.width = startWidth + (e.clientX - startX) + 'px';
        chat.style.height = startHeight + (e.clientY - startY) + 'px';
    }

    function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

// ---------- Draggable ----------
function makeDraggable(g, lock, ignore = []) {
    g.style.position = 'fixed';
    g.addEventListener('mousedown', e => {
        if (lock.locked) return;
        // Ignore if starting on resize handle or any ignored elements
        if (ignore.some(el => el.contains(e.target))) return;

        let ox = e.clientX - g.getBoundingClientRect().left;
        let oy = e.clientY - g.getBoundingClientRect().top;

        function move(e) {
            let x = e.clientX - ox;
            let y = e.clientY - oy;
            x = Math.max(0, Math.min(window.innerWidth - g.offsetWidth, x));
            y = Math.max(0, Math.min(window.innerHeight - g.offsetHeight, y));
            g.style.left = x + 'px';
            g.style.top = y + 'px';
            g.style.right = 'auto';
            g.style.bottom = 'auto';
        }

        function up() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', up);
        }

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
    });
}

// Use the drag function, ignoring the resize handle
makeDraggable(chat, { locked: false }, [resizeHandle]);

        // ---------- Firebase Messaging ----------
function getUserColor(user, currentUser) {
    if (user.toLowerCase() === currentUser.toLowerCase()) {
        return "#00ff00"; // bright green for your own messages
    }

    const colors = [
        "#00ffff", // cyan
        "#ffff00", // yellow
        "#ff00ff", // magenta
        "#ff4500", // orange-red
        "#1e90ff", // dodger blue
        "#FF0000", // Red
        "#ff1493", // deep pink
        "#7fff00", // chartreuse
        "#FF5F1F", // safety orange
        "#7FFFD4", // aquamarine
        "#8B0000", // blood red
    ];

    let hash = 0;
    for (let i = 0; i < user.length; i++) {
        hash = user.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
}

      // Messaging w/ video and images
function addMessage(user, text, timestamp, currentUser, file, fileType) {
    const color = getUserColor(user, currentUser);
    const time = new Date(timestamp).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });

    const msgDiv = document.createElement('div');
    msgDiv.style.color = color;

    const timestampSpan = document.createElement('span');
    timestampSpan.textContent = time;
    timestampSpan.style.color = '#888';
    timestampSpan.style.marginRight = '6px';
    timestampSpan.style.fontSize = '0.8em';

    const userSpan = document.createElement('span');
    userSpan.textContent = `${user}: `;

    msgDiv.appendChild(timestampSpan);
    msgDiv.appendChild(userSpan);

    if (file) {
        const type = (fileType || "").toLowerCase();

        // IMAGE
if (type.startsWith("image/") || file.match(/\.(png|jpe?g|gif|webp)$/i)) {
    const img = document.createElement('img');
    img.src = file;
    img.style.maxWidth = "100%";
    img.style.borderRadius = "4px";
    msgDiv.appendChild(img);
} 
// VIDEO
else if (type.startsWith("video/") || file.match(/\.(mp4|webm|ogg)$/i)) {
    const videoWrapper = document.createElement('div');
    videoWrapper.style.position = 'relative';
    videoWrapper.style.display = 'inline-block';
    videoWrapper.style.width = '100%';

    const video = document.createElement('video');
    video.src = file;
    video.autoplay = false;
    video.loop = true;
    video.muted = true;
    video.controls = false;
    video.style.width = '100%';
    video.style.borderRadius = '4px';
    videoWrapper.appendChild(video);

    const muteBtn = document.createElement('button');
    muteBtn.innerText = '🔇';
    muteBtn.style.position = 'absolute';
    muteBtn.style.bottom = '5px';
    muteBtn.style.right = '5px';
    muteBtn.style.background = 'rgba(0,0,0,0.6)';
    muteBtn.style.color = '#0f0';
    muteBtn.style.border = 'none';
    muteBtn.style.cursor = 'pointer';
    muteBtn.style.padding = '2px 5px';
    muteBtn.style.borderRadius = '3px';
    muteBtn.style.fontSize = '12px';
    muteBtn.onclick = () => {
        video.muted = !video.muted;
        muteBtn.innerText = video.muted ? '🔇' : '🔊';
    };
    videoWrapper.appendChild(muteBtn);

    msgDiv.appendChild(videoWrapper);

    window.chatVideos = window.chatVideos || [];
    window.chatVideos.push(video);
} 
// OTHER FILES
else {
    const link = document.createElement('a');
    link.href = file;
    link.textContent = "📎 File";
    link.target = "_blank";
    msgDiv.appendChild(link);
}

        }
    } else {
        // TEXT ONLY
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        msgDiv.appendChild(textSpan);
    }

    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;

    // TikTok-style auto-play for videos
    if (window.chatVideos && !window.videoScrollHandlerAdded) {
        window.videoScrollHandlerAdded = true;

        const scrollHandler = () => {
            let mostVisible = null;
            let maxRatio = 0;
            window.chatVideos.forEach(v => {
                const rect = v.getBoundingClientRect();
                const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
                const ratio = visibleHeight / rect.height;
                if (ratio > maxRatio) {
                    maxRatio = ratio;
                    mostVisible = v;
                }
            });
            window.chatVideos.forEach(v => {
                if (v === mostVisible && maxRatio > 0.5) {
                    v.play().catch(() => {});
                } else {
                    v.pause();
                }
            });
        };

        const container = document.getElementById('globalChatContainer');
        container.addEventListener('scroll', scrollHandler);
        window.addEventListener('scroll', scrollHandler);
        scrollHandler(); // trigger once
    }
}
  
  // Keyboard shortcut: Shift + B to toggle chat visibility
document.addEventListener('keydown', e => {
    const target = e.target;
    const isTyping = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

    if (isTyping) return; // ignore shortcut when typing

    if (e.shiftKey && e.key.toLowerCase() === 'b') {
        const chat = document.getElementById('globalChatContainer');
        if (!chat) return;

        chat.style.display = chat.style.display === 'none' ? 'flex' : 'none';
    }
});
// ---------- Make Chat Immune to All VFX ----------
window.immuneChats = window.immuneChats || [];
window.immuneChats.push(document.getElementById('globalChatContainer'));



    // Developer Console (Eruda)
    addBtn(util, 'Developer Console', () => {
    if (!window.erudaLoaded) {
        let s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';
        document.body.appendChild(s);
        s.onload = () => {
            eruda.init();
            eruda.theme = 'Dark';
            window.erudaInstance = eruda; 
            window.erudaLoaded = true;
        };
        window.erudaScript = s; 
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

        // -------------------- VFX BUTTONS --------------------
   
    // ---------- Corrupted Virus ----------
addBtn(vfx, "Corrupted Virus", () => {
    if (window.infectionActive) return;
    window.infectionActive = true;

    const immune = new Set([
        document.getElementById("globalChatContainer"),
        document.getElementById("vfxGUI"),
        document.getElementById("utilitiesGUI")
    ]);

    window.infectionArcCount = 0;
    const maxArcs = 200;

    // Track corruption intervals + original styles
    window.corruptedElems = new Map(); // elem -> { interval, orig }

    function createArc(x, y, angle, depth = 0) {
        if (!window.infectionActive || window.infectionArcCount >= maxArcs) return;
        window.infectionArcCount++;

        const arc = document.createElement("div");
        arc.style.position = "absolute";
        arc.style.left = "0";
        arc.style.top = "0";
        arc.style.width = "100%";
        arc.style.height = "100%";
        arc.style.pointerEvents = "none";
        arc.style.zIndex = 999999;

        let points = `${x},${y}`;
        let px = x, py = y;
        const segs = 6;

        for (let i = 0; i < segs; i++) {
            px += Math.cos(angle) * (15 + Math.random() * 10);
            py += Math.sin(angle) * (15 + Math.random() * 10);
            px += (Math.random() - 0.5) * 8;
            py += (Math.random() - 0.5) * 8;
            points += ` ${px},${py}`;
        }

        arc.innerHTML = `
            <svg style="position:absolute;left:0;top:0;width:100%;height:100%;overflow:visible;" xmlns="http://www.w3.org/2000/svg">
                <polyline class="main" points="${points}" stroke="white" stroke-width="2.5" fill="none" />
                <polyline class="ghost1" points="${points}" stroke="magenta" stroke-width="2" fill="none" opacity="0.6"/>
                <polyline class="ghost2" points="${points}" stroke="cyan" stroke-width="2" fill="none" opacity="0.6"/>
            </svg>
        `;
        document.body.appendChild(arc);

        const main = arc.querySelector(".main");
        const g1 = arc.querySelector(".ghost1");
        const g2 = arc.querySelector(".ghost2");

        let life = 0;
        const anim = setInterval(() => {
            if (!window.infectionActive) { clearInterval(anim); return; }
            const hue = (life * 50 + Math.random() * 120) % 360;
            const hue2 = (life * 80 + Math.random() * 180) % 360;
            const hue3 = (life * 60 + Math.random() * 200) % 360;
            main.setAttribute("stroke", `hsl(${hue},100%,60%)`);
            g1.setAttribute("stroke", `hsl(${hue2},100%,60%)`);
            g2.setAttribute("stroke", `hsl(${hue3},100%,60%)`);
            life++;
        }, 100);

        // --- Infect element with ongoing distortion ---
        const elem = document.elementFromPoint(px, py);
        if (elem && !immune.has(elem) && !elem.closest("#vfxGUI, #utilitiesGUI, #globalChatContainer")) {
            if (!window.corruptedElems.has(elem)) {
                // Save original styles
                const orig = {
                    filter: elem.style.filter,
                    transform: elem.style.transform,
                    textShadow: elem.style.textShadow
                };

                let tick = 0;
                const corruptAnim = setInterval(() => {
                    if (!window.infectionActive) { clearInterval(corruptAnim); return; }
                    const hue = (tick * 10) % 360;
                    elem.style.filter = `hue-rotate(${hue}deg)`;
                    elem.style.transform = `scale(${1 + Math.sin(tick/10)*0.1}) rotate(${(Math.random()-0.5)*5}deg) skew(${(Math.random()-0.5)*4}deg, ${(Math.random()-0.5)*4}deg)`;
                    elem.style.textShadow = `0 0 5px hsl(${hue},100%,60%), 0 0 10px hsl(${(hue+180)%360},100%,60%)`;
                    tick++;
                }, 120);

                window.corruptedElems.set(elem, { interval: corruptAnim, orig });
            }
        }

        // --- branching ---
        if (depth < 12 && window.infectionActive && window.infectionArcCount < maxArcs) {
            setTimeout(() => {
                const bias = Math.PI / 4; // bottom-right
                const newAngle = angle * 0.7 + bias * 0.3 + (Math.random() - 0.5) * Math.PI/16;
                createArc(px, py, newAngle, depth + 1);
                if (Math.random() < 0.7) {
                    createArc(px, py, newAngle + (Math.random() > 0.5 ? Math.PI/6 : -Math.PI/6), depth + 1);
                }
            }, 500 + Math.random() * 400);
        }
    }

    createArc(0, 0, Math.PI / 4);

    window.stopAllInfection = () => {
        window.infectionActive = false;
        window.infectionArcCount = 0;
        document.querySelectorAll("svg").forEach(el => el.remove());

        // Restore corrupted elements
        window.corruptedElems.forEach(({ interval, orig }, elem) => {
            clearInterval(interval);
            elem.style.filter = orig.filter;
            elem.style.transform = orig.transform;
            elem.style.textShadow = orig.textShadow;
        });
        window.corruptedElems.clear();
    };
});
    
    // 3D Page
  addBtn(vfx,'3D Page',()=>{
  if(!window.triScript){
    let s=document.createElement('script');
    s.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js';
    document.body.appendChild(s);
    window.triScript=s;
  }
},()=>{
  if(window.triScript){window.triScript.remove();window.triScript=null;}
});
// Explode Page
addBtn(vfx,'Explode Page',()=>{
  if(window.explodeActive) return;
  window.explodeActive=true;
  let o=document.createElement('div');
  o.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;';
  document.body.appendChild(o);
  let c=3;
  o.innerText=c;
  window.explodeInt=setInterval(()=>{
    c--;
    if(c>0){ o.innerText=c; } 
    else{
      clearInterval(window.explodeInt);
      o.remove();
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
  clearInterval(window.explodeInt);
  window.explodeInt=null;
  window.explodeActive=false;
  document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
    e.style.transform='';
    e.style.transition='';
  });
});
// Image Glitch
addBtn(vfx,'Image Glitch',()=>{
  if(window.imgGlitchInt) return;
  window.imgGlitchInt=setInterval(()=>{
    document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
      e.style.position='absolute';
      e.style.left=Math.random()*window.innerWidth+'px';
      e.style.top=Math.random()*window.innerHeight+'px';
    });
  },50);
},()=>{
  if(window.imgGlitchInt){
    clearInterval(window.imgGlitchInt);
    window.imgGlitchInt=null;
    document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
      e.style.position='';
      e.style.left='';
      e.style.top='';
    });
  }
});
// Random Link Redirects
addBtn(vfx,'Random Link Redirects',()=>{
  window.linkRedirectsInt=setInterval(()=>{
    document.querySelectorAll('a:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(a=>{
      a.href=['https://longdogechallenge.com/','https://puginarug.com/','https://onesquareminesweeper.com/'][Math.floor(Math.random()*3)];
    });
  },500);
},()=>{
  clearInterval(window.linkRedirectsInt);
});
// Matrix Rain
addBtn(vfx,'Matrix Rain',()=>{
  if(window.matrixActive) return;
  window.matrixActive=true;
  if(!window.matrixCanvas){
    let c=document.createElement('canvas');
    c.width=window.innerWidth;
    c.height=window.innerHeight;
    c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none';
    document.body.appendChild(c);
    window.matrixCanvas=c;
    let ctx=c.getContext('2d');
    let chars='1010';
    let cols=Math.floor(window.innerWidth/10);
    let drops=[];
    for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*c.height);
    window.matrixInt=setInterval(()=>{
      ctx.fillStyle='rgba(0,0,0,0.05)';
      ctx.fillRect(0,0,c.width,c.height);
      ctx.fillStyle='#0F0';
      ctx.font='10px monospace';
      for(let i=0;i<cols;i++){
        ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
        if(drops[i]*10>c.height && Math.random()>0.975) drops[i]=0;
        drops[i]++;
      }
    },33);
  }
},()=>{
  clearInterval(window.matrixInt);
  window.matrixInt=null;
  if(window.matrixCanvas){window.matrixCanvas.remove();window.matrixCanvas=null;}
  window.matrixActive=false;
});

// Glitch
addBtn(vfx,'Glitch',()=>{
    if(window.glitchActive) return;
    window.glitchActive=true;
    window.glitchInt=setInterval(()=>{
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
        });
    },25);
},()=>{
    if(window.glitchInt){
        clearInterval(window.glitchInt);
        window.glitchInt=null;
    }
    window.glitchActive=false; // reset the flag
    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
});


// Smooth Disco
addBtn(vfx,'Smooth Disco',()=>{
    if(window.discoSmoothActive) return;
    window.discoSmoothActive=true;
    let colors="red orange yellow green blue purple pink".split(" "),i=0;
    window.discoSmoothInt=setInterval(()=>{
        i>=colors.length?i=0:i++;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.transition="background-color 1s";
            e.style.backgroundColor=colors[i];
        });
    },1000);
},()=>{
    if(window.discoSmoothInt){
        clearInterval(window.discoSmoothInt);
        window.discoSmoothInt=null;
    }
    window.discoSmoothActive=false; // reset the flag
    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
});

// ---------- Text Corruption (Chat-immune) ----------
addBtn(vfx, 'Text Corruption', () => {
    const chatEl = document.getElementById('globalChatContainer');
    const isImmune = el => chatEl && (el === chatEl || chatEl.contains(el));

    if (window.textCorruptStyle) return;

    // Create style element
    let s = document.createElement('style'); 
    s.id = 'textCorruptStyle'; 
    s.innerHTML = `
        body { background:black !important; }
        body *:not(#globalChatContainer):not(#globalChatContainer *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *) {
            color: green !important;
            font-family: Courier New, monospace !important;
            font-size: 16px !important;
            text-shadow: 1px 1px #FF0000 !important;
        }
        #vfxGUI, #utilitiesGUI { animation:none !important; }
    `;
    document.head.appendChild(s);
    window.textCorruptStyle = s;

    // Cleanup function
    window._textCorruptCleanup = () => {
        if (window.textCorruptStyle) {
            window.textCorruptStyle.remove();
            window.textCorruptStyle = null;
        }
        window._textCorruptCleanup = null;
    };

}, () => {
    if (window._textCorruptCleanup) window._textCorruptCleanup();
});

    // ---------- Bubble Text (Chat-immune) ----------
addBtn(vfx, 'Bubble Text', () => {
    if (window.bubbleActive) return;
    window.bubbleActive = true;

    const chatEl = document.getElementById('globalChatContainer');
    const originalTextMap = new Map();

    const bubbleMap = {
        a: 'ⓐ', b: 'ⓑ', c: 'ⓒ', d: 'ⓓ', e: 'ⓔ', f: 'ⓕ', g: 'ⓖ', h: 'ⓗ', i: 'ⓘ', j: 'ⓙ', k: 'ⓚ', l: 'ⓛ',
        m: 'ⓜ', n: 'ⓝ', o: 'ⓞ', p: 'ⓟ', q: 'ⓠ', r: 'ⓡ', s: 'ⓢ', t: 'ⓣ', u: 'ⓤ', v: 'ⓥ', w: 'ⓦ', x: 'ⓧ',
        y: 'ⓨ', z: 'ⓩ', A: 'Ⓐ', B: 'Ⓑ', C: 'Ⓒ', D: 'Ⓓ', E: 'Ⓔ', F: 'Ⓕ', G: 'Ⓖ', H: 'Ⓗ', I: 'Ⓘ', J: 'Ⓙ',
        K: 'Ⓚ', L: 'Ⓛ', M: 'Ⓜ', N: 'Ⓝ', O: 'Ⓞ', P: 'Ⓟ', Q: 'Ⓠ', R: 'Ⓡ', S: 'Ⓢ', T: 'Ⓣ', U: 'Ⓤ', V: 'Ⓥ',
        W: 'Ⓦ', X: 'Ⓧ', Y: 'Ⓨ', Z: 'Ⓩ', '0': '⓪', '1': '①', '2': '②', '3': '③', '4': '④', '5': '⑤', '6': '⑥',
        '7': '⑦', '8': '⑧', '9': '⑨'
    };

    function transform(node) {
        if (!node) return;
        if (node.nodeType === Node.ELEMENT_NODE) {
            if(node === chatEl || node.closest && node.closest('#globalChatContainer,#vfxGUI,#utilitiesGUI')) return;
            node.childNodes.forEach(transform);
        }
        else if (node.nodeType === Node.TEXT_NODE) {
            if(!node.nodeValue.trim()) return;
            if(!originalTextMap.has(node)) originalTextMap.set(node, node.nodeValue);
            node.nodeValue = node.nodeValue.replace(/[a-zA-Z0-9]/g, ch => bubbleMap[ch] || ch);
        }
    }

    transform(document.body);

    // Cleanup
    const cleanup = () => {
        originalTextMap.forEach((orig, node) => { try { node.nodeValue = orig; } catch(e){} });
        window.bubbleActive = false;
    };

    window._bubbleCleanup = cleanup;
    if(!window.stopAllVFX) window.stopAllVFX = [];
    window.stopAllVFX = window.stopAllVFX.filter(f => f !== cleanup);
    window.stopAllVFX.push(cleanup);
});



// Page Spin
addBtn(vfx,'Page Spin',()=>{
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

  // Full chaos
addBtn(vfx, 'Full Chaos', () => {
  if (!window.fullChaosActive) {
    window.fullChaosActive = true;

    // Container just for chaos layers
    let chaosContainer = document.createElement('div');
    chaosContainer.id = 'chaosContainer';
    chaosContainer.style.cssText = `
      position:fixed;
      top:0; left:0;
      width:100%; height:100%;
      pointer-events:none;
      z-index:99998; /* keep below GUIs */
    `;
    document.body.appendChild(chaosContainer);

    function randColor() {
      return '#' + Math.floor(16777215 * Math.random()).toString(16);
    }
    function rand(n) {
      return Math.floor(Math.random() * n) + 1;
    }

    // Build chaos bars
    let h = window.innerHeight;
    for (let i = 0; i < h; i++) {
      let bar = document.createElement('div');
      bar.id = 'chaosBar' + i;
      bar.style.cssText = `
        width:100%; height:1px;
        background:${randColor()};
      `;
      chaosContainer.appendChild(bar);
    }

    // Loop effects
    window.fullChaosLoop1 = setInterval(() => {
      for (let e = 0; e < 10; e++) {
        let bar = document.getElementById('chaosBar' + rand(h));
        if (bar) {
          bar.style.backgroundColor = randColor();
          bar.style.height = rand(4) + 'px';
        }
      }
      chaosContainer.style.backgroundColor = randColor();
      chaosContainer.style.transform =
        rand(256) > 128
          ? `scale(3) rotate(${rand(35)}deg)`
          : 'scale(1) rotate(0deg)';
      window.scrollTo(0, document.body.scrollHeight);
    }, 10);

    window.fullChaosLoop2 = setInterval(() => {
      window.scrollTo(0, 0);
    }, 50);

    // StopAll support
    if (!window.stopAllVFX) window.stopAllVFX = [];
    window.stopAllVFX.push(() => {
      clearInterval(window.fullChaosLoop1);
      clearInterval(window.fullChaosLoop2);
      let c = document.getElementById('chaosContainer');
      if (c) c.remove();
      window.fullChaosActive = false;
    });
  } else {

    clearInterval(window.fullChaosLoop1);
    clearInterval(window.fullChaosLoop2);
    let c = document.getElementById('chaosContainer');
    if (c) c.remove();
    window.fullChaosActive = false;
  }
});
// Fake blocked page
addBtn(vfx,'Block link',()=>{
  window.linkRedirectsInt=setInterval(()=>{
    document.querySelectorAll('a:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(a=>{
      a.href=['https://www.securly.com/blocked?reason=notloggedin'][Math.floor(Math.random()*3)];
    });
  },500);
},()=>{
  clearInterval(window.linkRedirectsInt);
});
    // ---------- Stop All VFX (Chat-immune) ----------
addBtn(vfx, 'Stop All', () => {
    const chatEl = document.getElementById('globalChatContainer');

    // Function to check if an element is the chat or inside it
    const isImmune = el => chatEl && (el === chatEl || chatEl.contains(el));

    // ------------------ Call all VFX cleanup functions ------------------
    if (window.stopAllVFX) {
        window.stopAllVFX.forEach(fn => { 
            try { fn(); } catch(e) {} 
        });
        window.stopAllVFX = [];
    }

    // ------------------ Stop Bubble Text ------------------
    if (window._bubbleCleanup) window._bubbleCleanup();
    window.bubbleActive = false;

    // ------------------ Stop Matrix Rain ------------------
    if(window.matrixInt){ clearInterval(window.matrixInt); window.matrixInt=null; }
    if(window.matrixCanvas && !isImmune(window.matrixCanvas)){ window.matrixCanvas.remove(); window.matrixCanvas=null; }
    window.matrixActive=false;

    // ------------------ Stop Smooth Disco ------------------
    if(window.discoSmoothInt){ clearInterval(window.discoSmoothInt); window.discoSmoothInt=null; }
    window.discoSmoothActive=false;

    // ------------------ Stop Glitch ------------------
    if(window.glitchInt){ clearInterval(window.glitchInt); window.glitchInt=null; }
    window.glitchActive=false;

    // ------------------ Stop Full Chaos ------------------
    if(window.fullChaosLoop1){ clearInterval(window.fullChaosLoop1); window.fullChaosLoop1=null; }
    if(window.fullChaosLoop2){ clearInterval(window.fullChaosLoop2); window.fullChaosLoop2=null; }
    const chaos = document.getElementById('chaosContainer');
    if(chaos && !isImmune(chaos)) chaos.remove();
    window.fullChaosActive=false;

    // ------------------ Stop Page Spin ------------------
    if(window.pageSpinStyle && !isImmune(window.pageSpinStyle)){ window.pageSpinStyle.remove(); window.pageSpinStyle=null; }
    window.pageSpinActive=false;

    // ------------------ Stop Text Corruption ------------------
    if(window._textCorruptCleanup) window._textCorruptCleanup();

        // ------------------ Stop Image Glitch ------------------
    if(window.imgGlitchInt){
        clearInterval(window.imgGlitchInt);
        window.imgGlitchInt = null;
        document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
            if(!isImmune(e)){
                e.style.position='';
                e.style.left='';
                e.style.top='';
            }
        });
    }

    // ------------------ Stop Infection Virus ------------------
    if (window.stopAllInfection) {
        try { window.stopAllInfection(); } catch (e) {}
        window.stopAllInfection = null;
    }


    // ------------------ Reset page-wide inline styles (skip chat) ------------------
    document.body.style.transform='';
    document.body.style.backgroundColor='';
    document.body.style.filter='';
    document.querySelectorAll('body *:not(#globalChatContainer):not(#globalChatContainer *):not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
        e.style.backgroundColor='';
        e.style.height='';
        e.style.transform='';
        e.style.transition='';
        e.style.color='';
        e.style.fontSize='';
        e.style.position='';
        e.style.left='';
        e.style.top='';
        e.style.textShadow='';
    });

    // ------------------ Reset Utilities ------------------
    if(window.stats){ window.stats.dom.remove(); window.stats=null; }
    if(window.erudaInstance){ window.erudaInstance.destroy(); window.erudaInstance=null; window.erudaLoaded=false; }
    if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }

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

    // -------------------- SHIFT+H TO HIDE --------------------
    document.addEventListener('keydown', (e) => {
    if (e.shiftKey && e.key.toLowerCase() === 'h') {
      util.style.display = (util.style.display === 'none') ? 'block' : 'none';
      vfx.style.display = (vfx.style.display === 'none') ? 'block' : 'none';
    }
  });

  } // end spawnGUIs

})();
