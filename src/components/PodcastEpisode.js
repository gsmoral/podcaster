import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { fetchPodcastsDetail } from '../redux/actions/podcastActions';
import styles from "../styles/podcast-episode.module.css";

const PodcastEpisode = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const podcastsdetails = useSelector((state) => state.podcastsdetails);

  // Get podcast and episode
  const selectedPodcast = podcastsdetails?.find(element => element.podcastId === params.podcastId);
  const selectedEpisode = selectedPodcast?.results?.find(element => element.trackId === parseInt(params.episodeId));

  useEffect(() => {
    // If no data for the episode, reload data
    if (!podcastsdetails && params.podcastId && params.episodeId) {
      dispatch(fetchPodcastsDetail(params.podcastId));
    }
  }, [dispatch, podcastsdetails, params]);

  /**
   * Parse episode description as HTML.
   */
  function parseDescription() {
    return { __html: selectedEpisode.description };
  }

  return (
    <>
      {selectedEpisode && (
        <div className={styles.card}>
          <h2 className={styles.title}>{selectedEpisode.name}</h2>
          <div
            className={styles.description}
            dangerouslySetInnerHTML={parseDescription()}
          ></div>

          <div>
            <audio className={styles.audio} controls>
              <source src={selectedEpisode.episodeUrl} />
            </audio>
          </div>
        </div>
      )}
    </>
  );
}

export default PodcastEpisode;