import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { tracks } from '../data/tracks';
import DisplayTrack from './DisplayTrack';
import Controls from './Controls';
import ProgressBar from './ProgressBar';
import BarDisplay from './BarDisplay';

const AudioPlayer = () => {
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [audioData, setAudioData] = useState([]);

  //reference
  const audioRef = useRef();
  const progressBarRef = useRef();
  console.log(audioRef);

  const handleNext = () => {
    if (trackIndex >= tracks.length - 1) {
      setTrackIndex(0);
      setCurrentTrack(tracks[0]);
    } else {
      setTrackIndex((prev) => prev + 1);
      setCurrentTrack(tracks[trackIndex + 1]);
    }
  };

  useEffect(() => {
    const context = new AudioContext();
    const src = context.createMediaElementSource(audioRef.current);

    // Check if the media element already has a source node attached
    if (!audioRef.current.srcObject) {
      const analyser = context.createAnalyser();
      src.connect(analyser);
      analyser.connect(context.destination);
      analyser.fftSize = 256;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const draw = () => {
        requestAnimationFrame(draw);
        analyser.getByteFrequencyData(dataArray);
        setAudioData([...dataArray]);
      };

      draw();
    }

    return () => {
      context.close();
    };
  }, []);

  // useEffect(() => {
  //   const context = new AudioContext();
  //   const src = context.createMediaElementSource(audioRef.current);
  //   const analyser = context.createAnalyser();
  //   src.connect(analyser);
  //   analyser.connect(context.destination);
  //   analyser.fftSize = 256;

  //   const bufferLength = analyser.frequencyBinCount;
  //   const dataArray = new Uint8Array(bufferLength);

  //   const draw = () => {
  //     requestAnimationFrame(draw);
  //     analyser.getByteFrequencyData(dataArray);
  //     setAudioData([...dataArray]);
  //   };
  //   draw();
  // }, []);

  return (
    <>
      {/* <TopBar /> */}
      <div className='audio-player'>
        <div className='inner'>
          <DisplayTrack
            {...{
              currentTrack,
              audioRef,
              setDuration,
              progressBarRef,
              handleNext,
            }}
          />
          <Controls
            {...{
              audioRef,
              progressBarRef,
              duration,
              setTimeProgress,
              tracks,
              trackIndex,
              setTrackIndex,
              setCurrentTrack,
              handleNext,
            }}
          />
          <ProgressBar
            {...{ progressBarRef, audioRef, timeProgress, duration }}
          />
          <BarDisplay {...{ audioData }} />
        </div>
      </div>
    </>
  );
};
export default AudioPlayer;
