/* START IMMEDIATELY */
document.addEventListener('DOMContentLoaded', init);

let chatStep = 0;
let isProcessing = false; // PREVENTS DOUBLE TAP
const chatBox = document.getElementById('chat-box');

function init() {
    updateClock();
    calcDays();
}

function scrollToBottom() {
    if(chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
        setTimeout(() => { chatBox.scrollTop = chatBox.scrollHeight; }, 100);
    }
}

function updateClock() {
    const now = new Date();
    let m = now.getMinutes().toString().padStart(2,'0');
    let t = now.getHours() + ":" + m;
    
    const clockEl = document.getElementById('lock-clock');
    if(clockEl) clockEl.innerText = t;

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

function goHome() {
    document.querySelectorAll('.screen').forEach(s => {
        if(s.id !== 'lock-screen') s.classList.remove('active');
    });
    document.getElementById('home-screen').classList.add('active');
}

function openApp(id) {
    document.getElementById('app-' + id).classList.add('active');
    if(id === 'msg') scrollToBottom();
}

/* CHAT LOGIC (FIXED) */
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(selectedText) {
    if(isProcessing) return; 
    isProcessing = true;

    addBubble(selectedText, 'chat-me'); 
    opts.classList.add('hidden');
    
    if(chatStep === 0) {
        simulateTyping(() => {
            addBubble("Happy Valentine's Day Ayuuu! ❤️", 'chat-them');
            
            let row = document.createElement('div'); row.className = "chat-row";
            let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
            let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them";
            
            let img = document.createElement('img'); 
            img.src = "kuchu.jpg"; 
            img.className = "chat-img";
            img.onload = scrollToBottom; 
            img.onclick = function() { this.classList.toggle('zoomed'); }; 
            
            bubble.appendChild(img);
            row.appendChild(avatar); row.appendChild(bubble);
            chatBox.appendChild(row); 
            scrollToBottom();
            
            showOpts(["Omg my Kuchu!! 🥺", "He's so cute!"]);
            chatStep = 1;
            isProcessing = false;
        }, 1500);
    } else {
        setTimeout(() => { isProcessing = false; }, 500);
    }
}

function simulateTyping(callback, delay) {
    typing.innerText = "Theshuuu is typing...";
    typing.style.display = 'block'; 
    scrollToBottom();
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
    row.appendChild(bubble); chatBox.appendChild(row); 
    scrollToBottom();
}

function showOpts(arr) {
    opts.innerHTML = ""; opts.classList.remove('hidden');
    arr.forEach((t) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(t); opts.appendChild(btn);
    });
    scrollToBottom();
}

/* MISC FUNCTIONS */
function toggleFlashlight(e) { e.stopPropagation(); e.currentTarget.classList.toggle('active'); }
function openCamera(e) { e.stopPropagation(); alert("📸 Camera Locked!"); }
function redeemCoupon(element) { 
    if (element.classList.contains('redeemed')) return; 
    if (confirm("Use coupon?")) { element.classList.add('redeemed'); alert("Redeemed! ❤️"); } 
}
function interactPet(action) { alert("Pet action: " + action + " ❤️"); }
function askOracle() { 
    const input = document.getElementById('oracle-input'); 
    if(input.value.trim() === "") return alert("Type something!"); 
    alert("Theshuuu says YES! ❤️"); 
}
function openLightbox(src) { 
    document.getElementById('lightbox-img').src = src; 
    document.getElementById('lightbox').classList.add('active'); 
}
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); }

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

function openNote(type) {
    if(type === 'bucket') alert("✈️ Japan\n🏝️ Maldives\n🌌 Northern Lights\n🏡 Build a House\n🐈 Adopt 10 Cats");
    if(type === 'love') alert("1. Your smile\n2. Your kindness\n3. How you love Kuchu\n4. Your laugh\n5. Everything! ❤️");
    if(type === 'shopping') alert("1. Cat food 🐟\n2. Ice cream 🍦\n3. Chocolates 🍫\n4. Pizza 🍕");
}

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

/* SETTINGS & THEMES */
function toggleTheme(el) {
    el.classList.toggle('active');
    document.body.classList.toggle('dark-mode');
}

function setTheme(color) {
    document.documentElement.style.setProperty('--primary', color);
    document.documentElement.style.setProperty('--accent', color);
}

/* MUSIC */
const songs = [{ title: "Hawayein", src: "song.mp3", art: "wallpaper.jpg" }, { title: "Like My Father", src: "song3.mp3", art: "kuchu.jpg" }];
let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
let musicTimer;

function loadSong(index) {
    if(!audioPlayer) return;
    currentSongIndex = index;
    const song = songs[currentSongIndex];
    audioPlayer.src = song.src;
    document.getElementById('song-title').innerText = song.title;
    document.getElementById('album-art').style.backgroundImage = `url('${song.art}')`;
}

function togglePlay() {
    if (!audioPlayer) return;
    if (!audioPlayer.src || audioPlayer.src === "") loadSong(0);
    if (audioPlayer.paused) { 
        audioPlayer.play().catch(e => alert("Please make sure 'song.mp3' and 'song3.mp3' are in the folder! 🎵")); 
        document.getElementById('play-btn').innerText = "⏸️"; 
        document.getElementById('album-art').classList.add('rotating');
        musicTimer = setInterval(updateMusicProgress, 500);
    } else { 
        audioPlayer.pause(); 
        document.getElementById('play-btn').innerText = "▶️"; 
        document.getElementById('album-art').classList.remove('rotating');
        clearInterval(musicTimer);
    }
}

function updateMusicProgress() {
    if(audioPlayer.duration) {
        const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        document.getElementById('music-fill').style.width = percent + "%";
        let min = Math.floor(audioPlayer.currentTime / 60);
        let sec = Math.floor(audioPlayer.currentTime % 60);
        if(sec < 10) sec = "0" + sec;
        document.getElementById('curr-time').innerText = min + ":" + sec;
    }
}

function prevSong() { currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; loadSong(currentSongIndex); togglePlay(); }
function nextSong() { currentSongIndex = (currentSongIndex + 1) % songs.length; loadSong(currentSongIndex); togglePlay(); }
