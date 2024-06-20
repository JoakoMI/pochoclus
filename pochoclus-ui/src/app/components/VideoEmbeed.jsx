// src/components/VideoEmbed.jsx

import React from 'react';

function getEmbedUrl(videoUrl) {
  let videoId = videoUrl.split("v=")[1];
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function VideoEmbed({ videoUrl }) {
  const embedUrl = getEmbedUrl(videoUrl);

  return (
    <div style={containerStyle}>
      <iframe
        title="YouTube video player"
        src={embedUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={iframeStyle}
      ></iframe>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '10px',
  boxSizing: 'border-box',
};

const iframeStyle = {
  width: '85%',
  height: '70vh',
  maxWidth: '1200px', // optional max-width for large screens
};