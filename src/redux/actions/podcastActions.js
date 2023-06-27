import axios from 'axios';

export const FETCH_PODCASTS_REQUEST = 'FETCH_PODCASTS_REQUEST';
export const FETCH_PODCASTS_SUCCESS = 'FETCH_PODCASTS_SUCCESS';
export const FETCH_PODCASTS_FAILURE = 'FETCH_PODCASTS_FAILURE';

export const fetchPodcasts = () => {
  console.log("fetchPodcasts");
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PODCASTS_REQUEST });

      // Completar: Lógica para obtener los 100 podcasts más populares desde el servicio externo.
      const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      console.log("response");
      // Quitar luego el timeout
      setTimeout(function(){
        const podcasts = response.data.feed.entry;
        console.log("Hola Mundo");
        dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: podcasts });
    }, 2000);

    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error.message });
    }
  };
};

export const fetchPodcastsDetail = () => {
  console.log("fetchPodcastsDetail");
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PODCASTS_REQUEST });

      // Completar: Lógica para obtener los 100 podcasts más populares desde el servicio externo.
      const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      console.log("response");
      // Quitar luego el timeout
      setTimeout(function(){
        const podcasts = response.data.feed.entry;
        console.log("Hola Mundo");
        dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: podcasts });
    }, 2000);

    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error.message });
    }
  };
};
