const SUPABASE_URL = 'https://dmhybwlwpmxkenbtznpb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxMzI2MTIsImV4cCI6MjA2MTcwODYxMn0.InJlZlZii6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24i'; 

let linkPublico = "";

document.getElementById('escolher-foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Mostra a foto na tela na hora
    const reader = new FileReader();
    reader.onload = function(event) {
        if (window.viewer) { window.viewer.destroy(); }
        window.viewer = pannellum.viewer('visualizador', {
            "type": "equirectangular",
            "panorama": event.target.result,
            "autoLoad": true
        });
        
        // 2. Envia para o Supabase sem burocracia
        const nomeFinal = Date.now() + "-" + file.name;
        fetch(`${SUPABASE_URL}/storage/v1/object/fotos360/${nomeFinal}`, {
            method: 'POST',
            headers: { 
                'Authorization': 'Bearer ' + SUPABASE_KEY, 
                'apikey': SUPABASE_KEY,
                'Content-Type': file.type 
            },
            body: file
        }).then(res => {
            if (res.ok) {
                linkPublico = `${SUPABASE_URL}/storage/v1/object/public/fotos360/${nomeFinal}`;
                alert("✅ AGORA FOI! Foto salva. Pode compartilhar à vontade.");
            } else {
                alert("❌ Erro: Verifique se o nome do Bucket no Supabase é exatamente 'fotos360'.");
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
        alert("⚠️ Aguarde a foto subir primeiro.");
    }
}

function baixarFoto() {
    alert("📲 No celular: Segure o dedo na imagem e escolha 'Fazer download'.");
}
