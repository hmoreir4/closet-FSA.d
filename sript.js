/* =====================================
   CLOSET DIGITAL - ATLÉTICA FSA
===================================== */

document.addEventListener("DOMContentLoaded", function () {

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


    /* =====================================
       ESCOLHER FOTO
    ===================================== */

    if (photoInput) {

        photoInput.addEventListener("change", function (event) {

            const arquivo = event.target.files[0];

            if (!arquivo) {
                return;
            }

            if (!arquivo.type.startsWith("image/")) {

                alert("Por favor, escolha uma imagem.");

                return;
            }


            const url = URL.createObjectURL(arquivo);

            userPhoto.src = url;

            userPhoto.style.display = "block";

            if (viewerMessage) {
                viewerMessage.style.display = "none";
            }


            photoStatus.textContent =
                "Foto selecionada: " + arquivo.name;


            atualizarRoupa();

        });

    }


    /* =====================================
       ESCOLHER ROUPA
    ===================================== */

    window.selecionarRoupa = function (caminho, nome) {

        if (!userPhoto.src || userPhoto.style.display === "none") {

            alert("Primeiro escolha uma foto.");

            return;
        }


        roupaAtual = caminho;


        escala = 1;
        rotacao = 0;

        posicaoX = 0;
        posicaoY = 0;


        clothingOverlay.src = caminho;

        clothingOverlay.style.display = "block";


        selectedProduct.textContent = nome;


        buyButton.disabled = false;


        atualizarRoupa();

    };


    /* =====================================
       ATUALIZAR ROUPA
    ===================================== */

    function atualizarRoupa() {

        if (!clothingOverlay) {
            return;
        }

        const larguraBase = 300;

        const larguraFinal =
            larguraBase * escala;


        clothingOverlay.style.width =
            larguraFinal + "px";


        clothingOverlay.style.left =
            "calc(50% + " + posicaoX + "px)";


        clothingOverlay.style.top =
            "calc(50% + " + posicaoY + "px)";


        clothingOverlay.style.transform =
            "translate(-50%, -50%) rotate(" +
            rotacao +
            "deg)";
    }


    /* =====================================
       AUMENTAR
    ===================================== */

    window.aumentarRoupa = function () {

        if (!roupaAtual) {
            alert("Escolha uma peça primeiro.");
            return;
        }


        escala += 0.1;


        if (escala > 3) {
            escala = 3;
        }


        atualizarRoupa();
    };


    /* =====================================
       DIMINUIR
    ===================================== */

    window.diminuirRoupa = function () {

        if (!roupaAtual) {
            alert("Escolha uma peça primeiro.");
            return;
        }


        escala -= 0.1;


        if (escala < 0.3) {
            escala = 0.3;
        }


        atualizarRoupa();
    };


    /* =====================================
       GIRAR
    ===================================== */

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


    /* =====================================
       RESETAR
    ===================================== */

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


    /* =====================================
       ARRASTAR ROUPA
    ===================================== */

    if (clothingOverlay) {


        clothingOverlay.addEventListener(
            "pointerdown",
            function (event) {

                if (!roupaAtual) {
                    return;
                }


                arrastando = true;


                inicioX = event.clientX;
                inicioY = event.clientY;


                inicioPosicaoX = posicaoX;
                inicioPosicaoY = posicaoY;


                clothingOverlay.setPointerCapture(
                    event.pointerId
                );


                clothingOverlay.style.cursor =
                    "grabbing";


                event.preventDefault();

            }
        );


        clothingOverlay.addEventListener(
            "pointermove",
            function (event) {

                if (!arrastando) {
                    return;
                }


                const movimentoX =
                    event.clientX - inicioX;


                const movimentoY =
                    event.clientY - inicioY;


                posicaoX =
                    inicioPosicaoX + movimentoX;


                posicaoY =
                    inicioPosicaoY + movimentoY;


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

    }


    /* =====================================
       IR PARA CLOSET
    ===================================== */

    window.irParaCloset = function () {

        const closet =
            document.getElementById("closet");


        if (closet) {

            closet.scrollIntoView({
                behavior: "smooth"
            });

        }

    };


    /* =====================================
       COMPRAR LOOK
    ===================================== */

    window.comprarLook = function () {

        if (!roupaAtual) {

            alert("Escolha uma peça primeiro.");

            return;
        }


        const nome =
            selectedProduct.textContent;


        alert(
            "Você escolheu: " +
            nome +
            "\n\nA área de compra será conectada em breve."
        );

    };


    /* =====================================
       PROTEÇÃO CONTRA ARRASTAR IMAGENS
    ===================================== */

    if (clothingOverlay) {

        clothingOverlay.addEventListener(
            "dragstart",
            function (event) {

                event.preventDefault();

            }
        );

    }

});
