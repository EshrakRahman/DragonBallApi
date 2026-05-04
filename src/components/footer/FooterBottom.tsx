import { FaTwitter, FaFacebookSquare, FaInstagram, FaGithub } from "react-icons/fa";

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookSquare, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function FooterBottom() {
  return (
    <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-black/40">
        &copy; 2026 shop.co. All rights reserved.
      </p>
      <div className="flex gap-2">
        {socialLinks.map((link) => {
          const Icon = link.icon;
          return (
            <a key={link.label} href={link.href} aria-label={link.label} className="text-gray-600 hover:text-black">
              <Icon size={20} />
            </a>
          );
        })}
      </div>
    </div>
  );
}
