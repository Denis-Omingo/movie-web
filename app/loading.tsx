'use client';

import Image from 'next/image';
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-background flex justify-center mt-16">
      <Image
        src="/loader.svg" 
        alt="loading..."
        width={100}
        height={100}
        priority
      />
    </div>
  );
};

export default LoadingSpinner;
