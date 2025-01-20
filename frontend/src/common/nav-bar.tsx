import MobileNavbarDrawer from "./mobile-nav";
import { NavItems } from "./nav-icons";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";

export const NavBar = () => {
  const user = null;

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full py-5">
        <div className="p-2 flex gap-2 items-center">
          <a href="/">
            <Logo />
          </a>
          <div className="ml-auto items-center">
            <Button
              onClick={() =>
                (location.href = `${
                  import.meta.env.VITE_BACKEND_URL
                }/auth/github`)
              }
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 w-full py-5">
      <div className="p-2 flex gap-2 items-center">
        <span className="md:hidden ml-2">
          <MobileNavbarDrawer />
        </span>
        <a href="/">
          <Logo />
        </a>
        <NavItems />
        <div className="ml-auto flex items-center"></div>
        <span>
          <Button>Sign Out</Button>
        </span>
      </div>
    </div>
  );
};
