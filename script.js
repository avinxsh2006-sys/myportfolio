/* =========================================
   AVINASH P - PORTFOLIO INTERACTIVITY
   Separate JavaScript file: script.js
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Automatically update the copyright year.
    const yearElement = document.getElementById("current-year");
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // 2. Display today's date in a readable format.
    const dateElement = document.getElementById("live-date");
    if (dateElement) {
        dateElement.textContent = new Date().toLocaleDateString(undefined, {
            weekday: "long", year: "numeric", month: "long", day: "numeric"
        });
    }

    // 3. Typing effect for the introduction line.
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        const phrases = [
            "Student | Aspiring Software Developer",
            "Interested in Machine Learning",
            "Building Solutions Through Technology","In Sports"
        ];
        let phraseIndex = 0;
        let characterIndex = phrases[0].length;
        let deleting = true;
        const typeSpeed = 65;
        const pauseAtEnd = 1400;

        function typeNext() {
            const phrase = phrases[phraseIndex];
            if (deleting) {
                characterIndex--;
                typingElement.textContent = phrase.slice(0, Math.max(0, characterIndex));
                if (characterIndex <= 0) {
                    deleting = false;
                    phraseIndex = (phraseIndex + 1) % phrases.length;
                    window.setTimeout(typeNext, 300);
                    return;
                }
                window.setTimeout(typeNext, 28);
            } else {
                const nextPhrase = phrases[phraseIndex];
                characterIndex++;
                typingElement.textContent = nextPhrase.slice(0, characterIndex);
                if (characterIndex >= nextPhrase.length) {
                    deleting = true;
                    window.setTimeout(typeNext, pauseAtEnd);
                    return;
                }
                window.setTimeout(typeNext, typeSpeed);
            }
        }
        window.setTimeout(typeNext, pauseAtEnd);
    }

    // 4. Filter project cards by category.
    const filterButtons = document.querySelectorAll(".filter-btn");
    const projectCards = document.querySelectorAll("#projects article[data-category]");
    const projectCount = document.getElementById("project-count");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const selectedFilter = button.dataset.filter;
            let visibleCount = 0;

            filterButtons.forEach((item) => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.classList.toggle("btn-primary", active);
                item.classList.toggle("btn-outline-primary", !active);
                item.setAttribute("aria-pressed", String(active));
            });

            projectCards.forEach((card) => {
                const shouldShow = selectedFilter === "all" || card.dataset.category === selectedFilter;
                card.classList.toggle("filter-hidden", !shouldShow);
                if (shouldShow) visibleCount++;
            });
            if (projectCount) {
                projectCount.textContent = `Showing ${visibleCount} project${visibleCount === 1 ? "" : "s"}`;
            }
        });
    });

    // 5. Back-to-top button appears after the user scrolls.
    const backToTop = document.getElementById("back-to-top");
    if (backToTop) {
        const updateBackToTop = () => {
            backToTop.classList.toggle("is-visible", window.scrollY > 300);
        };
        window.addEventListener("scroll", updateBackToTop, { passive: true });
        updateBackToTop();
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 6. Live character count and validation for the contact message.
    const contactForm = document.getElementById("contact-form");
    const messageInput = document.getElementById("message");
    const messageCount = document.getElementById("message-count");

    function updateMessageCount() {
        if (messageInput && messageCount) {
            messageCount.textContent = `${messageInput.value.length} / ${messageInput.maxLength} characters`;
        }
    }
    if (messageInput) {
        messageInput.addEventListener("input", updateMessageCount);
        updateMessageCount();
    }

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            // Use native HTML validation, plus a clearer minimum-length check.
            if (!contactForm.checkValidity()) {
                event.preventDefault();
                contactForm.reportValidity();
                return;
            }
            if (messageInput && messageInput.value.trim().length < 10) {
                event.preventDefault();
                messageInput.setCustomValidity("Please enter at least 10 characters in your message.");
                messageInput.reportValidity();
                messageInput.addEventListener("input", () => messageInput.setCustomValidity(""), { once: true });
            }
            // If valid, the form continues to FormSubmit as configured in index.html.
        });
        contactForm.addEventListener("reset", () => window.setTimeout(updateMessageCount, 0));
    }

    // 7. Close the mobile navigation menu after choosing a section, if a Bootstrap
    // collapse menu is added later. Safe to run with the current simple navigation.
    document.querySelectorAll('nav a[href^="#"]').forEach((link) => {
        link.addEventListener("click", () => {
            const openMenu = document.querySelector(".navbar-collapse.show");
            if (openMenu && window.bootstrap) {
                const instance = window.bootstrap.Collapse.getInstance(openMenu);
                if (instance) instance.hide();
            }
        });
    });
});
