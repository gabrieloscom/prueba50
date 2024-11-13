
 

//const apiUrl = 'http://10.0.55.87:8084/api/sel_visita?id_visita=1&fechaDesde=%27Jan%2001,%202011%27&fechaHasta=%27Jan%2031,%202011%27'; // Reemplaza con la URL de tu API
//const apiUrl = 'http://10.0.55.87:8084/api/sel-visita?param1=${param1}&param2=${param2}'; // Reemplaza con la URL de tu API
//console.log(apiUrl);
//const response = await fetch(`http://localhost:3000/api/sel-sector?param1=${param1}&param2=${param2}`);
//const test = `http://localhost:3000/api/sel-sector?param1=${param1}&param2=${param2}&param3=${param3}`;   
//console.log(response);
// Función para obtener los datos de la API
async function fetchData() {
    try {
        const param1 = document.getElementById('param1').value;
        console.log(param1);
        const param2 = document.getElementById('param2').value;
        console.log(param2);
        const param3 = document.getElementById('param3').value;
        console.log(param3);
        //const apiUrl = 'http://10.0.55.87:8084/api/sel-visita?id_visita=${param1}&fechaDesde=${param2}&fechaHasta=${param2}'; // Reemplaza con la URL de tu API
        const test = `http://10.0.55.87:8084/api/sel_visita?id_visita=${param1}&fechaDesde=${param2}&fechaHasta=${param3}`;   

        console.log(test);
        const response = await fetch(test);
        const data = await response.json();
        renderTable(data);
    } catch (error) {
        console.error("Error al obtener datos de la API:", error);
    }
    
}


// Función para renderizar la tabla con los datos obtenidos
function renderTable(data) {
    // Obtener el elemento del encabezado y el cuerpo de la tabla
    const tableHeaders = document.getElementById('table-headers');
    const tableBody = document.getElementById('table-body');

    // Limpiar cualquier contenido previo
    tableHeaders.innerHTML = '';
    tableBody.innerHTML = '';

        // Si hay datos en la respuesta, asumimos que son objetos con claves y valores
        if (data.length > 0) {
            // Crear encabezados de la tabla
            const headers = Object.keys(data[0]);
    
            // Cambiar directamente los nombres de los encabezados
            const headerNames = {
                'Id_Afiliado': 'Num Alfiliado',
                'Apellido': 'Apellido',
                'nombres': 'Nombres',
                'FechaIngreso': 'Fecha de Ingreso'
                
            };
    
            // Crear los encabezados de la tabla basados en los nombres personalizados
            headers.forEach(header => {
                const th = document.createElement('th');
                th.textContent = headerNames[header] || header.charAt(0).toUpperCase() + header.slice(1); // Si no está en headerNames, usamos la clave original
                tableHeaders.appendChild(th);
            });
        // Llenar las filas de la tabla
        data.forEach(item => {
            const row = document.createElement('tr');
            headers.forEach(header => {
                const cell = document.createElement('td');
                cell.textContent = item[header];
                row.appendChild(cell);
            });
            tableBody.appendChild(row);
        });
    } else {
        // Mostrar mensaje si no hay datos
        const noDataRow = document.createElement('tr');
        const noDataCell = document.createElement('td');
        noDataCell.textContent = "No hay datos disponibles";
        noDataCell.colSpan = headers.length;
        noDataRow.appendChild(noDataCell);
        tableBody.appendChild(noDataRow);
    }
}

// Vincular el evento click del botón para ejecutar fetchData
document.getElementById('fetchButton').addEventListener('click', fetchData);
