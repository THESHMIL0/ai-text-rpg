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

/* --- MUSIC --- */
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
    const song = songs[index];
    audioPlayer.src = song.src;
    songTitle.innerText = song.title;
    albumArt.style.backgroundImage = `url('${song.art}')`;
}

function togglePlay() {
    if (!audioPlayer.src || audioPlayer.src === window.location.href) {
        loadSong(currentSongIndex);
    }
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.innerText = "⏸️";
    } else {
        audioPlayer.pause();
        playBtn.innerText = "▶️";
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.innerText = "⏸️";
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.innerText = "⏸️";
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
    
    // STEP 0: SHE REPLIES
    if(chatStep === 0) {
        txt = choice === 1 ? "Happy Valentine's! ❤️" : "I miss you! 🥺";
        addBubble(txt, 'chat-me'); 
        opts.classList.add('hidden');
        
        // YOU Reply
        simulateTyping(() => {
            addBubble("Look who is sleeping! 🐈", 'chat-them');
            let row = document.createElement('div'); row.className = "chat-row";
            let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
            let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them";
            let img = document.createElement('img'); img.src = "kuchu.jpg"; img.className = "chat-img";
            bubble.appendChild(img);
            bubble.innerHTML += `<div class="time-tick">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
            row.appendChild(avatar); row.appendChild(bubble);
            chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
            showOpts(["Omg cute!! 🥺", "I miss him!"]);
            chatStep = 1;
        });
    } 
    
    // STEP 1: SHE REACTS
    else if(chatStep === 1) {
        txt = choice === 1 ? "Omg cute!! 🥺" : "I miss him!";
        addBubble(txt, 'chat-me');
        opts.classList.add('hidden');
        
        simulateTyping(() => {
            addBubble("He misses you too...", 'chat-them');
            addBubble("Actually, I have a serious question.", 'chat-them');
            showOpts(["What is it? 👀", "Tell me!"]);
            chatStep = 2;
        });
    } 
    
    // STEP 2: YOU ASK
    else if(chatStep === 2) {
        txt = "What is it? 👀";
        addBubble(txt, 'chat-me');
        opts.classList.add('hidden');
        
        simulateTyping(() => {
            addBubble("Since we are far apart, I wanted to ask this digitally...", 'chat-them');
            let row = document.createElement('div'); row.className = "chat-row";
            let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')";
            let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-them"; 
            bubble.style.background = "#FFFBE6"; bubble.style.border = "2px solid #FFD700";
            bubble.innerHTML = `<div style="font-size:3rem;">💍</div><h3 style="color:#D4AF37; margin:5px 0;">WILL YOU MARRY ME?</h3>`;
            row.appendChild(avatar); row.appendChild(bubble);
            chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
            showOpts(["YES! 1000x YES! 😭❤️"]);
            chatStep = 3;
        });
    } 
    
    // STEP 3: SHE SAYS YES
    else if(chatStep === 3) {
        addBubble("YES! 1000x YES! 😭❤️", 'chat-me');
        opts.classList.add('hidden');
        simulateTyping(() => {
            addBubble("I love you Ayuuu! ❤️", 'chat-them');
            addBubble("Check your 'Gift' app now!", 'chat-them');
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
    let row = document.createElement('div'); row.className = "chat-row";
    if(className === 'chat-them') {
        let avatar = document.createElement('div'); avatar.className = "chat-avatar"; avatar.style.backgroundImage = "url('us.jpg')"; 
        row.appendChild(avatar);
    }
    let bubble = document.createElement('div'); bubble.className = `chat-bubble ${className}`;
    bubble.innerHTML = text + `<div class="time-tick">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
    row.appendChild(bubble); chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;
}

function showOpts(arr) {
    opts.innerHTML = ""; opts.classList.remove('hidden');
    arr.forEach((t, i) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(i+1); opts.appendChild(btn);
    });
}
