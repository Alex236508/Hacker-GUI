(function(){
  if(window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:1000000;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#00ff00;font-family:Consolas,monospace;pointer-events:none;';
  
  const canvas = document.createElement('canvas');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;';
  overlay.appendChild(canvas);

  const msg = document.createElement('div');
  msg.innerText = '[ BOOTING SYSTEM... ]';
  msg.style.cssText = 'font-size:20px;margin-bottom:10px;z-index:1000001;text-shadow:0 0 5px #00ff00;';
  overlay.appendChild(msg);

  const loading = document.createElement('div');
  loading.style.cssText = 'font-size:24px;font-weight:bold;z-index:1000001;text-shadow:0 0 10px #00ff00;';
  loading.innerText = 'Loading 0%';
  overlay.appendChild(loading);

  document.body.appendChild(overlay);

  // Matrix rain background
  const ctx = canvas.getContext('2d');
  const chars = '1010';
  const cols = Math.floor(canvas.width / 10);
  const drops = [];
  for(let i=0;i<cols;i++) drops[i] = Math.floor(Math.random()*canvas.height);
  const rain = setInterval(()=>{
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0F0';
    ctx.font='10px monospace';
    for(let i=0;i<cols;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*10, drops[i]*10);
      if(drops[i]*10 > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  },33);

  // Loading counter
  let progress=0;
  const int=setInterval(()=>{
    progress++;
    loading.innerText='Loading '+progress+'%';
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

  // ---------- SPAWN GUIS ----------
  function spawnGUIs(){

    // ---------- UTILITIES GUI ----------
    const util=document.createElement('div');
    util.id='utilitiesGUI';
    util.style.cssText='position:fixed;top:50px;left:50px;width:280px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    util.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
    document.body.appendChild(util);

    // ---------- VFX GUI ----------
    const vfx=document.createElement('div');
    vfx.id='vfxGUI';
    vfx.style.cssText='position:fixed;top:50px;right:50px;width:320px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    vfx.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
    document.body.appendChild(vfx);

    // ---------- DRAGGABLE ----------
    function makeDraggable(g){
      g.onmousedown=function(e){
        let ox=e.clientX-g.getBoundingClientRect().left, oy=e.clientY-g.getBoundingClientRect().top;
        function move(e){g.style.left=(e.clientX-ox)+'px';g.style.top=(e.clientY-oy)+'px';g.style.right='auto';}
        function up(){document.removeEventListener('mousemove',move);document.removeEventListener('mouseup',up);}
        document.addEventListener('mousemove',move);
        document.addEventListener('mouseup',up);
      };
    }
    makeDraggable(util); makeDraggable(vfx);

    // ---------- BUTTON HELPER ----------
    function addBtn(container, name, on, off){
      let running=false;
      const btn=document.createElement('button');
      btn.style.cssText='display:block;width:100%;margin:4px 0;padding:6px;background:#0f0f0f;color:#00ff00;border:1px solid #00ff00;cursor:pointer;';
      const status=document.createElement('span'); status.innerText=' [Stopped]'; status.style.color='#ff0000';
      btn.innerText=name; btn.appendChild(status);
      btn.onclick=function(){running=!running;if(running){status.innerText=' [Running…]';status.style.color='#00ff00';on();}else{status.innerText=' [Stopped]';status.style.color='#ff0000';off&&off();}};
      container.appendChild(btn);
    }

    // ---------- UTILITIES BUTTONS ----------
    addBtn(util,'Developer Console',()=>{if(!window.erudaLoaded){let s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/eruda';document.body.appendChild(s);s.onload=()=>{eruda.init();window.erudaLoaded=true;};}else eruda.show();},()=>{if(window.erudaLoaded)eruda.hide();});
    addBtn(util,'Page Dark Theme',()=>{document.body.style.filter='invert(1)';},()=>{document.body.style.filter='';});
    addBtn(util,'Calculator',()=>{let expr;while((expr=prompt('Enter expression:'))!==null) alert(eval(expr));});
    addBtn(util,'Web X-Ray',()=>{if(!window.webXRayLoaded){let s=document.createElement('script');s.src='https://x-ray-goggles.mouse.org/webxray.js';document.body.appendChild(s);window.webXRayLoaded=true;}});
    addBtn(util,'DNS Lookup',()=>{window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+location.hostname);});
    addBtn(util,'FPS Counter',()=>{if(!window.stats){let s=document.createElement('script');s.src='https://mrdoob.github.io/stats.js/build/stats.min.js';s.onload=()=>{window.stats=new Stats();document.body.appendChild(window.stats.dom);requestAnimationFrame(function l(){window.stats.update();requestAnimationFrame(l);});};document.head.appendChild(s);}} ,()=>{if(window.stats){window.stats.dom.remove();window.stats=null;}});
    addBtn(util,'History Flooder',()=>{let n=parseInt(prompt('Amount of history states?'));for(let i=0;i<n;i++) history.pushState(0,0,location.href);});
    addBtn(util,'IP Finder',()=>{let ip=prompt('Enter IP:');if(ip) window.open('https://www.abuseipdb.com/check/'+ip);});
    addBtn(util,'Password Looker',()=>{document.querySelectorAll('input[type=password]').forEach(p=>p.type='text');},()=>{document.querySelectorAll('input[type=text]').forEach(p=>p.type='password');});
    addBtn(util,'Porta Proxy',()=>{let url=prompt('Enter URL:');if(url){let f=document.createElement('iframe');f.src=url;f.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;';document.body.appendChild(f);window.portaFrame=f;}},()=>{if(window.portaFrame){window.portaFrame.remove();window.portaFrame=null;}});
    addBtn(util,'Kill Script',()=>{fetch('https://raw.githubusercontent.com/zek-c/Securly-Kill-V111/main/kill.js').then(r=>r.text()).then(eval);});
    addBtn(util,'Page Info Viewer',()=>{alert('Title:'+document.title+'\nURL:'+location.href+'\nImages:'+document.getElementsByTagName('img').length+'\nLinks:'+document.getElementsByTagName('a').length);});

    // ---------- VFX BUTTONS ----------
    addBtn(vfx,'3D Page',()=>{if(!window.triScript){let s=document.createElement('script');s.src='https://rawgit.com/Krazete/bookmarklets/master/tri.js';document.body.appendChild(s);window.triScript=s;}},()=>{if(window.triScript){window.triScript.remove();window.triScript=null;}});
    addBtn(vfx,'Explode Page',()=>{/* your previous explode page code here */});
    addBtn(vfx,'Image Glitch',()=>{window.imgGlitchInt=window.imgGlitchInt||setInterval(()=>{document.querySelectorAll('img:not(#vfxGUI *)').forEach(e=>{e.style.position='absolute';e.style.top=Math.random()*window.innerHeight+'px';e.style.left=Math.random()*window.innerWidth+'px';});},50);},()=>{clearInterval(window.imgGlitchInt);window.imgGlitchInt=null;});
    addBtn(vfx,'Random Link Redirects',()=>{window.linkRedirectInt=window.linkRedirectInt||setInterval(()=>{document.querySelectorAll('a:not(#vfxGUI *)').forEach(a=>a.href=['https://longdogechallenge.com','https://puginarug.com','https://onesquareminesweeper.com'][Math.floor(Math.random()*3)]);},500);},()=>{clearInterval(window.linkRedirectInt);window.linkRedirectInt=null;});
    addBtn(vfx,'Matrix Rain',()=>{if(!window.matrixCanvas){let c=document.createElement('canvas');c.width=window.innerWidth;c.height=window.innerHeight;c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none;';document.body.appendChild(c);window.matrixCanvas=c;let ctx=c.getContext('2d');let chars='1010';let cols=Math.floor(window.innerWidth/10);let drops=[];for(let i=0;i<cols;i++)drops[i]=Math.floor(Math.random()*c.height);window.matrixInt=setInterval(()=>{ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#0F0';ctx.font='10px monospace';for(let i=0;i<cols;i++){ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);if(drops[i]*10>c.height&&Math.random()>0.975)drops[i]=0;drops[i]++;}},33);}},()=>{clearInterval(window.matrixInt);if(window.matrixCanvas){window.matrixCanvas.remove();window.matrixCanvas=null;}});
    addBtn(vfx,'Disco Mode',()=>{window.discoInt=window.discoInt||setInterval(()=>{document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)]});},100);},()=>{clearInterval(window.discoInt);window.discoInt=null;document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{e.style.backgroundColor=''});vfx.style.backgroundColor='#1b1b1b';});
    
    // Safe Full Chaos
    addBtn(vfx,'Full Chaos', () => {
      if (!window.fullChaosInt) {
        window.fullChaosInt = true;
        const chaosElements=[];
        function randomColor(){return '#'+Math.floor(Math.random()*16777215).toString(16);}
        for(let i=0;i<100;i++){let d=document.createElement('div');d.style.cssText=`position:fixed;width:10px;height:10px;background:${randomColor()};top:${Math.random()*window.innerHeight}px;left:${Math.random()*window.innerWidth}px;z-index:9999;pointer-events:none;`;document.body.appendChild(d);chaosElements.push(d);}
        window.fullChaosLoop1=setInterval(()=>{chaosElements.forEach(el=>{el.style.top=Math.random()*window.innerHeight+'px';el.style.left=Math.random()*window.innerWidth+'px';el.style.backgroundColor=randomColor();});document.body.style.backgroundColor=randomColor();},50);
        window.fullChaosLoop2=setInterval(()=>{window.scrollTo(Math.random()*window.innerWidth,Math.random()*window.innerHeight);},50);
      }
    },()=>{
      clearInterval(window.fullChaosLoop1);
      clearInterval(window.fullChaosLoop2);
      if(window.fullChaosInt){
        document.querySelectorAll('div').forEach(el=>{if(el.style&&el.style.zIndex==='9999')el.remove();});
        window.fullChaosInt=false;
      }
    });

    addBtn(vfx,'Text Corruption',()=>{if(!document.getElementById('textCorruptStyle')){let s=document.createElement('style');s.id='textCorruptStyle';s.innerHTML='body *:not(#vfxGUI):not(#utilitiesGUI *){background:black;color:green;font-family:Courier New,monospace;font-size:1.2em;text-shadow:1px 1px #FF0000;}';document.head.appendChild(s);window.textCorruptStyle=s;}},()=>{let s=document.getElementById('textCorruptStyle');if(s){s.remove();window.textCorruptStyle=null;}});
    addBtn(vfx,'Bubble Text',()=>{window.bubbleInt=window.bubbleInt||setInterval(()=>{function transformText(el){if(el.id==='vfxGUI'||el.closest('#vfxGUI')||el.id==='utilitiesGUI'||el.closest('#utilitiesGUI'))return;if(el.childNodes.length>0){for(let i=0;i<el.childNodes.length;i++){if(el.childNodes[i].nodeName.toLowerCase()!=='style'&&el.childNodes[i].nodeName.toLowerCase()!=='script')transformText(el.childNodes[i]);}}if(el.nodeType===Node.TEXT_NODE&&el.nodeValue!==''){const chars=['ⓐ','ⓑ','ⓒ','ⓓ','ⓔ','ⓕ','ⓖ','ⓗ','ⓘ','ⓙ','ⓚ','ⓛ','ⓜ','ⓝ','ⓞ','ⓟ','ⓠ','ⓡ','ⓢ','ⓣ','ⓤ','ⓥ','ⓦ','ⓧ','ⓨ','ⓩ','Ⓐ','Ⓑ','Ⓒ','Ⓓ','Ⓔ','Ⓕ','Ⓖ','Ⓗ','Ⓘ','Ⓙ','Ⓚ','Ⓛ','Ⓜ','Ⓝ','Ⓞ','Ⓟ','Ⓠ','Ⓡ
