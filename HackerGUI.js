(function(){
    if(window.hackerLoaded) return;
    window.hackerLoaded = true;

    // ---------- HELPER FUNCTIONS ----------
    function createElement(tag, props={}, parent=null){
        const el=document.createElement(tag);
        for(const [k,v] of Object.entries(props)){
            if(k==='style' && typeof v==='object') Object.assign(el.style,v);
            else el[k]=v;
        }
        if(parent) parent.appendChild(el);
        return el;
    }

    function addBtn(container,label,on,off=null){
        if(!container) return null;
        const btn=createElement('button',{textContent:label},container);
        Object.assign(btn.style,{width:'100%', margin:'2px 0', padding:'5px', borderRadius:'5px', cursor:'pointer', fontFamily:'Consolas,monospace', background:'#252525', color:'#0f0', border:'none'});
        btn.onclick=on;
        if(off) window.activeUtilities=window.activeUtilities||{}; window.activeUtilities[label]={on,off};
        return btn;
    }

    window.spawnGUIs = function() {
        // Utilities GUI
        let util = document.getElementById('utilitiesGUI');
        if(!util){
            util = createElement('div',{id:'utilitiesGUI', innerHTML:'<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>'},document.body);
            Object.assign(util.style,{
                position:'fixed', top:'50px', left:'50px', width:'320px',
                background:'#1b1b1b', color:'#00ff00', fontFamily:'Consolas,monospace',
                padding:'10px', border:'2px solid #00ff00', borderRadius:'8px',
                boxShadow:'0 0 15px rgba(0,255,0,0.5)', zIndex:999999, userSelect:'none', cursor:'move'
            });
            window.utilGUI=util;
        }

        // VFX GUI
        let vfx = document.getElementById('vfxGUI');
        if(!vfx){
            vfx = createElement('div',{id:'vfxGUI', innerHTML:'<div style="text-align:center;margin-bottom:8px;"><b>VFX</b></div>'},document.body);
            Object.assign(vfx.style,{
                position:'fixed', top:'100px', left:'400px', width:'320px',
                background:'#1b1b1b', color:'#00ff00', fontFamily:'Consolas,monospace',
                padding:'10px', border:'2px solid #00ff00', borderRadius:'8px',
                boxShadow:'0 0 15px rgba(0,255,0,0.5)', zIndex:999999, userSelect:'none', cursor:'move'
            });
            window.vfxGUI=vfx;
        }
    };

    window.vfxAddBtn=function(label,on,off){
        if(!window.vfxGUI) return;
        const btn=createElement('button',{textContent:label},window.vfxGUI);
        Object.assign(btn.style,{display:'block', width:'100%', margin:'4px 0', padding:'6px', background:'#111', color:'#0f0', border:'1px solid #0f0', borderRadius:'4px', cursor:'pointer'});
        btn._active=false;
        btn.onclick=()=>{ if(btn._active){ btn._active=false; if(off) off(); } else{ btn._active=true; if(on) on(); } };
        return btn;
    };

    // ---------- BOOTUP ----------
    const bootOverlay = document.createElement('div');
    Object.assign(bootOverlay.style, {
        position: 'fixed', top:0, left:0, width:'100%', height:'100%',
        background:'black', zIndex:1000000, display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', color:'#00ff00', fontFamily:'Consolas, monospace',
        pointerEvents:'none'
    });

    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    Object.assign(canvas.style, {position:'absolute', top:0, left:0, width:'100%', height:'100%'});
    bootOverlay.appendChild(canvas);

    const msg = document.createElement('div');
    msg.innerText = '[ BOOTING SYSTEM... ]';
    Object.assign(msg.style, {fontSize:'20px', marginBottom:'10px', zIndex:1000001, textShadow:'0 0 5px #00ff00'});
    bootOverlay.appendChild(msg);

    const loading = document.createElement('div');
    loading.innerText = 'Loading 0%';
    Object.assign(loading.style, {fontSize:'24px', fontWeight:'bold', zIndex:1000001, textShadow:'0 0 10px #00ff00'});
    bootOverlay.appendChild(loading);

    document.body.appendChild(bootOverlay);

    const ctx = canvas.getContext('2d');
    const chars = '1010';
    const cols = Math.floor(canvas.width/10);
    const drops = Array.from({length:cols},()=>Math.floor(Math.random()*canvas.height));

    const rain = setInterval(()=>{
        ctx.fillStyle='rgba(0,0,0,0.05)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        ctx.fillStyle='#0F0';
        ctx.font='10px monospace';
        drops.forEach((drop,i)=>{
            ctx.fillText(chars[Math.floor(Math.random()*chars.length)], i*10, drop*10);
            drops[i] = (drop*10>canvas.height && Math.random()>0.975)?0:drop+1;
        });
    },33);

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
                    bootOverlay.remove();
                    window.spawnGUIs(); // Create panels
                },2000);
            },500);
        }
    },40);

})();
