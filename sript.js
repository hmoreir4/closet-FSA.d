/* =====================================================
   CLOSET DIGITAL - ATLÉTICA FSA
===================================================== */


/* =====================================================
   ELEMENTOS
===================================================== */

const photoInput = document.getElementById("photoInput");
const uploadArea = document.getElementById("uploadArea");

const userPhoto = document.getElementById("userPhoto");
const clothingOverlay = document.getElementById("clothingOverlay");

const viewerMessage = document.getElementById("viewerMessage");

const photoStatus = document.getElementById("photoStatus");

const selectedClothing =
    document.getElementById("selectedClothing");


/* =====================================================
   VARIÁVEIS
===================================================== */

let escala = 1;

let rotacao = 0;

let posicaoX = 0;

let posicaoY = 0;

let roupaSelecionada = false;

let arrastando = false;

let inicioX = 0;

let inicioY = 0;


/* =====================================================
   BOTÃO / ÁREA DE FOTO
===================================================== */

if (photoInput) {

    photoInput.addEventListener(
        "change",
        function () {

            const arquivo = this.files[0];

            if (!arquivo) {
                return;
            }


            /* Verifica se é imagem */

            if (!arquivo.type.startsWith("image/")) {

                alert(
                    "Por favor, selecione uma imagem."
                );

                return;
            }


            /* Cria endereço temporário da imagem */

            const imagem =
                URL.createObjectURL(arquivo);


            /* Mostra foto */

            userPhoto.src = imagem;

            userPhoto.style.display = "block";


            /* Remove mensagem */

            if (viewerMessage) {

                viewerMessage.style.display =
                    "none";
            }


            /* Atualiza texto */

            if (photoStatus) {

                photoStatus.textContent =
                    "✓ Foto selecionada com sucesso!";
            }


            /* Reset da roupa */

            resetarRoupa();

        }
    );

}


/* =====================================================
   CLIQUE NA ÁREA DE UPLOAD
===================================================== */

if (uploadArea) {

    uploadArea.addEventListener(
        "click",
        function () {

            photoInput.click();

        }
    );

}


/* =====================================================
   SELECIONAR ROUPA
===================================================== */

function selecionarRoupa(
    caminho,
    nome
) {

    if (!userPhoto.src) {

        alert(
            "Primeiro escolha uma foto!"
        );

        return;
    }


    roupaSelecionada = true;


    /* Define imagem */

    clothingOverlay.src = caminho;


    clothingOverlay.onload =
        function () {

            clothingOverlay.style.display =
                "block";


            /* Valores iniciais */

            escala = 0.55;

            rotacao = 0;

            posicaoX = 0;

            posicaoY = -20;


            atualizarRoupa();

        };


    /* Atualiza nome */

    if (selectedClothing) {

        selectedClothing.textContent =
            "✓ " + nome;

    }

}


/* =====================================================
   ATUALIZAR ROUPA
===================================================== */

function atualizarRoupa() {

    if (!clothingOverlay) {
        return;
    }


    clothingOverlay.style.transform =
        `
        translate(
            calc(-50% + ${posicaoX}px),
            calc(-50% + ${posicaoY}px)
        )
        scale(${escala})
        rotate(${rotacao}deg)
        `;

}


/* =====================================================
   AUMENTAR
===================================================== */

function aumentarRoupa() {

    if (!roupaSelecionada) {

        alert(
            "Escolha uma roupa primeiro."
        );

        return;
    }


    escala += 0.1;

    if (escala > 2) {
        escala = 2;
    }


    atualizarRoupa();

}


/* =====================================================
   DIMINUIR
===================================================== */

function diminuirRoupa() {

    if (!roupaSelecionada) {

        alert(
            "Escolha uma roupa primeiro."
        );

        return;
    }


    escala -= 0.1;

    if (escala < 0.2) {
        escala = 0.2;
    }


    atualizarRoupa();

}


/* =====================================================
   GIRAR
===================================================== */

function girarRoupa() {

    if (!roupaSelecionada) {

        alert(
            "Escolha uma roupa primeiro."
        );

        return;
    }


    rotacao += 15;

    if (rotacao >= 360) {
        rotacao = 0;
    }


    atualizarRoupa();

}


/* =====================================================
   RESETAR
===================================================== */

function resetarRoupa() {

    escala = 0.55;

    rotacao = 0;

    posicaoX = 0;

    posicaoY = -20;


    if (clothingOverlay) {

        clothingOverlay.style.display =
            "none";

        clothingOverlay.src = "";

    }


    roupaSelecionada = false;


    if (selectedClothing) {

        selectedClothing.textContent =
            "Nenhuma peça selecionada";

    }

}


/* =====================================================
   ARRASTAR ROUPA
===================================================== */

if (clothingOverlay) {


    clothingOverlay.addEventListener(
        "pointerdown",
        function (event) {

            if (!roupaSelecionada) {
                return;
            }


            arrastando = true;


            inicioX =
                event.clientX - posicaoX;

            inicioY =
                event.clientY - posicaoY;


            clothingOverlay.setPointerCapture(
                event.pointerId
            );


            clothingOverlay.style.cursor =
                "grabbing";

        }
    );


    clothingOverlay.addEventListener(
        "pointermove",
        function (event) {

            if (!arrastando) {
                return;
            }


            posicaoX =
                event.clientX - inicioX;

            posicaoY =
                event.clientY - inicioY;


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

        }
    );

}


/* =====================================================
   IR PARA CLOSET
===================================================== */

function irParaCloset() {

    const closet =
        document.getElementById("closet");


    if (closet) {

        closet.scrollIntoView({
            behavior: "smooth"
        });

    }

}


/* =====================================================
   COMPRAR LOOK
===================================================== */

function comprarLook() {

    if (!userPhoto.src) {

        alert(
            "Primeiro escolha uma foto."
        );

        return;

    }


    if (!roupaSelecionada) {

        alert(
            "Primeiro escolha uma roupa."
        );

        return;

    }


    alert(
        "Look selecionado! 🚀\n\n" +
        "Aqui podemos colocar o link " +
        "do pedido/WhatsApp da Atlética."
    );

}
