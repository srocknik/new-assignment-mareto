//Calling Fetch method for getting data from the resource
async function fetchData() {
  try {
    const response = await fetch(
      "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

//Here we have created calculateDiscountPercentage function for calculate disscount percentage so we can use it in card.
function calculateDiscountPercentage(price, compareAtPrice) {
  const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discount);
}


//Here we have created function were we going to call the fetchData function so we can use that data for our card items.
async function selectCatagory(category) {
  const data = await fetchData();
  const productContainer = document.getElementById("productContainer");
  productContainer.innerHTML = "";
  const { categories } = data;

  //Here we are sorting the data based on the event trigger for women,kids, & mens.
  let modData = null;
  if (category === "Men") {
    modData = categories[0];
  } else if (category === "Women") {
    modData = categories[1];
  } else {
    modData = categories[2];
  }

  const { category_products } = modData;
  //Here we are going to use loop mecanism so we can display all the cards. 
  for (let product of category_products) {
    const card = document.createElement("div");
    card.classList.add("product-card");

    const image = document.createElement("img");
    image.src = product.image;
    image.classList.add("image");

    const title = document.createElement("h3");
    title.innerText = product.title;
    title.classList.add("title");

    const vendor = document.createElement("p");
    vendor.innerText = ` ${product.vendor}`;

    const price = document.createElement("p");
    price.innerText = `RS${product.price}`;
    price.classList.add("price");

    const compareAtPrice = document.createElement("p");
    compareAtPrice.innerText = `${product.compare_at_price}`;
    compareAtPrice.classList.add("compare");

    const discount = document.createElement("p");
    discount.innerText = `${calculateDiscountPercentage(
      product.price,
      product.compare_at_price
    )}% off`;
    discount.classList.add("discount");

    const addToCartBtn = document.createElement("button");
    addToCartBtn.innerText = "Add to Cart";
    addToCartBtn.classList.add("add-to-cart");

    card.appendChild(image);

    card.appendChild(title);
    card.appendChild(vendor);
    card.appendChild(price);
    card.appendChild(compareAtPrice);
    card.appendChild(discount);
    card.appendChild(addToCartBtn);

    productContainer.appendChild(card);
  }
}

// initial render
selectCatagory("Men");
