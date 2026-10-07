"use strict";

const WHATSAPP_NUMBER = "243987937181";

const compliments = [
  "Ton sourire a probablement causé quelques petits problèmes aujourd’hui. 😂❤️",
  "Tu as ce petit quelque chose qui rend les conversations plus intéressantes.",
  "Avis officiel : tu es beaucoup trop adorable aujourd’hui. 😌",
  "Je ne vais pas dire que tu es parfaite… mais franchement, tu compliques mon argument. 😂",
  "Ton sourire devrait être classé comme arme de distraction massive. 🚨😂",
  "Certaines personnes ont une belle personnalité. Toi, tu as décidé de cumuler. 😌",
  "Petit rappel : quelqu’un apprécie énormément ta présence. 👀❤️",
  "Je crois que cette page vient de devenir plus jolie depuis que tu l’as ouverte. 😂",
  "Tu as un talent particulier pour rendre une journée un peu meilleure.",
  "Même quand tu ne fais rien, tu arrives quand même à être adorable. C’est suspect. 😂",
  "Si le sourire était une monnaie, tu serais déjà riche. 💸❤️",
  "Je voulais faire un compliment intelligent, puis j’ai pensé à ton sourire et j’ai oublié. 😭😂",
  "Tu as quelque chose de vraiment spécial, même si je ne vais pas tout révéler aujourd’hui. 👀",
  "Tu es officiellement autorisée à sourire après avoir lu ceci. 😌",
  "Tu as ce petit côté qui donne envie de te taquiner juste pour voir ton sourire. 😏",
  "Ta bonne humeur devrait être disponible en format à emporter. Ça sauverait des journées. 😊",
  "Tu pourrais rendre une journée ordinaire beaucoup moins ordinaire, juste en étant là.",
  "Je soupçonne ton sourire d’avoir un très bon agent : il fait parler de lui partout. 😂",
  "Tu es le genre de personne qu’on est content de voir apparaître dans ses notifications. 👀",
  "Ton énergie, c’est un peu comme le soleil… mais sans le risque de coup de soleil. ☀️",
  "Tu as un charme discret… enfin, discret jusqu’à ce qu’on le remarque. 😌",
  "Je te trouve vraiment chouette. Voilà, c’était le communiqué officiel du jour. 📣",
  "Tu rends le mot « adorable » un peu jaloux, à mon avis. 🌸",
  "Parler avec toi, c’est un bon moyen de perdre la notion du temps. C’est scientifiquement… probable. 😂",
  "Tu mérites une bonne journée, un bon dessert et zéro message bizarre. (Sauf celui-ci.) 😇",
  "Tu as une façon bien à toi de rendre les choses plus légères. C’est un vrai talent.",
  "Même ton prénom doit être content d’être associé à toi. 😌",
  "Petit doute : tu sais que tu es attachante, ou c’est encore un secret ? 👀",
  "Ton rire devrait avoir son propre générique d’ouverture. 🎬😂",
  "Si la gentillesse avait une ambassadrice, je crois que j’ai une candidate. ❤️",
  "Tu as ce je-ne-sais-quoi… et visiblement, je ne sais vraiment pas comment l’expliquer. 😅",
  "Cette journée vient officiellement de gagner quelques points parce que tu es là. ✨",
  "Tu es aussi agréable qu’une bonne nouvelle… et probablement plus jolie. 😌",
  "Je suis presque sûr que les roses te trouvent de la concurrence. 🌹",
  "Attention : continuer à être aussi adorable peut provoquer des compliments en série. C’est déjà le cas. 😂"
];

const roseMessages = [
  "Celle-ci est pour ton sourire. 🌹",
  "Celle-là parce que tu mérites une petite attention. ❤️",
  "Une petite rose pour une personne qui rend les journées plus jolies. 🌹",
  "Celle-ci garde un petit secret… 👀🌹",
  "Et celle-là, juste parce que j’en avais envie. 😌❤️",
  "Celle-ci te rappelle que tu es vraiment chouette. 🌸",
  "Une rose pour ta bonne humeur… même les jours où elle se cache. 😊"
];

const flowerPositions = [
  { x: 50, y: 24, size: 84, color: "#e8799c" },
  { x: 38, y: 31, size: 76, color: "#f19ab2" },
  { x: 62, y: 31, size: 78, color: "#d9678c" },
  { x: 27, y: 41, size: 71, color: "#e886a3" },
  { x: 50, y: 40, size: 82, color: "#f2a1b8" },
  { x: 73, y: 41, size: 72, color: "#df718f" },
  { x: 39, y: 48, size: 70, color: "#dc7896" },
  { x: 61, y: 49, size: 71, color: "#ed8ca8" }
];

const screens = {
  intro: document.getElementById("introScreen"),
  generator: document.getElementById("generatorScreen"),
  surprise: document.getElementById("surpriseScreen")
};
const startButton = document.getElementById("startButton");
const complimentButton = document.getElementById("complimentButton");
const complimentText = document.getElementById("complimentText");
const complimentCountDisplay = document.getElementById("complimentCount");
const countReaction = document.getElementById("countReaction");
const teaseCard = document.getElementById("teaseCard");
const continueButton = document.getElementById("continueButton");
const unlockArea = document.getElementById("unlockArea");
const surpriseButton = document.getElementById("surpriseButton");
const heartBurst = document.getElementById("heartBurst");
const petalLayer = document.getElementById("petalLayer");
const flowerLayer = document.getElementById("flowerLayer");
const bouquetMessage = document.getElementById("bouquetMessage");
const roseMessage = document.getElementById("roseMessage");
const authorReveal = document.getElementById("authorReveal");
const whatsappCard = document.getElementById("whatsappCard");
const mysteryStage = document.getElementById("mysteryStage");
const mysteryLine = document.getElementById("mysteryLine");
const bouquetContent = document.getElementById("bouquetContent");
const screenAnnouncement = document.getElementById("screenAnnouncement");

let complimentCount = 0;
let previousCompliment = "";
let roseMessageIndex = 0;
let surpriseStarted = false;
let petalInterval = null;

function setActiveScreen(screenName, announcement) {
  Object.entries(screens).forEach(([name, screen]) => {
    const active = name === screenName;
    screen.classList.toggle("is-active", active);
    screen.setAttribute("aria-hidden", String(!active));
    screen.inert = !active;
  });
  if (announcement) screenAnnouncement.textContent = announcement;
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function makeHeartBurst() {
  const hearts = ["♡", "♥", "❤", "✦", "💕"];
  for (let index = 0; index < 13; index += 1) {
    const heart = document.createElement("span");
    heart.className = "burst-heart";
    heart.textContent = hearts[index % hearts.length];
    heart.style.setProperty("--left", `${12 + Math.random() * 76}%`);
    heart.style.setProperty("--size", `${12 + Math.random() * 15}px`);
    heart.style.animationDelay = `${Math.random() * 0.3}s`;
    heartBurst.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1700);
  }
}

function setVisible(element, visible) {
  element.classList.toggle("is-hidden", !visible);
  element.setAttribute("aria-hidden", String(!visible));
}

function getNextCompliment() {
  let next = compliments[Math.floor(Math.random() * compliments.length)];
  if (compliments.length > 1) {
    while (next === previousCompliment) {
      next = compliments[Math.floor(Math.random() * compliments.length)];
    }
  }
  previousCompliment = next;
  return next;
}

function updateCompliment() {
  complimentCount += 1;
  complimentCountDisplay.textContent = String(complimentCount);
  complimentText.textContent = getNextCompliment();
  complimentText.classList.remove("text-in");
  void complimentText.offsetWidth;
  complimentText.style.animation = "none";
  requestAnimationFrame(() => { complimentText.style.animation = "text-in .45s ease both"; });

  if (complimentCount < 5) {
    countReaction.textContent = "";
  } else if (complimentCount < 10) {
    countReaction.textContent = "Eh ben… tu aimes vraiment les compliments toi 😂";
  } else {
    countReaction.textContent = "Bon… je crois que tu commences à prendre goût à ça. 👀😂";
  }
  if (complimentCount >= 3 && complimentCount < 10 && teaseCard.classList.contains("is-hidden")) {
    setVisible(teaseCard, true);
  }
  if (complimentCount >= 10) setVisible(unlockArea, true);
}

function roseArtwork(color, index) {
  const id = `rose-${index}`;
  return `<svg class="rose-svg" viewBox="0 0 100 100" role="presentation" aria-hidden="true">
    <defs>
      <radialGradient id="${id}-petal" cx="38%" cy="27%" r="75%"><stop offset="0" stop-color="#fff0f3"/><stop offset=".24" stop-color="${color}"/><stop offset="1" stop-color="#b83f69"/></radialGradient>
      <radialGradient id="${id}-heart" cx="35%" cy="30%"><stop stop-color="#ffd8e2"/><stop offset="1" stop-color="#ce527a"/></radialGradient>
    </defs>
    <g fill="url(#${id}-petal)" stroke="#d86f91" stroke-width=".8">
      <ellipse cx="50" cy="28" rx="18" ry="27" transform="rotate(-2 50 50)"/>
      <ellipse cx="68" cy="39" rx="18" ry="26" transform="rotate(55 68 39)"/>
      <ellipse cx="65" cy="61" rx="18" ry="26" transform="rotate(112 65 61)"/>
      <ellipse cx="43" cy="68" rx="18" ry="25" transform="rotate(170 43 68)"/>
      <ellipse cx="30" cy="49" rx="18" ry="26" transform="rotate(225 30 49)"/>
      <ellipse cx="43" cy="34" rx="14" ry="21" transform="rotate(35 43 34)" fill="#f5a3b8"/>
      <ellipse cx="59" cy="48" rx="15" ry="20" transform="rotate(115 59 48)" fill="#e77f9d"/>
      <path d="M47 38 C59 30 70 42 62 54 C57 62 45 59 41 52 C36 44 42 37 47 38Z" fill="url(#${id}-heart)" stroke="#ca557b"/>
      <path d="M49 43 C57 37 62 44 57 49 C54 53 48 51 47 48 C45 46 46 44 49 43Z" fill="#b9446d" stroke="none"/>
    </g>
    <g fill="#fff5f6" opacity=".68"><ellipse cx="39" cy="25" rx="3" ry="6" transform="rotate(-35 39 25)"/><ellipse cx="69" cy="42" rx="2" ry="4" transform="rotate(35 69 42)"/></g>
  </svg>`;
}

function createBouquet() {
  flowerPositions.forEach((flower, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "rose-button";
    button.style.setProperty("--x", `${flower.x}%`);
    button.style.setProperty("--y", `${flower.y}%`);
    button.style.setProperty("--size", `${flower.size}px`);
    button.setAttribute("aria-label", `Rose ${index + 1} : découvrir un petit mot`);
    button.innerHTML = roseArtwork(flower.color, index + 1);
    button.addEventListener("click", () => interactWithRose(button));
    flowerLayer.appendChild(button);
  });
}

function interactWithRose(button) {
  button.classList.remove("is-touched");
  void button.offsetWidth;
  button.classList.add("is-touched");
  roseMessage.textContent = roseMessages[roseMessageIndex % roseMessages.length];
  roseMessageIndex += 1;
  roseMessage.classList.remove("is-shown");
  void roseMessage.offsetWidth;
  roseMessage.classList.add("is-shown");
  createTinyHearts(button);
}

function createTinyHearts(button) {
  const rect = button.getBoundingClientRect();
  for (let index = 0; index < 3; index += 1) {
    const heart = document.createElement("span");
    heart.className = "bouquet-heart";
    heart.textContent = index === 1 ? "✦" : "♡";
    heart.style.left = `${rect.left + rect.width / 2 + (Math.random() * 34 - 17)}px`;
    heart.style.top = `${rect.top + rect.height / 2}px`;
    heartBurst.appendChild(heart);
    window.setTimeout(() => heart.remove(), 1600);
  }
}

function createPetal() {
  const petal = document.createElement("span");
  petal.className = "falling-petal";
  petal.style.left = `${Math.random() * 100}%`;
  petal.style.setProperty("--petal-size", `${9 + Math.random() * 10}px`);
  petal.style.setProperty("--duration", `${5.5 + Math.random() * 4.5}s`);
  petal.style.setProperty("--delay", `${Math.random() * 1.8}s`);
  petal.style.setProperty("--drift", `${Math.random() * 170 - 85}px`);
  petal.style.setProperty("--rotation", `${280 + Math.random() * 500}deg`);
  petalLayer.appendChild(petal);
  window.setTimeout(() => petal.remove(), 12000);
}

function startPetals() {
  for (let index = 0; index < 17; index += 1) {
    window.setTimeout(createPetal, index * 120);
  }
  petalInterval = window.setInterval(createPetal, 620);
  window.setTimeout(() => {
    if (petalInterval) {
      window.clearInterval(petalInterval);
      petalInterval = null;
    }
  }, 9500);
}

function wait(milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds));
}

async function revealBouquet() {
  if (surpriseStarted) return;
  surpriseStarted = true;
  setActiveScreen("surprise", "Une petite surprise arrive.");
  mysteryStage.classList.remove("is-gone");
  bouquetContent.classList.remove("is-visible");
  document.getElementById("surpriseScreen").classList.add("is-blooming");
  await wait(1000);
  mysteryLine.textContent = "Une dernière petite surprise… 🌹";
  mysteryLine.animate([{ opacity: 0, transform: "translateY(8px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 500, fill: "both" });
  startPetals();
  await wait(850);
  mysteryStage.classList.add("is-gone");
  bouquetContent.classList.add("is-visible");
  await wait(750);

  const lines = [
    "Je sais que tu aimes les roses…",
    "Alors je me suis dit qu’une petite surprise ne ferait pas de mal. 😊🌹",
    "Ce ne sont peut-être que des roses sur un écran…",
    "…mais l’intention derrière est bien réelle. ❤️"
  ];
  for (const line of lines) {
    const paragraph = document.createElement("p");
    paragraph.textContent = line;
    bouquetMessage.appendChild(paragraph);
    await wait(1150);
  }
  await wait(450);
  setVisible(authorReveal, true);
  const authorIntro = document.getElementById("authorIntro");
  const authorOutro = document.getElementById("authorOutro");
  authorIntro.textContent = "Et si tu te demandes qui a préparé tout ça… 👀";
  await wait(1100);
  document.getElementById("authorName").classList.add("author-name-revealed");
  await wait(650);
  authorOutro.textContent = "Je voulais simplement trouver une petite excuse pour te faire sourire. 😊";
  await wait(850);
  setVisible(whatsappCard, true);
  screenAnnouncement.textContent = "Le bouquet est arrivé. Pour toi, de la part d’Obed.";
}

function openWhatsApp() {
  const message =
`😂 J’ai terminé ton petit site !

J’ai reçu ${complimentCount} compliment${complimentCount > 1 ? "s" : ""} ❤️
Et j’ai découvert la surprise 🌹

Et oui… j’ai souri 😌

— La fille qui vient de découvrir que tout ça venait d’Obed 😂❤️`;

  const whatsappURL =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  window.location.href = whatsappURL;
}

startButton.addEventListener("click", () => {
  makeHeartBurst();
  setActiveScreen("generator", "Générateur spécial de compliments.");
});
complimentButton.addEventListener("click", updateCompliment);
continueButton.addEventListener("click", () => {
  setVisible(teaseCard, false);
  complimentButton.focus();
});
surpriseButton.addEventListener("click", revealBouquet);
document.getElementById("whatsappButton").addEventListener("click", openWhatsApp);

createBouquet();
