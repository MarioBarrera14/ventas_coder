//DOM
const lista = document.getElementById("shop")
const prodAlistados = document.getElementById("prodAlistados")
const vaciarCarrito = document.getElementById("vaciarCarrito")
const precioTotal = document.getElementById("precioTotal")
const verTotal = document.getElementById("total")

// FUNCIONES
// Funcion que trae los productos de una API y los transforma en objetos para cargarlos y mostrarlos
const traerProd = async (id) => {
    const resp = await fetch('./prod.json')
    const data = await resp.json()
    const obj = data[id]
    cargarProducto(obj)
    mostrarProdLocalStorage()
}

const guardarLocalStorage = async (key, value) => {
    return localStorage.setItem(key, value)
}
// Muestra el producto agregado dentro del carrito de compras y muestra una notificación con toastify al agregarlo correctamente
const mostrarProdLocalStorage = () => {
    const listaProdLS = JSON.parse(localStorage.getItem("listaProd"))
    prodAlistados.textContent = ""

    for (const prod of listaProdLS) {

        let currentProd = document.createElement('p')
        currentProd.innerHTML = (`<p> ${prod.nombre} ----------------------- 💲${prod.precio}</p>`)
        prodAlistados.appendChild(currentProd)
    }
    Toastify({
        text: `Se agregó un producto al carrito.`,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, #4FC1FF, #1E1E82)",
        }
    }).showToast();
}
// Recibe un objeto Producto, agrega su precio al valor total, guarda el Producto en un array y en el localStorage.
const cargarProducto = async (obj) => {
    total += obj.precio
    guardarLocalStorage("total", total)

    productos.push(obj)
    guardarLocalStorage("listaProd", JSON.stringify(productos))
}

vaciarCarrito.onclick = function (e) {
    swal({
        title: "Estas seguro de vaciar el carrito?",
        icon: "warning",
        buttons: ["Cancelar", "Si, vacialo!"],
        dangerMode: true,
    })
        .then((value) => {
            if (value) {
                swal("El carrito se vació correctamente!", {
                    icon: "success",
                });
                prodAlistados.textContent = ""
                precioTotal.textContent = ""
                total = 0
                localStorage.clear()
                guardarLocalStorage("total", 0)
                productos.length = 0
            }
        });
}
// Función que muestra por sweetAlert el total de los productos agregados al carrito
verTotal.onclick = function (e) {
    e.preventDefault()
    swal({
        title: "El valor total de su compra es:",
        text: `$ ${localStorage.getItem("total")}`,
        buttons: {
            comprar: "Comprar",
            continuar: "Seguir comprando"
        }
    }).then((value) => {
        if (value == "comprar" && total != 0) {
            swal({
                icon: "success",
                title: "Gracias por su compra!",
                text: `El total de su compra es $ ${localStorage.getItem("total")}`
            })
        } else if (value == "comprar" && total == 0) {
            swal({
                icon: "error",
                title: "No hay productos en su carrito :("
            })
        }
    })
}



//Variables
let total = 0
guardarLocalStorage("total", 0)
const productos = []

//Programa

lista.addEventListener("click", agregar)
function agregar(e) {
    e.preventDefault()
    let opc = e.target.id
    switch (opc) {
        case "buy1":
            traerProd(0)
            break;
        case "buy2":
            traerProd(1)
            break;
        case "buy3":
            traerProd(2)
            break;
        case "buy4":
            traerProd(3)
            break;

    }

}