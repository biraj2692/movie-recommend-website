import publicClient from "../client/public.client";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`,
  listbygenre: ({ genreId }) => `${genreId}/listbygenre`
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const response = await publicClient.get(genreEndpoints.list({ mediaType }));

      return { response };
    } catch (err) { return { err }; }
  },
  getListByGenre: async ({ genreId }) => {
    try {
      console.log("getlistbygenre: id: "+genreId);
      console.log("get list by genre");
      const response = await publicClient.get(genreEndpoints.listbygenre({ genreId }));

      return { response };
    } catch (err) { return { err }; }
  }
};

export default genreApi;