import React from 'react';

const DisplayTrack = ({ currentTrack, audioRef }) => {
  return (
    <div>
      <audio src={currentTrack.src} ref={audioRef} />
    </div>
  );
};

export default DisplayTrack;
