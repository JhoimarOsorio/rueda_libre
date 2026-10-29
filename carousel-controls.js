(() => {
    const carouselConstructor = window.bootstrap?.Carousel;
    if (!carouselConstructor) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    document.querySelectorAll(".auto-carousel").forEach((element) => {
        const carousel = carouselConstructor.getOrCreateInstance(element, {
            interval: Number(element.dataset.carouselInterval) || 5000,
            pause: false,
            ride: false,
            touch: true,
            keyboard: true
        });
        let stoppedBySelection = false;
        let manualSelection = false;
        const slideCount = element.querySelectorAll(".carousel-item").length;
        const count = element.querySelector(".bike-carousel-count");

        const updateCount = () => {
            if (!count) return;
            const activeSlide = element.querySelector(".carousel-item.active");
            const slides = Array.from(element.querySelectorAll(".carousel-item"));
            count.textContent = `${slides.indexOf(activeSlide) + 1} / ${slideCount}`;
        };

        const stopForSelection = () => {
            stoppedBySelection = true;
            carousel.pause();
        };

        const startRotation = () => {
            if (stoppedBySelection || reducedMotion.matches || document.hidden) return;
            carousel.cycle();
        };

        updateCount();
        startRotation();

        element.addEventListener("click", (event) => {
            if (!event.target.closest("[data-bs-slide], [data-bs-slide-to]")) return;
            manualSelection = true;
            stopForSelection();
        }, true);

        element.addEventListener("keydown", (event) => {
            if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
            manualSelection = true;
            stopForSelection();
        }, true);

        element.addEventListener("slid.bs.carousel", () => {
            updateCount();
            if (manualSelection) {
                manualSelection = false;
                carousel.pause();
            }
        });

        element.querySelectorAll(".bike-option-input").forEach((input) => {
            input.addEventListener("change", () => {
                const hasSelection = Array.from(element.querySelectorAll(".bike-option-input")).some((option) => option.checked);
                if (hasSelection) stopForSelection();
                else {
                    stoppedBySelection = false;
                    startRotation();
                }
            });
        });

        reducedMotion.addEventListener("change", (event) => {
            if (event.matches) carousel.pause();
            else startRotation();
        });
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) carousel.pause();
            else startRotation();
        });
    });
})();