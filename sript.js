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


    /* =========================================
       FOTO
    ========================================= */

    photoInput.addEventListener("change", function () {

        const arquivo = this.files[0];

        if (!arquivo) {
            return;
        }

        if (!arquivo.type.startsWith("image/")) {
            alert("Escolha uma imagem válida.");
            return;
        }

        const leitor = new FileReader();

        leitor.onload = function (evento) {

            userPhoto.src = evento.target.result;

            userPhoto.onload = function () {

                userPhoto.style.display = "block";

                viewerMessage.style.display = "none";

                photoStatus.textContent =
                    "✓ FOTO CARREGADA COM SUCESSO";

            };

        };

        leitor.onerror = function () {

            alert("Não foi possível carregar essa foto.");

        };

        leitor.readAsDataURL(arquivo);

    });


    /* =========================================
       ESCOLHER ROUPA
    ========================================= */

    window.selecionarRoupa = function (caminho, nome) {

        if (!userPhoto.src || userPhoto.style.display !== "block") {

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

            clothingOverlay.style.display = "block";

            atualizarRoupa();

        };

        clothingOverlay.onerror = function () {

            alert(
                "Não consegui carregar esta peça. Confira o nome da imagem dentro da pasta assets."
            );

        };

        clothingOverlay.src = caminho;

        selectedProduct.textContent = nome;

        buyButton.disabled = false;

    };


    /* =========================================
       ATUALIZAR ROUPA
    ========================================= */

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


    /* =========================================
       AUMENTAR
    ========================================= */

    window.aumentarRoupa = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        escala += 0.1;

        if (escala > 2.5) {
            escala = 2.5;
        }

        atualizarRoupa();

    };


    /* =========================================
       DIMINUIR
    ========================================= */

    window.diminuirRoupa = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        escala -= 0.1;

        if (escala < 0.4) {
            escala = 0.4;
        }

        atualizarRoupa();

    };


    /* =========================================
       GIRAR
    ========================================= */

    window.girarRoupa = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        rotacao += 15;

        if (rotacao >= 360) {
            rotacao = 0;
        }

        atualizarRoupa();

    };


    /* =========================================
       RESET
    ========================================= */

    window.resetarRoupa = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        escala = 1;
        rotacao = 0;
        posicaoX = 0;
        posicaoY = 0;

        atualizarRoupa();

    };


    /* =========================================
       ARRASTAR ROUPA
    ========================================= */

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

            clothingOverlay.style.cursor =
                "grabbing";

            evento.preventDefault();

        }
    );


    clothingOverlay.addEventListener(
        "pointermove",
        function (evento) {

            if (!arrastando) {
                return;
            }

            posicaoX =
                inicioPosicaoX +
                (evento.clientX - inicioX);

            posicaoY =
                inicioPosicaoY +
                (evento.clientY - inicioY);

            atualizarRoupa();

        }
    );


    clothingOverlay.addEventListener(
        "pointerup",
        function () {

            arrastando = false;

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


    /* =========================================
       IR PARA CLOSET
    ========================================= */

    window.irParaCloset = function () {

        document
            .getElementById("closet")
            .scrollIntoView({
                behavior: "smooth"
            });

    };


    /* =========================================
       COMPRAR
    ========================================= */

    window.comprarLook = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }

        alert(
            "Você escolheu: " +
            roupaAtual +
            "\n\nEm breve vamos conectar este botão ao sistema de pedidos da Atlética! 🚀"
        );

    };

});
