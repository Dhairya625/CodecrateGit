import { useState } from "react";
import { WavyBackground } from "../components/ui/waves";
import ScrambledText from "../components/ui/scrambledtext";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../components/ui/navbar";


const navItems = [
  { name: "Features", link: "#features" },
  { name: "Start Studying", link: "/StartStudy/startstudying" },
  { name: "Contact", link: "#contact" },
];

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full scroll-smooth">
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary">Login</NavbarButton>
            <NavbarButton variant="primary">SignUp</NavbarButton>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                SignUp
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
            <br />
            <br />
            <br />
            <br />  
      {/* Hero Section with Background */}
      <WavyBackground className="flex items-center justify-center w-screen h-screen flex-col px-4">
        <div className="text-center max-w-4xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight mb-6 drop-shadow">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-purple-700">
              CODE
            </span>
            <span className="text-black dark:text-white">CRATE</span>
          </h1>
        </div>
        <ScrambledText
  className="scrambled-text-demo"
  radius={80}
  duration={1.2}
  speed={0.5}
  scrambleChars=".:" // Example: a string containing the characters   to scramble
>
   Digital Space for Distraction Free Deep Work.
</ScrambledText>
      </WavyBackground>

      {/* Features Section */}
      <div id="features" className="min-h-screen py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">🚀 Features</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Collaborate with peers, share resources, and stay focused.
          </p>
        </div>
      </div>

      {/* Start Studying Section */}
      <div id="StartStudying" className="min-h-screen py-24 bg-zinc-100 dark:bg-zinc-800">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">📚 Start Studying</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Join or create your digital study room now.
          </p>
          {/* Placeholder for future join/create room form */}
          <button className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition">
            Create or Join Room
          </button>
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="min-h-screen py-24 bg-white dark:bg-zinc-900">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">📬 Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Have questions? Reach out at <span className="underline">support@codecrate.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;

export function CombinedDemo() {
  return <App />;
}
