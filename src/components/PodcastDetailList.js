import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from '../styles/podcast-detail-list.module.css';
import Table from '../components/Table';

const PodcastDetailList = () => {
  const navigate = useNavigate();
  const podcasts = useSelector((state) => state.podcasts);
  const podcastsdetails = useSelector((state) => state.podcastsdetails);  
  const params = useParams();

  // Redirect to home if no parms or data
  if (!params.podcastId || podcasts.length === 0 ) {
    navigate("/");
  }

  const selectedPodcast = podcastsdetails?.find(element => element.podcastId === params.podcastId);
  
  return (
    <>
      {selectedPodcast?.results && (
        <>
          <div className={styles.card}>
            <h2 className={styles.title}>
              Episodes: {selectedPodcast.resultCount - 1}
            </h2>
          </div>
          <div className={styles.card}>
            <Table
              headers={["Title", "Date", "Duration"]}
              items={selectedPodcast.results}
            ></Table>
          </div>
        </>
      )}
    </>
  );
};

export default PodcastDetailList;