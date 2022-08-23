const cart = () => {return JSON.parse(localStorage.getItem("cartFerAmy"))}
const cartDOM = document.getElementById("cart-content");
function viewCart(){
    let nodo = '<h3 class="text-center">Tu pedido</h3>'
    cart.forEach(prod => {
        
    });
}
