// Inisialisasi variabel
let targetNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 5;
let level = 1;
let timeLeft = 30; // waktu awal untuk level 1
let timerInterval;
let score = 0;

const guessInput = document.getElementById('guess-input');
const submitBtn = document.getElementById('submit-btn');
const resultDisplay = document.getElementById('result');
const triesLeftDisplay = document.getElementById('tries-left');
const resetBtn = document.getElementById('reset-btn');
const timerDisplay = document.getElementById('timer');
const levelDisplay = document.getElementById('level-display');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const scoreDisplay = document.getElementById('score-display');
const rewardDisplay = document.getElementById('reward-display');
const addTimeBtn = document.getElementById('add-time-btn');
const hintBtn = document.getElementById('hint-btn');
const clickSound = document.getElementById('click-sound'); // Suara klik

// Array untuk menyimpan path gambar latar belakang
const backgroundImages = [
    'pict 1.jpg',
    'level 2.jpg',
    'level 3.jpg',
    'level 4.jpg',
    'image/level 5.jpg'
];

// Menampilkan jumlah kesempatan, level, dan skor
triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;
levelDisplay.textContent = `Level: ${level}`;
scoreDisplay.textContent = `Skor: ${score}`;

// Fungsi untuk memulai ulang game
function resetGame() {
    level = 1;
    timeLeft = 30;
    score = 0; // Reset skor ke 0
    scoreDisplay.textContent = `Skor: ${score}`; // Perbarui tampilan skor
    startNewLevel();
}

// Fungsi untuk memulai level baru
function startNewLevel() {
    targetNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 6 - level; // semakin tinggi level, semakin sedikit kesempatan
    timeLeft = 30 - (level * 5); // semakin tinggi level, semakin sedikit waktu
    if (timeLeft < 5) timeLeft = 5; // minimum waktu 5 detik
    resultDisplay.textContent = '';
    rewardDisplay.textContent = ''; // Reset penghargaan
    triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;
    levelDisplay.textContent = `Level: ${level}`;
    guessInput.value = '';
    resetBtn.style.display = 'none';
    submitBtn.style.display = 'inline-block';
    addTimeBtn.disabled = false;
    hintBtn.disabled = false;

    // Ubah background sesuai dengan level
    document.body.style.backgroundImage = `url('${backgroundImages[level - 1]}')`;
    document.body.style.backgroundSize = 'cover'; 
    document.body.style.backgroundPosition = 'center'; 
    document.body.style.backgroundRepeat = 'no-repeat'; 

    // Mulai timer
    clearInterval(timerInterval);
    timerDisplay.textContent = `Waktu tersisa: ${timeLeft} detik`;
    timerInterval = setInterval(countdown, 1000);
}

// Fungsi untuk menghitung mundur timer
function countdown() {
    if (timeLeft > 0) {
        timeLeft--;
        timerDisplay.textContent = `Waktu tersisa: ${timeLeft} detik`;
    } else {
        loseGame();
    }
}

// Fungsi untuk memberikan petunjuk
function giveHint() {
    if (targetNumber % 2 === 0) {
        resultDisplay.textContent = "Angka target adalah genap.";
    } else {
        resultDisplay.textContent = "Angka target adalah ganjil.";
    }
}

// Fungsi untuk menambah waktu
function addTime() {
    timeLeft += 5;
    alert("Waktu ditambahkan 5 detik!");
}

// Fungsi untuk menebak angka
function guessNumber() {
    clickSound.play(); // Mainkan suara ketika tombol diklik

    const guess = parseInt(guessInput.value);

    if (isNaN(guess) || guess < 1 || guess > 100) {
        alert('Masukkan angka antara 1 dan 100!');
        return;
    }

    attempts--;
    triesLeftDisplay.textContent = `Kesempatan tersisa: ${attempts}`;

    if (guess === targetNumber) {
        winGame();
    } else {
        if (attempts === 0) {
            loseGame();
        } else {
            resultDisplay.textContent = guess < targetNumber ? 'Terlalu rendah!' : 'Terlalu tinggi!';
        }
    }
}

// Fungsi menang
function winGame() {
    resultDisplay.textContent = `Selamat! Kamu menebak dengan benar! Angkanya adalah ${targetNumber}.`;
    resultDisplay.classList.add('win');
    winSound.play();

    // Hitung skor berdasarkan waktu tersisa
    let points = timeLeft * 10;
    updateScore(points);  // Update skor
    giveReward();  // Berikan penghargaan sesuai level

    level++; // Naik ke level berikutnya
    if (level > 5) {
        level = 5; // Membatasi level maksimal
    }

    // Mulai level baru setelah menang
    startNewLevel();
}

// Fungsi kalah
function loseGame() {
    resultDisplay.textContent = `Game Over! Angka yang benar adalah ${targetNumber}.`;
    resultDisplay.classList.add('lose');
    loseSound.play();
    endGame(false);
}

// Fungsi untuk mengakhiri game
function endGame(isWin) {
    clearInterval(timerInterval);
    submitBtn.style.display = 'none';
    resetBtn.style.display = 'inline-block';
    addTimeBtn.disabled = true;
    hintBtn.disabled = true;
}

// Update tampilan skor
function updateScore(points) {
    score += points;
    scoreDisplay.textContent = `Skor: ${score}`;
}

// Fungsi untuk memberikan penghargaan
function giveReward() {
    let rewardMessage = '';

    switch (level) {
        case 2:
            rewardMessage = 'Kamu hebat! Level 2 selesai!';
            break;
        case 3:
            rewardMessage = 'Luar biasa! Kamu sudah mencapai Level 3!';
            break;
        case 4:
            rewardMessage = 'Kamu adalah Master Tebak Angka di Level 4!';
            break;
        case 5:
            rewardMessage = 'Pemain tingkat dewa! Level 5 berhasil!';
            break;
        default:
            rewardMessage = 'Selamat! Kamu naik level!';
    }

    rewardDisplay.textContent = rewardMessage;
}

// Event Listener
submitBtn.addEventListener('click', guessNumber);
resetBtn.addEventListener('click', resetGame);
addTimeBtn.addEventListener('click', addTime);
hintBtn.addEventListener('click', giveHint);

// Memulai game pertama kali
resetGame();
