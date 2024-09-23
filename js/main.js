import { fetchData } from "./api.js";

const renderProducts = (products) => {
  const cardsSection = document.querySelector(".cards-section");
  cardsSection.innerHTML = "";

  products.forEach((product) => {
    const productNode = product.node;
    const variant = productNode.variants.edges[0]?.node || {};
    const images = productNode.images.edges;
    const mainImage = images[0]?.node;
    const hoverImage = images[1]?.node;

    const cardHTML = `
        <div class="card">
          <img class="card-photo" src="${
            mainImage?.url || "./images/Product photo.png"
          }" alt="${mainImage?.altText || productNode.title}" />
          <h3 class="card-title">${productNode.title}</h3>
          <p class="card-description">${
            productNode.description || "No description available"
          }</p>
          <div class="price-wrapper">
            <span class="old-price">${
              variant.compareAtPrice ? variant.compareAtPrice.amount : ""
            }</span>
            <span class="new-price">${variant.price?.amount || ""}</span>
          </div>
        </div>
      `;

    cardsSection.insertAdjacentHTML("beforeend", cardHTML);

    const cardElement = cardsSection.lastElementChild;
    const imgElement = cardElement.querySelector(".card-photo");

    imgElement.addEventListener("mouseover", () => {
      imgElement.classList.add("fade-out");
      setTimeout(() => {
        imgElement.src = hoverImage?.url || imgElement.src;
        imgElement.classList.remove("fade-out");
      }, 300);
    });

    imgElement.addEventListener("mouseout", () => {
      imgElement.classList.add("fade-out");
      setTimeout(() => {
        imgElement.src = mainImage?.url || imgElement.src;
        imgElement.classList.remove("fade-out");
      }, 300);
    });
  });
};

fetchData()
  .then((data) => {
    const products = data.data.products.edges;
    renderProducts(products);
  })
  .catch((error) => {
    console.error("Error fetching products:", error);
  });


  const questionCards = document.querySelectorAll('.question-card');

  questionCards.forEach(card => {
      const button = card.querySelector('.icon-wrapper');
      const answer = card.querySelector('.answer');
      
      const iconPlus = `
          <svg class="icon-plus" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.66667 13H13M13 13H18.3333M13 13V18.3333M13 13V7.66667M13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      `;
      const iconMinus = `
          <svg class="icon-minus" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.66667 13H18.3333M13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1C19.6274 1 25 6.37258 25 13C25 19.6274 19.6274 25 13 25Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
      `;
  
   
      button.innerHTML = iconPlus;
  
      button.addEventListener('click', () => {
          if (button.innerHTML.includes('icon-plus')) {
              button.innerHTML = iconMinus;
              answer.classList.add('visible');
              card.classList.add('open');
          } else {
              button.innerHTML = iconPlus;
              answer.classList.remove('visible');
              card.classList.remove('open'); 
          }
      });
  });