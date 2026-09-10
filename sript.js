/* =========================================
   CLOSET DA ATLÉTICA FSA
========================================= */


/* =========================================
   PRODUTOS

   Os nomes precisam ser EXATAMENTE iguais
   aos arquivos dentro da pasta /assets
========================================= */

const products = [

    {
        id: "camiseta-azul",
        name: "Camiseta Azul FSA",
        price: "R$ 59,90",

        preview: "assets/camiseta-azul.jpg",

        overlay: "assets/camiseta-azul.png"
    },

    {
        id: "camiseta-branca",
        name: "Camiseta Branca FSA",
        price: "R$ 59,90",

        preview: "assets/camiseta-branca.jpg",

        overlay: "assets/camiseta-branca.png"
    },

    {
        id: "moletom-amarelo",
        name: "Moletom Amarelo FSA",
        price: "R$ 129,90",

        preview: "assets/moletom-amarelo.jpg",

        overlay: "assets/moletom-amarelo.png"
    },

    {
        id: "moletom-branco",
        name: "Moletom Branco FSA",
        price: "R$ 129,90",

        preview: "assets/moletom-branco.jpg",

        overlay: "assets/moletom-branco.png"
    },

    {
        id: "moletom-preto",
        name: "Moletom Preto FSA",
        price: "R$ 129,90",

        preview: "assets/moletom-preto.jpg",

        overlay: "assets/moletom-preto.png"
    },

    {
        id: "jaqueta-varsity",
        name: "Jaqueta Varsity FSA",
        price: "R$ 159,90",

        preview: "assets/jaqueta-varsity.jpg",

        overlay: "assets/jaqueta-varsity.png"
    }

];


/* =========================================
   ELEMENTOS
========================================= */

const photoInput =
    document.getElementById("photoInput");

const userPhoto =
    document.getElementById("userPhoto");

const clothingOverlay =
    document.getElementById("clothingOverlay");

const emptyMessage =
    document.getElementById("emptyMessage");

const photoStatus =
    document.getElementById("photoStatus");

const productButtons =
    document.getElementById("productButtons");

const productGrid =
    document.getElementById("productGrid");

const selectedProduct =
    document.getElementById("selectedProduct");

const buyButton =
    document.getElementById("buyButton");


/* =========================================
   ESTADO
========================================= */

let currentProduct = null;

let photoURL = null;

let scale = 1;

let rotation = 0;

let positionX = 0;

let positionY = 0;


/* =========================================
   VERIFICAÇÃO
========================================= */

console.log("Closet FSA iniciado.");

console.log(
    "Campo de foto:",
    photoInput
);

console.log(
    "Produtos:",
    products
);


/* =========================================
   CARREGAR PRODUTOS
========================================= */

function loadProducts() {

    productButtons.innerHTML = "";

    productGrid.innerHTML = "";


    products.forEach(product => {


        /* -----------------------------
           BOTÃO DO CLOSET
        ----------------------------- */

        const button =
            document.createElement("button");

        button.className =
            "product-select";

        button.type = "button";

        button.textContent =
            product.name;


        button.addEventListener(
            "click",
            () => {

                selectProduct(product);

            }
        );


        productButtons.appendChild(button);


        /* -----------------------------
           CARD DOS PRODUTOS
        ----------------------------- */

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        card.innerHTML = `

            <img
                src="${product.preview}"
                alt="${product.name}"
                onerror="this.style.display='none'"
            >

            <div class="product-card-content">

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.price}
                </p>

                <button
                    type="button"
                    class="choose-product"
                >
                    EXPERIMENTAR
                </button>

            </div>

        `;


        const chooseButton =
            card.querySelector(
                ".choose-product"
            );


        chooseButton.addEventListener(
            "click",
            () => {

                selectProduct(product);

                document
                    .getElementById("closet")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );


        productGrid.appendChild(card);

    });

}


/* =========================================
   SELECIONAR ROUPA
========================================= */

function selectProduct(product) {

    currentProduct = product;

    scale = 1;

    rotation = 0;

    positionX = 0;

    positionY = 0;


    clothingOverlay.src =
        product.overlay;


    clothingOverlay.style.display =
        "block";


    selectedProduct.textContent =
        `${product.name} — ${product.price}`;


    buyButton.disabled = false;


    updateClothing();


    console.log(
        "Roupa selecionada:",
        product.name
    );


    /*
       Verifica se o PNG realmente existe.
    */

    clothingOverlay.onerror = function () {

        alert(
            "Não foi possível carregar a imagem da roupa.\n\n" +
            "Verifique se existe este arquivo dentro de assets:\n\n" +
            product.overlay
        );

        clothingOverlay.style.display =
            "none";

    };

}


/* =========================================
   FOTO DO USUÁRIO

   AQUI ESTÁ A CORREÇÃO PRINCIPAL
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
           Confirma que é uma imagem.
        */

        if (!file.type.startsWith("image/")) {

            alert(
                "Por favor, escolha uma imagem."
            );

            photoInput.value = "";

            return;

        }


        /*
           Libera a memória da foto anterior.
        */

        if (photoURL) {

            URL.revokeObjectURL(
                photoURL
            );

        }


        /*
           Cria endereço temporário
           para a foto.
        */

        photoURL =
            URL.createObjectURL(file);


        /*
           Coloca a foto no provador.
        */

        userPhoto.src =
            photoURL;


        userPhoto.style.display =
            "block";


        emptyMessage.style.display =
            "none";


        photoStatus.textContent =
            "✓ Foto adicionada com sucesso!";


        console.log(
            "Foto carregada:",
            file.name
        );

    }
);


/* =========================================
   GARANTIR QUE O BOTÃO DE FOTO FUNCIONE
========================================= */

const uploadButton =
    document.querySelector(
        ".upload-button"
    );


if (uploadButton) {

    uploadButton.addEventListener(
        "click",
        function () {

            photoInput.click();

        }
    );

}


/* =========================================
   ATUALIZAR ROUPA
========================================= */

function updateClothing() {

    clothingOverlay.style.transform =
        `
        translate(
            calc(-50% + ${positionX}px),
            calc(-50% + ${positionY}px)
        )
        rotate(${rotation}deg)
        scale(${scale})
        `;

}


/* =========================================
   AUMENTAR
========================================= */

document
    .getElementById("increaseSize")
    .addEventListener(
        "click",
        function () {

            if (!currentProduct) {

                alert(
                    "Escolha uma roupa primeiro."
                );

                return;

            }

            scale += 0.1;

            updateClothing();

        }
    );


/* =========================================
   DIMINUIR
========================================= */

document
    .getElementById("decreaseSize")
    .addEventListener(
        "click",
        function () {

            if (!currentProduct) {

                alert(
                    "Escolha uma roupa primeiro."
                );

                return;

            }

            scale -= 0.1;


            if (scale < 0.3) {

                scale = 0.3;

            }


            updateClothing();

        }
    );


/* =========================================
   GIRAR PARA ESQUERDA
========================================= */

document
    .getElementById("rotateLeft")
    .addEventListener(
        "click",
        function () {

            if (!currentProduct) {

                return;

            }

            rotation -= 5;

            updateClothing();

        }
    );


/* =========================================
   GIRAR PARA DIREITA
========================================= */

document
    .getElementById("rotateRight")
    .addEventListener(
        "click",
        function () {

            if (!currentProduct) {

                return;

            }

            rotation += 5;

            updateClothing();

        }
    );


/* =========================================
   RESETAR ROUPA
========================================= */

document
    .getElementById("resetClothing")
    .addEventListener(
        "click",
        function () {

            scale = 1;

            rotation = 0;

            positionX = 0;

            positionY = 0;

            updateClothing();

        }
    );


/* =========================================
   ARRASTAR ROUPA
========================================= */

let dragging = false;

let startX = 0;

let startY = 0;


/*
   MOUSE
*/

clothingOverlay.addEventListener(
    "mousedown",
    function (event) {

        dragging = true;

        startX =
            event.clientX - positionX;

        startY =
            event.clientY - positionY;

        clothingOverlay.style.cursor =
            "grabbing";

    }
);


document.addEventListener(
    "mousemove",
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


document.addEventListener(
    "mouseup",
    function () {

        dragging = false;

        clothingOverlay.style.cursor =
            "grab";

    }
);


/*
   CELULAR / TOUCH
*/

clothingOverlay.addEventListener(
    "touchstart",
    function (event) {

        if (
            !event.touches ||
            !event.touches[0]
        ) {

            return;

        }


        dragging = true;


        startX =
            event.touches[0].clientX
            - positionX;


        startY =
            event.touches[0].clientY
            - positionY;

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchmove",
    function (event) {

        if (!dragging) {

            return;

        }


        if (
            !event.touches ||
            !event.touches[0]
        ) {

            return;

        }


        event.preventDefault();


        positionX =
            event.touches[0].clientX
            - startX;


        positionY =
            event.touches[0].clientY
            - startY;


        updateClothing();

    },
    {
        passive: false
    }
);


document.addEventListener(
    "touchend",
    function () {

        dragging = false;

    }
);


/* =========================================
   BOTÃO COMPRAR
========================================= */

buyButton.addEventListener(
    "click",
    function () {

        if (!currentProduct) {

            return;

        }


        alert(
            `Você escolheu:\n\n` +
            `${currentProduct.name}\n` +
            `${currentProduct.price}\n\n` +
            `Aqui podemos colocar o link do pedido da Atlética.`
        );

    }
);


/* =========================================
   INICIALIZAÇÃO
========================================= */

loadProducts();
