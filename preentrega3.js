//----------------------- Producto -------------------------------

class Producto {
    constructor(nombre, precio, stock){
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }

    mostrar(indice) {
        console.log(`${indice}) ${this.nombre} tiene un precio de $${this.precio} y hay ${this.stock} unidades`)

    }
}

//--------------------------------------------------------------
const body = document.getElementById("body")
// una forma de hacerlo
//body.innerHTML = "<h1> Bienvenido a Pocima De Luna</h1>"
//otra forma de hacerlo..
const titulo = document.createElement("h1")
titulo.textContent ="Bienvenido a Pocima De Luna"






// mando a json Productos 
// lo armo con json.stringify(productos)

//const productosAlaventa = //[new Producto("Sahumerio", 1500, 20), new Producto("Vela", 2500, 5), new Producto("Perfume", 3500, 15)]

let productosAlaventa =[]
const obtenerProductos = async () => {
    const respuesta = await fetch('productos.json')
        const data = await respuesta.json()
        console.log(data)
        productosAlaventa = data.productosAlaventa
    // await fetch ('productos.json')
    // .then( async (res) => await res.json() )
    // .then( async (data) => {
    //     var data = await data.productosAlaventa;
    //     return data    
    // })
    // .catch(error => console.error(error))
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
// cargarProductos();


// obtenerProductos()
// console.log(productosAlaventa)
// //localStorage.setItem("prouctosSeleccionados", productosJson)

// const subtitulo = document.createElement("h3")
// subtitulo.textContent = "Los productos disponibles son:"

// body.appendChild(titulo)
// body.appendChild(subtitulo)

// let articulos = document.getElementById("container");
// articulos.innerHTML = "";
// console.log(productosAlaventa)
// productosAlaventa.forEach( p => {
//     console.log (p)
//     const card = document.createElement("div")
//     card.innerHTML = `<div class="card">
//                             <h5 class="card-title">${p.nombre} </h5>
//                             <p class="card-text">Precio: $ ${p.precio}</p>
//                             <p class="card-stock">Stock: ${p.stock} </p>
//                             <button class="btnProd" value=${p.nombre}> Agregar al carrito </button>
//                         </div>`
//     articulos.append(card);
// })

// body.appendChild(articulos)

// let carrito = []

// let botones = document.querySelectorAll(".btnProd")


// for (var i = 0; i < botones.length; i++) {    
//     botones[i].addEventListener('click', agregarACarrito);
// }

function agregarACarrito(e){
    console.log("entro")
    let boton = e.target
    let card = boton.parentNode
    console.log(e.target)
    console.log(card)
    console.log(boton.value)
    

   
   let producto = productosAlaventa.find(p=> p.nombre == boton.value)
    console.log(producto)
   for (let i = 0; productosAlaventa.length; i++)
   {
        // buscar el producto en el listado..
        if (productosAlaventa[i].nombre == boton.value){
            //actualizo el stock
            console.log(productosAlaventa[i].stock - 1)
            productosAlaventa[i].stock = productosAlaventa[i].stock -1
            //lo reflejo en el html
            let p = card.querySelector(".card-stock")
            p.textContent = "stock: " + (productosAlaventa[i].stock)

            // agregarlo a carrito y de carrito al storage
            carrito.push({"producto":productosAlaventa[i].nombre, "precio": productosAlaventa[i].precio, "cantidad":1})
            // la cantidad la tengo que calcular
            localStorage.setItem("Carrito", JSON.stringify(carrito) )
            break;
        }    
   }
}




 



    

