let product = {};
let detail = document.getElementById("detail");
const setProduct = (array) => {
    let paramaterId = new URLSearchParams(window.location.search);
    product = array.find(p => p.id == paramaterId.get('id'))
}

const pShowDetail = new Promise((resolve) => {
    setTimeout(() => {
        resolve(showDetail());
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
        nodoImages += `<img id="selection-img${i}" src="${img}" alt="${product.name}">`;

    });

    let nodoTalles = ''
    for (let i = 1; i < product.size.length; i++) {
        nodoTalles += `${i} | `
    }
    nodoTalles += `${product.size.length}`

    let nodo = `
    <div class="detail-header">
        <h2>${product.name}</h2>
        <h5>${product.category}</h5>
    </div>
    <div class="detail-image"><img id="image-main" src="${product.image[0]}" alt="blazer"></div>
    <div class="detail-images">
        <div class="detail-images-container">
            ${nodoImages}
        </div>
    </div>
    <div class="detail-info">
        <div class="detail-info-price">
            <h3>${priceConvertToArs(product.price)}</h3>
        </div>
        <div class="detail-info-price-curva">
            <h5>Precio por curva ${priceConvertToArs(product.price * product.size.length)}<button type="button" class="" data-bs-toggle="modal" data-bs-target="#modal-curva"><i class="bi bi-question-circle"></i></button></h5>
        </div>
        <div class="detail-info-talles">
            <p>Talles: ${nodoTalles}</p>
        </div>
        <div class="detail-info-stock">
            <p>Stock disponible</p>
        </div>
        <div class="detail-info-comprar">
            <button>Comprar</button>
        </div>
        <div class="detail-info-icons">
            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-location"><i class="bi bi-geo-alt"></i></button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-send"><i class="bi bi-truck"></i></button>
            <button type="button" data-bs-toggle="modal" data-bs-target="#modal-pay"><i class="bi bi-currency-dollar"></i></button>
            
        </div>
    </div>
    `

    detail.innerHTML = nodo


    
    product.image.forEach((img,i)=>{
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

}

function priceConvertToArs(value) {
    return value.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}