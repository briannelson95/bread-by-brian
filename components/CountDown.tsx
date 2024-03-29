"use client"

import React, { useEffect, useState } from 'react';

const CountDown = ({ data }: any) => {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const [windowSize, setWindowSize] = useState(0);

  useEffect(() => {
    // Check if window is defined before using it
    if (typeof window !== 'undefined') {
      setWindowSize(window.innerWidth);

      const handleResize = () => {
        setWindowSize(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (!data) {
      return;
    }

    // Check if window is defined before using it
    if (typeof window !== 'undefined') {
      const targetTime = new Date(data).getTime();

      const interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeDifference = targetTime - currentTime;

        if (timeDifference > 0) {
          const days = String(Math.floor(timeDifference / (1000 * 60 * 60 * 24))).padStart(2, '0');
          const hours = String(Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0');
          const minutes = String(Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
          const seconds = String(Math.floor((timeDifference % (1000 * 60)) / 1000)).padStart(2, '0');

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          clearInterval(interval);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data]);

  const timeComponents = [
    { label: 'D', value: timeLeft.days },
    { label: 'H', value: timeLeft.hours },
    { label: 'M', value: timeLeft.minutes },
    { label: 'S', value: timeLeft.seconds },
  ];

  return (
    <div className='flex gap-2 md:gap-3'>
      {timeComponents.map((component) => (
        <div key={component.label}>
          <div className='relative h-10 w-10 md:h-16 md:w-16'>
            <div className='bg-pink-800 bg-count-dark-desaturated-blue/50 absolute top-0 w-full h-1/2 rounded md:rounded-md shadow-md' />
            <div className='bg-pink-700 bg-count-dark-desaturated-blue absolute bottom-0 w-full h-1/2 rounded md:rounded-md shadow-md' />
            <p className=' text-pink-50 text-count-soft-red text-2xl md:text-3xl text-center absolute flex justify-center items-center w-full h-full'>
              {component.value}
            </p>
          </div>
          <p className='tracking-widest text-xs font-thin text-count-gray-blue uppercase text-center'>
            {component.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountDown;
