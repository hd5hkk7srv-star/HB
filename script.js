/* ================= БАЗА ================= */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent; /* 📱 убирает синюю вспышку при тапе */
}

html, body {
  height: 100%;
  overflow: hidden;
  font-family: 'Georgia', serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at center, #1a1a3e 0%, #0d0d1a 60%, #000 100%);
  position: relative;

  /* 📱 МОБИЛЬНАЯ ПРАВКА: используем dvh вместо vh — учитывает адресную строку */
  min-height: 100vh;
  min-height: 100dvh;

  /* 📱 защита от горизонтального скролла */
  overflow-x: hidden;

  /* 📱 отключаем выделение текста при долгом тапе */
  -webkit-user-select: none;
  user-select: none;
}

/* ================= ЗВЁЗДЫ ================= */
.stars {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.star {
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: twinkle 3s infinite ease-in-out;
}

[club66008961|@keyframes] twinkle {
  0%, 100% { opacity: 0.2; }
  50%      { opacity: 1; }
}

/* ================= СВЕЧЕНИЕ ================= */
.glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 600px;
  height: 600px;
  transform: translate(-50%, -50%);
  background: radial-gradient(circle, rgba(255, 180, 80, 0.15) 0%, transparent 70%);
  animation: pulse 4s infinite ease-in-out;
  pointer-events: none;
}

[club66008961|@keyframes] pulse {
  0%, 100% { transform: translate(-50%, -50%) scale(1); }
  50%      { transform: translate(-50%, -50%) scale(1.3); }
}

/* ================= КАНВАС ================= */
#confetti-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 20;
}

/* ================= ЭКРАНЫ ================= */
.screen {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 20px;
  transition: opacity 0.8s ease, transform 0.8s ease;

  /* 📱 МОБИЛЬНАЯ ПРАВКА: не даём экрану вылезти за пределы viewport */
  width: 100%;
  max-width: 100vw;

  /* 📱 учёт «безопасных зон» (чёлка, скругления) */
  padding-left: max(20px, env(safe-area-inset-left));
  padding-right: max(20px, env(safe-area-inset-right));
  padding-bottom: max(20px, env(safe-area-inset-bottom));
}

.screen.hidden {
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  pointer-events: none;
  position: absolute;
}

/* ================= ЭКРАН 1: ФОТО + ВОПРОС ================= */
.photo-wrap {
  margin-bottom: 24px;
  animation: fadeUp 1.2s ease-out both;
}

.photo {
  /* 📱 МОБИЛЬНАЯ ПРАВКА: уменьшены минимальные размеры, чтобы влезало на маленьких экранах */
  width: clamp(140px, 32vw, 260px);
  height: clamp(140px, 32vw, 260px);
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid rgba(255, 227, 163, 0.7);
  box-shadow:
    0 0 30px rgba(255, 200, 100, 0.45),
    0 0 60px rgba(255, 150, 80, 0.25);
  animation: photoGlow 3s ease-in-out infinite;
  display: block;
  margin: 0 auto;
}

[club66008961|@keyframes] photoGlow {
  0%, 100% { box-shadow: 0 0 30px rgba(255, 200, 100, 0.45), 0 0 60px rgba(255, 150, 80, 0.25); }
  50%      { box-shadow: 0 0 45px rgba(255, 220, 130, 0.75), 0 0 90px rgba(255, 150, 80, 0.45); }
}

.question-text {
  font-size: clamp(1.6rem, 6vw, 3rem);
  color: #ffe3a3;
  margin-bottom: 40px;
  letter-spacing: 1px;
  animation: fadeUp 1.2s ease-out 0.2s both;
  /* 📱 длинное слово не вылезет за экран */
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.buttons {
  display: flex;
  gap: 24px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.btn-yes,
.btn-no {
  border: none;
  font-size: 1.3rem;
  font-family: inherit;
  letter-spacing: 2px;
  border-radius: 50px;
  cursor: pointer;
  padding: 18px 60px;
  transition: transform 0.2s, box-shadow 0.2s, left 0.25s ease, top 0.25s ease;

  /* 📱 критично для тача: увеличиваем зону нажатия и отключаем задержку */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;

  /* 📱 кнопка не должна расти при двойном тапе */
  min-width: 120px;
}

/* Да */
.btn-yes {
  background: linear-gradient(135deg, #ff6b6b, #ff8e53);
  color: white;box-shadow: 0 0 25px rgba(255, 107, 107, 0.6);
  animation: fadeUp 1.2s ease-out 0.4s both;
}

/* 📱 МОБИЛЬНАЯ ПРАВКА: hover только на устройствах с мышью */
[id705766|hover: hover] {
  .btn-yes:hover {
    transform: scale(1.08);
    box-shadow: 0 0 45px rgba(255, 107, 107, 0.95);
  }
}

.btn-yes:active {
  transform: scale(0.95);
}

/* Нет */
.btn-no {
  background: rgba(255, 255, 255, 0.08);
  color: #cfcfdf;
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: fadeUp 1.2s ease-out 0.6s both;
  position: relative;
}

.btn-no.runaway {
  position: fixed;
  z-index: 30;
}

/* ================= ЭКРАН 2 ================= */
.screen--greeting h1 {
  font-size: clamp(2rem, 8vw, 5rem);
  background: linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #ff6b6b);
  background-size: 300% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: shine 5s linear infinite;
  margin-bottom: 10px;
  letter-spacing: 2px;
  filter: drop-shadow(0 0 25px rgba(255, 200, 100, 0.4));
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.screen--greeting h2 {
  font-size: clamp(1.2rem, 4vw, 2rem);
  color: #ffe3a3;
  margin-bottom: 30px;
  font-weight: 400;
  letter-spacing: 1px;
}

.screen--greeting .message {
  max-width: 600px;
  margin: 0 auto 40px;
  color: #d0d0e0;
  font-size: clamp(1rem, 2.5vw, 1.2rem);
  line-height: 1.7;
  font-style: italic;
}

.btn-again {
  background: transparent;
  border: 2px solid rgba(255, 227, 163, 0.6);
  color: #ffe3a3;
  padding: 12px 32px;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 1px;
  transition: background 0.2s, transform 0.2s;
  touch-action: manipulation;
}

[id705766|hover: hover] {
  .btn-again:hover {
    background: rgba(255, 227, 163, 0.1);
    transform: scale(1.05);
  }
}

/* ================= АНИМАЦИИ ================= */
[club66008961|@keyframes] fadeUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}

[club66008961|@keyframes] shine {
  to { background-position: 300% center; }
}

[club66008961|@keyframes] beat {
  0%, 100% { transform: scale(1); }
  25%      { transform: scale(1.25); }
}

.heart {
  display: inline-block;
  color: #ff4d6d;
  animation: beat 1.2s infinite;
}

.screen--greeting:not(.hidden) h1 {
  animation: fadeUp 0.8s ease-out both, shine 5s linear infinite;
}
.screen--greeting:not(.hidden) h2 {
  animation: fadeUp 0.8s ease-out 0.25s both;
}
.screen--greeting:not(.hidden) .message {
  animation: fadeUp 0.8s ease-out 0.5s both;
}
.screen--greeting:not(.hidden) .btn-again {
  animation: fadeUp 0.8s ease-out 0.75s both;
}

/* =====================================================
   📱 МОБИЛЬНАЯ АДАПТАЦИЯ (медиа-запросы)
   ===================================================== */

/* Маленькие телефоны (высота ≤ 700px) — уменьшаем отступы */
[id705766|max-height: 700px] {
  .photo {
    width: clamp(110px, 26vw, 180px);
    height: clamp(110px, 26vw, 180px);
  }
  .photo-wrap { margin-bottom: 16px; }
  .question-text { margin-bottom: 24px; }
  .btn-yes, .btn-no { padding: 14px 44px; font-size: 1.1rem; }
  .screen--greeting h1 { font-size: clamp(1.6rem, 6vw, 3rem); }
  .screen--greeting h2 { margin-bottom: 16px; }
  .screen--greeting .message { margin-bottom: 24px; }
}

/* Узкие экраны (ширина ≤ 420px) — кнопки столбиком */
[id705766|max-width: 420px] {
  .buttons {
    flex-direction: column;
    gap: 14px;
  }
  .btn-yes, .btn-no {
    width: 100%;
    max-width: 260px;
    padding: 16px 20px;
  }
  .question-text { font-size: clamp(1.4rem, 7vw, 2rem); }
}

/* Уменьшенная анимация для слабых устройств — экономит батарею */
[id705766|prefers-reduced-motion: reduce] {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

/* Ландшафтная ориентация на телефоне — прячем часть декора */
[id705766|max-height: 500px] and (orientation: landscape) {
  .photo { width: 90px; height: 90px; }
  .photo-wrap { margin-bottom: 8px; }
  .question-text {font-size: 1.2rem; margin-bottom: 14px; }
}