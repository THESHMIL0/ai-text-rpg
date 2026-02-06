/* START IMMEDIATELY */
document.addEventListener('DOMContentLoaded', init);

let chatStep = 0;
let isProcessing = false; // PREVENTS DOUBLE TAP
const chatBox = document.getElementById('chat-box');

function init() {
    updateClock();
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
    if(isProcessing) return; // STOP DOUBLE TAPS
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
function downloadImage() { alert("Image Saved! 📸"); }
