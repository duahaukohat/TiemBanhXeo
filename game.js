let money = 500;
let step = 0;

let waitTime = 60;
let waitTimer = null;

let ingredientsInPan = [];

const stages = [
    "Khách đang gọi món...",
    "Đổ bột vào chảo",
    "Thêm topping",
    "Chiên bánh",
    "Để bánh ra dĩa",
    "Thêm rau và nước chấm",
    "Đưa bánh cho khách"
];

function updateGame() {

    const stage = document.getElementById("stage");
    const action = document.getElementById("action");
    const message = document.getElementById("message");

    stage.innerText = stages[step];

    if (step === 0) {
        action.innerText = "🥞 ĐỔ BỘT";
        message.innerText = "Khách đã gọi món!";
    }

    if (step === 1) {
        action.innerText = "🦐 THÊM TOPPING";
        message.innerText = "Bấm topping để cho vào chảo.";
    }

    if (step === 2) {
        action.innerText = "🔥 CHIÊN BÁNH";
        message.innerText = "Đủ topping rồi! Bắt đầu chiên.";
    }

    if (step === 3) {
        action.innerText = "🍽️ ĐỂ RA DĨA";
        message.innerText = "Bánh đã chín!";
    }

    if (step === 4) {
        action.innerText = "🥬 THÊM ĐỒ ĂN KÈM";
        message.innerText = "Thêm rau và nước chấm.";
    }

    if (step === 5) {
        action.innerText = "🐱 PHỤC VỤ";
        message.innerText = "Đưa bánh cho khách!";
    }
}


function startWaiting() {

    clearInterval(waitTimer);

    waitTime = 60;

    const timeText = document.getElementById("waitTime");
    const waitBar = document.getElementById("waitBar");

    timeText.innerText = waitTime;
    waitBar.style.width = "100%";

    waitTimer = setInterval(() => {

        waitTime--;

        timeText.innerText = waitTime;

        waitBar.style.width =
            (waitTime / 60 * 100) + "%";

        if (waitTime <= 30) {
            waitBar.style.background = "#f5a623";
        }

        if (waitTime <= 10) {
            waitBar.style.background = "#e53935";
        }

        if (waitTime <= 0) {

            clearInterval(waitTimer);

            customerLeaves();
        }

    }, 1000);
}


function customerLeaves() {

    document.getElementById("stage").innerText =
        "💨 Khách đã rời đi!";

    document.getElementById("message").innerText =
        "Khách chờ quá lâu nên bỏ đi 😭";

    document.getElementById("action").innerText =
        "❌ HẾT GIỜ";

    document.getElementById("action").disabled = true;
}


function nextStep() {

    if (waitTime <= 0) {
        return;
    }

    if (step === 0) {

        ingredientsInPan = ["🥞"];

        document.getElementById("pan").innerText =
            "🥞";

        step = 1;

        updateGame();

        return;
    }

    if (step === 1) {

        document.getElementById("message").innerText =
            "Hãy bấm topping bên dưới.";

        return;
    }

    if (step === 2) {

        cookBanhXeo();

        return;
    }

    if (step === 3) {

        document.getElementById("pan").innerText =
            "🍽️ 🥞";

        step = 4;

        updateGame();

        return;
    }

    if (step === 4) {

        document.getElementById("pan").innerText =
            "🥞 🥬 🥣";

        step = 5;

        updateGame();

        return;
    }

    if (step === 5) {

        receiveMoney();

    }
}


function addIngredient(ingredient) {

    if (step !== 1) {
        return;
    }

    ingredientsInPan.push(ingredient);

    document.getElementById("pan").innerText =
        ingredientsInPan.join(" ");

    checkOrder();
}


function checkOrder() {

    const hasShrimp =
        ingredientsInPan.includes("🦐");

    const hasMeat =
        ingredientsInPan.includes("🥩");

    if (hasShrimp && hasMeat) {

        step = 2;

        updateGame();

    }
}


function cookBanhXeo() {

    const bar = document.getElementById("
