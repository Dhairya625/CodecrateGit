import { useState, useRef } from "react";
import ScrambledText from "../components/ui/scrambledtext";
import { motion, useInView } from 'framer-motion';

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

// Define navigation items as before
const navItems = [
  { name: "Features", link: "#features" },
  { name: "Start Studying", link: "/StartStudy/startstudying" },
  { name: "Contact", link: "#contact" },
];

// Anchor scroll handler
const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
  if (link.startsWith('#')) {
    e.preventDefault();
    const el = document.getElementById(link.substring(1));
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
};

export function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const featureRef = useRef(null);
  const contactRef = useRef(null);
  const reviewsRef = useRef(null);
  const isInView = useInView(featureRef, { once: true, margin: "-100px" });
  const isContactInView = useInView(contactRef, { once: true, margin: "-100px" });
  const isReviewsInView = useInView(reviewsRef, { once: true, margin: "-100px" });

  // Warm neutral palette from Color Hunt
  return (
    <div className="relative w-full h-full min-h-screen scroll-smooth bg-[#DEDED1] text-gray-800 font-inter antialiased">
      {/* Navbar */}
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems
            items={navItems}
            onItemClick={handleNavItemClick}
          />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" aria-label="Login">Login</NavbarButton>
            <NavbarButton variant="primary" aria-label="Sign Up">SignUp</NavbarButton>
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
                onClick={e => {
                  setIsMobileMenuOpen(false);
                  handleNavItemClick(e, item.link);
                }}
                className="relative text-[#7a7368] hover:text-[#5a5348] transition-colors"
              >
                <span className="block py-2 text-lg font-medium">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4 mt-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                aria-label="Login (Mobile)"
              >
                Login
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
                aria-label="SignUp (Mobile)"
              >
                SignUp
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Hero Section */}
      <div className="flex items-center justify-center w-full min-h-[80vh] flex-col px-4 pb-24 pt-24 bg-[#DEDED1]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-light tracking-tight mb-6 text-center">
            <span className="text-[#5a5348] select-none">CODE</span>
            <span className="text-[#B6AE9F] mx-3">·</span>
            <span className="text-[#5a5348] select-none">CRATE</span>
          </h1>
          <ScrambledText
            className="scrambled-text-demo text-base md:text-lg mt-2 mb-8 text-[#7a7368]"
            radius={90}
            duration={1.2}
            speed={0.6}
            scrambleChars=":."
          >
            Digital Space for Deep Work—no distractions.
          </ScrambledText>
          <motion.button
            onClick={() => {
              const el = document.getElementById('features');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-lg bg-[#B6AE9F] text-white text-sm font-medium hover:bg-[#a0988a] transition-all duration-200 focus:outline-none"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Scroll to features"
          >
            Explore Features
          </motion.button>
        </motion.div>
      </div>

      {/* Features Section */}
      <section
        id="features"
        ref={featureRef}
        className="w-full max-w-7xl mx-auto mt-40 px-6 py-24 bg-transparent"
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-4 text-[#5a5348]">
            Features
          </h2>
          <p className="text-base text-[#7a7368] max-w-xl mx-auto">
            Everything for productive, distraction-free deep work.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: 'Drag & Drop Widgets',
              desc: 'Add, move, and arrange widgets like To-Do, Notes, Code, Timer, Alarms, Spotify, and YouTube.',
            },
            {
              title: 'Customizable Workspace',
              desc: 'Personalize your environment to crush distractions and focus hard.',
            },
            {
              title: 'Productive Workflow',
              desc: 'Streamlined interface designed for deep focus and maximum productivity.',
            },
            {
              title: 'Resizable & Movable Widgets',
              desc: 'Resize and move widgets for your ideal workflow.',
            },
            {
              title: 'Quick Clear-All',
              desc: 'Clean your workspace instantly with one click.',
            },
            {
              title: 'Spotify & YouTube (Soon)',
              desc: 'Integrate music and video directly—coming soon.',
            }
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="group relative flex flex-col p-8 bg-[#F8F8F3] rounded-xl border border-[#C5C7BC] hover:border-[#B6AE9F] hover:bg-[#fafaf8] transition-all duration-300"
              tabIndex={0}
              aria-label={feature.title}
            >
              <div className="flex flex-col h-full">
                <div className="w-12 h-12 mb-4 rounded-lg bg-[#FBF3D1] flex items-center justify-center group-hover:bg-[#B6AE9F]/20 transition-colors duration-300">
                  <div className="w-2 h-2 rounded-full bg-[#B6AE9F] group-hover:bg-[#9a9180] transition-colors duration-300"></div>
                </div>
                <h3 className="font-medium text-lg mb-2.5 text-[#5a5348]">
                  {feature.title}
                </h3>
                <p className="text-sm text-[#7a7368] leading-relaxed flex-1">
                  {feature.desc}
                </p>
              </div>
              <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#B6AE9F]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" ref={contactRef} className="w-full max-w-6xl mx-auto mt-40 px-6 py-24 bg-transparent">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isContactInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-4 text-[#5a5348]">
            Contact
          </h2>
          <p className="text-base text-[#7a7368] max-w-xl mx-auto">
            Get in touch for support, feedback, or collaborations.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group p-8 bg-[#F8F8F3] rounded-xl border border-[#C5C7BC] hover:border-[#B6AE9F] hover:bg-[#fafaf8] transition-all duration-300"
          >
            <div className="mb-6">
              <div className="w-10 h-10 mb-4 rounded-lg bg-[#FBF3D1] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#B6AE9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-[#5a5348]">Email Us</h3>
              <p className="text-sm text-[#7a7368]">
                Send suggestions, issues, or collaboration requests.
              </p>
            </div>
            <a
              href="mailto:info@codecrate.com"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#B6AE9F] text-white text-sm font-medium hover:bg-[#a0988a] transition-all duration-200"
            >
              <span>info@codecrate.com</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </motion.div>
          {/* Socials Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isContactInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group p-8 bg-[#F8F8F3] rounded-xl border border-[#C5C7BC] hover:border-[#B6AE9F] hover:bg-[#fafaf8] transition-all duration-300"
          >
            <div className="mb-6">
              <div className="w-10 h-10 mb-4 rounded-lg bg-[#FBF3D1] flex items-center justify-center">
                <svg className="w-5 h-5 text-[#B6AE9F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <h3 className="font-medium text-lg mb-2 text-[#5a5348]">Follow Us</h3>
              <p className="text-sm text-[#7a7368]">
                Stay updated with product drops, news & community.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://twitter.com/codecrate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg bg-[#B6AE9F] text-white text-sm font-medium hover:bg-[#a0988a] transition-all duration-200"
                aria-label="Twitter"
              >
                <span>Twitter</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
              <a
                href="https://github.com/codecrate"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg border border-[#C5C7BC] text-[#7a7368] text-sm font-medium hover:border-[#B6AE9F] hover:text-[#5a5348] transition-all duration-200"
                aria-label="GitHub"
              >
                <span>GitHub</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Reviews & Suggestions */}
      <section id="reviews" ref={reviewsRef} className="w-full max-w-xl mx-auto mt-40 px-4 py-20 bg-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isReviewsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-normal mb-4 text-[#5a5348]">
            Reviews & Suggestions
          </h2>
          <p className="text-sm text-[#7a7368] max-w-lg mx-auto mb-8">
            Your feedback shapes the future of Codecrate.
          </p>
          <a
            href="mailto:info@codecrate.com?subject=Review%20or%20Suggestion%20for%20Codecrate"
            className="inline-block px-6 py-3 rounded-lg bg-[#B6AE9F] text-white text-sm font-medium hover:bg-[#a0988a] transition-all duration-200"
            aria-label="Send Feedback via Email"
          >
            Send Feedback
          </a>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="w-full mt-32 py-12 border-t border-[#C5C7BC] text-center text-[#7a7368] text-xs tracking-wide">
        &copy; {new Date().getFullYear()} Codecrate. All rights reserved.
      </footer>
    </div>
  );
}

export default App;

export function CombinedDemo() {
  return <App />;
}
