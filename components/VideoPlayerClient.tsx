'use client';

import dynamic from 'next/dynamic';
import type { VideoPlayerProps } from './VideoPlayer';

const DynamicVideoPlayer = dynamic(() => import('./VideoPlayer'), { ssr: false });

export default function VideoPlayerClient(props: VideoPlayerProps) {
  return <DynamicVideoPlayer {...props} />;
}
