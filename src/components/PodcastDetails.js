import React, { useEffect } from 'react';
import { Outlet, useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPodcastsDetail, fetchPodcasts } from '../redux/actions/podcastActions';
import PodcastDetailCard from './PodcastDetailCard';
import styles from '../styles/podcast-details.module.css';

const PodcastDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const podcasts = useSelector((state) => state.podcasts);
  const podcastsdetails = useSelector((state) => state.podcastsdetails);
  const params = useParams();

  /**
   * Calculate the number of days between two dates.
   */
  const getDaysOld = (dateIni, dateEnd) => {
    const diff = dateIni.getTime() - dateEnd.getTime();
    const dayDiff = Math.abs(diff) / (1000 * 60 * 60 * 24);
    return dayDiff;
  };

  useEffect(() => {
    // Redirect to home if no parms or data
    if (!params.podcastId) { 
      navigate("/");
      return;
    }

    // Reload data
    if (params.podcastId && podcasts.length === 0) {
      dispatch(fetchPodcasts());
    }

    // Create a cancel signal in order to cancel request if component unmounted
    const controller = new AbortController();
    let sendDispach = false;

    // Search in store the podcastdetails or if date have more than 1 day old
    if (podcastsdetails.length > 0) {
      const found = podcastsdetails.find(element => element.podcastId === params.podcastId);
      if (!found || getDaysOld(new Date(), found.dateFetch) > 1) {
        dispatch(fetchPodcastsDetail(params.podcastId, controller.signal));
        sendDispach = true;
      }
    } else {
      dispatch(fetchPodcastsDetail(params.podcastId, controller.signal));
      sendDispach = true;
    }

    return () => {
      // Cancel request when component unmounted
      if (sendDispach) {
        controller.abort();
      }
    };

  }, [dispatch, navigate, params, podcastsdetails, podcasts]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <PodcastDetailCard />
      </div>
      <div className={styles.outlet}>
        <Outlet />
      </div>
    </div>
  );
};

export default PodcastDetails;