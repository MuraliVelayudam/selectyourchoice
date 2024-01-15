const rootId = document.getElementById("root");

const loadingCircle = document.getElementById("loadingCircle");

const showProducts = async (category) => {
  try {
    showLoadingCircle();
    const data = await getallData();
    if (data) {
      createProducts(data.categories, category);
    }
  } catch (error) {
    console.error(error);
  } finally {
    hideLoadingCircle();
  }
};

function getallData() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
      );

      if (!response.ok) {
        throw new Error("Error in Fetching data . . .");
      }

      const data = await response.json();
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

function createProducts(products, selectedCategory) {
  const product = products.find((el) => el.category_name === selectedCategory);
  if (product) {
    displayCard(product);
  } else {
    rootId.innerHTML = "<p>No products available for this category.</p>";
  }
}

function displayCard(product) {
  const product_Details = product.category_products;
  const details = product_Details.map(
    (each, index) => `
    <div class="card">
    <span class="badge">${
      each.badge_text !== null ? each.badge_text : ""
    }</span>
    <button class="prev" onclick="updateImage(${index - 1})">
      <i class="fa-solid fa-chevron-left fa-fade fa-2xl"></i>
    </button>
    <img src=${each.image} alt="${each.title}" class="img1" id="img1"/>
    <img src=${each.second_image} alt="${
      each.title
    }" class="img2" id="img2" style="display: none"/>
    <button class="nxt" onclick="updateImage(${index + 1})">
      <i class="fa-solid fa-angle-right fa-fade fa-2xl"></i>
    </button>
    <div class="des">
      <span class="title">${
        each.title.length < 11
          ? each.title.substr(0, 11) + "..."
          : each.title.substr(0, 11) + "...."
      }</span>
      <span class="vendor">${each.vendor}</span>
    </div>
    <div class="price_Container">
      <p class="price">Rs ${each.price}</p>
      <p class="oldPrice">${each.compare_at_price}</p>
      <p class="off">${Math.round(
        ((each.compare_at_price - each.price) / each.compare_at_price) * 100
      )}% Off</p>
    </div>
    <button class="btn">Add to Cart</button>
  </div>
      `
  );
  rootId.innerHTML = details.join("");
}

// Function to toggle between first and second image
function updateImage(index) {
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  // Toggle display
  if (index % 2 === 0) {
    img1.style.display = "block";
    img2.style.display = "none";
  } else {
    img1.style.display = "none";
    img2.style.display = "block";
  }
}

function showLoadingCircle() {
  loadingCircle.style.display = "block";
}

function hideLoadingCircle() {
  loadingCircle.style.display = "none";
}

showProducts("Men");
