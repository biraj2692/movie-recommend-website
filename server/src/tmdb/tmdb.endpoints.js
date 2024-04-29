import tmdbConfig from "./tmdb.config.js";

const tmdbEndpoints = {
  mediaList: ({ mediaType, mediaCategory, page }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaCategory}`, { page }
  ),
  mediaListByGenre: ({ mediaType,page }) => tmdbConfig.getUrl(
    `discover/movie`, { include_adult:false,include_video:false,language:`en-US`,page,sort_by:`popularity.desc`,with_genres:mediaType }
  ),
  mediaDetail: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}`
  ),
  mediaGenres: ({ mediaType }) => tmdbConfig.getUrl(
    `genre/${mediaType}/list`
  ),
  mediaCredits: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/credits`
  ),
  mediaVideos: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/videos`
  ),
  mediaRecommend: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/recommendations`
  ),
  mediaImages: ({ mediaType, mediaId }) => tmdbConfig.getUrl(
    `${mediaType}/${mediaId}/images`
  ),
  mediaSearch: ({ mediaType, query, page }) => tmdbConfig.getUrl(
    `search/${mediaType}`, { query, page }
  ),
  personDetail: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}`
  ),
  personMedias: ({ personId }) => tmdbConfig.getUrl(
    `person/${personId}/combined_credits`
  ),
};

export default tmdbEndpoints;