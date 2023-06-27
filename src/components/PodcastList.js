import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPodcasts } from '../redux/actions/podcastActions';
import { TextField } from "@mui/material";
import PodcastCard from './PodcastCard';
import styles from '../styles/podcast-list.module.css';

const PodcastList = () => {
  const dispatch = useDispatch();
  const podcasts = useSelector((state) => state.podcasts);
  const dateFetch = useSelector((state) => state.dateFetch);
  console.log(podcasts);
  const loading = useSelector((state) => state.loading);
  const [searchTerm, setSearchTerm] = useState("");

/**
 * Calculate the number of days between two dates.
 */
const getDaysOld = (dateIni, dateEnd) => {
  const diff = dateIni.getTime() - dateEnd.getTime();
  const dayDiff = Math.abs(diff) / (1000 * 60 * 60 * 24);
  return dayDiff;
};

  /**
   * Launchs the filtering search term
   */
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  /**
   * Returns found podcasts
   */
  const filterPodcasts = (podcastList, searchTerm) => {
    if (!podcastList) {
      return [];
    }
    return podcastList.filter(
      (podcast) =>
        podcast['im:name'].label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast['im:artist'].label.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredPodcasts = filterPodcasts(podcasts, searchTerm);

  /**
   * Check podcast length and fetch in order to reload if date have more than 1 day old 
   */
  useEffect(() => {
    if (podcasts.length > 0 && getDaysOld(new Date(), dateFetch) > 1 ) {
      dispatch(fetchPodcasts());
    } else if (podcasts.length === 0) {
      dispatch(fetchPodcasts());
    } 
  }, [dispatch, podcasts, dateFetch]);

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchResults}>{filteredPodcasts.length}</div>
        <TextField
          id="search-input"
          label="Filter podcasts..."
          variant="outlined"
          size="small"
          type="text"
          placeholder="Filter podcasts..."
          value={searchTerm}
          color="primary"
          onChange={handleSearch}
        />
      </div>
      {(!loading && filteredPodcasts.length === 0) && <p>No results found...</p>}
      {loading ? (
        <p>Loading podcasts...</p>
      ) : (
        <div className={styles.podcastContainer}>
          {filteredPodcasts.map((podcast) => (
            <div key={podcast.id.attributes['im:id']}>
              <Link to={`/podcast/${podcast.id.attributes['im:id']}`}><PodcastCard podcast={podcast}></PodcastCard></Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default PodcastList;
