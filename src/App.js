import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PodcastList from './components/PodcastList';
import PodcastDetails from './components/PodcastDetails';
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
          <Route exact path="/podcast/:podcastId" element={<PodcastDetails />} />
          {/* <Route exact path="/podcast/:podcastId/episode/:episodeId" element={EpisodeDetails} /> */}
        </Routes>
      </main>
    </>
  );
};

export default App;
