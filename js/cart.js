const getCart = () => {
    let cart = localStorage.getItem("cartFerAmy");
    let response = cart? JSON.parse(cart) : [];
    return response;
}
const setCart = (array) => {localStorage.setItem("cartFerAmy", JSON.stringify(array))}
const cartDOM = document.getElementById("cart-content");
const formDom = document.getElementById("formCart")
const getTotalPrice = () =>{
    let total = 0;
    getCart().forEach(p => {
        total += p.quantity * (p.size.length * p.price);
    });

    return total;
}

function deleteItem(id){
    const newArray = getCart().filter(p => p.id != id);
    setCart(newArray);
    viewCart();
}

function viewCart(){
    if(getCart().length == 0){
        cartDOM.innerHTML = messageCartEmpty;
        formDom.innerHTML ='';
    }
    else{
        let nodo = `<h3 class="text-center">Tu pedido</h3>
                    <div class="cart-content-table">
                        <div class="cart-content-title grid-row">
                            <div class="column"><h6>Curvas</h6></div>
                            <div class="column"><h6>Nombre</h6></div>
                            
                            <div class="column"><h6>Subtotal</h6></div>
                            <div class="column"><h6></h6></div>
                        </div>`
        getCart().forEach(prod => {
            nodo += `<div class="grid-row">
                        <div class="column product-row"><p>${prod.quantity}</p></div>
                        <div class="column product-row"><p>${prod.name}</p></div>
                        
                        <div class="column product-row"><p>${(prod.price * prod.size.length) * prod.quantity}</p></div>
                        <div class="column product-row"><button id="delete-${prod.id}"><i class="bi bi-trash-fill"></i></button></div>
                    </div>`
            
                
        });
        //close div cart-content-table
        nodo +=`</div>
                <div class="cart-content-footer">
                    <div class="optionCart">
                        <button id="clearCart">Vaciar carrito<i class="bi bi-trash-fill"></i></button>
                        <a href="/index.html">Volver a ver productos</a>
                    </div>
                    <div class="totalCart">
                        <h5>Total ${priceConvertToArs(getTotalPrice())}</h5>
                        ${getTotalPrice() < 18000 ? '<p class="messageError errorTotalPrice"><i class="bi bi-exclamation-circle-fill"></i>Compra minima $18.000</p>' 
                        :
                        ''}
                    </div>
                    </div>
                    `

        cartDOM.innerHTML = nodo;

        formDom.innerHTML = `  <h4 class="text-center">Completa tus datos</h4>
                                                        <div>
                                                            <input id="inputName" type="text" placeholder="Nombre y Apellido">
                                                            <p class="messageError"><i class="bi bi-exclamation-circle-fill"></i>Complete su nombre</p>
                                                        </div>
                                                        <div>
                                                            <select name="envio" id="selectEnvio">
                                                                <option value="0">Seleccione una opcion</option>
                                                                <option value="Local">Retira en local</option>
                                                                <option value="Envio">Envio</option>
                                                            </select>
                                                            <p class="messageError"><i class="bi bi-exclamation-circle-fill"></i>Selecciona una opción</p>
                                                        </div>
                                                        <div>
                                                            <button type="submit">Terminar mi pedido</button>
                                                        </div>`
    }
}


const messageCartEmpty =`<h3 class="text-center">No hay productos en tu carrito</h3>
                        <div>
                            <div class="text-center">
                            <div class="text-center"><i class="bi bi-emoji-frown"></i></div>
                            <a class="message" href="/index.html">Volver a ver productos</a>
                            </div>
                        </div>`


viewCart();




// function delete item
if(getCart().length !=0){
    getCart().forEach(prod => {
                document.getElementById(`delete-${prod.id}`).onclick = () => {
                    const newArray = getCart().filter(p => p.id != prod.id);
                    setCart(newArray);
                    viewCart();
                }
            });
    document.getElementById('clearCart').onclick=() =>{
        setCart([]);
        viewCart();
    }
}

/*

https://api.whatsapp.com/send?phone=+541170969187&text=
Hola+quiero+consultar+por+el+siguiente+pedido%3A%0A
-Blazer+5+curvas%2C+color+negro+y+azul.%0A%0A
-Pollera+3+curvas%2C+color+surtido.%0A%0AMi+nombre+es+Ana+Banana+y+mi+pedido+es+para+Envio

Salto linea %0A
Dos puntos(:) %3A
Coma (,) %2C
Espacio +
asterisco * %2A
barra / %2F
*/

// SendCart
formDom.onsubmit = (e) =>{
    e.preventDefault();
    const errorName = document.getElementsByClassName('messageError')[1];
    const errorSelect = document.getElementsByClassName('messageError')[2];
    const selectSend = document.getElementById('selectEnvio').value;
    const nameInput = document.getElementById('inputName').value;
    let nodeProd = '';

    if( selectSend !=0 && nameInput.trim().length > 0 && getTotalPrice() >= 18000){
        let name = getNameFormat(nameInput);
        getCart().forEach(prod => {
            let count = 1;
            nodeProd += `•${prod.name}+${prod.quantity}+curva%2Fs.%0A`;
            // cada obj seria una curva del producto
            prod.color.forEach( obj =>{
                if(obj.selectAllActived){
                    nodeProd+=`--Curva+${count}%3A+Color+${obj.selectAll}%0A`;
                }
                else if(obj.selectActived){
                    nodeProd+=`--Curva+${count}%3A%0A`
                    obj.select.forEach(element => {
                        nodeProd+=`-->T${element.size}%3A+${element.color == 0? 'Sin elegir': element.color }%0A`
                    });
                }
                count++;
            })
            nodeProd+='%0A'
            count = 1;
        });
        let redirectToWspp = `https://api.whatsapp.com/send?phone=+541170969187&text=`;
        let textWspp = `Hola+mi+nombre+es+${name}.%0AQuiero+consultar+por+el+siguiente+pedido%3A%0A%0A${nodeProd}Modo+de+compra%3A+${selectSend}.`
        window.open(`${redirectToWspp + textWspp}`, '_blank');
        setCart([]);
        window.location.href = "/index.html";
    }
    else{
        errorName.style.display=`${nameInput.trim().length == 0? 'block': 'none'}`
        errorSelect.style.display=`${selectSend == 0? 'block': 'none'}`
    }
}


function priceConvertToArs(value) {
    return value.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}

function getNameFormat(string){
    const search = (str) => str.indexOf(" ");
    while (search(string) != -1) {
        string = string.replace(' ', '+');
    }
    return string;
}