import { Plane } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--df-primary-dark)] text-[var(--df-text-light)]">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 py-12">
        {/* ==================== 上半區：四欄 ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Get Started</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Private Jet
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Register
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Current Jet Deals
                </a>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-[var(--df-accent-gold)] transition-colors"
                >
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div>
            <h3 className="font-semibold mb-4 text-lg">Newsletter</h3>
            <p className="text-sm text-white/80 mb-4 leading-relaxed">
              Subscribe to receive the latest updates, travel deals, and more
              from Stelwing Duty Free.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[var(--df-accent-gold)] placeholder:text-white/60"
              />
              <button
                type="submit"
                className="bg-[var(--df-accent-gold)] hover:bg-[var(--df-accent-gold)]/90 text-white rounded px-4 flex items-center gap-2 transition"
              >
                <Plane className="w-4 h-4" /> Join
              </button>
            </form>
          </div>
        </div>

        {/* ==================== 下段：品牌資訊 ==================== */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                fill="var(--df-accent-gold)"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="var(--df-accent-gold)"
                strokeWidth="2"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="var(--df-accent-gold)"
                strokeWidth="2"
              />
            </svg>
            <span className="text-xl font-semibold tracking-wide">
              STELWING
            </span>
          </div>
          <p className="text-sm text-white/60 max-w-2xl leading-relaxed">
            Stelwing Airlines Duty Free — bringing you world-class travel retail
            experiences since 2025.
          </p>
        </div>

        {/* ==================== 最底：著作權區 ==================== */}
        <div className="mt-8 border-t border-white/10 pt-6 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Stelwing Airlines Duty Free — All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
