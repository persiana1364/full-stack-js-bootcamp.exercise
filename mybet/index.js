// 🎲 --- Dice Game by Elham --- 🎲

// متغیرها
let player1 = "";
let player2 = "";
let bet = "";

const rollBtn = document.querySelector(".roll");
const title = document.querySelector("h1");

// در ابتدا دکمه تاس غیرفعال
rollBtn.disabled = true;
rollBtn.style.opacity = "0.5";

// گرفتن اسم بازیکن‌ها
function getPlayers() {
  player1 = prompt("اسم بازیکن اول رو بنویس 🎯") || "بازیکن ۱";
  player2 = prompt("اسم بازیکن دوم رو بنویس 🎯") || "بازیکن ۲";
  getBet();
}

// گرفتن شرط
function getBet() {
  bet = prompt("روی چی شرط می‌بندین؟ 🍕 (مثلاً بستنی یا پیتزا)") || "یه چیز خوشمزه";
  rollBtn.disabled = false;
  rollBtn.style.opacity = "1";
  title.textContent = "حالا بزن رو تاس قلقلی 🎲";
}

// تابع تاس انداختن
function rollDice() {
  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;

  const imgSrc1 = "images/dice" + randomNumber1 + ".png";
  const imgSrc2 = "images/dice" + randomNumber2 + ".png";

  document.querySelector(".img1").setAttribute("src", imgSrc1);
  document.querySelector(".img2").setAttribute("src", imgSrc2);

  let result = "";

  if (randomNumber1 > randomNumber2) {
    result = `${player1} برنده‌ست و ${player2} باید ${bet} بخره 🎉`;
  } else if (randomNumber2 > randomNumber1) {
    result = `${player2} برنده‌ست و ${player1} باید ${bet} بخره 🎉`;
  } else {
    result = `مساوی شد 😅`;
  }

  // نمایش نتیجه بعد از کمی تأخیر (۲ ثانیه)
  setTimeout(() => {
    Swal.fire({
      title: '🎲 نتیجه بازی',
      text: result,
      icon: 'success',
      confirmButtonText: 'بازی دوباره 🎯',
      background: 'rgba(255, 255, 255, 0.85)',
      color: '#4a148c',
      confirmButtonColor: '#ffcc00',
      width: '320px',
      backdrop: 'rgba(0,0,0,0.3)',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then(() => {
      location.reload();
    });
  }, 2000);
}

// رویداد دکمه‌ها
document.querySelector(".start").addEventListener("click", getPlayers);
rollBtn.addEventListener("click", rollDice);
