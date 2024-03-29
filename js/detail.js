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
let modalImage = document.getElementById('modal-imagen');



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
    let nodoImagesDesktop='';
    product.image.forEach((img, i) => {
        nodoImages += `<div class="swiper-slide">
                            <img src="${img}" id="selection-img${i}" alt="${product.name}">
                        </div>`;
        nodoImagesDesktop += `<div class="swiper-slide">
                                <img src="${img}" id="selection-img${i+product.image.length}" alt="${product.name}">
                            </div>`;
    });
    

    let nodoTalles = '';
    product.size.forEach(size => {
        nodoTalles += `${size} | `
    });

    detailHeader.innerHTML=`<h2>${product.name}</h2>
                            <h5>${product.category}</h5>`;

    modalImage.innerHTML = `<img src="${product.image[0]}" alt="imagenProducto">`

    detailImage.innerHTML=`<button type="button" data-bs-toggle="modal" data-bs-target="#modal-imagen-main">
                            <img id="image-main" src="${product.image[0]}" alt="imagenProducto"><button>
                            `;
    document.getElementById('container-image-main-desktop').innerHTML = `<button type="button" data-bs-toggle="modal" data-bs-target="#modal-imagen-main">
    <img id="image-main-desktop" src="${product.image[0]}" alt="imagenProducto"><button>`;
    document.getElementById('swiper-detail-desktop').innerHTML = nodoImagesDesktop;
    swiperDetailImages.innerHTML=`${nodoImages}`

    detailInfo.innerHTML=`
                            <div class="detail-info-price">
                                <h3>${priceConvertToArs(product.price)}</h3>
                            </div>
                            <div class="detail-info-price-curva">
                                <h4>Precio por curva ${priceConvertToArs(product.price * product.size.length)}<button type="button" class="" data-bs-toggle="modal" data-bs-target="#modal-curva"><i class="bi bi-question-circle"></i></button></h4>
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
// funcionalidad images
    for (let i = 0; i < product.image.length; i++) {
        document.getElementById(`selection-img${i}`).onclick = () => {
            document.getElementById(`selection-img${i}`).style.border = '4px solid #85586F';
            document.getElementById('image-main').src = `${product.image[i]}`;
            modalImage.innerHTML = `<img src="${product.image[i]}" alt="imagenProducto">`
            for (let j = 0; j < product.image.length; j++) {
                if(j!=i){
                    document.getElementById(`selection-img${j}`).style.border = 'none'
                }
            }
        }
    }
    // desktop
    for (let i = product.image.length; i < product.image.length * 2; i++) {
        document.getElementById(`selection-img${i}`).onclick = () => {
            document.getElementById(`selection-img${i}`).style.border = '4px solid #85586F';
            document.getElementById('image-main-desktop').src = `${product.image[i-product.image.length]}`;
            modalImage.innerHTML = `<img src="${product.image[i-product.image.length]}" alt="imagenProducto">`
            for (let j = product.image.length; j < product.image.length * 2; j++) {
                if(j!=i){
                    document.getElementById(`selection-img${j}`).style.border = 'none'
                }
            }
        }
    }
    

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
        // let colorSelected = document.getElementById("selectColor").value;
        
        // aca iria la validacion por color seleccionado
            document.getElementsByClassName('messageError')[0].style.display = 'none'
            let count = parseInt(document.getElementById("count").textContent);
            const isInCart = storage.find((p) => p.id == product.id);
            if (isInCart) {

                const newArray = storage.map((p) => {
                    
                    if (p.id == isInCart.id) {
                        return { ...p, quantity: p.quantity + count , color: p.color.concat(getColorsBought())}
                    }
                    else {
                        return p;
                    }
                })
                addCartStorage(newArray);
            } else {
                let productToSave = new Product(product.id, product.name, getColorsBought(), product.stock, product.price, product.category, product.size, product.material, product.image, count);
                storage.push(productToSave);
                addCartStorage(storage);
            }

            //agrega un producto por cada recarga de pagina
            document.getElementsByClassName("detail-info-comprado")[0].style.display = "block";
            document.getElementsByClassName("detail-info-comprar")[0].style.display = "none";
    }

}

function showTable(){
    let nodo='';
    let optionColors = ''
    product.color.forEach(color => {
        optionColors += `<option ${!color.stock && 'disabled'} value="${color.name}">${color.name}</option>`;
    });

    for (let i = 1; i <= count; i++) {
        let nodoAuxSize='';
        let nodoAuxSelect='';
        

        product.size.forEach(size => {
            nodoAuxSize += `<th>T${size}</th>`;
            nodoAuxSelect += `
            <td>
                <select name="c${i}t${size}" id="c${i}t${size}">
                    <option value="0" selected>Elegir</option>
                    ${optionColors}
                </select>
            </td>
            `
        });
        
        nodo += `
        <tr>
            <td colspan="4">
                <div class="modal-size-header">
                    <h6 class="text-center">Curva ${i}</h6>
                    <div>
                        <div class="modal-size-modes">
                            <span class="selectMode1" id="btnSelectCustom${i}">Por talle</span>
                            <span class="selectMode2" id="btnSelectAll${i}">Todos</span>
                        </div>
                        <input type="hidden" value="true" id="selectAll${i}">
                        <input type="hidden" value="false" id="selectCustom${i}">
                        <select class="selectNone" name="c${i}ta" id="c${i}ta">
                            <option value="Surtido" selected>Colores surtido</option>
                            ${optionColors}
                        </select>
                    </div>
                </div>
            </td>
        </tr>

        
        `
        
        nodo+= `<tr class="selectNone" id="trCurva${i}header">
                    ${nodoAuxSize}
                </tr>
                <tr class="selectNone" id="trCurva${i}select">
                    ${nodoAuxSelect}
                </tr>
                <tr><td colspan="5"><hr></td></tr>`;
    }
        
    table.innerHTML = nodo;

    for (let i = 1; i <= count; i++) {
        document.getElementById(`btnSelectAll${i}`).onclick=()=>{
            document.getElementById(`selectAll${i}`).value = true;
            document.getElementById(`selectCustom${i}`).value = false;

            document.getElementById(`trCurva${i}header`).style.display= `none`;
            document.getElementById(`trCurva${i}select`).style.display= `none`;
            document.getElementById(`c${i}ta`).style.display= `block`;
        }
        document.getElementById(`btnSelectCustom${i}`).onclick=()=>{
            document.getElementById(`selectCustom${i}`).value = true;
            document.getElementById(`selectAll${i}`).value = false;
            
            document.getElementById(`trCurva${i}header`).style.display= `table-row`;
            document.getElementById(`trCurva${i}select`).style.display= `table-row`;
            document.getElementById(`c${i}ta`).style.display= `none`;
        }
    }

}
function priceConvertToArs(value) {
    return value.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}

function getColorsBought(){
    let buyed=[];
    for (let i = 1; i <= count; i++) {
        let object={};
        // object.curva=count;
        object.select=[];
        object.selectAll=document.getElementById(`c${i}ta`).value;

        object.selectActived = JSON.parse(document.getElementById(`selectCustom${i}`).value);
        object.selectAllActived = JSON.parse(document.getElementById(`selectAll${i}`).value);

        product.size.forEach(s => {
            object.select.push({"size": s, "color": document.getElementById(`c${i}t${s}`).value});
        });
        console.log(object);
        buyed.push(object);
    }
    return buyed;
}

let btnAdd = document.getElementById("addCount");
let btnDiscount = document.getElementById("discountCount");