// ========================================
// CLOSET ATLÉTICA FSA
// JAVASCRIPT PRINCIPAL
// ========================================

console.log("SCRIPT DO CLOSET FSA CARREGADO!");

// Elementos da página
const photoInput = document.getElementById("photoInput");
const userPhoto = document.getElementById("userPhoto");
const clothingOverlay = document.getElementById("clothingOverlay");
const photoStatus = document.getElementById("photoStatus");
const viewerMessage = document.getElementById("viewerMessage");

// Controle da roupa
let escala = 1;
let rotacao = 0;
let posicaoX = 0;
let posicaoY = 0;
let roupaAtual = null;

// ========================================
// ESCOLHER FOTO
// ========================================

if (photoInput) {

    photoInput.addEventListener("change", function () {

        const arquivo = this.files[0];

        if (!arquivo) {
            return;
        }

        // Cria uma URL para a foto escolhida
        const imagem = URL.createObjectURL(arquivo);

        if (userPhoto) {
            userPhoto.src = imagem;
            userPhoto.style.display = "block";
        }

        // Atualiza texto
        if (photoStatus) {
            photoStatus.textContent = arquivo.name;
        }

        if (viewerMessage) {
            viewerMessage.style.display = "none";
        }

        console.log("Foto selecionada:", arquivo.name);
    });

}


// ========================================
// ESCOLHER PEÇA
// ========================================

window.selecionarRoupa = function(caminho, nome) {

    console.log("Roupa selecionada:", nome);
    console.log("Caminho:", caminho);

    roupaAtual = caminho;

    escala = 1;
    rotacao = 0;
    posicaoX = 0;
    posicaoY = 0;

    if (!clothingOverlay) {
        console.error("Elemento clothingOverlay não encontrado.");
        return;
    }

    // Coloca a imagem da roupa
    clothingOverlay.src = caminho;

    // Mostra a roupa
    clothingOverlay.style.display = "block";

    // Reseta posição e tamanho
    atualizarRoupa();

    // Atualiza mensagem, se existir
    if (viewerMessage) {
        viewerMessage.style.display = "none";
    }

    console.log("Roupa carregada com sucesso!");
};


// ========================================
// ATUALIZAR ROUPA
// ========================================

function atualizarRoupa() {

    if (!clothingOverlay) {
        return;
    }

    clothingOverlay.style.transform =
        "translate(-50%, -50%) " +
        "translate(" + posicaoX + "px, " + posicaoY + "px) " +
        "scale(" + escala + ") " +
        "rotate(" + rotacao + "deg)";
}


// ========================================
// AUMENTAR ROUPA
// ========================================

window.aumentarRoupa = function() {

    escala += 0.1;

    if (escala > 3) {
        escala = 3;
    }

    atualizarRoupa();
};


// ========================================
// DIMINUIR ROUPA
// ========================================

window.diminuirRoupa = function() {

    escala -= 0.1;

    if (escala < 0.3) {
        escala = 0.3;
    }

    atualizarRoupa();
};


// ========================================
// GIRAR ROUPA
// ========================================

window.girarRoupa = function() {

    rotacao += 15;

    if (rotacao >= 360) {
        rotacao = 0;
    }

    atualizarRoupa();
};


// ========================================
// RESETAR ROUPA
// ========================================

window.resetarRoupa = function() {

    escala = 1;
    rotacao = 0;
    posicaoX = 0;
    posicaoY = 0;

    atualizarRoupa();
};


// ========================================
// IR PARA O CLOSET
// ========================================

window.irParaCloset = function() {

    const closet = document.getElementById("closet");

    if (closet) {
        closet.scrollIntoView({
            behavior: "smooth"
        });
    }
};


// ========================================
// BOTÃO "QUERO ESSE LOOK"
// ========================================

window.comprarLook = function() {

    alert("Em breve você poderá comprar este look! 🟡");

};


// ========================================
// ARRASTAR A ROUPA
// ========================================

if (clothingOverlay) {

    let arrastando = false;
    let inicioX = 0;
    let inicioY = 0;

    clothingOverlay.addEventListener("pointerdown", function(event) {

        event.preventDefault();

        arrastando = true;

        inicioX = event.clientX - posicaoX;
        inicioY = event.clientY - posicaoY;

        clothingOverlay.setPointerCapture(event.pointerId);

    });


    clothingOverlay.addEventListener("pointermove", function(event) {

        if (!arrastando) {
            return;
        }

        posicaoX = event.clientX - inicioX;
        posicaoY = event.clientY - inicioY;

        atualizarRoupa();

    });


    clothingOverlay.addEventListener("pointerup", function() {

        arrastando = false;

    });


    clothingOverlay.addEventListener("pointercancel", function() {

        arrastando = false;

    });

}

console.log("Todos os comandos do Closet FSA estão prontos!");
