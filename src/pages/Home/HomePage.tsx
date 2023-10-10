import { FooterComponent } from '../../components/Footer/FooterComponent';
import { HomeDesktopPage } from './HomeDesktopPage';
import { HomeMobilePage } from './HomeMobilePage';

export function HomePage() {
  return (
    <>
      <HomeMobilePage />
      <HomeDesktopPage />
      <FooterComponent />
    </>
  );
}
