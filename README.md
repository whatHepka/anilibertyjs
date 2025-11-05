# AniLiberty.js

🎌 Полноценный Node.js клиент для AniLiberty API V1 с полным покрытием всех endpoints

[![npm version](https://img.shields.io/npm/v/anilibertyjs.svg)](https://www.npmjs.com/package/anilibertyjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16.0.0-green.svg)](https://nodejs.org/)

## 📖 Документация

- 🌐 [**HTML Документация**](https://anilibertyjs.whathepka.xyz/index.html) - Красивая интерактивная документация
- 📚 [Справочник API](https://anilibertyjs.whathepka.xyz/api-reference.html) - Все методы с примерами
- 📝 [Справочник типов](https://anilibertyjs.whathepka.xyz/types-reference.html) - TypeScript интерфейсы

## 🚀 Установка

```bash
npm install anilibertyjs
```

## ✨ Возможности

- ✅ **Полное покрытие API** - 60+ методов AniLiberty API V1
- ✅ **TypeScript из коробки** - полная типизация
- ✅ **Авторизация** - логин/пароль, OTP, социальные сети (VK, Discord, Google)
- ✅ **Каталог и поиск** - фильтры, сортировка, пагинация
- ✅ **Избранное** - управление избранными релизами
- ✅ **Коллекции** - создание и управление коллекциями
- ✅ **История просмотров** - отслеживание прогресса
- ✅ **Расписание** - расписание выхода эпизодов
- ✅ **Торренты** - просмотр и скачивание
- ✅ **Справочники** - жанры, типы, сезоны, рейтинги

## 📦 Быстрый старт

```javascript
const { AniLibertyClient, isSuccess } = require('anilibertyjs');

// Создаем клиент
const client = new AniLibertyClient();

// Получаем последние обновления
async function getLatestAnime() {
  const updates = await client.getUpdates({ limit: 5 });
  
  if (isSuccess(updates)) {
    updates.data.forEach(anime => {
      console.log(`${anime.title.ru} - ${anime.episodes_released} эп.`);
    });
  }
}

getLatestAnime();
```

## 🔑 Основные методы

### Авторизация

```javascript
// Логин и пароль
await client.login({
  login: 'username',
  password: 'password'
});

// OTP
const otpResponse = await client.otpGet({ device_id: 'device-id' });
await client.otpLogin({ code: 123456, device_id: 'device-id' });

// Социальные сети
const vkRedirect = await client.socialAuthVkRedirect();
// Перенаправить пользователя на vkRedirect.data.url
```

### Каталог

```javascript
// Получить каталог с фильтрами
const catalog = await client.getCatalog({
  page: 1,
  limit: 20,
  genres: ['action'],
  sort: 'rating',
  order: 'desc'
});

// Случайное аниме
const random = await client.getRandomRelease();

// Конкретный релиз
const release = await client.getRelease('release-id');
const releaseByCode = await client.getReleaseByCode('sword-art-online');
```

### Поиск

```javascript
// Полнотекстовый поиск
const searchResult = await client.search({
  query: 'Наруто',
  limit: 20,
  genres: ['action']
});

// Быстрый поиск
const quickResult = await client.quickSearch('One Piece', 5);
```

### Избранное

```javascript
// Добавить в избранное
await client.addToFavorites({
  release_id: '123',
  status_id: '1'
});

// Получить избранное
const favorites = await client.getMyFavorites();

// Удалить из избранного
await client.removeFromFavorites('release-id');
```

### Расписание

```javascript
// Расписание на сегодня
const today = await client.getTodaySchedule();

// Расписание на неделю
const week = await client.getWeekSchedule();

// За период
const schedule = await client.getSchedule({
  from: '2024-01-01',
  to: '2024-01-31'
});
```

### Коллекции

```javascript
// Создать коллекцию
const collection = await client.createCollection({
  title: 'Моя коллекция',
  is_public: true
});

// Добавить релиз
await client.addReleaseToCollection(collection.data.id, {
  release_id: 'release-id'
});
```

### История просмотров

```javascript
// Обновить позицию
await client.updateWatchHistory('release-id', {
  episode_id: 'episode-id',
  timestamp: 300,
  duration: 1440
});

// Получить историю
const history = await client.getWatchHistory();
```

## ⚙️ Конфигурация

```javascript
const client = new AniLibertyClient({
  baseUrl: 'https://aniliberty.top/api/v1',  // базовый URL
  timeout: 30000,                              // таймаут в мс
  headers: {
    'User-Agent': 'Anilibertyjs/1.0.0'
  }
});
```

## 📚 TypeScript

```typescript
import { AniLibertyClient, Release, isSuccess } from 'anilibertyjs';

const client = new AniLibertyClient();

async function getCatalog() {
  const response = await client.getCatalog({ limit: 20 });
  
  if (isSuccess(response)) {
    const releases: Release[] = response.data;
    console.log(`Найдено релизов: ${releases.length}`);
  }
}
```

## 📋 Полный список методов

### Авторизация (11 методов)
- `login()` - Авторизация по логину/паролю
- `logout()` - Выход
- `refreshToken()` - Обновление токена
- `otpGet()` - Запрос OTP
- `otpAccept()` - Принятие OTP
- `otpLogin()` - Авторизация по OTP
- `socialAuthVkRedirect()` / `socialAuthVkCallback()` - VK
- `socialAuthDiscordRedirect()` / `socialAuthDiscordCallback()` - Discord
- `socialAuthGoogleRedirect()` / `socialAuthGoogleCallback()` - Google
- `passwordResetRequest()` / `passwordResetConfirm()` - Сброс пароля

### Профиль (4 метода)
- `getMyProfile()` - Получить профиль
- `updateMyProfile()` - Обновить профиль
- `updateMyPassword()` - Изменить пароль
- `deleteMyAccount()` - Удалить аккаунт

### Избранное (5 методов)
- `getFavoriteStatuses()` - Статусы
- `getMyFavorites()` - Получить избранное
- `addToFavorites()` - Добавить
- `updateFavorite()` - Обновить статус
- `removeFromFavorites()` - Удалить

### Коллекции (8 методов)
- `getCollectionStatuses()` - Статусы
- `getMyCollections()` - Список коллекций
- `createCollection()` - Создать
- `getCollection()` - Получить по ID
- `updateCollection()` - Обновить
- `deleteCollection()` - Удалить
- `addReleaseToCollection()` - Добавить релиз
- `removeReleaseFromCollection()` - Удалить релиз

### История просмотров (4 метода)
- `getWatchHistory()` - Получить историю
- `updateWatchHistory()` - Обновить позицию
- `deleteWatchHistory()` - Удалить запись
- `clearWatchHistory()` - Очистить всю историю

### Каталог (5 методов)
- `getCatalog()` - Каталог с фильтрами
- `getRelease()` - Релиз по ID
- `getReleaseByCode()` - Релиз по коду
- `getRandomRelease()` - Случайный релиз
- `getUpdates()` - Последние обновления

### Справочники (5 методов)
- `getReleaseTypes()` - Типы релизов
- `getGenres()` - Жанры
- `getSeasons()` - Сезоны
- `getReleaseStatuses()` - Статусы
- `getRatings()` - Рейтинги

### Франшизы (2 метода)
- `getFranchises()` - Список франшиз
- `getFranchise()` - Франшиза по ID

### Эпизоды (2 метода)
- `getReleaseEpisodes()` - Эпизоды релиза
- `getEpisode()` - Эпизод по ID

### Расписание (3 метода)
- `getSchedule()` - Расписание за период
- `getTodaySchedule()` - На сегодня
- `getWeekSchedule()` - На неделю

### Торренты (3 метода)
- `getReleaseTorrents()` - Торренты релиза
- `getTorrent()` - Торрент по ID
- `downloadTorrent()` - Скачать файл

### Поиск (2 метода)
- `search()` - Полнотекстовый поиск
- `quickSearch()` - Быстрый поиск

### Медиа (4 метода)
- `getPromoVideos()` - Промо видео
- `getPromoVideo()` - Промо по ID
- `getVideoContent()` - Видеоконтент
- `getVideo()` - Видео по ID

### Команды (2 метода)
- `getTeams()` - Список команд
- `getTeam()` - Команда по ID

### Утилиты (3 метода)
- `getAppStatus()` - Статус API
- `ping()` - Проверка доступности
- `getVastAds()` - Реклама

## 🛠️ Разработка

```bash
# Клонировать репозиторий
git clone https://github.com/whathepka/anilibertyjs.git
cd anilibertyjs

# Установить зависимости
npm install

# Собрать проект
npm run build

# Режим разработки
npm run dev
```

## 📝 Примеры

Смотрите папку `examples/` для детальных примеров:
- `basic.ts` - Базовые операции
- `auth.ts` - Авторизация и профиль
- `search.ts` - Поиск и фильтрация

## 🤝 Вклад в проект

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Лицензия

MIT License - свободно используйте в своих проектах!

## 🔗 Ссылки

- [AniLiberty](https://aniliberty.top)
- [API Документация](https://aniliberty.top/api/docs/v1)
- [HTML Документация](https://anilibertyjs.whathepka.xyz/index.html)

## 💬 Поддержка

- Создавайте Issues для вопросов и багов
- Pull Requests приветствуются
- Документация в папке `docs/`

---

Made with ❤️ for anime lovers
