import Image from 'next/image';
import React from 'react';

const Opener = () => {
  return (
    <div className="absolute w-96 md:w-20 lg:w-80 bottom-[-0%] md:bottom-[-20%] lg:bottom-[-90%] left-[50%] md:left-[50%] z-20 -rotate-6">
      <Image
        src="/61cOpener.svg"
        alt="Flying Drone Ribbon"
        width={400}
        height={400}
        className="w-full h-full drop-shadow-xl"
      />
    </div>
  );
};

export default Opener;