// CONFIGURAÇÕES DO SEU SUPABASE
const SUPABASE_URL = 'https://dmhybwlwpmxkenbtznpb.supabase.co';

// >>> APAGUE O TEXTO ABAIXO E COLE SUA CHAVE ANON PUBLIC AQUI <<<
const SUPABASE_KEY = 'SUA_CHAVE_AQUI'; 

let viewer;
let linkPublico = "";

// Função para carregar e mostrar a foto
document.getElementById('escolher-foto').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        // Se já existir uma foto, remove para colocar a nova
        if (viewer) { viewer.destroy(); }

        // Cria o visualizador 360 com a foto escolhida
        viewer = pannellum.viewer('visualizador', {
            "type": "equirectangular",
            "panorama": event.target.result,
            "autoLoad": true
        });

        // Tenta enviar para o Supabase para o botão Compartilhar funcionar
        fazerUpload(file);
    };
    reader.readAsDataURL(file);
});

// Função que envia a foto para o seu depósito no Supabase
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
            console.log("Link gerado com sucesso:", linkPublico);
        }
    } catch (err) {
        console.error("Erro no upload:", err);
    }
}

// Botão Compartilhar
function compartilhar() {
    if (linkPublico) {
        navigator.clipboard.writeText(linkPublico);
        alert("Link copiado! Envie para seus amigos: " + linkPublico);
    } else {
        alert("Aguarde o upload da foto ou verifique se o bucket 'fotos360' é público.");
    }
}

// Botão Download
function baixarFoto() {
    alert("Para baixar, clique com o botão direito na imagem 360 e escolha 'Salvar imagem como'.");
}
