document.addEventListener("DOMContentLoaded", function () {

    console.log("CLOSET DIGITAL INICIADO");

    /* =========================
       ELEMENTOS
    ========================= */

    const photoInput = document.getElementById("photoInput");
    const userPhoto = document.getElementById("userPhoto");
    const clothingOverlay = document.getElementById("clothingOverlay");
    const photoStatus = document.getElementById("photoStatus");
    const viewerMessage = document.getElementById("viewerMessage");
    const selectedProduct = document.getElementById("selectedProduct");
    const buyButton = document.getElementById("buyButton");

    if (!photoInput) {
        console.error("ERRO: photoInput não encontrado");
        return;
    }

    if (!userPhoto) {
        console.error("ERRO: userPhoto não encontrado");
        return;
    }

    console.log("Elementos encontrados corretamente");


    /* =========================
       VARIÁVEIS DA ROUPA
    ========================= */

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
       FOTO
    ========================= */

    function carregarFoto() {

        console.log("================================");
        console.log("FOTO SELECIONADA");
        console.log("================================");

        const arquivo = photoInput.files[0];

        if (!arquivo) {
            console.log("Nenhum arquivo encontrado");
            return;
        }

        console.log("Nome:", arquivo.name);
        console.log("Tipo:", arquivo.type);
        console.log("Tamanho:", arquivo.size);


        /* Atualiza a interface imediatamente */

        if (photoStatus) {
            photoStatus.textContent = "CARREGANDO FOTO...";
        }


        /* Verifica se é imagem */

        if (!arquivo.type || !arquivo.type.startsWith("image/")) {

            console.error("Arquivo não é uma imagem");

            if (photoStatus) {
                photoStatus.textContent = "Formato de foto não suportado";
            }

            alert(
                "Escolha uma foto JPG, PNG ou WEBP."
            );

            return;
        }


        /* Cria URL temporária */

        const url = URL.createObjectURL(arquivo);

        console.log("URL criada:", url);


        /* Limpa eventos anteriores */

        userPhoto.onload = null;
        userPhoto.onerror = null;


        /* Quando a imagem carregar */

        userPhoto.onload = function () {

            console.log("================================");
            console.log("FOTO CARREGOU COM SUCESSO!");
            console.log(
                "Dimensões:",
                userPhoto.naturalWidth,
                "x",
                userPhoto.naturalHeight
            );
            console.log("================================");


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


            URL.revokeObjectURL(url);
        };


        /* Erro */

        userPhoto.onerror = function () {

            console.error(
                "ERRO: navegador não conseguiu abrir a imagem"
            );

            if (photoStatus) {
                photoStatus.textContent =
                    "ERRO AO CARREGAR FOTO";
            }

            alert(
                "Não consegui abrir essa foto.\n\n" +
                "Tente uma foto JPG ou PNG."
            );

            URL.revokeObjectURL(url);
        };


        /* Mostra a imagem */

        userPhoto.src = url;

        console.log("SRC DA FOTO DEFINIDO");
    }


    /* =========================
       EVENTOS DO INPUT
    ========================= */

    photoInput.addEventListener(
        "change",
        carregarFoto
    );

    photoInput.addEventListener(
        "input",
        carregarFoto
    );


    /* =========================
       GARANTE QUE O INPUT
       POSSA SER USADO NOVAMENTE
    ========================= */

    const uploadArea =
        document.getElementById("uploadArea");

    if (uploadArea) {

        uploadArea.addEventListener(
            "click",
            function () {

                console.log(
                    "Botão ESCOLHER FOTO clicado"
                );

                /*
                Limpa o valor anterior.
                Isso permite escolher a mesma
                foto novamente no iPhone.
                */

                photoInput.value = "";
            }
        );
    }


    /* =========================
       ESCOLHER ROUPA
    ========================= */

    window.selecionarRoupa = function (
        caminho,
        nome
    ) {

        if (
            !userPhoto.src ||
            userPhoto.style.display !== "block"
        ) {

            alert(
                "Primeiro escolha uma foto sua."
            );

            const closet =
                document.getElementById("closet");

            if (closet) {
                closet.scrollIntoView({
                    behavior: "smooth"
                });
            }

            return;
        }


        roupaAtual = nome;

        escala = 1;
        rotacao = 0;
        posicaoX = 0;
        posicaoY = 0;


        clothingOverlay.onload = function () {

            console.log(
                "Roupa carregada:",
                nome
            );

            clothingOverlay.style.display =
                "block";

            atualizarRoupa();
        };


        clothingOverlay.onerror = function () {

            console.error(
                "Erro ao carregar roupa:",
                caminho
            );

            alert(
                "Não consegui carregar esta peça."
            );
        };


        clothingOverlay.src = caminho;

        if (selectedProduct) {
            selectedProduct.textContent = nome;
        }

        if (buyButton) {
            buyButton.disabled = false;
        }
    };


    /* =========================
       ATUALIZAR ROUPA
    ========================= */

    function atualizarRoupa() {

        const tamanho =
            300 * escala;

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
       AUMENTAR
    ========================= */

    window.aumentarRoupa = function () {

        if (!roupaAtual) return;

        escala += 0.1;

        if (escala > 2) {
            escala = 2;
        }

        atualizarRoupa();
    };


    /* =========================
       DIMINUIR
    ========================= */

    window.diminuirRoupa = function () {

        if (!roupaAtual) return;

        escala -= 0.1;

        if (escala < 0.4) {
            escala = 0.4;
        }

        atualizarRoupa();
    };


    /* =========================
       GIRAR
    ========================= */

    window.girarRoupa = function () {

        if (!roupaAtual) return;

        rotacao += 15;

        atualizarRoupa();
    };


    /* =========================
       RESETAR
    ========================= */

    window.resetarRoupa = function () {

        if (!roupaAtual) return;

        escala = 1;
        rotacao = 0;
        posicaoX = 0;
        posicaoY = 0;

        atualizarRoupa();
    };


    /* =========================
       ARRASTAR
    ========================= */

    clothingOverlay.addEventListener(
        "pointerdown",
        function (evento) {

            if (!roupaAtual) return;

            arrastando = true;

            inicioX = evento.clientX;
            inicioY = evento.clientY;

            inicioPosicaoX = posicaoX;
            inicioPosicaoY = posicaoY;

            clothingOverlay.setPointerCapture(
                evento.pointerId
            );

            clothingOverlay.style.cursor =
                "grabbing";
        }
    );


    clothingOverlay.addEventListener(
        "pointermove",
        function (evento) {

            if (!arrastando) return;

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

            if (
                clothingOverlay.hasPointerCapture(
                    evento.pointerId
                )
            ) {
                clothingOverlay.releasePointerCapture(
                    evento.pointerId
                );
            }

            clothingOverlay.style.cursor =
                "grab";
        }
    );


    clothingOverlay.addEventListener(
        "pointercancel",
        function () {

            arrastando = false;

            clothingOverlay.style.cursor =
                "grab";
        }
    );


    /* =========================
       IR PARA CLOSET
    ========================= */

    window.irParaCloset = function () {

        const closet =
            document.getElementById("closet");

        if (closet) {

            closet.scrollIntoView({
                behavior: "smooth"
            });
        }
    };


    /* =========================
       COMPRAR LOOK
    ========================= */

    window.comprarLook = function () {

        if (!roupaAtual) {

            alert(
                "Escolha uma peça primeiro."
            );

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


    console.log(
        "CLOSET DIGITAL — JavaScript carregado!"
    );

});
