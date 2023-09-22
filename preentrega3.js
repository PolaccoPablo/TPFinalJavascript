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






// mando a json Productos y lo armo con una img
// lo armo con json.stringify(productos)
const productosAlaventa = [new Producto("Sahumerio", 1500, 20), new Producto("Vela", 2500, 5), new Producto("Perfume", 3500, 15)]



const subtitulo = document.createElement("h3")
subtitulo.textContent = "Los productos disponibles son:"

body.appendChild(titulo)
body.appendChild(subtitulo)

let articulos = document.getElementById("container");
articulos.innerHTML = "";

productosAlaventa.forEach( p => {
    const card = document.createElement("div")
    card.innerHTML = `<div class="card">
                            <h5 class="card-title">${p.nombre} "JAZMÍN"</h5>
                            <p class="card-text">Precio: $ ${p.precio}</p>
                            <button class="btnProd" value=${p.nombre}> Agregar al carrito </button>
                        </div>`
    articulos.append(card);
})
   
let carrito = {}

let botones = document.querySelectorAll(".btnProd")

for (var i = 0; i < botones.length; i++) {    
    botones[i].addEventListener('click', agregarACarrito);
}

function agregarACarrito(e){
    console.log(e.target.val)

}




 



    

