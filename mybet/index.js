// 🔊 صداها
const ding = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_0f72a5c24d.mp3?filename=correct-2-46134.mp3");
const rollSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_c87db9bb28.mp3?filename=dice-rolling-1-104482.mp3");
const winSound = new Audio("https://cdn.pixabay.com/download/audio/2022/03/15/audio_593ee0a315.mp3?filename=success-1-6297.mp3");

ding.load();
rollSound.load();
winSound.load();

let player1Name = "";
let player2Name = "";
let bet = "";

const startBtn = document.querySelector(".start");
const rollBtn = document.querySelector(".roll");
const diceArea = document.querySelector(".dic_area");
const p1name = document.getElementById("p1name");
const p2name = document.getElementById("p2name");

// 🎮 شروع بازی
startBtn.addEventListener("click", async () => {
  // SweetAlert برای گرفتن نام بازیکن‌ها
  const { value: p1 } = await Swal.fire({
    title: "اسم بازیکن اول؟ 🎯",
    input: "text",
    inputPlaceholder: "مثلاً الهام",
    confirmButtonText: "بعدی",
    confirmButtonColor: "#8e44ad"
  });

  const { value: p2 } = await Swal.fire({
    title: "اسم بازیکن دوم؟ 🎯",
    input: "text",
    inputPlaceholder: "مثلاً مهدی",
    confirmButtonText: "ادامه",
    confirmButtonColor: "#8e44ad"
  });

  if (!p1 || !p2) {
    Swal.fire("😅 لطفاً اسم هر دو نفر رو وارد کن");
    return;
  }

  player1Name = p1;
  player2Name = p2;
  ding.play();

  // شرط
  const { value: betValue } = await Swal.fire({
    title: "سر چی شرط می‌بندین؟ 💰",
    input: "text",
    inputPlaceholder: "مثلاً پیتزا یا بستنی 😋",
    confirmButtonText: "شروع بازی",
    confirmButtonColor: "#f1c40f"
  });

  bet = betValue || "یه چیز خوشمزه";

  Swal.fire({
    title: `😎 ${player1Name} و ${player2Name} شرط بستن سر ${bet}!`,
    confirmButtonText: "بزن بریم!",
    confirmButtonColor: "#27ae60"
  });

  diceArea.classList.remove("hidden");
  rollBtn.classList.remove("hidden");
  startBtn.classList.add("hidden");

  p1name.textContent = player1Name + " 🎲";
  p2name.textContent = player2Name + " 🎲";
});

// 🎲 تاس انداختن
function rollDicc() {
  rollSound.play();

  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;

  document.querySelector(".img1").src = "images/dice" + randomNumber1 + ".png";
  document.querySelector(".img2").src = "images/dice" + randomNumber2 + ".png";

  let result = "";

  if (randomNumber1 > randomNumber2) {
    result = `🎉 ${player1Name} برندست و ${player2Name} باید ${bet} بخره!`;
  } else if (randomNumber2 > randomNumber1) {
    result = `🎉 ${player2Name} برندست و ${player1Name} باید ${bet} بخره!`;
  } else {
    result = `😅 مساویه! هر دوتاتون باید ${bet} بخرین با هم!`;
  }

  // تأخیر نیم‌ثانیه برای نمایش تاس‌ها قبل از پیام
  setTimeout(() => {
    winSound.play();
    Swal.fire({
      title: "نتیجه بازی 🎲",
      text: result,
      icon: "success",
      confirmButtonText: "بازی دوباره!",
      confirmButtonColor: "#f39c12",
      background: "#f8e1ff"
    }).then(() => location.reload());
  }, 500);
}

rollBtn.addEventListener("click", rollDicc);
