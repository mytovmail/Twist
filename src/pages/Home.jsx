import React from 'react';
import HeroSection from '../components/home/HeroSection';
import SectionsPreview from '../components/home/SectionsPreview';
import LatestIssue from '../components/home/LatestIssue';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <SectionsPreview />
      <LatestIssue />
    </div>
  );
}