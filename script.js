const SUPABASE_URL = 'https://dmhybwlwpmxkenbtznpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzI2MTIsImV4cCI6MjA2MTcwODYxMn0.InJlZlZii6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24i'; 

let viewer;
let linkPublico = "";

document.getElementById('escolher-foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        if (viewer) { viewer.destroy(); }
        viewer = pannellum.viewer('visualizador', {
            "type": "equirectangular",
            "panorama": event.target.result,
            "autoLoad": true
        });
        fazerUpload(file);
    };
    reader.readAsDataURL(file);
});

async function fazerUpload(file) {
    const fileName = `${Date.now()}-${file.name}`;
    const formData = new FormData();
    formData.append('', file);

    try {
        const response = await fetch(`${SUPABASE_URL}/storage/v1/object/fotos360/${fileName}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY
            },
            body: formData
        });

        if (response.ok) {
            linkPublico = `${SUPABASE_URL}/storage/v1/object/public/fotos360/${fileName}`;
            console.log("Link gerado:", linkPublico);
        }
    } catch (err) {
        console.error("Erro no upload:", err);
    }
}

function compartilhar() {
    if (linkPublico) {
        navigator.clipboard.writeText(linkPublico);
        alert("Link copiado! Envie para seus amigos: " + linkPublico);
    } else {
        alert("Aguarde o upload ou verifique se o bucket 'fotos360' é público.");
    }
}

function baixarFoto() {
    alert("Clique com o botão direito na imagem 360 e escolha 'Salvar imagem como'.");
}
