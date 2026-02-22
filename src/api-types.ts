// =============================================================================
// AniLiberty API V1 — Типы и интерфейсы
// Сгенерировано на основе OpenAPI спецификации (api-docs.json)
// =============================================================================

// =============================================================================
// Commons — Общие компоненты
// =============================================================================

/**
 * Ошибка валидации входных параметров (HTTP 422).
 * Ключ — имя параметра, значение — массив сообщений об ошибках.
 */
export interface ValidationError {
  errors: Record<string, string[]>;
}

/** Изображение с preview и thumbnail вариантами */
export interface Image {
  /** Ссылка на превью изображения */
  preview: string;
  /** Ссылка на миниатюру изображения */
  thumbnail: string;
}

/** Изображение с дополнительной оптимизированной версией */
export interface ImageWithOptimized extends Image {
  /** Оптимизированная версия изображения */
  optimized?: Image;
}

/** Ссылки пагинации */
export interface PaginationLinks {
  /** Ссылка на предыдущую страницу */
  previous?: string;
  /** Ссылка на следующую страницу */
  next?: string;
}

/** Данные пагинации */
export interface Pagination {
  /** Общее количество элементов */
  total: number;
  /** Количество элементов на текущей странице */
  count: number;
  /** Количество элементов на страницу */
  per_page: number;
  /** Номер текущей страницы */
  current_page: number;
  /** Общее количество страниц */
  total_pages: number;
  /** Навигационные ссылки */
  links?: PaginationLinks;
}

/** Метаданные пагинации */
export interface PaginationMeta {
  pagination: Pagination;
}

/** Пагинированный ответ API */
export interface PaginatedResponse<T> {
  /** Массив данных текущей страницы */
  data: T[];
  /** Метаданные пагинации */
  meta: PaginationMeta;
}

// =============================================================================
// Accounts — OTP (Одноразовые пароли)
// =============================================================================

/** Данные по OTP коду */
export interface OTP {
  /** Код одноразового пароля */
  code: string;
  /** Идентификатор пользователя, привязанного к OTP */
  user_id: number;
  /** Идентификатор устройства */
  device_id: string;
  /** Срок действия кода (ISO 8601 date-time) */
  expired_at: string;
}

/** Ответ на запрос создания OTP */
export interface OTPGetResponse {
  /** Данные OTP */
  otp: OTP;
  /** Оставшееся время жизни OTP в секундах */
  remaining_time: number;
}

/** Ответ авторизации по OTP */
export interface OTPLoginResponse {
  /** Токен авторизации */
  token: string;
}

// =============================================================================
// Accounts — Users — Enums
// =============================================================================

/** Поддерживаемые провайдеры социальных сетей для авторизации */
export type UserSocialType = 'vk' | 'google' | 'patreon' | 'discord';

/** Типы пользовательских коллекций */
export type UserCollectionType =
  | 'PLANNED'
  | 'WATCHED'
  | 'WATCHING'
  | 'POSTPONED'
  | 'ABANDONED';

/** Варианты сортировки для избранного пользователя */
export type UserFavoriteSorting =
  | 'CREATED_AT_DESC'
  | 'CREATED_AT_ASC'
  | 'FRESH_AT_DESC'
  | 'FRESH_AT_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'YEAR_DESC'
  | 'YEAR_ASC';

// =============================================================================
// Accounts — Users — Models
// =============================================================================

/** Данные по сессии пользователя */
export interface UserSession {
  /** Идентификатор сессии */
  id: string;
  /** Идентификатор пользователя */
  user_id: number;
  /** Информация об устройстве */
  device: {
    /** Название устройства */
    name: string;
    /** Версия ОС */
    version: string;
    /** Платформа ОС */
    platform: string;
  };
  /** Информация о браузере */
  browser: {
    /** Название браузера */
    name: string;
    /** Версия браузера */
    version: string;
  };
  /** Геолокация пользователя */
  location: {
    /** Страна */
    country: string;
    /** ISO-код страны */
    iso_code: string;
  };
  /** Мобильное устройство */
  is_mobile: boolean;
  /** Десктопное устройство */
  is_desktop: boolean;
  /** IP-адрес */
  ip_address: string;
  /** User-Agent строка */
  user_agent: string;
  /** Является ли текущей сессией */
  is_current: boolean;
  /** Дата последней активности (ISO 8601 date-time) */
  last_active: string;
}

/** Данные пользователя по торрентам */
export interface UserTorrents {
  /** passkey пользователя (отображается только для собственного профиля) */
  passkey?: string;
  /** Количество отданного, в байтах */
  uploaded: number;
  /** Количество скачанного, в байтах */
  downloaded: number;
}

/** Данные по пользователю */
export interface User {
  /** Идентификатор пользователя */
  id: number;
  /** Логин пользователя (отображается только для собственного профиля) */
  login?: string;
  /** Email пользователя (отображается только для собственного профиля) */
  email?: string;
  /** Никнейм пользователя */
  nickname: string;
  /** Аватар пользователя */
  avatar?: ImageWithOptimized;
  /** Данные по торрентам */
  torrents?: UserTorrents;
  /** Забанен ли пользователь в данный момент */
  is_banned: boolean;
  /** Дата создания аккаунта (ISO 8601 date-time) */
  created_at: string;
  /** Отображается ли реклама пользователю */
  is_with_ads: boolean;
}

/** Данные по просмотру эпизода пользователем */
export interface UserView {
  /** ID записи просмотра */
  id: number;
  /** Таймкод просмотра, в секундах от начала эпизода */
  time: number;
  /** ID пользователя */
  user_id: number;
  /** Флаг, просмотрен ли эпизод полностью */
  is_watched: boolean;
  /** Дата обновления записи (ISO 8601 date-time) */
  updated_at: string;
  /** ID эпизода релиза (UUID) */
  release_episode_id: string;
}

// =============================================================================
// Accounts — Auth (Авторизация)
// =============================================================================

/** Ответ авторизации по логину и паролю */
export interface LoginResponse {
  /** Токен авторизации (Bearer) */
  token: string;
}

/** Данные для авторизации через социальную сеть */
export interface SocialAuthLoginResponse {
  /** Ссылка на OAuth авторизацию через указанную социальную сеть */
  url: string;
  /** Ключ для аутентификации пройденной авторизации */
  state: string;
}

/** Ответ аутентификации через социальную сеть */
export interface SocialAuthAuthenticateResponse {
  /** JWT токен авторизации */
  token: string;
}

/** Ответ деавторизации */
export interface LogoutResponse {
  /** Обнулённый токен */
  token: null;
}

// =============================================================================
// Accounts — Collections (Коллекции)
// =============================================================================

/** Элемент справочника возрастных рейтингов в коллекциях */
export interface CollectionsReferencesAgeRatingItem {
  /** Значение возрастного рейтинга */
  value: AgeRating;
  /** Название рейтинга */
  label: string;
  /** Описание рейтинга */
  description: string;
}

/** Элемент справочника жанров в коллекциях */
export interface CollectionsReferencesGenreItem {
  /** Идентификатор жанра */
  id: number;
  /** Название жанра */
  name: string;
}

/** Элемент справочника типов релизов в коллекциях */
export interface CollectionsReferencesTypeItem {
  /** Значение типа релиза */
  value: ReleaseType;
  /** Описание типа */
  description: string;
}

/**
 * Элемент идентификатора релиза в коллекции.
 * Кортеж: [ID релиза, тип коллекции]
 */
export type CollectionReleaseItem = [number, UserCollectionType];

/** Релиз в коллекции с жанрами и эпизодами */
export interface CollectionRelease extends Release {
  /** Жанры релиза */
  genres: Genre[];
  /** Эпизоды релиза */
  episodes: Episode[];
}

// =============================================================================
// Accounts — Favorites (Избранное)
// =============================================================================

/** Элемент справочника возрастных рейтингов в избранном */
export interface FavoritesReferencesAgeRatingItem {
  /** Значение возрастного рейтинга */
  value: AgeRating;
  /** Название рейтинга */
  label: string;
  /** Описание рейтинга */
  description: string;
}

/** Элемент справочника жанров в избранном */
export interface FavoritesReferencesGenreItem {
  /** Идентификатор жанра */
  id: number;
  /** Название жанра */
  name: string;
}

/** Элемент справочника сортировок в избранном */
export interface FavoritesReferencesSortingItem {
  /** Значение сортировки */
  value: UserFavoriteSorting;
  /** Название опции сортировки */
  label: string;
  /** Описание опции сортировки */
  description: string;
}

/** Элемент справочника типов релизов в избранном */
export interface FavoritesReferencesTypeItem {
  /** Значение типа релиза */
  value: ReleaseType;
  /** Описание типа */
  description: string;
}

/** Релиз в избранном с жанрами и эпизодами */
export interface FavoriteRelease extends Release {
  /** Жанры релиза */
  genres: Genre[];
  /** Эпизоды релиза */
  episodes: Episode[];
}

// =============================================================================
// Accounts — Views (Просмотры)
// =============================================================================

/** Элемент истории просмотров с данными эпизода и релиза */
export interface ViewHistoryItem extends UserView {
  /** Эпизод с данными релиза */
  release_episode: Episode & {
    /** Релиз, к которому относится эпизод */
    release: Release;
  };
}

/**
 * Элемент таймкода просмотра.
 * Кортеж: [release_episode_id (UUID), time (секунды), is_watched (boolean)]
 */
export type ViewTimecodeItem = [string, number, boolean];

// =============================================================================
// Ads — Enums (Реклама)
// =============================================================================

/** Позиции размещения рекламных баннеров */
export type AdBannerPlacement = 'HOME_SUPPORT' | 'RELEASE_SIDEBAR';

/** Типы событий рекламной статистики */
export type AdStatisticsEventType =
  | 'AD_VAST_SHOW'
  | 'AD_VAST_REQUEST'
  | 'AD_BANNER_VIEW'
  | 'AD_BANNER_CLICK'
  | 'MEDIA_PROMOTION_VIEW'
  | 'MEDIA_PROMOTION_CLICK';

// =============================================================================
// Ads — Models (Реклама)
// =============================================================================

/** Данные рекламного баннера */
export interface AdBanner {
  /** Идентификатор баннера */
  id: number;
  /** Заголовок баннера */
  title: string;
  /** Изображение баннера */
  image?: ImageWithOptimized;
  /** ERID маркировка рекламы */
  ad_erid: string;
  /** URL изображения баннера */
  image_url: string;
  /** URL кнопки баннера */
  button_url: string;
  /** Позиция размещения баннера */
  placement: AdBannerPlacement;
  /** Использовать тёмный оверлей */
  has_overlay: boolean;
  /** Текст кнопки баннера */
  button_title: string;
  /** Описание баннера */
  description: string;
  /** ИНН рекламной компании */
  ad_company_itn: string;
  /** Название рекламной компании */
  ad_company_name: string;
}

/** Данные по рекламе VAST */
export interface AdVast {
  /** Идентификатор VAST (UUID) */
  id: string;
  /** URL VAST XML */
  url: string;
  /** ERID маркировка рекламы */
  ad_erid: string;
  /** ИНН рекламной компании */
  ad_company_itn: string;
  /** Название рекламной компании */
  ad_company_name: string;
}

// =============================================================================
// Anime — Catalog — Enums (Каталог)
// =============================================================================

/** Статусы озвучки/производства релиза в каталоге */
export type CatalogProductionStatus =
  | 'IS_IN_PRODUCTION'
  | 'IS_NOT_IN_PRODUCTION';

/** Статусы выхода (публикации) релиза в каталоге */
export type CatalogPublishStatus =
  | 'IS_ONGOING'
  | 'IS_NOT_ONGOING';

/** Типы сортировок в каталоге */
export type CatalogSorting =
  | 'FRESH_AT_DESC'
  | 'FRESH_AT_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'YEAR_DESC'
  | 'YEAR_ASC';

// =============================================================================
// Anime — Catalog — References (Справочники каталога)
// =============================================================================

/** Элемент справочника возрастных рейтингов каталога */
export interface CatalogReferenceAgeRatingItem {
  /** Значение возрастного рейтинга */
  value: AgeRating;
  /** Название рейтинга */
  label: string;
  /** Описание рейтинга */
  description: string;
}

/** Элемент справочника жанров каталога */
export interface CatalogReferenceGenreItem {
  /** ID жанра */
  id: number;
  /** Название жанра */
  name: string;
}

/** Элемент справочника статусов производства каталога */
export interface CatalogReferenceProductionStatusItem {
  /** Значение статуса */
  value: CatalogProductionStatus;
  /** Описание статуса */
  description: string;
}

/** Элемент справочника статусов публикации каталога */
export interface CatalogReferencePublishStatusItem {
  /** Значение статуса */
  value: CatalogPublishStatus;
  /** Описание статуса */
  description: string;
}

/** Элемент справочника сезонов каталога */
export interface CatalogReferenceSeasonItem {
  /** Значение сезона */
  value: Season;
  /** Название сезона */
  description: string;
}

/** Элемент справочника сортировок каталога */
export interface CatalogReferenceSortingItem {
  /** Значение сортировки */
  value: CatalogSorting;
  /** Название сортировки */
  label: string;
  /** Описание сортировки */
  description: string;
}

/** Элемент справочника типов релизов каталога */
export interface CatalogReferenceTypeItem {
  /** Значение типа релиза */
  value: ReleaseType;
  /** Описание типа */
  description: string;
}

// =============================================================================
// Anime — Franchises (Франшизы)
// =============================================================================

/** Связка релиза с франшизой */
export interface FranchiseRelease {
  /** ID связки релиз — франшиза (UUID) */
  id: string;
  /** Порядок сортировки */
  sort_order: number;
  /** Идентификатор релиза */
  release_id: number;
  /** Идентификатор франшизы (UUID) */
  franchise_id: string;
}

/** Данные по франшизе */
export interface Franchise {
  /** Идентификатор франшизы (UUID) */
  id: string;
  /** Название франшизы (на русском) */
  name: string;
  /** Название франшизы (на английском) */
  name_english: string;
  /** Изображение франшизы */
  image?: ImageWithOptimized;
  /** Рейтинг франшизы */
  rating: number;
  /** Год последнего релиза */
  last_year: number;
  /** Год первого релиза */
  first_year: number;
  /** Количество релизов */
  total_releases: number;
  /** Общее количество эпизодов */
  total_episodes: number;
  /** Общая длительность франшизы (человекочитаемая строка или null) */
  total_duration: string | null;
  /** Общая длительность франшизы в секундах */
  total_duration_in_seconds: number;
}

/** Франшиза с детальными данными о входящих релизах */
export interface FranchiseWithReleases extends Franchise {
  /** Релизы франшизы с полными данными */
  franchise_releases: Array<FranchiseRelease & {
    /** Данные релиза */
    release: Release;
  }>;
}

// =============================================================================
// Anime — Genres (Жанры)
// =============================================================================

/** Данные по жанру */
export interface Genre {
  /** Идентификатор жанра */
  id: number;
  /** Название жанра */
  name: string;
  /** Изображение жанра */
  image?: ImageWithOptimized;
  /** Общее количество релизов в этом жанре */
  total_releases: number;
}

// =============================================================================
// Anime — Releases — Enums (Релизы)
// =============================================================================

/** Возрастные рейтинги */
export type AgeRating =
  | 'R0_PLUS'
  | 'R6_PLUS'
  | 'R12_PLUS'
  | 'R16_PLUS'
  | 'R18_PLUS';

/** Дни недели выхода релиза (1 = Понедельник, 7 = Воскресенье) */
export type PublishDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/** Сезоны */
export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

/** Типы релизов */
export type ReleaseType =
  | 'TV'
  | 'ONA'
  | 'WEB'
  | 'OVA'
  | 'OAD'
  | 'MOVIE'
  | 'DORAMA'
  | 'SPECIAL';

/** Роли участников релиза */
export type ReleaseMemberRole =
  | 'poster'
  | 'timing'
  | 'voicing'
  | 'editing'
  | 'decorating'
  | 'translating';

// =============================================================================
// Anime — Releases — Models (Релизы)
// =============================================================================

/** Информация о роли участника релиза */
export interface ReleaseMemberRoleInfo {
  /** Значение роли */
  value: ReleaseMemberRole;
  /** Описание роли */
  description: string;
}

/** Краткая информация о пользователе, связанном с участником релиза */
export interface ReleaseMemberUser {
  /** ID пользователя */
  id: number;
  /** Аватар пользователя */
  avatar?: ImageWithOptimized;
}

/** Участник релиза */
export interface ReleaseMember {
  /** Идентификатор участника (UUID) */
  id: string;
  /** Роль участника */
  role: ReleaseMemberRoleInfo;
  /** Связанный пользователь (может быть null) */
  user?: ReleaseMemberUser | null;
  /** Никнейм участника */
  nickname: string;
}

/** Информация о типе релиза */
export interface ReleaseTypeInfo {
  /** Значение типа */
  value: ReleaseType;
  /** Описание типа */
  description: string;
}

/** Название релиза */
export interface ReleaseName {
  /** Основное название (на русском) */
  main: string;
  /** Название на английском */
  english: string;
  /** Альтернативное название */
  alternative: string;
}

/** Информация о сезоне релиза */
export interface ReleaseSeasonInfo {
  /** Значение сезона */
  value: Season;
  /** Описание сезона */
  description: string;
}

/** Информация о возрастном рейтинге релиза */
export interface ReleaseAgeRatingInfo {
  /** Значение рейтинга */
  value: AgeRating;
  /** Краткая метка (напр. "16+") */
  label: string;
  /** Является ли контент для взрослых */
  is_adult: boolean;
  /** Описание рейтинга */
  description: string;
}

/** Информация о дне выхода релиза */
export interface ReleasePublishDayInfo {
  /** Числовое значение дня недели (1-7) */
  value: PublishDay;
  /** Описание дня недели */
  description: string;
}

/** Данные по релизу */
export interface Release {
  /** Идентификатор релиза */
  id: number;
  /** Тип релиза */
  type?: ReleaseTypeInfo;
  /** Год выхода */
  year: number;
  /** Названия релиза */
  name: ReleaseName;
  /** Alias (ЧПУ ссылка) */
  alias: string;
  /** Сезон */
  season?: ReleaseSeasonInfo;
  /** Постер релиза */
  poster?: ImageWithOptimized;
  /** Дата поднятия релиза (ISO 8601 date-time) */
  fresh_at: string;
  /** Дата создания релиза (ISO 8601 date-time) */
  created_at: string;
  /** Дата обновления релиза (ISO 8601 date-time) */
  updated_at: string;
  /** Релиз в данный момент выходит в стране производства */
  is_ongoing: boolean;
  /** Возрастной рейтинг */
  age_rating?: ReleaseAgeRatingInfo;
  /** День выхода новых серий */
  publish_day?: ReleasePublishDayInfo;
  /** Описание релиза */
  description: string;
  /** Важная информация / оповещение */
  notification?: string;
  /** Общее количество эпизодов */
  episodes_total: number;
  /** Ссылка на внешний плеер */
  external_player?: string;
  /** Релиз в работе / озвучивается */
  is_in_production: boolean;
  /** Блокировка по геолокации */
  is_blocked_by_geo: boolean;
  /** Релиз заблокирован правообладателем */
  is_blocked_by_copyrights: boolean;
  /** Рейтинг по добавлению в избранное */
  added_in_users_favorites: number;
  /** Средняя продолжительность серий (в минутах) */
  average_duration_of_episode: number;
  /** Кол-во добавлений в коллекцию «Запланировано» */
  added_in_planned_collection: number;
  /** Кол-во добавлений в коллекцию «Просмотрено» */
  added_in_watched_collection: number;
  /** Кол-во добавлений в коллекцию «Смотрю» */
  added_in_watching_collection: number;
  /** Кол-во добавлений в коллекцию «Отложено» */
  added_in_postponed_collection: number;
  /** Кол-во добавлений в коллекцию «Брошено» */
  added_in_abandoned_collection: number;
}

/** Релиз с жанрами */
export interface ReleaseWithGenres extends Release {
  /** Жанры релиза */
  genres: Genre[];
}

/** Релиз с жанрами и участниками */
export interface ReleaseWithMembers extends ReleaseWithGenres {
  /** Участники озвучки/перевода/etc */
  members: ReleaseMember[];
}

/** Релиз с жанрами, участниками и эпизодами */
export interface ReleaseWithEpisodes extends ReleaseWithMembers {
  /** Эпизоды релиза */
  episodes: Episode[];
}

/** Релиз с жанрами, участниками, эпизодами и торрентами */
export interface ReleaseWithTorrents extends ReleaseWithEpisodes {
  /** Торренты релиза */
  torrents: Torrent[];
}

/** Полные данные релиза (одиночный запрос /anime/releases/{id}) */
export interface ReleaseFull extends ReleaseWithTorrents {
  /** Спонсоры релиза */
  sponsors: Sponsor[];
}

/** Релиз с данными о последнем эпизоде (для /anime/releases/latest) */
export interface ReleaseLatest extends ReleaseWithGenres {
  /** Последний вышедший эпизод */
  latest_episode: Episode;
}

/** Релиз в списке /anime/releases/list (paginated, полные данные) */
export interface ReleaseListItem extends ReleaseWithTorrents {
  /** Спонсоры релиза */
  sponsors: Sponsor[];
}

// =============================================================================
// Anime — Episodes (Эпизоды)
// =============================================================================

/** Тайминги пропуска опенинга или эндинга */
export interface EpisodeSkip {
  /** Время начала (секунды от начала/конца эпизода) */
  start: number;
  /** Время окончания (секунды от начала/конца эпизода) */
  stop: number;
}

/** Эпизод релиза */
export interface Episode {
  /** Идентификатор эпизода (UUID) */
  id: string;
  /** Название эпизода */
  name?: string;
  /** Номер эпизода (может быть дробным, напр. 12.5) */
  ordinal: number;
  /** Тайминги эндинга */
  ending?: EpisodeSkip;
  /** Тайминги опенинга */
  opening?: EpisodeSkip;
  /** Превью эпизода */
  preview?: ImageWithOptimized;
  /** Ссылка на HLS поток 480p */
  hls_480?: string;
  /** Ссылка на HLS поток 720p */
  hls_720?: string;
  /** Ссылка на HLS поток 1080p */
  hls_1080?: string;
  /** Длительность эпизода в секундах */
  duration: number;
  /** ID эпизода на Rutube */
  rutube_id?: string;
  /** ID эпизода на YouTube */
  youtube_id?: string;
  /** Дата обновления эпизода (ISO 8601 date-time) */
  updated_at: string;
  /** Порядковый номер для сортировки */
  sort_order: number;
  /** Идентификатор релиза */
  release_id: number;
  /** Название эпизода на английском */
  name_english?: string;
}

/** Эпизод с полными данными релиза (включая все эпизоды релиза) */
export interface EpisodeWithRelease extends Episode {
  /** Релиз, содержащий все эпизоды */
  release: Release & {
    /** Все эпизоды релиза */
    episodes: Episode[];
  };
}

// =============================================================================
// Anime — Schedule (Расписание)
// =============================================================================

/** Релиз в расписании */
export interface ReleaseInSchedule {
  /** Данные релиза */
  release: Release;
  /** Полный сезон уже вышел */
  full_season_is_released: boolean;
  /** Опубликованный эпизод */
  published_release_episode?: Episode;
  /** Номер следующего эпизода (может быть null) */
  next_release_episode_number?: number | null;
}

/** Ответ расписания на текущую дату */
export interface ScheduleNowResponse {
  /** Расписание на сегодня */
  today: ReleaseInSchedule[];
  /** Расписание на завтра */
  tomorrow: ReleaseInSchedule[];
  /** Расписание на вчера */
  yesterday: ReleaseInSchedule[];
}

/** Ответ расписания на текущую неделю */
export interface ScheduleWeekResponse {
  /** Список релизов в расписании */
  data: ReleaseInSchedule[];
}

// =============================================================================
// Anime — Sponsors (Спонсоры)
// =============================================================================

/** Данные по спонсору */
export interface Sponsor {
  /** Идентификатор спонсора (UUID) */
  id: string;
  /** Название спонсора */
  title: string;
  /** Описание спонсора */
  description: string;
  /** Текст ссылки */
  url_title: string;
  /** URL спонсора */
  url: string;
}

// =============================================================================
// Anime — Torrents — Enums (Торренты)
// =============================================================================

/** Кодеки видеодорожки в торренте */
export type TorrentCodec =
  | 'AV1'
  | 'x264/AVC'
  | 'x265/HEVC'
  | 'x265hq/HEVC-HQ';

/** Глубина цвета видеодорожки */
export type TorrentColor = '8bit' | '10Bit';

/** Качество видео в торренте */
export type TorrentQuality =
  | '360p'
  | '480p'
  | '576p'
  | '720p'
  | '1080p'
  | '2k'
  | '4k'
  | '8k';

/** Тип источника видео (тип релиза) */
export type TorrentType =
  | 'BDRip'
  | 'HDRip'
  | 'TVRip'
  | 'WEBRip'
  | 'DTVRip'
  | 'DVDRip'
  | 'HDTVRip'
  | 'WEB-DL'
  | 'WEB-DLRip';

/** Роли участников торрента */
export type TorrentMemberRole = 'HEVC';

// =============================================================================
// Anime — Torrents — Models (Торренты)
// =============================================================================

/** Информация о роли участника торрента */
export interface TorrentMemberRoleInfo {
  /** Значение роли */
  value: TorrentMemberRole;
  /** Описание роли */
  description: string;
}

/** Краткая информация о пользователе, связанном с участником торрента */
export interface TorrentMemberUser {
  /** ID пользователя */
  id: number;
  /** Аватар пользователя */
  avatar?: ImageWithOptimized;
}

/** Участник торрента */
export interface TorrentMember {
  /** Идентификатор участника (UUID) */
  id: string;
  /** Роль участника */
  role: TorrentMemberRoleInfo;
  /** Никнейм участника */
  nickname: string;
  /** Внешняя ссылка (напр. Telegram) */
  external_url?: string;
}

/** Участник торрента с данными пользователя */
export interface TorrentMemberWithUser extends TorrentMember {
  /** Связанный пользователь */
  user?: TorrentMemberUser;
}

/** Информация о типе источника видео в торренте */
export interface TorrentTypeInfo {
  /** Значение типа */
  value: TorrentType;
  /** Описание типа */
  description: string;
}

/** Информация о качестве видео в торренте */
export interface TorrentQualityInfo {
  /** Значение качества */
  value: TorrentQuality;
  /** Описание качества */
  description: string;
}

/** Информация о кодеке видео в торренте */
export interface TorrentCodecInfo {
  /** Значение кодека */
  value: TorrentCodec;
  /** Краткая метка кодека */
  label: string;
  /** Описание кодека */
  description: string;
  /** Цвет лейбла */
  label_color: string;
  /** Отображать ли лейбл рядом с торрентом */
  label_is_visible: boolean;
}

/** Информация о глубине цвета видео в торренте */
export interface TorrentColorInfo {
  /** Значение глубины цвета */
  value: TorrentColor;
  /** Описание */
  description: string;
}

/** Данные по торренту */
export interface Torrent {
  /** Идентификатор торрента */
  id: number;
  /** Hash торрента */
  hash: string;
  /** Размер торрент-файла в байтах */
  size: number;
  /** Тип источника видео */
  type: TorrentTypeInfo;
  /** Глубина цвета видеодорожки */
  color: TorrentColorInfo;
  /** Кодек видеодорожки */
  codec: TorrentCodecInfo;
  /** Лейбл торрента */
  label: string;
  /** Качество видео */
  quality: TorrentQualityInfo;
  /** Magnet-ссылка */
  magnet: string;
  /** Имя файла торрента */
  filename: string;
  /** Количество сидеров */
  seeders: number;
  /** Битрейт (Кбит/сек) */
  bitrate: number;
  /** Количество личеров */
  leechers: number;
  /** Порядок сортировки внутри релиза */
  sort_order: number;
  /** Дата обновления (ISO 8601 date-time) */
  updated_at: string;
  /** Является ли торрент хардсабом */
  is_hardsub: boolean;
  /** Описание торрента */
  description?: string;
  /** Дата создания (ISO 8601 date-time) */
  created_at: string;
  /** Общее количество скачиваний */
  completed_times: number;
}

/** Торрент с участниками */
export interface TorrentWithMembers extends Torrent {
  /** Участники торрента с данными пользователей */
  torrent_members: TorrentMemberWithUser[];
}

/** Торрент с участниками и релизом */
export interface TorrentWithRelease extends TorrentWithMembers {
  /** Данные релиза */
  release: Release;
}

// =============================================================================
// App — Search & Status (Приложение)
// =============================================================================

/** Данные запроса в ответе статуса */
export interface AppStatusRequest {
  /** IP-адрес */
  ip: string;
  /** Страна */
  country: string;
  /** ISO-код страны */
  iso_code: string;
  /** Часовой пояс */
  timezone: string;
}

/** Статус API */
export interface AppStatus {
  /** Данные запроса */
  request: AppStatusRequest;
  /** API доступно */
  is_alive: boolean;
  /** Список доступных API эндпоинтов */
  available_api_endpoints: string[];
}

// =============================================================================
// Media — Promotions (Промо-материалы)
// =============================================================================

/** Данные по промо-материалу */
export interface MediaPromotion {
  /** Идентификатор (UUID) */
  id: string;
  /** Кастомная ссылка на промо-материал */
  url?: string;
  /** Кастомная подпись к ссылке */
  url_label?: string;
  /** Изображение */
  image?: ImageWithOptimized;
  /** Кастомное название */
  title?: string;
  /** Кастомное описание */
  description?: string;
  /** Флаг рекламной промо-кампании */
  is_ad: boolean;
  /** ERID маркировка рекламы */
  ad_erid?: string;
  /** Источник рекламы */
  ad_origin?: string;
  /** Связанный релиз */
  release?: Release;
  /** Использовать тёмный оверлей */
  has_overlay: boolean;
}

// =============================================================================
// Media — Videos — Enums (Видеоконтент)
// =============================================================================

/** Типы источников видео */
export type VideoOriginType = 'YOUTUBE_PLAYLIST';

// =============================================================================
// Media — Videos — Models (Видеоконтент)
// =============================================================================

/** Тип источника видео */
export interface VideoOriginTypeInfo {
  /** Значение типа */
  value: VideoOriginType;
  /** Описание типа */
  description: string;
}

/** Данные по видео-источнику */
export interface VideoOrigin {
  /** Идентификатор (UUID) */
  id: string;
  /** URL плейлиста */
  url: string;
  /** Тип источника */
  type: VideoOriginTypeInfo;
  /** Название */
  title: string;
  /** Описание */
  description?: string;
  /** Является анонсом сезона */
  is_announce: boolean;
}

/** Данные по видео-ролику */
export interface VideoContent {
  /** Идентификатор */
  id: number;
  /** URL видео */
  url: string;
  /** Название */
  title: string;
  /** Количество просмотров */
  views: number;
  /** Превью изображение */
  image?: ImageWithOptimized;
  /** Количество комментариев */
  comments: number;
  /** ID видео на платформе */
  video_id: string;
  /** Дата создания (ISO 8601 date-time) */
  created_at: string;
  /** Дата обновления (ISO 8601 date-time) */
  updated_at: string;
  /** Является анонсом сезона */
  is_announce: boolean;
}

/** Видео-ролик с данными источника */
export interface VideoWithOrigin extends VideoContent {
  /** Данные источника видео */
  origin: VideoOrigin;
}

// =============================================================================
// Teams (Команды)
// =============================================================================

/** Роль в команде */
export interface TeamRole {
  /** ID роли (UUID) */
  id: string;
  /** Название роли */
  title: string;
  /** Цвет */
  color: string;
  /** Порядок сортировки */
  sort_order: number;
}

/** Аккаунт пользователя в команде */
export interface TeamUserAccount {
  /** ID пользователя */
  id: number;
  /** Никнейм */
  nickname: string;
  /** Аватар */
  avatar?: ImageWithOptimized;
}

/** Участник команды (анилибриец) */
export interface TeamUser {
  /** ID анилибрийца (UUID) */
  id: string;
  /** Псевдоним в команде */
  nickname: string;
  /** Является стажером */
  is_intern: boolean;
  /** Порядок сортировки */
  sort_order: number;
  /** Находится в отпуске */
  is_vacation: boolean;
}

/** Полные данные участника команды */
export interface TeamUserFull extends TeamUser {
  /** Команда */
  team: Team;
  /** Аккаунт пользователя */
  user: TeamUserAccount;
  /** Роли в команде */
  roles: TeamRole[];
}

/** Данные по команде */
export interface Team {
  /** ID команды (UUID) */
  id: string;
  /** Название команды */
  title: string;
  /** Порядок сортировки */
  sort_order: number;
  /** Описание команды */
  description?: string;
}

// =============================================================================
// API Request Parameters (Параметры запросов)
// =============================================================================

/** Параметры include/exclude для выборки полей */
export interface IncludeExcludeParams {
  /**
   * Список включаемых полей.
   * Через запятую или массив. Поддерживается вложенность через точку.
   * @example "id,type.description"
   */
  include?: string | string[];
  /**
   * Список исключаемых полей.
   * Через запятую или массив. Поддерживается вложенность через точку.
   * Имеет приоритет над include.
   * @example "poster,description"
   */
  exclude?: string | string[];
}

/** Параметры пагинации */
export interface PaginationParams {
  /** Номер страницы */
  page?: number;
  /** Количество элементов на страницу */
  limit?: number;
}

// =============================================================================
// API Response Types (Типы ответов)
// =============================================================================

// --- Каталог ---
/** Пагинированный список релизов каталога (с жанрами) */
export type CatalogReleasesResponse = PaginatedResponse<ReleaseWithGenres>;

// --- Коллекции ---
/** Пагинированный список релизов из коллекции */
export type CollectionReleasesResponse = PaginatedResponse<CollectionRelease>;
/** Список ID релизов и типов коллекций */
export type CollectionIdsResponse = CollectionReleaseItem[];

// --- Избранное ---
/** Пагинированный список релизов из избранного */
export type FavoriteReleasesResponse = PaginatedResponse<FavoriteRelease>;
/** Список ID релизов в избранном */
export type FavoriteIdsResponse = number[];

// --- Просмотры ---
/** Пагинированная история просмотров */
export type ViewHistoryResponse = PaginatedResponse<ViewHistoryItem>;
/** Список таймкодов просмотра */
export type ViewTimecodesResponse = ViewTimecodeItem[];

// --- Торренты ---
/** Пагинированный список торрентов с релизами */
export type TorrentsResponse = PaginatedResponse<TorrentWithRelease>;

// --- Жанры ---
/** Пагинированный список релизов жанра */
export type GenreReleasesResponse = PaginatedResponse<Release>;

// --- Релизы ---
/** Список последних релизов */
export type LatestReleasesResponse = ReleaseLatest[];
/** Список случайных релизов */
export type RandomReleasesResponse = Release[];
/** Список рекомендованных релизов */
export type RecommendedReleasesResponse = Release[];
/** Результаты поиска релизов */
export type SearchReleasesResponse = Release[];
/** Пагинированный список релизов (/anime/releases/list — полные данные) */
export type ReleasesListResponse = PaginatedResponse<ReleaseListItem>;

// --- Франшизы ---
/** Список франшиз */
export type FranchisesResponse = Franchise[];
/** Одна франшиза с релизами */
export type FranchiseResponse = FranchiseWithReleases;
/** Список случайных франшиз */
export type RandomFranchisesResponse = Franchise[];
/** Франшизы для конкретного релиза */
export type FranchisesByReleaseResponse = FranchiseWithReleases[];

// --- Жанры ---
/** Список всех жанров */
export type GenresResponse = Genre[];
/** Данные одного жанра */
export type GenreResponse = Genre;

// --- Реклама ---
/** Список VAST реклам */
export type VastsResponse = AdVast[];

// --- Медиа ---
/** Ответ со списком промо-материалов */
export interface MediaPromotionsResponse {
  data: MediaPromotion[];
}

/** Ответ со списком видео-роликов */
export interface MediaVideosResponse {
  data: VideoWithOrigin[];
}

// --- Команды ---
/** Список команд */
export type TeamsResponse = Team[];
/** Список ролей в командах */
export type TeamRolesResponse = TeamRole[];
/** Список анилибрийцев с полными данными */
export type TeamUsersResponse = TeamUserFull[];

// =============================================================================
// HTTP — Ошибки и обертка ответа
// =============================================================================

/** Ошибка API */
export interface ApiError {
  /** Сообщение об ошибке */
  message?: string;
  /** Ошибки валидации (ключ — имя поля, значение — список сообщений) */
  errors?: Record<string, string[]>;
}

/** Обёртка ответа API с типизированным data и информацией об ошибке */
export interface ApiResponse<T> {
  /** Данные ответа (присутствуют при успехе) */
  data?: T;
  /** Данные ошибки (присутствуют при неуспешном запросе) */
  error?: ApiError;
  /** HTTP статус-код */
  status: number;
}
