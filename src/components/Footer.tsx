import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const socialIcons = [
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" }
];

export const Footer = () => {
  return (
    <footer className="bg-gray-900 py-16 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 sm:px-8 lg:grid-cols-5 lg:px-10">
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl font-semibold">Exclusive</h3>
          <p className="text-sm text-gray-300">Subscribe</p>
          <p className="text-sm text-gray-500">Get 10% off your first order</p>
          <form className="flex gap-2">
            <label className="sr-only" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md bg-gray-800 px-3 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
            />
            <button
              type="submit"
              className="rounded-md bg-[#DB4444] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#c03b3b]"
            >
              Join
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-lg font-semibold">Support</h4>
          <p className="flex items-start gap-2 text-sm text-gray-400">
            <MapPin className="mt-0.5 h-4 w-4" /> 111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <Mail className="h-4 w-4" /> exclusive@gmail.com
          </p>
          <p className="flex items-center gap-2 text-sm text-gray-400">
            <Phone className="h-4 w-4" /> +88015-88888-9999
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Account</h4>
          <a className="text-sm text-gray-400 transition hover:text-white">My Account</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Login / Register</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Cart</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Wishlist</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Shop</a>
        </div>

        <div className="flex flex-col gap-2">
          <h4 className="text-lg font-semibold">Quick Link</h4>
          <a className="text-sm text-gray-400 transition hover:text-white">Privacy Policy</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Terms Of Use</a>
          <a className="text-sm text-gray-400 transition hover:text-white">FAQ</a>
          <a className="text-sm text-gray-400 transition hover:text-white">Contact</a>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <h4 className="text-lg font-semibold">Download App</h4>
            <p className="text-xs text-gray-500">Save $3 with App New User Only</p>
          </div>
          <div className="flex gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-md border border-gray-700">
              <img src="/assets/ecommerce/apple-logo.png" alt="QR" className="h-12 w-12" />
            </div>
            <div className="flex flex-col gap-3">
              <button className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200">
                Google Play
              </button>
              <button className="rounded-md bg-white px-4 py-3 text-sm font-semibold text-gray-900 transition hover:bg-gray-200">
                App Store
              </button>
            </div>
          </div>
          <div className="flex gap-4 text-gray-400">
            {socialIcons.map(({ icon: Icon, label }) => (
              <a key={label} className="transition hover:text-white" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Exclusive. All rights reserved.
      </div>
    </footer>
  );
};
