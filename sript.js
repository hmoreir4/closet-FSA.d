document.addEventListener("DOMContentLoaded", function () {


    /* =========================================
       ROUPAS DA ATLÉTICA

       Os nomes abaixo são EXATAMENTE os
       arquivos que você colocou dentro de assets.
    ========================================= */

    const products = [

        {
            name: "Camiseta Azul",
            image: "assets/camiseta-azul.jpg",
            overlay: "assets/camiseta-azul.png"
        },

        {
            name: "Camiseta Branca",
            image: "assets/camiseta-branca.jpg",
            overlay: "assets/camiseta-branca.png"
        },

        {
            name: "Moletom Amarelo",
            image: "assets/moletom-amarelo.jpg",
            overlay: "assets/moletom-amarelo.png"
        },

        {
            name: "Moletom Branco",
            image: "assets/moletom-branco.jpg",
            overlay: "assets/moletom-branco.png"
        },

        {
            name: "Moletom Preto",
            image: "assets/moletom-preto.jpg",
            overlay: "assets/moletom-preto.png"
        },

        {
            name: "Jaqueta Varsity",
            image: "assets/jaqueta-varsity.jpg",
            overlay: "assets/jaqueta-varsity.png"
        }

    ];


    /* =========================================
       ELEMENTOS
    ========================================= */

    const photoInput = document.getElementById("photoInput");

    const userPhoto = document.getElementById("userPhoto");

    const clothingOverlay =
        document.getElementById("clothingOverlay");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const productsContainer =
        document.getElementById("products");

    const catalogContainer =
        document.getElementById("catalog");

    const selectedName =
        document.getElementById("selectedName");


    const plusBtn =
        document.getElementById("plusBtn");

    const minusBtn =
        document.getElementById("minusBtn");

    const rotateLeft =
        document.getElementById("rotateLeft");

    const rotateRight =
        document.getElementById("rotateRight");

    const resetBtn =
        document.getElementById("resetBtn");

    const buyButton =
        document.getElementById("buyButton");


    /* =========================================
       VARIÁVEIS DA ROUPA
    ========================================= */

    let selectedProduct = null;

    let scale = 1;

    let rotation = 0;

    let positionX = 0;

    let positionY = 0;


    /* =========================================
       MOSTRAR ROUPAS
    ========================================= */

    products.forEach(function (product, index) {


        const card = document.createElement("div");

        card.className = "product";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
                onerror="this.style.display='none'"
            >

            <div class="product-name">
                ${product.name}
            </div>

        `;


        card.addEventListener("click", function () {

            selectProduct(product, card);

        });


        productsContainer.appendChild(card);

    });


    /* =========================================
       CATÁLOGO
    ========================================= */

    products.forEach(function (product) {


        const card = document.createElement("div");

        card.className = "catalog-card";


        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="catalog-info">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    Peça oficial da Atlética FSA
                </p>

            </div>

        `;


        catalogContainer.appendChild(card);

    });


    /* =========================================
       ESCOLHER ROUPA
    ========================================= */

    function selectProduct(product, card) {


        selectedProduct = product;


        // tira seleção das outras roupas

        document
            .querySelectorAll(".product")
            .forEach(function (item) {

                item.classList.remove("active");

            });


        card.classList.add("active");


        // coloca a imagem PNG da roupa

        clothingOverlay.src = product.overlay;


        clothingOverlay.style.display = "block";


        // mostra o nome

        selectedName.textContent =
            product.name;


        // reseta posição

        resetClothing();


        /*
         * Caso a foto ainda não tenha sido escolhida,
         * avisamos o usuário.
         */

        if (!userPhoto.src) {

            alert(
                "Primeiro escolha uma foto sua para montar o look."
            );

        }

    }


    /* =========================================
       ESCOLHER FOTO
    ========================================= */

    photoInput.addEventListener("change", function (event) {


        const file = event.target.files[0];


        if (!file) {

            return;

        }


        if (!file.type.startsWith("image/")) {

            alert("Escolha uma imagem válida.");

            return;

        }


        const imageURL =
            URL.createObjectURL(file);


        userPhoto.src = imageURL;


        userPhoto.style.display = "block";


        emptyMessage.style.display = "none";


        /*
         * Quando a foto carregar,
         * colocamos a roupa novamente.
         */

        userPhoto.onload = function () {

            if (selectedProduct) {

                clothingOverlay.style.display = "block";

            }

        };

    });


    /* =========================================
       ATUALIZAR ROUPA
    ========================================= */

    function updateClothing() {


        clothingOverlay.style.transform =

            `translate(calc(-50% + ${positionX}px), calc(-50% + ${positionY}px))
             scale(${scale})
             rotate(${rotation}deg)`;

    }


    /* =========================================
       RESETAR
    ========================================= */

    function resetClothing() {


        scale = 1;

        rotation = 0;

        positionX = 0;

        positionY = 0;


        clothingOverlay.style.left = "50%";

        clothingOverlay.style.top = "50%";


        updateClothing();

    }


    /* =========================================
       AUMENTAR
    ========================================= */

    plusBtn.addEventListener("click", function () {


        scale += 0.1;


        if (scale > 3) {

            scale = 3;

        }


        updateClothing();

    });


    /* =========================================
       DIMINUIR
    ========================================= */

    minusBtn.addEventListener("click", function () {


        scale -= 0.1;


        if (scale < 0.3) {

            scale = 0.3;

        }


        updateClothing();

    });


    /* =========================================
       GIRAR ESQUERDA
    ========================================= */

    rotateLeft.addEventListener("click", function () {


        rotation -= 5;


        updateClothing();

    });


    /* =========================================
       GIRAR DIREITA
    ========================================= */

    rotateRight.addEventListener("click", function () {


        rotation += 5;


        updateClothing();

    });


    /* =========================================
       RESET
    ========================================= */

    resetBtn.addEventListener("click", function () {


        resetClothing();

    });


    /* =========================================
       ARRASTAR ROUPA
    ========================================= */

    let dragging = false;

    let startX = 0;

    let startY = 0;


    clothingOverlay.addEventListener(
        "pointerdown",
        function (event) {


            dragging = true;


            clothingOverlay.setPointerCapture(
                event.pointerId
            );


            startX = event.clientX - positionX;

            startY = event.clientY - positionY;


        }
    );


    clothingOverlay.addEventListener(
        "pointermove",
        function (event) {


            if (!dragging) {

                return;

            }


            positionX =
                event.clientX - startX;


            positionY =
                event.clientY - startY;


            updateClothing();

        }
    );


    clothingOverlay.addEventListener(
        "pointerup",
        function () {

            dragging = false;

        }
    );


    clothingOverlay.addEventListener(
        "pointercancel",
        function () {

            dragging = false;

        }
    );


    /* =========================================
       BOTÃO DE COMPRA
    ========================================= */

    buyButton.addEventListener("click", function () {


        if (!selectedProduct) {

            alert(
                "Escolha uma peça primeiro."
            );

            return;

        }


        alert(
            `Você escolheu: ${selectedProduct.name}\n\nEm breve você poderá finalizar a compra desse look!`
        );

    });


    /* =========================================
       ESTADO INICIAL
    ========================================= */

    clothingOverlay.style.display = "none";

    userPhoto.style.display = "none";

    resetClothing();


});
