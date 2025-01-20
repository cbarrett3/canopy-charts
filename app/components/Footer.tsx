import { Button } from "./ui/button"
import { Input } from "./ui/input"

export const Footer = () => {
  return (
    <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-white/20 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">About EcoViz</h4>
            <p className="text-gray-600 dark:text-gray-400">
              EcoViz is a powerful tool for creating interactive environmental data visualizations using D3.js and React.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Documentation", "Examples", "GitHub", "API Reference"].map((link) => (
                <li key={link}>
                  <a href="#" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Stay Connected</h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">Subscribe to our newsletter for updates and tips.</p>
            <form className="flex space-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-grow dark:bg-gray-800 border-white/20"
              />
              <Button className="bg-gradient-to-r from-blue-600 to-green-400 text-white hover:opacity-90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
          <p className="text-center text-gray-600 dark:text-gray-400">© 2024 EcoViz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
} 