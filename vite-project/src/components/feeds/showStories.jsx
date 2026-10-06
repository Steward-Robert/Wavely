import Header from "../header";
import Stories from "./strories.jsx";

function ShowStories({ alluser = [] }) {
  return (
    <main className="min-h-screen bg-[#08090e]">
      <Header />
      <div className="mx-auto max-w-7xl px-4 py-8">
        <Stories alluser={alluser} />
      </div>
    </main>
  );
}

export default ShowStories;
