/**
 * AniLiberty API Client для Node.js
 * Полное покрытие AniLiberty API V1
 * @version 1.0.0
 */

import fetch, { RequestInit, Response } from 'node-fetch';
import { Buffer } from 'buffer';

// ============================================================================
// ТИПЫ И ИНТЕРФЕЙСЫ
// ============================================================================

// Базовые типы
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface IncludeExcludeParams {
  include?: string | string[];
  exclude?: string | string[];
}

export interface ValidationError {
  message: string;
  errors: Record<string, string[]>;
}

// Аккаунты - OTP
export interface OTPGetRequest {
  device_id: string;
}

export interface OTPGetResponse {
  code: number;
  expires_at: string;
}

export interface OTPAcceptRequest {
  code: number;
}

export interface OTPLoginRequest {
  code: number;
  device_id: string;
}

export interface OTPLoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// Аккаунты - Авторизация
export interface LoginRequest {
  login: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface SocialAuthRedirectResponse {
  url: string;
}

export interface SocialAuthCallbackParams {
  code: string;
  state?: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
  password_confirmation: string;
}

// Пользователь
export interface User {
  id: string;
  login: string;
  email: string;
  avatar?: string;
  created_at: string;
  updated_at: string;
}

export interface UserProfile extends User {
  description?: string;
  settings?: UserSettings;
}

export interface UserSettings {
  notifications_enabled: boolean;
  adult_content: boolean;
  autoplay: boolean;
}

export interface UpdateProfileRequest {
  login?: string;
  email?: string;
  description?: string;
  avatar?: string;
}

export interface UpdatePasswordRequest {
  old_password: string;
  new_password: string;
  new_password_confirmation: string;
}

// Коллекции
export interface Collection {
  id: string;
  title: string;
  description?: string;
  is_public: boolean;
  releases_count: number;
  created_at: string;
  updated_at: string;
}

export interface CreateCollectionRequest {
  title: string;
  description?: string;
  is_public?: boolean;
}

export interface UpdateCollectionRequest {
  title?: string;
  description?: string;
  is_public?: boolean;
}

export interface AddReleaseToCollectionRequest {
  release_id: string;
}

// Избранное
export interface FavoriteStatus {
  id: string;
  title: string;
  sort_order: number;
}

export interface Favorite {
  id: string;
  release_id: string;
  status_id: string;
  created_at: string;
}

export interface AddToFavoriteRequest {
  release_id: string;
  status_id?: string;
}

export interface UpdateFavoriteRequest {
  status_id: string;
}

// Просмотры
export interface WatchHistory {
  id: string;
  release_id: string;
  episode_id: string;
  timestamp: number;
  duration: number;
  created_at: string;
  updated_at: string;
}

export interface UpdateWatchHistoryRequest {
  episode_id: string;
  timestamp: number;
  duration: number;
}

// Реклама
export interface VastAd {
  id: string;
  title: string;
  url: string;
  duration: number;
  skip_offset?: number;
}

// Аниме - Каталог
export interface Release {
  id: string;
  code: string;
  title: ReleaseTitle;
  description?: string;
  poster?: string;
  screenshots?: string[];
  type?: ReleaseType;
  genres?: Genre[];
  season?: Season;
  status?: ReleaseStatus;
  rating?: Rating;
  franchise?: Franchise;
  episodes_total?: number;
  episodes_released?: number;
  team?: Team;
  torrents?: Torrent[];
  created_at: string;
  updated_at: string;
}

export interface ReleaseTitle {
  ru: string;
  en: string;
  jp?: string;
}

export interface ReleaseType {
  id: string;
  title: string;
  sort_order: number;
}

export interface Genre {
  id: string;
  title: string;
}

export interface Season {
  id: string;
  title: string;
  year: number;
  sort_order: number;
}

export interface ReleaseStatus {
  id: string;
  title: string;
}

export interface Rating {
  id: string;
  title: string;
  description?: string;
}

export interface Franchise {
  id: string;
  title: string;
  releases?: Release[];
}

export interface Team {
  id: string;
  title: string;
  sort_order: number;
  description?: string;
}

// Эпизоды
export interface Episode {
  id: string;
  release_id: string;
  number: number;
  title?: string;
  opening?: TimeRange;
  ending?: TimeRange;
  duration: number;
  streams?: Stream[];
  created_at: string;
  updated_at: string;
}

export interface TimeRange {
  start: number;
  end: number;
}

export interface Stream {
  quality: string;
  url: string;
  type: string;
}

// Расписание
export interface ScheduleItem {
  release: Release;
  episode_number: number;
  release_date: string;
}

// Торренты
export interface Torrent {
  id: string;
  release_id: string;
  quality: string;
  url: string;
  size: number;
  seeders: number;
  leechers: number;
  completed: number;
  created_at: string;
  updated_at: string;
}

// Поиск
export interface SearchResult {
  releases: Release[];
  franchises: Franchise[];
  total: number;
}

export interface SearchParams extends PaginationParams, IncludeExcludeParams {
  query: string;
  types?: string[];
  genres?: string[];
  seasons?: string[];
  statuses?: string[];
  ratings?: string[];
}

// Каталог фильтры
export interface CatalogFilters extends PaginationParams, IncludeExcludeParams {
  types?: string[];
  genres?: string[];
  seasons?: string[];
  statuses?: string[];
  ratings?: string[];
  sort?: 'created_at' | 'updated_at' | 'title' | 'rating';
  order?: 'asc' | 'desc';
}

// Медиа
export interface PromoVideo {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  duration: number;
  created_at: string;
}

export interface VideoContent {
  id: string;
  title: string;
  description?: string;
  url: string;
  thumbnail?: string;
  duration: number;
  views: number;
  created_at: string;
}

// Статус приложения
export interface AppStatus {
  status: 'ok' | 'maintenance' | 'error';
  version: string;
  message?: string;
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

    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
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
          error: (responseData as any)?.message || `HTTP Error ${response.status}`,
          data: undefined,
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
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ============================================================================
  // АККАУНТЫ - ОДНОРАЗОВЫЕ ПАРОЛИ (OTP)
  // ============================================================================

  /**
   * Запрашивает новый OTP
   */
  async otpGet(request: OTPGetRequest): Promise<ApiResponse<OTPGetResponse>> {
    return this.request<OTPGetResponse>('POST', '/accounts/otp/get', request);
  }

  /**
   * Присоединяет пользователя к выданному OTP
   */
  async otpAccept(request: OTPAcceptRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/otp/accept', request);
  }

  /**
   * Авторизация по OTP
   */
  async otpLogin(request: OTPLoginRequest): Promise<ApiResponse<OTPLoginResponse>> {
    const response = await this.request<OTPLoginResponse>('POST', '/accounts/otp/login', request);
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  // ============================================================================
  // АККАУНТЫ - АВТОРИЗАЦИЯ
  // ============================================================================

  /**
   * Авторизация пользователя по логину и паролю
   */
  async login(request: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('POST', '/accounts/users/auth/login', request);
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  /**
   * Регистрация нового пользователя
   */

  /**
   * Выход из системы
   */
  async logout(): Promise<ApiResponse<void>> {
    const response = await this.request<void>('POST', '/accounts/users/auth/logout');
    this.clearAccessToken();
    return response;
  }

  /**
   * Обновление токена доступа
   */
  async refreshToken(): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('POST', '/accounts/users/auth/refresh');
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  // ============================================================================
  // СОЦИАЛЬНЫЕ СЕТИ
  // ============================================================================

  /**
   * Получить URL для авторизации через VK
   */
  async socialAuthVkRedirect(): Promise<ApiResponse<SocialAuthRedirectResponse>> {
    return this.request<SocialAuthRedirectResponse>('GET', '/accounts/users/auth/social/vk/redirect');
  }

  /**
   * Callback авторизации VK
   */
  async socialAuthVkCallback(params: SocialAuthCallbackParams): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('GET', '/accounts/users/auth/social/vk/callback', undefined, params);
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  /**
   * Получить URL для авторизации через Discord
   */
  async socialAuthDiscordRedirect(): Promise<ApiResponse<SocialAuthRedirectResponse>> {
    return this.request<SocialAuthRedirectResponse>('GET', '/accounts/users/auth/social/discord/redirect');
  }

  /**
   * Callback авторизации Discord
   */
  async socialAuthDiscordCallback(params: SocialAuthCallbackParams): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('GET', '/accounts/users/auth/social/discord/callback', undefined, params);
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  /**
   * Получить URL для авторизации через Google
   */
  async socialAuthGoogleRedirect(): Promise<ApiResponse<SocialAuthRedirectResponse>> {
    return this.request<SocialAuthRedirectResponse>('GET', '/accounts/users/auth/social/google/redirect');
  }

  /**
   * Callback авторизации Google
   */
  async socialAuthGoogleCallback(params: SocialAuthCallbackParams): Promise<ApiResponse<LoginResponse>> {
    const response = await this.request<LoginResponse>('GET', '/accounts/users/auth/social/google/callback', undefined, params);
    if (response.data?.access_token) {
      this.setAccessToken(response.data.access_token);
    }
    return response;
  }

  // ============================================================================
  // СБРОС ПАРОЛЯ
  // ============================================================================

  /**
   * Запрос на сброс пароля
   */
  async passwordResetRequest(request: PasswordResetRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/reset', request);
  }

  /**
   * Подтверждение сброса пароля
   */
  async passwordResetConfirm(request: PasswordResetConfirmRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', '/accounts/users/auth/password/reset/confirm', request);
  }

  // ============================================================================
  // ПРОФИЛЬ ПОЛЬЗОВАТЕЛЯ
  // ============================================================================

  /**
   * Получить профиль текущего пользователя
   */
  async getMyProfile(): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>('GET', '/accounts/users/my/profile');
  }

  /**
   * Обновить профиль
   */
  async updateMyProfile(request: UpdateProfileRequest): Promise<ApiResponse<UserProfile>> {
    return this.request<UserProfile>('PUT', '/accounts/users/my/profile', request);
  }

  /**
   * Изменить пароль
   */
  async updateMyPassword(request: UpdatePasswordRequest): Promise<ApiResponse<void>> {
    return this.request<void>('PUT', '/accounts/users/my/profile/password', request);
  }

  /**
   * Удалить аккаунт
   */
  async deleteMyAccount(): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', '/accounts/users/my/profile');
  }

  // ============================================================================
  // КОЛЛЕКЦИИ
  // ============================================================================

  /**
   * Получить список статусов коллекций
   */
  async getCollectionStatuses(): Promise<ApiResponse<FavoriteStatus[]>> {
    return this.request<FavoriteStatus[]>('GET', '/accounts/users/my/collections/dictionaries/statuses');
  }

  /**
   * Получить все коллекции пользователя
   */
  async getMyCollections(params?: PaginationParams): Promise<ApiResponse<Collection[]>> {
    return this.request<Collection[]>('GET', '/accounts/users/my/collections', undefined, params);
  }

  /**
   * Создать коллекцию
   */
  async createCollection(request: CreateCollectionRequest): Promise<ApiResponse<Collection>> {
    return this.request<Collection>('POST', '/accounts/users/my/collections', request);
  }

  /**
   * Получить коллекцию по ID
   */
  async getCollection(collectionId: string, params?: IncludeExcludeParams): Promise<ApiResponse<Collection>> {
    return this.request<Collection>('GET', `/accounts/users/my/collections/${collectionId}`, undefined, params);
  }

  /**
   * Обновить коллекцию
   */
  async updateCollection(collectionId: string, request: UpdateCollectionRequest): Promise<ApiResponse<Collection>> {
    return this.request<Collection>('PUT', `/accounts/users/my/collections/${collectionId}`, request);
  }

  /**
   * Удалить коллекцию
   */
  async deleteCollection(collectionId: string): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', `/accounts/users/my/collections/${collectionId}`);
  }

  /**
   * Добавить релиз в коллекцию
   */
  async addReleaseToCollection(collectionId: string, request: AddReleaseToCollectionRequest): Promise<ApiResponse<void>> {
    return this.request<void>('POST', `/accounts/users/my/collections/${collectionId}/releases`, request);
  }

  /**
   * Удалить релиз из коллекции
   */
  async removeReleaseFromCollection(collectionId: string, releaseId: string): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', `/accounts/users/my/collections/${collectionId}/releases/${releaseId}`);
  }

  // ============================================================================
  // ИЗБРАННОЕ
  // ============================================================================

  /**
   * Получить список статусов избранного
   */
  async getFavoriteStatuses(): Promise<ApiResponse<FavoriteStatus[]>> {
    return this.request<FavoriteStatus[]>('GET', '/accounts/users/my/favorites/dictionaries/statuses');
  }

  /**
   * Получить все избранные релизы
   */
  async getMyFavorites(params?: PaginationParams & IncludeExcludeParams): Promise<ApiResponse<Favorite[]>> {
    return this.request<Favorite[]>('GET', '/accounts/users/my/favorites', undefined, params);
  }

  /**
   * Добавить релиз в избранное
   */
  async addToFavorites(request: AddToFavoriteRequest): Promise<ApiResponse<Favorite>> {
    return this.request<Favorite>('POST', '/accounts/users/my/favorites', request);
  }

  /**
   * Обновить статус избранного релиза
   */
  async updateFavorite(releaseId: string, request: UpdateFavoriteRequest): Promise<ApiResponse<Favorite>> {
    return this.request<Favorite>('PUT', `/accounts/users/my/favorites/${releaseId}`, request);
  }

  /**
   * Удалить релиз из избранного
   */
  async removeFromFavorites(releaseId: string): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', `/accounts/users/my/favorites/${releaseId}`);
  }

  // ============================================================================
  // ИСТОРИЯ ПРОСМОТРОВ
  // ============================================================================

  /**
   * Получить историю просмотров
   */
  async getWatchHistory(params?: PaginationParams & IncludeExcludeParams): Promise<ApiResponse<WatchHistory[]>> {
    return this.request<WatchHistory[]>('GET', '/accounts/users/my/watch-history', undefined, params);
  }

  /**
   * Обновить позицию просмотра эпизода
   */
  async updateWatchHistory(releaseId: string, request: UpdateWatchHistoryRequest): Promise<ApiResponse<WatchHistory>> {
    return this.request<WatchHistory>('PUT', `/accounts/users/my/watch-history/${releaseId}`, request);
  }

  /**
   * Удалить запись из истории просмотров
   */
  async deleteWatchHistory(releaseId: string): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', `/accounts/users/my/watch-history/${releaseId}`);
  }

  /**
   * Очистить всю историю просмотров
   */
  async clearWatchHistory(): Promise<ApiResponse<void>> {
    return this.request<void>('DELETE', '/accounts/users/my/watch-history');
  }

  // ============================================================================
  // РЕКЛАМА
  // ============================================================================

  /**
   * Получить VAST рекламу
   */
  async getVastAds(params?: { placement?: string }): Promise<ApiResponse<VastAd[]>> {
    return this.request<VastAd[]>('GET', '/ads/vasts', undefined, params);
  }

  // ============================================================================
  // КАТАЛОГ АНИМЕ
  // ============================================================================

  /**
   * Получить список релизов с фильтрацией
   */
  async getCatalog(filters?: CatalogFilters): Promise<ApiResponse<Release[]>> {
    return this.request<Release[]>('GET', '/anime/catalog/releases', undefined, filters);
  }

  /**
   * Получить релиз по ID
   */
  async getRelease(releaseId: string, params?: IncludeExcludeParams): Promise<ApiResponse<Release>> {
    return this.request<Release>('GET', `/anime/catalog/releases/${releaseId}`, undefined, params);
  }

  /**
   * Получить релиз по коду
   */
  async getReleaseByCode(code: string, params?: IncludeExcludeParams): Promise<ApiResponse<Release>> {
    return this.request<Release>('GET', `/anime/catalog/releases/code/${code}`, undefined, params);
  }

  /**
   * Получить случайный релиз
   */
  async getRandomRelease(params?: IncludeExcludeParams & { filters?: Partial<CatalogFilters> }): Promise<ApiResponse<Release>> {
    return this.request<Release>('GET', '/anime/catalog/releases/random', undefined, params);
  }

  /**
   * Получить последние обновления релизов
   */
  async getUpdates(params?: PaginationParams & IncludeExcludeParams): Promise<ApiResponse<Release[]>> {
    return this.request<Release[]>('GET', '/anime/catalog/releases/updates', undefined, params);
  }

  // ============================================================================
  // СПРАВОЧНИКИ КАТАЛОГА
  // ============================================================================

  /**
   * Получить список типов релизов
   */
  async getReleaseTypes(): Promise<ApiResponse<ReleaseType[]>> {
    return this.request<ReleaseType[]>('GET', '/anime/catalog/dictionaries/types');
  }

  /**
   * Получить список жанров
   */
  async getGenres(): Promise<ApiResponse<Genre[]>> {
    return this.request<Genre[]>('GET', '/anime/genres');
  }

  /**
   * Получить список сезонов
   */
  async getSeasons(): Promise<ApiResponse<Season[]>> {
    return this.request<Season[]>('GET', '/anime/catalog/dictionaries/seasons');
  }

  /**
   * Получить список статусов релизов
   */
  async getReleaseStatuses(): Promise<ApiResponse<ReleaseStatus[]>> {
    return this.request<ReleaseStatus[]>('GET', '/anime/catalog/dictionaries/statuses');
  }

  /**
   * Получить список возрастных рейтингов
   */
  async getRatings(): Promise<ApiResponse<Rating[]>> {
    return this.request<Rating[]>('GET', '/anime/catalog/dictionaries/ratings');
  }

  // ============================================================================
  // ФРАНШИЗЫ
  // ============================================================================

  /**
   * Получить список франшиз
   */
  async getFranchises(params?: PaginationParams): Promise<ApiResponse<Franchise[]>> {
    return this.request<Franchise[]>('GET', '/anime/franchises', undefined, params);
  }

  /**
   * Получить франшизу по ID
   */
  async getFranchise(franchiseId: string, params?: IncludeExcludeParams): Promise<ApiResponse<Franchise>> {
    return this.request<Franchise>('GET', `/anime/franchises/${franchiseId}`, undefined, params);
  }

  // ============================================================================
  // РЕЛИЗЫ И ЭПИЗОДЫ
  // ============================================================================

  /**
   * Получить эпизоды релиза
   */
  async getReleaseEpisodes(releaseId: string, params?: IncludeExcludeParams): Promise<ApiResponse<Episode[]>> {
    return this.request<Episode[]>('GET', `/anime/releases/${releaseId}/episodes`, undefined, params);
  }

  /**
   * Получить эпизод по ID
   */
  async getEpisode(releaseId: string, episodeId: string, params?: IncludeExcludeParams): Promise<ApiResponse<Episode>> {
    return this.request<Episode>('GET', `/anime/releases/${releaseId}/episodes/${episodeId}`, undefined, params);
  }

  // ============================================================================
  // РАСПИСАНИЕ РЕЛИЗОВ
  // ============================================================================

  /**
   * Получить расписание выхода эпизодов
   */
  async getSchedule(params?: { from?: string; to?: string } & IncludeExcludeParams): Promise<ApiResponse<ScheduleItem[]>> {
    return this.request<ScheduleItem[]>('GET', '/anime/releases/schedule', undefined, params);
  }

  /**
   * Получить расписание на сегодня
   */
  async getTodaySchedule(params?: IncludeExcludeParams): Promise<ApiResponse<ScheduleItem[]>> {
    return this.request<ScheduleItem[]>('GET', '/anime/releases/schedule/today', undefined, params);
  }

  /**
   * Получить расписание на неделю
   */
  async getWeekSchedule(params?: IncludeExcludeParams): Promise<ApiResponse<Record<string, ScheduleItem[]>>> {
    return this.request<Record<string, ScheduleItem[]>>('GET', '/anime/releases/schedule/week', undefined, params);
  }

  // ============================================================================
  // ТОРРЕНТЫ
  // ============================================================================

  /**
   * Получить торренты релиза
   */
  async getReleaseTorrents(releaseId: string): Promise<ApiResponse<Torrent[]>> {
    return this.request<Torrent[]>('GET', `/anime/torrents/release/${releaseId}`);
  }

  /**
   * Получить торрент по ID
   */
  async getTorrent(torrentId: string): Promise<ApiResponse<Torrent>> {
    return this.request<Torrent>('GET', `/anime/torrents/${torrentId}`);
  }

  /**
   * Скачать торрент файл
   */
  async downloadTorrent(torrentId: string): Promise<ApiResponse<Buffer>> {
    const url = `${this.baseUrl}/anime/torrents/${torrentId}/download`;
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
          error: `HTTP Error ${response.status}`,
        };
      }

      const buffer = await response.buffer();
      return {
        status: response.status,
        data: buffer,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      return {
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // ============================================================================
  // ПОИСК
  // ============================================================================

  /**
   * Поиск по каталогу
   */
  async search(params: SearchParams): Promise<ApiResponse<SearchResult>> {
    return this.request<SearchResult>('GET', '/app/search', undefined, params);
  }

  /**
   * Быстрый поиск (автодополнение)
   */
  async quickSearch(query: string, limit?: number): Promise<ApiResponse<Release[]>> {
    return this.request<Release[]>('GET', '/app/search/quick', undefined, { query, limit });
  }

  // ============================================================================
  // СТАТУС ПРИЛОЖЕНИЯ
  // ============================================================================

  /**
   * Получить статус API
   */
  async getAppStatus(): Promise<ApiResponse<AppStatus>> {
    return this.request<AppStatus>('GET', '/app/status');
  }

  /**
   * Проверить доступность API (ping)
   */
  async ping(): Promise<ApiResponse<{ pong: boolean }>> {
    return this.request<{ pong: boolean }>('GET', '/app/ping');
  }

  // ============================================================================
  // МЕДИА
  // ============================================================================

  /**
   * Получить промо видео
   */
  async getPromoVideos(params?: PaginationParams): Promise<ApiResponse<PromoVideo[]>> {
    return this.request<PromoVideo[]>('GET', '/media/promo', undefined, params);
  }

  /**
   * Получить промо видео по ID
   */
  async getPromoVideo(videoId: string): Promise<ApiResponse<PromoVideo>> {
    return this.request<PromoVideo>('GET', `/media/promo/${videoId}`);
  }

  /**
   * Получить видеоконтент
   */
  async getVideoContent(params?: PaginationParams): Promise<ApiResponse<VideoContent[]>> {
    return this.request<VideoContent[]>('GET', '/media/videos', undefined, params);
  }

  /**
   * Получить видео по ID
   */
  async getVideo(videoId: string): Promise<ApiResponse<VideoContent>> {
    return this.request<VideoContent>('GET', `/media/videos/${videoId}`);
  }

  // ============================================================================
  // КОМАНДЫ
  // ============================================================================

  /**
   * Получить список команд
   */
  async getTeams(params?: PaginationParams): Promise<ApiResponse<Team[]>> {
    return this.request<Team[]>('GET', '/teams', undefined, params);
  }

  /**
   * Получить команду по ID
   */
  async getTeam(teamId: string): Promise<ApiResponse<Team>> {
    return this.request<Team>('GET', `/teams/${teamId}`);
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
export function isError<T>(response: ApiResponse<T>): response is ApiResponse<T> & { error: string } {
  return response.error !== undefined;
}

// ============================================================================
// ЭКСПОРТ ПО УМОЛЧАНИЮ
// ============================================================================

export default AniLibertyClient;
