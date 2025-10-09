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


  function spawnGUIs() {
    // -------------------- MASTER GUI --------------------
const gui = document.createElement('div');
gui.id = 'masterGUI';
gui.style.cssText = `
  position:fixed;top:50px;right:50px;width:340px;
  background:#000000;color:#00ff00;font-family:Consolas,monospace;
  padding:10px;border:2px solid #00ff00;border-radius:8px;
  box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:9999999;
  user-select:none;cursor:move;overflow:hidden;
`;

const pagesContainer = document.createElement('div');
pagesContainer.style.cssText = `
  position:relative;
  width:100%;
  height:auto;
  min-height:250px;
`;

// --- UTILITIES PAGE ---
const util = document.createElement('div');
util.id = 'util';
util.style.cssText = `
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:6px;
  align-items:center;
  justify-items:center;
  opacity:1;
  transform:translateX(0%);
  transition:opacity 0.4s, transform 0.4s;
`;
util.innerHTML = `
  <div style="grid-column: span 2; text-align:center; margin-bottom:8px;">
    <b>Utilities</b>
  </div>
`;

// --- VFX PAGE ---
const vfx = document.createElement('div');
vfx.id = 'vfx';
vfx.style.cssText = `
  display:grid;
  grid-template-columns: 1fr 1fr;
  gap:6px;
  align-items:center;
  justify-items:center;
  opacity:0;
  transform:translateX(100%);
  transition:opacity 0.4s, transform 0.4s;
`;
vfx.innerHTML = `
  <div style="grid-column: span 2; text-align:center; margin-bottom:8px;">
    <b>Page Effects</b>
  </div>
`;

pagesContainer.appendChild(util);
pagesContainer.appendChild(vfx);
gui.appendChild(pagesContainer);

// --- NAVIGATION ARROWS ---
const nav = document.createElement('div');
nav.style.cssText = `
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-top:10px;
  font-weight:bold;
  font-size:18px;
`;

const leftArrow = document.createElement('span');
leftArrow.textContent = '<';
leftArrow.style.cssText = 'cursor:pointer;color:#00ff00;transition:0.2s;';
leftArrow.onmouseenter = () => (leftArrow.style.textShadow = '0 0 8px #00ff00');
leftArrow.onmouseleave = () => (leftArrow.style.textShadow = '');

const rightArrow = document.createElement('span');
rightArrow.textContent = '>';
rightArrow.style.cssText = 'cursor:pointer;color:#00ff00;transition:0.2s;';
rightArrow.onmouseenter = () => (rightArrow.style.textShadow = '0 0 8px #00ff00');
rightArrow.onmouseleave = () => (rightArrow.style.textShadow = '');

nav.appendChild(leftArrow);
nav.appendChild(rightArrow);
gui.appendChild(nav);
document.body.appendChild(gui);

// -------------------- PAGE SWITCH --------------------
let currentPage = 'util';
function showPage(target) {
  if (target === currentPage) return;

  const from = currentPage === 'util' ? util : vfx;
  const to = target === 'util' ? util : vfx;

  // Animate out
  from.style.opacity = 0;
  from.style.transform = target === 'util' ? 'translateX(100%)' : 'translateX(-100%)';

  // Animate in
  to.style.opacity = 1;
  to.style.transform = 'translateX(0%)';

  currentPage = target;
}

// Attach click events
leftArrow.onclick = () => showPage('util');
rightArrow.onclick = () => showPage('vfx');

// -------------------- ADD BUTTON FUNCTION --------------------
function addBtn(container, label, onStart, onStop) {
  const btn = document.createElement('button');
  btn.textContent = label;
  btn.style.cssText = `
    width:140px;padding:6px;margin:2px;
    background:black;color:#00ff00;
    border:1px solid #00ff00;border-radius:6px;
    cursor:pointer;transition:all 0.2s;
  `;
  let active = false;
  btn.onclick = () => {
    active = !active;
    btn.style.background = active ? '#00ff00' : 'black';
    btn.style.color = active ? 'black' : '#00ff00';
    if (active && onStart) onStart();
    if (!active && onStop) onStop();
  };
  container.appendChild(btn);
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

// ---------- Tab Title & Favicon Controls ----------
const vfxContainer = document.getElementById('vfxGUI');
if (vfxContainer) {
    const controlsWrapper = document.createElement('div');
    controlsWrapper.style.cssText = `
        position:absolute; bottom:5px; right:5px;
        display:flex; gap:6px; align-items:center;
        background:rgba(0,0,0,0.5); padding:4px; border-radius:4px;
        z-index:10000001;
    `;

    // Hidden file input for favicon
    const faviconInput = document.createElement('input');
    faviconInput.type = 'file';
    faviconInput.accept = 'image/*';
    faviconInput.style.display = 'none';
    faviconInput.addEventListener('change', () => {
        const file = faviconInput.files[0];
        if (!file) return;
        const url = URL.createObjectURL(file);

        // Find or create favicon <link>
        let link = document.querySelector("link[rel*='icon']");
        if (!link) {
            link = document.createElement('link');
            link.rel = 'icon';
            document.head.appendChild(link);
        }
        link.href = url;
    });

    // Visible folder button
    const faviconBtn = document.createElement('button');
    faviconBtn.textContent = '📁'; // folder emoji
    faviconBtn.style.cssText = `
        font-size:16px; 
        padding:2px 5px; 
        cursor:pointer; 
        background:transparent; 
        border:none; 
        color:#0f0;
    `;
    faviconBtn.onclick = () => faviconInput.click();

    // Tab title input
    const titleInput = document.createElement('input');
    titleInput.type = 'text';
    titleInput.placeholder = 'Tab title';
    titleInput.style.cssText = `
        width:90px; font-size:11px; padding:2px;
        background:black; color:#0f0; border:none; outline:none;
    `;
    titleInput.addEventListener('input', () => {
        document.title = titleInput.value;
    });

    // Add everything
    controlsWrapper.appendChild(faviconBtn);
    controlsWrapper.appendChild(faviconInput);
    controlsWrapper.appendChild(titleInput);
    vfxContainer.appendChild(controlsWrapper);
}

    // ---------- UTILITIES BUTTONS ----------
(function(){
    const activeUtilities = {};

    // Helper to add a button
    function addBtn(container, name, on, off) {
        const b = document.createElement('button');
        b.innerText = name;
        b.style.cssText = 'width:100%;margin:2px 0;background:#060f00;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
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


  addBtn(util, 'iframe launcher', () => {
    const url = prompt("Enter URL");
    if (url) {
        const w = window.open("about:blank", "_blank");
        w.document.write(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>nothing here</title>
                </head>
                <body style="margin:0">
                    <iframe src="${url}" style="border:none;width:100vw;height:100vh;"></iframe>
                </body>
            </html>
        `);
        w.document.close();
    }
});

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


    // Invert Page
  addBtn(util,'Invert Page',()=>{
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
    addBtn(util,'IP Scanner',()=>{
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

    // Break Page
    addBtn(util,'Page Killer',()=>{
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
        section.style.background = '#001f00';
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


// -------------------- VFX Buttons --------------------
     function addBtn(container,name,on,off){
  const b=document.createElement('button');
  b.innerText=name;
  b.style.cssText='width:100%;margin:2px 0;background:#060f00;color:#00ff00;border:none;padding:5px;border-radius:5px;cursor:pointer;font-family:Consolas,monospace;';
  b.onclick=on;
  container.appendChild(b);
  }
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

     // ---------- Disintegrate Element ----------
let disintegrateHandler = null;

addBtn(vfx, "Disintegrate Element", () => {
  let active = vfx.dataset.disintegrateActive === "true";

  function disintegrateElement(el) {
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Remove element instantly (no fade)
    el.remove();

    // Character pool
    const chars = "123456789010abcdefghijklmnopqrstuvwxyz";

    // Create particles
    const numParticles = Math.floor(width * height / 150);
    for (let i = 0; i < numParticles; i++) {
      const particle = document.createElement("div");
      particle.textContent = chars[Math.floor(Math.random() * chars.length)];
      particle.style.position = "fixed";
      particle.style.zIndex = "999999"; 
      particle.style.left = rect.left + Math.random() * width + "px";
      particle.style.top = rect.top + Math.random() * height + "px";
      particle.style.fontSize = "12px";
      particle.style.fontFamily = "monospace";
      particle.style.color = "red"; 
      particle.style.pointerEvents = "none";
      particle.style.opacity = "1";
      particle.style.transition = "transform 3s ease-out, opacity 3s ease-out";
      document.body.appendChild(particle);

      // Float upward
      const xMove = (Math.random() - 0.5) * 120;
      const yMove = -150 - Math.random() * 250;

      requestAnimationFrame(() => {
        particle.style.transform = `translate(${xMove}px, ${yMove}px) rotate(${Math.random() * 360}deg)`;
        particle.style.opacity = "0";
      });

      // Remove particle after 3s
      setTimeout(() => particle.remove(), 3000);
    }
  }

  // Toggle mode
  if (active) {
    document.removeEventListener("click", disintegrateHandler, true);
    disintegrateHandler = null;
    vfx.dataset.disintegrateActive = "false";
    alert("Disintegration mode deactivated.");
  } else {
    disintegrateHandler = function (e) {
      if (e.target.closest("#vfxGUI")) return; // protect GUI
      e.preventDefault();
      e.stopPropagation();
      disintegrateElement(e.target);
    };

    document.addEventListener("click", disintegrateHandler, true);
    vfx.dataset.disintegrateActive = "true";
    alert("Disintegration mode activated. Click any element to delete it.");
  }
});

    // Invert Media (Toggle)
addBtn(vfx, 'Invert Media', () => {
    if (window.invertimgActive) {
        // --- Deactivate ---
        if (window.invertimgStyle) window.invertimgStyle.remove();
        window.invertimgStyle = null;
        window.invertimgActive = false;
        return;
    }
    // --- Activate ---
    window.invertimgActive = true;
    window.invertimgStyle = document.createElement("style");
    window.invertimgStyle.textContent = "img,video,embed,object{filter:invert(100%) !important;}";
    document.body.appendChild(window.invertimgStyle);
});


// Censor Media (Toggle)
addBtn(vfx, 'Censor Media', () => {
    if (window.censorActive) {
        // --- Deactivate ---
        if (window.af) cancelAnimationFrame(window.af);
        if (window.censorStyle) window.censorStyle.remove();
        if (window.censors) for (var c of window.censors) c.remove();
        if (window.sensed) for (var e of window.sensed) e.parentElement.classList.remove("censor-parent");
        window.censors = [];
        window.sensed = [];
        window.censorActive = false;
        return;
    }

    // --- Activate ---
    window.censorActive = true;
    window.censorStyle = document.createElement("style");
    window.censorStyle.textContent = `
        .censor { opacity: 1 !important; image-rendering: pixelated !important; }
        .censor + img, .censor + video { visibility: hidden !important; }
        .censor-parent:hover .censor { display: none !important; }
        .censor-parent:hover .censor + img, 
        .censor-parent:hover .censor + video { visibility: visible !important; }
    `;
    document.body.appendChild(window.censorStyle);

    window.sensed = [];
    window.censors = [];
    let quality = 1.5;

    function onScreen(r) {
        return r.right > 0 && r.bottom > 0 && r.left < innerWidth && r.top < innerHeight;
    }

    function copyStyle(donor, recipient, sizeOnly) {
        var donorStyle = getComputedStyle(donor);
        var keys = Object.keys(donorStyle);
        if (sizeOnly) keys = ["width", "height"];
        for (var key of keys) recipient.style[key] = donorStyle[key];
    }

    function updateCensor(e, canvas) {
        var rect = e.getBoundingClientRect();
        if (onScreen(rect)) {
            var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
            canvas.width = rect.width * quality / equalizer;
            canvas.height = rect.height * quality / equalizer;
            if (window.af % 120 == 0) copyStyle(e, canvas, true);
            var context = canvas.getContext("2d");
            context.drawImage(e, 0, 0, canvas.width, canvas.height);
            e.parentElement.classList.add("censor-parent");
        }
    }

    function createCensor(e) {
        var rect = e.getBoundingClientRect();
        if (onScreen(rect)) {
            var canvas = document.createElement("canvas");
            canvas.className = "censor";
            var equalizer = Math.log2(Math.max(rect.width * rect.height, 2));
            canvas.width = rect.width * quality / equalizer;
            canvas.height = rect.height * quality / equalizer;
            copyStyle(e, canvas);
            var context = canvas.getContext("2d");
            context.drawImage(e, 0, 0, canvas.width, canvas.height);
            e.parentElement.insertBefore(canvas, e);
            e.parentElement.classList.add("censor-parent");
            return canvas;
        }
    }

    function sense() {
        var es = document.querySelectorAll("img,video");
        for (var e of es) {
            var i = window.sensed.indexOf(e);
            if (i >= 0) {
                if (e.tagName == "VIDEO" && !e.paused) updateCensor(e, window.censors[i]);
            } else {
                if (e.tagName == "VIDEO" || e.complete) {
                    var c = createCensor(e);
                    if (c) {
                        window.censors.push(c);
                        window.sensed.push(e);
                    }
                }
            }
        }
        window.af = requestAnimationFrame(sense);
    }

    sense();
});

    // Invert Area
addBtn(vfx, 'Invert Area', () => {
    // If active, turn off
    if (window.invertAreaActive) {
        if (window.invertAreaShield) window.invertAreaShield.remove();
        window.removeEventListener("mousedown", window.invertAreaHold);
        window.removeEventListener("touchstart", window.invertAreaHold);
        window.invertAreaActive = false;
        return;
    }

    // --- Activate ---
    window.invertAreaActive = true;

    let s, b, m0, m1;

    function shield() {
        s = document.createElement("div");
        s.style.position = "fixed";
        s.style.left = 0;
        s.style.top = 0;
        s.style.width = "100%";
        s.style.height = "100%";
        s.style.zIndex = 99999999; // high layer
        s.style.cursor = "crosshair";
        document.body.appendChild(s);
        window.invertAreaShield = s;
    }

    function box() {
        b = document.createElement("div");
        b.style.position = "absolute";
        b.style.left = m0.clientX + "px";
        b.style.top = m0.clientY + "px";
        b.style.width = 0;
        b.style.height = 0;
        b.style.outline = "2px dashed red";
        b.style.boxShadow = "inset 0 0 25px 2px white";
        b.style.mixBlendMode = "difference";
        s.appendChild(b);
    }

    function invert(e) {
        if (!e) return;
        b.remove();
        s.remove();
        window.invertAreaShield = null;
        e.style.filter = e.style.filter === "invert(1)" ? "" : "invert(1)";
    }

    function selection(f) {
        var x0 = Math.min(m0.clientX, m1.clientX);
        var x1 = Math.max(m0.clientX, m1.clientX);
        var y0 = Math.min(m0.clientY, m1.clientY);
        var y1 = Math.max(m0.clientY, m1.clientY);
        var dx = Math.max(1, (x1 - x0) / 10);
        var dy = Math.max(1, (y1 - y0) / 10);
        var elementsFromPoints = [];

        for (var x = x0; x <= x1; x += dx) {
            for (var y = y0; y <= y1; y += dy) {
                elementsFromPoints.push(document.elementsFromPoint(x, y));
            }
        }

        elementsFromPoints.sort((a, b) => a.length - b.length);
        var intersection = elementsFromPoints[0].filter(
            (e) => e !== b && e !== s && elementsFromPoints.every(efp => efp.includes(e))
        );

        f(intersection[0]);
    }

    function pointer(e) {
        if (e.touches) {
            if (e.type === "touchmove") e.preventDefault();
            return e.touches[0] || e.changedTouches[0];
        }
        return e;
    }

    function release(e) {
        window.removeEventListener("mousemove", drag);
        window.removeEventListener("touchmove", drag);
        window.removeEventListener("mouseup", release);
        window.removeEventListener("touchend", release);
        m1 = pointer(e);
        selection(invert);
    }

    function drag(e) {
        var m = pointer(e);
        b.style.left = Math.min(m0.clientX, m.clientX) + "px";
        b.style.top = Math.min(m0.clientY, m.clientY) + "px";
        b.style.width = Math.abs(m.clientX - m0.clientX) + "px";
        b.style.height = Math.abs(m.clientY - m0.clientY) + "px";
    }

    function hold(e) {
        window.removeEventListener("mousedown", hold);
        window.removeEventListener("touchstart", hold);
        window.addEventListener("mousemove", drag);
        window.addEventListener("touchmove", drag, { passive: false });
        window.addEventListener("mouseup", release);
        window.addEventListener("touchend", release);
        m0 = pointer(e);
        box();
    }

    function startInvertArea() {
        shield();
        window.invertAreaHold = hold;
        window.addEventListener("mousedown", hold);
        window.addEventListener("touchstart", hold);
    }

    startInvertArea();
});

    // ------------------ Disorient Page ------------------
/*addBtn(vfx, 'Disorient Page', () => {
  if (!window.disorientActive) {
    window.disorientActive = true;
    window.originalTransforms = [];

    
    const prefixes = ['', '-ms-', '-webkit-', '-o-', '-moz-'];
    const elements = Array.from(document.querySelectorAll('div, p, span, img, a, body'));

    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const current = style.transform || '';
      window.originalTransforms.push({ el, transform: current });
      const deg = (Math.floor(Math.random() * 5) - 45);
      prefixes.forEach(prefix => {
        el.style[prefix + 'transform'] = `${current} rotate(${deg}deg)`;
      });
    });
  } else {
    // Reset everything
    window.disorientActive = false;
    if (window.originalTransforms) {
      window.originalTransforms.forEach(({ el, transform }) => {
        const prefixes = ['', '-ms-', '-webkit-', '-o-', '-moz-'];
        prefixes.forEach(prefix => {
          el.style[prefix + 'transform'] = transform;
        });
      });
      window.originalTransforms = null;
    }
  }
}); */


    // 3D Page
addBtn(vfx,'3D Page',()=>{
    let s=document.createElement('script');
    s.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js?cacheBust=' + Date.now();
    document.body.appendChild(s);
    window.triScript = s;
},()=>{
    if(window.triScript){
        window.triScript.remove();
        window.triScript = null;
    }
    // reset transforms to normal
    document.body.style.transform = '';
    document.body.style.perspective = '';
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
    window.glitchActive = true;
    window.glitchInt = setInterval(()=>{
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
        .forEach(e=>{
            e.style.backgroundColor = ['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
        });
    },25);
},()=>{
    if(window.glitchInt){
        clearInterval(window.glitchInt);
        window.glitchInt = null;
    }
    window.glitchActive = false;


    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
    .forEach(e=>{
        e.style.backgroundColor = '';
    });
});



// Smooth Disco
addBtn(vfx,'Smooth Disco',()=>{
    if(window.discoSmoothActive) return;
    window.discoSmoothActive = true;
    let colors = "red orange yellow green blue purple pink".split(" "), i = 0;
    window.discoSmoothInt = setInterval(()=>{
        i = (i + 1) % colors.length;
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
        .forEach(e=>{
            e.style.transition = "background-color 1s";
            e.style.backgroundColor = colors[i];
        });
    },1000);
},()=>{
    if(window.discoSmoothInt){
        clearInterval(window.discoSmoothInt);
        window.discoSmoothInt = null;
    }
    window.discoSmoothActive = false;


    document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
    .forEach(e=>{
        e.style.transition = "";          
        e.style.backgroundColor = "";     
    });
});


// ---------- Text Corruption ----------
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

    // ---------- Bubble Text ----------
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
    // ---------- Stop All VFX ----------
addBtn(vfx, 'Stop All', () => {

    if (window.stopAllVFX) {
        window.stopAllVFX.forEach(fn => { 
            try { fn(); } catch(e) {} 
        });
        window.stopAllVFX = [];
    }
// ------------------ Stop Invert Media ------------------
if (window.invertimgStyle) { window.invertimgStyle.remove(); window.invertimgStyle = null; }
window.invertimgActive = false;

// ------------------ Stop Censor Media ------------------
if (window.af) cancelAnimationFrame(window.af);
if (window.censorStyle) window.censorStyle.remove();
if (window.censors) for (var c of window.censors) c.remove();
if (window.sensed) for (var e of window.sensed) e.parentElement.classList.remove("censor-parent");
window.censors = [];
window.sensed = [];
window.censorActive = false;

 // ------------------ Stop Invert area ------------------
if (window.invertAreaShield) window.invertAreaShield.remove();
window.removeEventListener("mousedown", window.invertAreaHold);
window.removeEventListener("touchstart", window.invertAreaHold);
window.invertAreaActive = false;

  // ------------------ Stop disorientation ------------------
if (window.disorientActive) {
  window.disorientActive = false;
  if (window.originalTransforms) {
    window.originalTransforms.forEach(({ el, transform }) => {
      ['', '-ms-', '-webkit-', '-o-', '-moz-'].forEach(prefix => {
        el.style[prefix + 'transform'] = transform;
      });
    });
    window.originalTransforms = null;
  }
}

    // ------------------ Stop Bubble Text ------------------
    if (window._bubbleCleanup) window._bubbleCleanup();
    window.bubbleActive = false;

    // ------------------ Stop Matrix Rain ------------------
if (window.matrixInt) {
    clearInterval(window.matrixInt);
    window.matrixInt = null;
}
if (window.matrixCanvas) {
    window.matrixCanvas.remove();
    window.matrixCanvas = null;
}
window.matrixActive = false;


   // ------------------ Stop Glitch ------------------
if(window.glitchInt){ 
    clearInterval(window.glitchInt); 
    window.glitchInt = null; 
}
window.glitchActive = false;

document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
.forEach(e=>{
    e.style.backgroundColor = '';
});

// ------------------ Stop Smooth Disco ------------------
if(window.discoSmoothInt){ 
    clearInterval(window.discoSmoothInt); 
    window.discoSmoothInt = null; 
}
window.discoSmoothActive = false;

document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
.forEach(e=>{
    e.style.transition = '';
    e.style.backgroundColor = '';
});


    // ------------------ Stop Full Chaos ------------------
    if(window.fullChaosLoop1){ clearInterval(window.fullChaosLoop1); window.fullChaosLoop1=null; }
    if(window.fullChaosLoop2){ clearInterval(window.fullChaosLoop2); window.fullChaosLoop2=null; }
    const chaos = document.getElementById('chaosContainer');
    if(chaos && !isImmune(chaos)) chaos.remove();
    window.fullChaosActive=false;

    // ------------------ Stop Page Spin ------------------
if (window.pageSpinStyle) {
    window.pageSpinStyle.remove();
    window.pageSpinStyle = null;
}
window.pageSpinActive = false;


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
        section.style.background = '#001f00';
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
