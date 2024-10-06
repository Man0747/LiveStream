import React from 'react';
import ReactPlayer from 'react-player';

function VideoPlayer({ url, overlays }) {
  return (
    <div className="relative">
      <ReactPlayer
        url={url}
        controls
        width="100%"
        height="auto"
        config={{
          file: {
            forceHLS: true,
            hlsOptions: {
              debug: false,
              enableWorker: true,
              lowLatencyMode: true,
            },
          },
        }}
      />
      {overlays.map((overlay, index) => (
        <div
          key={overlay._id}
          className="absolute"
          style={{
            top: `${overlay.y}px`,
            left: `${overlay.x}px`,
            fontSize: `${overlay.fontSize}px`,
            color: overlay.color,
            backgroundColor: overlay.backgroundColor,
            opacity: overlay.opacity,
            padding: '5px',
            borderRadius: '3px',
          }}
        >
          {overlay.content}
        </div>
      ))}
    </div>
  );
}

export default VideoPlayer;