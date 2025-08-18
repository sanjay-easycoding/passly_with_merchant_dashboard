import HeroSection from '@/components/HeroSection';
import Navigation from '@/components/Navigation';

export default function HomePage() {
  // Serve German content by default at root level
  return (
    <div>
      <Navigation locale="de" />
      <HeroSection locale="de" />
    </div>
  );
}
