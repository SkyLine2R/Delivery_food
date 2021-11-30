const Menu = () => {
  const cardsMenu = document.querySelector(".cards-menu");

  const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector(".restaurant-title");
    restaurantTitle.textContent = restaurant.name;
    const restaurantRating = document.querySelector(".rating");
    restaurantRating.textContent = restaurant.stars;
    const restaurantCategory = document.querySelector(".category");
    restaurantCategory.textContent = restaurant.kitchen;
    const restaurantPrice = document.querySelector(".price");
    restaurantPrice.textContent = "От " + restaurant.price + " ₽";
    console.log(restaurant);
  };

  const addToCart = (cartItem) => {
    const cartArray = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    if (cartArray.some((item) => item.id === cartItem.id)) {
      cartArray.map((item) => {
        if (item.id === cartItem.id) {
          item.count++;
        }
        return item;
      });
    } else {
      cartArray.push(cartItem);
    }
    localStorage.setItem("cart", JSON.stringify(cartArray));
  };

  const renderItems = (data) => {
    data.forEach((item) => {
      const { description, id, image, name, price } = item;
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
            <img src="${image}" alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name}</h3>
							</div>
							<div class="card-info">
								<div class="ingredients">
                ${description}
								</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
    `;
      card.querySelector(".button-card-text").addEventListener("click", () => {
        const cartItem = {
          name, //если название свойства полностью повторяет значение возможно такое сокращение вместо name: name. Для сокращения возможно даже отказаться от создания переменной и просто перечислить значения в скобках в строку
          price: price,
          id,
          count: 1,
        };

        addToCart(cartItem);
      });
      cardsMenu.append(card);
    });
  };
  if (localStorage.getItem("restaurant")) {
    const restaurant = JSON.parse(localStorage.getItem("restaurant"));
    changeTitle(restaurant);

    fetch(`./db/${restaurant.products}`)
      .then((Response) => Response.json())
      .then((data) => {
        renderItems(data);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    window.location.href = "/";
  }
};
Menu();
