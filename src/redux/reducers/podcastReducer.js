import {
  FETCH_PODCASTS_REQUEST,
  FETCH_PODCASTS_SUCCESS,
  FETCH_PODCASTS_FAILURE,
  FETCH_PODCASTS_DETAILS_REQUEST,
  FETCH_PODCASTS_DETAILS_SUCCESS,
  FETCH_PODCASTS_DETAILS_FAILURE,
} from '../actions/podcastActions';

const initialState = {
  podcasts: [],
  dateFetch: '',
  loading: false,
  error: null,
  errorDetails: null,
  podcastsdetails: [],
};

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
    case FETCH_PODCASTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_PODCASTS_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
        errorDetails: null,
      };
    case FETCH_PODCASTS_DETAILS_SUCCESS:
      return {
        ...state,
        podcastsdetails: [
          ...state.podcastsdetails,
          {...action.payload, index: action.payload.podcastId},
        ],
        loading: false,
        errorDetails: null,
      };
    case FETCH_PODCASTS_DETAILS_FAILURE:
      return {
        ...state,
        loading: false,
        errorDetails: action.payload,
      };
    default:
      return state;
  }
};

export default podcastReducer;
