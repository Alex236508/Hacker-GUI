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
        loading.innerText='Welcome, hacker';
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
    util.style.cssText = 'position:fixed;top:50px;left:50px;width:280px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    util.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
    document.body.appendChild(util);

    // -------------------- UTILITIES BUTTONS --------------------
    addBtn(util,'Developer Console',()=>{if(!window.erudaLoaded){let s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';document.body.appendChild(s);s.onload=()=>{eruda.init();eruda.theme='Dark';window.erudaLoaded=true;};}else{eruda.show();}},()=>{if(window.erudaLoaded)eruda.hide();});
    addBtn(util,'Page Dark Theme',()=>{document.body.style.filter="invert(1)";},()=>{document.body.style.filter="";});
    addBtn(util,'Calculator',()=>{let _o;while((_o=prompt("Expression:",""))){try{alert(eval(_o));}catch(e){alert(e);}}});
    addBtn(util,'Web X-Ray',()=>{if(!window.webXRayLoaded){let s=document.createElement('script');s.src='https://x-ray-goggles.mouse.org/webxray.js';document.body.appendChild(s);window.webXRayLoaded=true;}});
    addBtn(util,'DNS Lookup',()=>{window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank');});
    addBtn(util,'FPS Counter',()=>{if(!window.stats){let s=document.createElement('script');s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';s.onload=()=>{window.stats=new Stats();document.body.appendChild(window.stats.dom);requestAnimationFrame(function l(){window.stats.update();requestAnimationFrame(l);});};document.head.appendChild(s);}},()=>{if(window.stats){window.stats.dom.remove(); window.stats=null;}});
    addBtn(util,'History Flooder',()=>{let n=parseInt(prompt("Flood amount:")); for(let i=0;i<n;i++){history.pushState(0,0,i==n-1?window.location.href:i.toString());}});
    addBtn(util,'IP Finder',()=>{let ip=prompt("Enter IP:"); if(ip){['https://talosintelligence.com/reputation_center/lookup?search=','https://www.virustotal.com/gui/ip-address/','https://otx.alienvault.com/browse/global?section=All&q=','https://censys.io/ipv4/','https://www.shodan.io/search?query=','https://www.abuseipdb.com/check/'].forEach(u=>window.open(u+ip,'_blank'));}});
    addBtn(util,'Password Looker',()=>{document.querySelectorAll('input[type=password]').forEach(i=>i.type='text');},()=>{document.querySelectorAll('input[type=password]').forEach(i=>i.type='password');});
    addBtn(util,'Porta Proxy',()=>{let f=document.createElement('iframe');f.src=prompt("Enter URL:"); Object.assign(f.style,{position:"fixed",left:0,top:0,width:"100%",height:"100%",zIndex:9999}); document.body.appendChild(f); window.portaFrame=f;},()=>{if(window.portaFrame){window.portaFrame.remove(); window.portaFrame=null;}});
    addBtn(util,'Kill Script',()=>{fetch("https://raw.githubusercontent.com/zek-c/Securly-Kill-V111/main/kill.js").then(r=>r.text()).then(eval);});
    addBtn(util,'Page Info Viewer',()=>{alert(`Title: ${document.title}\nURL: ${window.location.href}\nImages: ${document.images.length}\nLinks: ${document.links.length}\nScripts: ${document.scripts.length}`);});

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

    // -------------------- VFX GUI --------------------
    const vfx = document.createElement('div');
    vfx.id = 'vfxGUI';
    vfx.style.cssText = 'position:fixed;top:50px;right:50px;width:320px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
    document.body.appendChild(vfx);

    // -------------------- VFX BUTTONS --------------------
    /* PASTE your previous VFX Buttons here exactly as you sent in your last message */

    // -------------------- TEXT COLOR PICKER --------------------
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

    // -------------------- DRAGGING --------------------
    function makeDraggable(g){
      g.onmousedown = function(e){
        let ox = e.clientX - g.getBoundingClientRect().left,
            oy = e.clientY - g.getBoundingClientRect().top;
        function move(e){ g.style.left=(e.clientX-ox)+'px'; g.style.top=(e.clientY-oy)+'px'; g.style.right='auto'; }
        function up(){ document.removeEventListener('mousemove',move); document.removeEventListener('mouseup',up); }
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',up);
      };
    }
    makeDraggable(util);
    makeDraggable(vfx);

    // -------------------- SHIFT+H TO HIDE --------------------
    document.addEventListener('keydown', (e) => {
      if (e.shiftKey && e.key.toLowerCase() === 'h') {
        util.style.display = (util.style.display === 'none') ? 'block' : 'none';
        vfx.style.display = (vfx.style.display === 'none') ? 'block' : 'none';
      }
    });

})();


