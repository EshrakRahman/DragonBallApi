import { FaTwitter, FaFacebookSquare, FaInstagram, FaGithub } from "react-icons/fa";

const socialLinks = [
  { icon: FaTwitter, href: "#", label: "Twitter" },
  { icon: FaFacebookSquare, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaGithub, href: "#", label: "GitHub" },
];

export default function FooterBrand() {
  return (
    <div className="lg:col-span-2 flex flex-col gap-5">
      <span className="font-heading font-bold text-3xl uppercase text-black">shop.co</span>
      <p className="text-sm text-black/60 leading-6 max-w-xs">
        We have clothes that suits your style and which you&apos;re proud to wear. From women to men.
      </p>
      <div className="flex gap-3">
        {socialLinks.map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            className="w-9 h-9 flex items-center justify-center rounded-full border border-black/20 text-black/60 hover:bg-black hover:text-white hover:border-black transition-all"
          >
            <Icon className="text-sm" />
          </a>
        ))}
      </div>
    </div>
  );
}
