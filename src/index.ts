// =============================================================================
// AniLiberty API V1 — Клиент
// Сгенерировано на основе OpenAPI спецификации (api-docs.json)
// =============================================================================

import {
  // Commons
  ApiResponse,
  PaginationParams,
  IncludeExcludeParams,

  // OTP
  OTPGetResponse,
  OTPLoginResponse,

  // Auth
  LoginResponse,
  SocialAuthLoginResponse,
  SocialAuthAuthenticateResponse,
  LogoutResponse,
  UserSocialType,

  // User
  User,
  UserView,

  // Collections
  UserCollectionType,
  CollectionsReferencesAgeRatingItem,
  CollectionsReferencesGenreItem,
  CollectionsReferencesTypeItem,
  CollectionIdsResponse,
  CollectionReleasesResponse,
  CollectionReleaseItem,

  // Favorites
  UserFavoriteSorting,
  FavoritesReferencesAgeRatingItem,
  FavoritesReferencesGenreItem,
  FavoritesReferencesSortingItem,
  FavoritesReferencesTypeItem,
  FavoriteIdsResponse,
  FavoriteReleasesResponse,

  // Views
  ViewHistoryResponse,
  ViewTimecodesResponse,

  // Ads
  AdVast,

  // Catalog
  CatalogSorting,
  CatalogProductionStatus,
  CatalogPublishStatus,
  CatalogReleasesResponse,
  CatalogReferenceAgeRatingItem,
  CatalogReferenceGenreItem,
  CatalogReferenceProductionStatusItem,
  CatalogReferencePublishStatusItem,
  CatalogReferenceSeasonItem,
  CatalogReferenceSortingItem,
  CatalogReferenceTypeItem,

  // Franchises
  FranchisesResponse,
  FranchiseResponse,
  RandomFranchisesResponse,
  FranchisesByReleaseResponse,

  // Genres
  Genre,
  GenresResponse,
  GenreResponse,
  GenreReleasesResponse,

  // Releases
  ReleaseFull,
  ReleaseLatest,
  LatestReleasesResponse,
  RandomReleasesResponse,
  RecommendedReleasesResponse,
  SearchReleasesResponse,
  ReleasesListResponse,
  ReleaseMember,

  // Episodes
  EpisodeWithRelease,

  // Schedule
  ScheduleNowResponse,
  ScheduleWeekResponse,

  // Torrents
  TorrentWithRelease,
  TorrentsResponse,

  // App
  AppStatus,

  // Media
  MediaPromotionsResponse,
  MediaVideosResponse,

  // Teams
  TeamsResponse,
  TeamRolesResponse,
  TeamUsersResponse,

  // Enums
  AgeRating,
  Season,
  ReleaseType,
} from './api-types';

// =============================================================================
// REQUEST BODY ИНТЕРФЕЙСЫ
// =============================================================================

/**
 * Тело запроса для получения OTP.
 * @see POST /accounts/otp/get
 */
export interface OTPGetRequest {
  /** Идентификатор устройства */
  device_id: string;
}

/**
 * Тело запроса для привязки пользователя к OTP.
 * @see POST /accounts/otp/accept
 */
export interface OTPAcceptRequest {
  /** Код OTP */
  code: number;
}

/**
 * Тело запроса для авторизации по OTP.
 * @see POST /accounts/otp/login
 */
export interface OTPLoginRequest {
  /** Код OTP */
  code: number;
  /** Идентификатор устройства */
  device_id: string;
}

/**
 * Тело запроса авторизации по логину и паролю.
 * @see POST /accounts/users/auth/login
 */
export interface LoginRequest {
  /** Логин пользователя */
  login: string;
  /** Пароль пользователя */
  password: string;
}

/**
 * Тело запроса на восстановление пароля.
 * @see POST /accounts/users/auth/password/forget
 */
export interface PasswordForgetRequest {
  /** Email адрес пользователя */
  email: string;
}

/**
 * Тело запроса на сброс и установку нового пароля.
 * @see POST /accounts/users/auth/password/reset
 */
export interface PasswordResetRequest {
  /** Токен из письма восстановления */
  token: string;
  /** Новый пароль */
  password: string;
  /** Подтверждение нового пароля */
  password_confirmation: string;
}

/**
 * Тело POST-запроса для получения релизов из коллекции.
 * @see POST /accounts/users/me/collections/releases
 */
export interface CollectionReleasesRequestBody {
  /** Номер страницы */
  page?: number;
  /** Количество элементов на страницу */
  limit?: number;
  /** Тип коллекции */
  type_of_collection: UserCollectionType;
  /** Фильтры */
  f?: {
    /** Список идентификаторов жанров через запятую */
    genres?: string;
    /** Список типов релизов */
    types?: ReleaseType[];
    /** Года выхода через запятую */
    years?: string;
    /** Поисковый запрос */
    search?: string;
    /** Список возрастных рейтингов */
    age_ratings?: AgeRating[];
  };
  /** Включаемые поля через запятую */
  include?: string;
  /** Исключаемые поля через запятую */
  exclude?: string;
}

/**
 * Элемент массива для добавления релиза в коллекцию.
 * @see POST /accounts/users/me/collections
 */
export interface AddToCollectionRequest {
  /** ID релиза */
  release_id: number;
  /** Тип коллекции */
  type_of_collection: UserCollectionType;
}

/**
 * Элемент массива для удаления релиза из коллекции.
 * @see DELETE /accounts/users/me/collections
 */
export interface RemoveFromCollectionRequest {
  /** ID релиза */
  release_id: number;
}

/**
 * Тело POST-запроса для получения релизов из избранного.
 * @see POST /accounts/users/me/favorites/releases
 */
export interface FavoriteReleasesRequestBody {
  /** Номер страницы */
  page?: number;
  /** Количество элементов на страницу */
  limit?: number;
  /** Фильтры */
  f?: {
    /** Года выхода через запятую */
    years?: string;
    /** Список типов релизов */
    types?: ReleaseType[];
    /** Список идентификаторов жанров через запятую */
    genres?: string;
    /** Поисковый запрос */
    search?: string;
    /** Тип сортировки */
    sorting?: UserFavoriteSorting;
    /** Список возрастных рейтингов */
    age_ratings?: AgeRating[];
  };
  /** Включаемые поля через запятую */
  include?: string;
  /** Исключаемые поля через запятую */
  exclude?: string;
}

/**
 * Элемент массива для добавления релиза в избранное.
 * @see POST /accounts/users/me/favorites
 */
export interface AddToFavoriteRequest {
  /** ID релиза */
  release_id: number;
}

/**
 * Элемент массива для удаления релиза из избранного.
 * @see DELETE /accounts/users/me/favorites
 */
export interface RemoveFromFavoriteRequest {
  /** ID релиза */
  release_id: number;
}

/**
 * Элемент массива для обновления таймкода просмотра.
 * @see POST /accounts/users/me/views/timecodes
 */
export interface UpdateTimecodeRequest {
  /** Таймкод в секундах */
  time: number;
  /** Флаг полного просмотра */
  is_watched: boolean;
  /** ID эпизода релиза (UUID, макс. 36 символов) */
  release_episode_id: string;
}

/**
 * Элемент массива для удаления таймкода просмотра.
 * @see DELETE /accounts/users/me/views/timecodes
 */
export interface DeleteTimecodeRequest {
  /** ID эпизода релиза (UUID, макс. 36 символов) */
  release_episode_id: string;
}

/**
 * Тело POST-запроса для каталога релизов.
 * @see POST /anime/catalog/releases
 */
export interface CatalogReleasesRequestBody {
  /** Номер страницы */
  page?: number;
  /** Количество элементов на страницу */
  limit?: number;
  /** Фильтры */
  f?: {
    /** Список ID жанров */
    genres?: number[];
    /** Список типов релизов */
    types?: ReleaseType[];
    /** Список сезонов */
    seasons?: Season[];
    /** Диапазон годов */
    years?: {
      /** Минимальный год */
      from_year?: number;
      /** Максимальный год */
      to_year?: number;
    };
    /** Поисковый запрос */
    search?: string;
    /** Тип сортировки */
    sorting?: CatalogSorting;
    /** Список возрастных рейтингов */
    age_ratings?: AgeRating[];
    /** Список статусов публикации */
    publish_statuses?: CatalogPublishStatus[];
    /** Список статусов производства */
    production_statuses?: CatalogProductionStatus[];
  };
  /** Включаемые поля через запятую */
  include?: string;
  /** Исключаемые поля через запятую */
  exclude?: string;
}

// =============================================================================
// GET-параметры запросов коллекций
// =============================================================================

/** GET-параметры для запроса релизов из коллекции */
export interface CollectionReleasesGetParams extends PaginationParams, IncludeExcludeParams {
  /** Тип коллекции (обязательный) */
  type_of_collection: UserCollectionType;
  /** Список идентификаторов жанров через запятую */
  'f[genres]'?: string;
  /** Список типов релизов */
  'f[types]'?: ReleaseType[];
  /** Года выхода через запятую */
  'f[years]'?: string;
  /** Поисковый запрос */
  'f[search]'?: string;
  /** Список возрастных рейтингов */
  'f[age_ratings]'?: AgeRating[];
}

/** GET-параметры для запроса релизов из избранного */
export interface FavoriteReleasesGetParams extends PaginationParams, IncludeExcludeParams {
  /** Года выхода через запятую */
  'f[years]'?: string;
  /** Список типов релизов */
  'f[types]'?: ReleaseType[];
  /** Список идентификаторов жанров через запятую */
  'f[genres]'?: string;
  /** Поисковый запрос */
  'f[search]'?: string;
  /** Тип сортировки */
  'f[sorting]'?: UserFavoriteSorting;
  /** Список возрастных рейтингов */
  'f[age_ratings]'?: AgeRating[];
}

/** GET-параметры для каталога релизов */
export interface CatalogReleasesGetParams extends PaginationParams, IncludeExcludeParams {
  /** Список идентификаторов жанров через запятую */
  'f[genres]'?: string;
  /** Список типов релизов */
  'f[types]'?: ReleaseType[];
  /** Список сезонов */
  'f[seasons]'?: Season[];
  /** Минимальный год */
  'f[years][from_year]'?: number;
  /** Максимальный год */
  'f[years][to_year]'?: number;
  /** Поисковый запрос */
  'f[search]'?: string;
  /** Тип сортировки */
  'f[sorting]'?: CatalogSorting;
  /** Список возрастных рейтингов */
  'f[age_ratings]'?: AgeRating[];
  /** Список статусов публикации */
  'f[publish_statuses]'?: CatalogPublishStatus[];
  /** Список статусов производства */
  'f[production_statuses]'?: CatalogProductionStatus[];
}

// =============================================================================
// КОНФИГУРАЦИЯ КЛИЕНТА
// =============================================================================

/** Конфигурация клиента AniLiberty API */
export interface AniLibertyClientConfig {
  /**
   * Базовый URL API.
   * @default "https://aniliberty.top/api/v1"
   */
  baseUrl?: string;
  /**
   * Таймаут запроса в миллисекундах.
   * @default 30000
   */
  timeout?: number;
  /** Дополнительные HTTP заголовки */
  headers?: Record<string, string>;
}

// =============================================================================
// ОСНОВНОЙ КЛАСС API КЛИЕНТА
// =============================================================================

/**
 * Клиент для AniLiberty API V1.
 *
 * Покрывает все эндпоинты OpenAPI спецификации:
 * - OTP авторизация
 * - Авторизация по логину/паролю и через социальные сети
 * - Управление паролем (восстановление и сброс)
 * - Профиль пользователя
 * - Коллекции (справочники, CRUD, фильтрация)
 * - Избранное (справочники, CRUD, фильтрация)
 * - История просмотров и таймкоды
 * - Реклама (VAST)
 * - Каталог аниме (справочники, фильтрация)
 * - Франшизы
 * - Жанры
 * - Релизы (поиск, рекомендации, случайные, по ID/alias)
 * - Эпизоды и таймкоды
 * - Расписание
 * - Торренты (данные, файлы, RSS)
 * - Поиск
 * - Статус API
 * - Медиа (промо, видео)
 * - Команды (роли, участники)
 *
 * @example
 * ```ts
 * const client = new AniLibertyClient();
 * const { data } = await client.getLatestReleases({ limit: 10 });
 * ```
 */
export class AniLibertyClient {
  private baseUrl: string;
  private timeout: number;
  private headers: Record<string, string>;
  private accessToken?: string;

  constructor(config: AniLibertyClientConfig = {}) {
    this.baseUrl = config.baseUrl || 'https://aniliberty.top/api/v1';
    this.timeout = config.timeout || 30000;
    this.headers = {
      'Content-Type': 'application/json',
      ...config.headers,
    };
  }

  /**
   * Устанавливает токен авторизации (Bearer).
   * @param token - Токен авторизации
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /** Удаляет токен авторизации */
  clearAccessToken(): void {
    this.accessToken = undefined;
  }

  /** Возвращает текущий токен авторизации */
  getAccessToken(): string | undefined {
    return this.accessToken;
  }

  /**
   * Формирует заголовки запроса с учётом авторизации.
   * @returns HTTP заголовки
   */
  private getHeaders(): Record<string, string> {
    const headers = { ...this.headers };
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  /**
   * Выполняет HTTP запрос к API.
   * @param method - HTTP метод
   * @param path - Путь эндпоинта (без baseUrl)
   * @param data - Тело запроса (для POST/PUT/PATCH/DELETE)
   * @param params - Query параметры
   * @returns Типизированный ответ API
   */
  private async request<T>(
    method: string,
    path: string,
    data?: unknown,
    params?: Record<string, unknown>
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => url.searchParams.append(key, String(v)));
          } else {
            url.searchParams.append(key, String(value));
          }
        }
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    const options: RequestInit = {
      method,
      headers: this.getHeaders() as any,
      signal: controller.signal as any,
    };

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH' || method === 'DELETE')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url.toString(), options);
      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const responseData = contentType?.includes('application/json')
        ? await response.json()
        : null;

      if (!response.ok) {
        return {
          status: response.status,
          error: responseData || { message: `HTTP Error ${response.status}` },
        };
      }

      return {
        status: response.status,
        data: responseData as T,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        status: 0,
        error: { message: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  // ==========================================================================
  // АККАУНТЫ — ОДНОРАЗОВЫЕ ПАРОЛИ (OTP)
  // ==========================================================================

  /**
   * Запрашивает новый одноразовый пароль (OTP).
   *
   * @param request - Данные запроса (device_id)
   * @returns Данные OTP с оставшимся временем жизни
   *
   * @see POST /accounts/otp/get
   */
  async otpGet(request: OTPGetRequest): Promise<ApiResponse<OTPGetResponse>> {
    return this.request<OTPGetResponse>('POST', '/accounts/otp/get', request);
  }

  /**
   * Присоединяет авторизованного пользователя к выданному OTP.
   * Требует авторизации (sessionToken).
   *
   * @param request - Код OTP
   * @returns Пустой ответ при успехе
   *
   * @see POST /accounts/otp/accept
   */
  async otpAccept(request: OTPAcceptRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/otp/accept', request);
  }

  /**
   * Авторизуется по выданному одноразовому паролю.
   * При успешной авторизации автоматически устанавливает токен.
   *
   * @param request - Код OTP и device_id
   * @returns Токен авторизации
   *
   * @see POST /accounts/otp/login
   */
  async otpLogin(request: OTPLoginRequest): Promise<ApiResponse<OTPLoginResponse>> {
    const response = await this.request<OTPLoginResponse>('POST', '/accounts/otp/login', request);
    if (response.data?.token) {
      this.setAccessToken(response.data.token);
    }
    return response;
  }

  // ==========================================================================
  // АККАУНТЫ — АВТОРИЗАЦИЯ
  // ==========================================================================

  /**
   * Авторизация по логину и паролю.
   * Создание сессии пользователя, выдача токена авторизации.
   * При успешной авторизации автоматически устанавливает токен.
   *
   * @param request - Логин и пароль
   * @returns Токен авторизации
   *
   * @see POST /accounts/users/auth/login
   */
  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('POST', '/accounts/users/auth/login', request);
    if (response.data?.token) {
      this.setAccessToken(response.data.token);
    }
    return response;
  }

  /**
   * Деавторизация пользователя.
   * Автоматически очищает токен клиента.
   * Требует авторизации (sessionToken).
   *
   * @returns Обнулённый токен
   *
   * @see POST /accounts/users/auth/logout
   */
  async logout(): Promise<ApiResponse<LogoutResponse>> {
    const response = await this.request<LogoutResponse>('POST', '/accounts/users/auth/logout');
    this.clearAccessToken();
    return response;
  }

  // ==========================================================================
  // СОЦИАЛЬНЫЕ СЕТИ
  // ==========================================================================

  /**
   * Получает URL для авторизации через социальную сеть.
   *
   * @param provider - Провайдер социальной сети (vk, google, patreon, discord)
   * @returns URL для OAuth авторизации и state-ключ
   *
   * @see GET /accounts/users/auth/social/{provider}/login
   */
  async socialAuthLogin(provider: UserSocialType): Promise<ApiResponse<SocialAuthLoginResponse>> {
    return this.request<SocialAuthLoginResponse>('GET', `/accounts/users/auth/social/${provider}/login`);
  }

  /**
   * Аутентифицирует пользователя после авторизации через социальную сеть.
   * При успешной аутентификации автоматически устанавливает токен.
   *
   * @param state - Ключ аутентификации, полученный из socialAuthLogin
   * @returns Токен авторизации
   *
   * @see GET /accounts/users/auth/social/authenticate
   */
  async socialAuthAuthenticate(state: string): Promise<ApiResponse<SocialAuthAuthenticateResponse>> {
    const response = await this.request<SocialAuthAuthenticateResponse>(
      'GET',
      '/accounts/users/auth/social/authenticate',
      undefined,
      { state }
    );
    if (response.data?.token) {
      this.setAccessToken(response.data.token);
    }
    return response;
  }

  // ==========================================================================
  // СБРОС ПАРОЛЯ
  // ==========================================================================

  /**
   * Отправляет ссылку на восстановление забытого пароля.
   *
   * @param request - Email пользователя
   * @returns Пустой ответ при успехе (письмо отправлено)
   *
   * @see POST /accounts/users/auth/password/forget
   */
  async passwordForget(request: PasswordForgetRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/forget', request);
  }

  /**
   * Сброс и установка нового пароля.
   *
   * @param request - Токен из письма, новый пароль и подтверждение
   * @returns Пустой ответ при успехе
   *
   * @see POST /accounts/users/auth/password/reset
   */
  async passwordReset(request: PasswordResetRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/reset', request);
  }

  // ==========================================================================
  // ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
  // ==========================================================================

  /**
   * Возвращает данные профиля авторизованного пользователя.
   * Требует авторизации (sessionToken).
   *
   * @param params - Параметры include/exclude для выборки полей
   * @returns Данные пользователя
   *
   * @see GET /accounts/users/me/profile
   */
  async getMyProfile(params?: IncludeExcludeParams): Promise<ApiResponse<User>> {
    return this.request<User>('GET', '/accounts/users/me/profile', undefined, params as Record<string, unknown>);
  }

  // ==========================================================================
  // КОЛЛЕКЦИИ — СПРАВОЧНИКИ
  // ==========================================================================

  /**
   * Список возрастных рейтингов в коллекциях текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника возрастных рейтингов
   *
   * @see GET /accounts/users/me/collections/references/age-ratings
   */
  async getCollectionAgeRatings(): Promise<ApiResponse<CollectionsReferencesAgeRatingItem[]>> {
    return this.request<CollectionsReferencesAgeRatingItem[]>(
      'GET',
      '/accounts/users/me/collections/references/age-ratings'
    );
  }

  /**
   * Список жанров в коллекциях текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника жанров
   *
   * @see GET /accounts/users/me/collections/references/genres
   */
  async getCollectionGenres(): Promise<ApiResponse<CollectionsReferencesGenreItem[]>> {
    return this.request<CollectionsReferencesGenreItem[]>(
      'GET',
      '/accounts/users/me/collections/references/genres'
    );
  }

  /**
   * Список типов релизов в коллекциях текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника типов
   *
   * @see GET /accounts/users/me/collections/references/types
   */
  async getCollectionTypes(): Promise<ApiResponse<CollectionsReferencesTypeItem[]>> {
    return this.request<CollectionsReferencesTypeItem[]>(
      'GET',
      '/accounts/users/me/collections/references/types'
    );
  }

  /**
   * Список годов в коллекциях текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив годов
   *
   * @see GET /accounts/users/me/collections/references/years
   */
  async getCollectionYears(): Promise<ApiResponse<number[]>> {
    return this.request<number[]>(
      'GET',
      '/accounts/users/me/collections/references/years'
    );
  }

  // ==========================================================================
  // КОЛЛЕКЦИИ
  // ==========================================================================

  /**
   * Список идентификаторов релизов, добавленных в коллекции.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив кортежей [release_id, collection_type]
   *
   * @see GET /accounts/users/me/collections/ids
   */
  async getCollectionIds(): Promise<ApiResponse<CollectionIdsResponse>> {
    return this.request<CollectionIdsResponse>('GET', '/accounts/users/me/collections/ids');
  }

  /**
   * Список релизов из коллекции (GET-запрос с query-параметрами).
   * Требует авторизации (sessionToken).
   *
   * @param params - Параметры фильтрации и пагинации
   * @returns Пагинированный список релизов с жанрами и эпизодами
   *
   * @see GET /accounts/users/me/collections/releases
   */
  async getCollectionReleases(
    params: CollectionReleasesGetParams
  ): Promise<ApiResponse<CollectionReleasesResponse>> {
    return this.request<CollectionReleasesResponse>(
      'GET',
      '/accounts/users/me/collections/releases',
      undefined,
      params as unknown as Record<string, unknown>
    );
  }

  /**
   * Список релизов из коллекции (POST-запрос с телом).
   * Требует авторизации (sessionToken).
   *
   * @param body - Параметры фильтрации и пагинации в теле запроса
   * @returns Пагинированный список релизов с жанрами и эпизодами
   *
   * @see POST /accounts/users/me/collections/releases
   */
  async getCollectionReleasesPost(
    body: CollectionReleasesRequestBody
  ): Promise<ApiResponse<CollectionReleasesResponse>> {
    return this.request<CollectionReleasesResponse>(
      'POST',
      '/accounts/users/me/collections/releases',
      body
    );
  }

  /**
   * Добавляет релизы в соответствующие коллекции.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив пар {release_id, type_of_collection}
   * @returns Обновлённый список кортежей [release_id, collection_type]
   *
   * @see POST /accounts/users/me/collections
   */
  async addToCollection(
    requests: AddToCollectionRequest[]
  ): Promise<ApiResponse<CollectionReleaseItem[]>> {
    return this.request<CollectionReleaseItem[]>('POST', '/accounts/users/me/collections', requests);
  }

  /**
   * Удаляет релизы из коллекций.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив {release_id} для удаления
   * @returns Обновлённый список кортежей [release_id, collection_type]
   *
   * @see DELETE /accounts/users/me/collections
   */
  async removeFromCollection(
    requests: RemoveFromCollectionRequest[]
  ): Promise<ApiResponse<CollectionReleaseItem[]>> {
    return this.request<CollectionReleaseItem[]>('DELETE', '/accounts/users/me/collections', requests);
  }

  // ==========================================================================
  // ИЗБРАННОЕ — СПРАВОЧНИКИ
  // ==========================================================================

  /**
   * Список возрастных рейтингов в избранном текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника возрастных рейтингов
   *
   * @see GET /accounts/users/me/favorites/references/age-ratings
   */
  async getFavoriteAgeRatings(): Promise<ApiResponse<FavoritesReferencesAgeRatingItem[]>> {
    return this.request<FavoritesReferencesAgeRatingItem[]>(
      'GET',
      '/accounts/users/me/favorites/references/age-ratings'
    );
  }

  /**
   * Список жанров в избранном текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника жанров
   *
   * @see GET /accounts/users/me/favorites/references/genres
   */
  async getFavoriteGenres(): Promise<ApiResponse<FavoritesReferencesGenreItem[]>> {
    return this.request<FavoritesReferencesGenreItem[]>(
      'GET',
      '/accounts/users/me/favorites/references/genres'
    );
  }

  /**
   * Список опций сортировки в избранном текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника сортировок
   *
   * @see GET /accounts/users/me/favorites/references/sorting
   */
  async getFavoriteSorting(): Promise<ApiResponse<FavoritesReferencesSortingItem[]>> {
    return this.request<FavoritesReferencesSortingItem[]>(
      'GET',
      '/accounts/users/me/favorites/references/sorting'
    );
  }

  /**
   * Список типов релизов в избранном текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив элементов справочника типов
   *
   * @see GET /accounts/users/me/favorites/references/types
   */
  async getFavoriteTypes(): Promise<ApiResponse<FavoritesReferencesTypeItem[]>> {
    return this.request<FavoritesReferencesTypeItem[]>(
      'GET',
      '/accounts/users/me/favorites/references/types'
    );
  }

  /**
   * Список годов выхода релизов в избранном текущего пользователя.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив годов
   *
   * @see GET /accounts/users/me/favorites/references/years
   */
  async getFavoriteYears(): Promise<ApiResponse<number[]>> {
    return this.request<number[]>(
      'GET',
      '/accounts/users/me/favorites/references/years'
    );
  }

  // ==========================================================================
  // ИЗБРАННОЕ
  // ==========================================================================

  /**
   * Список идентификаторов релизов в избранном.
   * Требует авторизации (sessionToken).
   *
   * @returns Массив ID релизов
   *
   * @see GET /accounts/users/me/favorites/ids
   */
  async getFavoriteIds(): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('GET', '/accounts/users/me/favorites/ids');
  }

  /**
   * Список релизов в избранном (GET-запрос с query-параметрами).
   * Требует авторизации (sessionToken).
   *
   * @param params - Параметры фильтрации, сортировки и пагинации
   * @returns Пагинированный список релизов с жанрами и эпизодами
   *
   * @see GET /accounts/users/me/favorites/releases
   */
  async getFavoriteReleases(
    params?: FavoriteReleasesGetParams
  ): Promise<ApiResponse<FavoriteReleasesResponse>> {
    return this.request<FavoriteReleasesResponse>(
      'GET',
      '/accounts/users/me/favorites/releases',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Список релизов в избранном (POST-запрос с телом).
   * Требует авторизации (sessionToken).
   *
   * @param body - Параметры фильтрации, сортировки и пагинации
   * @returns Пагинированный список релизов с жанрами и эпизодами
   *
   * @see POST /accounts/users/me/favorites/releases
   */
  async getFavoriteReleasesPost(
    body: FavoriteReleasesRequestBody
  ): Promise<ApiResponse<FavoriteReleasesResponse>> {
    return this.request<FavoriteReleasesResponse>(
      'POST',
      '/accounts/users/me/favorites/releases',
      body
    );
  }

  /**
   * Добавляет релизы в избранное.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив {release_id} для добавления
   * @returns Обновлённый список ID релизов в избранном
   *
   * @see POST /accounts/users/me/favorites
   */
  async addToFavorites(requests: AddToFavoriteRequest[]): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('POST', '/accounts/users/me/favorites', requests);
  }

  /**
   * Удаляет релизы из избранного.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив {release_id} для удаления
   * @returns Обновлённый список ID релизов в избранном
   *
   * @see DELETE /accounts/users/me/favorites
   */
  async removeFromFavorites(
    requests: RemoveFromFavoriteRequest[]
  ): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('DELETE', '/accounts/users/me/favorites', requests);
  }

  // ==========================================================================
  // ИСТОРИЯ ПРОСМОТРОВ
  // ==========================================================================

  /**
   * История просмотренных эпизодов.
   * Требует авторизации (sessionToken).
   *
   * @param params - Параметры пагинации и include/exclude
   * @returns Пагинированная история просмотров
   *
   * @see GET /accounts/users/me/views/history
   */
  async getViewHistory(
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<ViewHistoryResponse>> {
    return this.request<ViewHistoryResponse>(
      'GET',
      '/accounts/users/me/views/history',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Таймкоды просмотренных эпизодов.
   * Требует авторизации (sessionToken).
   *
   * @param params - Опциональный фильтр since (ISO 8601 date-time)
   * @returns Массив кортежей [release_episode_id, time, is_watched]
   *
   * @see GET /accounts/users/me/views/timecodes
   */
  async getViewTimecodes(params?: { since?: string }): Promise<ApiResponse<ViewTimecodesResponse>> {
    return this.request<ViewTimecodesResponse>(
      'GET',
      '/accounts/users/me/views/timecodes',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Обновляет таймкоды прогресса просмотренных эпизодов.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив данных для обновления таймкодов
   * @returns Пустой ответ при успехе
   *
   * @see POST /accounts/users/me/views/timecodes
   */
  async updateViewTimecodes(
    requests: UpdateTimecodeRequest[]
  ): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/me/views/timecodes', requests);
  }

  /**
   * Удаляет таймкоды просмотра для указанных эпизодов.
   * Требует авторизации (sessionToken).
   *
   * @param requests - Массив {release_episode_id} для удаления
   * @returns Пустой ответ при успехе
   *
   * @see DELETE /accounts/users/me/views/timecodes
   */
  async deleteViewTimecodes(
    requests: DeleteTimecodeRequest[]
  ): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', '/accounts/users/me/views/timecodes', requests);
  }

  // ==========================================================================
  // РЕКЛАМА
  // ==========================================================================

  /**
   * Список всех доступных VAST кампаний.
   *
   * @returns Массив данных VAST реклам
   *
   * @see GET /media/vasts
   */
  async getVastAds(): Promise<ApiResponse<AdVast[]>> {
    return this.request<AdVast[]>('GET', '/media/vasts');
  }

  /**
   * VAST XML с цепочкой реклам.
   * Можно отдавать URL в любой VAST-совместимый плеер.
   *
   * @returns XML-контент (строка)
   *
   * @see GET /media/manifest.xml
   */
  async getVastManifest(): Promise<ApiResponse<string>> {
    return this.request<string>('GET', '/media/manifest.xml');
  }

  // ==========================================================================
  // КАТАЛОГ АНИМЕ — СПРАВОЧНИКИ
  // ==========================================================================

  /**
   * Список возрастных рейтингов в каталоге.
   *
   * @returns Массив элементов справочника возрастных рейтингов
   *
   * @see GET /anime/catalog/references/age-ratings
   */
  async getCatalogAgeRatings(): Promise<ApiResponse<CatalogReferenceAgeRatingItem[]>> {
    return this.request<CatalogReferenceAgeRatingItem[]>(
      'GET',
      '/anime/catalog/references/age-ratings'
    );
  }

  /**
   * Список жанров в каталоге.
   *
   * @returns Массив элементов справочника жанров
   *
   * @see GET /anime/catalog/references/genres
   */
  async getCatalogGenres(): Promise<ApiResponse<CatalogReferenceGenreItem[]>> {
    return this.request<CatalogReferenceGenreItem[]>('GET', '/anime/catalog/references/genres');
  }

  /**
   * Список статусов озвучки/производства релиза в каталоге.
   *
   * @returns Массив элементов справочника статусов производства
   *
   * @see GET /anime/catalog/references/production-statuses
   */
  async getCatalogProductionStatuses(): Promise<ApiResponse<CatalogReferenceProductionStatusItem[]>> {
    return this.request<CatalogReferenceProductionStatusItem[]>(
      'GET',
      '/anime/catalog/references/production-statuses'
    );
  }

  /**
   * Список статусов выхода релиза в каталоге.
   *
   * @returns Массив элементов справочника статусов публикации
   *
   * @see GET /anime/catalog/references/publish-statuses
   */
  async getCatalogPublishStatuses(): Promise<ApiResponse<CatalogReferencePublishStatusItem[]>> {
    return this.request<CatalogReferencePublishStatusItem[]>(
      'GET',
      '/anime/catalog/references/publish-statuses'
    );
  }

  /**
   * Список сезонов в каталоге.
   *
   * @returns Массив элементов справочника сезонов
   *
   * @see GET /anime/catalog/references/seasons
   */
  async getCatalogSeasons(): Promise<ApiResponse<CatalogReferenceSeasonItem[]>> {
    return this.request<CatalogReferenceSeasonItem[]>('GET', '/anime/catalog/references/seasons');
  }

  /**
   * Список типов сортировок в каталоге.
   *
   * @returns Массив элементов справочника сортировок
   *
   * @see GET /anime/catalog/references/sorting
   */
  async getCatalogSorting(): Promise<ApiResponse<CatalogReferenceSortingItem[]>> {
    return this.request<CatalogReferenceSortingItem[]>('GET', '/anime/catalog/references/sorting');
  }

  /**
   * Список типов релизов в каталоге.
   *
   * @returns Массив элементов справочника типов
   *
   * @see GET /anime/catalog/references/types
   */
  async getCatalogTypes(): Promise<ApiResponse<CatalogReferenceTypeItem[]>> {
    return this.request<CatalogReferenceTypeItem[]>('GET', '/anime/catalog/references/types');
  }

  /**
   * Список годов в каталоге.
   *
   * @returns Массив годов
   *
   * @see GET /anime/catalog/references/years
   */
  async getCatalogYears(): Promise<ApiResponse<number[]>> {
    return this.request<number[]>('GET', '/anime/catalog/references/years');
  }

  // ==========================================================================
  // КАТАЛОГ АНИМЕ
  // ==========================================================================

  /**
   * Список релизов в каталоге (GET-запрос с query-параметрами).
   *
   * @param params - Параметры фильтрации, сортировки и пагинации
   * @returns Пагинированный список релизов с жанрами
   *
   * @see GET /anime/catalog/releases
   */
  async getCatalogReleases(
    params?: CatalogReleasesGetParams
  ): Promise<ApiResponse<CatalogReleasesResponse>> {
    return this.request<CatalogReleasesResponse>(
      'GET',
      '/anime/catalog/releases',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Список релизов в каталоге (POST-запрос с телом).
   *
   * @param body - Параметры фильтрации, сортировки и пагинации
   * @returns Пагинированный список релизов с жанрами
   *
   * @see POST /anime/catalog/releases
   */
  async getCatalogReleasesPost(
    body: CatalogReleasesRequestBody
  ): Promise<ApiResponse<CatalogReleasesResponse>> {
    return this.request<CatalogReleasesResponse>('POST', '/anime/catalog/releases', body);
  }

  // ==========================================================================
  // ФРАНШИЗЫ
  // ==========================================================================

  /**
   * Получает список франшиз.
   *
   * @param params - Параметры include/exclude
   * @returns Массив франшиз
   *
   * @see GET /anime/franchises
   */
  async getFranchises(params?: IncludeExcludeParams): Promise<ApiResponse<FranchisesResponse>> {
    return this.request<FranchisesResponse>('GET', '/anime/franchises', undefined, params as Record<string, unknown>);
  }

  /**
   * Получает данные конкретной франшизы с её релизами.
   *
   * @param franchiseId - ID франшизы (UUID)
   * @param params - Параметры include/exclude
   * @returns Франшиза с полными данными о входящих релизах
   *
   * @see GET /anime/franchises/{franchiseId}
   */
  async getFranchise(
    franchiseId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<FranchiseResponse>> {
    return this.request<FranchiseResponse>(
      'GET',
      `/anime/franchises/${franchiseId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Получает список случайных франшиз.
   *
   * @param params - Количество и include/exclude
   * @returns Массив случайных франшиз
   *
   * @see GET /anime/franchises/random
   */
  async getRandomFranchises(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RandomFranchisesResponse>> {
    return this.request<RandomFranchisesResponse>('GET', '/anime/franchises/random', undefined, params as Record<string, unknown>);
  }

  /**
   * Получает список франшиз, в которых участвует конкретный релиз.
   *
   * @param releaseId - ID релиза
   * @param params - Параметры include/exclude
   * @returns Массив франшиз с их релизами
   *
   * @see GET /anime/franchises/release/{releaseId}
   */
  async getFranchisesByRelease(
    releaseId: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<FranchisesByReleaseResponse>> {
    return this.request<FranchisesByReleaseResponse>(
      'GET',
      `/anime/franchises/release/${releaseId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  // ==========================================================================
  // ЖАНРЫ
  // ==========================================================================

  /**
   * Список всех жанров.
   *
   * @param params - Параметры include/exclude
   * @returns Массив жанров
   *
   * @see GET /anime/genres
   */
  async getGenres(params?: IncludeExcludeParams): Promise<ApiResponse<GenresResponse>> {
    return this.request<GenresResponse>('GET', '/anime/genres', undefined, params as Record<string, unknown>);
  }

  /**
   * Данные по конкретному жанру.
   *
   * @param genreId - ID жанра
   * @param params - Параметры include/exclude
   * @returns Данные жанра
   *
   * @see GET /anime/genres/{genreId}
   */
  async getGenre(
    genreId: number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<GenreResponse>> {
    return this.request<GenreResponse>('GET', `/anime/genres/${genreId}`, undefined, params as Record<string, unknown>);
  }

  /**
   * Список случайных жанров.
   *
   * @param params - Количество и include/exclude
   * @returns Массив случайных жанров
   *
   * @see GET /anime/genres/random
   */
  async getRandomGenres(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<Genre[]>> {
    return this.request<Genre[]>('GET', '/anime/genres/random', undefined, params as Record<string, unknown>);
  }

  /**
   * Список релизов конкретного жанра (пагинированный).
   *
   * @param genreId - ID жанра
   * @param params - Параметры пагинации и include/exclude
   * @returns Пагинированный список релизов
   *
   * @see GET /anime/genres/{genreId}/releases
   */
  async getGenreReleases(
    genreId: number,
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<GenreReleasesResponse>> {
    return this.request<GenreReleasesResponse>(
      'GET',
      `/anime/genres/${genreId}/releases`,
      undefined,
      params as Record<string, unknown>
    );
  }

  // ==========================================================================
  // РЕЛИЗЫ
  // ==========================================================================

  /**
   * Последние обновлённые релизы с последним эпизодом.
   *
   * @param params - Количество и include/exclude
   * @returns Массив релизов с жанрами и последним эпизодом
   *
   * @see GET /anime/releases/latest
   */
  async getLatestReleases(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<LatestReleasesResponse>> {
    return this.request<LatestReleasesResponse>('GET', '/anime/releases/latest', undefined, params as Record<string, unknown>);
  }

  /**
   * Случайные релизы.
   *
   * @param params - Количество и include/exclude
   * @returns Массив случайных релизов
   *
   * @see GET /anime/releases/random
   */
  async getRandomReleases(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RandomReleasesResponse>> {
    return this.request<RandomReleasesResponse>('GET', '/anime/releases/random', undefined, params as Record<string, unknown>);
  }

  /**
   * Рекомендованные релизы.
   *
   * @param params - Количество, ID базового релиза и include/exclude
   * @returns Массив рекомендованных релизов
   *
   * @see GET /anime/releases/recommended
   */
  async getRecommendedReleases(
    params?: { limit?: number; release_id?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RecommendedReleasesResponse>> {
    return this.request<RecommendedReleasesResponse>(
      'GET',
      '/anime/releases/recommended',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Данные по списку релизов (по ID и/или alias, пагинированный).
   * Возвращает полные данные: жанры, участники, эпизоды, торренты, спонсоры.
   *
   * @param params - IDs, aliases, пагинация и include/exclude
   * @returns Пагинированный список полных данных релизов
   *
   * @see GET /anime/releases/list
   */
  async getReleasesList(
    params: {
      /** Список ID релизов */
      ids?: number[];
      /** Список alias релизов */
      aliases?: string[];
    } & PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<ReleasesListResponse>> {
    return this.request<ReleasesListResponse>(
      'GET',
      '/anime/releases/list',
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Полные данные по конкретному релизу.
   * Включает: жанры, участников, эпизоды, торренты, спонсоров.
   *
   * @param idOrAlias - ID (число) или alias (строка) релиза
   * @param params - Параметры include/exclude
   * @returns Полные данные релиза
   *
   * @see GET /anime/releases/{idOrAlias}
   */
  async getRelease(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<ReleaseFull>> {
    return this.request<ReleaseFull>('GET', `/anime/releases/${idOrAlias}`, undefined, params as Record<string, unknown>);
  }

  /**
   * Список участников, которые работали над релизом.
   *
   * @param idOrAlias - ID или alias релиза
   * @param params - Параметры include/exclude
   * @returns Массив участников релиза
   *
   * @see GET /anime/releases/{idOrAlias}/members
   */
  async getReleaseMembers(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<ReleaseMember[]>> {
    return this.request<ReleaseMember[]>(
      'GET',
      `/anime/releases/${idOrAlias}/members`,
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Таймкоды просмотра всех эпизодов релиза.
   * Требует авторизации (sessionToken). Имеет 1-2 минутный кэш.
   *
   * @param idOrAlias - ID или alias релиза
   * @param params - Параметры include/exclude
   * @returns Массив данных просмотра по каждому эпизоду
   *
   * @see GET /anime/releases/{idOrAlias}/episodes/timecodes
   */
  async getReleaseEpisodesTimecodes(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<UserView[]>> {
    return this.request<UserView[]>(
      'GET',
      `/anime/releases/${idOrAlias}/episodes/timecodes`,
      undefined,
      params as Record<string, unknown>
    );
  }

  // ==========================================================================
  // ЭПИЗОДЫ
  // ==========================================================================

  /**
   * Данные по конкретному эпизоду (включая релиз со всеми его эпизодами).
   *
   * @param releaseEpisodeId - UUID эпизода
   * @param params - Параметры include/exclude
   * @returns Эпизод с полными данными релиза
   *
   * @see GET /anime/releases/episodes/{releaseEpisodeId}
   */
  async getEpisode(
    releaseEpisodeId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<EpisodeWithRelease>> {
    return this.request<EpisodeWithRelease>(
      'GET',
      `/anime/releases/episodes/${releaseEpisodeId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Данные по просмотру конкретного эпизода авторизованным пользователем.
   * Требует авторизации (sessionToken). Имеет 1-2 минутный кэш.
   *
   * @param releaseEpisodeId - UUID эпизода
   * @param params - Параметры include/exclude
   * @returns Данные просмотра эпизода
   *
   * @see GET /anime/releases/episodes/{releaseEpisodeId}/timecode
   */
  async getEpisodeTimecode(
    releaseEpisodeId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<UserView>> {
    return this.request<UserView>(
      'GET',
      `/anime/releases/episodes/${releaseEpisodeId}/timecode`,
      undefined,
      params as Record<string, unknown>
    );
  }

  // ==========================================================================
  // РАСПИСАНИЕ РЕЛИЗОВ
  // ==========================================================================

  /**
   * Расписание релизов на текущую дату (вчера, сегодня, завтра).
   *
   * @param params - Параметры include/exclude
   * @returns Расписание с секциями today, tomorrow, yesterday
   *
   * @see GET /anime/schedule/now
   */
  async getScheduleNow(params?: IncludeExcludeParams): Promise<ApiResponse<ScheduleNowResponse>> {
    return this.request<ScheduleNowResponse>('GET', '/anime/schedule/now', undefined, params as Record<string, unknown>);
  }

  /**
   * Расписание релизов на текущую неделю.
   *
   * @param params - Параметры include/exclude
   * @returns Список релизов в расписании
   *
   * @see GET /anime/schedule/week
   */
  async getScheduleWeek(params?: IncludeExcludeParams): Promise<ApiResponse<ScheduleWeekResponse>> {
    return this.request<ScheduleWeekResponse>('GET', '/anime/schedule/week', undefined, params as Record<string, unknown>);
  }

  // ==========================================================================
  // ТОРРЕНТЫ
  // ==========================================================================

  /**
   * Пагинированный список последних торрентов с участниками и релизами.
   *
   * @param params - Параметры пагинации и include/exclude
   * @returns Пагинированный список торрентов
   *
   * @see GET /anime/torrents
   */
  async getTorrents(
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<TorrentsResponse>> {
    return this.request<TorrentsResponse>('GET', '/anime/torrents', undefined, params as Record<string, unknown>);
  }

  /**
   * Данные по конкретному торренту (с участниками и релизом).
   *
   * @param hashOrId - Hash или ID торрента
   * @param params - Параметры include/exclude
   * @returns Торрент с участниками и данными релиза
   *
   * @see GET /anime/torrents/{hashOrId}
   */
  async getTorrent(
    hashOrId: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<TorrentWithRelease>> {
    return this.request<TorrentWithRelease>(
      'GET',
      `/anime/torrents/${hashOrId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * Скачивает торрент-файл по hash или id.
   *
   * @param hashOrId - Hash или ID торрента
   * @param pk - Опциональный passkey пользователя
   * @returns Blob торрент-файла
   *
   * @see GET /anime/torrents/{hashOrId}/file
   */
  async downloadTorrentFile(
    hashOrId: string | number,
    pk?: string
  ): Promise<ApiResponse<Blob>> {
    const url = `${this.baseUrl}/anime/torrents/${hashOrId}/file${pk ? `?pk=${encodeURIComponent(pk)}` : ''}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        headers: this.getHeaders() as any,
        signal: controller.signal as any,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return {
          status: response.status,
          error: { message: `HTTP Error ${response.status}` },
        };
      }

      const blob = await response.blob();
      return {
        status: response.status,
        data: blob,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        status: 0,
        error: { message: error instanceof Error ? error.message : 'Unknown error' },
      };
    }
  }

  /**
   * Торренты для конкретного релиза (с участниками и данными релиза).
   *
   * @param releaseId - ID релиза
   * @param params - Параметры include/exclude
   * @returns Массив торрентов релиза
   *
   * @see GET /anime/torrents/release/{releaseId}
   */
  async getReleaseTorrents(
    releaseId: number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<TorrentWithRelease[]>> {
    return this.request<TorrentWithRelease[]>(
      'GET',
      `/anime/torrents/release/${releaseId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  /**
   * RSS лента последних торрентов (XML).
   *
   * @param params - Количество торрентов и passkey
   * @returns XML-документ в виде строки
   *
   * @see GET /anime/torrents/rss
   */
  async getTorrentsRss(params?: { limit?: number; pk?: string }): Promise<ApiResponse<string>> {
    return this.request<string>('GET', '/anime/torrents/rss', undefined, params as Record<string, unknown>);
  }

  /**
   * RSS лента торрентов конкретного релиза (XML).
   *
   * @param releaseId - ID релиза
   * @param params - Опциональный passkey
   * @returns XML-документ в виде строки
   *
   * @see GET /anime/torrents/rss/release/{releaseId}
   */
  async getReleaseTorrentsRss(
    releaseId: number,
    params?: { pk?: string }
  ): Promise<ApiResponse<string>> {
    return this.request<string>(
      'GET',
      `/anime/torrents/rss/release/${releaseId}`,
      undefined,
      params as Record<string, unknown>
    );
  }

  // ==========================================================================
  // ПОИСК
  // ==========================================================================

  /**
   * Поиск релизов по текстовому запросу.
   *
   * @param params - Поисковый запрос и include/exclude
   * @returns Массив найденных релизов
   *
   * @see GET /app/search/releases
   */
  async searchReleases(
    params: { query: string } & IncludeExcludeParams
  ): Promise<ApiResponse<SearchReleasesResponse>> {
    return this.request<SearchReleasesResponse>('GET', '/app/search/releases', undefined, params as unknown as Record<string, unknown>);
  }

  // ==========================================================================
  // СТАТУС ПРИЛОЖЕНИЯ
  // ==========================================================================

  /**
   * Возвращает информацию о статусе API.
   *
   * @returns Статус API, данные запроса, доступные эндпоинты
   *
   * @see GET /app/status
   */
  async getAppStatus(): Promise<ApiResponse<AppStatus>> {
    return this.request<AppStatus>('GET', '/app/status');
  }

  // ==========================================================================
  // МЕДИА
  // ==========================================================================

  /**
   * Список промо-материалов или рекламных кампаний (в случайном порядке).
   *
   * @param params - Параметры include/exclude
   * @returns Объект с массивом промо-материалов
   *
   * @see GET /media/promotions
   */
  async getMediaPromotions(
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<MediaPromotionsResponse>> {
    return this.request<MediaPromotionsResponse>('GET', '/media/promotions', undefined, params as Record<string, unknown>);
  }

  /**
   * Список последних видео-роликов.
   *
   * @param params - Количество и include/exclude
   * @returns Объект с массивом видео-роликов (с данными источника)
   *
   * @see GET /media/videos
   */
  async getMediaVideos(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<MediaVideosResponse>> {
    return this.request<MediaVideosResponse>('GET', '/media/videos', undefined, params as Record<string, unknown>);
  }

  // ==========================================================================
  // КОМАНДЫ
  // ==========================================================================

  /**
   * Список всех команд АниЛибрии.
   *
   * @param params - Параметры include/exclude
   * @returns Массив команд
   *
   * @see GET /teams/
   */
  async getTeams(params?: IncludeExcludeParams): Promise<ApiResponse<TeamsResponse>> {
    return this.request<TeamsResponse>('GET', '/teams/', undefined, params as Record<string, unknown>);
  }

  /**
   * Список всех ролей в командах.
   *
   * @param params - Параметры include/exclude
   * @returns Массив ролей
   *
   * @see GET /teams/roles
   */
  async getTeamRoles(params?: IncludeExcludeParams): Promise<ApiResponse<TeamRolesResponse>> {
    return this.request<TeamRolesResponse>('GET', '/teams/roles', undefined, params as Record<string, unknown>);
  }

  /**
   * Список всех анилибрийцев с указанием команды и ролей.
   *
   * @param params - Параметры include/exclude
   * @returns Массив анилибрийцев с полными данными
   *
   * @see GET /teams/users
   */
  async getTeamUsers(params?: IncludeExcludeParams): Promise<ApiResponse<TeamUsersResponse>> {
    return this.request<TeamUsersResponse>('GET', '/teams/users', undefined, params as Record<string, unknown>);
  }
}

// =============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// =============================================================================

/**
 * Создаёт экземпляр клиента AniLiberty API с конфигурацией по умолчанию.
 *
 * @param config - Опциональная конфигурация клиента
 * @returns Экземпляр AniLibertyClient
 *
 * @example
 * ```ts
 * const client = createClient({ timeout: 10000 });
 * ```
 */
export function createClient(config?: AniLibertyClientConfig): AniLibertyClient {
  return new AniLibertyClient(config);
}

/**
 * Проверяет, является ли ответ API успешным (status 2xx, data присутствует).
 *
 * @param response - Ответ API
 * @returns true если ответ успешный и data определён
 *
 * @example
 * ```ts
 * const response = await client.getLatestReleases();
 * if (isSuccess(response)) {
 *   console.log(response.data); // Тип сужен: data гарантированно определён
 * }
 * ```
 */
export function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && response.status < 300 && response.data !== undefined;
}

/**
 * Проверяет, содержит ли ответ API ошибку.
 *
 * @param response - Ответ API
 * @returns true если ответ содержит ошибку
 *
 * @example
 * ```ts
 * const response = await client.login({ login: 'test', password: 'test' });
 * if (isError(response)) {
 *   console.error(response.error);
 * }
 * ```
 */
export function isError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: NonNullable<ApiResponse<T>['error']> } {
  return response.error !== undefined;
}

// =============================================================================
// ЭКСПОРТ ПО УМОЛЧАНИЮ
// =============================================================================

export default AniLibertyClient;

// =============================================================================
// РЕ-ЭКСПОРТ ВСЕХ ТИПОВ ИЗ api-types.ts
// =============================================================================

export * from './api-types';
