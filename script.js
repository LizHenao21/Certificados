document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();
    const documento = document.getElementById("documento").value.trim();
    const certificadoUrl = `Certificados/${documento}.pdf`;
    const resultadoDiv = document.getElementById("resultado");
    
    // Verifica si el certificado existe
    fetch(certificadoUrl)
        .then(response => {
            if (response.ok) {
                window.open(certificadoUrl, "_blank"); // Abre el PDF en una nueva pestaña
                resultadoDiv.textContent = "";
            } else {
                resultadoDiv.textContent = "⚠️ No se encontró un certificado con ese documento.";
            }
        })
        .catch(error => {
            resultadoDiv.textContent = "❌ Error al buscar el certificado.";
        });
});
