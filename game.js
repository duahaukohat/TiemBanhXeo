let money = 500;

let waitTime = 60;

let waitTimer = null;

let cookingTimer = null;

let step = 0;

let currentBanh = 0;

let order = [];

let ingredientsInPan = [];


/* =========================
   TẠO ORDER
========================= */

function createOrder() {

    const twoBanh =
        Math.random() < 0.5;

    if (twoBanh) {

        order = [
            ["🦐", "🥩"],
            ["🦐", "🦑"]
        ];

    } else {

        order = [
            ["🦐", "🥩"]
        ];

    }

    showOrder();
}


/* =========================
   HIỂN THỊ ORDER
========================= */

function showOrder() {

    const orderText =
        document.getElementById("orderText");

    let text =
        "Cho mình order ";

    order.forEach((banh, index) => {

        if (index > 0) {

            text += ", ";

        }

        text +=
            (index + 1) +
            " bánh xèo ";

        if (
            banh.includes("🦐") &&
            banh.includes("🥩")
        ) {

            text +=
                '<span class="topping">' +
                'tôm thịt' +
                '</span>';

        }

        else if (
            banh.includes("🦐") &&
            banh.includes("🦑")
        ) {

            text +=
                '<span class="topping">' +
                'tôm mực' +
                '</span>';

        }

    });


    orderText.innerHTML = text;
}


/* =========================
   HIỂN THỊ GAME
========================= */

function updateGame() {

    const stage =
        document.getElementById("stage");

    const action =
        document.getElementById("action");

    const message =
        document.getElementById("message");


    if (step === 0) {

        stage.innerText =
            "Chuẩn bị bánh " +
            (currentBanh + 1);

        action.innerText =
            "🥞 ĐỔ BỘT";

        message.innerText =
            "Bấm Bột để bắt đầu bánh.";

    }


    if (step === 1) {

        stage.innerText =
            "Thêm topping";

        action.innerText =
            "🔥 CHIÊN BÁNH";

        message.innerText =
            "Bấm đúng topping khách đã gọi.";

    }


    if (step === 2) {

        stage.innerText =
            "🔥 Đang chiên bánh";

        action.innerText =
            "🔥 ĐANG CHIÊN";

        message.innerText =
            "Đợi bánh chín...";

    }


    if (step === 3) {

        stage.innerText =
            "Bánh đã chín!";

        action.innerText =
            "🍽️ ĐỂ RA DĨA";

        message.innerText =
            "Đưa bánh ra dĩa.";

    }


    if (step === 4) {

        stage.innerText =
            "Thêm đồ ăn kèm";

        action.innerText =
            "🥬 THÊM RAU & NƯỚC CHẤM";

        message.innerText =
            "Thêm rau và nước chấm.";

    }


    if (step === 5) {

        stage.innerText =
            "Hoàn thành món!";

        action.innerText =
            "🐱 PHỤC VỤ";

        message.innerText =
            "Đưa bánh cho khách.";

    }

}


/* =========================
   TIMER KHÁCH CHỜ
========================= */

function startWaiting() {

    clearInterval(waitTimer);

    waitTime = 60;

    const timeText =
        document.getElementById("waitTime");

    const waitBar =
        document.getElementById("waitBar");


    timeText.innerText =
        waitTime;

    waitBar.style.width =
        "100%";

    waitBar.style.background =
        "#55a630";


    waitTimer = setInterval(() => {

        waitTime--;

        timeText.innerText =
            waitTime;


        waitBar.style.width =
            (waitTime / 60 * 100) +
            "%";


        if (waitTime <= 30) {

            waitBar.style.background =
                "#f5a623";

        }


        if (waitTime <= 10) {

            waitBar.style.background =
                "#e53935";

        }


        if (waitTime <= 0) {

            clearInterval(waitTimer);

            clearInterval(cookingTimer);

            customerLeaves();

        }

    }, 1000);

}


/* =========================
   KHÁCH BỎ ĐI
========================= */

function customerLeaves() {

    document.getElementById("stage")
        .innerText =
        "💨 Khách đã rời đi!";


    document.getElementById("message")
        .innerText =
        "Khách chờ quá lâu nên bỏ đi 😭";


    document.getElementById("action")
        .innerText =
        "❌ HẾT GIỜ";


    document.getElementById("action")
        .disabled = true;


    disableIngredients();
}


/* =========================
   BẤM NGUYÊN LIỆU
========================= */

function addIngredient(ingredient) {

    if (waitTime <= 0) {

        return;

    }


    if (step !== 0 && step !== 1) {

        return;

    }


    /* BỘT */

    if (ingredient === "🥞") {

        if (step !== 0) {

            return;

        }


        ingredientsInPan = ["🥞"];


        document.getElementById("pan")
            .innerText =
            "🥞";


        step = 1;

        updateGame();

        return;

    }


    /* TOPPING */

    if (step !== 1) {

        return;

    }


    const required =
        order[currentBanh];


    if (!required.includes(ingredient)) {

        document.getElementById("message")
            .innerText =
            "❌ Khách không gọi topping này!";

        return;

    }


    if (ingredientsInPan.includes(ingredient)) {

        return;

    }


    ingredientsInPan.push(ingredient);


    document.getElementById("pan")
        .innerText =
        ingredientsInPan.join(" ");


    checkToppings();

}


/* =========================
   KIỂM TRA TOPPING
========================= */

function checkToppings() {

    const required =
        order[currentBanh];


    const allDone =
        required.every(item =>
            ingredientsInPan.includes(item)
        );


    if (allDone) {

        document.getElementById("message")
            .innerText =
            "✅ Đủ topping! Bấm CHIÊN.";

    }

}


/* =========================
   NÚT CHÍNH
========================= */

function nextStep() {

    if (waitTime <= 0) {

        return;

    }


    /* ĐỔ BỘT */

    if (step === 0) {

        addIngredient("🥞");

        return;

    }


    /* TOPPING */

    if (step === 1) {

        const required =
            order[currentBanh];


        const allDone =
            required.every(item =>
                ingredientsInPan.includes(item)
            );


        if (!allDone) {

            document.getElementById("message")
                .innerText =
                "⚠️ Chưa đủ topping!";

            return;

        }


        cookBanhXeo();

        return;

    }


    /* ĐANG CHIÊN */

    if (step === 2) {

        return;

    }


    /* ĐỂ RA DĨA */

    if (step === 3) {

        putOnPlate();

        return;

    }


    /* RAU + NƯỚC CHẤM */

    if (step === 4) {

        addSideDishes();

        return;

    }


    /* PHỤC VỤ */

    if (step === 5) {

        serveCustomer();

        return;

    }

}


/* =========================
   CHIÊN BÁNH 10 GIÂY
========================= */

function cookBanhXeo() {

    const bar =
        document.getElementById("bar");

    const action =
        document.getElementById("action");

    const message =
        document.getElementById("message");


    action.disabled = true;


    disableIngredients();


    step = 2;

    updateGame();


    let progress = 0;


    bar.style.width =
        "0%";


    cookingTimer =
        setInterval(() => {

            progress += 10;


            bar.style.width =
                progress + "%";


            if (progress >= 100) {

                clearInterval(cookingTimer);


                action.disabled = false;


                step = 3;


                document.getElementById("pan")
                    .innerText =
                    "🥞✨";


                updateGame();

            }

        }, 1000);

}


/* =========================
   ĐỂ BÁNH RA DĨA
========================= */

function putOnPlate() {

    document.getElementById("pan")
        .innerText =
        "🍽️ 🥞";


    currentBanh++;


    if (currentBanh < order.length) {

        ingredientsInPan = [];

        step = 0;


        document.getElementById("pan")
            .innerText =
            "🍳";


        enableIngredients();


        document.getElementById("bar")
            .style.width =
            "0%";


        updateGame();


        return;

    }


    step = 4;


    updateGame();

}


/* =========================
   THÊM RAU + NƯỚC CHẤM
========================= */

function addSideDishes() {

    document.getElementById("pan")
        .innerText =
        "🍽️ 🥞 🥬 🥣";


    step = 5;


    updateGame();

}


/* =========================
   PHỤC VỤ KHÁCH
========================= */

function serveCustomer() {

    clearInterval(waitTimer);


    step = 6;


    document.getElementById("stage")
        .innerText =
        "✨ Khách đã nhận bánh!";


    document.getElementById("message")
        .innerText =
        "+50.000đ 💰 Khách rất hài lòng!";


    money += 50000;


    document.getElementById("money")
        .innerText =
        money.toLocaleString("vi-VN");


    document.getElementById("action")
        .innerText =
        "🐱 KHÁCH ĐÃ THANH TOÁN";


    document.getElementById("action")
        .disabled = true;


    disableIngredients();

}


/* =========================
   KHÓA NGUYÊN LIỆU
========================= */

function disableIngredients() {

    const buttons =
        document.querySelectorAll(
            ".ingredients button"
        );


    buttons.forEach(button => {

        button.disabled = true;

    });

}


/* =========================
   MỞ NGUYÊN LIỆU
========================= */

function enableIngredients() {

    const buttons =
        document.querySelectorAll(
            ".ingredients button"
        );


    buttons.forEach(button => {

        button.disabled = false;

    });

}


/* =========================
   BẮT ĐẦU GAME
========================= */

createOrder();

updateGame();

startWaiting();
