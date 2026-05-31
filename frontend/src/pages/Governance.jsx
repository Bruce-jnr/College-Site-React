import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import GovernanceMain from '../components/GovernanceMain';

export default function Governance() {
  return (
    <div className="px-0 mt-5 pt-5">
      <Navbar />
      <ContentHeader
        title="Governance"
        icon="bi bi-boxes text-secondary ms-2"
      />
      <GovernanceMain />
      <Footer />
      <CopyRight />
    </div>
  );
}
