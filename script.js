// Kuljit • India — interactions
const img = (id, w = 400) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&q=80`;

const DISHES = [
  { name: "Butter Chicken", tag: "Signature", price: 17.99, img: "1603894584373-5ac82b2ae398", cats: ["popular", "chicken"],
    short: "Pulled in butter · Creamy tomato curry",
    desc: "Tandoor-roasted chicken simmered in a velvety tomato, butter and fenugreek sauce." },
  { name: "Chicken Tikka", tag: "Tandoor", price: 16.99, img: "1610057099443-fde8c4d50f91", cats: ["popular", "chicken", "appetizers"],
    short: "Clay-oven charred · Yogurt & spice marinade",
    desc: "Boneless thigh marinated overnight in yogurt and Kashmiri chilli, charred in the clay oven." },
  { name: "Non-Veg Thali", tag: "Platter", price: 21.99, img: "1585937421612-70a008356fbe", cats: ["popular", "thali", "chicken"],
    short: "Two curries · Rice, naan & raita",
    desc: "Butter chicken, chicken korma, daal makhani, basmati rice, naan, raita and a sweet." },
  { name: "Saag Paneer", tag: "Vegetarian", price: 15.99, img: "1589647363585-f4a7d3877b10", cats: ["popular", "vegetarian"],
    short: "Slow-cooked greens · Fresh paneer",
    desc: "Mustard greens and spinach slow-cooked with garlic and ginger, folded with fresh paneer." },
  { name: "Chicken Biryani", tag: "Dum-cooked", price: 17.49, img: "1589302168068-964664d93dc0", cats: ["popular", "chicken"],
    short: "Saffron basmati · Sealed & slow-steamed",
    desc: "Aged basmati layered with spiced chicken, saffron and fried onions, sealed and dum-cooked." },
  { name: "Samosa (2 pcs)", tag: "Starter", price: 6.49, img: "1601050690597-df0568f70950", cats: ["appetizers", "vegetarian"],
    short: "Crisp pastry · Spiced potato & peas",
    desc: "Hand-folded pastry filled with spiced potato and peas, served with mint and tamarind chutney." },
  { name: "Veg Thali", tag: "Platter", price: 18.99, img: "1546833999-b9f581a1996d", cats: ["thali", "vegetarian"],
    desc: "Saag paneer, daal makhani, chana masala, basmati rice, naan, raita and a sweet." },
  { name: "Daal Makhani", tag: "Vegetarian", price: 13.99, img: "1626500155537-93690c24099e", cats: ["vegetarian"],
    desc: "Black lentils simmered overnight with butter and cream — our family's slowest, richest recipe." },
  { name: "Shahi Paneer", tag: "Vegetarian", price: 15.99, img: "1631452180519-c014fe946bc7", cats: ["vegetarian"],
    desc: "Soft paneer in a royal cashew, cream and cardamom gravy with a hint of saffron." },
  { name: "Aloo Gobi", tag: "Vegan", price: 13.49, img: "1541518763669-27fef04b14ea", cats: ["vegetarian"],
    desc: "Potatoes and cauliflower dry-roasted with turmeric, cumin, ginger and fresh coriander." },
  { name: "Chana Masala", tag: "Vegan", price: 12.99, img: "1582576163090-09d3b6f8a969", cats: ["vegetarian"],
    desc: "Chickpeas in a tangy onion-tomato masala with dried mango and whole Punjabi spices." },
  { name: "Chicken Korma", tag: "Mild", price: 16.99, img: "1574653853027-5382a3d23a15", cats: ["chicken"],
    desc: "Tender chicken in a mild, silky gravy of cashews, cream and gently toasted spices." },
];

const money = (n) => `$${n.toFixed(2)}`;

// ---------- Popular carousel ----------
const carousel = document.getElementById("carousel");
carousel.innerHTML = DISHES.filter((d) => d.short).map((d) => `
  <article class="pcard">
    <div class="pcard__img"><img src="${img(d.img, 400)}" alt="${d.name}" loading="lazy" /></div>
    <h3>${d.name}</h3>
    <p>${d.short}</p>
    <div class="pcard__foot">
      <span class="price">${money(d.price)}</span>
      <button class="add" aria-label="Add ${d.name} to cart">+</button>
    </div>
  </article>`).join("");

const step = () => {
  const card = carousel.querySelector(".pcard");
  return card ? card.offsetWidth + 24 : 300;
};
document.getElementById("next").addEventListener("click", () => {
  const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 4;
  carousel.scrollTo({ left: atEnd ? 0 : carousel.scrollLeft + step(), behavior: "smooth" });
});
document.getElementById("prev").addEventListener("click", () => {
  carousel.scrollBy({ left: -step(), behavior: "smooth" });
});

// ---------- Menu grid + filters ----------
const grid = document.getElementById("menuGrid");
grid.innerHTML = DISHES.map((d) => `
  <article class="mcard" data-cats="${d.cats.join(" ")}">
    <div class="mcard__img"><img src="${img(d.img, 200)}" alt="${d.name}" loading="lazy" /></div>
    <div>
      <div class="mcard__title"><h3>${d.name}</h3><span class="tag">${d.tag}</span></div>
      <p>${d.desc}</p>
    </div>
    <div class="mcard__side">
      <span class="price">${money(d.price)}</span>
      <button class="add" aria-label="Add ${d.name} to cart">+</button>
    </div>
  </article>`).join("");

const tabs = document.getElementById("tabs");
let filterTimer;
tabs.addEventListener("click", (e) => {
  const tab = e.target.closest(".tab");
  if (!tab || tab.classList.contains("active")) return;
  tabs.querySelector(".active").classList.remove("active");
  tab.classList.add("active");
  const f = tab.dataset.filter;
  const cards = [...grid.children];

  clearTimeout(filterTimer);
  cards.forEach((c) => c.classList.add("is-hidden"));
  filterTimer = setTimeout(() => {
    let i = 0;
    cards.forEach((c) => {
      const show = f === "all" || c.dataset.cats.split(" ").includes(f);
      c.classList.toggle("is-gone", !show);
      if (show) {
        const delay = i++ * 45;
        setTimeout(() => c.classList.remove("is-hidden"), 20 + delay);
      }
    });
  }, 300);
});

// ---------- Add to cart ----------
const cartCount = document.getElementById("cartCount");
let count = Number(cartCount.textContent);
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".add");
  if (!btn) return;
  cartCount.textContent = ++count;
  cartCount.classList.remove("bump");
  void cartCount.offsetWidth; // restart animation
  cartCount.classList.add("bump");
  btn.classList.add("added");
  btn.textContent = "✓";
  setTimeout(() => { btn.classList.remove("added"); btn.textContent = "+"; }, 1100);
});

// ---------- Sticky nav + active link ----------
const nav = document.getElementById("nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

const links = [...document.querySelectorAll(".nav__links a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${en.target.id}`));
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach((s) => spy.observe(s));

// ---------- Mobile menu ----------
const burger = document.getElementById("burger");
const navLinks = document.getElementById("navLinks");
burger.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  burger.setAttribute("aria-expanded", open);
});
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", "false"); }
});

// ---------- Login modal ----------
const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginMsg = document.getElementById("loginMsg");
const setLoginMsg = (text, type = "") => { loginMsg.textContent = text; loginMsg.className = `modal__msg ${type}`; };

document.getElementById("loginBtn").addEventListener("click", () => {
  navLinks.classList.remove("open"); burger.setAttribute("aria-expanded", "false");
  setLoginMsg("");
  loginModal.showModal();
});
document.getElementById("loginClose").addEventListener("click", () => loginModal.close());
loginModal.addEventListener("click", (e) => { if (e.target === loginModal) loginModal.close(); });
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!loginForm.checkValidity()) {
    setLoginMsg("Please enter a valid email and a password of at least 6 characters.", "is-error");
    return;
  }
  setLoginMsg("Signed in — welcome back!", "is-ok");
  setTimeout(() => { loginModal.close(); loginForm.reset(); }, 1100);
});

// ---------- Voice assistant ----------
const va = document.getElementById("va");
const vaPanel = document.getElementById("vaPanel");
const vaFab = document.getElementById("vaFab");
const vaListen = document.getElementById("vaListen");
const vaStatus = document.getElementById("vaStatus");
const vaStatusText = document.getElementById("vaStatusText");
const vaYou = document.getElementById("vaYou");
const vaTranscript = document.getElementById("vaTranscript");
const vaReply = document.getElementById("vaReply");
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const PHONE = `<a href="tel:+15550122005">(555) 012-2005</a>`;
let recognition = null;
let listening = false;

const setStatus = (text, isError = false) => {
  vaStatusText.textContent = text;
  vaStatus.classList.toggle("is-error", isError);
};
const reply = (html) => {
  vaReply.innerHTML = html;
  vaReply.classList.remove("is-new");
  void vaReply.offsetWidth; // restart animation
  vaReply.classList.add("is-new");
};
const goTo = (id, filter) => {
  if (filter) tabs.querySelector(`[data-filter="${filter}"]`).click();
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
const dishList = (cat) => `<ul>${DISHES.filter((d) => d.cats.includes(cat))
  .map((d) => `<li><strong>${d.name}</strong> — ${money(d.price)}</li>`).join("")}</ul>`;

// Shared restaurant knowledge — used by both the voice assistant and the chat assistant.
// Each intent returns { html, go? } where `go` = [sectionId, menuFilter?] to show on the page.
// Ordered: more specific intents first ("vegetarian dishes" must not match the generic menu intent).
const INTENTS = [
  { re: /reserv|book|table for/, run: () => ({ html:
    `We take reservations by phone — call us at ${PHONE} and we'll save you a table.
     <a href="tel:+15550122005" class="btn btn--red btn--sm btn--block">Call to reserve</a>` }) },
  { re: /hour|open|clos|what time|timing/, run: () => ({ html:
    `We're open <strong class="gold">every day, 11 AM – 10 PM</strong>, including holidays. Dine-in &amp; takeout.` }) },
  { re: /contact|phone|number|address|locat|where|direction|call/, run: () => ({ go: ["find"], html:
    `<strong>Kuljit • India</strong><br />123 Main Street, Your City, ST 00000<br />Phone: ${PHONE}<br />Open daily 11 AM – 10 PM.` }) },
  { re: /dessert|sweet/, run: () => ({ go: ["menu", "thali"], html:
    `We don't have a separate dessert menu right now, but every <strong>thali</strong> comes with a sweet. Call ${PHONE} to ask about today's sweets.` }) },
  { re: /vegetarian|veggie|vegan|\bveg\b|paneer/, run: () => ({ go: ["menu", "vegetarian"], html:
    `Here are our vegetarian dishes:${dishList("vegetarian")}` }) },
  { re: /special|popular|recommend|suggest|favou?rite|best|signature/, run: () => ({ go: ["menu", "popular"], html:
    `Today's favourites from the kitchen:${dishList("popular")}` }) },
  { re: /chicken|non.?veg|meat/, run: () => ({ go: ["menu", "chicken"], html:
    `Here are our chicken dishes:${dishList("chicken")}` }) },
  { re: /appeti|starter|snack|samosa/, run: () => ({ go: ["menu", "appetizers"], html:
    `Starters to begin with:${dishList("appetizers")}` }) },
  { re: /thali|platter/, run: () => ({ go: ["menu", "thali"], html:
    `Our thali platters:${dishList("thali")}` }) },
  { re: /menu|food|dish|eat|hungry/, run: () => ({ go: ["menu", "all"], html:
    `Here's our full menu — use the tabs to filter by category.` }) },
  { re: /story|about|history/, run: () => ({ go: ["story"], html:
    `We've been a family kitchen since 2005 — here's our story.` }) },
];
const FALLBACK = `Sorry, I didn't catch that. Try asking about the <strong>menu</strong>, <strong>specials</strong>, <strong>opening hours</strong> or <strong>contact details</strong>.`;
const answer = (text) => {
  const q = text.toLowerCase();
  const intent = INTENTS.find((i) => i.re.test(q));
  return intent ? intent.run() : null;
};

const handle = (text) => {
  vaTranscript.textContent = text;
  vaYou.hidden = false;
  const res = answer(text);
  if (res?.go) goTo(...res.go);
  reply(res ? res.html : FALLBACK);
};

const stopListening = () => { if (recognition && listening) recognition.abort(); };

const startListening = () => {
  if (!SpeechRecognition) {
    setStatus("Voice input isn't supported in this browser — tap a suggestion below instead.", true);
    return;
  }
  if (listening) { stopListening(); return; }
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.onstart = () => {
    listening = true;
    va.classList.add("is-listening");
    vaListen.querySelector("span").textContent = "Stop";
    setStatus("Listening… go ahead and speak.");
  };
  recognition.onresult = (e) => {
    const res = e.results[e.results.length - 1];
    const text = res[0].transcript.trim();
    vaTranscript.textContent = text;
    vaYou.hidden = !text;
    if (res.isFinal) handle(text);
  };
  recognition.onerror = (e) => {
    const msg = {
      "not-allowed": "Microphone access is blocked. Please allow the microphone in your browser settings, then try again.",
      "service-not-allowed": "Microphone access is blocked. Please allow the microphone in your browser settings, then try again.",
      "no-speech": "I didn't hear anything. Tap Speak and try again.",
      "audio-capture": "No microphone was found. Check that one is connected.",
      "network": "Voice recognition needs an internet connection. Please try again.",
    }[e.error];
    if (msg) setStatus(msg, true);
  };
  recognition.onend = () => {
    listening = false;
    va.classList.remove("is-listening");
    vaListen.querySelector("span").textContent = "Speak";
    if (!vaStatus.classList.contains("is-error")) setStatus("Tap Speak to ask something else.");
  };

  setStatus("Your browser may ask for microphone permission — please allow it.");
  try { recognition.start(); } catch { setStatus("Couldn't start the microphone. Please try again.", true); }
};

const openVa = () => {
  va.classList.add("is-open");
  vaPanel.setAttribute("aria-hidden", "false");
  vaFab.setAttribute("aria-expanded", "true");
  vaFab.setAttribute("aria-label", "Start or stop voice input");
};
const closeVa = () => {
  stopListening();
  va.classList.remove("is-open");
  vaPanel.setAttribute("aria-hidden", "true");
  vaFab.setAttribute("aria-expanded", "false");
  vaFab.setAttribute("aria-label", "Open voice assistant");
  vaFab.focus();
};

vaFab.addEventListener("click", () => {
  if (!va.classList.contains("is-open")) openVa();
  startListening();
});
vaListen.addEventListener("click", startListening);
document.getElementById("vaStop").addEventListener("click", closeVa);
document.getElementById("vaClose").addEventListener("click", closeVa);
document.getElementById("vaChips").addEventListener("click", (e) => {
  const chip = e.target.closest("button");
  if (!chip) return;
  stopListening();
  handle(chip.textContent);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && va.classList.contains("is-open") && !loginModal.open) closeVa();
});
if (!SpeechRecognition) setStatus("Voice input isn't supported in this browser — tap a suggestion below.", true);

// ---------- AI chat assistant ----------
// No AI API is configured in this project, so replies come from the local restaurant
// knowledge above (INTENTS). To plug in a real model later, make getBotReply call it.
const chat = document.getElementById("chat");
const chatBox = document.getElementById("chatBox");
const chatFab = document.getElementById("chatFab");
const chatLog = document.getElementById("chatLog");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatSend = chatForm.querySelector(".chat__send");
let chatBusy = false;

const CHAT_EXTRAS = [
  { re: /^(hi|hello|hey|namaste|good (morning|afternoon|evening))( there)?[!.]*$/, run: () => ({ html:
    `Namaste! 🙏 I can help with our <strong>menu</strong>, <strong>specials</strong>, <strong>hours</strong>, <strong>location</strong> and <strong>reservations</strong>.` }) },
  { re: /thank|thanks|thx/, run: () => ({ html: `You're most welcome! Anything else I can help you with?` }) },
  { re: /price|cost|how much|cheap|expensive/, run: () => {
    const prices = DISHES.map((d) => d.price);
    return { go: ["menu", "all"], html:
      `Our dishes range from <strong>${money(Math.min(...prices))}</strong> to <strong>${money(Math.max(...prices))}</strong>. Thalis — a full platter — start at ${money(Math.min(...DISHES.filter((d) => d.cats.includes("thali")).map((d) => d.price)))}.` };
  } },
  { re: /deliver|takeout|take.?away|pick.?up|order/, run: () => ({ go: ["pickup"], html:
    `We offer <strong>dine-in &amp; takeout</strong>. Call ahead at ${PHONE} and your order will be fresh and ready for pickup.` }) },
  { re: /^(show (me )?(the |your )?)?menu\??$|full menu|what.*(serve|have on the menu)/, run: () => {
    const cats = [["popular", "Popular"], ["appetizers", "Appetizers"], ["chicken", "Chicken"], ["vegetarian", "Vegetarian"], ["thali", "Thali"]];
    return { go: ["menu", "all"], html:
      `Our menu has <strong>${DISHES.length} dishes</strong>:<ul>${cats.map(([c, label]) =>
        `<li><strong>${label}</strong> — ${DISHES.filter((d) => d.cats.includes(c)).length} dishes</li>`).join("")}</ul>Ask me about any category, or tap below to browse.` };
  } },
];

const getBotReply = async (text) => {
  const q = text.toLowerCase().trim();
  const extra = CHAT_EXTRAS.find((i) => i.re.test(q));
  return (extra ? extra.run() : answer(text)) || { html: FALLBACK };
};

const scrollChat = () => chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: "smooth" });
const addMsg = (who, content, go) => {
  const el = document.createElement("div");
  el.className = `msg msg--${who}`;
  if (who === "user") el.textContent = content; // user input is never rendered as HTML
  else el.innerHTML = content;
  if (go) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "msg__go";
    btn.textContent = "Show on page ↓";
    btn.addEventListener("click", () => {
      goTo(...go);
      if (window.innerWidth < 700) closeChat(); // give small screens the view back
    });
    el.append(btn);
  }
  chatLog.append(el);
  scrollChat();
  return el;
};

const sendChat = async (text) => {
  text = text.trim();
  if (!text || chatBusy) return;
  chatBusy = true;
  chatSend.disabled = true;
  addMsg("user", text);
  chatInput.value = "";
  const typing = addMsg("bot", "<i></i><i></i><i></i>");
  typing.classList.add("msg--typing");
  typing.setAttribute("aria-label", "Assistant is typing");
  const [res] = await Promise.all([getBotReply(text), new Promise((r) => setTimeout(r, 650 + Math.random() * 500))]);
  typing.remove();
  addMsg("bot", res.html, res.go);
  chatBusy = false;
  chatSend.disabled = false;
};

const openChat = () => {
  if (va.classList.contains("is-open")) closeVa();
  chat.classList.add("is-open");
  chatBox.setAttribute("aria-hidden", "false");
  chatFab.setAttribute("aria-expanded", "true");
  chatFab.setAttribute("aria-label", "Close chat assistant");
  if (!chatLog.children.length) {
    addMsg("bot", `Welcome to <strong>Kuljit • India</strong>! 🍛 I'm your concierge. Ask me about our menu, today's specials, opening hours, location or reservations.`);
  }
  if (window.matchMedia("(pointer: fine)").matches) setTimeout(() => chatInput.focus(), 350);
};
const closeChat = () => {
  chat.classList.remove("is-open");
  chatBox.setAttribute("aria-hidden", "true");
  chatFab.setAttribute("aria-expanded", "false");
  chatFab.setAttribute("aria-label", "Open chat assistant");
};

chatFab.addEventListener("click", () => (chat.classList.contains("is-open") ? closeChat() : openChat()));
document.getElementById("chatClose").addEventListener("click", () => { closeChat(); chatFab.focus(); });
chatForm.addEventListener("submit", (e) => { e.preventDefault(); sendChat(chatInput.value); });
document.getElementById("chatChips").addEventListener("click", (e) => {
  const chip = e.target.closest("button");
  if (chip) sendChat(chip.textContent);
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && chat.classList.contains("is-open") && !loginModal.open) { closeChat(); chatFab.focus(); }
});
// Only one floating assistant open at a time.
vaFab.addEventListener("click", closeChat);

// ---------- Scroll reveal ----------
const revealer = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); revealer.unobserve(en.target); }
  });
}, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal, .reveal-title").forEach((el) => {
  // stagger siblings slightly for a cinematic cascade
  const siblings = [...el.parentElement.children].filter((c) => c.matches(".reveal, .reveal-title"));
  el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 90}ms`;
  revealer.observe(el);
});

document.getElementById("year").textContent = new Date().getFullYear();
