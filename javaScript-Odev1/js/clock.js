
// let enterName = prompt("Adinizi Giriniz: ");
// let writeName = document.querySelector("#myName");
// writeName.innerHTML = getName(enterName);

// function getName(name) {
//     let changeName = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
//     return changeName;
// }

let enterName = prompt("Adinizi Giriniz: ");
let writeName = document.querySelector("#myName");
writeName.innerHTML = getName(enterName);
updateDateInfo(); // Yeni eklenen tarih bilgisini güncelleyen fonksiyonu çağır

function getName(name) {
    let changeName = `${name[0].toUpperCase()}${name.slice(1).toLowerCase()}`;
    return changeName;
}

function updateDateInfo() {
    const clockElement = document.getElementById("myClock");

    function updateTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');
        const dayOfWeek = now.toLocaleDateString('tr-TR', { weekday: 'long' });

        const formattedTime = `${hours}:${minutes}:${seconds} ${dayOfWeek}`;

        clockElement.innerHTML = formattedTime;
    }

    // Zamanı her saniyede bir güncelle
    setInterval(updateTime, 1000);

    // Sayfa yüklendiğinde zamanı güncelle
    updateTime();
}

//Gun Ay Yil
// function updateDateInfo() {
//     const currentDate = new Date();
//     const day = currentDate.getDate();
//     const month = currentDate.getMonth() + 1;
//     const year = currentDate.getFullYear();
//     const formattedDate = `${day}.${month}.${year}`;

//     const dateInfo = document.getElementById("myClock");
//     dateInfo.innerHTML = formattedDate;
// }