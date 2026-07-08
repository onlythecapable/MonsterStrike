document.addEventListener("DOMContentLoaded", () => {
    const sideToc = document.getElementById("side-toc");
    const toggle = document.getElementById("side-tab-toggle");
    const closeBtn = document.getElementById("side-close-btn"); // ★追加

    let isOpen = false;

    // 開くボタン（≡ 目次）
    toggle.addEventListener("click", () => {
        sideToc.style.left = "0px";
        isOpen = true;
    });

    // 閉じるボタン（✕ 閉じる）
    closeBtn.addEventListener("click", () => {
        sideToc.style.left = "-200px";
        isOpen = false;
    });
});