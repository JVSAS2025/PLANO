const bodegasConfig = [
    // Fila Superior (B-101 a B-105)
    { id: 'B-101', top: '10%', left: '5%', width: '12%', height: '12%' },
    { id: 'B-102', top: '12%', left: '23%', width: '13%', height: '17%' },
    { id: 'B-103', top: '12%', left: '37%', width: '22%', height: '17%' },
    { id: 'B-104', top: '12%', left: '60%', width: '21%', height: '17%' },
    { id: 'B-105', top: '12%', left: '82%', width: '14%', height: '17%' },

    // Segunda Fila (B-106 a B-110)
    { id: 'B-106', top: '33%', left: '5%', width: '17%', height: '17%' },
    { id: 'B-107', top: '33%', left: '23%', width: '13%', height: '17%' },
    { id: 'B-108', top: '33%', left: '37%', width: '22%', height: '17%' },
    { id: 'B-109', top: '33%', left: '60%', width: '21%', height: '17%' },
    { id: 'B-110', top: '33%', left: '82%', width: '14%', height: '17%' },

    // Tercera Fila (B-111 a B-115)
    { id: 'B-111', top: '59%', left: '5%', width: '17%', height: '17%' },
    { id: 'B-112', top: '59%', left: '23%', width: '13%', height: '17%' },
    { id: 'B-113', top: '59%', left: '37%', width: '22%', height: '17%' },
    { id: 'B-114', top: '59%', left: '60%', width: '21%', height: '17%' },
    { id: 'B-115', top: '59%', left: '82%', width: '14%', height: '17%' },

    // Fila Inferior (B-116 a B-120)
    { id: 'B-116', top: '79%', left: '5%', width: '17%', height: '17%' },
    { id: 'B-117', top: '79%', left: '23%', width: '13%', height: '17%' },
    { id: 'B-118', top: '79%', left: '37%', width: '22%', height: '17%' },
    { id: 'B-119', top: '79%', left: '60%', width: '21%', height: '17%' },
    { id: 'B-120', top: '79%', left: '82%', width: '14%', height: '17%' }
];

const estadosPermitidos = ['libre', 'ocupada', 'reservada'];
let bodegasData = JSON.parse(localStorage.getItem('jv_bodegas_estado')) || {};

const gridContainer = document.getElementById('gridBodegas');

function inicializarPlano() {
    gridContainer.innerHTML = '';

    bodegasConfig.forEach(b => {
        if (!bodegasData[b.id]) {
            bodegasData[b.id] = 'libre';
        }

        const div = document.createElement('div');
        div.className = `bodega-item estado-${bodegasData[b.id]}`;
        div.innerText = b.id;
        
        // Aplicar posiciones individuales basadas en porcentaje
        div.style.top = b.top;
        div.style.left = b.left;
        div.style.width = b.width;
        div.style.height = b.height;
        
        div.addEventListener('click', () => {
            let estadoActual = bodegasData[b.id];
            let siguienteIndice = (estadosPermitidos.indexOf(estadoActual) + 1) % estadosPermitidos.length;
            
            bodegasData[b.id] = estadosPermitidos[siguienteIndice];
            localStorage.setItem('jv_bodegas_estado', JSON.stringify(bodegasData));
            
            actualizarVista();
        });

        gridContainer.appendChild(div);
    });
    actualizarContadores();
}

function actualizarVista() {
    const items = gridContainer.children;
    bodegasConfig.forEach((b, index) => {
        if (items[index]) {
            items[index].className = `bodega-item estado-${bodegasData[b.id]}`;
        }
    });
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

inicializarPlano();
