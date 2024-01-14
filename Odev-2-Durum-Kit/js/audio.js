

document.addEventListener("DOMContentLoaded", function () {
    // Her bir not düğmesi için click event listener ekleyelim
    document.querySelectorAll('.section button').forEach(button => {
        button.addEventListener('click', function () {
            // Kayıt modunda değilsek notayı çal, kayıt modunda isek kaydet
            if (isRecording) {
                recordSound(button.id);
            } else {
                playSound(button.id);
            }
        });
    });

    // Save Music düğmesine tıklandığında kaydı başlat veya durdur
    const saveMusicButton = document.querySelector('.red');
    saveMusicButton.addEventListener('click', function () {
        toggleRecording();
    });

    // Play Save Music düğmesine tıklandığında kaydedilmiş müziği çal
    const playSavedMusicButton = document.querySelector('.green');
    playSavedMusicButton.addEventListener('click', function () {
        playSavedMusic();
    });
});

function playSound(id) {
    let audio = document.querySelector("#" + id);
    audio.play();
}

function recordSound(id) {
    // Kaydedilmiş müziği tarayıcıdan alalım veya oluşturalım.
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic')) || [];

    // Şu an çalınan nota bilgisini kaydedelim.
    savedMusic.push(id);

    // Kaydedilmiş müziği tarayıcıda güncelleyelim.
    localStorage.setItem('savedMusic', JSON.stringify(savedMusic));
}

// Kaydedilmiş müziği baştan sona çalmak için
function playSavedMusic() {
    // Kaydedilmiş müziği tarayıcıdan alalım.
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic')) || [];

    // Kaydedilmiş müziği sırayla oynatalım.
    savedMusic.forEach((item, index) => {
        setTimeout(() => {
            playSound(item);
        }, index * 500); // Her bir nota arasında 0.5 saniye bekleme ekleyebilirsiniz.
    });
}

let isRecording = false; // Kayıt durumunu kontrol etmek için bir değişken

function toggleRecording() {
    isRecording = !isRecording;

    if (isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

function startRecording() {
    // Kayıt başladığında, kaydedilmiş müziği temizleyelim.
    localStorage.removeItem('savedMusic');
}

function stopRecording() {
    // Kayıt bittiğinde, kaydedilmiş müziği güncelleyelim.
    updateSavedMusicList();
}

function updateSavedMusicList() {
    // Kaydedilmiş müziği tarayıcıdan alalım.
    const savedMusic = JSON.parse(localStorage.getItem('savedMusic')) || [];

    // Kaydedilmiş müzik listesini göstermek için HTML içeriğini oluşturalım.
    const savedMusicList = document.getElementById('savedMusicList');
    savedMusicList.innerHTML = '<h2>Saved Music:</h2>';
    savedMusic.forEach(item => {
        savedMusicList.innerHTML += `<p>${item}</p>`;
    });
}