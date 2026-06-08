import React from 'react';
import RomanticScene from '@/components/RomanticScene';
import UIControls from '@/components/UIControls';

export default function Home() {
  return (
    <main style={{width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', backgroundColor: '#0a0519'}}>
      <RomanticScene />
      <UIControls />
    </main>
  );
}
