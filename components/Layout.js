import Navbar from "./Navbar";

function Layout({children}) {
  return (
    <div className="antialiased max-w-md mx-auto min-h-screen bg-violet-100 dark:bg-neutral-900 text-violet-900 dark:text-violet-500">
      <Navbar/>
      <div className="px-4 mt-4">
        {children}
      </div>
    </div>
  );
}

export default Layout;
