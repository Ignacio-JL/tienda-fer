let products = [];
const categoryContent = document.getElementById("category-main");

const setProducts = (array) => {
    let paramaterCat = new URLSearchParams(window.location.search).get('category');
    products = array.filter( p => p.category == paramaterCat)
    console.log(paramaterCat);
}

const pShowProducts = new Promise((resolve) => {
    setTimeout(() => {
        resolve(showProducts());
    }, 500);
});

fetch('/js/products.json')
    .then(response => response.json())
    .then(result => {
        setProducts(result)
    })
    .catch(error => console.log(error));

function showProducts(){
    let nodo = ''
    products.forEach(prod => {
        nodo +=`<div class="category-content">
                    <div class="swiper-slide">
                        <div class="custom-card">
                            <img src="${prod.image[0]}" alt="blazer">
                            <h3>${prod.name}</h3>
                            <h5>${prod.category} - ${prod.material}</h5>
                            <p>$ ${prod.price}</p>
                            <a href="/pages/detail.html?id=${prod.id}">+ Info</a>
                        </div>
                    </div>
                </div>
                `
    });

    categoryContent.innerHTML = nodo
}

