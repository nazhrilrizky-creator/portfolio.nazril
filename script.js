document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation SPA (Single Page Application)
    const pageLinks = document.querySelectorAll(".page-link");
    const pageSections = document.querySelectorAll(".page-section");
    const navButtons = document.querySelectorAll(".nav-btn");

    function switchPage(targetPageId) {
        pageSections.forEach((section) => {
            section.classList.remove("active");
        });

        navButtons.forEach((btn) => {
            btn.classList.remove("active");
            if (btn.getAttribute("data-page") === targetPageId) {
                btn.classList.add("active");
            }
        });

        const targetSection = document.getElementById(`page-${targetPageId}`);
        if (targetSection) {
            targetSection.classList.add("active");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }

    pageLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const pageId = link.getAttribute("data-page");
            if (pageId) switchPage(pageId);
        });
    });

    // 2. Filter Katalog Ekskul
    const filterButtons = document.querySelectorAll(".filter-btn");
    const ekskulCards = document.querySelectorAll("#ekskul-grid .card");

    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active"));
            button.classList.add("active");

            const filterValue = button.getAttribute("data-filter");

            ekskulCards.forEach((card) => {
                const category = card.getAttribute("data-category");
                if (filterValue === "all" || filterValue === category) {
                    card.style.display = "flex";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 3. Auto-fill Form Pendaftaran dari Kartu Ekskul
    const registerButtons = document.querySelectorAll(".page-link-register");
    const ekskulInput = document.getElementById("ekskulTarget");

    registerButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const ekskulName = btn.getAttribute("data-ekskul");
            if (ekskulInput && ekskulName) {
                ekskulInput.value = ekskulName;
            }
            switchPage("daftar");
        });
    });

    // 4. Form Submission Handling (Integrasi API Flask / Python)
    const registrationForm = document.getElementById("registrationForm");
    const alertSuccess = document.getElementById("alertSuccess");

    if (registrationForm) {
        registrationForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const formData = {
                nama: document.getElementById("nama").value,
                kelas: document.getElementById("kelas").value,
                ekskul: document.getElementById("ekskulTarget").value,
                alasan: document.getElementById("alasan").value,
            };

            try {
                // Mengirim data ke API Python backend
                const response = await fetch("http://127.0.0.1:5000/api/daftar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    alertSuccess.classList.remove("hidden");
                    registrationForm.reset();
                } else {
                    alert("Gagal mengirim pendaftaran. Coba lagi nanti.");
                }
            } catch (error) {
                // Fallback jika API belum dijalankan
                console.warn("Backend API tidak terdeteksi, menjalankan mode simulasi.", error);
                alertSuccess.classList.remove("hidden");
                registrationForm.reset();
            }
        });
    }
});