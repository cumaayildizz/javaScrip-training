
document.addEventListener("DOMContentLoaded", function () {
    const listItems = document.querySelectorAll("#list li");
  
    listItems.forEach(function (item) {
      item.addEventListener("click", function () {
        this.classList.toggle("checked");
      });
    });
  
    // Sayfa yüklendiğinde çalışacak kodlar
    const liveToastBtn = document.getElementById("liveToastBtn");
    const taskInput = document.getElementById("task");
  
    // "Ekle" butonuna tıklandığında veya Enter tuşuna basıldığında addNewElement fonksiyonu çağrılır
    liveToastBtn.addEventListener("click", function () {
      addNewElement();
    });
  
    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        addNewElement();
      }
    });
  
    // "Close" butonlarına tıklama olayını dinle
    const closeButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeButtons.length; i++) {
      closeButtons[i].addEventListener("click", function () {
        // removeElement fonksiyonu, tıklanan "Close" butonuna sahip liste elemanını kaldırır
        removeElement(this.parentNode);
        // showToast fonksiyonu ile "Listeden silindi" bildirimi yapar
        showToast("Listeden silindi.", "delete");
      });
    }
  });
  
// Yeni bir liste elemanı eklemek için kullanılan fonksiyon
function addNewElement() {
    const inputValue = document.getElementById("task").value;
    const list = document.getElementById("list");
  
    if (inputValue.trim() !== "") {
      // Boş olmayan bir giriş değeri varsa yeni bir liste elemanı oluştur
      const li = document.createElement("li");
      li.appendChild(document.createTextNode(inputValue));
  
      // Close butonu oluştur ve dinleyici ekleyerek tıklama olayını dinle
      const span = document.createElement("span");
      span.className = "close";
      span.appendChild(document.createTextNode("×"));
      span.addEventListener("click", function () {
        // removeElement fonksiyonu, tıklanan "Close" butonuna sahip liste elemanını kaldırır
        removeElement(this.parentNode);
        // showToast fonksiyonu ile "Listeden silindi" bildirimi yapar
        showToast("Listeden silindi.", "delete");
      });
      li.appendChild(span);
  
      // Oluşturulan liste elemanını listeye ekle
      list.appendChild(li);
  
      // Ekleme işlemi tamamlandıktan sonra input içeriğini temizle
      document.getElementById("task").value = "";
  
      // showToast fonksiyonu, bir bildirim gösterimi yapar
      showToast("Listeye eklendi.", "success");
    } else if (inputValue.trim() === "") {
      // Boş giriş değeri varsa hata bildirimi yapar
      showToast("Listeye boş ekleme yapamazsınız!", "error");
    }
  }
  
  // Bir liste elemanını kaldırmak için kullanılan fonksiyon
  function removeElement(element) {
    // Parametre olarak gelen liste elemanını kaldır
    element.remove();
  }
  
  // Bildirim gösterimi yapmak için kullanılan fonksiyon
  function showToast(message, type = "success") {
    const toastId = (type === "delete") ? "deleteToast" : (type === "error") ? "errorToast" : "successToast";
    const toast = document.getElementById(toastId);
    toast.className = `toast ${type}`;
    toast.querySelector(".toast-body").innerHTML = message;
    $(`#${toastId}`).toast("show");
  }

