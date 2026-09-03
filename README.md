[![Stand With Ukraine](https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner-direct.svg)](https://stand-with-ukraine.pp.ua)

# ПЕРЕМАЙЛЕГОДАЧ

> Веб-додаток, який «перекладає» будь-який текст у мову **Майлего** і назад.

[![Deploy to GitHub Pages](https://github.com/shkibidishprot/peremaylegodach/actions/workflows/deploy.yml/badge.svg)](https://github.com/shkibidishprot/peremaylegodach/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)

**Жива версія:** https://shkibidishprot.github.io/peremaylegodach/

---

## Зміст

- [Про проєкт](#про-проєкт)
- [Можливості](#можливості)
- [Технології](#технології)
- [Структура проєкту](#структура-проєкту)
- [Вимоги](#вимоги)
- [Локальний запуск](#локальний-запуск)
- [Часті проблеми](#часті-проблеми)
- [Ліцензія](#ліцензія)

---

## Про проєкт

«ПЕРЕМАЙЛЕГОДАЧ» — це невеликий інструмент для розваги: пишеш звичайний текст —
отримуєш текст, де перед кожним словом стоїть «Майлего». Працює і у зворотний
бік: прибирає «Майлего» та відновлює великі літери.

## Можливості

- Режим **«В Майлего»** — додає «Майлего» до кожного слова, зберігаючи розбивку на речення.
- Режим **«З Майлего»** — прибирає слово «Майлего» в будь-якому регістрі та відновлює великі літери після крапок.
- Кнопка **«Скопіювати»** результат у буфер обміну.
- Перетворення тексту миттєво, під час введення.
- DVD-логотип, що відскакує від країв екрана, 3D-нахил карток і анімований контур кнопок.

## Технології

- **[Vite 5](https://vitejs.dev)** — dev-сервер і збирач.
- **Vanilla JavaScript (ES Modules)** — без фреймворків.
- **CSS3** — анімації на `@keyframes`, без JS-бібліотек.
- **GitHub Actions + GitHub Pages** — автоматичний деплой.

## Структура проєкту

```
.
├── index.html               # точка входу Vite (розмітка сторінки)
├── vite.config.js           # конфігурація Vite (base-шлях для GitHub Pages)
├── package.json             # залежності та npm-скрипти
├── package-lock.json        # фіксація версій залежностей
├── public/
│   └── assets/
│       └── dvd.jpg          # файли, що копіюються в збірку як є
├── src/
│   ├── main.js              # точка входу: DOM, обробники подій, анімації
│   ├── text.js              # чиста логіка перекладу (без DOM)
│   └── style.css            # стилі та анімації
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI: збірка і публікація на GitHub Pages
├── .gitignore
└── README.md
```

## Вимоги

- **[Node.js](https://nodejs.org/)** версії **18 або новішої** (рекомендовано LTS — 20/22).
- **npm** (встановлюється разом з Node.js).
- Акаунт на GitHub і встановлений **Git**.

Перевірити, що все встановлено:

```bash
node -v
npm -v
git --version
```

## Локальний запуск

1. **Клонувати репозиторій:**

   ```bash
   git clone https://github.com/shkibidishprot/peremaylegodach.git
   cd peremaylegodach
   ```

2. **Встановити залежності** (лише один раз після клонування):

   ```bash
   npm install
   ```

3. **Запустити dev-сервер:**

   ```bash
   npm run dev
   ```

4. **Відкрити в браузері** адресу, яку покаже термінал:

   ```
   Local:   http://localhost:5173/
   ```

Dev-сервер підтримує **гаряче перезавантаження** (HMR): зміни в коді
одразу з'являються в браузері без перезавантаження сторінки.

## Часті проблеми

**`npm: command not found`.**
Не встановлено Node.js — завантаж LTS-версію з [nodejs.org](https://nodejs.org/).

**Помилки під час `npm install`.**
Видали теку `node_modules` і файл `package-lock.json`, потім виконай
`npm install` ще раз.

## Ліцензія

Проєкт розповсюджується за ліцензією [MIT](LICENSE).
Можна вільно використовувати, змінювати та поширювати.
