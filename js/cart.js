const getCart = () => {return JSON.parse(localStorage.getItem("cartFerAmy"))}
const setCart = (array) => {localStorage.setItem("cartFerAmy", JSON.stringify(array))}
const cartDOM = document.getElementById("cart-content");
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
        document.getElementById('formCart').innerHTML ='';
    }
    else{
        let nodo = `<h3 class="text-center">Tu pedido</h3>
                    <div class="cart-content-table">
                        <div class="cart-content-title grid-row">
                            <div class="column"><h6>Curvas</h6></div>
                            <div class="column"><h6>Nombre</h6></div>
                            <div class="column"><h6>Color</h6></div>
                            <div class="column"><h6>Precio x Curva</h6></div>
                            <div class="column"><h6>Subtotal</h6></div>
                            <div class="column"><h6></h6></div>
                        </div>`
        getCart().forEach(prod => {
            nodo += `<div class="grid-row">
                        <div class="column product-row"><p>${prod.quantity}</p></div>
                        <div class="column product-row"><p>${prod.name}</p></div>
                        <div class="column product-row"><p>${prod.color}</p></div>
                        <div class="column product-row"><p>${prod.price * prod.size.length}</p></div>
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
                    <div class="totalCart"><h5>Total ${priceConvertToArs(getTotalPrice())}</h5></div>
                    </div>
                    `

        cartDOM.innerHTML = nodo;

        document.getElementById('formCart').innerHTML = `  <h4 class="text-center">Completa tus datos</h4>
                                                        <div>
                                                            <input type="text" placeholder="Nombre y Apellido">
                                                        </div>
                                                        <div>
                                                            <select name="envio" id="selectEnvio">
                                                                <option value="0">Seleccione una opcion</option>
                                                                <option value="local">Retira en local</option>
                                                                <option value="envio">Envio</option>
                                                            </select>
                                                        </div>
                                                        <div>
                                                            <a href="#"><button>Terminar mi pedido</button></a>
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
/*
Salto linea %0A
Dos puntos(:) %3A
Coma (,) %2C
Espacio +

https://api.whatsapp.com/send?phone=+541170969187&text=
Hola+quiero+consultar+por+el+siguiente+pedido%3A%0A
-Blazer+5+curvas%2C+color+negro+y+azul.%0A%0A
-Pollera+3+curvas%2C+color+surtido.%0A%0AMi+nombre+es+Ana+Banana+y+mi+pedido+es+para+Envio

*/

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

function priceConvertToArs(value) {
    return value.toLocaleString('es-ar', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    });
}
{/* <p><i class="bi bi-x-circle-fill"></i>Selecciona una opción</p> */}