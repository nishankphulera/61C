import Image from 'next/image';
import React from 'react';

const FlyingRibbon = () => {
  return (
    <div className="absolute w-96 md:w-20 lg:w-3xl bottom-[-0%] md:bottom-[-20%] lg:bottom-[-90%] left-[-20%] md:left-[5%] z-20 -rotate-6">
      <Image
        src="/Drone.svg"
        alt="Flying Drone Ribbon"
        width={800}
        height={800}
        className="w-full h-full drop-shadow-xl"
      />
    </div>
  );
};

export default FlyingRibbon;