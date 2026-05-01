<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>360 COMPLETO</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css"/>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <h1>360 COMPLETO</h1>
    <div class="controles">
        <input type="file" id="escolher-foto" accept="image/*">
        <div class="botoes">
            <button onclick="baixarFoto()">Download</button>
            <button onclick="compartilhar()">Compartilhar</button>
        </div>
    </div>
    <div id="visualizador"></div>
    <script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
    <script src="script.js"></script>
</body>
</html>
