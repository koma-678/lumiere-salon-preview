
/* =================================
   LUMIÈRE SALON
   JavaScript
   Produced by KOMA STUDIO
   ================================= */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const nav = document.getElementById("nav");
    const menuToggle = document.getElementById("menuToggle");
    const backToTop = document.getElementById("backToTop");
    const year = document.getElementById("year");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    /* =================================
       スマートフォン用メニュー
       ================================= */

    function closeMenu() {

        nav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");

    }

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "メニューを閉じる" : "メニューを開く"
        );

    });

    nav.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

    document.addEventListener("click", event => {

        if (!header.contains(event.target)) {
            closeMenu();
        }

    });

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            nav.classList.contains("active")
        ) {

            closeMenu();
            menuToggle.focus();

        }

    });

    window.addEventListener("resize", () => {

        if (window.innerWidth > 1100) {
            closeMenu();
        }

    });

    /* =================================
       スクロール時のヘッダー制御
       ================================= */

    function updateScroll() {

        const scrollY = window.scrollY;

        header.classList.toggle(
            "scrolled",
            scrollY > 50
        );

        backToTop.classList.toggle(
            "show",
            scrollY > 500
        );

    }

    window.addEventListener("scroll", updateScroll, {
        passive: true
    });

    updateScroll();

    /* =================================
       ページ上部へ戻る
       ================================= */

    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: reducedMotion.matches
                ? "instant"
                : "smooth"
        });

    });

    /* =================================
       スクロールアニメーション
       ================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !reducedMotion.matches
    ) {

        document.documentElement.classList.add("js-enabled");

        const observer = new IntersectionObserver(entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        }, {
            threshold: 0.1
        });

        revealElements.forEach(element => {

            observer.observe(element);

        });

    }

    /* =================================
       ヘアスタイル絞り込み
       ================================= */

    const filterButtons = document.querySelectorAll(".filter-btn");
    const styleCards = document.querySelectorAll(".style-card");

    filterButtons.forEach(button => {

        button.setAttribute(
            "aria-pressed",
            String(button.classList.contains("active"))
        );

        button.addEventListener("click", () => {

            const selectedCategory = button.dataset.filter;

            // 選択中のボタンを変更
            filterButtons.forEach(btn => {

                btn.classList.remove("active");

                btn.setAttribute("aria-pressed", "false");

            });

            button.classList.add("active");

            button.setAttribute("aria-pressed", "true");

            // カテゴリーに応じて表示を切り替える
            styleCards.forEach(card => {

                const category = card.dataset.category;

                const shouldShow =
                    selectedCategory === "all" ||
                    category === selectedCategory;

                card.hidden = !shouldShow;

                if (shouldShow) {

                    card.classList.add("visible");

                    if (
                        !reducedMotion.matches &&
                        typeof card.animate === "function"
                    ) {

                        card.getAnimations().forEach(animation => {
                            animation.cancel();
                        });

                        card.animate(
                            [
                                {
                                    opacity: 0,
                                    transform: "translateY(15px)"
                                },
                                {
                                    opacity: 1,
                                    transform: "translateY(0)"
                                }
                            ],
                            {
                                duration: 350,
                                easing: "ease-out"
                            }
                        );

                    }

                }

            });

        });

    });

    /* =================================
       コピーライトの自動更新
       ================================= */

    if (year) {

        year.textContent = new Date().getFullYear();

    }

    console.log("LUMIÈRE SALON - Website initialized.");

});
