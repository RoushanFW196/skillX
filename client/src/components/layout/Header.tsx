import { Modal } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Zap, Menu, X } from 'lucide-react';
import { useState } from 'react';
import Signup from '../../pages/Signup';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
 const [opened, { open, close }] = useDisclosure(false);







  return (
    <header className="bg-white border-b border-neutral-100 sticky top-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-neutral-900">SkillSwap</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium">
              Browse Skills
            </a>
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium">
              Community
            </a>
            <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium">
              About
            </a>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors text-sm font-medium">
              Sign In
            </button>
            <button variant="default" onClick={open} className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-semibold shadow-sm">
              Get Started
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-700 hover:text-primary-600"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-neutral-100 bg-neutral-50">
            <div className="flex flex-col gap-4">
              <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2">
                Browse Skills
              </a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2">
                Community
              </a>
              <a href="#" className="text-neutral-700 hover:text-primary-600 transition-colors font-medium px-2">
                About
              </a>
              <div className="pt-4 border-t border-neutral-200 flex flex-col gap-3">
                <button className="px-4 py-2 text-neutral-700 hover:text-primary-600 transition-colors font-medium text-left">
                  Sign In
                </button>
                <button variant="default" onClick={open} className="px-5 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold shadow-sm">
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

        <Modal opened={opened} onClose={close} title="Authentication" size="auto">
        {/* Modal content */}
        <Signup/>
      </Modal>
    </header>
  );
}
