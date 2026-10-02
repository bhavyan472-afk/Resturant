// Pollito's — opening animation
// A fresh green chilli drops onto the hero dish under gravity, bounces once and settles as garnish.
// Plays once per browser session; afterwards (or with reduced motion) the chilli is simply in place.
import { animate } from "motion";

const garnish = document.getElementById("garnish");
const rot = document.getElementById("garnishRot");
const shadow = document.getElementById("garnishShadow");
const blurStd = document.getElementById("fallBlurStd");
const visual = document.querySelector(".hero__visual");
const dishImg = document.querySelector(".dish__plate img");
const KEY = "pollitos:intro-played";

const settle = () => {
  garnish.classList.add("is-settled");
  shadow.classList.add("is-settled");
};

const played = (() => { try { return sessionStorage.getItem(KEY); } catch { return null; } })();
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const heroInView = () => visual.getBoundingClientRect().bottom > 0;

const whenReady = () => new Promise((resolve) => {
  // wait for the dish photo and the hero's own scroll-reveal, but never hold the animation back for long
  const imgReady = dishImg.complete ? Promise.resolve() : new Promise((r) => { dishImg.addEventListener("load", r, { once: true }); dishImg.addEventListener("error", r, { once: true }); });
  const revealed = new Promise((r) => {
    if (visual.classList.contains("in")) return r();
    const mo = new MutationObserver(() => { if (visual.classList.contains("in")) { mo.disconnect(); r(); } });
    mo.observe(visual, { attributes: true, attributeFilter: ["class"] });
  });
  Promise.race([Promise.all([imgReady, revealed]), new Promise((r) => setTimeout(r, 2500))])
    .then(() => setTimeout(resolve, 350)); // let the dish fade in first
});

const play = () => {
  try { sessionStorage.setItem(KEY, "1"); } catch {}

  // Start fully above the viewport, whatever the screen size.
  const rect = garnish.getBoundingClientRect();
  const drop = -(rect.bottom + 40);
  const bounce = Math.min(16, rect.height * 0.35);
  const drift = -rect.width * 0.25;

  const duration = 1.6;
  const times = [0, 0.55, 0.67, 0.79, 0.89, 1];
  const gravity = [0.11, 0, 0.5, 0];   // ease-in quad: constant acceleration
  const rise = [0.5, 1, 0.89, 1];      // ease-out quad: decelerating on the way up
  const settleEase = [0.45, 0, 0.55, 1];
  const ease = [gravity, rise, gravity, rise, settleEase];

  garnish.style.filter = "url(#fallBlur)";
  garnish.style.opacity = "1";

  const fall = animate(garnish, {
    y: [drop, 0, -bounce, 0, -bounce * 0.3, 0],
    x: [drift, 0, 0, 0, 0, 0],
  }, { duration, times, ease });

  animate(rot, { rotate: [-100, 22, 9, 18, 13, 15] }, {
    duration, times, ease: ["linear", rise, settleEase, rise, settleEase],
  });

  // contact shadow on the dish: grows as the chilli approaches, flexes with each bounce
  animate(shadow, {
    opacity: [0, 0.5, 0.3, 0.5, 0.42, 0.5],
    scale: [0.3, 1, 0.85, 1, 0.95, 1],
    rotate: 15,
  }, { duration, times, ease });

  // vertical motion blur that tracks fall speed (peaks just before impact)
  animate(0, [0, 1.2, 6, 0, 0], {
    duration, times: [0, 0.3, 0.53, 0.57, 1], ease: "linear",
    onUpdate: (v) => blurStd.setAttribute("stdDeviation", `0 ${v.toFixed(2)}`),
  });

  fall.then(() => {
    garnish.style.filter = "";
    settle();
  });
};

if (played || reduced) {
  settle();
} else {
  whenReady().then(() => (heroInView() ? play() : settle()));
}
