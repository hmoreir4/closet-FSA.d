/* ========================================
   RESET
======================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    background: #0F142E;
    color: #ffffff;
    overflow-x: hidden;
}

button,
input {
    font-family: inherit;
}

a {
    color: inherit;
    text-decoration: none;
}


/* ========================================
   CORES
======================================== */

:root {

    --navy: #0F142E;
    --yellow: #F5C820;
    --brown: #4B3E26;
    --purple: #6E637F;
    --gray: #AFAEAB;
    --white: #ffffff;

}


/* ========================================
   HEADER
======================================== */

.header {
    position: sticky;
    top: 0;
    z-index: 1000;

    background: rgba(15, 20, 46, 0.95);

    border-bottom: 1px solid rgba(255,255,255,0.08);

    backdrop-filter: blur(10px);
}

.header-container {

    max-width: 1200px;
    margin: auto;

    min-height: 80px;

    padding: 15px 25px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 30px;
}

.logo {
    width: 65px;
    height: 65px;

    object-fit: contain;
}

.nav {
    display: flex;
    gap: 28px;
}

.nav a {

    font-size: 13px;
    font-weight: bold;

    text-transform: uppercase;

    transition: 0.3s;
}

.nav a:hover {
    color: var(--yellow);
}


/* ========================================
   HERO
======================================== */

.hero {

    min-height: 700px;

    max-width: 1200px;

    margin: auto;

    padding: 100px 25px;

    display: flex;
    align-items: center;

    position: relative;
    overflow: hidden;
}

.hero-content {

    max-width: 650px;

    position: relative;
    z-index: 2;
}

.tag {

    color: var(--yellow);

    font-size: 13px;
    font-weight: bold;

    letter-spacing: 3px;
}

.hero h1 {

    margin-top: 20px;

    font-size: clamp(50px, 8vw, 100px);

    line-height: 0.9;

    letter-spacing: -4px;
}

.hero h1 strong {
    color: var(--yellow);
}

.hero p {

    max-width: 500px;

    margin: 30px 0;

    color: var(--gray);

    font-size: 18px;

    line-height: 1.6;
}


/* ========================================
   BOTÕES
======================================== */

.button {

    display: inline-flex;

    padding: 18px 28px;

    background: var(--yellow);

    color: var(--navy);

    font-weight: 900;

    font-size: 13px;

    letter-spacing: 1px;

    border-radius: 5px;

    transition: 0.3s;
}

.button:hover {

    transform: translateY(-3px);

    box-shadow:
        0 10px 30px rgba(245,200,32,0.2);
}


/* ========================================
   DECORAÇÃO HERO
======================================== */

.hero-decoration {

    position: absolute;

    right: -100px;
    top: 80px;

    width: 550px;
    height: 550px;
}

.circle {

    width: 450px;
    height: 450px;

    border-radius: 50%;

    border: 80px solid var(--brown);

    opacity: 0.7;
}

.yellow-shape {

    position: absolute;

    right: 0;
    bottom: 0;

    width: 180px;
    height: 180px;

    background: var(--yellow);

    transform: rotate(25deg);

    opacity: 0.8;
}


/* ========================================
   TÍTULOS
======================================== */

.section-title {

    text-align: center;

    margin-bottom: 60px;
}

.section-title span {

    color: var(--yellow);

    font-size: 12px;

    font-weight: bold;

    letter-spacing: 3px;
}

.section-title h2 {

    margin-top: 12px;

    font-size: clamp(35px, 5vw, 65px);

    line-height: 1;

}


/* ========================================
   COMO FUNCIONA
======================================== */

.how-section {

    background: #ffffff;

    color: var(--navy);

    padding: 100px 25px;
}

.steps {

    max-width: 1100px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 25px;
}

.step {

    padding: 35px;

    background: #f5f5f5;

    border-radius: 10px;

    border-top: 5px solid var(--yellow);
}

.step-number {

    color: var(--yellow);

    font-size: 40px;

    font-weight: 900;
}

.step h3 {

    margin: 20px 0 10px;

    font-size: 20px;
}

.step p {

    color: #666;

    line-height: 1.6;
}


/* ========================================
   CLOSET
======================================== */

.closet-section {

    padding: 100px 25px;

    background: var(--navy);
}

.closet-container {

    max-width: 1200px;

    margin: auto;

    display: grid;

    grid-template-columns:
        320px 1fr;

    gap: 30px;
}


/* ========================================
   CONTROLES
======================================== */

.controls {

    display: flex;

    flex-direction: column;

    gap: 20px;
}

.control-box {

    padding: 25px;

    background: rgba(255,255,255,0.05);

    border: 1px solid rgba(255,255,255,0.1);

    border-radius: 10px;
}

.control-box h3 {

    font-size: 15px;

    margin-bottom: 8px;
}

.control-box p {

    color: var(--gray);

    font-size: 13px;

    line-height: 1.5;

    margin-bottom: 18px;
}


/* ========================================
   UPLOAD
======================================== */

.upload-button {

    display: block;

    text-align: center;

    padding: 14px;

    background: var(--yellow);

    color: var(--navy);

    border-radius: 5px;

    font-weight: bold;

    cursor: pointer;

    transition: 0.3s;
}

.upload-button:hover {

    transform: translateY(-2px);
}


/* ========================================
   PRODUTOS BOTÕES
======================================== */

.product-buttons {

    display: flex;

    flex-direction: column;

    gap: 8px;
}

.product-button {

    width: 100%;

    padding: 12px;

    border: 1px solid rgba(255,255,255,0.15);

    background: transparent;

    color: white;

    border-radius: 5px;

    text-align: left;

    cursor: pointer;

    transition: 0.3s;
}

.product-button:hover,
.product-button.active {

    background: var(--yellow);

    color: var(--navy);

    border-color: var(--yellow);
}


/* ========================================
   AJUSTES
======================================== */

.adjust-buttons {

    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 7px;

    margin-bottom: 10px;
}

.adjust-buttons button {

    padding: 12px;

    border: none;

    background: var(--purple);

    color: white;

    border-radius: 5px;

    cursor: pointer;

    font-size: 18px;

    transition: 0.2s;
}

.adjust-buttons button:hover {

    background: var(--yellow);

    color: var(--navy);
}

.reset-button {

    width: 100%;

    padding: 12px;

    background: transparent;

    color: var(--gray);

    border: 1px solid rgba(255,255,255,0.2);

    border-radius: 5px;

    cursor: pointer;
}


/* ========================================
   ÁREA DO PROVADOR
======================================== */

.tryon-area {

    min-width: 0;
}

.photo-canvas {

    width: 100%;

    min-height: 650px;

    background: #202642;

    border-radius: 12px;

    border: 2px dashed rgba(255,255,255,0.2);

    position: relative;

    overflow: hidden;

    display: flex;

    align-items: center;

    justify-content: center;
}

.user-photo {

    position: absolute;

    width: 100%;
    height: 100%;

    object-fit: contain;

    display: none;

    user-select: none;
}

.clothing-overlay {

    position: absolute;

    width: 250px;

    max-width: 60%;

    display: none;

    cursor: grab;

    user-select: none;

    touch-action: none;

    transform-origin: center center;

    z-index: 5;
}

.clothing-overlay:active {

    cursor: grabbing;
}


/* ========================================
   MENSAGEM VAZIA
======================================== */

.empty-message {

    text-align: center;

    padding: 30px;

    color: var(--gray);
}

.camera-icon {

    width: 65px;
    height: 65px;

    margin: 0 auto 20px;

    border-radius: 50%;

    display: flex;

    align-items: center;
    justify-content: center;

    background: rgba(245,200,32,0.1);

    color: var(--yellow);

    font-size: 35px;
}

.empty-message h3 {

    color: white;

    font-size: 17px;

    margin-bottom: 10px;
}


/* ========================================
   INFO DO LOOK
======================================== */

.tryon-info {

    margin-top: 15px;

    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;
}

#selectedProduct {

    margin: 0;

    color: white;

    font-weight: bold;
}

.buy-button {

    padding: 15px 25px;

    border: none;

    background: var(--yellow);

    color: var(--navy);

    font-weight: 900;

    border-radius: 5px;

    cursor: pointer;

    transition: 0.3s;
}

.buy-button:hover {

    transform: translateY(-2px);
}


/* ========================================
   ROUPAS
======================================== */

.products-section {

    padding: 100px 25px;

    background: #ffffff;

    color: var(--navy);
}

.products-grid {

    max-width: 1100px;

    margin: auto;

    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 25px;
}

.product-card {

    background: #f5f5f5;

    border-radius: 10px;

    overflow: hidden;

    transition: 0.3s;
}

.product-card:hover {

    transform: translateY(-5px);
}

.product-image {

    width: 100%;

    height: 320px;

    object-fit: cover;

    display: block;
}

.product-info {

    padding: 20px;
}

.product-info h3 {

    font-size: 18px;

    margin-bottom: 8px;
}

.product-info p {

    color: #777;

    margin-bottom: 15px;
}

.select-product {

    width: 100%;

    padding: 13px;

    background: var(--navy);

    color: white;

    border: none;

    border-radius: 5px;

    font-weight: bold;

    cursor: pointer;
}

.select-product:hover {

    background: var(--yellow);

    color: var(--navy);
}


/* ========================================
   FINAL
======================================== */

.final-section {

    padding: 120px 25px;

    background: var(--brown);

    text-align: center;
}

.final-section span {

    color: var(--yellow);

    font-size: 12px;

    font-weight: bold;

    letter-spacing: 3px;
}

.final-section h2 {

    margin: 25px 0 35px;

    font-size: clamp(40px, 7vw, 80px);

    line-height: 0.95;
}

.final-section h2 strong {

    color: var(--yellow);
}


/* ========================================
   FOOTER
======================================== */

footer {

    padding: 50px 25px;

    background: #090d20;

    text-align: center;

    color: var(--gray);
}

footer img {

    width: 70px;

    height: 70px;

    object-fit: contain;

    margin-bottom: 15px;
}

footer p {

    margin-bottom: 10px;
}


/* ========================================
   RESPONSIVIDADE
======================================== */

@media (max-width: 900px) {

    .hero-decoration {
        opacity: 0.3;
    }

    .steps {

        grid-template-columns:
            1fr;
    }

    .closet-container {

        grid-template-columns:
            1fr;
    }

    .products-grid {

        grid-template-columns:
            repeat(2, 1fr);
    }

}


@media (max-width: 600px) {

    .header-container {

        min-height: 70px;

        padding: 10px 15px;
    }

    .logo {

        width: 50px;
        height: 50px;
    }

    .nav {

        gap: 12px;
    }

    .nav a {

        font-size: 9px;
    }

    .hero {

        min-height: 600px;

        padding: 70px 20px;
    }

    .hero h1 {

        font-size: 55px;

        letter-spacing: -2px;
    }

    .hero p {

        font-size: 15px;
    }

    .photo-canvas {

        min-height: 500px;
    }

    .products-grid {

        grid-template-columns:
            1fr;
    }

    .tryon-info {

        flex-direction: column;

        align-items: stretch;
    }

    .buy-button {

        width: 100%;
    }

}
