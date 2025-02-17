// header greeting
document.addEventListener("DOMContentLoaded", function () {
    const greetingEl = document.getElementById("greeting");
    const now = new Date();
    const hour = now.getHours();
    let greeting = "";

    if (hour < 12) {
        greeting = "Good Morning";
    } else if (hour < 18) {
        greeting = "Good Afternoon";
    } else {
        greeting = "Good Evening";
    }

    greetingEl.textContent = greeting;
});

// cat paw gif cursor
const catPaw = document.createElement("img");
catPaw.src = "img/bap-paw.gif";
catPaw.style.position = "absolute";
catPaw.style.width = "50px";
catPaw.style.pointerEvents = "none";
document.body.appendChild(catPaw);

document.addEventListener("mousemove", (e) => {
    catPaw.style.left = e.pageX - catPaw.offsetWidth / 2 + "px";
    catPaw.style.top = e.pageY - catPaw.offsetHeight / 2 + "px";
});

// profile photo switch
const profilePhoto = document.getElementById("profilePhoto");

profilePhoto.addEventListener("click", () => {
    profilePhoto.style.opacity = "0";
});

profilePhoto.addEventListener("transitionend", (event) => {
    if (
        event.propertyName === "opacity" &&
        getComputedStyle(profilePhoto).opacity === "0"
    ) {
        const currentSrc = profilePhoto.src;
        const newImageSrc = currentSrc.includes("pidan2.jpeg")
            ? "img/pidan.jpeg"
            : "img/pidan2.jpeg";

        const preloader = new Image();
        preloader.src = newImageSrc;
        preloader.onload = () => {
            profilePhoto.src = newImageSrc;
            void profilePhoto.offsetWidth;
            profilePhoto.style.opacity = "1";
        };

        preloader.onerror = () => {
            console.error("Error loading new image:", newImageSrc);
        };
    }
});

// onClick ripple effect
document.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    ripple.classList.add("ripple");
    const size = 10;
    const x = e.pageX - size / 2;
    const y = e.pageY - size / 2;

    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    document.body.appendChild(ripple);

    ripple.addEventListener("animationend", function () {
        ripple.remove();
    });
});

// cat status code img
function generateCatImage() {
    const catImagesContainer = document.getElementById("user-data");
    catImagesContainer.innerHTML = "";

    const statusCodes = [
        200, 201, 204, 301, 302, 400, 401, 403, 404, 418, 500, 503,
    ];
    // Select random status code
    const randomIndex = Math.floor(Math.random() * statusCodes.length);
    const code = statusCodes[randomIndex];

    const catImage = document.createElement("img");
    catImage.src = `https://http.cat/${code}`;
    catImage.alt = `HTTP Cat ${code}`;
    catImage.className = "cat-img";
    catImage.style.cursor = "pointer";

    catImage.addEventListener("click", generateCatImage);
    catImagesContainer.appendChild(catImage);
}

generateCatImage();

// toggle between 2 vids
const toggleVideoBtn = document.getElementById("toggle-video");
const infoVideo = document.getElementById("info-video");

const videoURL1 = "https://www.youtube.com/embed/1sjxXucqU_8";
const videoURL2 = "https://www.youtube.com/embed/05j6c06iFWE";

toggleVideoBtn.addEventListener("click", () => {
    if (
        infoVideo.src === videoURL1 ||
        infoVideo.src === videoURL1 + "?enablejsapi=1"
    ) {
        infoVideo.src = videoURL2;
    } else {
        infoVideo.src = videoURL1;
    }
});

// exchange rate calculator
let currentRate = null;

document.getElementById("lookup-rate").addEventListener("click", function () {
    const currency = document.getElementById("currency-select").value;

    fetch("https://open.er-api.com/v6/latest/USD")
        .then((response) => response.json())
        .then((data) => {
            if (data && data.rates && data.rates[currency]) {
                currentRate = data.rates[currency];

                document.getElementById(
                    "exchange-result"
                ).innerText = `1 USD = ${currentRate} ${currency}`;

                if (data.time_last_update_utc) {
                    const utcString = data.time_last_update_utc;
                    const dateObj = new Date(utcString);

                    const localTime = dateObj.toLocaleString("en-US", {
                        weekday: "short",
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        timeZoneName: "short",
                    });

                    document.getElementById(
                        "last-updated"
                    ).innerText = `Data pulled at: ${localTime}`;
                } else {
                    const fallbackLocalTime = new Date().toLocaleString(
                        "en-US",
                        {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            timeZoneName: "short",
                        }
                    );
                    document.getElementById(
                        "last-updated"
                    ).innerText = `Data pulled at: ${fallbackLocalTime}`;
                }
            } else {
                document.getElementById(
                    "exchange-result"
                ).innerText = `Exchange rate not available for ${currency}.`;
                document.getElementById("last-updated").innerText = "";
                currentRate = null;
            }
        })
        .catch((error) => {
            console.error("Error fetching exchange rate data:", error);
            document.getElementById("exchange-result").innerText =
                "Error fetching exchange rate data.";
            document.getElementById("last-updated").innerText = "";
            currentRate = null;
        });
});

document
    .getElementById("calculate-rate")
    .addEventListener("click", function () {
        const usdAmount = parseFloat(
            document.getElementById("usd-amount").value
        );

        if (!currentRate) {
            document.getElementById("calculation-result").innerText =
                "Please check the rate first.";
            return;
        }

        if (isNaN(usdAmount)) {
            document.getElementById("calculation-result").innerText =
                "Please enter a valid number.";
            return;
        }

        const converted = usdAmount * currentRate;
        const currency = document.getElementById("currency-select").value;
        document.getElementById(
            "calculation-result"
        ).innerText = `${usdAmount} USD = ${converted.toFixed(2)} ${currency}`;
    });
