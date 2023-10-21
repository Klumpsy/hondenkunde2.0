import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-orange font-bold mb-3">Company</h3>
            <ul>
              <li className="mb-2 hover:text-white">
                <a href="#">About Us</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Careers</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange font-bold mb-3">Support</h3>
            <ul>
              <li className="mb-2 hover:text-white">
                <a href="#">Help Center</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">Contact Us</a>
              </li>
              <li className="mb-2 hover:text-white">
                <a href="#">FAQs</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-orange font-bold mb-3">Shops</h3>
            <ul>
              <li className="mb-2 hover:text-white">
                <a href="https://www.hondenshop.nl" target="_blank">
                  Hondenshop
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-6 text-center md:text-left md:flex md:justify-between">
          <p>&copy; {new Date().getFullYear()} Hondenkunde</p>
          <p>Gemaakt met 💙 voor honden</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
