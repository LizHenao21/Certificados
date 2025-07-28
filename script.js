document.getElementById("formulario").addEventListener("submit", async function(e) {
    e.preventDefault();
    const documento = document.getElementById("documento").value.trim();
    const resultadoDiv = document.getElementById("resultado");
    
    // Resetear mensajes
    resultadoDiv.textContent = "";
    resultadoDiv.className = "";

    // Validación
    if(!documento || !/^\d+$/.test(documento)) {
        showError("❌ Ingrese un número de documento válido (solo números)");
        return;
    }

    // Prueba ambas rutas (mayúsculas/minúsculas)
    const rutas = [
        `Certificados/${documento}.pdf`,  // Primero mayúscula
        `certificados/${documento}.pdf`    // Luego minúscula
    ];

    for(const ruta of rutas) {
        try {
            const response = await fetch(ruta);
            if(response.ok) {
                // Forzar descarga
                const link = document.createElement('a');
                link.href = ruta;
                link.download = `certificado_${documento}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                resultadoDiv.textContent = "✅ Descargando certificado...";
                resultadoDiv.style.color = "green";
                return;
            }
        } catch(error) {
            console.error(`Error con ruta ${ruta}:`, error);
        }
    }
    
    showError("⚠️ Certificado no encontrado. Verifique el número");
});

function showError(mensaje) {
    const div = document.getElementById("resultado");
    div.textContent = mensaje;
    div.style.color = "red";
}
