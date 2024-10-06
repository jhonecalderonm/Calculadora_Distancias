// Función para mostrar la pestaña seleccionada
function showTab(tabName) {
    // Selecciona todos los elementos con la clase 'tab'
    const tabs = document.querySelectorAll('.tab');
    
    // Elimina la clase 'active' de todas las pestañas
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Añade la clase 'active' a la pestaña que se quiere mostrar
    document.getElementById(tabName).classList.add('active');

    // Limpia los resultados de distancia y raíces
    document.getElementById('distance-result').innerText = '';
    document.getElementById('roots-result').innerText = '';
}

// Función para añadir un valor al display de la calculadora
function appendToDisplay(value) {
    document.getElementById('calc-display').value += value;
}

// Función para limpiar el display de la calculadora
function clearDisplay() {
    document.getElementById('calc-display').value = '';
}

// Función para calcular el resultado de la expresión matemática
function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        // Evalúa la expresión y muestra el resultado
        display.value = eval(display.value);
    } catch (e) {
        // Si hay un error, muestra 'Error' en el display
        display.value = 'Error';
    }
}

// Función para calcular la distancia entre dos puntos
function calculateDistance() {
    // Obtiene las coordenadas x1, y1, x2, y2 y la unidad de medida
    const x1 = parseFloat(document.getElementById('x1').value);
    const y1 = parseFloat(document.getElementById('y1').value);
    const x2 = parseFloat(document.getElementById('x2').value);
    const y2 = parseFloat(document.getElementById('y2').value);
    const unit = document.getElementById('unit').value;

    // Calcula la distancia utilizando la fórmula de distancia entre dos puntos
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    // Muestra el resultado formateado en el elemento correspondiente
    document.getElementById('distance-result').innerText = `Distancia: ${distance.toFixed(2)} ${unit}`;
}

function calculateRoots() {
    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);
    const d = parseFloat(document.getElementById('d').value);
    const e = parseFloat(document.getElementById('e').value);
    const lowerLimit = parseFloat(document.getElementById('lower-limit').value);
    const upperLimit = parseFloat(document.getElementById('upper-limit').value);
    const tolerance = parseFloat(document.getElementById('tolerance').value);

    // Función del polinomio
    const polynomial = (x) => a * x**4 + b * x**3 + c * x**2 + d * x + e;

    let roots = [];
    
    // Método de bisección
    for (let i = lowerLimit; i < upperLimit; i += 0.1) {
        let a = i;
        let b = i + 0.1;
        
        if (polynomial(a) * polynomial(b) < 0) {
            let m;
            while (Math.abs(b - a) > tolerance) {
                m = (a + b) / 2;
                if (polynomial(m) === 0) {
                    roots.push(m);
                    break;
                } else if (polynomial(a) * polynomial(m) < 0) {
                    b = m;
                } else {
                    a = m;
                }
            }
            roots.push(m);
        }
    }

    document.getElementById('roots-result').innerText = `Raíces: ${roots}`;
}
