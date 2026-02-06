window.onload = init;

let chatStep = 0;

function init() {
    updateClock();
    calcDays();
}

function updateClock() {
    const now = new Date();
    let m = now.getMinutes().toString().padStart(2,'0');
    let t = now.getHours() + ":" + m;
    
    const clockEl = document.getElementById('clock');
    const lockClockEl = document.getElementById('lock-clock');
    if(clockEl) clockEl.innerText = t;
    if(lockClockEl) lockClockEl.innerText = t;

    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const lockDateEl = document.getElementById('lock-date');
    if(lockDateEl) lockDateEl.innerText = dateString;

    setTimeout(updateClock, 1000);
}

/* LOCK SCREEN */
function showPasscode() {
    document.getElementById('lock-main').classList.add('hidden');
    document.getElementById('lock-passcode').classList.remove('hidden');
    document.getElementById('pass-input').focus();
}

function showMainLock() {
    document.getElementById('lock-passcode').classList.add('hidden');
    document.getElementById('lock-main').classList.remove('hidden');
    document.getElementById('pass-msg').innerText = "";
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
    document.getElementById('home-screen').classList.add('active');
}

function openApp(id) {
    document.getElementById('app-' + id).classList.add('active');
}

/* GLOBAL TELEPORT */
function teleport() {
    alert("Initiating Teleport sequence... 🚀");
    setTimeout(() => { alert("Loading... ▓▓▓▓▒▒▒▒▒▒ 40%"); }, 1000);
    setTimeout(() => { alert("Loading... ▓▓▓▓▓▓▓▓▒▒ 80%"); }, 2000);
    setTimeout(() => { alert("❌ ERROR: Teleport Failed! Reason: You need to hug Theshuuu in real life to recharge! 🥺❤️"); }, 3000);
}

/* GAMES */
function interactPet(action) {
    const msg = document.getElementById('pet-bubble');
    const img = document.getElementById('pet-img');
    img.style.transform = "scale(1.1)";
    setTimeout(() => img.style.transform = "scale(1)", 200);
    if(action === 'feed') msg.innerText = "Yum! Kuchu is happy! 🐟";
    if(action === 'play') msg.innerText = "Zoomies! 🐈💨";
    if(action === 'love') msg.innerText = "Purr... Kuchu loves Ayuuu! ❤️";
}

function askOracle() {
    const answers = ["Yes, absolutely! ❤️", "Theshuuu says YES! 💍", "Without a doubt! 🌟", "Ask Kuchu 🐈", "100% Yes! 😽"];
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
const songs = [{ title: "Hawayein", src: "song.mp3", art: "wallpaper.jpg" }, { title: "Like My Father", src: "song3.mp3", art: "kuchu.jpg" }];
let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const songTitle = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');

function loadSong(index) {
    if(!audioPlayer) return;
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audioPlayer.src = song.src;
    if(songTitle) songTitle.innerText = song.title;
    if(albumArt) albumArt.style.backgroundImage = `url('${song.art}')`;
}

function togglePlay() {
    if (!audioPlayer) return;
    if (!audioPlayer.src || audioPlayer.src === "") loadSong(0);
    if (audioPlayer.paused) { 
        audioPlayer.play().catch(e => alert("Please make sure 'song.mp3' and 'song3.mp3' are in the folder! 🎵")); 
        playBtn.innerText = "⏸️"; 
        albumArt.classList.add('rotating'); 
    } else { 
        audioPlayer.pause(); 
        playBtn.innerText = "▶️"; 
        albumArt.classList.remove('rotating'); 
    }
}
function prevSong() { currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; loadSong(currentSongIndex); togglePlay(); }
function nextSong() { currentSongIndex = (currentSongIndex + 1) % songs.length; loadSong(currentSongIndex); togglePlay(); }

/* CHAT LOGIC */
const chatBox = document.getElementById('chat-box');
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(selectedText) {
    addBubble(selectedText, 'chat-me'); 
    opts.classList.add('hidden');
    
    if(chatStep === 0) {
        simulateTyping(() => {
            addBubble("Happy Valentine's Day Ayuuu! ❤️", 'chat-them');
            addBubble("I wish I was there to hug you... but look who is here!", 'chat-them');
            let row = document.createElement('div'); row.className = "chat-row";
            let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
            let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them";
            let img = document.createElement('img'); img.src = "kuchu.jpg"; img.className = "chat-img";
            img.onclick = function() { this.classList.toggle('zoomed'); }; 
            bubble.appendChild(img);
            bubble.innerHTML += `<div class="time-tick">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
            row.appendChild(avatar); row.appendChild(bubble);
            chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
            showOpts(["Omg my Kuchu!! 🥺", "He's so cute!"]);
            chatStep = 1;
        }, 1500);
    } else if(chatStep === 1) {
        simulateTyping(() => {
            addBubble("He is guarding your spot on the bed. 😂", 'chat-them');
            addBubble("We both miss you so much Ayuuu.", 'chat-them');
            showOpts(["Tell him I love him! ❤️", "I miss you both!"]);
            chatStep = 2;
        }, 2000);
    } else if(chatStep === 2) {
        simulateTyping(() => {
            addBubble("I will. ❤️", 'chat-them');
            addBubble("But hey... Theshuuu has a serious question.", 'chat-them');
            showOpts(["What is it? 😳", "Tell me!"]);
            chatStep = 3;
        }, 2000);
    } else if(chatStep === 3) {
        simulateTyping(() => {
            addBubble("Since I can't be there in person...", 'chat-them');
            let row = document.createElement('div'); row.className = "chat-row";
            let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
            let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them"; 
            bubble.style.background = "#FFFBE6"; bubble.style.border = "2px solid #FFD700";
            bubble.innerHTML = `<div style="font-size:3rem;">🌹</div><h3 style="color:#D4AF37; margin:5px 0;">BE MY VALENTINE?</h3>`;
            row.appendChild(avatar); row.appendChild(bubble);
            chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
            showOpts(["YESSS THESHUUU! ❤️", "ALWAYS! 🥺❤️"]);
            chatStep = 4;
        }, 2000);
    } else if(chatStep === 4) {
        simulateTyping(() => {
            addBubble("I love you Ayuuu! ❤️", 'chat-them');
            opts.innerHTML = "";
            let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = "🏠 Go Home"; btn.onclick = () => goHome(); 
            opts.appendChild(btn);
            opts.classList.remove('hidden');
        }, 1500);
    }
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
    arr.forEach((t) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(t); opts.appendChild(btn);
    });
}

function toggleZoom(el) { el.classList.toggle('zoomed'); }

/* DATES & TIMELINE */
function calcDays() {
    const now = new Date();
    const startDate = new Date("2026-01-18"); 
    const diff = now - startDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    const el = document.getElementById('together-time');
    if(el) el.innerText = days + " Days";

    updateCountdown('days-me', 2, 14);   
    updateCountdown('days-her', 8, 22);  
    updateCountdown('days-anni', 0, 18); 

    const el100 = document.getElementById('date-100');
    if(el100) el100.innerText = "Apr 28, 2026";
}

function updateCountdown(id, month, day) {
    const now = new Date();
    const currentYear = now.getFullYear();
    let nextDate = new Date(currentYear, month, day);
    if (now > nextDate) nextDate.setFullYear(currentYear + 1);
    const diff = nextDate - now;
    const daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
    const el = document.getElementById(id);
    if(el) el.innerText = daysLeft + " Days";
}

/* OPEN NOTES */
function openNote(type) {
    if(type === 'bucket') alert("✈️ Japan\n🏝️ Maldives\n🌌 Northern Lights\n🏡 Build a House\n🐈 Adopt 10 Cats");
    if(type === 'love') alert("1. Your smile\n2. Your kindness\n3. How you love Kuchu\n4. Your laugh\n5. Everything! ❤️");
    if(type === 'shopping') alert("1. Cat food 🐟\n2. Ice cream 🍦\n3. Chocolates 🍫\n4. Pizza 🍕");
    if(type === 'date') alert("1. Pizza & Movie Night 🍕\n2. Stargazing 🌌\n3. Cooking together 🍝");
}
