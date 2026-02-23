# AniLiberty.js

Полноценный TypeScript/Node.js клиент для AniLiberty API V1 с полным покрытием всех endpoints.

[![npm version](https://img.shields.io/npm/v/anilibertyjs.svg)](https://www.npmjs.com/package/anilibertyjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D16.0.0-green.svg)](https://nodejs.org/)

## Установка

```bash
npm install anilibertyjs
```

## Быстрый старт

```typescript
import { AniLibertyClient, isSuccess } from 'anilibertyjs';

const client = new AniLibertyClient();

// Получить последние релизы
const response = await client.getLatestReleases({ limit: 10 });

if (isSuccess(response)) {
  for (const release of response.data) {
    console.log(`${release.name.main} (${release.year})`);
  }
}
```

```javascript
// CommonJS
const { AniLibertyClient, isSuccess } = require('anilibertyjs');
```

---

## Конфигурация

```typescript
import { AniLibertyClient, AniLibertyClientConfig } from 'anilibertyjs';

const client = new AniLibertyClient({
  baseUrl: 'https://aniliberty.top/api/v1', // по умолчанию
  timeout: 30000,                            // таймаут в мс (по умолчанию 30с)
  headers: {
    'User-Agent': 'MyApp/1.0',
  },
});
```

| Параметр | Тип | По умолчанию | Описание |
|----------|-----|-------------|----------|
| `baseUrl` | `string` | `https://aniliberty.top/api/v1` | Базовый URL API |
| `timeout` | `number` | `30000` | Таймаут запроса (мс) |
| `headers` | `Record<string, string>` | `{}` | Дополнительные HTTP-заголовки |

---

## Обработка ответов

Все методы возвращают `ApiResponse<T>`:

```typescript
interface ApiResponse<T> {
  data?: T;                   // Данные ответа (при успехе)
  error?: ApiError;           // Ошибка (при неуспехе)
  status: number;             // HTTP статус-код
}

interface ApiError {
  message?: string;           // Сообщение об ошибке
  errors?: Record<string, string[]>; // Ошибки валидации (422)
}
```

### Type Guards

```typescript
import { isSuccess, isError } from 'anilibertyjs';

const response = await client.getLatestReleases();

if (isSuccess(response)) {
  // response.data гарантированно определен и типизирован
  console.log(response.data.length);
}

if (isError(response)) {
  // response.error гарантированно определен
  console.error(response.error.message);
}
```

### Фабричная функция

```typescript
import { createClient } from 'anilibertyjs';

const client = createClient({ timeout: 10000 });
```

---

## Include / Exclude

Почти все GET-методы поддерживают параметры `include` и `exclude` для выборки полей.
`exclude` имеет приоритет над `include`. Вложенность через точку.

```typescript
// Получить только id, name и year
const response = await client.getLatestReleases({
  limit: 5,
  include: 'id,name,year',
});

// Исключить тяжёлые поля
const response = await client.getRelease('sword-art-online', {
  exclude: 'poster,description',
});

// Массив тоже работает
const response = await client.getGenres({
  include: ['id', 'name'],
});
```

---

## Авторизация

### Логин / Пароль

```typescript
const response = await client.login({
  login: 'username',
  password: 'password',
});

if (isSuccess(response)) {
  // Токен автоматически установлен в клиенте
  console.log('Авторизован! Токен:', response.data.token);
}
```

### OTP (одноразовый пароль)

```typescript
// 1. Запросить OTP на устройстве
const otp = await client.otpGet({ device_id: 'my-device-id' });
if (isSuccess(otp)) {
  console.log(`Код: ${otp.data.otp.code}, осталось: ${otp.data.remaining_time}с`);
}

// 2. Привязать пользователя к OTP (с другого устройства, где уже авторизован)
await client.otpAccept({ code: 123456 });

// 3. Авторизоваться по OTP
const loginResponse = await client.otpLogin({ code: 123456, device_id: 'my-device-id' });
// Токен автоматически установлен
```

### Социальные сети

```typescript
// 1. Получить URL для OAuth
const socialResponse = await client.socialAuthLogin('vk'); // 'vk' | 'google' | 'patreon' | 'discord'
if (isSuccess(socialResponse)) {
  console.log('Перенаправьте на:', socialResponse.data.url);
  const state = socialResponse.data.state; // сохранить для шага 2
}

// 2. После редиректа — аутентифицировать пользователя
const authResponse = await client.socialAuthAuthenticate(state);
// Токен автоматически установлен
```

### Управление токеном

```typescript
// Установить токен вручную
client.setAccessToken('your-jwt-token');

// Получить текущий токен
const token = client.getAccessToken();

// Выход (отправляет запрос на сервер + очищает токен)
await client.logout();

// Просто очистить токен без серверного запроса
client.clearAccessToken();
```

### Восстановление пароля

```typescript
// 1. Запросить ссылку для сброса
await client.passwordForget({ email: 'user@example.com' });

// 2. Сбросить пароль (токен из письма)
await client.passwordReset({
  token: 'reset-token-from-email',
  password: 'newPassword123',
  password_confirmation: 'newPassword123',
});
```

---

## Профиль пользователя

```typescript
// Получить данные авторизованного пользователя
const profile = await client.getMyProfile();

if (isSuccess(profile)) {
  const user = profile.data;
  console.log(`Никнейм: ${user.nickname}`);
  console.log(`Email: ${user.email}`);
  console.log(`Забанен: ${user.is_banned}`);
  console.log(`Реклама: ${user.is_with_ads}`);

  if (user.torrents) {
    console.log(`Отдано: ${user.torrents.uploaded} байт`);
    console.log(`Скачано: ${user.torrents.downloaded} байт`);
  }
}

// Только определённые поля
const profile = await client.getMyProfile({ include: 'id,nickname,avatar' });
```

---

## Каталог аниме

### Справочники каталога

```typescript
// Все справочники возвращают массив элементов

const ageRatings = await client.getCatalogAgeRatings();
// => [{ value: 'R16_PLUS', label: '16+', description: '...' }, ...]

const genres = await client.getCatalogGenres();
// => [{ id: 1, name: 'Экшен' }, ...]

const productionStatuses = await client.getCatalogProductionStatuses();
// => [{ value: 'IS_IN_PRODUCTION', description: '...' }, ...]

const publishStatuses = await client.getCatalogPublishStatuses();
// => [{ value: 'IS_ONGOING', description: '...' }, ...]

const seasons = await client.getCatalogSeasons();
// => [{ value: 'winter', description: 'Зима' }, ...]

const sorting = await client.getCatalogSorting();
// => [{ value: 'FRESH_AT_DESC', label: '...', description: '...' }, ...]

const types = await client.getCatalogTypes();
// => [{ value: 'TV', description: 'TV Сериал' }, ...]

const years = await client.getCatalogYears();
// => [2020, 2021, 2022, 2023, 2024, 2025, 2026]
```

### Получение релизов из каталога

Два варианта: GET с query-параметрами или POST с телом запроса.

#### GET-вариант

```typescript
const catalog = await client.getCatalogReleases({
  page: 1,
  limit: 20,
  'f[genres]': '1,2,3',
  'f[types]': ['TV', 'ONA'],
  'f[seasons]': ['winter', 'spring'],
  'f[years][from_year]': 2020,
  'f[years][to_year]': 2026,
  'f[sorting]': 'RATING_DESC',
  'f[age_ratings]': ['R16_PLUS'],
  'f[publish_statuses]': ['IS_ONGOING'],
  'f[production_statuses]': ['IS_IN_PRODUCTION'],
});

if (isSuccess(catalog)) {
  console.log(`Всего: ${catalog.data.meta.pagination.total}`);
  for (const release of catalog.data.data) {
    console.log(`${release.name.main} — ${release.genres.map(g => g.name).join(', ')}`);
  }
}
```

#### POST-вариант

```typescript
const catalog = await client.getCatalogReleasesPost({
  page: 1,
  limit: 20,
  f: {
    genres: [1, 2, 3],
    types: ['TV'],
    seasons: ['winter'],
    years: { from_year: 2020, to_year: 2026 },
    sorting: 'RATING_DESC',
    age_ratings: ['R16_PLUS'],
    publish_statuses: ['IS_ONGOING'],
    production_statuses: ['IS_IN_PRODUCTION'],
  },
  include: 'id,name,year,poster',
});
```

---

## Релизы

### Последние релизы

```typescript
const latest = await client.getLatestReleases({ limit: 10 });

if (isSuccess(latest)) {
  for (const release of latest.data) {
    console.log(`${release.name.main} — последний эпизод: ${release.latest_episode.ordinal}`);
  }
}
```

### Случайные релизы

```typescript
const random = await client.getRandomReleases({ limit: 5 });
```

### Рекомендации

```typescript
// Рекомендации на основе конкретного релиза
const recommended = await client.getRecommendedReleases({
  release_id: 123,
  limit: 10,
});
```

### Полные данные релиза

```typescript
// По ID или alias
const release = await client.getRelease(123);
const release = await client.getRelease('sword-art-online');

if (isSuccess(release)) {
  const r = release.data;
  console.log(`${r.name.main} (${r.name.english})`);
  console.log(`Тип: ${r.type?.description}`);
  console.log(`Год: ${r.year}, Сезон: ${r.season?.description}`);
  console.log(`Рейтинг: ${r.age_rating?.label}`);
  console.log(`Жанры: ${r.genres.map(g => g.name).join(', ')}`);
  console.log(`Эпизодов: ${r.episodes.length} / ${r.episodes_total}`);
  console.log(`Торрентов: ${r.torrents.length}`);
  console.log(`Спонсоров: ${r.sponsors.length}`);

  // Участники
  for (const member of r.members) {
    console.log(`  ${member.nickname} — ${member.role.description}`);
  }

  // Эпизоды со ссылками на стримы
  for (const ep of r.episodes) {
    console.log(`  Эпизод ${ep.ordinal}: ${ep.name || 'Без названия'}`);
    if (ep.hls_1080) console.log(`    1080p: ${ep.hls_1080}`);
    if (ep.hls_720) console.log(`    720p: ${ep.hls_720}`);
  }
}
```

### Список релизов по ID или alias

```typescript
const list = await client.getReleasesList({
  ids: [1, 2, 3],
  aliases: ['release-alias-1'],
  page: 1,
  limit: 10,
});

if (isSuccess(list)) {
  console.log(`Всего: ${list.data.meta.pagination.total}`);
  // Каждый элемент — полные данные (жанры, участники, эпизоды, торренты, спонсоры)
}
```

### Участники релиза

```typescript
const members = await client.getReleaseMembers('sword-art-online');

if (isSuccess(members)) {
  for (const m of members.data) {
    console.log(`${m.nickname} — ${m.role.description}`);
  }
}
```

### Таймкоды эпизодов (авторизация)

```typescript
const timecodes = await client.getReleaseEpisodesTimecodes(123);

if (isSuccess(timecodes)) {
  for (const view of timecodes.data) {
    console.log(`Эпизод ${view.release_episode_id}: ${view.time}с, просмотрен: ${view.is_watched}`);
  }
}
```

---

## Эпизоды

```typescript
// Получить данные конкретного эпизода (включая релиз со всеми его эпизодами)
const episode = await client.getEpisode('episode-uuid');

if (isSuccess(episode)) {
  const ep = episode.data;
  console.log(`Эпизод ${ep.ordinal}: ${ep.name}`);
  console.log(`Длительность: ${ep.duration}с`);
  console.log(`Релиз: ${ep.release.name.main}`);
  console.log(`Всего эпизодов в релизе: ${ep.release.episodes.length}`);

  // Тайминги для пропуска
  if (ep.opening) console.log(`Опенинг: ${ep.opening.start}—${ep.opening.stop}с`);
  if (ep.ending) console.log(`Эндинг: ${ep.ending.start}—${ep.ending.stop}с`);
}

// Таймкод просмотра конкретного эпизода (авторизация)
const timecode = await client.getEpisodeTimecode('episode-uuid');

if (isSuccess(timecode)) {
  console.log(`Прогресс: ${timecode.data.time}с, просмотрен: ${timecode.data.is_watched}`);
}
```

---

## Коллекции

Коллекции требуют авторизации (`setAccessToken` или `login`).

### Типы коллекций

| Тип | Описание |
|-----|----------|
| `PLANNED` | Запланировано |
| `WATCHED` | Просмотрено |
| `WATCHING` | Смотрю |
| `POSTPONED` | Отложено |
| `ABANDONED` | Брошено |

### Справочники коллекций

```typescript
const ageRatings = await client.getCollectionAgeRatings();
const genres = await client.getCollectionGenres();
const types = await client.getCollectionTypes();
const years = await client.getCollectionYears();
```

### Получение ID релизов в коллекциях

```typescript
const ids = await client.getCollectionIds();

if (isSuccess(ids)) {
  // Кортежи [release_id, collection_type]
  for (const [releaseId, collectionType] of ids.data) {
    console.log(`Релиз ${releaseId} в коллекции ${collectionType}`);
  }
}
```

### Получение релизов из коллекции

#### GET-вариант

```typescript
const collection = await client.getCollectionReleases({
  type_of_collection: 'WATCHING',
  page: 1,
  limit: 20,
  'f[genres]': '1,2',
  'f[search]': 'Наруто',
});

if (isSuccess(collection)) {
  for (const release of collection.data.data) {
    console.log(`${release.name.main} — ${release.genres.map(g => g.name).join(', ')}`);
    console.log(`  Эпизодов: ${release.episodes.length}`);
  }
}
```

#### POST-вариант

```typescript
const collection = await client.getCollectionReleasesPost({
  type_of_collection: 'WATCHING',
  page: 1,
  limit: 20,
  f: {
    genres: '1,2',
    search: 'Наруто',
  },
});
```

### Добавление и удаление

```typescript
// Добавить несколько релизов
const result = await client.addToCollection([
  { release_id: 123, type_of_collection: 'WATCHING' },
  { release_id: 456, type_of_collection: 'PLANNED' },
]);

// Удалить
await client.removeFromCollection([
  { release_id: 123 },
  { release_id: 456 },
]);
```

---

## Избранное

Избранное требует авторизации.

### Справочники избранного

```typescript
const ageRatings = await client.getFavoriteAgeRatings();
const genres = await client.getFavoriteGenres();
const sorting = await client.getFavoriteSorting();
const types = await client.getFavoriteTypes();
const years = await client.getFavoriteYears();
```

### Получение ID в избранном

```typescript
const ids = await client.getFavoriteIds();

if (isSuccess(ids)) {
  console.log('Релизы в избранном:', ids.data); // number[]
}
```

### Получение релизов из избранного

#### GET-вариант

```typescript
const favorites = await client.getFavoriteReleases({
  page: 1,
  limit: 20,
  'f[sorting]': 'RATING_DESC',
  'f[genres]': '1,2,3',
  'f[types]': ['TV', 'MOVIE'],
  'f[years]': '2024,2025',
});

if (isSuccess(favorites)) {
  console.log(`Всего в избранном: ${favorites.data.meta.pagination.total}`);
}
```

#### POST-вариант

```typescript
const favorites = await client.getFavoriteReleasesPost({
  page: 1,
  limit: 20,
  f: {
    sorting: 'RATING_DESC',
    genres: '1,2,3',
    types: ['TV'],
  },
});
```

### Добавление и удаление

```typescript
// Добавить в избранное
await client.addToFavorites([
  { release_id: 123 },
  { release_id: 456 },
]);

// Удалить из избранного
await client.removeFromFavorites([
  { release_id: 123 },
]);
```

---

## История просмотров и таймкоды

Требует авторизации.

### История просмотров

```typescript
const history = await client.getViewHistory({ page: 1, limit: 20 });

if (isSuccess(history)) {
  for (const item of history.data.data) {
    const ep = item.release_episode;
    console.log(`${ep.release.name.main} — эпизод ${ep.ordinal}`);
    console.log(`  Прогресс: ${item.time}с, просмотрен: ${item.is_watched}`);
  }
}
```

### Таймкоды

```typescript
// Получить таймкоды (с опциональной фильтрацией по дате)
const timecodes = await client.getViewTimecodes({ since: '2025-01-01T00:00:00Z' });

if (isSuccess(timecodes)) {
  // Кортежи [release_episode_id, time, is_watched]
  for (const [episodeId, time, isWatched] of timecodes.data) {
    console.log(`Эпизод ${episodeId}: ${time}с, просмотрен: ${isWatched}`);
  }
}

// Обновить таймкоды
await client.updateViewTimecodes([
  { release_episode_id: 'episode-uuid-1', time: 300, is_watched: false },
  { release_episode_id: 'episode-uuid-2', time: 0, is_watched: true },
]);

// Удалить таймкоды
await client.deleteViewTimecodes([
  { release_episode_id: 'episode-uuid-1' },
]);
```

---

## Франшизы

```typescript
// Все франшизы
const franchises = await client.getFranchises();

if (isSuccess(franchises)) {
  for (const f of franchises.data) {
    console.log(`${f.name} (${f.name_english})`);
    console.log(`  Рейтинг: ${f.rating}`);
    console.log(`  Релизов: ${f.total_releases}, эпизодов: ${f.total_episodes}`);
    console.log(`  Годы: ${f.first_year}—${f.last_year}`);
  }
}

// Одна франшиза с детальными данными о релизах
const franchise = await client.getFranchise('franchise-uuid');

if (isSuccess(franchise)) {
  for (const fr of franchise.data.franchise_releases) {
    console.log(`  #${fr.sort_order}: ${fr.release.name.main}`);
  }
}

// Случайные франшизы
const random = await client.getRandomFranchises({ limit: 3 });

// Все франшизы, в которых участвует релиз
const byRelease = await client.getFranchisesByRelease(123);
```

---

## Жанры

```typescript
// Список всех жанров
const genres = await client.getGenres();

if (isSuccess(genres)) {
  for (const genre of genres.data) {
    console.log(`${genre.name} — ${genre.total_releases} релизов`);
  }
}

// Один жанр
const genre = await client.getGenre(1);

// Случайные жанры
const random = await client.getRandomGenres({ limit: 5 });

// Релизы конкретного жанра (пагинированный)
const releases = await client.getGenreReleases(1, { page: 1, limit: 20 });

if (isSuccess(releases)) {
  console.log(`Всего в жанре: ${releases.data.meta.pagination.total}`);
}
```

---

## Расписание

```typescript
// Расписание на текущую дату (вчера, сегодня, завтра)
const scheduleNow = await client.getScheduleNow();

if (isSuccess(scheduleNow)) {
  console.log('Сегодня:');
  for (const item of scheduleNow.data.today) {
    const r = item.release;
    console.log(`  ${r.name.main}`);
    if (item.published_release_episode) {
      console.log(`    Вышел эпизод: ${item.published_release_episode.ordinal}`);
    }
    if (item.next_release_episode_number) {
      console.log(`    Следующий: ${item.next_release_episode_number}`);
    }
  }

  console.log('Завтра:');
  for (const item of scheduleNow.data.tomorrow) {
    console.log(`  ${item.release.name.main}`);
  }
}

// Расписание на неделю
const scheduleWeek = await client.getScheduleWeek();

if (isSuccess(scheduleWeek)) {
  for (const item of scheduleWeek.data.data) {
    console.log(`${item.release.name.main}`);
  }
}
```

---

## Торренты

### Список торрентов

```typescript
const torrents = await client.getTorrents({ page: 1, limit: 20 });

if (isSuccess(torrents)) {
  for (const t of torrents.data.data) {
    console.log(`${t.release.name.main}`);
    console.log(`  Качество: ${t.quality.description}`);
    console.log(`  Кодек: ${t.codec.label} (${t.codec.description})`);
    console.log(`  Тип: ${t.type.description}`);
    console.log(`  Размер: ${(t.size / 1024 / 1024 / 1024).toFixed(2)} ГБ`);
    console.log(`  Сиды: ${t.seeders}, Личи: ${t.leechers}`);
    console.log(`  Magnet: ${t.magnet}`);
  }
}
```

### Один торрент

```typescript
// По hash или ID
const torrent = await client.getTorrent('torrent-hash');
const torrent = await client.getTorrent(42);
```

### Скачивание .torrent файла

```typescript
const file = await client.downloadTorrentFile('torrent-hash');
// С passkey
const file = await client.downloadTorrentFile(42, 'user-passkey');

if (isSuccess(file)) {
  // file.data — Blob торрент-файла
  console.log('Файл скачан');
}
```

### Торренты релиза

```typescript
const releaseTorrents = await client.getReleaseTorrents(123);

if (isSuccess(releaseTorrents)) {
  for (const t of releaseTorrents.data) {
    console.log(`${t.quality.description} ${t.codec.label} — ${t.seeders} сидов`);
  }
}
```

### RSS

```typescript
// Общая RSS лента
const rss = await client.getTorrentsRss({ limit: 50, pk: 'user-passkey' });

// RSS конкретного релиза
const releaseRss = await client.getReleaseTorrentsRss(123, { pk: 'user-passkey' });

// rss.data — XML строка
```

---

## Поиск

```typescript
const results = await client.searchReleases({ query: 'Наруто' });

if (isSuccess(results)) {
  for (const release of results.data) {
    console.log(`${release.name.main} (${release.year})`);
  }
}

// С include/exclude
const results = await client.searchReleases({
  query: 'One Piece',
  include: 'id,name,year,poster',
});
```

---

## Реклама

```typescript
// Список VAST кампаний
const vasts = await client.getVastAds();

if (isSuccess(vasts)) {
  for (const vast of vasts.data) {
    console.log(`${vast.id}: ${vast.url}`);
  }
}

// VAST XML манифест (для плеера)
const manifest = await client.getVastManifest();
```

---

## Медиа

### Промо-материалы

```typescript
const promos = await client.getMediaPromotions();

if (isSuccess(promos)) {
  for (const promo of promos.data.data) {
    console.log(`${promo.title || 'Без названия'}`);
    if (promo.url) console.log(`  URL: ${promo.url}`);
    if (promo.release) console.log(`  Релиз: ${promo.release.name.main}`);
    if (promo.is_ad) console.log(`  Реклама (ERID: ${promo.ad_erid})`);
  }
}
```

### Видео

```typescript
const videos = await client.getMediaVideos({ limit: 10 });

if (isSuccess(videos)) {
  for (const video of videos.data.data) {
    console.log(`${video.title}`);
    console.log(`  URL: ${video.url}`);
    console.log(`  Просмотров: ${video.views}`);
    console.log(`  Источник: ${video.origin.title} (${video.origin.type.description})`);
  }
}
```

---

## Команды

```typescript
// Список команд
const teams = await client.getTeams();

if (isSuccess(teams)) {
  for (const team of teams.data) {
    console.log(`${team.title}`);
    if (team.description) console.log(`  ${team.description}`);
  }
}

// Роли в командах
const roles = await client.getTeamRoles();

if (isSuccess(roles)) {
  for (const role of roles.data) {
    console.log(`${role.title} (${role.color})`);
  }
}

// Все участники
const users = await client.getTeamUsers();

if (isSuccess(users)) {
  for (const user of users.data) {
    console.log(`${user.nickname} — ${user.team.title}`);
    console.log(`  Роли: ${user.roles.map(r => r.title).join(', ')}`);
    console.log(`  Стажёр: ${user.is_intern}, Отпуск: ${user.is_vacation}`);
  }
}
```

---

## Статус API

```typescript
const status = await client.getAppStatus();

if (isSuccess(status)) {
  console.log(`API alive: ${status.data.is_alive}`);
  console.log(`IP: ${status.data.request.ip}`);
  console.log(`Страна: ${status.data.request.country} (${status.data.request.iso_code})`);
  console.log(`Доступные эндпоинты: ${status.data.available_api_endpoints.join(', ')}`);
}
```

---

## Полный список методов

### Авторизация (9 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `login(request)` | Авторизация по логину/паролю | - |
| `logout()` | Деавторизация | + |
| `otpGet(request)` | Запрос OTP | - |
| `otpAccept(request)` | Привязка пользователя к OTP | + |
| `otpLogin(request)` | Авторизация по OTP | - |
| `socialAuthLogin(provider)` | Получение OAuth URL | - |
| `socialAuthAuthenticate(state)` | Аутентификация после OAuth | - |
| `passwordForget(request)` | Запрос восстановления пароля | - |
| `passwordReset(request)` | Сброс пароля | - |

### Профиль (1 метод)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getMyProfile(params?)` | Данные текущего пользователя | + |

### Коллекции (9 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getCollectionAgeRatings()` | Справочник рейтингов | + |
| `getCollectionGenres()` | Справочник жанров | + |
| `getCollectionTypes()` | Справочник типов | + |
| `getCollectionYears()` | Справочник годов | + |
| `getCollectionIds()` | Список ID в коллекциях | + |
| `getCollectionReleases(params)` | Релизы из коллекции (GET) | + |
| `getCollectionReleasesPost(body)` | Релизы из коллекции (POST) | + |
| `addToCollection(requests)` | Добавить в коллекцию | + |
| `removeFromCollection(requests)` | Удалить из коллекции | + |

### Избранное (10 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getFavoriteAgeRatings()` | Справочник рейтингов | + |
| `getFavoriteGenres()` | Справочник жанров | + |
| `getFavoriteSorting()` | Справочник сортировок | + |
| `getFavoriteTypes()` | Справочник типов | + |
| `getFavoriteYears()` | Справочник годов | + |
| `getFavoriteIds()` | Список ID в избранном | + |
| `getFavoriteReleases(params?)` | Релизы из избранного (GET) | + |
| `getFavoriteReleasesPost(body)` | Релизы из избранного (POST) | + |
| `addToFavorites(requests)` | Добавить в избранное | + |
| `removeFromFavorites(requests)` | Удалить из избранного | + |

### История просмотров (4 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getViewHistory(params?)` | Пагинированная история | + |
| `getViewTimecodes(params?)` | Таймкоды просмотра | + |
| `updateViewTimecodes(requests)` | Обновить таймкоды | + |
| `deleteViewTimecodes(requests)` | Удалить таймкоды | + |

### Реклама (2 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getVastAds()` | Список VAST кампаний | - |
| `getVastManifest()` | VAST XML манифест | - |

### Каталог (10 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getCatalogAgeRatings()` | Справочник рейтингов | - |
| `getCatalogGenres()` | Справочник жанров | - |
| `getCatalogProductionStatuses()` | Справочник статусов производства | - |
| `getCatalogPublishStatuses()` | Справочник статусов публикации | - |
| `getCatalogSeasons()` | Справочник сезонов | - |
| `getCatalogSorting()` | Справочник сортировок | - |
| `getCatalogTypes()` | Справочник типов | - |
| `getCatalogYears()` | Справочник годов | - |
| `getCatalogReleases(params?)` | Каталог релизов (GET) | - |
| `getCatalogReleasesPost(body)` | Каталог релизов (POST) | - |

### Франшизы (4 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getFranchises(params?)` | Список франшиз | - |
| `getFranchise(id, params?)` | Франшиза с релизами | - |
| `getRandomFranchises(params?)` | Случайные франшизы | - |
| `getFranchisesByRelease(id, params?)` | Франшизы по релизу | - |

### Жанры (4 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getGenres(params?)` | Все жанры | - |
| `getGenre(id, params?)` | Один жанр | - |
| `getRandomGenres(params?)` | Случайные жанры | - |
| `getGenreReleases(id, params?)` | Релизы жанра (пагинация) | - |

### Релизы (7 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getLatestReleases(params?)` | Последние релизы | - |
| `getRandomReleases(params?)` | Случайные релизы | - |
| `getRecommendedReleases(params?)` | Рекомендации | - |
| `getReleasesList(params)` | Список по ID/alias | - |
| `getRelease(idOrAlias, params?)` | Полные данные релиза | - |
| `getReleaseMembers(idOrAlias, params?)` | Участники релиза | - |
| `getReleaseEpisodesTimecodes(idOrAlias, params?)` | Таймкоды эпизодов | + |

### Эпизоды (2 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getEpisode(id, params?)` | Данные эпизода | - |
| `getEpisodeTimecode(id, params?)` | Таймкод просмотра | + |

### Расписание (2 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getScheduleNow(params?)` | Вчера / Сегодня / Завтра | - |
| `getScheduleWeek(params?)` | Расписание на неделю | - |

### Торренты (6 методов)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getTorrents(params?)` | Список торрентов (пагинация) | - |
| `getTorrent(hashOrId, params?)` | Один торрент | - |
| `downloadTorrentFile(hashOrId, pk?)` | Скачать .torrent файл | - |
| `getReleaseTorrents(id, params?)` | Торренты релиза | - |
| `getTorrentsRss(params?)` | RSS лента | - |
| `getReleaseTorrentsRss(id, params?)` | RSS лента релиза | - |

### Поиск (1 метод)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `searchReleases(params)` | Поиск по тексту | - |

### Статус (1 метод)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getAppStatus()` | Статус API | - |

### Медиа (2 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getMediaPromotions(params?)` | Промо-материалы | - |
| `getMediaVideos(params?)` | Видео-ролики | - |

### Команды (3 метода)

| Метод | Описание | Авторизация |
|-------|----------|:-----------:|
| `getTeams(params?)` | Список команд | - |
| `getTeamRoles(params?)` | Роли в командах | - |
| `getTeamUsers(params?)` | Участники команд | - |

### Утилиты (3 функции)

| Функция | Описание |
|---------|----------|
| `createClient(config?)` | Создать клиент с конфигурацией |
| `isSuccess(response)` | Type guard для успешных ответов |
| `isError(response)` | Type guard для ответов с ошибкой |

---

## Справочник типов

Все типы экспортируются из основного пакета:

```typescript
import type {
  // Общие
  ApiResponse, ApiError, ValidationError,
  Image, ImageWithOptimized,
  Pagination, PaginatedResponse,
  IncludeExcludeParams, PaginationParams,

  // Пользователь
  User, UserSession, UserTorrents, UserView,
  UserSocialType, UserCollectionType, UserFavoriteSorting,

  // Авторизация
  OTP, OTPGetResponse, OTPLoginResponse,
  LoginResponse, LogoutResponse,
  SocialAuthLoginResponse, SocialAuthAuthenticateResponse,

  // Релизы
  Release, ReleaseFull, ReleaseLatest, ReleaseListItem,
  ReleaseWithGenres, ReleaseWithMembers, ReleaseWithEpisodes, ReleaseWithTorrents,
  ReleaseName, ReleaseTypeInfo, ReleaseSeasonInfo, ReleaseAgeRatingInfo, ReleasePublishDayInfo,
  ReleaseMember, ReleaseMemberRoleInfo,
  AgeRating, PublishDay, Season, ReleaseType, ReleaseMemberRole,

  // Эпизоды
  Episode, EpisodeSkip, EpisodeWithRelease,

  // Жанры
  Genre,

  // Франшизы
  Franchise, FranchiseRelease, FranchiseWithReleases,

  // Торренты
  Torrent, TorrentWithMembers, TorrentWithRelease,
  TorrentMember, TorrentMemberWithUser,
  TorrentCodec, TorrentColor, TorrentQuality, TorrentType, TorrentMemberRole,

  // Расписание
  ReleaseInSchedule, ScheduleNowResponse, ScheduleWeekResponse,

  // Спонсоры
  Sponsor,

  // Реклама
  AdBanner, AdVast, AdBannerPlacement, AdStatisticsEventType,

  // Каталог
  CatalogSorting, CatalogProductionStatus, CatalogPublishStatus,
  CatalogReferenceAgeRatingItem, CatalogReferenceGenreItem,

  // Коллекции
  CollectionRelease, CollectionReleaseItem,
  CollectionsReferencesAgeRatingItem, CollectionsReferencesGenreItem, CollectionsReferencesTypeItem,

  // Избранное
  FavoriteRelease,
  FavoritesReferencesAgeRatingItem, FavoritesReferencesGenreItem,
  FavoritesReferencesSortingItem, FavoritesReferencesTypeItem,

  // Просмотры
  ViewHistoryItem, ViewTimecodeItem,

  // Медиа
  MediaPromotion, VideoContent, VideoOrigin, VideoWithOrigin, VideoOriginType,

  // Команды
  Team, TeamRole, TeamUser, TeamUserFull, TeamUserAccount,

  // Статус
  AppStatus, AppStatusRequest,

  // Типы ответов
  CatalogReleasesResponse, CollectionReleasesResponse, FavoriteReleasesResponse,
  TorrentsResponse, GenreReleasesResponse, LatestReleasesResponse,
  RandomReleasesResponse, RecommendedReleasesResponse, SearchReleasesResponse,
  ReleasesListResponse, FranchisesResponse, FranchiseResponse,
  GenresResponse, GenreResponse, TeamsResponse, TeamRolesResponse, TeamUsersResponse,
  MediaPromotionsResponse, MediaVideosResponse,
} from 'anilibertyjs';
```

---

## Разработка

```bash
git clone https://github.com/whathepka/anilibertyjs.git
cd anilibertyjs
npm install
npm run build     # Сборка
npm run dev       # Watch-режим
```

---

## Лицензия

MIT License
