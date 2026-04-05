import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Zap, Menu, X } from "lucide-react";
import { useState } from "react";
import Auth from "../../Auth";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 border-b border-neutral-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-neutral-900">
              SkillSwap
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {["Browse Skills", "Community", "About"].map((item) => (
              <a
                key={item}
                href="#"
                className="relative text-sm font-medium text-neutral-700 hover:text-indigo-600 transition"
              >
                {item}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={open}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-neutral-100 transition"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold">Menu</span>
          <X
            className="w-5 h-5 cursor-pointer"
            onClick={() => setMobileMenuOpen(false)}
          />
        </div>

        <div className="flex flex-col gap-5 p-5">
          {["Browse Skills", "Community", "About"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-neutral-700 font-medium hover:text-indigo-600 transition"
            >
              {item}
            </a>
          ))}

          <button
            onClick={open}
            className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        centered
        radius="lg"
        overlayProps={{ blur: 3 }}
        size="md"
      >
        <div className="p-2">
          <Auth />
        </div>
      </Modal>
    </header>
  );
}
