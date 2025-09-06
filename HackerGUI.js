(function(){
  if(window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  let overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:black;z-index:1000000;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#00ff00;font-family:Consolas,monospace;pointer-events:none;';

  let canvas=document.createElement('canvas');
  canvas.width=window.innerWidth;
  canvas.height=window.innerHeight;
  canvas.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;';
  overlay.appendChild(canvas);

  let msg=document.createElement('div');
  msg.innerText='[ BOOTING SYSTEM... ]';
  msg.style.cssText='font-size:20px;margin-bottom:10px;z-index:1000001;text-shadow:0 0 5px #00ff00;';
  overlay.appendChild(msg);

  let loading=document.createElement('div');
  loading.style.cssText='font-size:24px;font-weight:bold;z-index:1000001;text-shadow:0 0 10px #00ff00;';
  loading.innerText='Loading 0%';
  overlay.appendChild(loading);

  document.body.appendChild(overlay);

  // Matrix rain
  let ctx=canvas.getContext('2d');
  let chars='1010';
  let cols=Math.floor(canvas.width/10);
  let drops=[];
  for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*canvas.height);
  let rain=setInterval(()=>{
    ctx.fillStyle='rgba(0,0,0,0.05)';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='#0F0';
    ctx.font='10px monospace';
    for(let i=0;i<cols;i++){
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
      if(drops[i]*10>canvas.height&&Math.random()>0.975) drops[i]=0;
      drops[i]++;
    }
  },33);

  // Loading counter
  let progress=0;
  let int=setInterval(()=>{
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

  // ---------- MAIN FUNCTION TO SPAWN GUIs ----------
  function spawnGUIs(){
    // UTILITIES GUI
    const util=document.createElement('div');
    util.id='utilitiesGUI';
    util.style.cssText='position:fixed;top:50px;left:50px;width:280px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    util.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>';
    document.body.appendChild(util);

    // VFX GUI
    const vfx=document.createElement('div');
    vfx.id='vfxGUI';
    vfx.style.cssText='position:fixed;top:50px;right:50px;width:320px;background:#1b1b1b;color:#00ff00;font-family:Consolas,monospace;padding:10px;border:2px solid #00ff00;border-radius:8px;box-shadow:0 0 15px rgba(0,255,0,0.5);z-index:999999;user-select:none;cursor:move;';
    vfx.innerHTML='<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
    document.body.appendChild(vfx);

    // Dragging
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

    // Button helper
    function addBtn(container,name,on,off){
      let running=false;
      const btn=document.createElement('button');
      btn.style.cssText='display:block;width:100%;margin:4px 0;padding:6px;background:#0f0f0f;color:#00ff00;border:1px solid #00ff00;cursor:pointer;';
      const status=document.createElement('span');
      status.innerText=' [Stopped]';
      status.style.color='#ff0000';
      btn.innerText=name;
      btn.appendChild(status);
      btn.onclick=function(){
        running=!running;
        if(running){status.innerText=' [Running…]';status.style.color='#00ff00';on();}
        else{status.innerText=' [Stopped]';status.style.color='#ff0000';off&&off();}
      };
      container.appendChild(btn);
    }

    // -------------------- Utilities GUI Buttons --------------------
    addBtn(util,'Stop All',()=>{location.reload();});

    // -------------------- VFX GUI Buttons --------------------
    addBtn(vfx,'Page Spin',()=>{if(!window.pageSpinStyle){let s=document.createElement('style');s.id='pageSpinStyle';s.innerHTML='@keyframes roll {100%{transform:rotate(129600deg);}} body *:not(#vfxGUI *):not(#utilitiesGUI *){animation:roll 140s linear 360;}';document.head.appendChild(s);window.pageSpinStyle=s;}},()=>{if(window.pageSpinStyle){window.pageSpinStyle.remove();window.pageSpinStyle=null;}});

    addBtn(vfx,'Disco Mode',()=>{window.discoInt=window.discoInt||setInterval(()=>{document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)]});},100);},()=>{clearInterval(window.discoInt);window.discoInt=null;document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{e.style.backgroundColor=''});vfx.style.backgroundColor='#1b1b1b';});

    addBtn(vfx,'Matrix Rain',()=>{if(!window.matrixCanvas){let c=document.createElement('canvas');c.width=window.innerWidth;c.height=window.innerHeight;c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none;';document.body.appendChild(c);window.matrixCanvas=c;let ctx=c.getContext('2d');let chars='1010';let cols=Math.floor(window.innerWidth/10);let drops=[];for(let i=0;i<cols;i++)drops[i]=Math.floor(Math.random()*c.height);window.matrixInt=setInterval(()=>{ctx.fillStyle='rgba(0,0,0,0.05)';ctx.fillRect(0,0,c.width,c.height);ctx.fillStyle='#0F0';ctx.font='10px monospace';for(let i=0;i<cols;i++){ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);if(drops[i]*10>c.height&&Math.random()>0.975)drops[i]=0;drops[i]++;}},33);}},()=>{clearInterval(window.matrixInt);if(window.matrixCanvas){window.matrixCanvas.remove();window.matrixCanvas=null;}});

    // (You can re-add more buttons here: Explode Page, Image Glitch, Text Corruption, Bubble Text, etc.)
  }
})();
