// ============================================
// Commons - Общие компоненты
// ============================================

export interface ValidationError {
  errors: Record<string, string[]>;
}

export interface Image {
  preview: string;
  thumbnail: string;
}

export interface ImageWithOptimized extends Image {
  optimized?: Image;
}

export interface PaginationLinks {
  previous?: string;
  next?: string;
}

export interface Pagination {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links?: PaginationLinks;
}

export interface PaginationMeta {
  pagination: Pagination;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

// ============================================
// Accounts - OTP
// ============================================

export interface OTP {
  code: string;
  user_id: number;
  device_id: string;
  expired_at: string;
}

export interface OTPGetResponse {
  otp: OTP;
  remaining_time: number;
}

export interface OTPLoginResponse {
  token: string;
}

// ============================================
// Accounts - Users - Enums
// ============================================

export type UserSocialType = 'vk' | 'google' | 'patreon' | 'discord';

export type UserCollectionType = 
  | 'PLANNED' 
  | 'WATCHED' 
  | 'WATCHING' 
  | 'POSTPONED' 
  | 'ABANDONED';

export type UserFavoriteSorting = 
  | 'CREATED_AT_DESC'
  | 'CREATED_AT_ASC'
  | 'FRESH_AT_DESC'
  | 'FRESH_AT_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'YEAR_DESC'
  | 'YEAR_ASC';

// ============================================
// Accounts - Users - Models
// ============================================

export interface UserSession {
  id: string;
  user_id: number;
  device: {
    name: string;
    version: string;
    platform: string;
  };
  browser: {
    name: string;
    version: string;
  };
  location: {
    country: string;
    iso_code: string;
  };
  is_mobile: boolean;
  is_desktop: boolean;
  ip_address: string;
  user_agent: string;
  is_current: boolean;
  last_active: string;
}

export interface UserTorrents {
  passkey?: string;
  uploaded: number;
  downloaded: number;
}

export interface User {
  id: number;
  login?: string;
  email?: string;
  nickname: string;
  avatar?: ImageWithOptimized;
  torrents?: UserTorrents;
  is_banned: boolean;
  created_at: string;
  is_with_ads: boolean;
}

export interface UserView {
  id: number;
  time: number;
  user_id: number;
  is_watched: boolean;
  updated_at: string;
  release_episode_id: string;
}

// ============================================
// Accounts - Auth
// ============================================

export interface LoginResponse {
  token: string;
}

export interface SocialAuthLoginResponse {
  url: string;
  state: string;
}

export interface SocialAuthAuthenticateResponse {
  token: string;
}

export interface LogoutResponse {
  token: null;
}

// ============================================
// Accounts - Collections
// ============================================

export interface CollectionReferenceItem<T> {
  value: T;
  label?: string;
  description?: string;
}

export interface CollectionGenreReference {
  id: number;
  name: string;
}

export interface CollectionsReferencesAgeRatings {
  value: AgeRating;
  label: string;
  description: string;
}

export interface CollectionsReferencesGenres extends CollectionGenreReference {}

export interface CollectionsReferencesTypes {
  value: ReleaseType;
  description: string;
}

export type CollectionsReferencesYears = number[];

export type CollectionReleaseItem = [number, UserCollectionType];

export interface CollectionRelease extends Release {
  genres: Genre[];
  episodes: Episode[];
}

// ============================================
// Accounts - Favorites
// ============================================

export interface FavoritesReferencesAgeRatings {
  value: AgeRating;
  label: string;
  description: string;
}

export interface FavoritesReferencesGenres {
  id: number;
  name: string;
}

export interface FavoritesReferencesSorting {
  value: UserFavoriteSorting;
  label: string;
  description: string;
}

export interface FavoritesReferencesTypes {
  value: ReleaseType;
  description: string;
}

export type FavoritesReferencesYears = number[];

export interface FavoriteRelease extends Release {
  genres: Genre[];
  episodes: Episode[];
}

export type FavoriteIdItem = number;

// ============================================
// Accounts - Views
// ============================================

export interface ViewHistoryItem extends UserView {
  release_episode: Episode & {
    release: Release;
  };
}

export type ViewTimecodeItem = [string, number, boolean];

// ============================================
// Ads - Enums
// ============================================

export type AdBannerPlacement = 'HOME_SUPPORT' | 'RELEASE_SIDEBAR';

export type AdStatisticsEventType = 
  | 'AD_VAST_SHOW'
  | 'AD_VAST_REQUEST'
  | 'AD_BANNER_VIEW'
  | 'AD_BANNER_CLICK'
  | 'MEDIA_PROMOTION_VIEW'
  | 'MEDIA_PROMOTION_CLICK';

// ============================================
// Ads - Models
// ============================================

export interface AdBanner {
  id: number;
  title: string;
  image?: ImageWithOptimized;
  ad_erid: string;
  image_url: string;
  button_url: string;
  placement: AdBannerPlacement;
  has_overlay: boolean;
  button_title: string;
  description: string;
  ad_company_itn: string;
  ad_company_name: string;
}

export interface AdVast {
  id: string;
  url: string;
  ad_erid: string;
  ad_company_itn: string;
  ad_company_name: string;
}

// ============================================
// Anime - Catalog - Enums
// ============================================

export type CatalogProductionStatus = 
  | 'IS_IN_PRODUCTION' 
  | 'IS_NOT_IN_PRODUCTION';

export type CatalogPublishStatus = 
  | 'IS_ONGOING' 
  | 'IS_NOT_ONGOING';

export type CatalogSorting = 
  | 'FRESH_AT_DESC'
  | 'FRESH_AT_ASC'
  | 'RATING_DESC'
  | 'RATING_ASC'
  | 'YEAR_DESC'
  | 'YEAR_ASC';

// ============================================
// Anime - Catalog - References
// ============================================

export interface CatalogReferenceAgeRating {
  value: AgeRating;
  label: string;
  description: string;
}

export interface CatalogReferenceGenre {
  id: number;
  name: string;
}

export interface CatalogReferenceProductionStatus {
  value: CatalogProductionStatus;
  description: string;
}

export interface CatalogReferencePublishStatus {
  value: CatalogPublishStatus;
  description: string;
}

export interface CatalogReferenceSeason {
  value: Season;
  description: string;
}

export interface CatalogReferenceSorting {
  value: CatalogSorting;
  label: string;
  description: string;
}

export interface CatalogReferenceType {
  value: ReleaseType;
  description: string;
}

export type CatalogReferenceYears = number[];

// ============================================
// Anime - Franchises
// ============================================

export interface FranchiseRelease {
  id: string;
  sort_order: number;
  release_id: number;
  franchise_id: string;
}

export interface Franchise {
  id: string;
  name: string;
  name_english: string;
  image?: ImageWithOptimized;
  rating: number;
  last_year: number;
  first_year: number;
  total_releases: number;
  total_episodes: number;
  total_duration: string | null;
  total_duration_in_seconds: number;
}

export interface FranchiseWithReleases extends Franchise {
  franchise_releases: Array<FranchiseRelease & {
    release: Release;
  }>;
}

// ============================================
// Anime - Genres
// ============================================

export interface Genre {
  id: number;
  name: string;
  image?: ImageWithOptimized;
  total_releases: number;
}

// ============================================
// Anime - Releases - Enums
// ============================================

export type AgeRating = 
  | 'R0_PLUS'
  | 'R6_PLUS'
  | 'R12_PLUS'
  | 'R16_PLUS'
  | 'R18_PLUS';

export type PublishDay = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export type ReleaseType = 
  | 'TV'
  | 'ONA'
  | 'WEB'
  | 'OVA'
  | 'OAD'
  | 'MOVIE'
  | 'DORAMA'
  | 'SPECIAL';

export type ReleaseMemberRole = 
  | 'poster'
  | 'timing'
  | 'voicing'
  | 'editing'
  | 'decorating'
  | 'translating';

// ============================================
// Anime - Releases - Models
// ============================================

export interface ReleaseMemberRoleInfo {
  value: ReleaseMemberRole;
  description: string;
}

export interface ReleaseMemberUser {
  id: number;
  avatar?: ImageWithOptimized;
}

export interface ReleaseMember {
  id: string;
  role: ReleaseMemberRoleInfo;
  user?: ReleaseMemberUser | null;
  nickname: string;
}

export interface ReleaseTypeInfo {
  value: ReleaseType;
  description: string;
}

export interface ReleaseName {
  main: string;
  english: string;
  alternative: string;
}

export interface ReleaseSeasonInfo {
  value: Season;
  description: string;
}

export interface ReleaseAgeRatingInfo {
  value: AgeRating;
  label: string;
  is_adult: boolean;
  description: string;
}

export interface ReleasePublishDayInfo {
  value: PublishDay;
  description: string;
}

export interface Release {
  id: number;
  type?: ReleaseTypeInfo;
  year: number;
  name: ReleaseName;
  alias: string;
  season?: ReleaseSeasonInfo;
  poster?: ImageWithOptimized;
  fresh_at: string;
  created_at: string;
  updated_at: string;
  is_ongoing: boolean;
  age_rating?: ReleaseAgeRatingInfo;
  publish_day?: ReleasePublishDayInfo;
  description: string;
  notification?: string;
  episodes_total: number;
  external_player?: string;
  is_in_production: boolean;
  is_blocked_by_geo: boolean;
  is_blocked_by_copyrights: boolean;
  added_in_users_favorites: number;
  average_duration_of_episode: number;
  added_in_planned_collection: number;
  added_in_watched_collection: number;
  added_in_watching_collection: number;
  added_in_postponed_collection: number;
  added_in_abandoned_collection: number;
}

export interface ReleaseWithGenres extends Release {
  genres: Genre[];
}

export interface ReleaseWithMembers extends ReleaseWithGenres {
  members: ReleaseMember[];
}

export interface ReleaseWithEpisodes extends ReleaseWithMembers {
  episodes: Episode[];
}

export interface ReleaseWithTorrents extends ReleaseWithEpisodes {
  torrents: Torrent[];
}

export interface ReleaseFull extends ReleaseWithTorrents {
  sponsor?: Sponsor;
}

export interface ReleaseLatest extends ReleaseWithGenres {
  latest_episode: Episode;
}

// ============================================
// Anime - Episodes
// ============================================

export interface EpisodeSkip {
  start: number;
  stop: number;
}

export interface Episode {
  id: string;
  name?: string;
  ordinal: number;
  ending?: EpisodeSkip;
  opening?: EpisodeSkip;
  preview?: ImageWithOptimized;
  hls_480?: string;
  hls_720?: string;
  hls_1080?: string;
  duration: number;
  rutube_id?: string;
  youtube_id?: string;
  updated_at: string;
  sort_order: number;
  release_id: number;
  name_english?: string;
}

export interface EpisodeWithRelease extends Episode {
  release: Release & {
    episodes: Episode[];
  };
}

// ============================================
// Anime - Schedule
// ============================================

export interface ReleaseInSchedule {
  release: Release;
  full_season_is_released: boolean;
  published_release_episode?: Episode;
  next_release_episode_number?: number | null;
}

export interface ScheduleNowResponse {
  today: ReleaseInSchedule[];
  tomorrow: ReleaseInSchedule[];
  yesterday: ReleaseInSchedule[];
}

export interface ScheduleWeekResponse {
  data: ReleaseInSchedule[];
}

// ============================================
// Anime - Sponsors
// ============================================

export interface Sponsor {
  id: string;
  title: string;
  description: string;
  url_title: string;
  url: string;
}

// ============================================
// Anime - Torrents - Enums
// ============================================

export type TorrentCodec = 
  | 'AV1'
  | 'x264/AVC'
  | 'x265/HEVC'
  | 'x265hq/HEVC-HQ';

export type TorrentColor = '8bit' | '10Bit';

export type TorrentQuality = 
  | '360p'
  | '480p'
  | '576p'
  | '720p'
  | '1080p'
  | '2k'
  | '4k'
  | '8k';

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

export type TorrentMemberRole = 'HEVC';

// ============================================
// Anime - Torrents - Models
// ============================================

export interface TorrentMemberRoleInfo {
  value: TorrentMemberRole;
  description: string;
}

export interface TorrentMemberUser {
  id: number;
  avatar?: ImageWithOptimized;
}

export interface TorrentMember {
  id: string;
  role: TorrentMemberRoleInfo;
  nickname: string;
  external_url?: string;
}

export interface TorrentMemberWithUser extends TorrentMember {
  user?: TorrentMemberUser;
}

export interface TorrentTypeInfo {
  value: TorrentType;
  description: string;
}

export interface TorrentQualityInfo {
  value: TorrentQuality;
  description: string;
}

export interface TorrentCodecInfo {
  value: TorrentCodec;
  label: string;
  description: string;
  label_color: string;
  label_is_visible: boolean;
}

export interface TorrentColorInfo {
  value: TorrentColor;
  description: string;
}

export interface Torrent {
  id: number;
  hash: string;
  size: number;
  type: TorrentTypeInfo;
  color: TorrentColorInfo;
  codec: TorrentCodecInfo;
  label: string;
  quality: TorrentQualityInfo;
  magnet: string;
  filename: string;
  seeders: number;
  bitrate: number;
  leechers: number;
  sort_order: number;
  updated_at: string;
  is_hardsub: boolean;
  description?: string;
  created_at: string;
  completed_times: number;
}

export interface TorrentWithMembers extends Torrent {
  torrent_members: TorrentMemberWithUser[];
}

export interface TorrentWithRelease extends TorrentWithMembers {
  release: Release;
}

// ============================================
// App - Search & Status
// ============================================

export interface AppStatusRequest {
  ip: string;
  country: string;
  iso_code: string;
  timezone: string;
}

export interface AppStatus {
  request: AppStatusRequest;
  is_alive: boolean;
  available_api_endpoints: string[];
}

// ============================================
// Media - Promotions
// ============================================

export interface MediaPromotion {
  id: string;
  url?: string;
  url_label?: string;
  image?: ImageWithOptimized;
  title?: string;
  description?: string;
  is_ad: boolean;
  ad_erid?: string;
  ad_origin?: string;
  release?: Release;
  has_overlay: boolean;
}

// ============================================
// Media - Videos - Enums
// ============================================

export type VideoOriginType = 'YOUTUBE_PLAYLIST';

// ============================================
// Media - Videos - Models
// ============================================

export interface VideoOriginTypeInfo {
  value: VideoOriginType;
  description: string;
}

export interface VideoOrigin {
  id: string;
  url: string;
  type: VideoOriginTypeInfo;
  title: string;
  description?: string;
  is_announce: boolean;
}

export interface VideoContent {
  id: number;
  url: string;
  title: string;
  views: number;
  image?: ImageWithOptimized;
  comments: number;
  video_id: string;
  created_at: string;
  updated_at: string;
  is_announce: boolean;
}

export interface VideoWithOrigin extends VideoContent {
  origin: VideoOrigin;
}

// ============================================
// Teams
// ============================================

export interface TeamRole {
  id: string;
  title: string;
  color: string;
  sort_order: number;
}

export interface TeamUserAccount {
  id: number;
  nickname: string;
  avatar?: ImageWithOptimized;
}

export interface TeamUser {
  id: string;
  nickname: string;
  is_intern: boolean;
  sort_order: number;
  is_vacation: boolean;
}

export interface TeamUserFull extends TeamUser {
  team: Team;
  user: TeamUserAccount;
  roles: TeamRole[];
}

export interface Team {
  id: string;
  title: string;
  sort_order: number;
  description?: string;
}

// ============================================
// API Request/Response Types
// ============================================

// Query параметры
export interface IncludeExcludeParams {
  include?: string | string[];
  exclude?: string | string[];
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface CatalogFiltersParams extends PaginationParams, IncludeExcludeParams {
  types?: ReleaseType[];
  genres?: number[];
  years?: number[];
  seasons?: Season[];
  age_ratings?: AgeRating[];
  production_statuses?: CatalogProductionStatus[];
  publish_statuses?: CatalogPublishStatus[];
  sorting?: CatalogSorting;
}

export interface CollectionFiltersParams extends PaginationParams, IncludeExcludeParams {
  types?: ReleaseType[];
  genres?: number[];
  years?: number[];
  age_ratings?: AgeRating[];
  collection_type: UserCollectionType;
}

export interface FavoriteFiltersParams extends PaginationParams, IncludeExcludeParams {
  types?: ReleaseType[];
  genres?: number[];
  years?: number[];
  age_ratings?: AgeRating[];
  sorting?: UserFavoriteSorting;
}

// API Responses
export type CatalogReleasesResponse = PaginatedResponse<ReleaseWithGenres>;
export type CollectionReleasesResponse = PaginatedResponse<CollectionRelease>;
export type FavoriteReleasesResponse = PaginatedResponse<FavoriteRelease>;
export type ViewHistoryResponse = PaginatedResponse<ViewHistoryItem>;
export type TorrentsResponse = PaginatedResponse<TorrentWithRelease>;
export type GenreReleasesResponse = PaginatedResponse<Release>;

export type LatestReleasesResponse = ReleaseLatest[];
export type RandomReleasesResponse = Release[];
export type RecommendedReleasesResponse = Release[];
export type SearchReleasesResponse = Release[];

export type FranchisesResponse = Franchise[];
export type FranchiseResponse = FranchiseWithReleases;
export type RandomFranchisesResponse = Franchise[];
export type FranchisesByReleaseResponse = FranchiseWithReleases[];

export type GenresResponse = Genre[];
export type GenreResponse = Genre;

export type VastsResponse = AdVast[];

export type MediaPromotionsResponse = {
  data: MediaPromotion[];
};

export type MediaVideosResponse = {
  data: VideoWithOrigin[];
};

export type TeamsResponse = Team[];
export type TeamRolesResponse = TeamRole[];
export type TeamUsersResponse = TeamUserFull[];

export type CollectionIdsResponse = CollectionReleaseItem[];
export type FavoriteIdsResponse = FavoriteIdItem[];
export type ViewTimecodesResponse = ViewTimecodeItem[];

// HTTP статусы и ошибки
export interface ApiError {
  message?: string;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  status: number;
}