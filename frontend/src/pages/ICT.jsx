import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CopyRight from '../components/CopyRight';
import ContentHeader from '../components/ContentHeader';
import BannerContent from '../components/BannerContent';
import BEdit2 from '../assets/BEdit3.png';
import ICTmain from '../components/ICTmain';
import Card from '../components/Card';

export default function ICT() {
  return (
    <div className="mt-5 pt-5">
      <Navbar />
      <BannerContent
        image={BEdit2}
        breadcrumb="ICT Unit"
        title="ICT Unit"
        description="Welcome to the ICT Unit. Find more information about the unit, personnel and functions"
      />
      <ContentHeader title="ICT Unit" icon="bi bi-cpu text-secondary ms-2" />
      <section className="container mx-auto my-5">
        <ICTmain />
        <ContentHeader
          title="Personnel"
          icon="bi bi-people-fill text-secondary ms-2"
        />
        <div className="col-md-12">
          <div className="row justify-content-center">
            <div className="col-md-3">
              <Card
                name="Name"
                position="Head of Unit"
                image="./_filx/_visualx/img/departments/it/1.jpg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <CopyRight />
    </div>
  );
}
