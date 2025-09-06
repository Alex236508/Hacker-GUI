(function(){
  if(window.hackerLoaded) return;
  window.hackerLoaded = true;

  // ---------- BOOTUP ----------
  let overlay = document.createElement('div');
  overlay.style.cssText = `
    position:fixed;
    top:0; left:0;
    width:100%; height:100%;
    background:black;
    z-index:1000000;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;
    color:#00ff00;
    font-family:Consolas,monospace;
    pointer-events:none;
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
    util.style.cssText = `
      position:fixed;
      top:50px; left:50px;
      width:280px;
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

    // -------------------- VFX GUI --------------------
    const vfx = document.createElement('div');
    vfx.id = 'vfxGUI';
    vfx.style.cssText = `
      position:fixed;
      top:50px; right:50px;
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
    vfx.innerHTML = '<div style="text-align:center;margin-bottom:8px;"><b>Hacker GUI</b></div>';
    document.body.appendChild(vfx);

    // -------------------- BUTTON HELPER --------------------
    function addBtn(parent,text,on,onOff){
      const b=document.createElement('button');
      b.innerText=text;
      b.style.cssText='width:100%;margin:2px 0;padding:4px;background:#252525;color:#0F0;border:1px solid #0F0;border-radius:4px;cursor:pointer;font-family:monospace;';
      b.onclick=on;
      if(onOff) b.oncontextmenu=(e)=>{e.preventDefault();onOff();};
      parent.appendChild(b);
    }

    // ---------- STOP ALL BUTTONS ----------
    addBtn(util,'Stop All',()=>{
        // Stop VFX
        ['imgGlitchInt','linkRedirectsInt','matrixInt','discoInt','bubbleInt','pageSpinStyle','fullChaosLoop1','fullChaosLoop2'].forEach(i=>{
            if(window[i]){
                if(Array.isArray(window[i])){
                    window[i].forEach(ii=>clearInterval(ii));
                } else clearInterval(window[i]);
            }
            if(window[i+'Canvas']) { window[i+'Canvas'].remove(); window[i+'Canvas']=null; }
            window[i]=null;
        });
        // Reset all page styles except GUIs
        document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>{
            el.style.backgroundColor='';
            el.style.color='';
            el.style.transform='';
            el.style.fontSize='';
            el.style.transition='';
        });
    });

    // -------------------- UTILITIES BUTTONS --------------------
    addBtn(util,'Page Dark Theme',()=>{document.body.style.filter="invert(1)";},()=>{document.body.style.filter="";});
    addBtn(util,'Developer Console',()=>{if(!window.erudaLoaded){let s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/eruda@2.5.0/eruda.min.js';document.body.appendChild(s);s.onload=()=>{eruda.init();eruda.theme='Dark';window.erudaLoaded=true;};}else{eruda.show();}},()=>{if(window.erudaLoaded)eruda.hide();});
    addBtn(util,'Calculator',()=>{let _o;while((_o=prompt("Expression:",""))){try{alert(eval(_o));}catch(e){alert(e);}}});
    addBtn(util,'Web X-Ray',()=>{if(!window.webXRayLoaded){let s=document.createElement('script');s.src='https://x-ray-goggles.mouse.org/webxray.js';document.body.appendChild(s);window.webXRayLoaded=true;}});
    addBtn(util,'DNS Lookup',()=>{window.open('https://mxtoolbox.com/SuperTool.aspx?action=a:'+window.location.hostname,'_blank');});

    // -------------------- VFX BUTTONS --------------------
    // Page Spin
    addBtn(vfx,'Page Spin',()=>{
        if(window.pageSpinStyle) return;
        let s=document.createElement('style');
        s.id='pageSpinStyle';
        s.innerHTML='@keyframes roll{100%{transform:rotate(129600deg);}} body *:not(#vfxGUI *):not(#utilitiesGUI *){animation:roll 140s linear 360;}';
        document.head.appendChild(s);
        window.pageSpinStyle=s;
    },()=>{
        if(window.pageSpinStyle){window.pageSpinStyle.remove();window.pageSpinStyle=null;}
    });

    // Disco Mode
    addBtn(vfx,'Disco Mode',()=>{
        if(!window.discoInt) window.discoInt=[];
        const interval=setInterval(()=>{
            document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
                e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
            });
        },100);
        window.discoInt.push(interval);
    },()=>{
        if(window.discoInt){
            window.discoInt.forEach(i=>clearInterval(i));
            window.discoInt=[];
            document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>e.style.backgroundColor='');
        }
    });

    // Matrix Rain
    addBtn(vfx,'Matrix Rain',()=>{
        if(window.matrixCanvas) return;
        const c=document.createElement('canvas');
        c.width=window.innerWidth; c.height=window.innerHeight;
        c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none;';
        document.body.appendChild(c);
        window.matrixCanvas=c;
        const ctx=c.getContext('2d');
        const chars='1010';
        const cols=Math.floor(c.width/10);
        let drops=[]; for(let i=0;i<cols;i++) drops[i]=Math.floor(Math.random()*c.height);
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
    },()=>{
        clearInterval(window.matrixInt);
        if(window.matrixCanvas){window.matrixCanvas.remove();window.matrixCanvas=null;}
        window.matrixInt=null;
    });

    // Bubble Text
    addBtn(vfx,'Bubble Text',()=>{
        if(window.bubbleInt) return;
        window.bubbleInt=setInterval(()=>{
            function transform(el){
                if(el.id==='vfxGUI'||el.id==='utilitiesGUI'||el.closest('#vfxGUI,#utilitiesGUI')) return;
                if(el.childNodes.length>0) el.childNodes.forEach(transform);
                if(el.nodeType===Node.TEXT_NODE&&el.nodeValue){
                    const chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
                    const bubbles='ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩ①②③④⑤⑥⑦⑧⑨⓪'.split('');
                    el.textContent=el.textContent.replace(/[a-zA-Z0-9]/g,l=>bubbles[chars.indexOf(l)]);
                }
            }
            transform(document.body);
        },50);
    },()=>{clearInterval(window.bubbleInt);window.bubbleInt=null;});

    // Explode Page (Shockwave)
    addBtn(vfx,'Explode Page',()=>{
        let overlay=document.createElement('div');
        overlay.style.cssText='position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;';
        document.body.appendChild(overlay);
        let count=3;
        overlay.innerText=count;
        let interval=setInterval(()=>{
            count--;
            if(count>0) overlay.innerText=count;
            else{
                clearInterval(interval);
                overlay.remove();
                document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>{
                    el.style.transition='transform 1s ease-out';
                    const x=(Math.random()-0.5)*1000;
                    const y=(Math.random()-0.5)*1000;
                    const z=(Math.random()-0.5)*200;
                    el.style.transform=`translate3d(${x}px,${y}px,${z}px) rotate(${Math.random()*720-360}deg)`;
                });
                setTimeout(()=>{
                    document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>{
                        el.style.transform='';
                        el.style.transition='';
                    });
                },1500);
            }
        },1000);
    },()=>{});

    // Full Chaos
    addBtn(vfx,'Full Chaos',()=>{
        if(window.fullChaosLoop1) return;
        (function(){
            function c(){return '#'+Math.floor(16777215*Math.random()).toString(16);}
            function r(e){return Math.floor(Math.random()*e)+1;}
            document.head.innerHTML+='<style>*{margin:0;overflow:hidden} #vfxGUI,#utilitiesGUI{position:fixed !important;}</style>';
            window.fullChaosLoop1=setInterval(()=>{document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{e.style.backgroundColor=c(); e.style.color=c(); e.style.transform='rotate('+r(360)+'deg) scale('+Math.random()*2+')';});},100);
            window.fullChaosLoop2=setInterval(()=>{document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{e.style.transform='rotate('+r(360)+'deg) scale('+Math.random()*2+')';});},100);
        })();
    },()=>{clearInterval(window.fullChaosLoop1); clearInterval(window.fullChaosLoop2); window.fullChaosLoop1=null; window.fullChaosLoop2=null; document.querySelectorAll('*:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>{el.style.backgroundColor=''; el.style.color=''; el.style.transform='';}); });

    // -------------------- SLIDERS --------------------
    (function(){
        const section = document.createElement('div');
        section.style.marginTop='10px';
        section.style.padding='8px';
        section.style.background='#252525';
        section.style.borderRadius='10px';
        section.style.color='#00ff00';
        section.innerHTML = `<b>Font Size</b><br>`;
        const slider = document.createElement('input');
        slider.type='range';
        slider.min='10';
        slider.max='50';
        slider.value='16';
        slider.style.width='100%';
        slider.oninput = ()=>{
            document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>el.style.fontSize=slider.value+'px');
        };
        slider.onmousedown=(e)=>e.stopPropagation();
        section.appendChild(slider);
        util.appendChild(section);
    })();

    (function(){
        const section = document.createElement('div');
        section.style.marginTop='10px';
        section.style.padding='8px';
        section.style.background='#252525';
        section.style.borderRadius='10px';
        section.style.color='#00ff00';
        section.innerHTML = `<b>Text Color</b><br>`;
        const picker = document.createElement('input');
        picker.type='color';
        picker.value='#00ff00';
        picker.oninput=()=>{document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>el.style.color=picker.value)};
        picker.onmousedown=(e)=>e.stopPropagation();
        section.appendChild(picker);
        vfx.appendChild(section);
    })();

    // -------------------- DRAGGING --------------------
    function makeDraggable(g){
        g.onmousedown=function(e){
            if(e.target.tagName==='INPUT') return;
            let ox=e.clientX-g.getBoundingClientRect().left,
                oy=e.clientY-g.getBoundingClientRect().top;
            function move(e){ g.style.left=(e.clientX-ox)+'px'; g.style.top=(e.clientY-oy)+'px'; g.style.right='auto'; }
            function up(){ document.removeEventListener('mousemove',move); document.removeEventListener('mouseup',up); }
            document.addEventListener('mousemove',move);
            document.addEventListener('mouseup',up);
        };
    }
    makeDraggable(util);
    makeDraggable(vfx);

    // -------------------- SHIFT+H TO HIDE --------------------
    document.addEventListener('keydown', (e)=>{
        if(e.shiftKey && e.key.toLowerCase()==='h'){
            util.style.display=(util.style.display==='none')?'block':'none';
            vfx.style.display=(vfx.style.display==='none')?'block':'none';
        }
    });
  }
})();
