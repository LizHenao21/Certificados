document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();
    const documento = document.getElementById("documento").value.trim();
    const resultadoDiv = document.getElementById("resultado");
    
    // Limpiar mensajes anteriores y resetear estilos
    resultadoDiv.textContent = "";
    resultadoDiv.style.color = "";
    resultadoDiv.className = "";
    
    // Validación básica del documento (solo números, sin espacios)
    if(!/^\d+$/.test(documento)) {
        resultadoDiv.textContent = "❌ Por favor ingrese solo números, sin espacios o caracteres especiales";
        resultadoDiv.style.color = "red";
        return;
    }
    
    // Ruta corregida (nota la C mayúscula en Certificados)
    const certificadoUrl = `Certificados/${documento}.pdf`;
    
    // Verificación mejorada con manejo de errores
    fetch(certificadoUrl)
        .then(response => {
            if(response.ok) {
                // Opción 1: Abrir en nueva pestaña
                window.open(certificadoUrl, "_blank");
                
                // Opción 2: Forzar descarga (descomentar si prefieres esto)
                /*
                const link = document.createElement('a');
                link.href = certificadoUrl;
                link.download = `certificado_${documento}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                */
                
                // Mensaje de éxito
                resultadoDiv.textContent = "✅ Certificado encontrado. Se está descargando...";
                resultadoDiv.style.color = "green";
            } else if(response.status === 404) {
                resultadoDiv.textContent = "⚠️ No se encontró certificado para este documento";
                resultadoDiv.style.color = "orange";
            } else {
                resultadoDiv.textContent = "❌ Error al buscar el certificado (Código: " + response.status + ")";
                resultadoDiv.style.color = "red";
            }
        })
        .catch(error => {
            resultadoDiv.textContent = "❌ Error de conexión. Intente nuevamente más tarde.";
            resultadoDiv.style.color = "red";
            console.error("Error en la petición:", error);
        });
});
