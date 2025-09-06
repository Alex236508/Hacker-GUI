(function() {
  if (window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  let overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    z-index: 1000000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #00ff00;
    font-family: Consolas, monospace;
    pointer-events: none;
  `;

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

  // Matrix rain during boot
  let ctx = canvas.getContext('2d');
  let chars = '1010';
  let cols = Math.floor(canvas.width / 10);
  let drops = [];
  for (let i = 0; i < cols; i++) drops[i] = Math.floor(Math.random() * canvas.height);

  let rain = setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0F0';
    ctx.font = '10px monospace';
    for (let i = 0; i < cols; i++) {
      ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 10, drops[i] * 10);
      if (drops[i] * 10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }, 33);

  // Loading counter
  let progress = 0;
  let int = setInterval(() => {
    progress++;
    loading.innerText = 'Loading ' + progress + '%';
    if (progress >= 100) {
      clearInterval(int);
      setTimeout(() => {
        loading.innerText = 'Welcome, hacker';
        setTimeout(() => {
          clearInterval(rain);
          overlay.remove();
          spawnGUIs();
        }, 2000);
      }, 500);
    }
  }, 40);

  // ---------- SPAWN GUIs ----------
  function spawnGUIs() {
    // Utilities GUI
    const util = document.createElement('div');
    util.id = 'utilitiesGUI';
    util.style.cssText = `
      position: fixed;
      top: 50px;
      left: 50px;
      width: 280px;
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
    util.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
    document.body.appendChild(util);

    // VFX GUI
    const vfx = document.createElement('div');
    vfx.id = 'vfxGUI';
    vfx.style.cssText = `
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
    vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
    document.body.appendChild(vfx);

    // Drag helper
    function makeDraggable(g) {
      g.onmousedown = function(e) {
        let ox = e.clientX - g.getBoundingClientRect().left,
            oy = e.clientY - g.getBoundingClientRect().top;
        function move(e) { g.style.left = (e.clientX - ox) + 'px'; g.style.top = (e.clientY - oy) + 'px'; g.style.right = 'auto'; }
        function up() { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', up);
      };
    }
    makeDraggable(util); makeDraggable(vfx);

    // Button helper
    function addBtn(container, name, on, off) {
      let running = false;
      const btn = document.createElement('button');
      btn.style.cssText = 'display:block;width:100%;margin:4px 0;padding:6px;background:#0f0f0f;color:#00ff00;border:1px solid #00ff00;cursor:pointer;';
      const status = document.createElement('span');
      status.innerText = ' [Stopped]';
      status.style.color = '#ff0000';
      btn.innerText = name;
      btn.appendChild(status);
      btn.onclick = function() {
        running = !running;
        if (running) { status.innerText = ' [Running…]'; status.style.color = '#00ff00'; on(); }
        else { status.innerText = ' [Stopped]'; status.style.color = '#ff0000'; off && off(); }
      };
      container.appendChild(btn);
    }

    // -------------------- UTILITIES BUTTONS --------------------
    addBtn(util, 'Developer Console', () => {
      if (!window.erudaLoaded) {
        const s = document.createElement('script');
        s.src = 'https://cdn.jsdelivr.net/npm/eruda';
        s.onload = () => { eruda.init(); eruda.theme = 'Dark'; window.erudaLoaded = true; };
        document.body.appendChild(s);
      } else { eruda.show(); }
    }, () => { if (window.erudaLoaded) eruda.hide(); });

    addBtn(util, 'Page Dark Theme', () => {
      if (!window.pageDark) {
        document.querySelectorAll('body *:not(#utilitiesGUI):not(#vfxGUI)').forEach(el => { if(el.style){ el.style.fontFamily = "Comic Sans MS"; el.style.filter = "invert(1)"; }});
        window.pageDark = true;
      }
    }, () => {
      if (window.pageDark) {
        document.querySelectorAll('body *:not(#utilitiesGUI):not(#vfxGUI)').forEach(el => { if(el.style){ el.style.fontFamily = ""; el.style.filter = ""; }});
        window.pageDark = false;
      }
    });

    addBtn(util, 'Calculator', () => {
      let _t = 'JAVASCRIPTER.NET Calculator - Input expression:';
      let _z = '';
      let _o;
      function calc() { _o = prompt(_t, _z); if(_o!=='' && _o!=null) _z = eval(_o); }
      calc(); while(_o!=='' && _o!=null) calc();
    });

    addBtn(util, 'Web X-Ray', () => {
      if (!window.webXRayLoaded) {
        const s = document.createElement('script');
        s.src = 'https://x-ray-goggles.mouse.org/webxray.js';
        s.className = 'webxray';
        s.setAttribute('data-lang','en-US');
        s.setAttribute('data-baseuri','https://x-ray-goggles.mouse.org');
        document.body.appendChild(s);
        window.webXRayLoaded = true;
      }
    });

    addBtn(util, 'DNS Lookup', () => {
      window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:' + window.location.hostname + '&run=toolpage');
    });

    addBtn(util, 'FPS Counter', () => {
      if (!window.stats) {
        const s = document.createElement('script');
        s.src = 'https://mrdoob.github.io/stats.js/build/stats.min.js';
        s.onload = () => {
          window.stats = new Stats();
          document.body.appendChild(window.stats.dom);
          (function loop(){ window.stats.update(); requestAnimationFrame(loop); })();
        };
        document.head.appendChild(s);
      }
    }, () => { if(window.stats){ window.stats.dom.remove(); window.stats=null; }});

    addBtn(util, 'History Flooder', () => {
      let num = parseInt(prompt("History flood amount:"));
      if (isNaN(num) || num<1) return;
      let x = window.location.href;
      for(let i=1;i<=num;i++) history.pushState(0,0,i==num?x:i.toString());
      alert("History flood successful! " + window.location.href + " now appears " + num + (num==1?" time.":" times."));
    });

    addBtn(util, 'IP Finder', () => {
      let ip = prompt("Enter IP Address:");
      if(!ip) return;
      ['https://talosintelligence.com/reputation_center/lookup?search=',
       'https://www.virustotal.com/gui/ip-address/',
       'https://otx.alienvault.com/browse/global?section=All&q=',
       'https://censys.io/ipv4/',
       'https://www.shodan.io/search?query=',
       'https://www.abuseipdb.com/check/'].forEach(u => window.open(u+ip,'_blank'));
    });

    addBtn(util, 'Password Looker', () => {
      document.querySelectorAll('input[type=password]').forEach(el => el.setAttribute('type','text'));
    }, () => {
      document.querySelectorAll('input[type=password]').forEach(el => el.setAttribute('type','password'));
    });

    addBtn(util, 'Porta Proxy', () => {
      if(!window.portaFrame){
        let frame = document.createElement('iframe');
        frame.src = prompt("Enter URL (include https://)");
        frame.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;border:0;z-index:9999;';
        document.body.appendChild(frame);
        window.portaFrame=frame;
      }
    }, () => { if(window.portaFrame){ window.portaFrame.remove(); window.portaFrame=null; }});

    addBtn(util, 'Kill Script', () => {
      fetch("https://raw.githubusercontent.com/zek-c/Securly-Kill-V111/main/kill.js").then(r=>r.text()).then(r=>eval(r));
    });

    addBtn(util, 'Page Info Viewer', () => {
      alert('Page Info:\nTitle: '+document.title+'\nURL: '+window.location.href+
            '\nImages: '+document.getElementsByTagName('img').length+
            '\nLinks: '+document.getElementsByTagName('a').length+
            '\nScripts: '+document.getElementsByTagName('script').length);
    });

    // -------------------- VFX BUTTONS --------------------
    addBtn(vfx, 'Page Spin', () => {
      if(!window.pageSpinStyle){
        let s = document.createElement('style');
        s.id='pageSpinStyle';
        s.innerHTML='@keyframes roll {100%{transform:rotate(129600deg);}} body *:not(#vfxGUI *):not(#utilitiesGUI *){animation:roll 140s linear 360;}';
        document.head.appendChild(s);
        window.pageSpinStyle=s;
      }
    }, () => { if(window.pageSpinStyle){ window.pageSpinStyle.remove(); window.pageSpinStyle=null; } });

    addBtn(vfx, 'Disco Mode', () => {
      window.discoInt = window.discoInt || setInterval(()=>{
        document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
        .forEach(e => { e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)]; });
      },100);
    }, () => {
      clearInterval(window.discoInt); window.discoInt=null;
      document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)')
        .forEach(e => { e.style.backgroundColor=''; });
      vfx.style.backgroundColor='#1b1b1b';
    });

    addBtn(vfx, 'Matrix Rain', () => {
      if(!window.matrixCanvas){
        let c = document.createElement('canvas'); c.width=window.innerWidth; c.height=window.innerHeight;
        c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none;';
        document.body.appendChild(c); window.matrixCanvas=c;
        let ctx=c.getContext('2d'); let chars='1010'; let cols=Math.floor(window.innerWidth/10); let drops=[];
        for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*c.height);
        window.matrixInt=setInterval(()=>{
          ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(0,0,c.width,c.height);
          ctx.fillStyle='#0F0'; ctx.font='10px monospace';
          for(let i=0;i<cols;i++){ ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10); if(drops[i]*10>c.height&&Math.random()>0.975)drops[i]=0; drops[i]++; }
        },33);
      }
    }, () => { clearInterval(window.matrixInt); if(window.matrixCanvas){ window.matrixCanvas.remove(); window.matrixCanvas=null; }});

    addBtn(vfx, 'Full Chaos', () => {
  if (!window.fullChaosInt) {
    window.fullChaosInt = true;

    // Keep track of temporary chaos elements
    const chaosElements = [];

    function randomColor() { return '#'+Math.floor(Math.random()*16777215).toString(16); }

    // Create a bunch of small divs for chaotic animation
    for (let i = 0; i < 100; i++) {
      let div = document.createElement('div');
      div.style.cssText = `position:fixed;width:10px;height:10px;background:${randomColor()};top:${Math.random()*window.innerHeight}px;left:${Math.random()*window.innerWidth}px;z-index:9999;pointer-events:none;`;
      document.body.appendChild(div);
      chaosElements.push(div);
    }

    // Animate chaos
    window.fullChaosLoop1 = setInterval(() => {
      chaosElements.forEach(el => {
        el.style.top = Math.random() * window.innerHeight + 'px';
        el.style.left = Math.random() * window.innerWidth + 'px';
        el.style.backgroundColor = randomColor();
      });
      document.body.style.backgroundColor = randomColor();
    }, 50);

    // Scroll loop for extra chaotic effect
    window.fullChaosLoop2 = setInterval(() => { window.scrollTo(Math.random()*window.innerWidth, Math.random()*window.innerHeight); }, 50);
  }
}, () => {
  clearInterval(window.fullChaosLoop1);
  clearInterval(window.fullChaosLoop2);
  if (window.fullChaosInt) {
    // Remove temporary chaos divs
    document.querySelectorAll('div').forEach(el => {
      if (el.style && el.style.zIndex === '9999') el.remove();
    });
    window.fullChaosInt = false;
  }
});

