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
   ESCOLHER FOTO
========================= */

photoInput.addEventListener("change", function () {

    console.log("1 — CHANGE DISPAROU");

    const arquivo = this.files[0];

    if (!arquivo) {
        console.log("2 — Nenhum arquivo");
        return;
    }

    console.log("3 — Arquivo:", arquivo.name);
    console.log("4 — Tipo:", arquivo.type);
    console.log("5 — Tamanho:", arquivo.size);

    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha uma imagem JPG, PNG ou WEBP.");
        return;
    }

    const url = URL.createObjectURL(arquivo);

    console.log("6 — URL criada:", url);

    userPhoto.onload = function () {

        console.log("7 — IMAGEM CARREGOU!");
        console.log(
            "Dimensões:",
            userPhoto.naturalWidth,
            "x",
            userPhoto.naturalHeight
        );

        userPhoto.style.display = "block";
        viewerMessage.style.display = "none";

        photoStatus.textContent =
            "✓ FOTO CARREGADA COM SUCESSO";

        URL.revokeObjectURL(url);
    };

    userPhoto.onerror = function () {

        console.error("7 — ERRO AO DECODIFICAR A IMAGEM");

        alert(
            "O navegador não conseguiu abrir essa imagem.\n\n" +
            "Teste com uma foto JPG ou PNG."
        );

        URL.revokeObjectURL(url);
    };

    userPhoto.src = url;

    console.log("7 — src aplicado");
});

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
