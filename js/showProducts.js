let products = [];

const setProducts = (array) => {
    array.map((prod) => {
        products.push(prod)
    })
}

const pShowProducts = new Promise((resolve) => {
    setTimeout(() => {
        resolve(showCategorySwiper());
    }, 500);
});

fetch('/js/products.json')
    .then(response => response.json())
    .then(result => {
        setProducts(result)
    })
    .catch(error => console.log(error));

const swiperCampera = document.getElementById("swiperCampera")
const swiperPollera = document.getElementById("swiperPollera")
const swiperConjunto = document.getElementById("swiperConjunto")
const swiperRemera = document.getElementById("swiperRemera")


function showCategorySwiper() {
    swiperCampera.innerHTML = generateNodoCategory("Campera");
    swiperPollera.innerHTML = generateNodoCategory("Pollera");
    swiperConjunto.innerHTML = generateNodoCategory("Conjunto");
    swiperRemera.innerHTML = generateNodoCategory("Remera");
}

function generateNodoCategory(category){
    let arrayCategory = products.filter(p=> p.category == category)

    let nodo = '';
    arrayCategory.forEach(prod => {
        nodo += `<div class="swiper-slide">
                    <div class="custom-card mt-0">
                    <img src="${prod.image[0]}" alt="blazer">
                    <h3>${prod.name}</h3>
                    <h5>${prod.category} - ${prod.material}</h5>
                    <p>$ ${prod.price}</p>
                    <a href="#">+ Info</a>
                    </div>
                </div>`
    });

    return nodo;
}
