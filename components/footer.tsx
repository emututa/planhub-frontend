export function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-white border-t border-blue-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-blue-600 mb-4">PlanHub</h3>
            <p className="text-gray-600 text-sm">Connect, share, and organize community events with ease.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Features</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Create Events
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Share Posts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Register Events
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Community</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition">
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-100 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 PlanHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">
              Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-600 transition">
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
