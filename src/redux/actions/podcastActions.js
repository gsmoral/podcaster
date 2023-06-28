import axios from 'axios';

export const FETCH_PODCASTS_REQUEST = 'FETCH_PODCASTS_REQUEST';
export const FETCH_PODCASTS_SUCCESS = 'FETCH_PODCASTS_SUCCESS';
export const FETCH_PODCASTS_DETAILS_SUCCESS = 'FETCH_PODCASTS_DETAILS_SUCCESS';
export const FETCH_PODCASTS_FAILURE = 'FETCH_PODCASTS_FAILURE';

export const fetchPodcasts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PODCASTS_REQUEST });

      // Get 100 podcast
      const response = await axios.get('https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json');
      const podcasts = response.data.feed.entry;
      // Quitar luego el timeout
      setTimeout(function(){
        console.log("Hola Mundo");
        dispatch({ type: FETCH_PODCASTS_SUCCESS, payload: podcasts });
    }, 2000);

    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error.message });
    }
  };
};

export const fetchPodcastsDetail = (podcastId, signal) => {
  return async (dispatch) => {
    try {
      dispatch({ type: FETCH_PODCASTS_REQUEST });

      // Create url to get details
      const corsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode&limit=1000`)}`;

      // Send get action with signal in order to cancel is component unmounted before finish get
      const response = await axios.get(corsUrl, {signal, mode: 'no-cors'});
      const responseJSON = JSON.parse(response.data.contents);

      const podcastdetails = {
        podcastId: podcastId,
        dateFetch: new Date(),
        resultCount: responseJSON.resultCount,
        results: responseJSON.results,

      };

      dispatch({ type: FETCH_PODCASTS_DETAILS_SUCCESS, payload: podcastdetails });

    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PODCASTS_FAILURE, payload: error.message });
    }
  };
};
