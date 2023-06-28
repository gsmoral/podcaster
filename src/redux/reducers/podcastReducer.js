import {
  FETCH_PODCASTS_REQUEST,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_DETAILS_SUCCESS,
  FETCH_PODCASTS_FAILURE,
} from '../actions/podcastActions';

const initialState = {
  podcasts: [],
  dateFetch: '',
  loading: false,
  error: null,
  podcastsdetails: [],
};

console.log(initialState)

const podcastReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PODCASTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_PODCASTS_SUCCESS:
      return {
        ...state,
        podcasts: action.payload,
        dateFetch: new Date(),
        loading: false,
        error: null,
      };
    case FETCH_PODCASTS_DETAILS_SUCCESS:
      return {
        ...state,
        podcastsdetails: [
          ...state.podcastsdetails,
          {...action.payload, index: action.payload.podcastId},
        ],
        loading: false,
        error: null,
      };
    case FETCH_PODCASTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default podcastReducer;
