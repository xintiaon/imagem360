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
    const nomeArquivo = `${Date.now()}-${file.name}`;
    try {
        const response = await fetch(`${SUPABASE_URL}/storage/v1/object/fotos360/${nomeArquivo}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'apikey': SUPABASE_KEY,
                'Content-Type': file.type
            },
            body: file
        });

        if (response.ok) {
            linkPublico = `${SUPABASE_URL}/storage/v1/object/public/fotos360/${nomeArquivo}`;
            alert("✅ SUCESSO! A foto foi salva. Agora o botão COMPARTILHAR funciona!");
        } else {
            alert("❌ Erro de permissão: Tente mudar a expressão das suas Policies para 'true' no Supabase.");
        }
    } catch (err) {
        alert("❌ Erro de conexão com o servidor.");
    }
}

function compartilhar() {
    if (linkPublico) {
        navigator.clipboard.writeText(linkPublico).then(() => {
            alert("🔗 Link copiado com sucesso!");
        });
    } else {
        alert("⚠️ Aguarde o aviso de SUCESSO antes de compartilhar.");
    }
}

function baixarFoto() {
    alert("📲 No celular: Segure o dedo na imagem e escolha 'Fazer download'. No PC: Botão direito > Salvar imagem.");
}
