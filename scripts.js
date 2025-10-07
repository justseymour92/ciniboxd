let input = "";

document.addEventListener("keydown", e => {
    input += e.key.toUpperCase();
    
    if (input.includes("NEOSKY")) {
        activateNeoSky();
        input = ""; //reset
    }
    
    if (input.length > 20) input = input.slice(-20);
});

function activateNeoSky() {
 document.body.classList.add("neosky");
 // Create canvas and style it inline so it's guaranteed on top
 const c = document.createElement("canvas");
c.id = "neoCanvas";
 c.style.position = "fixed";
 c.style.top = "0";
 c.style.left = "0";
 c.style.width = "100vw";
 c.style.height = "100vh";
 c.style.pointerEvents = "none";
 c.style.zIndex = "2147483647"; // max-ish
 c.style.opacity = "1";
 c.style.transition = "opacity 0.5s ease";
 document.body.appendChild(c);
 const ctx = c.getContext("2d");
 // Fit canvas pixels to CSS size
 function resize() {
   const dpr = window.devicePixelRatio || 1;
   c.width  = Math.floor(window.innerWidth  * dpr);
   c.height = Math.floor(window.innerHeight * dpr);
   ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // scale drawing for HiDPI
 }
 resize();
 window.addEventListener("resize", resize);
 // Characters + drops
 const letters = "アイウエオカキクケコサシスセソﾁｬﾝ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
 const fontSize = 16;
 let columns = Math.floor(window.innerWidth / fontSize);
 let drops = new Array(columns).fill(1);
 ctx.font = fontSize + "px monospace";
 // Quick sanity check: draw something immediately so we know canvas is visible
 ctx.fillStyle = "#00ff00";
 ctx.fillText("NEO", 10, 24);
 const interval = setInterval(() => {
   // fade the canvas slightly to create trails
   ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
   ctx.fillRect(0, 0, c.width, c.height);
   ctx.fillStyle = "#00ff00";
   for (let i = 0; i < drops.length; i++) {
     const char = letters[Math.floor(Math.random() * letters.length)];
     ctx.fillText(char, i * fontSize, drops[i] * fontSize);
     // reset drop randomly after it goes off screen
     if (drops[i] * fontSize > window.innerHeight && Math.random() > 0.975) {
       drops[i] = 0;
     }
     drops[i]++;
   }
 }, 33); // ~30fps
 // stop after 5 seconds
 setTimeout(() => {
   c.style.opacity = "0";
   clearInterval(interval);
   setTimeout(() => {
     window.removeEventListener("resize", resize);
     c.remove();
     document.body.classList.remove("neosky");
   }, 500);
 }, 10000);
}