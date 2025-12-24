import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// 🔑 Firebase config (uit Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyAvVdZVpI0YxfP10JPrOJPtGEx_xVcsKcE",
  authDomain: "kaasplank-d9094.firebaseapp.com",
  projectId: "kaasplank-d9094",
  storageBucket: "kaasplank-d9094.firebasestorage.app",
  messagingSenderId: "928296967478",
  appId: "1:928296967478:web:21f05cff40bdd154ff2797",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Kaas uit querystring
const params = new URLSearchParams(window.location.search);
const cheese = params.get("kaas");

const title = document.getElementById("title");
title.innerText = cheese
  ? `Beoordeel: ${cheese.replaceAll("-", " ")}`
  : "Onbekende kaas";

// Slider UI
const slider = document.getElementById("score");
const value = document.getElementById("value");
value.innerText = slider.value;

slider.addEventListener("input", () => {
  value.innerText = slider.value;
});

// Stem opslaan
document.getElementById("submit").addEventListener("click", async () => {
  if (!cheese) return;

  await addDoc(collection(db, "ratings"), {
    cheese,
    score: Number(slider.value),
    timestamp: Date.now(),
  });

  document.getElementById("msg").innerText = "Dank! 🧀";
});
