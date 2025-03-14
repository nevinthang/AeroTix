"use client";

import { useState, useEffect } from "react";
import { Menu, X, UserCircle, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { data: session, status } = useSession()
  const isLoggedIn = status === "authenticated"
  const isAdmin = session?.user?.username === "Admin"
  const [isOpen, setIsOpen] = useState(false)
  const [activePage, setActivePage] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)

  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Book", href: "/book" },
    { label: "Loyalty", href: "/loyalty" },
    { label: "Support", href: "/support" },
  ]

  console.log(session?.user.username)
  

  useEffect(() => {
    if (pathname === "/") {
      setActivePage("Home");
    } else {
      const activeItem = navItems.find(
        (item) => pathname.startsWith(item.href) && item.href !== "/"
      );
      if (activeItem) {
        setActivePage(activeItem.label);
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Handle logout
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <nav
      className={cn(
        "absolute top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4"
      )}
    >
      <div
        className={cn(
          "backdrop-blur-xl border-b transition-all duration-300",
          scrolled ? "shadow-lg border-white/10" : "border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <Link href="/">
                <div className="relative overflow-hidden">
                  <img
                    src="/logo1.png"
                    alt="AR PLANE Logo"
                    className="w-24 md:w-32 h-auto transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation & Authentication */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Navigation Items */}
              <div className="flex space-x-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 overflow-hidden group",
                      activePage === item.label
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    )}
                  >
                    <span className="relative z-10">{item.label}</span>
                    <span
                      className={cn(
                        "absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full -z-0 transition-all duration-300",
                        activePage === item.label
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-50"
                      )}
                    ></span>
                  </Link>
                ))}
              </div>

              {/* Login Button or User Menu */}
              {isLoggedIn ? (
                <div className="flex items-center space-x-4 text-white">
                    <Link
                      href={isAdmin ? "/dashboard" : "/profile"}
                      className="group relative flex items-center space-x-2 p-1 rounded-full overflow-hidden"
                    >
                      <UserCircle className="w-8 h-8 text-white transition-transform duration-300 group-hover:scale-110" />
                      <span className="absolute inset-0 bg-white/10 scale-0 group-hover:scale-100 rounded-full transition-transform duration-300"></span>
                    </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-glow group"
                >
                  <span className="relative z-10">Login</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full text-gray-300 hover:text-white hover:bg-white/10 focus:outline-none transition-all duration-300"
                aria-expanded={isOpen}
              >
                <span className="sr-only">
                  {isOpen ? "Close menu" : "Open menu"}
                </span>
                {isOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            "md:hidden backdrop-blur-xl bg-white/5 transform transition-all duration-500 ease-in-out overflow-hidden",
            isOpen
              ? "max-h-[400px] opacity-100 border-t border-white/10"
              : "max-h-0 opacity-0 border-t border-transparent"
          )}
        >
          <div className="px-4 py-2 space-y-">
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block text-gray-300 px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 relative overflow-hidden",
                  activePage === item.label
                    ? "text-white bg-gradient-to-r from-purple-600/20 to-blue-600/20"
                    : "hover:bg-white/5 hover:text-white"
                )}
                style={{
                  transitionDelay: `${index * 50}ms`,
                  transform: isOpen ? "translateY(0)" : "translateY(20px)",
                  opacity: isOpen ? 1 : 0,
                }}
                onClick={() => setIsOpen(false)}
              >
                <span>{item.label}</span>
                {activePage === item.label && (
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500"></span>
                )}
              </Link>
            ))}

            {/* Mobile Authentication */}
            <div
              className="mt-4 pt-4 border-t border-white/10"
              style={{
                transitionDelay: `${navItems.length * 50}ms`,
                transform: isOpen ? "translateY(0)" : "translateY(20px)",
                opacity: isOpen ? 1 : 0,
              }}
            >
              {isLoggedIn ? (
                <div className="space-y-3">
                  <Link
                    href={isAdmin ? "/dashboard" : "/profile"}
                    className="flex items-center space-x-3 text-white px-4 py-3 rounded-lg hover:bg-white/5 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    <UserCircle className="w-5 h-5" />
                    <span>{isAdmin ? "Dashboard" : "Profile"}</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-glow"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth"
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-glow"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
