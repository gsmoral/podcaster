import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/podcast-detail-card.module.css';

const PodcastDetailCard = () => {
  const navigate = useNavigate();
  const podcasts = useSelector((state) => state.podcasts);
  const podcastsdetails = useSelector((state) => state.podcastsdetails);
  const params = useParams();

  // Redirect to home if no parms
  if (!params.podcastId) {
    navigate("/");
  }

  // Find selected podcast
  const selectedPodcast = podcasts?.find(element => element.id.attributes['im:id'] === params.podcastId);

  useEffect(() => {
    // If empty data, return to podcast list
    if (podcasts.length < 0 || podcastsdetails.length < 0) {
      navigate("/");
    } 
  }, [podcasts, podcastsdetails, navigate]);

  return (
    <div className={styles.card}>
      <div to={`./${params.podcastId}`} className={styles.details}>
        {selectedPodcast && (
          <>
            <Link to={`./${params.podcastId}`} className={styles.detailsSection}>
              <img
                src={selectedPodcast['im:image'][2]?.label ? selectedPodcast['im:image'][2].label : "podcast_icon.png"}
                alt={selectedPodcast['im:name'].label ? selectedPodcast['im:name'].label : "Artist image"}
                loading="lazy"
              />
            </Link>
            <Link
              to={`./${params.podcastId}`}
              className={
                styles.detailsSection + " " + styles.textSection
              }
            >
              <div className={styles.title}>{selectedPodcast['im:name'].label}</div>
              <div className={styles.author}>
                by: {selectedPodcast['im:artist'].label}
              </div>
            </Link>
            <div
              className={
                styles.detailsSection + " " + styles.textSection
              }
            >
              <div className={styles.descriptionTitle}>
                Description:
              </div>
              <div className={styles.description}>
                {selectedPodcast.summary.label}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PodcastDetailCard;