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
    if(products.length != 0){
        products.forEach(prod => {
            nodo +=`<div class="category-content">
                        
                            <div class="custom-card">
                                <img src="${prod.image[0]}" alt="blazer">
                                <h3>${prod.name}</h3>
                                <h5>${prod.category} - ${prod.material}</h5>
                                <p>$ ${prod.price}</p>
                                <a href="/pages/detail.html?id=${prod.id}">+ Info</a>
                            </div>
                        
                    </div>
                    `
        });
    }
    else{
        nodo = `<div class="categoryEmpty"><h4 class="text-center">En estos momentos no tenemos productos en esta categoria</h4>
                    <div>
                    <div class="text-center">
                    <div class="text-center"><i class="bi bi-emoji-frown"></i></div>
                        <h2 class="text-center">Pronto se renovara el stock</h2>
                        <a class="messageEmpty" href="/index.html">Volver a ver productos</a>
                    </div>
                </div></div>`
    }

    categoryContent.innerHTML = nodo
}

