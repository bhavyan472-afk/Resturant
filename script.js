// Pollito's — interactions
const img = (id, w = 400) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${w}&fit=crop&q=80`;

const DISHES = [
  { name: "Chicken Bucket", tag: "Sharing", price: 549, img: "1626082927389-6cd097cdc6ec", cats: ["popular", "chicken"],
    short: "Crispy fried chicken · Made for sharing",
    desc: "A bucket of crispy, golden fried chicken — perfect for the whole table." },
  { name: "Regio Festa Burger", tag: "Burger", price: 189, img: "1568901346375-23c9450c58cd", cats: ["popular", "burgers"],
    short: "Loaded burger · Fresh veggies & sauces",
    desc: "A big, loaded burger stacked with fresh lettuce, onion, tomato and sauces in a soft bun." },
  { name: "Rey Grilled Chicken Burger", tag: "Grilled", price: 179, img: "1606755962773-d324e0a13086", cats: ["popular", "burgers", "chicken"],
    short: "Grilled chicken · Soft toasted bun",
    desc: "Juicy grilled chicken with crunchy slaw and creamy sauce in a toasted bun." },
  { name: "Grilled Chicken Wings", tag: "Grilled", price: 219, img: "1608039755401-742074f0548d", cats: ["popular", "chicken", "snacks"],
    short: "Smoky grilled wings · Dipping sauce",
    desc: "Chicken wings grilled until smoky and sticky, served with a dipping sauce." },
  { name: "Chicken Chowmein", tag: "Noodles", price: 149, img: "1585032226651-759b368d7246", cats: ["popular", "rice", "chicken"],
    short: "Wok-tossed noodles · Chicken & veggies",
    desc: "Noodles tossed in the wok with chicken, cabbage, carrot and spring onion." },
  { name: "Regio Festa Burger Meal", tag: "Meal", price: 279, img: "1594212699903-ec8a3eca50f5", cats: ["burgers"],
    desc: "Our Regio Festa Burger served as a meal with a side of crispy french fries." },
  { name: "Crunchy Burger", tag: "Crispy", price: 159, img: "1571091718767-18b5b1457add", cats: ["burgers", "chicken"],
    desc: "A crispy, crunchy chicken patty with lettuce, tomato and mayo." },
  { name: "Mixed Veg Burger", tag: "Veg", price: 119, img: "1550547660-d9450f859349", cats: ["burgers", "veg"],
    desc: "A golden mixed-vegetable patty with fresh lettuce, onion and sauces." },
  { name: "Grilled Chicken Drumstick", tag: "Grilled", price: 199, img: "1567620832903-9fc6debc209f", cats: ["chicken", "snacks"],
    desc: "Chicken drumsticks marinated, grilled and served hot with a dip." },
  { name: "Chicken Nuggets", tag: "Snack", price: 169, img: "1619881590738-a111d176d906", cats: ["chicken", "snacks"],
    desc: "Bite-sized golden chicken nuggets — crispy outside, tender inside." },
  { name: "Chicken Popcorn", tag: "Snack", price: 159, img: "1569058242253-92a9c755a0ec", cats: ["chicken", "snacks"],
    desc: "Crispy, poppable pieces of fried chicken. Great for sharing." },
  { name: "Chicken Wrap", tag: "Wrap", price: 159, img: "1626700051175-6818013e1d4f", cats: ["chicken", "snacks"],
    desc: "Chicken, fresh veggies and sauce rolled up in a soft tortilla." },
  { name: "Tacos", tag: "Snack", price: 149, img: "1565299585323-38d6b0865b47", cats: ["snacks"],
    desc: "Crisp taco shells filled with a savoury filling, fresh veggies and sauce." },
  { name: "Calzone", tag: "Baked", price: 229, img: "1536964549204-cce9eab227bd", cats: ["snacks"],
    desc: "A folded, oven-baked pizza pocket with a cheesy filling." },
  { name: "Veg Nuggets", tag: "Veg", price: 129, img: "1585325701956-60dd9c8553bc", cats: ["snacks", "veg"],
    desc: "Crumbed and fried vegetable nuggets, crispy and golden." },
  { name: "French Fries", tag: "Veg", price: 99, img: "1573080496219-bb080dd4f877", cats: ["snacks", "veg"],
    desc: "Classic golden fries, lightly salted. The perfect side for any burger." },
  { name: "Chicken Fried Rice", tag: "Rice", price: 159, img: "1603133872878-684f208fb84b", cats: ["rice", "chicken"],
    desc: "Wok-fried rice with chicken, egg, vegetables and spring onion." },
  { name: "Veg Fried Rice", tag: "Veg", price: 129, img: "1603133872878-684f208fb84b", cats: ["rice", "veg"],
    desc: "Wok-fried rice with fresh mixed vegetables and spring onion." },
  { name: "Veg Chowmein", tag: "Veg", price: 119, img: "1585032226651-759b368d7246", cats: ["rice", "veg"],
    desc: "Noodles tossed in the wok with cabbage, carrot, capsicum and spring onion." },
];

const money = (n) => `₹${n}`;

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
const PHONE = `<a href="tel:+918732873552">087328 73552</a>`;
const WHATSAPP = "https://wa.me/918732873552?text=Hi%20Pollito%27s%2C%20I%20would%20like%20to%20order";
const HOURS = "10 AM – 8:30 PM";
const ADDRESS = "A Sector, Naharlagun, Arunachal Pradesh 791110";
const ORDER_BTNS = `<a href="tel:+918732873552" class="btn btn--red btn--sm btn--block">Call 087328 73552</a>
     <a href="${WHATSAPP}" target="_blank" rel="noopener" class="btn btn--ghost btn--sm btn--block">WhatsApp us ↗</a>`;
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
    `To book a table, call us at ${PHONE} or send us a message on WhatsApp.${ORDER_BTNS}` }) },
  { re: /deliver|takeout|take.?away|pick.?up|order/, run: () => ({ go: ["pickup"], html:
    `Call or WhatsApp us at ${PHONE} to place your order, then pick it up fresh. You're also welcome to dine in.${ORDER_BTNS}` }) },
  { re: /hour|open|clos|what time|timing/, run: () => ({ html:
    `We're open <strong class="gold">${HOURS}</strong>. Dine-in &amp; takeaway.` }) },
  { re: /contact|phone|number|whats.?app|address|locat|where|direction|call/, run: () => ({ go: ["find"], html:
    `<strong>Pollito's</strong><br />${ADDRESS}<br />Phone / WhatsApp: ${PHONE}<br />Open ${HOURS}.` }) },
  { re: /dessert|sweet|ice.?cream/, run: () => ({ html:
    `Desserts aren't on our online menu. Call or WhatsApp us at ${PHONE} to ask what's available today.` }) },
  { re: /vegetarian|veggie|vegan|\bveg\b/, run: () => ({ go: ["menu", "veg"], html:
    `Here are our veg dishes:${dishList("veg")}` }) },
  { re: /special|popular|recommend|suggest|favou?rite|best|signature/, run: () => ({ go: ["menu", "popular"], html:
    `Customer favourites:${dishList("popular")}` }) },
  { re: /burger/, run: () => ({ go: ["menu", "burgers"], html:
    `Here are our burgers:${dishList("burgers")}` }) },
  { re: /rice|noodle|chow.?mein|chinese/, run: () => ({ go: ["menu", "rice"], html:
    `Fried rice &amp; chowmein:${dishList("rice")}` }) },
  { re: /chicken|non.?veg|meat|wing|drumstick|nugget/, run: () => ({ go: ["menu", "chicken"], html:
    `Here are our chicken dishes:${dishList("chicken")}` }) },
  { re: /appeti|starter|snack|fries|taco|wrap|calzone|pizza/, run: () => ({ go: ["menu", "snacks"], html:
    `Snacks &amp; sides:${dishList("snacks")}` }) },
  { re: /menu|food|dish|eat|hungry/, run: () => ({ go: ["menu", "all"], html:
    `Here's our full menu — use the tabs to filter by category.` }) },
  { re: /story|about|history/, run: () => ({ go: ["story"], html:
    `Pollito's is a family restaurant in A Sector, Naharlagun — here's a little about us.` }) },
];
const FALLBACK = `Sorry, I didn't catch that. Try asking about the <strong>menu</strong>, <strong>opening hours</strong>, <strong>location</strong> or <strong>how to order</strong>.`;
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
  recognition.lang = "en-IN";
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
  if (e.key === "Escape" && va.classList.contains("is-open")) closeVa();
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
    `Hello! 👋 I can help with our <strong>menu</strong>, <strong>hours</strong>, <strong>location</strong> and <strong>how to order</strong>.` }) },
  { re: /thank|thanks|thx/, run: () => ({ html: `You're most welcome! Anything else I can help you with?` }) },
  { re: /price|cost|how much|cheap|expensive|budget/, run: () => {
    const prices = DISHES.map((d) => d.price);
    return { go: ["menu", "all"], html:
      `Dishes on our menu range from <strong>${money(Math.min(...prices))}</strong> to <strong>${money(Math.max(...prices))}</strong>. Most guests spend about <strong>₹200–1,000 per person</strong>.` };
  } },
  { re: /^(show (me )?(the |your )?)?menu\??$|full menu|what.*(serve|have on the menu)/, run: () => {
    const cats = [["popular", "Popular"], ["burgers", "Burgers"], ["chicken", "Chicken"], ["snacks", "Snacks & sides"], ["rice", "Rice & noodles"], ["veg", "Veg"]];
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
    addMsg("bot", `Welcome to <strong>Pollito's</strong>! 🍗 I'm Pollito's Assistant. Ask me about our menu, opening hours, location or how to order.`);
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
  if (e.key === "Escape" && chat.classList.contains("is-open")) { closeChat(); chatFab.focus(); }
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
