(() => {
    const carouselData = {
        promotions: [
            {
                image: "alquiler.svg",
                alt: "Bicicleta lista para una aventura urbana",
                title: "Tu próxima aventura empieza aquí",
                action: "Reserva una bicicleta",
                href: "paginas/reservas.html"
            },
            {
                image: "taller.svg",
                alt: "Taller práctico de mecánica para bicicletas",
                title: "Aprende a cuidar tu bicicleta",
                action: "Conoce el taller",
                href: "paginas/contactanos.html"
            },
            {
                image: "recorridos.svg",
                alt: "Ruta para recorrer Medellín en bicicleta",
                title: "Descubre Medellín con un guía local",
                action: "Consultar recorridos guiados",
                href: "paginas/tarifas.html#recorridos"
            }
        ],
        urbanas: [
            { image: "urbana.jpeg", alt: "Bicicleta urbana, opción 1", value: "Urbana" },
            { image: "urbana1.jpeg", alt: "Bicicleta urbana, opción 2", value: "Urbana 2" },
            { image: "urbana (2).jpeg", alt: "Bicicleta urbana, opción 3", value: "Urbana 3" },
            { image: "urbana(3).jpeg", alt: "Bicicleta urbana, opción 4", value: "Urbana 4" }
        ],
        montana: [
            { image: "montaña1.jpeg", alt: "Bicicleta de montaña, opción 1", value: "Montaña" },
            { image: "MOntaña2.jpeg", alt: "Bicicleta de montaña, opción 2", value: "Montaña 2" },
            { image: "Montaña (9).jpeg", alt: "Bicicleta de montaña, opción 3", value: "Montaña 3" },
            { image: "montaña (10).jpeg", alt: "Bicicleta de montaña, opción 4", value: "Montaña 4" }
        ],
        electricas: [
            { image: "electrica.jpeg", alt: "Bicicleta eléctrica, opción 1", value: "Eléctrica" },
            { image: "electrica1.jpeg", alt: "Bicicleta eléctrica, opción 2", value: "Eléctrica 2" },
            { image: "electrica2.jpeg", alt: "Bicicleta eléctrica, opción 3", value: "Eléctrica 3" },
            { image: "electrica4.jpeg", alt: "Bicicleta eléctrica, opción 4", value: "Eléctrica 4" }
        ]
    };

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const createSlide = (item, index, count, imagePrefix, isPromotion) => {
        const slide = document.createElement("article");
        slide.className = `three-d-slide ${isPromotion ? "three-d-promo-slide card service-card" : "three-d-bike-slide"}`;
        slide.setAttribute("role", "group");
        slide.setAttribute("aria-roledescription", "diapositiva");
        slide.setAttribute("aria-label", `Opción ${index + 1} de ${count}`);

        const image = document.createElement("img");
        image.src = encodeURI(`${imagePrefix}${item.image}`);
        image.alt = isPromotion ? item.alt : "";
        image.draggable = false;
        image.loading = "eager";

        if (isPromotion) {
            image.className = "three-d-promo-image";
            slide.append(image);

            const body = document.createElement("div");
            body.className = "card-body";
            const title = document.createElement("h3");
            title.className = "card-title h5";
            title.textContent = item.title;
            const link = document.createElement("a");
            link.className = "btn btn-primary btn-sm";
            link.href = item.href;
            link.textContent = item.action;
            body.append(title, link);
            slide.append(body);
            return slide;
        }

        const label = document.createElement("label");
        label.className = "bike-option";
        const input = document.createElement("input");
        input.className = "bike-option-input";
        input.type = "checkbox";
        input.name = "tipo";
        input.value = item.value;
        const accessibleName = document.createElement("span");
        accessibleName.className = "visually-hidden";
        accessibleName.textContent = `Seleccionar ${item.value}`;
        const content = document.createElement("span");
        content.className = "bike-option-content";
        image.className = "bike-option-image";
        content.append(image);
        label.append(input, accessibleName, content);
        slide.append(label);
        return slide;
    };

    const initializeCarousel = (element) => {
        const data = carouselData[element.dataset.carousel];
        const track = element.querySelector(".three-d-track");
        const countLabel = element.querySelector(".three-d-count");
        const previousButton = element.querySelector(".three-d-prev");
        const nextButton = element.querySelector(".three-d-next");

        if (!data || !track || !countLabel || !previousButton || !nextButton) {
            console.error("No se pudo inicializar el carrusel:", element.id);
            return;
        }

        const imagePrefix = element.dataset.imagePrefix;
        if (!imagePrefix) {
            console.error("Falta data-image-prefix en el carrusel:", element.id);
            return;
        }

        const isPromotion = element.dataset.carousel === "promotions";
        const slides = data.map((item, index) => createSlide(item, index, data.length, imagePrefix, isPromotion));
        track.replaceChildren(...slides);

        let activeIndex = 0;
        let timer = 0;
        let manuallyPaused = false;
        let pausedForSelection = false;
        const interval = Number(element.dataset.carouselInterval) || 2000;

        const updateSlides = () => {
            const spacing = Math.min(isPromotion ? 210 : 160, element.clientWidth * 0.3);

            slides.forEach((slide, index) => {
                let offset = (index - activeIndex + slides.length) % slides.length;
                if (offset > slides.length / 2) offset -= slides.length;
                const distance = Math.abs(offset);
                const scale = Math.max(0.72, 1 - distance * 0.08);

                slide.style.transform = `translate(-50%, -50%) translateX(${offset * spacing}px) translateZ(${-distance * 155}px) rotateY(${-offset * 34}deg) scale(${scale})`;
                slide.style.opacity = String(Math.max(0.28, 1 - distance * 0.27));
                slide.style.setProperty("--carousel-brightness", String(Math.max(0.42, 1 - distance * 0.23)));
                slide.style.zIndex = String(slides.length - distance);
                slide.inert = distance !== 0;
                slide.setAttribute("aria-hidden", String(distance !== 0));
                slide.classList.toggle("is-active", distance === 0);
            });

            countLabel.textContent = `${activeIndex + 1} / ${slides.length}`;
        };

        const stopAutoplay = () => {
            window.clearInterval(timer);
            timer = 0;
        };

        const startAutoplay = () => {
            stopAutoplay();
            if (reducedMotion.matches || document.hidden || manuallyPaused || pausedForSelection || slides.length < 2) return;
            timer = window.setInterval(() => {
                activeIndex = (activeIndex + 1) % slides.length;
                updateSlides();
            }, interval);
        };

        const move = (direction) => {
            manuallyPaused = true;
            stopAutoplay();
            activeIndex = (activeIndex + direction + slides.length) % slides.length;
            updateSlides();
        };

        previousButton.addEventListener("click", () => move(-1));
        nextButton.addEventListener("click", () => move(1));
        element.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft") {
                event.preventDefault();
                move(-1);
            } else if (event.key === "ArrowRight") {
                event.preventDefault();
                move(1);
            }
        });

        if (!isPromotion) {
            track.addEventListener("change", (event) => {
                if (!event.target.matches(".bike-option-input")) return;
                pausedForSelection = slides.some((slide) => slide.querySelector(".bike-option-input").checked);
                if (pausedForSelection) stopAutoplay();
                else {
                    manuallyPaused = false;
                    startAutoplay();
                }
            });
        }

        element.addEventListener("pointerenter", stopAutoplay);
        element.addEventListener("pointerleave", startAutoplay);
        element.addEventListener("focusin", stopAutoplay);
        element.addEventListener("focusout", (event) => {
            if (!element.contains(event.relatedTarget)) startAutoplay();
        });
        document.addEventListener("visibilitychange", startAutoplay);
        reducedMotion.addEventListener("change", startAutoplay);
        window.addEventListener("resize", updateSlides);

        updateSlides();
        startAutoplay();
    };

    document.querySelectorAll(".three-d-carousel").forEach(initializeCarousel);
})();
