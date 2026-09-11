 function carregarFoto(input) {

    console.log("🔥 CARREGAR FOTO FOI CHAMADA");

    const arquivo = input.files && input.files[0];

    if (!arquivo) {
        console.log("Nenhum arquivo selecionado.");
        return;
    }

    console.log("Arquivo:", arquivo.name);
    console.log("Tipo:", arquivo.type);
    console.log("Tamanho:", arquivo.size);

    if (!arquivo.type.startsWith("image/")) {
        alert("Por favor, escolha uma foto JPG, PNG ou WEBP.");
        return;
    }

    const userPhoto = document.getElementById("userPhoto");
    const viewerMessage = document.getElementById("viewerMessage");
    const photoStatus = document.getElementById("photoStatus");

    if (!userPhoto) {
        console.error("ERRO: userPhoto não encontrado.");
        return;
    }

    console.log("Elemento da foto encontrado!");

    const leitor = new FileReader();

    leitor.onload = function(evento) {

        console.log("🔥 FILE READER CARREGOU A FOTO");

        userPhoto.onload = function() {

            console.log("🔥 FOTO APARECEU NO NAVEGADOR!");

            userPhoto.style.display = "block";
            userPhoto.style.visibility = "visible";
            userPhoto.style.opacity = "1";

            if (viewerMessage) {
                viewerMessage.style.display = "none";
            }

            if (photoStatus) {
                photoStatus.textContent =
                    "✓ FOTO CARREGADA COM SUCESSO";
            }
        };

        userPhoto.onerror = function() {

            console.error("❌ O navegador não conseguiu mostrar a imagem.");

            alert(
                "Não consegui abrir essa foto.\n\n" +
                "Escolha uma imagem JPG ou PNG."
            );
        };

        userPhoto.src = evento.target.result;
    };

    leitor.onerror = function() {
        console.error("❌ ERRO NO FILEREADER");
        alert("Não consegui ler essa foto.");
    };

    leitor.readAsDataURL(arquivo);
}
document.addEventListener("DOMContentLoaded", () => {

    const photoInput = document.getElementById("photoInput");
    const userPhoto = document.getElementById("userPhoto");
    const clothingOverlay = document.getElementById("clothingOverlay");
    const photoStatus = document.getElementById("photoStatus");
    const viewerMessage = document.getElementById("viewerMessage");
    const selectedProduct = document.getElementById("selectedProduct");
    const buyButton = document.getElementById("buyButton");

    let escala = 1;
    let rotacao = 0;
    let posicaoX = 0;
    let posicaoY = 0;

    let roupaAtual = null;

    let arrastando = false;
    let inicioX = 0;
    let inicioY = 0;
    let inicioPosicaoX = 0;
    let inicioPosicaoY = 0;


    /* =========================
       ESCOLHER ROUPA
    ========================= */

    window.selecionarRoupa = function (caminho, nome) {

        if (
            !userPhoto.src ||
            userPhoto.style.display !== "block"
        ) {

            alert("Primeiro escolha uma foto sua.");

            document
                .getElementById("closet")
                .scrollIntoView({
                    behavior: "smooth"
                });

            return;
        }

        roupaAtual = nome;

        escala = 1;
        rotacao = 0;
        posicaoX = 0;
        posicaoY = 0;

        clothingOverlay.onload = function () {

            console.log("Roupa carregada:", nome);

            clothingOverlay.style.display = "block";

            atualizarRoupa();
        };

        clothingOverlay.onerror = function () {

            alert(
                "Não consegui carregar esta peça.\n\n" +
                "Confira se a imagem está dentro da pasta assets."
            );
        };

        clothingOverlay.src = caminho;

        selectedProduct.textContent = nome;

        buyButton.disabled = false;
    };


    /* =========================
       ATUALIZAR ROUPA
    ========================= */

    function atualizarRoupa() {

        const tamanho = 300 * escala;

        clothingOverlay.style.width =
            tamanho + "px";

        clothingOverlay.style.left =
            `calc(50% + ${posicaoX}px)`;

        clothingOverlay.style.top =
            `calc(50% + ${posicaoY}px)`;

        clothingOverlay.style.transform =
            `translate(-50%, -50%) rotate(${rotacao}deg)`;
    }


    /* =========================
       AUMENTAR ROUPA
    ========================= */

    window.aumentarRoupa = function () {

        if (!roupaAtual) {
            return;
        }

        escala += 0.1;

        if (escala > 2) {
            escala = 2;
        }

        atualizarRoupa();
    };


    /* =========================
       DIMINUIR ROUPA
    ========================= */

    window.diminuirRoupa = function () {

        if (!roupaAtual) {
            return;
        }

        escala -= 0.1;

        if (escala < 0.4) {
            escala = 0.4;
        }

        atualizarRoupa();
    };


    /* =========================
       GIRAR ROUPA
    ========================= */

    window.girarRoupa = function () {

        if (!roupaAtual) {
            return;
        }

        rotacao += 15;

        atualizarRoupa();
    };


    /* =========================
       RESETAR ROUPA
    ========================= */

    window.resetarRoupa = function () {

        if (!roupaAtual) {
            return;
        }

        escala = 1;
        rotacao = 0;
        posicaoX = 0;
        posicaoY = 0;

        atualizarRoupa();
    };


    /* =========================
       ARRASTAR ROUPA
    ========================= */

    clothingOverlay.addEventListener(
        "pointerdown",
        function (evento) {

            if (!roupaAtual) {
                return;
            }

            arrastando = true;

            inicioX = evento.clientX;
            inicioY = evento.clientY;

            inicioPosicaoX = posicaoX;
            inicioPosicaoY = posicaoY;

            clothingOverlay.setPointerCapture(
                evento.pointerId
            );

            clothingOverlay.style.cursor = "grabbing";
        }
    );


    clothingOverlay.addEventListener(
        "pointermove",
        function (evento) {

            if (!arrastando) {
                return;
            }

            const movimentoX =
                evento.clientX - inicioX;

            const movimentoY =
                evento.clientY - inicioY;

            posicaoX =
                inicioPosicaoX + movimentoX;

            posicaoY =
                inicioPosicaoY + movimentoY;

            atualizarRoupa();
        }
    );


    clothingOverlay.addEventListener(
        "pointerup",
        function (evento) {

            arrastando = false;

            clothingOverlay.releasePointerCapture(
                evento.pointerId
            );

            clothingOverlay.style.cursor = "grab";
        }
    );


    clothingOverlay.addEventListener(
        "pointercancel",
        function () {

            arrastando = false;

            clothingOverlay.style.cursor = "grab";
        }
    );


    /* =========================
       IR PARA O CLOSET
    ========================= */

    window.irParaCloset = function () {

        document
            .getElementById("closet")
            .scrollIntoView({
                behavior: "smooth"
            });
    };


    /* =========================
       COMPRAR LOOK
    ========================= */

    window.comprarLook = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        alert(
            "Você escolheu: " +
            roupaAtual +
            "\n\n" +
            "Em breve vamos conectar este botão " +
            "ao sistema de pedidos da Atlética! 🚀"
        );
    };


    console.log("CLOSET DIGITAL — JavaScript carregado!");

});
