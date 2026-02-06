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

/* LOCK */
function showPasscode() {
    document.getElementById('lock-main').classList.add('hidden');
    document.getElementById('lock-passcode').classList.remove('hidden');
    document.getElementById('pass-input').focus();
}

function showMainLock() {
    document.getElementById('lock-passcode').classList.add('hidden');
    document.getElementById('lock-main').classList.remove('hidden');
    document.getElementById('pass-input').value = "";
}

function checkPasscode() {
    const input = document.getElementById('pass-input');
    const msg = document.getElementById('pass-msg');
    if (input.value.toLowerCase().trim() === 'kushu') {
        document.getElementById('lock-screen').style.transform = 'translateY(-100%)';
        setTimeout(() => { document.getElementById('home-screen').classList.add('active'); }, 100);
        setTimeout(() => { document.getElementById('lock-screen').style.display = 'none'; }, 500);
    } else {
        msg.innerText = "Wrong Password 😿";
        input.classList.add('shake');
        setTimeout(() => input.classList.remove('shake'), 500);
    }
}

/* NAV */
function goHome() {
    document.querySelectorAll('.screen').forEach(s => {
        if(s.id !== 'lock-screen') s.classList.remove('active');
    });
}

function openApp(id) {
    document.getElementById('app-' + id).classList.add('active');
}

/* KUCHU PET GAME */
function interactPet(action) {
    const msg = document.getElementById('pet-msg');
    const img = document.getElementById('pet-img');
    
    img.classList.remove('bounce');
    void img.offsetWidth; // trigger reflow
    img.classList.add('bounce');

    if (action === 'feed') {
        msg.innerText = "Yum! Kuchu is happy! 🐟";
    } else if (action === 'play') {
        msg.innerText = "Zoomies! 🐈💨";
    } else if (action === 'love') {
        msg.innerText = "Purr... Kuchu loves Ayuuu! ❤️";
    }
}

/* MAGIC BALL */
function askOracle() {
    const answers = [
        "Yes, absolutely! ❤️",
        "Theshuuu says YES! 💍",
        "Without a doubt! 🌟",
        "Ask Kuchu 🐈 (He says yes)",
        "100% Yes! 😽",
        "My heart says yes! 💖"
    ];
    const ball = document.getElementById('magic-ball');
    ball.classList.add('shake');
    setTimeout(() => {
        ball.classList.remove('shake');
        ball.innerText = answers[Math.floor(Math.random() * answers.length)];
        ball.style.background = "white";
        ball.style.color = "#E91E63";
    }, 500);
}

/* MUSIC */
const songs = [{ title: "Hawayein", src: "song.mp3", art: "wallpaper.jpg" }];
let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const albumArt = document.getElementById('album-art');

function loadSong(index) {
    audioPlayer.src = songs[index].src;
}

function togglePlay() {
    if (!audioPlayer.src || audioPlayer.src === window.location.href) loadSong(0);
    if (audioPlayer.paused) { 
        audioPlayer.play(); playBtn.innerText = "⏸️"; albumArt.classList.add('rotating'); 
    } else { 
        audioPlayer.pause(); playBtn.innerText = "▶️"; albumArt.classList.remove('rotating'); 
    }
}

function prevSong() { togglePlay(); }
function nextSong() { togglePlay(); }

/* CHAT */
const chatBox = document.getElementById('chat-box');
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(choice) {
    let txt = choice === 1 ? "Happy Valentine's Theshuuu! ❤️" : "I miss you Theshuuu! 🥺";
    addBubble(txt, 'chat-me'); 
    opts.classList.add('hidden');
    
    simulateTyping(() => {
        addBubble("Happy Valentine's Day Ayuuu! ❤️", 'chat-them');
        addBubble("I have a surprise...", 'chat-them');
        
        let row = document.createElement('div'); row.className = "chat-row";
        let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
        let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them"; 
        bubble.style.background = "#FFFBE6"; bubble.style.border = "2px solid #FFD700";
        bubble.innerHTML = `<div style="font-size:3rem;">🌹</div><h3 style="color:#D4AF37; margin:5px 0;">BE MY VALENTINE?</h3>`;
        row.appendChild(avatar); row.appendChild(bubble);
        chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
        
        showOpts(["YESSS THESHUUU! ❤️", "ALWAYS! 🥺❤️"]);
        chatStep = 4;
    }, 1500);
}

function simulateTyping(callback, delay) {
    typing.innerText = "Theshuuu is typing...";
    typing.style.display = 'block'; chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => { typing.style.display = 'none'; callback(); }, delay || 1500);
}

function addBubble(text, className) {
    let row = document.createElement('div'); row.className = "chat-row";
    if(className === 'chat-them') {
        let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')"; 
        row.appendChild(avatar);
    }
    let bubble = document.createElement('div'); bubble.className = `chat-bubble ${className}`;
    bubble.innerHTML = text;
    row.appendChild(bubble); chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
}

function showOpts(arr) {
    opts.innerHTML = ""; opts.classList.remove('hidden');
    arr.forEach((t, i) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => {
            if (chatStep === 4) {
                addBubble(t, 'chat-me');
                opts.classList.add('hidden');
                document.getElementById('gift-lock').style.display = 'none';
                document.getElementById('gift-open').classList.remove('hidden');
                setTimeout(() => alert("Go check the Gift App! 🎁"), 1000);
            } else {
                reply(i+1);
            }
        }; 
        opts.appendChild(btn);
    });
}

function calcDays() {
    // Basic counter for demo
    document.getElementById('days-me').innerText = "0 Days";
    document.getElementById('days-her').innerText = "0 Days";
}
