document.addEventListener('DOMContentLoaded', () => {
  const firstTitle = document.getElementById('title--1');
  const secondTitle = document.getElementById('title--2');
  const thirdTitle = document.getElementById('title--3');
  const firstCards = document.getElementById('product-card--1');
  const secondCards = document.getElementById('product-card--2');
  const thirdCards = document.getElementById('product-card--3');
  function deactivateAllTabs() {
    firstCards.style.display = "none";
    secondCards.style.display = "none";
    thirdCards.style.display = "none";
    firstTitle.classList.remove('activate');
    secondTitle.classList.remove('activate');
    thirdTitle.classList.remove('activate');
  }
  firstTitle.addEventListener('click', () => {
    deactivateAllTabs();
    firstCards.style.display = "grid";
    firstTitle.classList.add('activate');
  });
  secondTitle.addEventListener('click', () => {
    deactivateAllTabs();
    secondCards.style.display = "grid";
    secondTitle.classList.add('activate');
  });
  thirdTitle.addEventListener('click', () => {
    deactivateAllTabs();
    thirdCards.style.display = "grid";
    thirdTitle.classList.add('activate');
  });
  firstTitle.click();
});
