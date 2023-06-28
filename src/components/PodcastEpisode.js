import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import styles from "../styles/podcast-episode.module.css";

const PodcastEpisode = () => {
  const params = useParams();
  const navigate = useNavigate();
  const podcastsdetails = useSelector((state) => state.podcastsdetails);

  // Get podcast and episode
  const selectedPodcast = podcastsdetails?.find(element => element.podcastId === params.podcastId);
  const selectedEpisode = selectedPodcast?.results?.find(element => element.trackId === parseInt(params.episodeId));

  // If no data for the episode, back to home
  useEffect(() => {
    if (!selectedEpisode) {
      // No episode, return to podcast-list
      navigate("/");
    }
  }, [selectedEpisode, navigate]);

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