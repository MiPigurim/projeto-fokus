const html = document.querySelector("html");
const focoButton = document.querySelector(".app__card-button--foco");
const curtoButton = document.querySelector(".app__card-button--curto");
const longoButton = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseButton = document.querySelector("#start-pause");
const iniciarOuPausarButton = document.querySelector("#start-pause span");
const iniciarOuPausarBtnImg = document.querySelector("#start-pause img");
const tempoNaTela = document.querySelector("#timer");
const musica = new Audio("/sons/luna-rise-part-one.mp3");
const musicaPlay = new Audio("/sons/play.wav");
const musicaPause = new Audio("/sons/pause.mp3");
const musicaBeep = new Audio("/sons/beep.mp3");

let tempoDecorridoSegundos = 1500;
let intervaloId = null;

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
  if (musica.paused) {
    musica.play();
  } else {
    musica.pause();
  }
});

focoButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 1500;
  alterarContexto("foco");
  focoButton.classList.add("active");
});

curtoButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 300;
  alterarContexto("descanso-curto");
  curtoButton.classList.add("active");
});

longoButton.addEventListener("click", () => {
  tempoDecorridoSegundos = 900;
  alterarContexto("descanso-longo");
  longoButton.classList.add("active");
});

function alterarContexto(contexto) {
  mostrarTempo();
  botoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      titulo.innerHTML = `
                  Otimize sua produtividade,<br />
          <strong class="app__title-strong">mergulhe no que importa.</strong>
        `;
      break;
    case "descanso-curto":
      titulo.innerHTML = `
                  Que tal dar uma respirada? <br />
          <strong class="app__title-strong">Faça uma pausa curta!</strong>
        `;
      break;
    case "descanso-longo":
      titulo.innerHTML = `
                  Hora de voltar à superfície.<br />
          <strong class="app__title-strong">Faça uma pausa longa.</strong>
        `;
      break;
    default:
      break;
  }
}

const constagemRegressiva = () => {
  if (tempoDecorridoSegundos <= 0) {
    musicaBeep.play();
    alert("Tempo finalizado! ");
    zerarTemporizador();
    return;
  }
  tempoDecorridoSegundos -= 1;
  mostrarTempo();
};

startPauseButton.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloId) {
    musicaPause.play();
    zerarTemporizador();
    return;
  }
  musicaPlay.play();
  intervaloId = setInterval(constagemRegressiva, 1000);
  iniciarOuPausarButton.textContent = "Pausar";
  iniciarOuPausarBtnImg.setAttribute("src", `/imagens/pause.png`);
}

function zerarTemporizador() {
  clearInterval(intervaloId);
  iniciarOuPausarButton.textContent = "Começar";
  iniciarOuPausarBtnImg.setAttribute("src", `/imagens/play_arrow.png`);

  intervaloId = null;
}

function mostrarTempo() {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();
