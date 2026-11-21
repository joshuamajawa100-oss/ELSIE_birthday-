
/* ============================================
   ELSIE'S BIRTHDAY WEBSITE
   Birthday: 22 November
   Secret password: mylove
============================================ */


/* ============================================
   1. BIRTHDAY SETTINGS
============================================ */

const BIRTHDAY_MONTH = 10; // November (JavaScript starts at 0)
const BIRTHDAY_DAY = 22;

const SECRET_PASSWORD = "mylove";


/* ============================================
   2. BIRTHDAY DATE FUNCTIONS
============================================ */

function isElsieBirthday() {
    const today = new Date();

    return (
        today.getMonth() === BIRTHDAY_MONTH &&
        today.getDate() === BIRTHDAY_DAY
    );
}


function getNextBirthday() {
    const now = new Date();

    let nextBirthday = new Date(
        now.getFullYear(),
        BIRTHDAY_MONTH,
        BIRTHDAY_DAY,
        0, 0, 0
    );

    // If this year's birthday has passed,
    // countdown to next year's birthday.
    if (nextBirthday <= now) {
        nextBirthday = new Date(
            now.getFullYear() + 1,
            BIRTHDAY_MONTH,
            BIRTHDAY_DAY,
            0, 0, 0
        );
    }

    return nextBirthday;
}


/* ============================================
   3. BIRTHDAY COUNTDOWN
============================================ */

function updateCountdown() {

    const now = new Date();
    const target = getNextBirthday();

    const difference = target - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) {
        daysElement.textContent = String(days).padStart(2, "0");
    }

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }
}

updateCountdown();

setInterval(updateCountdown, 1000);


/* ============================================
   4. OPEN YOUR GIFT BUTTON
============================================ */

const openGiftButton = document.getElementById("openGift");

if (openGiftButton) {

    openGiftButton.addEventListener("click", function () {

        const storySection = document.getElementById("story");

        if (storySection) {
            storySection.scrollIntoView({
                behavior: "smooth"
            });
        }

    });

}


/* ============================================
   5. REASONS I LOVE YOU
============================================ */

const reasonButtons = document.querySelectorAll(".reason-button");

const reasonReveal = document.getElementById("reasonReveal");

reasonButtons.forEach(button => {

    button.addEventListener("click", function () {

        const reason = this.dataset.reason;

        reasonReveal.style.opacity = "0";

        setTimeout(() => {

            reasonReveal.textContent = reason;
            reasonReveal.style.opacity = "1";

        }, 250);

    });

});


/* ============================================
   6. BIRTHDAY PASSWORD SURPRISE
============================================ */

const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");

function setupBirthdaySurprise() {

    if (!surpriseButton || !surpriseMessage) return;

    // Clear any previous content
    surpriseMessage.innerHTML = "";
    surpriseMessage.classList.remove("show");

    // If it is NOT her birthday
    if (!isElsieBirthday()) {

        surpriseButton.disabled = true;

        surpriseButton.textContent =
            "Your surprise unlocks on 22 November ♡";

        surpriseButton.classList.add("locked");

        surpriseButton.style.cursor = "not-allowed";
        surpriseButton.style.opacity = "0.65";

        surpriseButton.onclick = null;

        surpriseMessage.innerHTML = `
            <div class="surprise-heart">🔒</div>

            <h3>Something is waiting for you...</h3>

            <p>
                Your little surprise is still sleeping.
                Come back on 22 November to unlock
                something made especially for you.
            </p>

            <p class="unlock-date">
                Until then, just know that you are loved. ♡
            </p>
        `;

        return;
    }


    // IT IS HER BIRTHDAY!
    surpriseButton.disabled = false;

    surpriseButton.textContent =
        "Unlock your birthday surprise ♡";

    surpriseButton.classList.remove("locked");

    surpriseButton.style.cursor = "pointer";
    surpriseButton.style.opacity = "1";


    // Create password interface
    surpriseButton.onclick = function () {

        surpriseMessage.innerHTML = `
            <div class="surprise-heart">♡</div>

            <h3>A little secret...</h3>

            <p>
                Before I give you your surprise,
                I need you to enter the secret word.
            </p>

            <form id="passwordForm" class="password-form">

                <input
                    type="password"
                    id="birthdayPassword"
                    placeholder="Enter your secret password"
                    autocomplete="off"
                    required
                >

                <button type="submit">
                    Unlock my surprise ♡
                </button>

            </form>

            <p id="passwordFeedback" class="password-feedback"></p>
        `;

        surpriseMessage.classList.add("show");

        surpriseMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });


        // Password verification
        const passwordForm = document.getElementById("passwordForm");

        passwordForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const enteredPassword =
                document.getElementById("birthdayPassword")
                .value
                .trim()
                .toLowerCase();

            const feedback =
                document.getElementById("passwordFeedback");


            if (enteredPassword === SECRET_PASSWORD) {

                // Correct password
                surpriseMessage.innerHTML = `
                    <div class="surprise-heart">❤️</div>

                    <h3>Happy Birthday, My Love!</h3>

                    <div class="secret-content">

                        <p class="secret-title">
                            This little surprise is just for you.
                        </p>

                        <p>
                            If you made it this far, then today is your day.
                            And I hope as you read these words,
                            you feel just how special you are.
                        </p>

                        <p>
                            You deserve a love that is patient,
                            a life filled with purpose,
                            days filled with laughter,
                            and dreams that slowly become reality.
                        </p>

                        <p>
                            May God continue to guide you,
                            protect you, and bless every step you take.
                            May He give you strength when things are difficult
                            and joy that never depends on circumstances.
                        </p>

                        <p>
                            I hope this new chapter of your life
                            becomes one of your most beautiful yet.
                        </p>

                        <p class="final-love">
                            Happy 22 November, Elsie. ♡
                        </p>

                        <p class="secret-signature">
                            With love, always.
                        </p>

                    </div>
                `;

                surpriseMessage.classList.add("show");

                createHeartBurst();

            } else {

                // Incorrect password
                feedback.textContent =
                    "Hmm, that's not the secret word. Try again, my love. ♡";

                feedback.style.color = "#e9a6b7";

                document.getElementById("birthdayPassword").value = "";

            }

        });

    };

}

setupBirthdaySurprise();


/* ============================================
   7. BACKGROUND MUSIC
============================================ */

const music = document.getElementById("backgroundMusic");

const musicToggle = document.getElementById("musicToggle");

const musicText = document.getElementById("musicText");

if (music && musicToggle) {

    musicToggle.addEventListener("click", function () {

        if (music.paused) {

            music.play()
                .then(() => {

                    if (musicText) {
                        musicText.textContent = "Pause our song";
                    }

                })
                .catch(() => {

                    if (musicText) {
                        musicText.textContent = "Music unavailable";
                    }

                });

        } else {

            music.pause();

            if (musicText) {
                musicText.textContent = "Play our song";
            }

        }

    });

}


/* ============================================
   8. FLOATING PETALS
============================================ */

const petalsContainer = document.getElementById("petals");

function createPetal() {

    if (!petalsContainer) return;

    const petal = document.createElement("span");

    petal.classList.add("petal");

    petal.style.left = Math.random() * 100 + "vw";

    petal.style.animationDuration =
        (6 + Math.random() * 6) + "s";

    petal.style.opacity =
        Math.random() * 0.4 + 0.2;

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    petalsContainer.appendChild(petal);

    setTimeout(() => {
        petal.remove();
    }, 12000);

}

setInterval(createPetal, 900);


/* ============================================
   9. NAVIGATION ACTIVE STATE
============================================ */

const navLinks = document.querySelectorAll(".navbar nav a");

navLinks.forEach(link => {

    link.addEventListener("click", function () {

        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        this.classList.add("active");

    });

});


/* ============================================
   10. SECTION REVEAL ANIMATION
============================================ */

const sections = document.querySelectorAll(".section");

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

        }

    });

}, {
    threshold: 0.15
});

sections.forEach(section => {
    observer.observe(section);
});


/* ============================================
   11. HEART ANIMATION ON UNLOCK
============================================ */

function createHeartBurst() {

    for (let i = 0; i < 18; i++) {

        const heart = document.createElement("span");

        heart.innerHTML = "♥";

        heart.classList.add("burst-heart");

        heart.style.left = Math.random() * 100 + "%";

        heart.style.animationDelay =
            Math.random() * 2 + "s";

        heart.style.fontSize =
            (15 + Math.random() * 25) + "px";

        document.body.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 4000);

    }

}


/* ============================================
   12. CONSOLE MESSAGE
============================================ */

console.log("Created with love for Elsie. ❤️");
console.log("Birthday: 22 November");
console.log("The secret awaits...");

function updateCountdown() {

    // If today is her birthday, display zeros
    if (isElsieBirthday()) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        const heading = document.querySelector(".countdown-heading");

        if (heading) {
            heading.textContent = "♡ HAPPY BIRTHDAY, ELSIE ♡";
        }

        return;
    }

    const now = new Date();
    const target = getNextBirthday();

    const difference = target - now;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    document.getElementById("days").textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");
}
