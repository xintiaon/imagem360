// A URL que montei usando seu Project ID
const SUPABASE_URL = 'https://dmhybwlwpmxkenbtznpb.supabase.co';

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtaHlid2x3cG14a2VuYnR6bnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc2NDY3MDgsImV4cCI6MjA5MzIyMjcwOH0.x_MtAzcDs3aDE3hRrpvHmO8iA7E8g7uaYVp8peZXCTY

const SUPABASE_KEY = 'COLE_SUA_CHAVE_AQUI'; 

const viewer = pannellum.viewer('visualizador', {
    "type": "equirectangular",
    "panorama": "", 
    "autoLoad": true
});

document.getElementById('escolher-foto').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Mostra a foto no site na mesma hora
    const reader = new FileReader();
    reader.onload = (e) => viewer.setPanorama(e.target.result);
    reader.readAsDataURL(file);

    // 2. Envia para o seu "depósito" no Supabase
    const fileName = `${Date.now()}-${file.name}`;
    
    const formData = new FormData();
    formData.append('cacheControl', '3600');
    formData.append('', file);

    const response = await fetch(`${SUPABASE_URL}/storage/v1/object/fotos360/${fileName}`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'apikey': SUPABASE_KEY
        },
        body: formData
    });

    if (response.ok) {
        // Gera o link para você realizar o "Compartilhar" do seu esboço
        const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/fotos360/${fileName}`;
        alert("Sucesso! Foto salva. Copie este link para compartilhar: " + publicUrl);
        console.log("Link gerado:", publicUrl);
    } else {
        alert("Erro ao salvar. Verifique se criou o bucket 'fotos360' como público no Supabase.");
    }
});
