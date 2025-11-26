(function () {
  "use strict";

  const scrollSections = document.querySelectorAll(".scroll-section");
  const wrappers = [];
  const comparatorData = [];
  let rafId = null;

  scrollSections.forEach((section) => {
    const wrapper = section.querySelector(".comparator-wrapper");
    if (wrapper) wrappers.push({ section, wrapper });
    const comparator = section.querySelector(".comparator");
    const percentageEl = comparator?.querySelector(".comparison-percentage");
    if (comparator && percentageEl) comparatorData.push({ comparator, percentageEl });
  });

  function updateComparatorOffsets() {
    wrappers.forEach(({ section, wrapper }) => {
      const sectionTop = section.offsetTop;
      wrapper.style.setProperty("--comparator-offset", `${sectionTop}px`);
    });
  }

  function scheduleUpdate() {
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      updateComparatorOffsets();
      rafId = null;
    });
  }

  function updatePercentages() {
    comparatorData.forEach(({ comparator, percentageEl }) => {
      const scrollProgress = parseFloat(getComputedStyle(comparator).getPropertyValue("--scroll-progress")) || 0;
      const percentage = Math.round(scrollProgress);
      percentageEl.textContent = `${percentage.toString().padStart(2, "0")}%`;
    });

    requestAnimationFrame(updatePercentages);
  }

  window.addEventListener("load", () => {
    updateComparatorOffsets();
    updatePercentages();
  });

  window.addEventListener("resize", scheduleUpdate, { passive: true });
})();