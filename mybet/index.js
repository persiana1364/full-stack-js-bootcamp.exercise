let player1 = "";
let player2 = "";
let bet = "";

const rollBtn = document.querySelector(".roll");
const startBtn = document.querySelector(".start");
const title = document.querySelector("h1");

// دکمه‌ها از همون اول فعالن
rollBtn.disabled = false;
startBtn.disabled = false;
rollBtn.style.opacity = "1";
startBtn.style.opacity = "1";

// گرفتن نام بازیکن‌ها و شرط جدید
function getPlayers() {
  player1 = prompt("اسم بازیکن اول رو بنویس 🎯") || "بازیکن ۱";
  player2 = prompt("اسم بازیکن دوم رو بنویس 🎯") || "بازیکن ۲";
  bet = prompt("روی چی شرط می‌بندین؟ 🍕 (مثلاً پیتزا یا بستنی)") || "یه چیز خوشمزه";

  // نمایش اسم‌ها روی صفحه
  document.querySelectorAll(".player p")[0].textContent = player1;
  document.querySelectorAll(".player p")[1].textContent = player2;

  title.textContent = "حالا تاس بریز 🎲";
}

// تاس انداختن
function rollDice() {
  // اگه هنوز اسم بازیکن‌ها داده نشده باشه
  if (!player1 || !player2) {
    Swal.fire({
      title: "😅 هنوز بازیکن‌ها مشخص نشدن!",
      text: "اول دکمه‌ی شروع بازی رو بزن تا اسم‌هاتون وارد شه.",
      icon: "warning",
      confirmButtonText: "باشه"
    });
    return;
  }

  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;

  document.querySelector(".img1").src = "images/dice" + randomNumber1 + ".png";
  document.querySelector(".img2").src = "images/dice" + randomNumber2 + ".png";

  let result = "";

  if (randomNumber1 > randomNumber2) {
    result = `${player1} برنده‌ست و ${player2} باید ${bet} بخره 🎉`;
  } else if (randomNumber2 > randomNumber1) {
    result = `${player2} برنده‌ست و ${player1} باید ${bet} بخره 🎉`;
  } else {
    result = `مساوی شد 😅 هر دو ${bet} بخرین!`;
  }

  // نمایش نتیجه بعد از دو ثانیه
  setTimeout(() => {
    Swal.fire({
      title: "🎲 نتیجه بازی",
      text: result,
      icon: "success",
      confirmButtonText: "ادامه بده 🎯",
      background: "rgba(255,255,255,0.9)",
      width: "320px",
      color: "#4a148c",
      confirmButtonColor: "#ffcc00"
    });
  }, 1500);
}

// اتصال دکمه‌ها به توابع
startBtn.addEventListener("click", getPlayers);
rollBtn.addEventListener("click", rollDice);
