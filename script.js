let chatStep = 0;

function init() {
    updateClock();
    calcDays();
}

function updateClock() {
    let d = new Date();
    let m = d.getMinutes().toString().padStart(2,'0');
    let t = d.getHours() + ":" + m;
    document.getElementById('clock').innerText = t;
    if(document.getElementById('lock-clock')) document.getElementById('lock-clock').innerText = t;
    setTimeout(updateClock, 1000);
}

function unlockPhone() {
    document.getElementById('lock-screen').style.display = 'none';
    document.getElementById('home-screen').classList.add('active');
}

function goHome() {
    document.querySelectorAll('.screen').forEach(s => {
        if(s.id !== 'lock-screen') s.classList.remove('active');
    });
    document.getElementById('home-screen').classList.add('active');
}

function openApp(id) {
    document.querySelectorAll('.screen').forEach(s => {
        if(s.id !== 'lock-screen') s.classList.remove('active');
    });
    document.getElementById('app-' + id).classList.add('active');
}

function calcDays() {
    let now = new Date();
    let yr = now.getFullYear();
    let me = new Date(yr, 2, 14); if(now > me) me.setFullYear(yr+1);
    document.getElementById('days-me').innerText = Math.ceil((me - now)/(1000*60*60*24)) + " Days";
    let her = new Date(yr, 8, 22); if(now > her) her.setFullYear(yr+1);
    document.getElementById('days-her').innerText = Math.ceil((her - now)/(1000*60*60*24)) + " Days";
}

/* --- CHAT LOGIC --- */
const chatBox = document.getElementById('chat-box');
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(choice) {
    let txt = "";
    if(chatStep === 0) {
        txt = choice === 1 ? "Yooo Ayuuuu! ❤️" : "Miss you so much! 🥺";
        addBubble(txt, 'chat-me'); opts.classList.add('hidden');
        simulateTyping(() => {
            addBubble("Kitchu says hi btw! 🐈", 'chat-them');
            addBubble("Look at him sleeping!", 'chat-them');
            let img = document.createElement('img');
            img.src = "kuchu.jpg"; img.className = "chat-img";
            chatBox.appendChild(img); chatBox.scrollTop = chatBox.scrollHeight;
            showOpts(["Omg my Kuchu!! 🥺", "He misses me too!"]);
            chatStep = 1;
        });
    } else if(chatStep === 1) {
        txt = choice === 1 ? "Omg my Kuchu!! 🥺" : "He misses me too!";
        addBubble(txt, 'chat-me'); opts.classList.add('hidden');
        simulateTyping(() => {
            addBubble("He definitely does. We both do.", 'chat-them');
            addBubble("Wait... I have a serious question.", 'chat-them');
            showOpts(["What is it? 👀", "Tell me!"]);
            chatStep = 2;
        });
    } else if(chatStep === 2) {
        txt = "What is it? 👀";
        addBubble(txt, 'chat-me'); opts.classList.add('hidden');
        simulateTyping(() => {
            addBubble("Since we are far apart, I wanted to ask this digitally...", 'chat-them');
            addBubble("<b>Will you be my Valentine? 🌹</b>", 'chat-them');
            showOpts(["YES! 1000x YES! 😍", "Of course idiot! ❤️"]);
            chatStep = 3;
        });
    } else if(chatStep === 3) {
        addBubble("YES! 1000x YES! 😍", 'chat-me'); opts.classList.add('hidden');
        simulateTyping(() => {
            addBubble("Yay! Happy Valentine's Day Ayuuu! ❤️", 'chat-them');
            addBubble("I have a promise for you...", 'chat-them');
            let ticket = document.createElement('div');
            ticket.className = "ticket";
            ticket.style.border = "3px solid #FFD700"; ticket.style.background = "#FFFBE6";
            ticket.innerHTML = `<div style="font-size:3rem;">💍</div><h3 style="color:#D4AF37; margin:5px 0;">WILL YOU MARRY ME?</h3><p style="font-size:0.8rem; color:#555;">(One Day)</p>`;
            chatBox.appendChild(ticket); chatBox.scrollTop = chatBox.scrollHeight;
            document.getElementById('gift-lock').style.display = 'none';
            document.getElementById('gift-open').style.display = 'block';
            opts.innerHTML = `<div class="chat-btn" style="width:100%" onclick="goHome()">🏠 Go Check "Gift" App</div>`;
            opts.classList.remove('hidden');
        });
    }
}

function simulateTyping(callback) {
    typing.style.display = 'block'; chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => { typing.style.display = 'none'; callback(); }, 1500);
}
function addBubble(text, className) {
    let div = document.createElement('div'); div.className = `chat-bubble ${className}`; div.innerHTML = text;
    chatBox.appendChild(div); chatBox.scrollTop = chatBox.scrollHeight;
}
function showOpts(arr) {
    opts.innerHTML = ""; opts.classList.remove('hidden');
    arr.forEach((t, i) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(i+1); opts.appendChild(btn);
    });
}
