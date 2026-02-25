document.addEventListener("DOMContentLoaded", () => {
  const bundlePopup = document?.querySelector("[data-bundle-popup]");
  const popupContainer = bundlePopup?.querySelector(".container__");
  const closeBtn = bundlePopup?.querySelector("[data-bundle-popup-close]");
  const bundleProductCards = document?.querySelectorAll("[data-budle-product-card]");
  const bundleCtaButton = bundlePopup?.querySelector("[data-cta-bundle-btn]");

  const placeholderButtons = document?.querySelectorAll("[data-placeholder-button]");
  const redoButtons = document?.querySelectorAll(".product-form__redo");

  let activeSlot = null;
  let selectedProduct = null;

 
  function openPopup(slot) {
    activeSlot = slot;
    bundlePopup.classList.add("is-visible");
    document.body.classList.add("bundle_pop_active");
  }


  placeholderButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openPopup(btn.closest(".product-form__pick-image"));
    });
  });

  redoButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      openPopup(btn.closest(".product-form__pick-image"));
    });
  });


  function closePopup() {
    bundlePopup.classList.remove("is-visible");
    document.body.classList.remove("bundle_pop_active");
    bundleProductCards.forEach(c => c.classList.remove("active"));
    bundleCtaButton.classList.add("is-disabled");
    selectedProduct = null;
  }

  closeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    closePopup();
  });

  document.addEventListener("click", (e) => {
    if (!popupContainer.contains(e.target)) {
      closePopup();
    }
  });


  bundleProductCards.forEach((card) => {
    card.addEventListener("click", () => {

      bundleProductCards.forEach(c => c.classList.remove("active"));
      card.classList.add("active");

      selectedProduct = {
        id: card.dataset.id,
        title: card.dataset.title,
        image: card.dataset.productImage
      };

      bundleCtaButton.classList.remove("is-disabled");
    });
  });

  const addToCartBtn = document.querySelector("[data-bundle-cta-btn]");
  const bundleSlots = document.querySelectorAll(".product-form__pick-image"); 
  const bundleWrapper = document.querySelector(".custom__bundle__wrap__");

  function validateCustomBundle() {
      const allSelected = [...bundleSlots].every(slot =>
        slot.dataset.selectedProductId
      );
      console.log("Hello", allSelected)
      if (allSelected) {
        addToCartBtn.classList.remove("disabled");
      } else {
        addToCartBtn.classList.add("disabled");
    }   
  }
  
  bundleCtaButton?.addEventListener("click", () => {
    if (!selectedProduct || !activeSlot) return;

    const imageContainer = activeSlot.querySelector("[data-image-container]");
    const textContainer = activeSlot.querySelector(".placeholder__text__");
    const placeholderBtn = activeSlot.querySelector("[data-placeholder-button]");
    const redoBtn = activeSlot.querySelector(".product-form__redo");

    imageContainer.classList.add("active");
    imageContainer.innerHTML = `
      <img src="${selectedProduct.image}" alt="${selectedProduct.title}" />
    `;


    textContainer.textContent = selectedProduct.title;


    activeSlot.dataset.selectedProductId = selectedProduct.id;

    placeholderBtn.classList.add("is-hidden");
    redoBtn.classList.remove("is-hidden");
    validateCustomBundle() 
    closePopup();
  });
  

  addToCartBtn?.addEventListener("click", async () => {
    if (addToCartBtn.classList.contains("disabled")) return;

    const mainVariantId = bundleWrapper.dataset.mainVariantId;

    const items = [
      {
        id: mainVariantId,
        quantity: 1
      },
      ...[...bundleSlots].map(slot => ({
        id: slot.dataset.selectedProductId,
        quantity: 1
      }))
    ];
    console.log(items);
    const drawer = document.querySelector("mc-drawer");
    try {
      const response = await fetch("/cart/add.js", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });

      const data = await response.json();
      drawer.fetchSection();
      console.log("Cart response:", data);

      openCartDrawer();
      // document.addEventListener("mc-drawer")?.renderElement(data);
      // cartDrawer.renderContents(data);

    } catch (error) {
      console.error("Bundle add failed", error);
    }
  });
});