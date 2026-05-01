let visualizador360;

// Quando você escolhe um arquivo...
document.getElementById('escolher-foto').addEventListener('change', function(evento) {
  const arquivo = evento.target.files[0];
  const urlDaFoto = URL.createObjectURL(arquivo);

  // Se já tiver uma foto, a gente limpa para colocar a nova
  if (visualizador360) visualizador360.destroy();

  // Cria a visualização 360
  visualizador360 = pannellum.viewer('visualizador', {
    "type": "equirectangular",
    "panorama": urlDaFoto,
    "autoLoad": true
  });
});

function baixarFoto() { alert("Funcionalidade de download em breve!"); }
function compartilhar() { alert("Funcionalidade de compartilhar em breve!"); }