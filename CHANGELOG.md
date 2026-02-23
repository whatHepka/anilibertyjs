# Changelog

## [1.0.7] — 2026-02-23

### Полная переработка библиотеки на основе OpenAPI-спецификации

Все типы и методы полностью переписаны с нуля по официальной OpenAPI-документации (`api-docs.json`).

### Изменения в `api-types.ts`

#### Новые типы и интерфейсы

- `ValidationError` — ошибки валидации (HTTP 422)
- `Image`, `ImageWithOptimized` — модели изображений
- `PaginationLinks`, `Pagination`, `PaginationMeta`, `PaginatedResponse<T>` — типы пагинации
- `OTP`, `OTPGetResponse`, `OTPLoginResponse` — типы OTP-авторизации
- `UserSession` — данные сессии пользователя (устройство, браузер, геолокация)
- `UserTorrents` — торрент-статистика пользователя
- `UserView` — данные просмотра эпизода
- `SocialAuthLoginResponse`, `SocialAuthAuthenticateResponse` — типы OAuth через соц. сети
- `LogoutResponse` — ответ деавторизации
- Справочники коллекций: `CollectionsReferencesAgeRatingItem`, `CollectionsReferencesGenreItem`, `CollectionsReferencesTypeItem`
- `CollectionReleaseItem` — кортеж `[number, UserCollectionType]`
- `CollectionRelease` — релиз в коллекции (с жанрами и эпизодами)
- Справочники избранного: `FavoritesReferencesAgeRatingItem`, `FavoritesReferencesGenreItem`, `FavoritesReferencesSortingItem`, `FavoritesReferencesTypeItem`
- `FavoriteRelease` — релиз в избранном (с жанрами и эпизодами)
- `ViewHistoryItem` — элемент истории просмотров
- `ViewTimecodeItem` — кортеж `[string, number, boolean]`
- `AdBanner`, `AdVast` — модели рекламы
- `AdBannerPlacement`, `AdStatisticsEventType` — enums рекламы
- Справочники каталога: `CatalogReferenceAgeRatingItem`, `CatalogReferenceGenreItem`, `CatalogReferenceProductionStatusItem`, `CatalogReferencePublishStatusItem`, `CatalogReferenceSeasonItem`, `CatalogReferenceSortingItem`, `CatalogReferenceTypeItem`
- `CatalogProductionStatus`, `CatalogPublishStatus`, `CatalogSorting` — enums каталога
- `FranchiseRelease`, `Franchise`, `FranchiseWithReleases` — типы франшиз
- `ReleaseMemberRoleInfo`, `ReleaseMemberUser`, `ReleaseMember` — участники релиза
- `ReleaseTypeInfo`, `ReleaseName`, `ReleaseSeasonInfo`, `ReleaseAgeRatingInfo`, `ReleasePublishDayInfo` — информационные типы релиза
- `Release` — базовая модель релиза (~25 полей)
- `ReleaseWithGenres`, `ReleaseWithMembers`, `ReleaseWithEpisodes`, `ReleaseWithTorrents` — иерархия вложенных данных релиза
- `ReleaseFull` — полные данные релиза (включая спонсоров)
- `ReleaseLatest` — релиз с последним эпизодом
- `ReleaseListItem` — элемент списка `/anime/releases/list`
- `EpisodeSkip`, `Episode`, `EpisodeWithRelease` — типы эпизодов
- `ReleaseInSchedule`, `ScheduleNowResponse`, `ScheduleWeekResponse` — типы расписания
- `Sponsor` — данные спонсора
- Торрент-типы: `TorrentMemberRoleInfo`, `TorrentMemberUser`, `TorrentMember`, `TorrentMemberWithUser`, `TorrentTypeInfo`, `TorrentQualityInfo`, `TorrentCodecInfo`, `TorrentColorInfo`, `Torrent`, `TorrentWithMembers`, `TorrentWithRelease`
- Торрент-enums: `TorrentCodec`, `TorrentColor`, `TorrentQuality`, `TorrentType`, `TorrentMemberRole`
- `AppStatusRequest`, `AppStatus` — статус API
- `MediaPromotion`, `VideoOriginType`, `VideoOriginTypeInfo`, `VideoOrigin`, `VideoContent`, `VideoWithOrigin` — медиа-типы
- `TeamRole`, `TeamUserAccount`, `TeamUser`, `TeamUserFull`, `Team` — типы команд
- `IncludeExcludeParams`, `PaginationParams` — параметры запросов
- Все response-алиасы: `CatalogReleasesResponse`, `CollectionReleasesResponse`, `CollectionIdsResponse`, `FavoriteReleasesResponse`, `FavoriteIdsResponse`, `ViewHistoryResponse`, `ViewTimecodesResponse`, `TorrentsResponse`, `GenreReleasesResponse`, `LatestReleasesResponse`, `RandomReleasesResponse`, `RecommendedReleasesResponse`, `SearchReleasesResponse`, `ReleasesListResponse`, `FranchisesResponse`, `FranchiseResponse`, `RandomFranchisesResponse`, `FranchisesByReleaseResponse`, `GenresResponse`, `GenreResponse`, `VastsResponse`, `MediaPromotionsResponse`, `MediaVideosResponse`, `TeamsResponse`, `TeamRolesResponse`, `TeamUsersResponse`
- `ApiError`, `ApiResponse<T>` — обёртка ответа с типизированной ошибкой

#### Добавленные enums

- `UserSocialType` — `'vk' | 'google' | 'patreon' | 'discord'`
- `UserCollectionType` — `'PLANNED' | 'WATCHED' | 'WATCHING' | 'POSTPONED' | 'ABANDONED'`
- `UserFavoriteSorting` — 8 вариантов сортировки
- `AgeRating` — `'R0_PLUS' | 'R6_PLUS' | 'R12_PLUS' | 'R16_PLUS' | 'R18_PLUS'`
- `PublishDay` — `1 | 2 | 3 | 4 | 5 | 6 | 7`
- `Season` — `'winter' | 'spring' | 'summer' | 'autumn'`
- `ReleaseType` — `'TV' | 'ONA' | 'WEB' | 'OVA' | 'OAD' | 'MOVIE' | 'DORAMA' | 'SPECIAL'`
- `ReleaseMemberRole` — `'poster' | 'timing' | 'voicing' | 'editing' | 'decorating' | 'translating'`

#### Ключевые изменения в типах

- `sponsors` в `ReleaseFull` теперь **массив** `Sponsor[]` (ранее `sponsor?: Sponsor`)
- Все справочники теперь типизированы как массивы элементов с суффиксом `Item`
- `Release` теперь содержит ~25 полей (ранее ~15)
- Иерархия релизов: `Release` -> `ReleaseWithGenres` -> `ReleaseWithMembers` -> `ReleaseWithEpisodes` -> `ReleaseWithTorrents` -> `ReleaseFull`
- Годы справочников теперь `number[]` вместо кастомных типов

### Изменения в `index.ts`

#### Новые интерфейсы запросов

- `OTPGetRequest`, `OTPAcceptRequest`, `OTPLoginRequest`
- `LoginRequest`, `PasswordForgetRequest`, `PasswordResetRequest`
- `CollectionReleasesRequestBody`, `AddToCollectionRequest`, `RemoveFromCollectionRequest`
- `FavoriteReleasesRequestBody`, `AddToFavoriteRequest`, `RemoveFromFavoriteRequest`
- `UpdateTimecodeRequest`, `DeleteTimecodeRequest`
- `CatalogReleasesRequestBody`
- `CollectionReleasesGetParams`, `FavoriteReleasesGetParams`, `CatalogReleasesGetParams` — типизированные GET-параметры с `f[...]` ключами

#### Новые/переименованные методы

| Метод | Описание |
|---|---|
| `otpGet()` | Запрос одноразового пароля |
| `otpAccept()` | Привязка пользователя к OTP |
| `otpLogin()` | Авторизация по OTP |
| `login()` | Авторизация по логину/паролю |
| `logout()` | Деавторизация |
| `socialAuthLogin(provider)` | Получение OAuth URL |
| `socialAuthAuthenticate(state)` | Аутентификация после OAuth |
| `passwordForget()` | Запрос восстановления пароля |
| `passwordReset()` | Сброс пароля |
| `getMyProfile()` | Профиль текущего пользователя |
| `getCollectionAgeRatings()` | Справочник рейтингов в коллекции |
| `getCollectionGenres()` | Справочник жанров в коллекции |
| `getCollectionTypes()` | Справочник типов в коллекции |
| `getCollectionYears()` | Справочник годов в коллекции |
| `getCollectionIds()` | Список ID релизов в коллекциях |
| `getCollectionReleases(params)` | Релизы из коллекции (GET) |
| `getCollectionReleasesPost(body)` | Релизы из коллекции (POST) |
| `addToCollection()` | Добавить в коллекцию |
| `removeFromCollection()` | Удалить из коллекции |
| `getFavoriteAgeRatings()` | Справочник рейтингов в избранном |
| `getFavoriteGenres()` | Справочник жанров в избранном |
| `getFavoriteSorting()` | Справочник сортировок в избранном |
| `getFavoriteTypes()` | Справочник типов в избранном |
| `getFavoriteYears()` | Справочник годов в избранном |
| `getFavoriteIds()` | Список ID в избранном |
| `getFavoriteReleases(params)` | Релизы из избранного (GET) |
| `getFavoriteReleasesPost(body)` | Релизы из избранного (POST) |
| `addToFavorites()` | Добавить в избранное |
| `removeFromFavorites()` | Удалить из избранного |
| `getViewHistory()` | История просмотров |
| `getViewTimecodes()` | Таймкоды просмотра |
| `updateViewTimecodes()` | Обновить таймкоды |
| `deleteViewTimecodes()` | Удалить таймкоды |
| `getVastAds()` | Список VAST реклам |
| `getVastManifest()` | VAST XML манифест |
| `getCatalogAgeRatings()` | Справочник рейтингов каталога |
| `getCatalogGenres()` | Справочник жанров каталога |
| `getCatalogProductionStatuses()` | Справочник статусов производства |
| `getCatalogPublishStatuses()` | Справочник статусов публикации |
| `getCatalogSeasons()` | Справочник сезонов каталога |
| `getCatalogSorting()` | Справочник сортировок каталога |
| `getCatalogTypes()` | Справочник типов каталога |
| `getCatalogYears()` | Справочник годов каталога |
| `getCatalogReleases(params)` | Каталог релизов (GET) |
| `getCatalogReleasesPost(body)` | Каталог релизов (POST) |
| `getFranchises()` | Список франшиз |
| `getFranchise(id)` | Одна франшиза с релизами |
| `getRandomFranchises()` | Случайные франшизы |
| `getFranchisesByRelease(id)` | Франшизы по релизу |
| `getGenres()` | Список жанров |
| `getGenre(id)` | Один жанр |
| `getRandomGenres()` | Случайные жанры |
| `getGenreReleases(id)` | Релизы жанра |
| `getLatestReleases()` | Последние релизы |
| `getRandomReleases()` | Случайные релизы |
| `getRecommendedReleases()` | Рекомендации |
| `getReleasesList(params)` | Список релизов по ID/alias |
| `getRelease(idOrAlias)` | Полные данные релиза |
| `getReleaseMembers(idOrAlias)` | Участники релиза |
| `getReleaseEpisodesTimecodes(idOrAlias)` | Таймкоды эпизодов релиза |
| `getEpisode(id)` | Данные эпизода |
| `getEpisodeTimecode(id)` | Таймкод эпизода |
| `getScheduleNow()` | Расписание (вчера/сегодня/завтра) |
| `getScheduleWeek()` | Расписание на неделю |
| `getTorrents()` | Список торрентов |
| `getTorrent(hashOrId)` | Один торрент |
| `downloadTorrentFile(hashOrId)` | Скачать .torrent файл |
| `getReleaseTorrents(id)` | Торренты релиза |
| `getTorrentsRss()` | RSS лента торрентов |
| `getReleaseTorrentsRss(id)` | RSS релиза |
| `searchReleases(params)` | Поиск релизов |
| `getAppStatus()` | Статус API |
| `getMediaPromotions()` | Промо-материалы |
| `getMediaVideos()` | Видео-ролики |
| `getTeams()` | Список команд |
| `getTeamRoles()` | Роли в командах |
| `getTeamUsers()` | Участники команд |

#### Новые вспомогательные функции

- `createClient(config?)` — фабрика для создания клиента
- `isSuccess(response)` — type guard для успешных ответов (сужает `data` до `T`)
- `isError(response)` — type guard для ответов с ошибкой

#### Изменения в клиенте

- Добавлен метод `getAccessToken()` для получения текущего токена
- `data` параметр в `request()` теперь `unknown` вместо `any`
- Все публичные методы имеют полный JSDoc с `@param`, `@returns`, `@see`
- Все типы реэкспортируются через `export * from './api-types'`
- Авторизация через `login()`, `otpLogin()`, `socialAuthAuthenticate()` автоматически устанавливает токен
- `logout()` автоматически очищает токен

### Удалено

- Все устаревшие типы и методы, не соответствующие OpenAPI-спецификации
- `data?: any` заменён на `data?: unknown`

### JSDoc

- Добавлена полная JSDoc документация на все экспортируемые типы, интерфейсы, enums, методы и хелперы
- Все JSDoc на русском языке с `@param`, `@returns`, `@see`, `@example` тегами
