import BMenu from "../components/feeds/bottomMenu";
import Header from "../components/header";
import Report from "../components/reportProblem/report";
import LSidebar from "../components/sidebar/leftSidbar";

function ReportProblem() {
  return (
    <>
      <Header />
      <LSidebar />
      <Report />
      <BMenu />
    </>
  );
}
export default ReportProblem;
