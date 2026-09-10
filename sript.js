/* ==================================================
   CLOSET DIGITAL - ATLÉTICA FSA
   ================================================== */


/* ================= VARIÁVEIS ================= */

let escala = 1;
let rotacao = 0;

let posicaoX = 0;
let posicaoY = 0;

let roupaAtual = null;

let arrastando = false;

let inicioMouseX = 0;
let inicioMouseY = 0;

let inicioPosicaoX = 0;
let inicioPosicaoY = 0;


/* ================= ELEMENTOS ================= */

let photoInput;
let userPhoto;
let clothingOverlay;
let photoStatus;
let viewerMessage;
let selectedProduct;
let buyButton;


/* ================= INICIALIZAÇÃO ================= */

document.addEventListener("DOMContentLoaded", function () {

    photoInput = document.getElementById("photoInput");
    userPhoto = document.getElementById("userPhoto");
    clothingOverlay = document.getElementById("clothingOverlay");
    photoStatus = document.getElementById("photoStatus");
    viewerMessage = document.getElementById("viewerMessage");
    selectedProduct = document.getElementById("selectedProduct");
    buyButton = document.getElementById("buyButton");


    /* ================= UPLOAD DA FOTO ================= */

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

        viewerMessage.style.display = "none";


        photoStatus.textContent =
            "✓ Foto selecionada com sucesso";


        photoStatus.style.color = "#f5c928";


        /* Permite escolher outra roupa */
        document.querySelectorAll(".clothing-button")
            .forEach(function (button) {

                button.style.opacity = "1";

            });

    });


    /* ================= DRAG DA ROUPA ================= */

    clothingOverlay.addEventListener(
        "pointerdown",
        iniciarArraste
    );


    document.addEventListener(
        "pointermove",
        moverRoupa
    );


    document.addEventListener(
        "pointerup",
        terminarArraste
    );


    /* ================= EVITAR DRAG PADRÃO ================= */

    clothingOverlay.addEventListener(
        "dragstart",
        function (event) {
            event.preventDefault();
        }
    );

});


/* ==================================================
   ESCOLHER ROUPA
   ================================================== */

function selecionarRoupa(caminho, nome) {

    /* Se não tiver foto */
    if (!userPhoto || userPhoto.style.display !== "block") {

        alert(
            "Primeiro escolha uma foto sua para experimentar a peça."
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


    clothingOverlay.src = caminho;

    clothingOverlay.style.display = "block";


    selectedProduct.textContent = nome;

    buyButton.disabled = false;


    atualizarRoupa();


    /* Marca botão selecionado */

    document.querySelectorAll(".clothing-button")
        .forEach(function (button) {

            button.classList.remove("selected");

        });


    /* Pequeno feedback */

    console.log("Roupa selecionada:", nome);
}


/* ==================================================
   ATUALIZAR ROUPA
   ================================================== */

function atualizarRoupa() {

    if (!clothingOverlay) {
        return;
    }


    const larguraBase = 300;

    const novaLargura =
        larguraBase * escala;


    clothingOverlay.style.width =
        novaLargura + "px";


    clothingOverlay.style.left =
        `calc(50% + ${posicaoX}px)`;


    clothingOverlay.style.top =
        `calc(50% + ${posicaoY}px)`;


    clothingOverlay.style.transform =
        `translate(-50%, -50%) rotate(${rotacao}deg)`;
}


/* ==================================================
   AUMENTAR
   ================================================== */

function aumentarRoupa() {

    if (!roupaAtual) {

        alert(
            "Escolha uma peça primeiro."
        );

        return;
    }


    escala += 0.1;


    if (escala > 2.5) {
        escala = 2.5;
    }


    atualizarRoupa();
}


/* ==================================================
   DIMINUIR
   ================================================== */

function diminuirRoupa() {

    if (!roupaAtual) {

        alert(
            "Escolha uma peça primeiro."
        );

        return;
    }


    escala -= 0.1;


    if (escala < 0.4) {
        escala = 0.4;
    }


    atualizarRoupa();
}


/* ==================================================
   GIRAR
   ================================================== */

function girarRoupa() {

    if (!roupaAtual) {

        alert(
            "Escolha uma peça primeiro."
        );

        return;
    }


    rotacao += 15;


    if (rotacao >= 360) {
        rotacao = 0;
    }


    atualizarRoupa();
}


/* ==================================================
   RESETAR
   ================================================== */

function resetarRoupa() {

    if (!roupaAtual) {

        alert(
            "Escolha uma peça primeiro."
        );

        return;
    }


    escala = 1;

    rotacao = 0;

    posicaoX = 0;

    posicaoY = 0;


    atualizarRoupa();
}


/* ==================================================
   ARRASTAR - INÍCIO
   ================================================== */

function iniciarArraste(event) {

    if (!roupaAtual) {
        return;
    }


    arrastando = true;


    inicioMouseX = event.clientX;

    inicioMouseY = event.clientY;


    inicioPosicaoX = posicaoX;

    inicioPosicaoY = posicaoY;


    clothingOverlay.setPointerCapture(
        event.pointerId
    );


    clothingOverlay.style.cursor =
        "grabbing";


    event.preventDefault();
}


/* ==================================================
   ARRASTAR - MOVIMENTO
   ================================================== */

function moverRoupa(event) {

    if (!arrastando) {
        return;
    }


    const movimentoX =
        event.clientX - inicioMouseX;


    const movimentoY =
        event.clientY - inicioMouseY;


    posicaoX =
        inicioPosicaoX + movimentoX;


    posicaoY =
        inicioPosicaoY + movimentoY;


    atualizarRoupa();
}


/* ==================================================
   ARRASTAR - FINAL
   ================================================== */

function terminarArraste() {

    if (!arrastando) {
        return;
    }


    arrastando = false;


    clothingOverlay.style.cursor =
        "grab";
}


/* ==================================================
   IR PARA O CLOSET
   ================================================== */

function irParaCloset() {

    const closet =
        document.getElementById("closet");


    if (!closet) {
        return;
    }


    closet.scrollIntoView({
        behavior: "smooth"
    });
}


/* ==================================================
   COMPRAR LOOK
   ================================================== */

function comprarLook() {

    if (!roupaAtual) {

        alert(
            "Escolha uma peça primeiro."
        );

        return;
    }


    alert(
        "Você escolheu: " +
        roupaAtual +
        "\n\nEm breve vamos conectar esse botão ao pedido da Atlética! 🚀"
    );
}
