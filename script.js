document.addEventListener("DOMContentLoaded", () => {
    const titles = ["Data Analyst", "Data Engineer", "Analytics Engineer"];
    let currentTitle = 0;
    let currentChar = 0;
    const typewriter = document.querySelector("#type-text");

    function type() {
        const currentText = titles[currentTitle];
        typewriter.textContent = currentText.substring(0, currentChar + 1);
        currentChar++;

        if (currentChar === currentText.length) {
            setTimeout(() => {
                currentChar = 0;
                currentTitle = (currentTitle + 1) % titles.length;
                setTimeout(type, 300);
            }, 1000);
        } else {
            setTimeout(type, 120);
        }
    }

    type();

    // ===== Timeline Alternating Layout =====
    const items = document.querySelectorAll(".timeline-item");
    items.forEach((item, index) => {
        item.classList.add(index % 2 === 0 ? "left" : "right");
    });

    // ===== Contact Form Submission =====
    const contactForm = document.getElementById("contact-form");
    const status = document.getElementById("form-status");

    if (contactForm) {
        contactForm.addEventListener("submit", async function (event) {
            event.preventDefault();

            // Send form data to Web3Forms
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: new FormData(contactForm)
            });

            if (response.ok) {
                status.style.display = "block";
                status.style.color = "green";
                status.textContent = "✅ Message sent successfully!";
                contactForm.reset();

                // Hide after 5 seconds
                setTimeout(() => {
                    status.style.display = "none";
                }, 5000);
            } else {
                status.style.display = "block";
                status.style.color = "red";
                status.textContent = "❌ Oops! Something went wrong.";

                // Hide after 5 seconds
                setTimeout(() => {
                    status.style.display = "none";
                }, 5000);
            }
        });
    }

    // ===== AOS Animation Initialization =====
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-in-out",
            once: true
        });
    }
});
