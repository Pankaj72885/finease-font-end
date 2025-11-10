import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-md flex items-center justify-center">
                <span className="text-black dark:text-white text-2xl font-bold">F</span>
              </div>
              <span className="text-xl font-bold">FinEase</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Your personal finance management solution for tracking expenses,
              managing budgets, and achieving financial goals.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary-600 transition-colors"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-muted-foreground hover:text-primary-600 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/my-transactions"
                  className="text-muted-foreground hover:text-primary-600 transition-colors"
                >
                  My Transactions
                </a>
              </li>
              <li>
                <a
                  href="/reports"
                  className="text-muted-foreground hover:text-primary-600 transition-colors"
                >
                  Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary-600 transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary-600 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail size={18} />
                <span>support@finease.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone size={18} />
                <span>+8801780079749</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin size={18} />
                <span>Dashar, Madaripur, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FinEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
