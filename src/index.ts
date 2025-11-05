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
  UserSession,
  
  // Collections
  UserCollectionType,
  CollectionsReferencesAgeRatings,
  CollectionsReferencesGenres,
  CollectionsReferencesTypes,
  CollectionsReferencesYears,
  CollectionIdsResponse,
  CollectionReleasesResponse,
  CollectionReleaseItem,
  
  // Favorites
  UserFavoriteSorting,
  FavoritesReferencesAgeRatings,
  FavoritesReferencesGenres,
  FavoritesReferencesSorting,
  FavoritesReferencesTypes,
  FavoritesReferencesYears,
  FavoriteIdsResponse,
  FavoriteReleasesResponse,
  
  // Views
  ViewHistoryResponse,
  ViewTimecodesResponse,
  ViewTimecodeItem,
  UserView,
  
  // Ads
  AdVast,
  
  // Catalog
  CatalogFiltersParams,
  CatalogReleasesResponse,
  CatalogReferenceAgeRating,
  CatalogReferenceGenre,
  CatalogReferenceProductionStatus,
  CatalogReferencePublishStatus,
  CatalogReferenceSeason,
  CatalogReferenceSorting,
  CatalogReferenceType,
  CatalogReferenceYears,
  
  // Franchises
  Franchise,
  FranchiseWithReleases,
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
  Release,
  ReleaseFull,
  ReleaseLatest,
  LatestReleasesResponse,
  RandomReleasesResponse,
  RecommendedReleasesResponse,
  SearchReleasesResponse,
  ReleaseMember,
  
  // Episodes
  Episode,
  EpisodeWithRelease,
  
  // Schedule
  ScheduleNowResponse,
  ScheduleWeekResponse,
  
  // Torrents
  Torrent,
  TorrentWithRelease,
  TorrentsResponse,
  
  // App
  AppStatus,
  
  // Media
  MediaPromotion,
  VideoWithOrigin,
  MediaPromotionsResponse,
  MediaVideosResponse,
  
  // Teams
  Team,
  TeamRole,
  TeamUserFull,
  TeamsResponse,
  TeamRolesResponse,
  TeamUsersResponse,
} from './api-types';

// ============================================================================
// REQUEST BODY ИНТЕРФЕЙСЫ
// ============================================================================

export interface OTPGetRequest {
  device_id: string;
}

export interface OTPAcceptRequest {
  code: number;
}

export interface OTPLoginRequest {
  code: number;
  device_id: string;
}

export interface LoginRequest {
  login: string;
  password: string;
}

export interface PasswordForgetRequest {
  email: string;
}

export interface PasswordResetRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

export interface CollectionReleasesRequestBody {
  page?: number;
  limit?: number;
  type_of_collection: UserCollectionType;
  f?: {
    genres?: string;
    types?: string[];
    years?: string;
    search?: string;
    age_ratings?: string[];
  };
  include?: string;
  exclude?: string;
}

export interface AddToCollectionRequest {
  release_id: number;
  type_of_collection: UserCollectionType;
}

export interface RemoveFromCollectionRequest {
  release_id: number;
}

export interface FavoriteReleasesRequestBody {
  page?: number;
  limit?: number;
  f?: {
    years?: string;
    types?: string[];
    genres?: string;
    search?: string;
    sorting?: UserFavoriteSorting;
    age_ratings?: string[];
  };
  include?: string;
  exclude?: string;
}

export interface AddToFavoriteRequest {
  release_id: number;
}

export interface RemoveFromFavoriteRequest {
  release_id: number;
}

export interface UpdateTimecodeRequest {
  time: number;
  is_watched: boolean;
  release_episode_id: string;
}

export interface DeleteTimecodeRequest {
  release_episode_id: string;
}

export interface CatalogReleasesRequestBody {
  page?: number;
  limit?: number;
  f?: {
    genres?: number[];
    types?: string[];
    seasons?: string[];
    years?: {
      from_year?: number;
      to_year?: number;
    };
    search?: string;
    sorting?: string;
    age_ratings?: string[];
    publish_statuses?: string[];
    production_statuses?: string[];
  };
  include?: string;
  exclude?: string;
}

// ============================================================================
// КОНФИГУРАЦИЯ КЛИЕНТА
// ============================================================================

export interface AniLibertyClientConfig {
  baseUrl?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// ============================================================================
// ОСНОВНОЙ КЛАСС API КЛИЕНТА
// ============================================================================

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
   * Устанавливает токен авторизации
   */
  setAccessToken(token: string): void {
    this.accessToken = token;
  }

  /**
   * Удаляет токен авторизации
   */
  clearAccessToken(): void {
    this.accessToken = undefined;
  }

  /**
   * Получает заголовки для запроса
   */
  private getHeaders(): Record<string, string> {
    const headers = { ...this.headers };
    if (this.accessToken) {
      headers['Authorization'] = `Bearer ${this.accessToken}`;
    }
    return headers;
  }

  /**
   * Выполняет HTTP запрос
   */
  private async request<T>(
    method: string,
    path: string,
    data?: any,
    params?: Record<string, any>
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${path}`);
    
    // Добавляем query параметры
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

  // ============================================================================
  // АККАУНТЫ - ОДНОРАЗОВЫЕ ПАРОЛИ (OTP)
  // ============================================================================

  /**
   * POST /accounts/otp/get - Запрашивает новый OTP
   */
  async otpGet(request: OTPGetRequest): Promise<ApiResponse<OTPGetResponse>> {
    return this.request<OTPGetResponse>('POST', '/accounts/otp/get', request);
  }

  /**
   * POST /accounts/otp/accept - Присоединяет пользователя к выданному OTP
   */
  async otpAccept(request: OTPAcceptRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/otp/accept', request);
  }

  /**
   * POST /accounts/otp/login - Авторизация по OTP
   */
  async otpLogin(request: OTPLoginRequest): Promise<ApiResponse<OTPLoginResponse>> {
    const response = await this.request<OTPLoginResponse>('POST', '/accounts/otp/login', request);
    if (response.data?.token) {
      this.setAccessToken(response.data.token);
    }
    return response;
  }

  // ============================================================================
  // АККАУНТЫ - АВТОРИЗАЦИЯ
  // ============================================================================

  /**
   * POST /accounts/users/auth/login - Авторизация пользователя по логину и паролю
   */
  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('POST', '/accounts/users/auth/login', request);
    if (response.data?.token) {
      this.setAccessToken(response.data.token);
    }
    return response;
  }

  /**
   * POST /accounts/users/auth/logout - Выход из системы
   */
  async logout(): Promise<ApiResponse<LogoutResponse>> {
    const response = await this.request<LogoutResponse>('POST', '/accounts/users/auth/logout');
    this.clearAccessToken();
    return response;
  }

  // ============================================================================
  // СОЦИАЛЬНЫЕ СЕТИ
  // ============================================================================

  /**
   * GET /accounts/users/auth/social/{provider}/login - Получить URL для авторизации через социальную сеть
   */
  async socialAuthLogin(provider: UserSocialType): Promise<ApiResponse<SocialAuthLoginResponse>> {
    return this.request<SocialAuthLoginResponse>('GET', `/accounts/users/auth/social/${provider}/login`);
  }

  /**
   * GET /accounts/users/auth/social/authenticate - Аутентифицировать пользователя через социальные сети
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

  // ============================================================================
  // СБРОС ПАРОЛЯ
  // ============================================================================

  /**
   * POST /accounts/users/auth/password/forget - Запрос на сброс пароля
   */
  async passwordForget(request: PasswordForgetRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/forget', request);
  }

  /**
   * POST /accounts/users/auth/password/reset - Подтверждение сброса пароля
   */
  async passwordReset(request: PasswordResetRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/reset', request);
  }

  // ============================================================================
  // ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
  // ============================================================================

  /**
   * GET /accounts/users/me/profile - Получить профиль текущего пользователя
   */
  async getMyProfile(params?: IncludeExcludeParams): Promise<ApiResponse<User>> {
    return this.request<User>('GET', '/accounts/users/me/profile', undefined, params);
  }

  // ============================================================================
  // КОЛЛЕКЦИИ - СПРАВОЧНИКИ
  // ============================================================================

  /**
   * GET /accounts/users/me/collections/references/age-ratings - Список возрастных рейтингов в коллекциях
   */
  async getCollectionAgeRatings(): Promise<ApiResponse<CollectionsReferencesAgeRatings>> {
    return this.request<CollectionsReferencesAgeRatings>(
      'GET',
      '/accounts/users/me/collections/references/age-ratings'
    );
  }

  /**
   * GET /accounts/users/me/collections/references/genres - Список жанров в коллекциях
   */
  async getCollectionGenres(): Promise<ApiResponse<CollectionsReferencesGenres>> {
    return this.request<CollectionsReferencesGenres>(
      'GET',
      '/accounts/users/me/collections/references/genres'
    );
  }

  /**
   * GET /accounts/users/me/collections/references/types - Список типов в коллекциях
   */
  async getCollectionTypes(): Promise<ApiResponse<CollectionsReferencesTypes>> {
    return this.request<CollectionsReferencesTypes>(
      'GET',
      '/accounts/users/me/collections/references/types'
    );
  }

  /**
   * GET /accounts/users/me/collections/references/years - Список годов в коллекциях
   */
  async getCollectionYears(): Promise<ApiResponse<CollectionsReferencesYears>> {
    return this.request<CollectionsReferencesYears>(
      'GET',
      '/accounts/users/me/collections/references/years'
    );
  }

  // ============================================================================
  // КОЛЛЕКЦИИ
  // ============================================================================

  /**
   * GET /accounts/users/me/collections/ids - Список идентификаторов релизов в коллекциях
   */
  async getCollectionIds(): Promise<ApiResponse<CollectionIdsResponse>> {
    return this.request<CollectionIdsResponse>('GET', '/accounts/users/me/collections/ids');
  }

  /**
   * GET /accounts/users/me/collections/releases - Список релизов из коллекции [GET]
   */
  async getCollectionReleases(params: {
    page?: number;
    limit?: number;
    type_of_collection: UserCollectionType;
    'f[genres]'?: string;
    'f[types]'?: string[];
    'f[years]'?: string;
    'f[search]'?: string;
    'f[age_ratings]'?: string[];
    include?: string;
    exclude?: string;
  }): Promise<ApiResponse<CollectionReleasesResponse>> {
    return this.request<CollectionReleasesResponse>(
      'GET',
      '/accounts/users/me/collections/releases',
      undefined,
      params
    );
  }

  /**
   * POST /accounts/users/me/collections/releases - Список релизов из коллекции [POST]
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
   * POST /accounts/users/me/collections - Добавить релизы в коллекции
   */
  async addToCollection(
    requests: AddToCollectionRequest[]
  ): Promise<ApiResponse<CollectionReleaseItem[]>> {
    return this.request<CollectionReleaseItem[]>('POST', '/accounts/users/me/collections', requests);
  }

  /**
   * DELETE /accounts/users/me/collections - Удалить релизы из коллекций
   */
  async removeFromCollection(
    requests: RemoveFromCollectionRequest[]
  ): Promise<ApiResponse<CollectionReleaseItem[]>> {
    return this.request<CollectionReleaseItem[]>('DELETE', '/accounts/users/me/collections', requests);
  }

  // ============================================================================
  // ИЗБРАННОЕ - СПРАВОЧНИКИ
  // ============================================================================

  /**
   * GET /accounts/users/me/favorites/references/age-ratings - Список возрастных рейтингов в избранном
   */
  async getFavoriteAgeRatings(): Promise<ApiResponse<FavoritesReferencesAgeRatings>> {
    return this.request<FavoritesReferencesAgeRatings>(
      'GET',
      '/accounts/users/me/favorites/references/age-ratings'
    );
  }

  /**
   * GET /accounts/users/me/favorites/references/genres - Список жанров в избранном
   */
  async getFavoriteGenres(): Promise<ApiResponse<FavoritesReferencesGenres>> {
    return this.request<FavoritesReferencesGenres>(
      'GET',
      '/accounts/users/me/favorites/references/genres'
    );
  }

  /**
   * GET /accounts/users/me/favorites/references/sorting - Список опций сортировки в избранном
   */
  async getFavoriteSorting(): Promise<ApiResponse<FavoritesReferencesSorting>> {
    return this.request<FavoritesReferencesSorting>(
      'GET',
      '/accounts/users/me/favorites/references/sorting'
    );
  }

  /**
   * GET /accounts/users/me/favorites/references/types - Список типов релизов в избранном
   */
  async getFavoriteTypes(): Promise<ApiResponse<FavoritesReferencesTypes>> {
    return this.request<FavoritesReferencesTypes>(
      'GET',
      '/accounts/users/me/favorites/references/types'
    );
  }

  /**
   * GET /accounts/users/me/favorites/references/years - Список годов в избранном
   */
  async getFavoriteYears(): Promise<ApiResponse<FavoritesReferencesYears>> {
    return this.request<FavoritesReferencesYears>(
      'GET',
      '/accounts/users/me/favorites/references/years'
    );
  }

  // ============================================================================
  // ИЗБРАННОЕ
  // ============================================================================

  /**
   * GET /accounts/users/me/favorites/ids - Список идентификаторов релизов в избранном
   */
  async getFavoriteIds(): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('GET', '/accounts/users/me/favorites/ids');
  }

  /**
   * GET /accounts/users/me/favorites/releases - Список релизов в избранном [GET]
   */
  async getFavoriteReleases(params: {
    page?: number;
    limit?: number;
    'f[years]'?: string;
    'f[types]'?: string[];
    'f[genres]'?: string;
    'f[search]'?: string;
    'f[sorting]'?: UserFavoriteSorting;
    'f[age_ratings]'?: string[];
    include?: string;
    exclude?: string;
  }): Promise<ApiResponse<FavoriteReleasesResponse>> {
    return this.request<FavoriteReleasesResponse>(
      'GET',
      '/accounts/users/me/favorites/releases',
      undefined,
      params
    );
  }

  /**
   * POST /accounts/users/me/favorites/releases - Список релизов в избранном [POST]
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
   * POST /accounts/users/me/favorites - Добавить релизы в избранное
   */
  async addToFavorites(requests: AddToFavoriteRequest[]): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('POST', '/accounts/users/me/favorites', requests);
  }

  /**
   * DELETE /accounts/users/me/favorites - Удалить релизы из избранного
   */
  async removeFromFavorites(
    requests: RemoveFromFavoriteRequest[]
  ): Promise<ApiResponse<FavoriteIdsResponse>> {
    return this.request<FavoriteIdsResponse>('DELETE', '/accounts/users/me/favorites', requests);
  }

  // ============================================================================
  // ИСТОРИЯ ПРОСМОТРОВ
  // ============================================================================

  /**
   * GET /accounts/users/me/views/history - История просмотренных эпизодов
   */
  async getViewHistory(
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<ViewHistoryResponse>> {
    return this.request<ViewHistoryResponse>(
      'GET',
      '/accounts/users/me/views/history',
      undefined,
      params
    );
  }

  /**
   * GET /accounts/users/me/views/timecodes - Таймкоды просмотренных эпизодов
   */
  async getViewTimecodes(params?: { since?: string }): Promise<ApiResponse<ViewTimecodesResponse>> {
    return this.request<ViewTimecodesResponse>(
      'GET',
      '/accounts/users/me/views/timecodes',
      undefined,
      params
    );
  }

  /**
   * POST /accounts/users/me/views/timecodes - Обновление таймкодов прогресса
   */
  async updateViewTimecodes(
    requests: UpdateTimecodeRequest[]
  ): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/me/views/timecodes', requests);
  }

  /**
   * DELETE /accounts/users/me/views/timecodes - Удаление таймкодов просмотра
   */
  async deleteViewTimecodes(
    requests: DeleteTimecodeRequest[]
  ): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', '/accounts/users/me/views/timecodes', requests);
  }

  // ============================================================================
  // РЕКЛАМА
  // ============================================================================

  /**
   * GET /media/vasts - Список возможных VAST реклам
   */
  async getVastAds(): Promise<ApiResponse<AdVast[]>> {
    return this.request<AdVast[]>('GET', '/media/vasts');
  }

  /**
   * GET /media/manifest.xml - VAST XML с цепочкой реклам
   */
  async getVastManifest(): Promise<ApiResponse<string>> {
    return this.request<string>('GET', '/media/manifest.xml');
  }

  // ============================================================================
  // КАТАЛОГ АНИМЕ - СПРАВОЧНИКИ
  // ============================================================================

  /**
   * GET /anime/catalog/references/age-ratings - Список возрастных рейтингов в каталоге
   */
  async getCatalogAgeRatings(): Promise<ApiResponse<CatalogReferenceAgeRating[]>> {
    return this.request<CatalogReferenceAgeRating[]>(
      'GET',
      '/anime/catalog/references/age-ratings'
    );
  }

  /**
   * GET /anime/catalog/references/genres - Список жанров в каталоге
   */
  async getCatalogGenres(): Promise<ApiResponse<CatalogReferenceGenre[]>> {
    return this.request<CatalogReferenceGenre[]>('GET', '/anime/catalog/references/genres');
  }

  /**
   * GET /anime/catalog/references/production-statuses - Список статусов озвучки релиза
   */
  async getCatalogProductionStatuses(): Promise<ApiResponse<CatalogReferenceProductionStatus[]>> {
    return this.request<CatalogReferenceProductionStatus[]>(
      'GET',
      '/anime/catalog/references/production-statuses'
    );
  }

  /**
   * GET /anime/catalog/references/publish-statuses - Список статусов выхода релиза
   */
  async getCatalogPublishStatuses(): Promise<ApiResponse<CatalogReferencePublishStatus[]>> {
    return this.request<CatalogReferencePublishStatus[]>(
      'GET',
      '/anime/catalog/references/publish-statuses'
    );
  }

  /**
   * GET /anime/catalog/references/seasons - Список сезонов релиза
   */
  async getCatalogSeasons(): Promise<ApiResponse<CatalogReferenceSeason[]>> {
    return this.request<CatalogReferenceSeason[]>('GET', '/anime/catalog/references/seasons');
  }

  /**
   * GET /anime/catalog/references/sorting - Список типов сортировок
   */
  async getCatalogSorting(): Promise<ApiResponse<CatalogReferenceSorting[]>> {
    return this.request<CatalogReferenceSorting[]>('GET', '/anime/catalog/references/sorting');
  }

  /**
   * GET /anime/catalog/references/types - Список типов релизов
   */
  async getCatalogTypes(): Promise<ApiResponse<CatalogReferenceType[]>> {
    return this.request<CatalogReferenceType[]>('GET', '/anime/catalog/references/types');
  }

  /**
   * GET /anime/catalog/references/years - Список годов в каталоге
   */
  async getCatalogYears(): Promise<ApiResponse<CatalogReferenceYears>> {
    return this.request<CatalogReferenceYears>('GET', '/anime/catalog/references/years');
  }

  // ============================================================================
  // КАТАЛОГ АНИМЕ
  // ============================================================================

  /**
   * GET /anime/catalog/releases - Список релизов в каталоге [GET]
   */
  async getCatalogReleases(params?: {
    page?: number;
    limit?: number;
    'f[genres]'?: string;
    'f[types]'?: string[];
    'f[seasons]'?: string[];
    'f[years][from_year]'?: number;
    'f[years][to_year]'?: number;
    'f[search]'?: string;
    'f[sorting]'?: string;
    'f[age_ratings]'?: string[];
    'f[publish_statuses]'?: string[];
    'f[production_statuses]'?: string[];
    include?: string;
    exclude?: string;
  }): Promise<ApiResponse<CatalogReleasesResponse>> {
    return this.request<CatalogReleasesResponse>(
      'GET',
      '/anime/catalog/releases',
      undefined,
      params
    );
  }

  /**
   * POST /anime/catalog/releases - Список релизов в каталоге [POST]
   */
  async getCatalogReleasesPost(
    body: CatalogReleasesRequestBody
  ): Promise<ApiResponse<CatalogReleasesResponse>> {
    return this.request<CatalogReleasesResponse>('POST', '/anime/catalog/releases', body);
  }

  // ============================================================================
  // ФРАНШИЗЫ
  // ============================================================================

  /**
   * GET /anime/franchises - Получить список франшиз
   */
  async getFranchises(params?: IncludeExcludeParams): Promise<ApiResponse<FranchisesResponse>> {
    return this.request<FranchisesResponse>('GET', '/anime/franchises', undefined, params);
  }

  /**
   * GET /anime/franchises/{franchiseId} - Получить франшизу
   */
  async getFranchise(
    franchiseId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<FranchiseResponse>> {
    return this.request<FranchiseResponse>(
      'GET',
      `/anime/franchises/${franchiseId}`,
      undefined,
      params
    );
  }

  /**
   * GET /anime/franchises/random - Получить список случайных франшиз
   */
  async getRandomFranchises(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RandomFranchisesResponse>> {
    return this.request<RandomFranchisesResponse>('GET', '/anime/franchises/random', undefined, params);
  }

  /**
   * GET /anime/franchises/release/{releaseId} - Получить список франшиз для релиза
   */
  async getFranchisesByRelease(
    releaseId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<FranchisesByReleaseResponse>> {
    return this.request<FranchisesByReleaseResponse>(
      'GET',
      `/anime/franchises/release/${releaseId}`,
      undefined,
      params
    );
  }

  // ============================================================================
  // ЖАНРЫ
  // ============================================================================

  /**
   * GET /anime/genres - Список всех жанров
   */
  async getGenres(params?: IncludeExcludeParams): Promise<ApiResponse<GenresResponse>> {
    return this.request<GenresResponse>('GET', '/anime/genres', undefined, params);
  }

  /**
   * GET /anime/genres/{genreId} - Данные по жанру
   */
  async getGenre(
    genreId: number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<GenreResponse>> {
    return this.request<GenreResponse>('GET', `/anime/genres/${genreId}`, undefined, params);
  }

  /**
   * GET /anime/genres/random - Список случайных жанров
   */
  async getRandomGenres(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<Genre[]>> {
    return this.request<Genre[]>('GET', '/anime/genres/random', undefined, params);
  }

  /**
   * GET /anime/genres/{genreId}/releases - Список релизов жанра
   */
  async getGenreReleases(
    genreId: number,
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<GenreReleasesResponse>> {
    return this.request<GenreReleasesResponse>(
      'GET',
      `/anime/genres/${genreId}/releases`,
      undefined,
      params
    );
  }

  // ============================================================================
  // РЕЛИЗЫ
  // ============================================================================

  /**
   * GET /anime/releases/latest - Последние релизы
   */
  async getLatestReleases(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<LatestReleasesResponse>> {
    return this.request<LatestReleasesResponse>('GET', '/anime/releases/latest', undefined, params);
  }

  /**
   * GET /anime/releases/random - Данные по случайным релизам
   */
  async getRandomReleases(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RandomReleasesResponse>> {
    return this.request<RandomReleasesResponse>('GET', '/anime/releases/random', undefined, params);
  }

  /**
   * GET /anime/releases/recommended - Данные по рекомендованным релизам
   */
  async getRecommendedReleases(
    params?: { limit?: number; release_id?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<RecommendedReleasesResponse>> {
    return this.request<RecommendedReleasesResponse>(
      'GET',
      '/anime/releases/recommended',
      undefined,
      params
    );
  }

  /**
   * GET /anime/releases/list - Данные по списку релизов
   */
  async getReleasesList(
    params: {
      ids?: number[];
      aliases?: string[];
      page?: number;
      limit?: number;
    } & IncludeExcludeParams
  ): Promise<ApiResponse<CatalogReleasesResponse>> {
    return this.request<CatalogReleasesResponse>(
      'GET',
      '/anime/releases/list',
      undefined,
      params
    );
  }

  /**
   * GET /anime/releases/{idOrAlias} - Данные по релизу
   */
  async getRelease(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<ReleaseFull>> {
    return this.request<ReleaseFull>('GET', `/anime/releases/${idOrAlias}`, undefined, params);
  }

  /**
   * GET /anime/releases/{idOrAlias}/members - Список участников релиза
   */
  async getReleaseMembers(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<ReleaseMember[]>> {
    return this.request<ReleaseMember[]>(
      'GET',
      `/anime/releases/${idOrAlias}/members`,
      undefined,
      params
    );
  }

  /**
   * GET /anime/releases/{idOrAlias}/episodes/timecodes - Данные по таймкодам эпизодов релиза
   */
  async getReleaseEpisodesTimecodes(
    idOrAlias: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<UserView[]>> {
    return this.request<UserView[]>(
      'GET',
      `/anime/releases/${idOrAlias}/episodes/timecodes`,
      undefined,
      params
    );
  }

  // ============================================================================
  // ЭПИЗОДЫ
  // ============================================================================

  /**
   * GET /anime/releases/episodes/{releaseEpisodeId} - Данные по эпизоду
   */
  async getEpisode(
    releaseEpisodeId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<EpisodeWithRelease>> {
    return this.request<EpisodeWithRelease>(
      'GET',
      `/anime/releases/episodes/${releaseEpisodeId}`,
      undefined,
      params
    );
  }

  /**
   * GET /anime/releases/episodes/{releaseEpisodeId}/timecode - Данные по просмотру эпизода
   */
  async getEpisodeTimecode(
    releaseEpisodeId: string,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<UserView>> {
    return this.request<UserView>(
      'GET',
      `/anime/releases/episodes/${releaseEpisodeId}/timecode`,
      undefined,
      params
    );
  }

  // ============================================================================
  // РАСПИСАНИЕ РЕЛИЗОВ
  // ============================================================================

  /**
   * GET /anime/schedule/now - Расписание релизов на текущую дату
   */
  async getScheduleNow(params?: IncludeExcludeParams): Promise<ApiResponse<ScheduleNowResponse>> {
    return this.request<ScheduleNowResponse>('GET', '/anime/schedule/now', undefined, params);
  }

  /**
   * GET /anime/schedule/week - Расписание релизов на текущую неделю
   */
  async getScheduleWeek(params?: IncludeExcludeParams): Promise<ApiResponse<ScheduleWeekResponse>> {
    return this.request<ScheduleWeekResponse>('GET', '/anime/schedule/week', undefined, params);
  }

  // ============================================================================
  // ТОРРЕНТЫ
  // ============================================================================

  /**
   * GET /anime/torrents - Данные по торрентам
   */
  async getTorrents(
    params?: PaginationParams & IncludeExcludeParams
  ): Promise<ApiResponse<TorrentsResponse>> {
    return this.request<TorrentsResponse>('GET', '/anime/torrents', undefined, params);
  }

  /**
   * GET /anime/torrents/{hashOrId} - Данные по торренту
   */
  async getTorrent(
    hashOrId: string | number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<TorrentWithRelease>> {
    return this.request<TorrentWithRelease>(
      'GET',
      `/anime/torrents/${hashOrId}`,
      undefined,
      params
    );
  }

  /**
   * GET /anime/torrents/{hashOrId}/file - Торрент-файл по его hash или id
   */
  async downloadTorrentFile(
    hashOrId: string | number,
    pk?: string
  ): Promise<ApiResponse<Blob>> {
    const url = `${this.baseUrl}/anime/torrents/${hashOrId}/file${pk ? `?pk=${pk}` : ''}`;
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
   * GET /anime/torrents/release/{releaseId} - Данные по торрентам для релиза
   */
  async getReleaseTorrents(
    releaseId: number,
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<TorrentWithRelease[]>> {
    return this.request<TorrentWithRelease[]>(
      'GET',
      `/anime/torrents/release/${releaseId}`,
      undefined,
      params
    );
  }

  /**
   * GET /anime/torrents/rss - RSS лента последних торрентов
   */
  async getTorrentsRss(params?: { limit?: number; pk?: string }): Promise<ApiResponse<string>> {
    return this.request<string>('GET', '/anime/torrents/rss', undefined, params);
  }

  /**
   * GET /anime/torrents/rss/release/{releaseId} - RSS лента торрентов релиза
   */
  async getReleaseTorrentsRss(
    releaseId: number,
    params?: { pk?: string }
  ): Promise<ApiResponse<string>> {
    return this.request<string>(
      'GET',
      `/anime/torrents/rss/release/${releaseId}`,
      undefined,
      params
    );
  }

  // ============================================================================
  // ПОИСК
  // ============================================================================

  /**
   * GET /app/search/releases - Поиск релизов
   */
  async searchReleases(
    params: { query: string } & IncludeExcludeParams
  ): Promise<ApiResponse<SearchReleasesResponse>> {
    return this.request<SearchReleasesResponse>('GET', '/app/search/releases', undefined, params);
  }

  // ============================================================================
  // СТАТУС ПРИЛОЖЕНИЯ
  // ============================================================================

  /**
   * GET /app/status - Статус API
   */
  async getAppStatus(): Promise<ApiResponse<AppStatus>> {
    return this.request<AppStatus>('GET', '/app/status');
  }

  // ============================================================================
  // МЕДИА
  // ============================================================================

  /**
   * GET /media/promotions - Список промо-материалов
   */
  async getMediaPromotions(
    params?: IncludeExcludeParams
  ): Promise<ApiResponse<MediaPromotionsResponse>> {
    return this.request<MediaPromotionsResponse>('GET', '/media/promotions', undefined, params);
  }

  /**
   * GET /media/videos - Список видео-роликов
   */
  async getMediaVideos(
    params?: { limit?: number } & IncludeExcludeParams
  ): Promise<ApiResponse<MediaVideosResponse>> {
    return this.request<MediaVideosResponse>('GET', '/media/videos', undefined, params);
  }

  // ============================================================================
  // КОМАНДЫ
  // ============================================================================

  /**
   * GET /teams/ - Список команд АниЛибрии
   */
  async getTeams(params?: IncludeExcludeParams): Promise<ApiResponse<TeamsResponse>> {
    return this.request<TeamsResponse>('GET', '/teams/', undefined, params);
  }

  /**
   * GET /teams/roles - Список ролей
   */
  async getTeamRoles(params?: IncludeExcludeParams): Promise<ApiResponse<TeamRolesResponse>> {
    return this.request<TeamRolesResponse>('GET', '/teams/roles', undefined, params);
  }

  /**
   * GET /teams/users - Список анилибрийцев
   */
  async getTeamUsers(params?: IncludeExcludeParams): Promise<ApiResponse<TeamUsersResponse>> {
    return this.request<TeamUsersResponse>('GET', '/teams/users', undefined, params);
  }
}

// ============================================================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ============================================================================

/**
 * Создать экземпляр клиента с конфигурацией по умолчанию
 */
export function createClient(config?: AniLibertyClientConfig): AniLibertyClient {
  return new AniLibertyClient(config);
}

/**
 * Проверка успешности ответа
 */
export function isSuccess<T>(response: ApiResponse<T>): response is ApiResponse<T> & { data: T } {
  return response.status >= 200 && response.status < 300 && response.data !== undefined;
}

/**
 * Проверка ошибки
 */
export function isError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: any } {
  return response.error !== undefined;
}

// ============================================================================
// ЭКСПОРТ ПО УМОЛЧАНИЮ
// ============================================================================

export default AniLibertyClient;