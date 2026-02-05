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

/* --- CHAT LOGIC (CORRECTED FLOW) --- */
const chatBox = document.getElementById('chat-box');
const opts = document.getElementById('chat-opts');
const typing = document.getElementById('typing');

function reply(choice) {
    let txt = "";
    
    // STEP 0: YOU SEND KUCHU PIC
    if(chatStep === 0) {
        txt = choice === 1 ? "Look who is sleeping! 🐈" : "Kuchu says hi! ❤️";
        addBubble(txt, 'chat-me'); 
        
        // YOU send the image!
        let row = document.createElement('div'); row.className = "chat-row";
        let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-me";
        let img = document.createElement('img'); img.src = "kuchu.jpg"; img.className = "chat-img";
        bubble.appendChild(img);
        row.appendChild(bubble);
        chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;

        opts.classList.add('hidden');
        
        // SHE Replies
        simulateTyping(() => {
            addBubble("Omg he is so cute!! 🥺", 'chat-them');
            addBubble("I miss him so much... and you too.", 'chat-them');
            showOpts(["We miss you too! ❤️", "Come back soon! ✈️"]);
            chatStep = 1;
        });
    } 
    
    // STEP 1: YOU HINT AT SURPRISE
    else if(chatStep === 1) {
        txt = choice === 1 ? "We miss you too! ❤️" : "Come back soon! ✈️";
        addBubble(txt, 'chat-me');
        opts.classList.add('hidden');
        
        simulateTyping(() => {
            addBubble("I wish I was there right now...", 'chat-them');
            showOpts(["I have a surprise...", "Actually..."]);
            chatStep = 2;
        });
    } 
    
    // STEP 2: YOU PROPOSE (SEND RING)
    else if(chatStep === 2) {
        txt = "Actually... I have a question.";
        addBubble(txt, 'chat-me');
        opts.classList.add('hidden');
        
        simulateTyping(() => {
            addBubble("What is it? 👀", 'chat-them');
            
            // Show Proposal Button
            showOpts(["Will you marry me? 💍"]);
            chatStep = 3;
        });
    } 
    
    // STEP 3: YOU SEND THE RING & SHE SAYS YES
    else if(chatStep === 3) {
        // You send the text
        addBubble("Will you marry me? 💍", 'chat-me');
        
        // YOU send the Ring Box
        let row = document.createElement('div'); row.className = "chat-row";
        let bubble = document.createElement('div'); bubble.className = "chat-bubble chat-me"; // Sent by YOU
        bubble.style.background = "#FFFBE6"; bubble.style.border = "2px solid #FFD700";
        bubble.innerHTML = `<div style="font-size:3rem;">💍</div><h3 style="color:#D4AF37; margin:5px 0;">MARRY ME?</h3>`;
        row.appendChild(bubble);
        chatBox.appendChild(row); chatBox.scrollTop = chatBox.scrollHeight;

        opts.classList.add('hidden');
        
        // SHE REPLIES
        simulateTyping(() => {
            addBubble("OMG THESUUUU!!! 😭😭", 'chat-them');
            addBubble("YES! A THOUSAND TIMES YES! ❤️💍", 'chat-them');
            
            // Unlock Gift App
            document.getElementById('gift-lock').style.display = 'none';
            document.getElementById('gift-open').style.display = 'block';
            
            opts.innerHTML = `<div class="chat-btn" style="width:100%" onclick="goHome()">🏠 Check "Gift" App</div>`;
            opts.classList.remove('hidden');
        });
    }
}

function simulateTyping(callback) {
    typing.style.display = 'block'; chatBox.scrollTop = chatBox.scrollHeight;
    setTimeout(() => { typing.style.display = 'none'; callback(); }, 1500);
}

function addBubble(text, className) {
    let row = document.createElement('div');
    row.className = "chat-row";
    
    // If it's HER message, add Avatar
    if(className === 'chat-them') {
        let avatar = document.createElement('div');
        avatar.className = "chat-avatar";
        avatar.style.backgroundImage = "url('wallpaper.jpg')"; 
        row.appendChild(avatar);
    }
    
    let bubble = document.createElement('div');
    bubble.className = `chat-bubble ${className}`;
    bubble.innerHTML = text + `<div class="time-tick">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>`;
    
    row.appendChild(bubble);
    chatBox.appendChild(row);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOpts(arr) {
    opts.innerHTML = ""; opts.classList.remove('hidden');
    arr.forEach((t, i) => {
        let btn = document.createElement('div'); btn.className = "chat-btn"; btn.innerText = t; btn.onclick = () => reply(i+1); opts.appendChild(btn);
    });
}
