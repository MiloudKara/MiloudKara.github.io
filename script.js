const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');

navToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, {threshold: 0.08});

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

//const glow = document.querySelector('.cursor-glow');
//window.addEventListener('pointermove', (e) => {
  //if (!glow) return;
  //glow.style.left = `${e.clientX}px`;
  //glow.style.top = `${e.clientY}px`;
  //glow.style.opacity = '1';
//});

//document.addEventListener('mouseleave', () => {
  //if (glow) glow.style.opacity = '0';
//});

//document.addEventListener('mouseenter', () => {
  //if (glow) glow.style.opacity = '1';
//});


document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById("contact-form");

if (contactForm) {
    const submitButton = document.getElementById("contact-submit");
    const buttonText = submitButton.querySelector(".button-text");
    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        buttonText.textContent = "Sending...";
        submitButton.disabled = true;

        const formData = new FormData(contactForm);

        try {
            const response = await fetch("https://formspree.io/f/xzeboawv", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {
                buttonText.textContent = "Message sent";
                formStatus.textContent = "Thanks — I'll get back to you soon.";
                formStatus.className = "form-status success";

                contactForm.reset();

                setTimeout(() => {
                    buttonText.textContent = "Send message";
                    submitButton.disabled = false;
                    formStatus.textContent = "";
                }, 5000);
            } else {
                throw new Error();
            }
        } catch (error) {
            buttonText.textContent = "Send message";
            submitButton.disabled = false;
            formStatus.textContent = "Something went wrong. Please try again.";
            formStatus.className = "form-status error";
        }
    });
}

const siteHeader = document.querySelector('.site-header');

if (siteHeader) {
    const updateHeader = () => {
        const scrolled = window.scrollY > 10;

        siteHeader.style.background = scrolled
            ? "rgba(9, 9, 9, 0.45)"
            : "#090909";

        siteHeader.style.backdropFilter = scrolled
            ? "blur(18px)"
            : "none";

        siteHeader.style.webkitBackdropFilter = scrolled
            ? "blur(18px)"
            : "none";
    };

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
}