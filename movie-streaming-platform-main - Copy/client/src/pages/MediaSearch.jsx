import { LoadingButton } from "@mui/lab";
import { Box, Button, Stack, TextField, Toolbar, Grid } from "@mui/material";
import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import mediaApi from "../api/modules/media.api";
import MediaGrid from "../components/common/MediaGrid";
import uiConfigs from "../configs/ui.configs";
import genreApi from "../api/modules/genre.api";
import { alignProperty } from "@mui/material/styles/cssUtils";
// import mediaApi from "../../api/modules/media.api";
// import { useDispatch } from "react-redux";
// import { setGlobalLoading } from "../../redux/features/globalLoadingSlice";
const mediaTypes = ["movie", "tv", "people", "genre"];
let timer;
const timeout = 500;

const MediaSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  // const [movies, setMovies] = useState([]);
  // const dispatch = useDispatch();
  useEffect(() => {
    // const getMedias = async () => {
    //   const { response, err } = await mediaApi.getList({
    //     mediaType,
    //     mediaCategory,
    //     page: 1
    //   });

    //   if (response) setMovies(response.results);
    //   if (err) toast.error(err.message);
    //   dispatch(setGlobalLoading(false));
    // };

    const getGenres = async () => {
      // dispatch(setGlobalLoading(true));
      // setMediaType("movie");
      const { response, err } = await genreApi.getList({ mediaType });

      if (response) {
        console.log("genres:" + response.genres);
        for (const [key, value] of Object.entries(response)) {
          console.log(`Key: ${key}, Value: ${value}`);
        }
        setGenres(response.genres);
        // getMedias();
      }
      if (err) {
        console.log("genre error");
        toast.error(err.message);
        // setGlobalLoading(false);
      }
    };

    getGenres();
  }, [mediaType]);
  const search = useCallback(
    async () => {
      setOnSearch(true);

      const { response, err } = await mediaApi.search({
        mediaType,
        query,
        page
      });

      setOnSearch(false);

      if (err) toast.error(err.message);
      if (response) {
        if (page > 1) setMedias(m => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    },
    [mediaType, query, page],
  );

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [search, query, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);


  const onCategoryChange = (selectedCategory) => setMediaType(selectedCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  


  // const handleGenreClick = (genreId, genreName) => {
  //   // Do something with genreId and genreName
  //   console.log(`Clicked genre: ${genreName} (ID: ${genreId})`);
  //   async()=>{
  //   const { response, err } = await genreApi.getListByGenre({ genreId });
  //   console.log(response);
  //   }
  //   // Call your function here with genreId and genreName as arguments
  // };

  const handleGenreClick = async (genreId, genreName) => {
    // dispatch(setGlobalLoading(true));
    // setMediaType("movie");
    console.log(`Clicked genre: ${genreName} (ID: ${genreId})`);
    const { response, err } = await genreApi.getListByGenre({ genreId });

    if (response) {
      console.log("genres" +response);
      for (const [key, value] of Object.entries(response)) {
      console.log(`Key: ${key}, Value: ${value}`);
    }
      // setGenres(response.genres);
      // getMedias();
    }
    if (err) {
      console.log("genre error");
      toast.error(err.message);
      // setGlobalLoading(false);
    }
  };


  return (
    <>
      <Toolbar />
      <Box sx={{ ...uiConfigs.style.mainContent }}>
        <Stack spacing={2}>
          <Stack
            spacing={2}
            direction="row"
            justifyContent="center"
            sx={{ width: "100%" }}
          >
            {mediaTypes.map((item, index) => (
              <Button
                size="large"
                key={index}
                variant={mediaType === item ? "contained" : "text"}
                sx={{
                  color: mediaType === item ? "primary.contrastText" : "text.primary"
                }}
                onClick={() => onCategoryChange(item)}
              >
                {item}
              </Button>
            ))}
          </Stack>
          {mediaType != "genre" &&
            <TextField
              color="success"
              placeholder="Search EasyWatch"
              sx={{ width: "100%" }}
              autoFocus
              onChange={onQueryChange}
            />
          }
          {/* {mediaType == "genre" &&
            <div>
              <h2>List of Genres:</h2>
              <ul>
                {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          } */}
          {/* {mediaType === "genre" && (
            <div>
              <h2>List of Genres:</h2>
              <Stack spacing={1}>
                {genres.map(genre => (
                  <Box key={genre.id}>
                    <Button
                      variant="outlined"
                      onClick={() => handleGenreClick(genre.id, genre.name)}
                    >
                      {genre.name}
                    </Button>
                  </Box>
                ))}
              </Stack>
            </div>
          )} */}
          {/* {mediaType === "genre" && (
            <div>
              <h2 style={{ textAlign: "center" }}>List of Genres:</h2>
              <Grid container spacing={1}>
                {genres.map(genre => (
                  <Grid item key={genre.id} xs={6} sm={4} md={3}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleGenreClick(genre.id, genre.name)}
                    >
                      {genre.name}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </div>
          )} */}

          <MediaGrid medias={medias} mediaType={mediaType} />

          {medias.length > 0 && (
            <LoadingButton
              loading={onSearch}
              onClick={() => setPage(page + 1)}
            >
              load more
            </LoadingButton>
          )}
        </Stack>
      </Box>
    </>
  );
};

export default MediaSearch;