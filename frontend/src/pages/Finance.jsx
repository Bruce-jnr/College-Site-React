import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BannerContent from '../components/BannerContent';
import ContentHeader from '../components/ContentHeader';
import CopyRight from '../components/CopyRight';
import FinanceMain from '../components/FinanceMain';
import Card from '../components/Card';

export default function Finance() {
  return (
    <div className="mt-5 ">
      <Navbar />
      <BannerContent
        title="Finance"
        breadcrumb="Home / Finance"
        description="Welcome to the Finance Unit. Find more information about the unit, personnel and functions"
      />
      <ContentHeader title="Finance" icon="bi bi-cash-coin" />
      <div className="container">
        <FinanceMain />
        <ContentHeader title="Personnel" icon="bi bi-people-fill" />
        <div className="col-md-12">
          <div className="row justify-content-center">
            <div className="col-md-5">
              <Card
                image="./_filx/_visualx/img/departments/finance/2.jpg"
                position="Senior Accountant"
                name="Name"
              />
            </div>
            <div className="col-md-5">
              <Card
                image="./_filx/_visualx/img/departments/finance/3.jpg"
                position="Accountant"
                name="Name"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <CopyRight />
    </div>
  );
}
