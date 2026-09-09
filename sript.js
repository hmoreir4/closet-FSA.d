/* =========================================
   ELEMENTOS
========================================= */

const photoInput = document.getElementById("photoInput");

const uploadArea = document.getElementById("uploadArea");

const uploadContent = document.getElementById("uploadContent");

const userPhoto = document.getElementById("userPhoto");

const changePhoto = document.getElementById("changePhoto");

const tryArea = document.getElementById("tryArea");

const emptyTry = document.getElementById("emptyTry");

const clothingOverlay =
    document.getElementById("clothingOverlay");

const controls =
    document.getElementById("controls");

const clothingItems =
    document.querySelectorAll(".clothing-item");

const selectedName =
    document.getElementById("selectedName");

const buyButton =
    document.getElementById("buyButton");


/* =========================================
   ESTADO
========================================= */

let selectedProduct = null;

let scale = 1;

let rotation = 0;

let positionX = 50;

let positionY = 45;

let isDragging = false;

let startX = 0;

let startY = 0;

let startPositionX = 50;

let startPositionY = 45;


/* =========================================
   UPLOAD DA FOTO
========================================= */

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {

        alert("Escolha uma imagem válida.");

        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {

        userPhoto.src = event.target.result;

        userPhoto.style.display = "block";

        uploadContent.style.display = "none";

        changePhoto.style.display = "block";

        tryArea.style.background = "transparent";

        tryArea.classList.add("has-photo");

        updateTryBackground();

    };

    reader.readAsDataURL(file);

});


/* =========================================
   TROCAR FOTO
========================================= */

changePhoto.addEventListener("click", function () {

    photoInput.click();

});


/* =========================================
   CRIA FUNDO DO PROVADOR
========================================= */

function updateTryBackground() {

    let oldBackground =
        document.querySelector(".try-background");

    if (oldBackground) {

        oldBackground.remove();

    }

    if (!userPhoto.src) {

        return;

    }

    const background =
        document.createElement("img");

    background.src = userPhoto.src;

    background.className =
        "try-background";

    tryArea.prepend(background);

}


/* =========================================
   ESCOLHER ROUPA
========================================= */

clothingItems.forEach(function (item) {

    item.addEventListener("click", function () {

        clothingItems.forEach(function (button) {

            button.classList.remove("active");

        });

        item.classList.add("active");

        const name =
            item.dataset.name;

        const image =
            item.dataset.image;

        const overlay =
            item.dataset.overlay;

        selectedProduct = {

            name: name,

            image: image,

            overlay: overlay

        };

        selectedName.textContent = name;

        buyButton.disabled = false;

        loadClothing(overlay);

    });

});


/* =========================================
   CARREGAR ROUPA
========================================= */

function loadClothing(image) {

    scale = 1;

    rotation = 0;

    positionX = 50;

    positionY = 45;

    clothingOverlay.src = image;

    clothingOverlay.style.display = "block";

    controls.style.display = "flex";

    emptyTry.style.display = "none";

    updateClothing();

}


/* =========================================
   ATUALIZA ROUPA
========================================= */

function updateClothing() {

    clothingOverlay.style.left =
        `${positionX}%`;

    clothingOverlay.style.top =
        `${positionY}%`;

    clothingOverlay.style.transform =
        `
        translate(-50%, -50%)
        rotate(${rotation}deg)
        scale(${scale})
        `;

}


/* =========================================
   AUMENTAR
========================================= */

document
    .getElementById("scaleUp")
    .addEventListener("click", function () {

        scale += 0.1;

        if (scale > 2.5) {

            scale = 2.5;

        }

        updateClothing();

    });


/* =========================================
   DIMINUIR
========================================= */

document
    .getElementById("scaleDown")
    .addEventListener("click", function () {

        scale -= 0.1;

        if (scale < 0.4) {

            scale = 0.4;

        }

        updateClothing();

    });


/* =========================================
   GIRAR ESQUERDA
========================================= */

document
    .getElementById("rotateLeft")
    .addEventListener("click", function () {

        rotation -= 5;

        updateClothing();

    });


/* =========================================
   GIRAR DIREITA
========================================= */

document
    .getElementById("rotateRight")
    .addEventListener("click", function () {

        rotation += 5;

        updateClothing();

    });


/* =========================================
   RESETAR
========================================= */

document
    .getElementById("resetPosition")
    .addEventListener("click", function () {

        scale = 1;

        rotation = 0;

        positionX = 50;

        positionY = 45;

        updateClothing();

    });


/* =========================================
   ARRASTAR COM MOUSE
========================================= */

clothingOverlay.addEventListener(
    "mousedown",
    function (event) {

        event.preventDefault();

        isDragging = true;

        startX = event.clientX;

        startY = event.clientY;

        startPositionX = positionX;

        startPositionY = positionY;

    }
);


document.addEventListener(
    "mousemove",
    function (event) {

        if (!isDragging) {

            return;

        }

        const rect =
            tryArea.getBoundingClientRect();

        const deltaX =
            event.clientX - startX;

        const deltaY =
            event.clientY - startY;

        positionX =
            startPositionX +
            (deltaX / rect.width) * 100;

        positionY =
            startPositionY +
            (deltaY / rect.height) * 100;

        positionX =
            Math.max(
                0,
                Math.min(100, positionX)
            );

        positionY =
            Math.max(
                0,
                Math.min(100, positionY)
            );

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

clothingOverlay.addEventListener(
    "touchstart",
    function (event) {

        if (!event.touches.length) {

            return;

        }

        event.preventDefault();

        isDragging = true;

        startX =
            event.touches[0].clientX;

        startY =
            event.touches[0].clientY;

        startPositionX = positionX;

        startPositionY = positionY;

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchmove",
    function (event) {

        if (!isDragging) {

            return;

        }

        if (!event.touches.length) {

            return;

        }

        const rect =
            tryArea.getBoundingClientRect();

        const currentX =
            event.touches[0].clientX;

        const currentY =
            event.touches[0].clientY;

        const deltaX =
            currentX - startX;

        const deltaY =
            currentY - startY;

        positionX =
            startPositionX +
            (deltaX / rect.width) * 100;

        positionY =
            startPositionY +
            (deltaY / rect.height) * 100;

        positionX =
            Math.max(
                0,
                Math.min(100, positionX)
            );

        positionY =
            Math.max(
                0,
                Math.min(100, positionY)
            );

        updateClothing();

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchend",
    function () {

        isDragging = false;

    }
);


/* =========================================
   BOTÃO DE COMPRA
========================================= */

buyButton.addEventListener(
    "click",
    function () {

        if (!selectedProduct) {

            return;

        }

        const message =
            `Olá! Quero comprar a peça "${selectedProduct.name}" que montei no Closet Digital.`;

        /*
         * TROQUE ESTE NÚMERO PELO WHATSAPP
         * DA ATLÉTICA.
         *
         * Exemplo:
         * 5511999999999
         */

        const whatsappNumber =
            "5511999999999";

        const url =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        window.open(
            url,
            "_blank"
        );

    }
);


/* =========================================
   ESC / LIMPAR SELEÇÃO
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            clothingItems.forEach(function (item) {

                item.classList.remove("active");

            });

            selectedProduct = null;

            selectedName.textContent =
                "Nenhuma peça";

            buyButton.disabled = true;

            clothingOverlay.style.display =
                "none";

            controls.style.display =
                "none";

            emptyTry.style.display =
                "block";

        }

    }
);


/* =========================================
   DRAG AND DROP DA FOTO
========================================= */

uploadArea.addEventListener(
    "dragover",
    function (event) {

        event.preventDefault();

        uploadArea.style.borderColor =
            "#F5C820";

    }
);


uploadArea.addEventListener(
    "dragleave",
    function () {

        uploadArea.style.borderColor =
            "";

    }
);


uploadArea.addEventListener(
    "drop",
    function (event) {

        event.preventDefault();

        uploadArea.style.borderColor =
            "";

        const file =
            event.dataTransfer.files[0];

        if (!file) {

            return;

        }

        if (!file.type.startsWith("image/")) {

            alert("Solte apenas uma imagem.");

            return;

        }

        const reader =
            new FileReader();

        reader.onload =
            function (event) {

                userPhoto.src =
                    event.target.result;

                userPhoto.style.display =
                    "block";

                uploadContent.style.display =
                    "none";

                changePhoto.style.display =
                    "block";

                tryArea.classList.add(
                    "has-photo"
                );

                updateTryBackground();

            };

        reader.readAsDataURL(file);

    }
);
