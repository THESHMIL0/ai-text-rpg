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
    
    // Update both clocks
    const clockEl = document.getElementById('clock');
    const lockClockEl = document.getElementById('lock-clock');
    if(clockEl) clockEl.innerText = t;
    if(lockClockEl) lockClockEl.innerText = t;

    // Real Date for Lock Screen
    const dateOptions = { weekday: 'long', month: 'short', day: 'numeric' };
    const dateString = now.toLocaleDateString('en-US', dateOptions);
    const lockDateEl = document.getElementById('lock-date');
    if(lockDateEl) lockDateEl.innerText = dateString;

    setTimeout(updateClock, 1000);
}

/* LOCK SCREEN & SHORTCUTS */
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

function toggleFlashlight(e) {
    e.stopPropagation(); // Prevent opening passcode
    const btn = e.currentTarget;
    btn.classList.toggle('active');
}

function openCamera(e) {
    e.stopPropagation(); // Prevent opening passcode
    alert("📸 Camera Locked!\nUnlock device to take cute selfies.");
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
    // Stop music visualizer
    const albumArt = document.getElementById('album-art');
    if(albumArt) albumArt.classList.remove('rotating');
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
    if(action === 'feed') {
        msg.innerText = "Yummy! 🐟 Burp!";
        document.getElementById('bar-hunger').style.width = "100%";
    }
    if(action === 'play') {
        msg.innerText = "Zoomies!! 🐈💨";
        document.getElementById('bar-happy').style.width = "100%";
    }
    if(action === 'love') {
        msg.innerText = "Purr... I love Ayuuu! ❤️";
        document.getElementById('bar-love').style.width = "100%";
    }
}

function askOracle() {
    const input = document.getElementById('oracle-input');
    const ball = document.getElementById('magic-ball');
    if(input.value.trim() === "") {
        ball.innerText = "Type something first! 🔮";
        ball.classList.add('shake');
        setTimeout(() => ball.classList.remove('shake'), 500);
        return;
    }
    const answers = ["Theshuuu says YES! ❤️", "Absolutely 100% 😽", "Kuchu says maybe... 🐈", "Ask me later with a kiss 😘", "My heart says YES! 💖", "Only if you hug me! 🤗"];
    ball.classList.add('shake');
    ball.innerText = "Thinking...";
    setTimeout(() => {
        ball.classList.remove('shake');
        ball.innerText = answers[Math.floor(Math.random() * answers.length)];
        ball.style.background = "white";
        ball.style.color = "#E91E63";
    }, 1000);
}

/* MUSIC */
const songs = [{ title: "Hawayein", src: "song.mp3", art: "wallpaper.jpg" }, { title: "Like My Father", src: "song3.mp3", art: "kuchu.jpg" }];
let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const songTitle = document.getElementById('song-title');
const albumArt = document.getElementById('album-art');
const musicFill = document.getElementById('music-fill');
let musicTimer;

function loadSong(index) {
    if(!audioPlayer) return;
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audioPlayer.src = song.src;
    if(songTitle) songTitle.innerText = song.title;
    if(albumArt) albumArt.style.backgroundImage = `url('${song.art}')`;
    if(musicFill) musicFill.style.width = "0%";
}

function togglePlay() {
    if (!audioPlayer) return;
    if (!audioPlayer.src || audioPlayer.src === "") loadSong(0);
    if (audioPlayer.paused) { 
        audioPlayer.play().catch(e => alert("Please make sure 'song.mp3' and 'song3.mp3' are in the folder! 🎵")); 
        playBtn.innerText = "⏸️"; 
        albumArt.classList.add('rotating');
        musicTimer = setInterval(updateMusicProgress, 500);
    } else { 
        audioPlayer.pause(); 
        playBtn.innerText = "▶️"; 
        albumArt.classList.remove('rotating');
        clearInterval(musicTimer);
    }
}

function updateMusicProgress() {
    if(audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        if(musicFill) musicFill.style.width = percent + "%";
        
        let min = Math.floor(audioPlayer.currentTime / 60);
        let sec = Math.floor(audioPlayer.currentTime % 60);
        if(sec < 10) sec = "0" + sec;
        const currTime = document.getElementById('curr-time');
        if(currTime) currTime.innerText = min + ":" + sec;
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

/* REDEEM COUPONS */
function redeemCoupon(element) {
    if (element.classList.contains('redeemed')) return; 
    if (confirm("Are you sure you want to use this coupon? 🎟️")) {
        element.classList.add('redeemed');
        if (navigator.vibrate) navigator.vibrate(200);
        alert("Coupon Redeemed! Send a screenshot to Theshuuu! 📸");
    }
}

/* MY HEART APP */
function generateLoveNote() {
    const notes = ["You are my sunshine! ☀️", "My heart beats only for you! 💓", "I love you more than pizza! 🍕", "You + Me = Forever ❤️", "Can't wait to hug you! 🤗", "You are perfect to me. ✨"];
    const noteEl = document.getElementById('love-note-text');
    noteEl.style.opacity = 0;
    setTimeout(() => {
        noteEl.innerText = notes[Math.floor(Math.random() * notes.length)];
        noteEl.style.opacity = 1;
    }, 300);
}

function sendLoveWave() {
    for (let i = 0; i < 10; i++) {
        let heart = document.createElement('div');
        heart.innerText = "❤️"; heart.className = "floating-heart";
        heart.style.left = Math.random() * 100 + "vw"; heart.style.top = "100vh";
        heart.style.animationDuration = (Math.random() * 2 + 2) + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 4000);
    }
    alert("Love Wave Sent! 🌊❤️");
}

/* LIGHTBOX */
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox').classList.add('active');
}
function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}
