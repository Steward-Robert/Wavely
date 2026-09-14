import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import Profil from "../components/my-account/profile";
import LSidebar from "../components/sidebar/leftSidbar";

function ProfilAcc() {
  return (
    <>
      <Header />
      <LSidebar />
      <Profil />
      <BMenu />
    </>
  );
}

export default ProfilAcc;
