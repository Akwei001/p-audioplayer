import React from 'react';
import { useRef, useEffect } from 'react';

const BarDisplay = ({ audioData }) => {
  const canvasRef = useRef();
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.clearRect(0, 0, canvas.width, canvas.height);

    const barWidth = canvas.width / audioData.length;

    audioData.forEach((item, index) => {
      const barHeight = item / 2;
      const x = barWidth * index;
      const y = canvas.height - barHeight;

      context.fillStyle = `rgb(${barHeight}, 0, 0)`;
      context.fillRect(x, y, barWidth, barHeight);
    });
  }, [audioData]);

  return <canvas ref={canvasRef} width={600} height={100} />;
};

export default BarDisplay;
