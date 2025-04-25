import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  const NavLinks = () => (
    <>
      <Link
        to="/"
        className="text-gray-600 hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Home
      </Link>
      <Link
        to="/dashboard"
        className="text-gray-600 hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Dashboard
      </Link>
      <Link
        to="/generator"
        className="text-gray-600 hover:text-primary transition-colors"
        onClick={() => setIsOpen(false)}
      >
        Create Portfolio
      </Link>
      <Button
        variant="outline"
        onClick={handleLogout}
        className="border-gray-300 text-gray-700"
      >
        Logout
      </Button>
    </>
  );

  const LoginButton = () => (
    <Link to="/login">
      <Button variant="outline" className="border-gray-300 text-gray-700">
        Login
      </Button>
    </Link>
  );

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-primary">
          ProfilePro<span className="text-accent">AI</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? <NavLinks /> : <LoginButton />}
        </div>

        {currentUser && (
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  {isOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        )}

        {!currentUser && (
          <div className="md:hidden">
            <LoginButton />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
