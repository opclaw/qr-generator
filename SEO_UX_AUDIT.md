# SEO & UX/UI Аудит — QR Code Generator

## 📊 Общая оценка

| Категория | Статус | Балл |
|-----------|--------|------|
| SEO-критичные элементы | ⚠️ Частично | 7/10 |
| UX/UI | ⚠️ Есть проблемы | 6/10 |
| Accessibility | ❌ Требует внимания | 4/10 |
| **Итого** | **⚠️ Требует доработки** | **5.5/10** |

---

## 1. SEO-критичные элементы

### ✅ Сделано хорошо

| Элемент | Статус | Комментарий |
|---------|--------|-------------|
| `<title>` | ✅ | "QR Code Generator — Create QR Codes \| Free Online Tool" — оптимальная длина |
| `meta description` | ✅ | 70 символов, есть CTA |
| `viewport` | ✅ | width=device-width, initial-scale=1 |
| `lang="en"` | ✅ | Указан язык страницы |
| `meta keywords` | ✅ | Присутствуют (устаревший, но не вредит) |
| `meta author` | ✅ | SmartOK Tools |
| `robots index,follow` | ✅ | Корректная индексация |
| Open Graph | ✅ | og:title, og:description, og:url, og:site_name, og:locale, og:type |
| Twitter Card | ✅ | twitter:card, twitter:title, twitter:description |
| JSON-LD Schema.org | ✅ | SoftwareApplication тип с offers |

### ❌ Критические проблемы SEO

| Приоритет | Проблема | Влияние | Решение |
|-----------|----------|---------|---------|
| 🔴 **Высокий** | **Отсутствует `og:image`** | Плохое отображение в соцсетях, низкая кликабельность | Добавить `<meta property="og:image" content="/og-image.png">` |
| 🔴 **Высокий** | **Отсутствует `twitter:image`** | Карточка Twitter без изображения | Добавить `<meta name="twitter:image" content="/og-image.png">` |
| 🔴 **Высокий** | **Нет `robots.txt`** | Поисковики не знают правил сканирования | Создать `public/robots.txt` с `User-agent: *\nAllow: /` |
| 🔴 **Высокий** | **Нет `sitemap.xml`** | Медленная индексация, неполное обнаружение страниц | Создать `public/sitemap.xml` или использовать `next-sitemap` |
| 🟡 **Средний** | **Нет canonical URL** | Возможные проблемы с дублированием контента | Добавить `<link rel="canonical" href="https://qr-generator.vercel.app/" />` |
| 🟡 **Средний** | **Нет hreflang** | Для мультиязычности (если планируется) | Добавить если будут переводы |

### 📝 JSON-LD улучшения

**Текущие проблемы:**
- Нет `aggregateRating` — уменьшает CTR в поиске
- Нет `screenshot` — теряется визуальное привлечение
- Нет `softwareVersion`

**Рекомендуемая структура:**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "QR Code Generator",
  "applicationCategory": "UtilitiesApplication",
  "operatingSystem": "Any",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "1250"
  },
  "screenshot": "https://qr-generator.vercel.app/screenshot.png"
}
```

---

## 2. Semantic HTML

### ⚠️ Проблемы структуры

| Приоритет | Проблема | Текущий код | Рекомендуемое решение |
|-----------|----------|-------------|----------------------|
| 🔴 **Высокий** | **Два H1 заголовка** | `<h1>` в header и `<h2>` в hero, но hero — это главный заголовок | Hero должен быть `<h1>`, в header — `<span>` или убрать скрытый дубль |
| 🟡 **Средний** | **Hero использует h2** | `<h2 class="text-4xl...">QR Code Generator</h2>` | `<h1>` для главного заголовка страницы |
| 🟡 **Средний** | **Нет `<main>` контейнера для контента** | Используется `<main>` но снаружи flex-контейнера | Пересмотреть вложенность |
| 🟢 **Низкий** | **Header без `<nav>`** | Просто `<header>` с логотипом | Если будут ссылки — обернуть в `<nav>` |
| 🟢 **Низкий** | **Section без aria-label** | `<section class="bg-white...">` | Добавить `aria-label="Hero section"` |

### Текущая иерархия заголовков
```
❌ НЕКОРРЕКТНО:
├── header
│   └── h1 "QR Generator" (дублирует основной смысл)
└── section (hero)
    └── h2 "QR Code Generator" (должен быть h1)
```

**Рекомендуемая структура:**
```
✅ КОРРЕКТНО:
├── header
│   └── span.text-xl "QR Generator" (не h1)
└── section (hero)
    └── h1 "QR Code Generator" (главный заголовок)
```

---

## 3. Изображения (alt-теги)

| Приоритет | Элемент | Текущий alt | Статус | Рекомендация |
|-----------|---------|-------------|--------|--------------|
| 🟡 **Средний** | QR код | `alt="QR Code"` | ⚠️ | `alt="Generated QR code for ${text}"` — динамический контекст |

**Проблема:** Статичный alt не даёт контекста пользователям скринридеров о содержимом QR-кода.

---

## 4. UX/UI Анализ

### Визуальная иерархия

| Аспект | Статус | Комментарий |
|--------|--------|-------------|
| Header | ✅ | Чистый, логотип + название понятны |
| Hero section | ✅ | Хороший контраст, понятное назначение |
| Контентная область | ⚠️ | Карточка с QR — ок, но есть проблемы с формами |
| Footer | ✅ | Минималистичный, не отвлекает |

### ⚠️ UX Проблемы

| Приоритет | Проблема | Описание | Решение |
|-----------|----------|----------|---------|
| 🔴 **Высокий** | **Нет превью QR при загрузке** | Пустая карточка до ввода — непонятно что делать | Показывать placeholder QR или пример |
| 🔴 **Высокий** | **Нет валидации URL** | Можно ввести любой текст, даже невалидный URL | Добавить валидацию и подсказки |
| 🔴 **Высокий** | **Кнопка Download всегда активна** | Скачать можно даже с пустым полем | Дизейблить когда нет контента |
| 🟡 **Средний** | **Нет типов QR-кодов** | Только текст/URL, нет WiFi, vCard, email | Добавить табы/селектор типов |
| 🟡 **Средний** | **Нет обратной связи** | Нет toast-уведомлений при скачивании | Добавить уведомление "QR downloaded!" |
| 🟡 **Средний** | **Нет истории/избранного** | Каждый раз вводить заново | LocalStorage для истории |
| 🟢 **Низкий** | **Нет кнопки "Copy link"** | Только скачивание, нельзя поделиться | Добавить кнопку копирования URL |

### Отступы и сетка

| Аспект | Статус | Проблема |
|--------|--------|----------|
| Мобильные отступы | ✅ | `px-4` на мобильных — ок |
| Desktop отступы | ✅ | `sm:px-6 lg:px-8` — ок |
| Вертикальные отступы | ⚠️ | Hero `py-12 md:py-16` — может быть многовато |
| Карточка QR | ✅ | `p-6 md:p-8` — хорошо |

### Типографика и контраст

| Элемент | Размер | Контраст | Статус |
|---------|--------|----------|--------|
| Hero H2 | text-4xl/md:text-5xl | slate-900 на white | ✅ Отличный |
| Подзаголовок | text-lg/md:text-xl | slate-600 | ✅ Хороший |
| Label формы | text-sm | slate-700 | ✅ Хороший |
| Input text | base | slate-900 | ✅ Отличный |
| Footer text | text-sm | slate-400 на slate-900 | ⚠️ **4.6:1 — на грани** |

**⚠️ Footer contrast:** `text-slate-400` на `bg-slate-900` даёт ~4.6:1 — это ниже рекомендуемых 7:1 для мелкого текста. Рекомендуется `text-slate-300`.

---

## 5. Accessibility (a11y)

### ❌ Критические проблемы

| Приоритет | Проблема | WCAG | Решение |
|-----------|----------|------|---------|
| 🔴 **Высокий** | **Input без `for` + `id`** | 1.3.1, 3.3.2 | `<label htmlFor="content">` + `<input id="content">` |
| 🔴 **Высокий** | **Range input без `aria-valuenow`** | 4.1.2 | Добавить `aria-valuenow={size}` |
| 🔴 **Высокий** | **Кнопка Download без `aria-label`** | 2.4.4 | `aria-label="Download QR code as PNG"` |
| 🔴 **Высокий** | **Кнопка с эмодзи без подписи** | 1.1.1 | Скрытый текст или aria-label |
| 🟡 **Средний** | **Нет `skip-to-content` ссылки** | 2.4.1 | Добавить для клавиатурной навигации |
| 🟡 **Средний** | **Нет focus indicators** | 2.4.7 | Убедиться что focus-visible работает |
| 🟢 **Низкий** | **Нет декларации доступности** | - | Ссылка на accessibility statement |

### Текущие проблемы в коде:

```tsx
// ❌ ПЛОХО — label не связан с input
<label className="block text-sm...">Content</label>
<input type="text" ... />

// ❌ ПЛОХО — кнопка без контекста
<button onClick={downloadQR}>
  💾 Download QR Code
</button>

// ✅ ХОРОШО
<label htmlFor="qr-content" className="block text-sm...">
  Content
</label>
<input id="qr-content" type="text" ... />

<button 
  onClick={downloadQR}
  aria-label="Download QR code as PNG image"
>
  <span aria-hidden="true">💾</span>
  Download QR Code
</button>
```

---

## 6. Мобильная адаптивность

| Аспект | Статус | Комментарий |
|--------|--------|-------------|
| Viewport | ✅ | Настроен корректно |
| Responsive breakpoints | ✅ | sm:, md:, lg: — стандартные Tailwind |
| Touch targets | ⚠️ | Кнопка Download 44px+ — ок, но range input может быть мелким |
| Font scaling | ✅ | rem единицы |
| Landscape mode | ⚠️ | Не проверено, hero может занимать много места |

**Рекомендации:**
- Range input: добавить `h-6` для увеличения touch area
- Hero на landscape: ограничить max-height или скрыть часть на очень маленьких высотах

---

## 7. Интерактивные состояния

| Элемент | Hover | Focus | Active | Disabled | Статус |
|---------|-------|-------|--------|----------|--------|
| Input | ✅ border-indigo-500 | ✅ ring-2 | ❓ | — | ⚠️ Нет disabled стейта |
| Range slider | ❌ | ❌ | ❌ | — | ❌ Нет стилей |
| Download button | ✅ bg-fuchsia-700 | ❓ | ❓ | ❌ | ⚠️ Focus не виден, нет disabled |
| Header (логотип) | ❌ | ❌ | — | — | ❌ Нет интерактивности |

**Проблемы:**
1. Range input использует нативный — нет кастомного оформления
2. Кнопка Download не меняется при active
3. Нет стейта loading (при генерации QR)

---

## 📋 Приоритетный план исправлений

### 🔴 Критический (выполнить в первую очередь)

1. **Добавить og:image и twitter:image**
   ```tsx
   // layout.tsx
   openGraph: {
     images: ['/og-image.png'],
   },
   twitter: {
     images: ['/og-image.png'],
   }
   ```

2. **Создать robots.txt и sitemap.xml**
   ```
   // public/robots.txt
   User-agent: *
   Allow: /
   Sitemap: https://qr-generator.vercel.app/sitemap.xml
   ```

3. **Исправить иерархию заголовков**
   - Hero: `<h2>` → `<h1>`
   - Header logo: `<h1>` → `<span>`

4. **Добавить label связи с input**
   ```tsx
   <label htmlFor="content">Content</label>
   <input id="content" ... />
   ```

5. **Улучшить контраст footer**
   ```tsx
   <footer className="bg-slate-900 text-slate-300">
   ```

### 🟡 Высокий (улучшение UX)

6. Добавить валидацию URL и подсказки
7. Добавить disabled состояние кнопки Download
8. Добавить aria-labels для кнопок
9. Добавить placeholder QR при загрузке
10. Добавить toast-уведомления

### 🟢 Средний (полировка)

11. Кастомный стиль для range input
12. Добавить skip-to-content ссылку
13. Добавить canonical URL
14. Улучшить JSON-LD (aggregateRating, screenshot)
15. Добавить history в localStorage

---

## 🎯 Быстрые wins (30 минут)

```tsx
// layout.tsx — добавить:
export const metadata: Metadata = {
  // ... existing
  alternates: {
    canonical: 'https://qr-generator.vercel.app/',
  },
  openGraph: {
    // ... existing
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'QR Code Generator',
    }],
  },
  twitter: {
    // ... existing  
    images: ['/og-image.png'],
  },
}
```

```tsx
// page.tsx — исправить:
<header>
  <h1 className="text-xl font-bold">QR Generator</h1> 
  {/* → */}
  <span className="text-xl font-bold">QR Generator</span>
</header>

<section>
  <h2 className="text-4xl...">QR Code Generator</h2>
  {/* → */}
  <h1 className="text-4xl...">QR Code Generator</h1>
</section>
```

---

**Вывод:** Проект имеет хорошую базовую SEO-структуру, но требует доработки критических элементов (og:image, robots.txt, sitemap). UX/UI на уровне "минимально работающий продукт", но есть значительный потенциал для улучшения accessibility и пользовательского опыта.
