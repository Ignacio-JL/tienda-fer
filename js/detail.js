class Product {

    constructor(id, name, color, stock, price, category, size, material, image, quantity) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.stock = stock;
        this.price = price;
        this.category = category;
        this.size = size;
        this.material = material;
        this.image = image;
        this.quantity = quantity;
    }
}

let product = {};
let count = 1;
const cartStorage = localStorage.getItem("cartFerAmy");

function addCartStorage(array) {
    localStorage.setItem("cartFerAmy", JSON.stringify(array));
}

let detail = document.getElementById("detail");
let detailHeader = document.getElementsByClassName('detail-header')[0];
let detailImage = document.getElementsByClassName('detail-image')[0];
let swiperDetailImages = document.getElementById('swiper-detail');
let detailInfo  = document.getElementsByClassName('detail-info')[0];
let table = document.getElementById('table-size');



const setProduct = (array) => {
    let paramaterId = new URLSearchParams(window.location.search);
    product = array.find(p => p.id == paramaterId.get('id'))
}

const pShowDetail = new Promise((resolve) => {
    setTimeout(() => {
        resolve(showDetail());
    }, 500);
});

const pShowTable = new Promise((resolve) => {
    setTimeout(() => {
        resolve(showTable());
    }, 500);
});

fetch('/js/products.json')
    .then(response => response.json())
    .then(result => {
        setProduct(result)
    })
    .catch(error => console.log(error));

function showDetail() {

    let nodoImages = '';
    product.image.forEach((img, i) => {
        nodoImages += `<div class="swiper-slide">
                            <img src="${img}" id="selection-img${i}" alt="${product.name}">
                        </div>`;

    });

    let nodoTalles = ''
    for (let i = 1; i < product.size.length; i++) {
        nodoTalles += `${i} | `
    }
    nodoTalles += `${product.size.length}`

    let nodoColor = `<option value="0"selected>Seleccione un color</option>
                    <option value="Surtido">Surtido</option>`;
    product.color.forEach(c => {
        nodoColor += `<option value="${c}">${c}</option>`
    });
    nodoColor += `<option value="Personalizado">Lo aclaro con el vendedor</option>`

    detailHeader.innerHTML=`<h2>${product.name}</h2>
                            <h5>${product.category}</h5>`;

    detailImage.innerHTML=`<img id="image-main" src="${product.image[0]}" alt="blazer">`;

    swiperDetailImages.innerHTML=`${nodoImages}`

    detailInfo.innerHTML=`
                            <div class="detail-info-price">
                                <h3>${priceConvertToArs(product.price)}</h3>
                            </div>
                            <div class="detail-info-price-curva">
                                <h5>Precio por curva ${priceConvertToArs(product.price * product.size.length)}<button type="button" class="" data-bs-toggle="modal" data-bs-target="#modal-curva"><i class="bi bi-question-circle"></i></button></h5>
                            </div>
                            <div class="detail-info-talles">
                                <p>Talles: ${nodoTalles}</p>
                            </div>
                            <div class="detail-info-select">

                                <div class="text-center">
                                    <span>Curvas</span>
                                    <button id="discountCount">-</button>
                                    <span id="count">${count}</span>
                                    <button id="addCount">+</button>
                                </div>
                                <div class="detail-info-select-size">
                                    <button type="button" data-bs-toggle="modal" data-bs-target="#modal-talles">Seleccione colores<button>
                                    <p class="messageError"><i class="bi bi-exclamation-circle-fill"></i>Selecciona una opción</p>
                                </div>
                            </div>
                            <div class="detail-info-stock">
                                <p>Stock disponible</p>
                            </div>
                            <div class="detail-info-comprar">
                                <button id="buy">Comprar</button>
                            </div>
                            <div class="detail-info-comprado">
                                <a href="/pages/cart.html"><button>Terminar Compra</button></a>
                                <a href="/index.html"><button>Seguir viendo productos</button></a>
                            </div>
                            <div class="detail-info-icons">
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal-location"><i class="bi bi-geo-alt"></i></button>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal-send"><i class="bi bi-truck"></i></button>
                                <button type="button" data-bs-toggle="modal" data-bs-target="#modal-pay"><i class="bi bi-currency-dollar"></i></button>
                            </div>
                        `

    product.image.forEach((img, i) => {
        document.getElementById(`selection-img${i}`).onclick = () => {
            if (i == 0) {
                document.getElementById('selection-img0').style.border = '4px solid #85586F'
                document.getElementById('selection-img1').style.border = 'none'
                if (product.image.length == 3) {
                    document.getElementById('selection-img2').style.border = 'none'
                }
                document.getElementById('image-main').src = `${product.image[0]}`
            }
            if (i == 1) {
                document.getElementById('selection-img1').style.border = '4px solid #85586F'
                document.getElementById('selection-img0').style.border = 'none'
                if (product.image.length == 3) {
                    document.getElementById('selection-img2').style.border = 'none'
                }
                document.getElementById('image-main').src = `${product.image[1]}`
            }
            if (product.image.length == 3 && i == 2) {
                document.getElementById('selection-img2').style.border = '4px solid #85586F'
                document.getElementById('selection-img0').style.border = 'none'
                document.getElementById('selection-img1').style.border = 'none'
                document.getElementById('image-main').src = `${product.image[2]}`
            }
        };
    })

    

    document.getElementById("addCount").onclick = () => {
        count = count + 1
        document.getElementById("count").innerHTML = count;
        showTable()
    };

    document.getElementById("discountCount").onclick = () => {
        if (count > 1) {
            count = count - 1
            document.getElementById("count").innerHTML = count;
        }
        showTable()
    };

    document.getElementById("buy").onclick = () => {
        let storage = cartStorage ? JSON.parse(cartStorage) : [];
        let colorSelected = document.getElementById("selectColor").value;
        if (colorSelected != 0) {
            document.getElementsByClassName('messageError')[0].style.display = 'none'
            let count = parseInt(document.getElementById("count").textContent);
            const isInCart = storage.find((p) => p.id == product.id);
            if (isInCart) {

                const newArray = storage.map((p) => {
                    if (p.id == isInCart.id) {
                        return { ...p, quantity: p.quantity + count }
                    }
                    else {
                        return p;
                    }
                })
                addCartStorage(newArray);
            } else {
                let productToSave = new Product(product.id, product.name, colorSelected, product.stock, product.price, product.category, product.size, product.material, product.image, count);
                storage.push(productToSave);
                addCartStorage(storage);
            }

            //agrega un producto por cada recarga de pagina
            document.getElementsByClassName("detail-info-comprado")[0].style.display = "block";
            document.getElementsByClassName("detail-info-comprar")[0].style.display = "none";
        }
        else {
            document.getElementsByClassName('messageError')[0].style.display = 'block'
        }

    }

}

function showTable(){
    let nodo='';
    for (let i = 1; i <= count; i++) {
        nodo += `
        <tr>
            <td colspan="4">
                <div class="modal-size-header">
                    <h6 class="text-center">Curva ${i}</h6>
                    <div>
                        <span>Seleccionar todos</span>
                        <select name="c${i}ta" id="c${i}ta">
                            <option value="0" selected>Surtido</option>
                            <option value="Azul">Azul</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Negro">Negro</option>
                            <option value="Blanco">Blanco</option>
                        </select>
                    </div>
                </div>
            </td>
        </tr>

        <tr>
            <th>T1</th>
            <th>T2</th>
            <th>T3</th>
            <th>T4</th>
            <th>T5</th>
        </tr>
        <tr>
            <td>
                <select name="c${i}t1" id="c${i}t1">
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                </select>
            </td>
            <td>
                <select name="c${i}t2" id="c${i}t2">
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                </select>
            </td>
            <td>
                <select name="c${i}t3" id="c${i}t3">
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                </select>
            </td>
            <td>
                <select name="c${i}t4" id="c${i}t4">
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                </select>
            </td>
            <td>
                <select name="c${i}t5" id="c${i}t5">
                    <option value="Azul">Azul</option>
                    <option value="Rojo">Rojo</option>
                    <option value="Negro">Negro</option>
                    <option value="Blanco">Blanco</option>
                </select>
            </td>
        </tr>
        <tr><td colspan="5"><hr></td></tr>
        `
        
    }
    table.innerHTML = nodo;
}

function priceConvertToArs(value) {
    return value.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}

let btnAdd = document.getElementById("addCount");
let btnDiscount = document.getElementById("discountCount");