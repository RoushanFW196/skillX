import { Zap, Github, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SkillSwap</span>
            </div>
            <p className="text-neutral-500 mb-6 max-w-md leading-relaxed text-sm">
              A global community where knowledge flows freely. Exchange skills, build connections, and grow together without financial barriers.
            </p>
            <div className="flex gap-5">
              <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-sm">Platform</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Browse Skills
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Success Stories
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Categories
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-6 text-sm">Company</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-neutral-500 hover:text-primary-400 transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8 text-center text-neutral-600 text-sm">
          <p>&copy; {new Date().getFullYear()} SkillSwap. All rights reserved. Made with passion.</p>
        </div>
      </div>
    </footer>
  );
}
