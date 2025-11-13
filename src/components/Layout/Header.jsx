import { Button } from "@/components/ui/button";
import { useAuth } from "@/Contexts/AuthContext";
import { useTheme } from "@/Contexts/ThemeContext";
import { LogOut, Menu, Moon, Sun, User, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-black dark:text-white text-2xl font-bold">
                  F
                </span>
              </div>
              <span className="text-xl font-bold">FinEase</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-foreground hover:text-primary-600 transition-colors"
            >
              Home
            </Link>
            {currentUser && (
              <>
                <Link
                  to="/add-transaction"
                  className="text-foreground hover:text-primary-600 transition-colors"
                >
                  Add Transaction
                </Link>
                <Link
                  to="/my-transactions"
                  className="text-foreground hover:text-primary-600 transition-colors"
                >
                  My Transactions
                </Link>
                <Link
                  to="/reports"
                  className="text-foreground hover:text-primary-600 transition-colors"
                >
                  Reports
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>

            {/* User Menu */}
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2">
                  {currentUser.photoURL ? (
                    <img
                      src={currentUser.photoURL}
                      alt={currentUser.displayName}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                  )}
                </button>

                <div className="absolute right-0 mt-2 bg-card border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 w-fit">
                  <div className="p-2">
                    <div className="px-4 py-2 text-sm text-muted-foreground w-fit border-b">
                      <div>{currentUser.displayName}</div>
                      <div>{currentUser.email}</div>
                    </div>
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-accent rounded-md"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm hover:bg-accent rounded-md flex items-center space-x-2"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-foreground hover:text-primary-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {currentUser ? (
                <>
                  <Link
                    to="/add-transaction"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Add Transaction
                  </Link>
                  <Link
                    to="/my-transactions"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Transactions
                  </Link>
                  <Link
                    to="/reports"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Reports
                  </Link>
                  <Link
                    to="/profile"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-left text-foreground hover:text-primary-600 transition-colors flex items-center space-x-2"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="text-foreground hover:text-primary-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
