import { redirect } from 'next/navigation';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  // Serve German content by default at root level
  return (
    <div>
      <Navigation locale="de" />
      <HeroSection locale="de" />
    </div>
  );
}
