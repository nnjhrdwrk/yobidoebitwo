$('.slider__item').slick({
	 dots: true,
	 arrows : false,
	 autoplay: true,
	 autoplaySpeed : 2000
});

let hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("is-active");
});


$(document).ready(function() {
	$('.hamburger').click(function(event) {
		$('.hamburger,.s-filter').toggleClass('active');				
	});
});



$(document).ready(function() {

	$('.image-popup-vertical-fit').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-img-mobile',
		image: {
			verticalFit: true
		}
		
	});

	$('.image-popup-fit-width').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		image: {
			verticalFit: false
		}
	});

	$('.image-popup-no-margins').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		closeBtnInside: false,
		fixedContentPos: true,
		mainClass: 'mfp-no-margins mfp-with-zoom', // class to remove default margin from left and right side
		image: {
			verticalFit: true
		},
		zoom: {
			enabled: true,
			duration: 300 // don't foget to change the duration also in CSS
		}
	});

});


$(document).ready(function (){
  $('a[href^="#"]').click(function() {
    var target = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(target).offset().top
    }, 100);
  });
});



$(document).ready(function(){
 
$(window).scroll(function(){
if ($(this).scrollTop() > 100) {
$('.scrollup').fadeIn();
} else {
$('.scrollup').fadeOut();
}
});
 
$('.scrollup').click(function(){
$("html, body").animate({ scrollTop: 0 }, 600);
return false;
});
 
});

const items = [
  {
    id: 1,
    name: 'Терияки лосось',
    price: 300,
    ingredients: 'рыба, помидор',
    weight: 1000,
		energy: 170,
		proteins: 100,
		fats: 323,
		carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
  {
    id: 2,
    name: 'Сасаки',
    price: 100,
    ingredients: 'краб, помидор',
    weight: 1200,
		energy: 170,
		proteins: 100,
		fats: 323,
		carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
  {
    id: 3,
    name: 'Ёбико',
    price: 600,
    ingredients: 'лосось, огурец',
    weight: 1400,
		energy: 170,
		proteins: 100,
		fats: 323,
		carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
  {
    id: 4,
    name: 'Хира Си',
    price: 700,
    ingredients: 'курица, авокадо',
    weight: 1600,
		energy: 170,
		proteins: 100,
		fats: 323,
		carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
  {
    id: 5,
    name: 'Куни Ли',
    price: 500,
    ingredients: 'рыба, овощи',
    weight: 700,
		energy: 170,
		proteins: 100,
		fats: 323,
		carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
   {
    id: 6,
    name: 'Терияки краб',
    price: 900,
    ingredients: 'рыба, помидор',
    weight: 1000,
    energy: 170,
    proteins: 100,
    fats: 323,
    carbohydrate: 121,
    img: 'img/philadelphia-teriyaki.JPG',
    imgFull: 'img/teriyakifull.JPG',
  },
];

const selectedItems = [];

const products = document.querySelector('#roli-i-sushi .s-product__inner');
const basketNum = document.querySelector('.basket-num');
const basketCost = document.querySelectorAll('.price-total');
const itemsCont = document.querySelector('.menu-basket-items');
const basketBtn = document.querySelector('.main__menu--button');
const basketCont = document.querySelector('.menu-basket-container');

basketBtn.addEventListener('click', () => basketCont.classList.toggle('is-hidden'));

function updateNumbs() {
  basketNum.innerHTML = selectedItems.length;
  const totalPrice = selectedItems.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
  basketCost.forEach((el) => (el.innerHTML = totalPrice + ' '));
}

function handleBasketDiff(el, item, diff) {
  item.amount += diff;
  const priceCont = el.closest('.input-num-product-price');
  const input = priceCont.querySelector('input');
  input.value = +input.value + diff;
  const price = priceCont.querySelector('.price-inner');
  price.innerHTML = item.amount * item.price + ' ';
  updateNumbs();
}

function handleAdd(e, id) {
  const el = selectedItems.find((el) => el.id === id);
  if (!el) return;
  handleBasketDiff(e.target, el, 1);
}

function handleRemove(id) {
  const i = selectedItems.findIndex((el) => el.id === id);
  if (i < 0) return;
  selectedItems.splice(i, 1);
  itemsCont.children[i].remove();
  updateNumbs();
  const btns = document.querySelectorAll(`[data-product-id='${id}']`);
  btns.forEach(el => el.innerText = 'Заказать');
}

function handleMinus(e, id) {
  const el = selectedItems.find((el) => el.id === id);
  if (!el) return;
  if (el.amount === 1) {
    handleRemove(id);
    return;
  }
  handleBasketDiff(e.target, el, -1);
}

function renderSelectedItems() {
  itemsCont.replaceChildren();
  selectedItems.forEach((el) => {
    const cont = document.createElement('div');
    cont.classList.add('menu-basket-item');
    const html = `
    <div class="menu-basket-item__row">
      <div class="title">${el.name}</div>
      <div class="delete">
        <img src="https://yobidoyobi.ru/images/delete.svg" alt="delete icon" />
      </div>
    </div>
    <div class="menu-basket-item__row--two">
      <div class="weignt">${el.weight} г.</div>
      <div class="input-num-product-price">
        <div class="input-num-container">
          <div class="quantity">
            <input type="number" min="1" max="9" step="1" value="1" readonly="" />
            <div class="quantity-nav">
              <div class="quantity-button quantity-up">+</div>
              <div class="quantity-button quantity-down">-</div>
            </div>
          </div>
        </div>
        <div class="product-price"><span class="price-inner">${
          el.price * el.amount
        } </span><span class="rub">₴</span></div>
      </div>
    </div>
    `;
    cont.innerHTML = html;
    itemsCont.appendChild(cont);
    cont.querySelector('.quantity-up').addEventListener('click', (e) => {
      handleAdd(e, el.id);
    });
    cont.querySelector('.quantity-down').addEventListener('click', (e) => {
      handleMinus(e, el.id);
    });
    cont.querySelector('.delete').addEventListener('click', (e) => {
      handleRemove(el.id);
    });
    cont.querySelector('input').value = el.amount;
  });
}

function addItem(id, name, price, weight) {
  const item = selectedItems.find((el) => el.id === id);
  if (item) {
    item.amount += 1;
  } else {
    selectedItems.push({ id, name, price, weight, amount: 1 });
  }
  updateNumbs();
  renderSelectedItems();
}

function renderProds(els) {
  els.forEach(({ id, name, price, weight, ingredients, energy, proteins, fats, carbohydrate, img, imgFull }) => {
    const node = document.createElement('div');
    node.classList.add('s-product__item');
    const html = `
      <div class="s-product__item__inner">
        <div class="s-product__item--top">
          <div class="s-product__item--strikers"></div>
          <div class="s-product__item--img popup-link">
            <a class="image-popup-vertical-fit" href=${imgFull} title="">
            <img src=${img} width="360" height="290">
            </a>
          </div>
        </div>
        <div class="s-product__item--bottom">
          <div class="s-product__bottom--top">
            <div class="s-product__item--title">${name}</div>
            <div class="s-product__item--info">i</div>
            <div class="s-product__item--info--cont">
              <div class="s-product__info__inner">
                <div class="s-product__info--title">Пищевая ценность на 100 г</div>
                <div class="s-product__info--content">
                  <div class="s-product__info-row">
                    <div class="s-product__info--name">Энерг. ценность</div>
                    <div class="s-product__info--text">${energy} калл</div>
                  </div>
                  <div class="s-product__info-row items-beetween">
                    <div class="s-product__info--name">Белки</div>
                    <div class="s-product__info--text">${proteins} г</div>
                  </div>
                  <div class="s-product__info-row items-beetween">
                    <div class="s-product__info--name">Жиры</div>
                    <div class="s-product__info--text">${fats} г</div>
                  </div>
                  <div class="s-product__info-row items-beetween">
                    <div class="s-product__info--name">Углеводы</div>
                    <div class="s-product__info--text">${carbohydrate} г</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="s-product__bottom--middle">
            <div class="s-product__bottom--description">
              <p>${ingredients}</p>
              <p></p>
              <p></p>
            </div>
          </div>

          <div class="s-product__bottom--inner">
            <div class="s-product__weight">
              130гр.
              <p>180</p>
            </div>
            <div class="s-product__price">
              <button class="btn--product" data-product-id=${id}>Заказать
                <span class="rub"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
    node.innerHTML = html;
    products.appendChild(node);
    const btn = node.querySelector('.btn--product');
    btn.addEventListener('click', () => {
      if (!selectedItems.some(el => el.id === id)) {
        const btns = document.querySelectorAll(`[data-product-id='${id}']`);
        btns.forEach(el => el.innerText = 'Еще');
      }
      addItem(id, name, price, weight);
    });
  });
}

renderProds(items);

updateNumbs();