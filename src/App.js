import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastList from './components/PodcastList';
import PodcastDetails from './components/PodcastDetails';
import PodcastDetailList from './components/PodcastDetailList';
import PodcastEpisode from './components/PodcastEpisode';
import Header from './components/Header';

const App = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route exact path="/" element={<PodcastList />} />
          <Route exact path="/podcast" element={<PodcastDetails />} >
            <Route exact path=":podcastId" element={<PodcastDetailList />} />
            <Route exact path=":podcastId/episode/:episodeId" element={<PodcastEpisode />} />
          </Route>
        </Routes>
      </main>
    </>
  );
};

export default App;
