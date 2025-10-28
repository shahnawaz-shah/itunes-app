// import axios to use for http requests
const axios = require("axios");

// preconfigured axios instance for itunes url
const http = axios.create({
  baseURL: "https://itunes.apple.com",
  timeout: 8000, //if no response after 8 secs, timeout error
});

// map media options to itunes api values
const MEDIA_MAP = {
  movie: "movie",
  podcast: "podcast",
  music: "music",
  audiobook: "audiobook",
  "short film": "shortFilm",
  shortfilm: "shortFilm",
  "tv show": "tvShow",
  tvshow: "tvShow",
  software: "software",
  ebook: "ebook",
  all: null, //null means do not include media param
};

/**
 * convert a potentially messy user input into a valid iTunes `media` value
 * returns `null` if no mapping exists or input is empty
 */
function normaliseMedia(v) {
  if (!v) return null;
  const key = String(v).trim().toLowerCase().replace(/\s+/g, " ");
  return Object.prototype.hasOwnProperty.call(MEDIA_MAP, key)
    ? MEDIA_MAP[key]
    : null;
}

// clamp limit to a safe range for itunes api - max 50, default 25
function clampLimit(n, max = 50, def = 25) {
  const val = parseInt(n, 10);
  if (!Number.isFinite(val)) return def;
  return Math.max(1, Math.min(val, max));
}

// itunes search proxy
async function search(options) {
  const term = String(options.term || "").trim();
  if (!term) throw new Error("Term required.");

  const limit = clampLimit(options.limit);
  const media = normaliseMedia(options.media);
  const country = (options.country || "GB").toUpperCase();

  // build query params - only include media when not null
  const params = { term, limit, country };
  if (media) params.media = media;

  try {
    const { data } = await http.get("/search", { params });
    return { items: data.results || [], count: data.resultCount || 0 };
  } catch (err) {
    if (err.code === "ECONNABORTED") throw err;
    const e = new Error("ITUNES_UPSTREAM_ERROR"); //generic upstream failure
    e.cause = err;
    throw e;
  }
}

// album focused search
async function searchAlbums(options) {
  const term = String(options.term || "").trim();
  if (!term) throw new Error("Term required");

  const limit = clampLimit(options.limit);
  const country = (options.country || "GB").toUpperCase();

  // itunes query specifically targetting albums (collections) in music catalogue
  const params = {
    term,
    media: "music",
    entity: "album",
    limit,
    country,
  };

  try {
    const { data } = await http.get("/search", { params });

    // trim raw itunes fields
    const items = (data.results || []).map((r) => ({
      albumName: r.collectionName,
      artistName: r.artistName,
      artworkUrl: r.artworkUrl100 || r.artworkUrl160,
      releaseDate: r.releaseDate,
      collectionId: r.collectionId,
      collectionViewUrl: r.collectionViewUrl || null,
    }));

    return { items, count: items.length };
  } catch (err) {
    if (err.code === "ECONNABORTED") throw err; //route maps to 504
    const e = new Error("ITUNES_UPSTREAM_ERROR");
    e.cause = err;
    throw e; //route maps to 502
  }
}

// export helpers and the two service functions so routes can compose them
module.exports = {
  normaliseMedia,
  search,
  searchAlbums,
};
