document.querySelectorAll("form[data-success-modal]").forEach((form) => {
    const successAlert = document.querySelector(form.dataset.successAlert);
    const modalElement = document.querySelector(form.dataset.successModal);

    if (!modalElement || !window.bootstrap) {
        console.error("No se pudo inicializar la confirmación del formulario.");
        return;
    }

    const modal = window.bootstrap.Modal.getOrCreateInstance(modalElement);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        form.classList.add("was-validated");

        if (!form.checkValidity()) {
            form.querySelector(":invalid")?.focus();
            return;
        }

        const message = modalElement.querySelector("[data-modal-message]");
        if (message) {
            message.textContent = form.dataset.successMessage;
        }

        const summary = modalElement.querySelector("[data-reservation-summary]");
        if (summary) {
            const name = form.elements.namedItem("nombre").value.trim();
            const bike = form.elements.namedItem("tipo").value;
            const date = form.elements.namedItem("fecha").value;
            summary.textContent = `${name}: bicicleta ${bike}, fecha ${date}.`;
        }

        if (successAlert) {
            successAlert.classList.remove("d-none");
        }

        modal.show();
    });

    modalElement.addEventListener("hidden.bs.modal", () => {
        form.reset();
        form.classList.remove("was-validated");
    });
});

const reservationDate = document.querySelector("#fecha");
if (reservationDate) {
    const today = new Date();
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString()
        .slice(0, 10);
    reservationDate.min = localDate;
}
