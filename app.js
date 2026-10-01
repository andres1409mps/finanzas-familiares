// ==========================================
// ==========================================
// CONEXIÓN CON SUPABASE
// ==========================================

const supabaseClient = window.supabase.createClient(
    "https://ljucssrpxesawmktmzim.supabase.co",
    "sb_publishable_kn_0Cq6pvI6CnvkZ8U0dcw_v73AY03h"
);

// FINANZAS FAMILIARES
// Programación principal
// ==========================================


// ------------------------------------------
// ABRIR VENTANA DE REGISTRO
// ------------------------------------------
function abrirRegistro() {
    const ventana = document.getElementById("ventana-registro");

    ventana.style.display = "flex";

    document.getElementById("descripcion").value = "";
    document.getElementById("valor").value = "";
}


// ------------------------------------------
// CERRAR VENTANA DE REGISTRO
// ------------------------------------------

function cerrarRegistro() {
    const ventana = document.getElementById("ventana-registro");
    ventana.style.display = "none";
}
let totalIngresos = 0;
let totalGastos = 0;
// ==========================================
// RECUPERAR MOVIMIENTOS GUARDADOS
// ==========================================

function cargarMovimientosGuardados() {

    const movimientosGuardados =
        JSON.parse(localStorage.getItem("movimientos")) || [];

    const listaMovimientos =
        document.getElementById("lista-movimientos");

    const estadoVacio =
        document.getElementById("estado-vacio");

    const tarjetaSaldo =
        document.querySelector(".tarjeta.saldo h2");

    const tarjetaIngresos =
        document.querySelector(".tarjeta.ingresos h2");

    const tarjetaGastos =
        document.querySelector(".tarjeta.gastos h2");

    movimientosGuardados.forEach(function (movimiento) {

        const movimientoHTML =
            document.createElement("div");

        movimientoHTML.className = "movimiento";

        movimientoHTML.innerHTML = `
            <div>
                <strong>${movimiento.categoria}</strong>
                <p>${movimiento.descripcion} · ${movimiento.persona}</p>
            </div>

            <div>
                <strong>
                    ${movimiento.tipo.includes("Gasto") ? "-" : "+"}
                    $${Number(movimiento.valor).toLocaleString("es-CO")}
                </strong>
            </div>
        `;

        listaMovimientos.appendChild(movimientoHTML);

        const valorNumerico = Number(movimiento.valor);

        if (movimiento.tipo.includes("Gasto")) {
            totalGastos += valorNumerico;
        } else {
            totalIngresos += valorNumerico;
        }
    });

    const saldo = totalIngresos - totalGastos;

    tarjetaSaldo.textContent =
        "$" + saldo.toLocaleString("es-CO");

    tarjetaIngresos.textContent =
        "$" + totalIngresos.toLocaleString("es-CO");

    tarjetaGastos.textContent =
        "$" + totalGastos.toLocaleString("es-CO");

    if (movimientosGuardados.length > 0) {
        estadoVacio.style.display = "none";
    }
}
// ------------------------------------------
// SELECCIONES
// ------------------------------------------

document.addEventListener("DOMContentLoaded", function () {

    // ======================================
    // INGRESO / GASTO
    // ======================================

    const tipos = document.querySelectorAll(".opciones-tipo button");

    tipos.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Quitar selección de todos
            tipos.forEach(function (otroBoton) {
                otroBoton.classList.remove("tipo-activo");
            });

            // Seleccionar el que se pulsó
            boton.classList.add("tipo-activo");

        });

    });


    // ======================================
    // CATEGORÍAS
    // ======================================

const categorias = document.querySelectorAll(".categorias button");

    categorias.forEach(function (boton) {

        boton.addEventListener("click", function () {

            // Quitar selección de todas
            categorias.forEach(function (otraCategoria) {
                otraCategoria.style.backgroundColor = "";
                otraCategoria.style.borderColor = "";
                otraCategoria.style.boxShadow = "";
                otraCategoria.style.transform = "";
            });

            // Mantener seleccionada la categoría elegida
            boton.style.backgroundColor = "#e9def5";
            boton.style.borderColor = "#d3c0e5";
            boton.style.boxShadow = "0 5px 12px rgba(100, 130, 160, 0.12)";
            boton.style.transform = "translateY(-2px)";

        });

    });


    // ======================================
    // MARIO / PAOLA
    // ======================================

    const personas = document.querySelectorAll(".personas button");

    personas.forEach(function (boton) {

        boton.addEventListener("click", function () {

            personas.forEach(function (otraPersona) {
                otraPersona.classList.remove("persona-activa");
            });

            boton.classList.add("persona-activa");

        });

    });
   // RECUPERAR MOVIMIENTOS AL ABRIR LA PÁGINA
    cargarMovimientosGuardados();
});
// ==========================================
// BOTÓN GUARDAR MOVIMIENTO
// ==========================================

const botonGuardar = document.querySelector(".boton-guardar");


botonGuardar.addEventListener("click", function () {

    // Tipo: Ingreso o Gasto
    const tipoSeleccionado = document.querySelector(".opciones-tipo .tipo-activo");

    // Categoría seleccionada
    const categorias = document.querySelectorAll(".categorias button");
    let categoriaSeleccionada = null;

    categorias.forEach(function (categoria) {
        if (categoria.style.backgroundColor !== "") {
            categoriaSeleccionada = categoria;
        }
    });

    // Descripción
    const descripcion = document.getElementById("descripcion").value;

    // Valor
    const valor = document.getElementById("valor").value;

    // Persona
    const personaSeleccionada = document.querySelector(".personas .persona-activa");


 // ======================================
// CREAR EL MOVIMIENTO
// ======================================

const listaMovimientos = document.getElementById("lista-movimientos");

const movimiento = document.createElement("div");

movimiento.className = "movimiento";

movimiento.innerHTML = `
    <div>
        <strong>${categoriaSeleccionada.textContent.trim()}</strong>
        <p>${descripcion} · ${personaSeleccionada.textContent.trim()}</p>
    </div>

    <div>
        <strong>
            ${tipoSeleccionado.textContent.includes("Gasto") ? "-" : "+"}
            $${Number(valor).toLocaleString("es-CO")}
        </strong>
    </div>
`;


// ======================================
// MOSTRAR EL MOVIMIENTO
// ======================================



// ======================================
// ACTUALIZAR TOTALES
// ======================================

const valorNumerico = Number(valor);

if (tipoSeleccionado.textContent.includes("Gasto")) {
    totalGastos += valorNumerico;
} else {
    totalIngresos += valorNumerico;
}

const tarjetaSaldo = document.querySelector(".tarjeta.saldo h2");
const tarjetaIngresos = document.querySelector(".tarjeta.ingresos h2");
const tarjetaGastos = document.querySelector(".tarjeta.gastos h2");

const saldo = totalIngresos - totalGastos;

tarjetaSaldo.textContent = "$" + saldo.toLocaleString("es-CO");
tarjetaIngresos.textContent = "$" + totalIngresos.toLocaleString("es-CO");
tarjetaGastos.textContent = "$" + totalGastos.toLocaleString("es-CO");

listaMovimientos.appendChild(movimiento);

document.getElementById("estado-vacio").style.display = "none";


// ======================================
// CERRAR VENTANA
// ======================================
// GUARDAR MOVIMIENTO EN EL NAVEGADOR

const movimientosGuardados =
    JSON.parse(localStorage.getItem("movimientos")) || [];

movimientosGuardados.push({
    tipo: tipoSeleccionado.textContent.trim(),
    categoria: categoriaSeleccionada.textContent.trim(),
    descripcion: descripcion,
    valor: valor,
    persona: personaSeleccionada.textContent.trim()
});

localStorage.setItem(
    "movimientos",
    JSON.stringify(movimientosGuardados)
);
cerrarRegistro();

});
