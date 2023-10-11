//----------------------- Producto -------------------------------

class Producto {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    mostrar(indice) {
        console.log(`${indice}) ${this.nombre} tiene un precio de $${this.precio} y hay ${this.stock} unidades`)

    }
}
//--------------------------------------------------------------
const verCarrito = () => {
    const VaciarCarrito = document.getElementsByClassName('swal2-cancel');
    const PagarCarrito = document.getElementsByClassName('swal2-confirm');
    let detalle = "<ul>";
    let total = 0;
    for(let i = 0; i < localStorage.length; i++){
        let key = localStorage.key(i);
        let producto =  JSON.parse(localStorage.getItem(key));
        total += parseInt(producto.precio)*parseInt(producto.cantidad);
        detalle = detalle +`<li> ${key} $: ${producto.precio} - ${producto.cantidad} unidades </li>`;
      }
    detalle += "</ul>";
    Swal.fire({
        title: '<strong>Detalle de compra:</strong>',
        icon: 'info',
        html:
        detalle + "\n Total = "+ total,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText:
            '<i class="fa fa-thumbs-up"></i> Pagar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText:
            '<i class="fa fa-thumbs-down"></i> Eliminar carrito',
        cancelButtonAriaLabel: 'Thumbs down'
    })
    VaciarCarrito[0].addEventListener('click', vaciarCarrito);
    PagarCarrito[0].addEventListener('click', (e) => {
        window.open('https://www.mercadopago.com.ar/developers/es','popUpWindow','height=500,width=400,left=100,top=100,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no, status=yes');
    });

}

//------------------------------------------------------------
const vaciarCarrito = () => {
    window.localStorage.clear();
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Carrito vaciado!',
        showConfirmButton: false,
        timer: 1500
      });
}

//--------------------------------------------------------------
const body = document.getElementById("body")
const titulo = document.createElement("h1")
titulo.textContent = "Bienvenido a Pocima De Luna"

const botonCarrito = document.querySelector('#verCarrito')
botonCarrito.addEventListener('click',verCarrito)
// lo armo con json.stringify(productos)

let productosAlaventa = []
const obtenerProductos = async () => {
    const respuesta = await fetch('https://raw.githubusercontent.com/PolaccoPablo/archivos/main/productos.json',{
        method: "GET",
        headers: {
        }})
    const data = await respuesta.json()
    productosAlaventa = data.productosAlaventa

}
const cargarProductos = async () => {
    await obtenerProductos(); // Esperar a que se obtengan los productos
    console.log(productosAlaventa);

    // Resto del código que depende de los productos
    const subtitulo = document.createElement("h3");
    subtitulo.textContent = "Los productos disponibles son:";
    body.appendChild(titulo);
    body.appendChild(subtitulo);

    let articulos = document.getElementById("container");
    articulos.innerHTML = "";

    productosAlaventa.forEach((p) => {
        const card = document.createElement("div");
        card.innerHTML = `<div class="card">
                            <h5 class="card-title">${p.nombre} </h5>
                            <p class="card-text">Precio: $ ${p.precio}</p>
                            <p class="card-stock">Stock: ${p.stock} </p>
                            <button class="btnProd" value=${p.nombre}> Agregar al carrito </button>
                        </div>`;
        articulos.append(card);
    });

    body.appendChild(articulos);



    let botones = document.querySelectorAll(".btnProd");

    for (var i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", agregarACarrito);
    }
};
let carrito = [];

cargarProductos()
//------------------------------------------------------------------------------------
function agregarACarrito(e) {
    let boton = e.target
    let card = boton.parentNode

    for (let i = 0; productosAlaventa.length; i++) {
        //buscar el producto en el listado..
        if (productosAlaventa[i].nombre == boton.value) {
            let cantidad = 1;
            // corroboro si el producto ya estaba en el carrito 
            let producto = JSON.parse(localStorage.getItem(boton.value));
            console.log(producto)
            if (producto != null) {
                cantidad = producto.cantidad + 1;
            }
            //actualizo el stock
            if (productosAlaventa[i].stock - 1 > (-1)) {
                console.log(productosAlaventa[i].stock - 1)
                productosAlaventa[i].stock = productosAlaventa[i].stock - 1
                //lo reflejo en el html
                let p = card.querySelector(".card-stock")
                p.textContent = "stock: " + (productosAlaventa[i].stock)


                localStorage.setItem(productosAlaventa[i].nombre, JSON.stringify({ "precio": productosAlaventa[i].precio, "cantidad": cantidad }))
            }
            else {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: "No hay suficiente stock para agregar al carrito",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            break;
        }
    }
}

