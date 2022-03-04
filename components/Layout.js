import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import BottomNav from "./BottomNav";

function Layout({ children }) {
  const { authIsReady, user } = useAuthContext();
  return (
    <>
      <div className="relative antialiased w-md max-w-md mx-auto min-h-full h-screen bg-violet-100 dark:bg-neutral-800 text-violet-900 dark:text-violet-300 font-poppins overflow-y-scroll">
        {authIsReady && (
          <>
            <Navbar />
            <div className="relative z-0 p-4 w-full h-auto bg-violet-100 dark:bg-neutral-800">
              {children}
            </div>
            {user && <BottomNav />}
          </>
        )}
      </div>
    </>
  );
}

export default Layout;
