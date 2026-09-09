const photoInput = document.getElementById("photoInput");

const userPhoto = document.getElementById("userPhoto");
const clothing = document.getElementById("clothing");
const emptyMessage = document.getElementById("emptyMessage");

const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");

const rotateLeft = document.getElementById("rotateLeft");
const rotateRight = document.getElementById("rotateRight");

const reset = document.getElementById("reset");
const buyButton = document.getElementById("buyButton");

let scale = 1;
let rotation = 0;

let positionX = 0;
let positionY = 0;

let dragging = false;

let startX = 0;
let startY = 0;

let selectedProduct = null;


/* =========================
   FOTO DO USUÁRIO
========================= */

photoInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        userPhoto.src = event.target.result;

        userPhoto.style.display = "block";

        emptyMessage.style.display = "none";

    };

    reader.readAsDataURL(file);

});


/* =========================
   ROUPAS
========================= */

const products = {

    "camiseta-azul": {
        name: "Camiseta Azul",
        image: "./assets/camiseta-azul.png"
    },

    "camiseta-branca": {
        name: "Camiseta Branca",
        image: "./assets/camiseta-branca.png"
    },

    "moletom-amarelo": {
        name: "Moletom Amarelo",
        image: "./assets/moletom-amarelo.png"
    },

    "moletom-branco": {
        name: "Moletom Branco",
        image: "./assets/moletom-branco.png"
    },

    "moletom-preto": {
        name: "Moletom Preto",
        image: "./assets/moletom-preto.png"
    },

    "jaqueta-varsity": {
        name: "Jaqueta Varsity",
        image: "./assets/jaqueta-varsity.png"
    }

};


/* =========================
   SELECIONAR ROUPA
========================= */

function selectProduct(productId) {

    const product = products[productId];

    if (!product) return;

    selectedProduct = product;

    clothing.src = product.image;

    clothing.style.display = "block";

    scale = 1;
    rotation = 0;

    positionX = 0;
    positionY = 0;

    updateClothing();

    document
        .getElementById("closet")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* BOTÕES DAS ROUPAS */

document.querySelectorAll(".product-btn").forEach(button => {

    button.addEventListener("click", function () {

        const productId = this.dataset.product;

        selectProduct(productId);

    });

});


/* =========================
   ATUALIZAR ROUPA
========================= */

function updateClothing() {

    clothing.style.transform =
        `translate(${positionX}px, ${positionY}px)
         scale(${scale})
         rotate(${rotation}deg)`;

}


/* =========================
   TAMANHO
========================= */

increase.addEventListener("click", function () {

    scale += 0.1;

    updateClothing();

});


decrease.addEventListener("click", function () {

    if (scale > 0.3) {

        scale -= 0.1;

        updateClothing();

    }

});


/* =========================
   ROTAÇÃO
========================= */

rotateLeft.addEventListener("click", function () {

    rotation -= 10;

    updateClothing();

});


rotateRight.addEventListener("click", function () {

    rotation += 10;

    updateClothing();

});


/* =========================
   RESET
========================= */

reset.addEventListener("click", function () {

    scale = 1;

    rotation = 0;

    positionX = 0;

    positionY = 0;

    updateClothing();

});


/* =========================
   ARRASTAR ROUPA
========================= */

clothing.addEventListener("pointerdown", function (event) {

    dragging = true;

    startX = event.clientX - positionX;
    startY = event.clientY - positionY;

    clothing.setPointerCapture(event.pointerId);

});


clothing.addEventListener("pointermove", function (event) {

    if (!dragging) return;

    positionX = event.clientX - startX;
    positionY = event.clientY - startY;

    updateClothing();

});


clothing.addEventListener("pointerup", function () {

    dragging = false;

});


/* =========================
   BOTÃO COMPRAR
========================= */

buyButton.addEventListener("click", function () {

    if (!selectedProduct) {

        alert("Escolha uma peça primeiro!");

        return;

    }

    alert(
        `Você escolheu: ${selectedProduct.name}\n\n` +
        `Agora podemos colocar aqui o link ` +
        `para comprar a peça.`
    );

});
