import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & About */}
          <div className="col-span-1 md:col-span-1">
            <div className="font-bold text-2xl text-green-700 mb-6">🛍️ Dukaan Wallah</div>
            <p className="text-gray-500 text-sm leading-relaxed">
              Your neighborhood's favorite digital store. Bringing fresh groceries and daily essentials directly from local suppliers to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><Link to="/buyer" className="hover:text-green-600 transition-colors">Home</Link></li>
              <li><Link to="/buyer/cart" className="hover:text-green-600 transition-colors">Your Cart</Link></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Orders</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Profile</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-600">
              <li><a href="#" className="hover:text-green-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Shipping Policy</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-green-600 transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Connect With Us</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-green-600 hover:text-white transition-all"><FaFacebook /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-green-600 hover:text-white transition-all"><FaTwitter /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-green-600 hover:text-white transition-all"><FaInstagram /></a>
              <a href="#" className="p-2 bg-gray-100 rounded-full text-gray-600 hover:bg-green-600 hover:text-white transition-all"><FaLinkedin /></a>
            </div>
            <p className="text-sm text-gray-600">Email: support@dukaanwallah.com</p>
            <p className="text-sm text-gray-600">Phone: +91 12345 67890</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500">
            © 2026 Dukaan Wallah. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-gray-400">
            <a href="#" className="hover:text-gray-600">Privacy Policy</a>
            <a href="#" className="hover:text-gray-600">Terms of Service</a>
            <a href="#" className="hover:text-gray-600">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

