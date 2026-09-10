// Configuración inicial de las bodegas (puedes cambiar los nombres o cantidad)
const totalBodegas = 20; // 5 columnas x 4 filas = 20 bodegas
const estadosPermitidos = ['libre', 'ocupada', 'reservada'];

// Cargar estados guardados previamente en el navegador o iniciar por defecto
let bodegasData = JSON.parse(localStorage.getItem('jv_bodegas_estado')) || {};

const gridContainer = document.getElementById('gridBodegas');

function inicializarPlano() {
    gridContainer.innerHTML = '';

    for (let i = 1; i <= totalBodegas; i++) {
        const idBodega = `B-${100 + i}`; // Genera nombres como B-101, B-102...
        
        // Estado por defecto: libre
        if (!bodegasData[idBodega]) {
            bodegasData[idBodega] = 'libre';
        }

        const div = document.createElement('div');
        div.className = `bodega-item estado-${bodegasData[idBodega]}`;
        div.innerText = idBodega;
        
        // Evento al hacer clic: cambia de estado secuencialmente
        div.addEventListener('click', () => {
            let estadoActual = bodegasData[idBodega];
            let siguienteIndice = (estadosPermitidos.indexOf(estadoActual) + 1) % estadosPermitidos.length;
            
            bodegasData[idBodega] = estadosPermitidos[siguienteIndice];
            
            // Guardar en el almacenamiento local del navegador
            localStorage.setItem('jv_bodegas_estado', JSON.stringify(bodegasData));
            
            // Actualizar diseño visual
            actualizarVista();
        });

        gridContainer.appendChild(div);
    }
    actualizarContadores();
}

function actualizarVista() {
    const items = gridContainer.children;
    let index = 0;
    for (let idBodega in bodegasData) {
        if (items[index]) {
            items[index].className = `bodega-item estado-${bodegasData[idBodega]}`;
        }
        index++;
    }
    actualizarContadores();
}

function actualizarContadores() {
    let libres = 0, ocupadas = 0, reservadas = 0;

    for (let id in bodegasData) {
        if (bodegasData[id] === 'libre') libres++;
        if (bodegasData[id] === 'ocupada') ocupadas++;
        if (bodegasData[id] === 'reservada') reservadas++;
    }

    document.getElementById('countLibres').innerText = libres;
    document.getElementById('countOcupadas').innerText = ocupadas;
    document.getElementById('countReservadas').innerText = reservadas;
}

// Ejecutar al cargar
inicializarPlano();
