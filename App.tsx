
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import ThumbnailMaker from './components/ThumbnailMaker';
import ImageGenerator from './components/ImageGenerator';
import PhotoEnhancer from './components/PhotoEnhancer';
import VideoGenerator from './components/VideoGenerator';
import ImageEditor from './components/ImageEditor';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/thumbnail" element={<ThumbnailMaker />} />
          <Route path="/generate" element={<ImageGenerator />} />
          <Route path="/enhance" element={<PhotoEnhancer />} />
          <Route path="/video" element={<VideoGenerator />} />
          <Route path="/edit" element={<ImageEditor />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
