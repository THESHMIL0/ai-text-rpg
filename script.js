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

/* GAMES */
function interactPet(action) {
    const msg = document.getElementById('pet-msg');
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

/* MUSIC (FIXED - 2 SONGS) */
const songs = [
    { title: "Hawayein", src: "song.mp3", art: "wallpaper.jpg" },
    { title: "Like My Father", src: "song3.mp3", art: "kuchu.jpg" }
];
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

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    togglePlay();
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    togglePlay();
}

/* CHAT LOGIC */
const chatBox = document.getElementById('chat-box');
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(choice) {
    let txt = choice === 1 ? "Happy Valentine's Theshuuu! ❤️" : "I miss you Theshuuu! 🥺";
    addBubble(txt, 'chat-me'); 
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
            addBubble("Check your 'Gift' app now!", 'chat-them');
            document.getElementById('gift-lock').style.display = 'none';
            document.getElementById('gift-open').classList.remove('hidden');
            opts.innerHTML = `<div class="chat-btn" style="width:100%" onclick="goHome()">🏠 Check "Gift" App</div>`;
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
    arr.forEach((t, i) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(i+1); opts.appendChild(btn);
    });
}

function toggleZoom(el) { el.classList.toggle('zoomed'); }

function calcDays() {
    document.getElementById('days-me').innerText = "0 Days";
    document.getElementById('days-her').innerText = "0 Days";
}
