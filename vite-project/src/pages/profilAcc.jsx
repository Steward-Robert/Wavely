import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import Profil from "../components/my-account/profile";
import LSidebar from "../components/sidebar/leftSidbar";

function ProfilAcc() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#08090e] text-white">
      <div className="fixed inset-x-0 top-0 z-50">
        <Header />
      </div>
      <LSidebar />
      <Profil />
      <BMenu />
    </div>
  );
}

export default ProfilAcc;
