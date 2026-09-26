let money = 500;
let step = 0;

const stages = [
    "Khách đang đến...",
    "Khách đã gọi món!",
    "Đổ bột vào chảo",
    "Thêm topping",
    "Chiên bánh",
    "Để bánh ra dĩa",
    "Thêm rau và nước chấm",
    "Đưa bánh cho khách"
];

const actionTexts = [
    "👋 ĐÓN KHÁCH",
    "📝 XEM ORDER",
    "🥞 ĐỔ BỘT",
    "🦐 THÊM TOPPING",
    "🔥 CHIÊN",
    "🍽️ ĐỂ RA DĨA",
    "🥬 THÊM ĐỒ ĂN KÈM",
    "🐱 PHỤC VỤ"
];

function updateGame() {
    const stage = document.getElementById("stage");
    const action = document.getElementById("action");
    const message = document.getElementById("message");

    stage.innerText = stages[step];
    action.innerText = actionTexts[step];

    if (step === 0) {
        message.innerText = "Có khách đang bước vào tiệm!";
    }

    if (step === 1) {
        message.innerText = "Khách muốn bánh xèo tôm thịt.";
    }

    if (step === 2) {
        message.innerText = "Hãy đổ bột vào chảo.";
    }

    if (step === 3) {
        message.innerText = "Cho tôm, thịt và giá vào bánh.";
    }

    if (step === 4) {
        message.innerText = "Đang chiên bánh...";
    }

    if (step === 5) {
        message.innerText = "Bánh đã chín! Cho ra dĩa.";
    }

    if (step === 6) {
        message.innerText = "Thêm rau sống và nước chấm.";
    }

    if (step === 7) {
        message.innerText = "Đưa bánh cho khách!";
    }
}

function nextStep() {

    if (step === 4) {
        cookBanhXeo();
        return;
    }

    if (step < 7) {
        step++;
        updateGame();
    } else {
        receiveMoney();
    }
}

function cookBanhXeo() {

    const bar = document.getElementById("bar");
    const action = document.getElementById("action");
    const message = document.getElementById("message");

    action.disabled = true;
    message.innerText = "🔥 Đang chiên bánh...";

    let progress = 0;

    const timer = setInterval(() => {

        progress += 5;
        bar.style.width = progress + "%";

        if (progress >= 100) {

            clearInterval(timer);

            action.disabled = false;
            step = 5;

            document.getElementById("pan").innerText = "🥞";

            updateGame();
        }

    }, 120);
}

function receiveMoney() {

    money += 50000;

    document.getElementById("money").innerText =
        money.toLocaleString("vi-VN");

    document.getElementById("stage").innerText =
        "✨ Khách đã thanh toán!";

    document.getElementById("message").innerText =
        "+50.000đ 💰 Khách rất hài lòng!";

    document.getElementById("action").innerText =
        "🐱 KHÁCH RỜI TIỆM";

    document.getElementById("action").disabled = true;
}

updateGame();
