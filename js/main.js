let listaProductos = [];

fetch("productos/productos.json")
  .then(respuesta => respuesta.json())
  .then(productos => {
    listaProductos = productos;
  });

function abrirCategoria(categoria) {
  document.getElementById("inicio").classList.add("oculto");
  document.getElementById("seccion-productos").classList.remove("oculto");

  document.getElementById("titulo-categoria").textContent = categoria;

  const productosFiltrados = listaProductos.filter(
    producto => producto.categoria === categoria
  );

  mostrarProductos(productosFiltrados);
}

function volverInicio() {
  document.getElementById("seccion-productos").classList.add("oculto");
  document.getElementById("inicio").classList.remove("oculto");
}

function mostrarProductos(productos) {
  const catalogo = document.getElementById("catalogo");
  catalogo.innerHTML = "";

  productos.forEach((producto, index) => {
    catalogo.innerHTML += `
      <div class="producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">

        <h3>${producto.nombre}</h3>

        <p class="marca">
          ${producto.marca || ""}
        </p>

        <p class="precio">
          S/ ${producto.precio}
        </p>

        <button class="btn-detalle" onclick="verDetalle(${listaProductos.indexOf(producto)})">
          Ver detalle
        </button>
      </div>
    `;
  });
}

function verDetalle(index) {
  const producto = listaProductos[index];

  document.getElementById("modal").style.display = "flex";
  document.getElementById("modal-img").src = producto.imagen;
  document.getElementById("modal-nombre").textContent = producto.nombre;
  document.getElementById("modal-precio").textContent = `PRECIO: S/ ${producto.precio}`;

  document.getElementById("modal-marca").textContent =
    producto.marca ? `MARCA: ${producto.marca}` : "";
}

function cerrarModal() {
  document.getElementById("modal").style.display = "none";
}

function cerrarModalFondo(event) {
  if (event.target.id === "modal") {
    cerrarModal();
  }
}

document.addEventListener("keydown", function(event) {
  if (event.key === "Escape") {
    cerrarModal();
  }
});