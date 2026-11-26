
/* ==============================
   CAFE NOIR - JavaScript
   ============================== */

document.addEventListener("DOMContentLoaded", () => {

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const nav = document.getElementById("nav");
    const backToTop = document.getElementById("backToTop");
    const year = document.getElementById("year");

    // スマホ用メニュー
    function closeMenu() {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "メニューを開く");
    }

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("active");

        menuToggle.classList.toggle("active", isOpen);

        menuToggle.setAttribute("aria-expanded", String(isOpen));

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "メニューを閉じる" : "メニューを開く"
        );

    });

    // リンク選択時にメニューを閉じる
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    // Escapeキーでメニューを閉じる
    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            nav.classList.contains("active")
        ) {
            closeMenu();
            menuToggle.focus();
        }
    });

    // メニューの外側をクリックした場合
    document.addEventListener("click", event => {
        if (!header.contains(event.target)) {
            closeMenu();
        }
    });

    // PC表示に切り替わった場合
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // スクロール時のヘッダー・ボタン制御
    function updateScroll() {

        const scrollY = window.scrollY;

        header.classList.toggle("scrolled", scrollY > 50);

        backToTop.classList.toggle("show", scrollY > 500);

    }

    window.addEventListener("scroll", updateScroll, {
        passive: true
    });

    updateScroll();

    // ページ上部に戻る
    backToTop.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches ? "instant" : "smooth"
        });

    });

    // スクロールアニメーション
    const revealElements = document.querySelectorAll(".reveal");

    if (
        "IntersectionObserver" in window &&
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
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

    // コピーライトの年号を自動更新
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    console.log("CAFE NOIR - Website initialized.");

});
