(function() {
    function main() {
        if (window.hackerLoaded) return;
        window.hackerLoaded = true;

        // ---------- BOOTUP OVERLAY ----------
        const bootOverlay = document.createElement('div');
        Object.assign(bootOverlay.style, {
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'black', zIndex: 1000000, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', color: '#00ff00',
            fontFamily: 'Consolas, monospace', pointerEvents: 'none'
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

        // ---------- MATRIX RAIN ----------
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

        // ---------- LOADING COUNTER ----------
        let progress = 0;
        const loader = setInterval(() => {
            progress++;
            loading.innerText = `Loading ${progress}%`;
            if (progress >= 100) {
                clearInterval(loader);
                setTimeout(() => {
                    loading.innerText = 'Welcome, Hacker';
                    setTimeout(() => {
                        clearInterval(rain);
                        bootOverlay.remove(); // remove boot overlay
                        spawnGUIs();          // create panels
                    }, 2000);
                }, 500);
            }
        }, 40);

        // ---------- ELEMENT CREATION HELPER ----------
        function createElement(tag, props = {}, parent = null) {
            const el = document.createElement(tag);
            for (const [k, v] of Object.entries(props)) {
                if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
                else el[k] = v;
            }
            if (parent) parent.appendChild(el);
            return el;
        }

        // ---------- BUTTON HELPER ----------
        function addBtn(container, label, on, off = null) {
            if (!container) return null;
            const btn = createElement('button', {textContent: label}, container);
            Object.assign(btn.style, {
                width:'100%', margin:'2px 0', padding:'5px',
                borderRadius:'5px', cursor:'pointer',
                fontFamily:'Consolas, monospace', background:'#252525',
                color:'#0f0', border:'none'
            });
            btn.onclick = on;
            if (off) {
                window.activeUtilities = window.activeUtilities || {};
                window.activeUtilities[label] = {on, off};
            }
            return btn;
        }

        // ---------- VFX BUTTON HELPER ----------
        window.vfxAddBtn = function(label, on, off) {
            if (!window.vfxGUI) return;
            const btn = createElement('button', {textContent: label}, window.vfxGUI);
            Object.assign(btn.style, {
                display:'block', width:'100%', margin:'4px 0', padding:'6px',
                background:'#111', color:'#0f0', border:'1px solid #0f0',
                borderRadius:'4px', cursor:'pointer'
            });
            btn._active = false;
            btn.onclick = () => {
                if (btn._active) { btn._active = false; if(off) off(); }
                else { btn._active = true; if(on) on(); }
            };
            return btn;
        };

        // ---------- GUI SPAWNER ----------
        window.spawnGUIs = function() {
            // Utilities Panel
            let util = document.getElementById('utilitiesGUI');
            if (!util) {
                util = createElement('div', {id:'utilitiesGUI', innerHTML:'<div style="text-align:center;margin-bottom:8px;"><b>Utilities</b></div>'}, document.body);
                Object.assign(util.style, {
                    position:'fixed', top:'50px', left:'50px', width:'320px',
                    background:'#1b1b1b', color:'#00ff00', fontFamily:'Consolas, monospace',
                    padding:'10px', border:'2px solid #00ff00', borderRadius:'8px',
                    boxShadow:'0 0 15px rgba(0,255,0,0.5)', zIndex:999999, userSelect:'none', cursor:'move'
                });
                window.utilGUI = util;

                // Add Utilities button
                addBtn(util, 'Test Utility', () => alert('Utility Activated!'));
                makeDraggable(util);
            }

            // ---------- VFX PANEL ----------
(function() {
    if (!window.vfxGUI) return;

    function createBtn(label, on, off) {
        const btn = document.createElement('button');
        btn.textContent = label;
        Object.assign(btn.style, {
            display: 'block', width: '100%', margin: '4px 0', padding: '6px',
            background: '#111', color: '#0f0', border: '1px solid #0f0',
            borderRadius: '4px', cursor: 'pointer'
        });
        btn._active = false;
        btn.onclick = () => {
            if (btn._active) { btn._active = false; if(off) off(); }
            else { btn._active = true; if(on) on(); }
        };
        window.stopAllVFX = window.stopAllVFX || [];
        return btn;
    }

    const vfx = window.vfxGUI;

    // ---------- 3D Page ----------
    vfx.appendChild(createBtn('3D Page', () => {
        if (!window.triScript) {
            const s = document.createElement('script');
            s.src = 'https://rawgit.com/Krazete/bookmarklets/master/tri.js';
            document.body.appendChild(s);
            window.triScript = s;
        }
    }, () => {
        if (window.triScript) { window.triScript.remove(); window.triScript = null; }
    }));

    // ---------- Explode Page ----------
    vfx.appendChild(createBtn('Explode Page', () => {
        if (window.explodeActive) return;
        window.explodeActive = true;
        const o = document.createElement('div');
        o.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);color:#FF0000;font-size:50px;font-family:monospace;z-index:10000000;pointer-events:none;text-shadow:0 0 10px #FF0000;';
        document.body.appendChild(o);
        let c = 3; o.innerText = c;
        window.explodeInt = setInterval(() => {
            c--; if(c>0) o.innerText = c; else {
                clearInterval(window.explodeInt);
                o.remove();
                document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
                    e.style.transition='transform 1s ease-out';
                    let x=(Math.random()-0.5)*1000, y=(Math.random()-0.5)*1000, z=(Math.random()-0.5)*200;
                    e.style.transform=`translate3d(${x}px,${y}px,${z}px) rotate(${Math.random()*720-360}deg)`;
                });
                setTimeout(()=>{
                    document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{ e.style.transform=''; e.style.transition=''; });
                    window.explodeActive=false;
                }, 1500);
            }
        }, 1000);
    }, () => {
        clearInterval(window.explodeInt);
        window.explodeInt = null; window.explodeActive=false;
        document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{ e.style.transform=''; e.style.transition=''; });
    }));

    // ---------- Image Glitch ----------
    vfx.appendChild(createBtn('Image Glitch', () => {
        if(window.imgGlitchInt) return;
        window.imgGlitchInt = setInterval(()=>{
            document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{
                e.style.position='absolute';
                e.style.left=Math.random()*window.innerWidth+'px';
                e.style.top=Math.random()*window.innerHeight+'px';
            });
        },50);
    }, () => {
        if(window.imgGlitchInt){
            clearInterval(window.imgGlitchInt); window.imgGlitchInt=null;
            document.querySelectorAll('img:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(e=>{ e.style.position=''; e.style.left=''; e.style.top=''; });
        }
    }));

    // ---------- Random Link Redirects ----------
    vfx.appendChild(createBtn('Random Link Redirects', () => {
        window.linkRedirectsInt = setInterval(()=>{
            document.querySelectorAll('a:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(a=>{
                a.href=['https://longdogechallenge.com/','https://puginarug.com/','https://onesquareminesweeper.com/'][Math.floor(Math.random()*3)];
            });
        },500);
    }, () => {
        clearInterval(window.linkRedirectsInt); window.linkRedirectsInt = null;
    }));

    // ---------- Matrix Rain ----------
    vfx.appendChild(createBtn('Matrix Rain', () => {
        if(window.matrixActive) return;
        window.matrixActive=true;
        if(!window.matrixCanvas){
            let c = document.createElement('canvas');
            c.width = window.innerWidth; c.height = window.innerHeight;
            c.style.cssText='position:fixed;top:0;left:0;z-index:99999;pointer-events:none';
            document.body.appendChild(c); window.matrixCanvas=c;
            let ctx=c.getContext('2d'), chars='1010', cols=Math.floor(window.innerWidth/10);
            let drops = Array.from({length:cols}, ()=>Math.floor(Math.random()*c.height));
            window.matrixInt=setInterval(()=>{
                ctx.fillStyle='rgba(0,0,0,0.05)'; ctx.fillRect(0,0,c.width,c.height);
                ctx.fillStyle='#0F0'; ctx.font='10px monospace';
                for(let i=0;i<cols;i++){
                    ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*10,drops[i]*10);
                    if(drops[i]*10>c.height && Math.random()>0.975) drops[i]=0; drops[i]++;
                }
            },33);
        }
    }, () => {
        clearInterval(window.matrixInt); window.matrixInt=null;
        if(window.matrixCanvas){ window.matrixCanvas.remove(); window.matrixCanvas=null; }
        window.matrixActive=false;
    }));

    // ---------- Glitch Colors ----------
    vfx.appendChild(createBtn('Glitch', () => {
        if(window.glitchActive) return;
        window.glitchActive=true;
        window.glitchInt=setInterval(()=>{
            document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
                e.style.backgroundColor=['red','orange','yellow','green','blue','purple','pink'][Math.floor(Math.random()*7)];
            });
        },25);
    }, () => {
        if(window.glitchInt){ clearInterval(window.glitchInt); window.glitchInt=null; window.glitchActive=false;
            document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=> e.style.backgroundColor='');
        }
    }));

    // ---------- Smooth Disco ----------
    vfx.appendChild(createBtn('Smooth Disco', () => {
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
    }, () => {
        if(window.discoSmoothInt){ clearInterval(window.discoSmoothInt); window.discoSmoothInt=null; window.discoSmoothActive=false;
            document.querySelectorAll('*:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=> e.style.backgroundColor='');
        }
    }));

    // ---------- Text Corruption ----------
    vfx.appendChild(createBtn('Text Corruption', () => {
        if(window.textCorruptStyle) return;
        const s=document.createElement('style');
        s.id='textCorruptStyle';
        s.innerHTML = `
        body { background:black !important; }
        body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *) {
            color: green !important;
            font-family: Courier New, monospace !important;
        }
        p, span, li, h1, h2, h3, h4, h5, h6 { font-size:16px !important; text-shadow:1px 1px #FF0000 !important; }
        #vfxGUI,#utilitiesGUI{animation:none !important;}
        `;
        document.head.appendChild(s);
        window.textCorruptStyle=s;
    }, () => { if(window.textCorruptStyle){ window.textCorruptStyle.remove(); window.textCorruptStyle=null; } }));

    // ---------- Bubble Text ----------
    vfx.appendChild(createBtn('Bubble Text', () => {
        if(window.bubbleActive) return;
        window.bubbleActive=true;
        if(!window.originalTextMap) window.originalTextMap = new Map();
        const map = {
            a:'ⓐ',b:'ⓑ',c:'ⓒ',d:'ⓓ',e:'ⓔ',f:'ⓕ',g:'ⓖ',h:'ⓗ',i:'ⓘ',j:'ⓙ',k:'ⓚ',l:'ⓛ',m:'ⓜ',n:'ⓝ',o:'ⓞ',p:'ⓟ',q:'ⓠ',r:'ⓡ',s:'ⓢ',t:'ⓣ',u:'ⓤ',v:'ⓥ',w:'ⓦ',x:'ⓧ',y:'ⓨ',z:'ⓩ',
            A:'Ⓐ',B:'Ⓑ',C:'Ⓒ',D:'Ⓓ',E:'Ⓔ',F:'Ⓕ',G:'Ⓖ',H:'Ⓗ',I:'Ⓘ',J:'Ⓙ',K:'Ⓚ',L:'Ⓛ',M:'Ⓜ',N:'Ⓝ',O:'Ⓞ',P:'Ⓟ',Q:'Ⓠ',R:'Ⓡ',S:'Ⓢ',T:'Ⓣ',U:'Ⓤ',V:'Ⓥ',W:'Ⓦ',X:'Ⓧ',Y:'Ⓨ',Z:'Ⓩ',
            '0':'⓪','1':'①','2':'②','3':'③','4':'④','5':'⑤','6':'⑥','7':'⑦','8':'⑧','9':'⑨'
        };
        function transform(node){
            if(!node) return;
            if(node.nodeType === Node.ELEMENT_NODE){
                if(node.id==='vfxGUI'||node.id==='utilitiesGUI'||(node.closest&&node.closest('#vfxGUI,#utilitiesGUI'))) return;
                node.childNodes.forEach(transform); return;
            }
            if(node.nodeType === Node.TEXT_NODE){
                const txt=node.nodeValue; if(!txt||!txt.trim()) return;
                const parent=node.parentElement; if(parent&&(parent.closest&&parent.closest('#vfxGUI,#utilitiesGUI'))) return;
                if(!window.originalTextMap.has(node)) window.originalTextMap.set(node, txt);
                node.nodeValue = txt.replace(/[a-zA-Z0-9]/g,ch=>map[ch]||ch);
            }
        }
        transform(document.body);
        window._bubbleCleanup = () => {
            if(window.originalTextMap){
                window.originalTextMap.forEach((orig,node)=>{ node.nodeValue = orig; });
                window.originalTextMap=null;
            }
            window.bubbleActive=false;
        };
        window.stopAllVFX.push(window._bubbleCleanup);
    }, () => { if(window._bubbleCleanup){ window._bubbleCleanup(); window._bubbleCleanup=null; } }));

    // ---------- Page Spin ----------
    vfx.appendChild(createBtn('Page Spin', () => {
        if(window.pageSpinActive) return;
        window.pageSpinActive=true;
        const s=document.createElement('style'); s.id='pageSpinStyle';
        s.innerHTML='@keyframes roll{100%{transform:rotate(129600deg);}} body > *:not(#vfxGUI):not(#utilitiesGUI){animation:roll 140s linear 360;} body > *:not(#vfxGUI):not(#utilitiesGUI) *{animation:roll 140s linear 360;}';
        document.head.appendChild(s); window.pageSpinStyle=s;
    }, () => { if(window.pageSpinStyle){ window.pageSpinStyle.remove(); window.pageSpinStyle=null; } window.pageSpinActive=false; }));

    // ---------- Full Chaos ----------
    vfx.appendChild(createBtn('Full Chaos', () => {
        if(window.fullChaosActive) return;
        window.fullChaosActive=true;
        const chaosContainer = document.createElement('div'); chaosContainer.id='chaosContainer';
        chaosContainer.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:99998;';
        document.body.appendChild(chaosContainer);
        const h = window.innerHeight;
        for(let i=0;i<h;i++){
            const bar=document.createElement('div'); bar.id='chaosBar'+i; bar.style.cssText=`width:100%;height:1px;background:#${Math.floor(Math.random()*16777215).toString(16)};`;
            chaosContainer.appendChild(bar);
        }
        function rand(n){ return Math.floor(Math.random()*n)+1; }
        function randColor(){ return '#'+Math.floor(Math.random()*16777215).toString(16); }
        window.fullChaosLoop1 = setInterval(()=>{
            for(let e=0;e<10;e++){
                let bar=document.getElementById('chaosBar'+rand(h));
                if(bar){ bar.style.backgroundColor=randColor(); bar.style.height=rand(4)+'px'; }
            }
            chaosContainer.style.backgroundColor=randColor();
            chaosContainer.style.transform=rand(256)>128?`scale(3) rotate(${rand(35)}deg)`:'scale(1) rotate(0deg)';
            window.scrollTo(0,document.body.scrollHeight);
        },10);
        window.fullChaosLoop2 = setInterval(()=>{ window.scrollTo(0,0); },50);
        window.stopAllVFX.push(()=>{
            clearInterval(window.fullChaosLoop1); clearInterval(window.fullChaosLoop2);
            const c=document.getElementById('chaosContainer'); if(c)c.remove();
            window.fullChaosActive=false;
        });
    }, () => {
        clearInterval(window.fullChaosLoop1); clearInterval(window.fullChaosLoop2);
        const c=document.getElementById('chaosContainer'); if(c)c.remove(); window.fullChaosActive=false;
    }));

    // ---------- Stop All ----------
    vfx.appendChild(createBtn('Stop All', () => {
        if(window.stopAllVFX) window.stopAllVFX.forEach(fn=>fn());
        // also reset page completely
        document.body.style.transform=''; document.body.style.backgroundColor=''; document.body.style.filter='';
        document.querySelectorAll('body *:not(#vfxGUI):not(#vfxGUI *):not(#utilitiesGUI):not(#utilitiesGUI *)').forEach(e=>{
            e.style.backgroundColor=''; e.style.height=''; e.style.transform=''; e.style.transition='';
            e.style.color=''; e.style.fontSize=''; e.style.position=''; e.style.left=''; e.style.top='';
        });
    }));

    // ---------- Font Color Picker ----------
    const section=document.createElement('div'); section.style.cssText='margin-top:10px;padding:8px;background:#252525;border-radius:10px;color:#00ff00;';
    section.innerHTML='<b>Text Color</b><br>';
    const picker=document.createElement('input'); picker.type='color'; picker.value='#00ff00';
    picker.oninput=()=>{ document.querySelectorAll('body *:not(#vfxGUI *):not(#utilitiesGUI *)').forEach(el=>el.style.color=picker.value); };
    section.appendChild(picker); vfx.appendChild(section);

})();

        // ---------- DRAG HANDLER ----------
        function makeDraggable(el) {
            let isDragging = false, offsetX = 0, offsetY = 0;

            el.addEventListener('mousedown', e => {
                if(e.target.tagName === 'BUTTON') return;
                isDragging = true;
                offsetX = e.clientX - el.offsetLeft;
                offsetY = e.clientY - el.offsetTop;
                el.style.pointerEvents = 'auto';
            });

            document.addEventListener('mousemove', e => {
                if (!isDragging) return;
                el.style.left = (e.clientX - offsetX) + 'px';
                el.style.top = (e.clientY - offsetY) + 'px';
            });

            document.addEventListener('mouseup', () => {
                isDragging = false;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', main);
    } else {
        main();
    }
})();
