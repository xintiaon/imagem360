const SUPABASE_URL = 'https://dmhybwlwpmxkenbtznpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzI2MTIsImV4cCI6MjA2MTcwODYxMn0.InJlZlZii6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24i'; 

let linkPublico = "";

document.getElementById('escolher-foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        if (window.viewer) { window.viewer.destroy(); }
        window.viewer = pannellum.viewer('visualizador', {
            "type": "equirectangular",
            "panorama": event.target.result,
            "autoLoad": true
        });
        
        const nomeFinal = Date.now() + "-" + file.name.replace(/\s+/g, '_');
        
        fetch(`${SUPABASE_URL}/storage/v1/object/fotos360/${nomeFinal}`, {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + SUPABASE_KEY, 
                'apikey': SUPABASE_KEY
            },
            body: file
        }).then(res => {
            if (res.ok) {
                linkPublico = `${SUPABASE_URL}/storage/v1/object/public/fotos360/${nomeFinal}`;
                alert("✅ FINALMENTE! Foto salva. Link liberado.");
            } else {
                alert("❌ ERRO DE NOME: O bucket 'fotos360' não foi encontrado. Verifique o nome no Supabase.");
            }
        });
    };
    reader.readAsDataURL(file);
});

function compartilhar() {
    if (linkPublico) {
        navigator.clipboard.writeText(linkPublico);
        alert("🔗 Link copiado!");
    } else {
        alert("⚠️ Aguarde a foto subir.");
    }
}
