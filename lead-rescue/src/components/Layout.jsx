import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[var(--lr-bg)] text-[var(--lr-text)]">
      <Sidebar />

      <div className="min-h-screen lg:pl-[264px]">
        <TopBar />

        <main className="mx-auto w-full max-w-[1540px] p-5 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;