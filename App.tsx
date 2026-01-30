
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.tsx';
import Home from './components/Home.tsx';
import ThumbnailMaker from './components/ThumbnailMaker.tsx';
import ImageGenerator from './components/ImageGenerator.tsx';
import PhotoEnhancer from './components/PhotoEnhancer.tsx';
import VideoGenerator from './components/VideoGenerator.tsx';
import ImageEditor from './components/ImageEditor.tsx';

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
