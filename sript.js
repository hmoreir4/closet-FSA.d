/* =========================================
   CLOSET DA ATLÉTICA FSA
========================================= */


/* =========================================
   ELEMENTOS
========================================= */

const photoInput =
    document.getElementById("photoInput");

const photoButton =
    document.getElementById("photoButton");

const photoStatus =
    document.getElementById("photoStatus");

const userPhoto =
    document.getElementById("userPhoto");

const emptyMessage =
    document.getElementById("emptyMessage");

const clothingLayer =
    document.getElementById("clothingLayer");

const clothingImage =
    document.getElementById("clothingImage");

const selectedClothing =
    document.getElementById("selectedClothing");

const resetClothing =
    document.getElementById("resetClothing");

const buyButton =
    document.getElementById("buyButton");



/* =========================================
   VARIÁVEIS
========================================= */

let currentX = 0;

let currentY = 0;

let currentScale = 1;

let currentRotation = 0;

let currentClothingName = "";

let isDragging = false;

let startMouseX = 0;

let startMouseY = 0;

let startX = 0;

let startY = 0;



/* =========================================
   ABRIR SELETOR DE FOTO
========================================= */

photoButton.addEventListener(
    "click",
    function () {

        photoInput.click();

    }
);



/* =========================================
   FOTO SELECIONADA
========================================= */

photoInput.addEventListener(
    "change",
    function (event) {

        const file =
            event.target.files[0];

        if (!file) {

            return;

        }


        /*
         * Verifica se realmente é uma imagem.
         */

        if (!file.type.startsWith("image/")) {

            photoStatus.textContent =
                "Escolha uma imagem válida.";

            return;

        }


        /*
         * Cria uma URL temporária
         * para mostrar a foto.
         */

        const imageURL =
            URL.createObjectURL(file);


        userPhoto.onload =
            function () {

                URL.revokeObjectURL(imageURL);

            };


        userPhoto.src =
            imageURL;


        /*
         * Mostra a foto.
         */

        userPhoto.style.display =
            "block";


        /*
         * Esconde mensagem inicial.
         */

        emptyMessage.style.display =
            "none";


        /*
         * Atualiza texto.
         */

        photoStatus.textContent =
            "✓ Foto adicionada com sucesso!";


        /*
         * Mostra o closet.
         */

        document
            .getElementById("closet")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);



/* =========================================
   SELECIONAR ROUPAS
========================================= */

const clothingButtons =
    document.querySelectorAll(
        ".clothing-button"
    );


clothingButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const image =
                    button.dataset.image;

                const name =
                    button.dataset.name;


                selectClothing(
                    image,
                    name
                );

            }
        );

    }
);



/* =========================================
   FUNÇÃO SELECIONAR ROUPA
========================================= */

function selectClothing(
    image,
    name
) {

    /*
     * Verifica se existe foto.
     */

    if (
        !userPhoto.src ||
        userPhoto.style.display === "none"
    ) {

        alert(
            "Primeiro escolha uma foto para montar seu look."
        );

        photoButton.click();

        return;

    }


    /*
     * Cria uma nova imagem temporária
     * para verificar se o arquivo existe.
     */

    const testImage =
        new Image();


    testImage.onload =
        function () {

            /*
             * Arquivo encontrado.
             */

            clothingImage.src =
                image;


            clothingImage.alt =
                name;


            clothingLayer.style.display =
                "block";


            /*
             * Nome da peça.
             */

            selectedClothing.textContent =
                name;


            currentClothingName =
                name;


            /*
             * Reseta posição.
             */

            resetPosition();

        };


    testImage.onerror =
        function () {

            alert(
                "Não consegui encontrar a imagem da roupa:\n\n" +
                image +
                "\n\nVerifique se o nome do arquivo no GitHub está exatamente igual."
            );

        };


    /*
     * Tenta carregar o PNG.
     */

    testImage.src =
        image;

}



/* =========================================
   POSIÇÃO DA ROUPA
========================================= */

function updateClothing() {

    clothingLayer.style.transform =
        `
        translate(
            calc(-50% + ${currentX}px),
            calc(-50% + ${currentY}px)
        )
        rotate(${currentRotation}deg)
        scale(${currentScale})
        `;

}



/* =========================================
   RESET
========================================= */

function resetPosition() {

    currentX = 0;

    currentY = 0;

    currentScale = 1;

    currentRotation = 0;

    updateClothing();

}



function resetAllClothing() {

    resetPosition();

    clothingLayer.style.display =
        "none";

    clothingImage.src =
        "";

    selectedClothing.textContent =
        "Nenhuma peça selecionada";

    currentClothingName =
        "";

}



resetClothing.addEventListener(
    "click",
    resetAllClothing
);



/* =========================================
   BOTÕES DE MOVIMENTO
========================================= */

document
    .getElementById("moveUp")
    .addEventListener(
        "click",
        function () {

            currentY -= 10;

            updateClothing();

        }
    );


document
    .getElementById("moveDown")
    .addEventListener(
        "click",
        function () {

            currentY += 10;

            updateClothing();

        }
    );


document
    .getElementById("moveLeft")
    .addEventListener(
        "click",
        function () {

            currentX -= 10;

            updateClothing();

        }
    );


document
    .getElementById("moveRight")
    .addEventListener(
        "click",
        function () {

            currentX += 10;

            updateClothing();

        }
    );



/* =========================================
   TAMANHO
========================================= */

document
    .getElementById("increase")
    .addEventListener(
        "click",
        function () {

            currentScale += 0.1;

            if (currentScale > 2.5) {

                currentScale = 2.5;

            }

            updateClothing();

        }
    );


document
    .getElementById("decrease")
    .addEventListener(
        "click",
        function () {

            currentScale -= 0.1;

            if (currentScale < 0.4) {

                currentScale = 0.4;

            }

            updateClothing();

        }
    );



/* =========================================
   ROTAÇÃO
========================================= */

document
    .getElementById("rotateLeft")
    .addEventListener(
        "click",
        function () {

            currentRotation -= 5;

            updateClothing();

        }
    );


document
    .getElementById("rotateRight")
    .addEventListener(
        "click",
        function () {

            currentRotation += 5;

            updateClothing();

        }
    );



/* =========================================
   ARRASTAR ROUPA COM MOUSE
========================================= */

clothingLayer.addEventListener(
    "mousedown",
    function (event) {

        isDragging = true;

        startMouseX =
            event.clientX;

        startMouseY =
            event.clientY;

        startX =
            currentX;

        startY =
            currentY;

    }
);


document.addEventListener(
    "mousemove",
    function (event) {

        if (!isDragging) {

            return;

        }


        const differenceX =
            event.clientX -
            startMouseX;


        const differenceY =
            event.clientY -
            startMouseY;


        currentX =
            startX + differenceX;


        currentY =
            startY + differenceY;


        updateClothing();

    }
);


document.addEventListener(
    "mouseup",
    function () {

        isDragging = false;

    }
);



/* =========================================
   ARRASTAR NO CELULAR
========================================= */

clothingLayer.addEventListener(
    "touchstart",
    function (event) {

        const touch =
            event.touches[0];


        isDragging = true;

        startMouseX =
            touch.clientX;

        startMouseY =
            touch.clientY;

        startX =
            currentX;

        startY =
            currentY;

    },
    {
        passive: true
    }
);


clothingLayer.addEventListener(
    "touchmove",
    function (event) {

        if (!isDragging) {

            return;

        }


        const touch =
            event.touches[0];


        const differenceX =
            touch.clientX -
            startMouseX;


        const differenceY =
            touch.clientY -
            startMouseY;


        currentX =
            startX + differenceX;


        currentY =
            startY + differenceY;


        updateClothing();

    },
    {
        passive: true
    }
);


clothingLayer.addEventListener(
    "touchend",
    function () {

        isDragging = false;

    }
);



/* =========================================
   BOTÕES "EXPERIMENTAR"
========================================= */

const chooseProducts =
    document.querySelectorAll(
        ".choose-product"
    );


chooseProducts.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const image =
                    button.dataset.image;

                const name =
                    button.dataset.name;


                /*
                 * Vai para o provador.
                 */

                document
                    .getElementById("closet")
                    .scrollIntoView({
                        behavior: "smooth"
                    });


                /*
                 * Seleciona a roupa depois
                 * de chegar ao closet.
                 */

                setTimeout(
                    function () {

                        selectClothing(
                            image,
                            name
                        );

                    },
                    500
                );

            }
        );

    }
);



/* =========================================
   BOTÃO QUERO ESSE LOOK
========================================= */

buyButton.addEventListener(
    "click",
    function () {

        if (
            !currentClothingName
        ) {

            alert(
                "Escolha uma peça primeiro."
            );

            return;

        }


        alert(
            "Você escolheu: " +
            currentClothingName +
            "\n\nEm breve podemos conectar este botão ao pedido/WhatsApp da Atlética."
        );

    }
);



/* =========================================
   INICIALIZAÇÃO
========================================= */

updateClothing();

console.log(
    "Closet da Atlética FSA carregado com sucesso."
);
