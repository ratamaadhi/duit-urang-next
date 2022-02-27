import Navbar from "./Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import BottomNav from "./BottomNav";

function Layout({ children }) {
  const { authIsReady, user } = useAuthContext();
  return (
    <div className="relative antialiased max-w-md mx-auto h-full min-h-screen bg-violet-100 dark:bg-neutral-800 text-violet-900 dark:text-violet-300">
      {authIsReady && (
        <>
          <Navbar />
          <div className="px-4 mt-4 w-full h-full">{children}</div>
          {user && <BottomNav />}
        </>
      )}
    </div>
  );
}

export default Layout;
