import Container from "@/components/layout/Container.tsx";
import FooterColumn from "@/components/footer/FooterColumn.tsx";
import FooterBrand from "@/components/footer/FooterBrand.tsx";
import FooterBottom from "@/components/footer/FooterBottom.tsx";

const shopLinks = ["New Arrivals", "On Sale", "Brands", "Categories"];
const helpLinks = ["Customer Service", "Returns & Exchanges", "Shipping Info", "Size Guide", "FAQ"];
const companyLinks = ["About Us", "Careers", "Press", "Privacy Policy", "Terms of Service"];

export default function Footer() {
  return (
    <footer className="bg-[#F0F0F0] pt-28 pb-6">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10">
          <FooterBrand />

          <FooterColumn title="Shop">
            {shopLinks.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-black transition-colors">{link}</a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Help">
            {helpLinks.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-black transition-colors">{link}</a>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Company">
            {companyLinks.map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-black transition-colors">{link}</a>
              </li>
            ))}
          </FooterColumn>
        </div>

        <FooterBottom />
      </Container>
    </footer>
  );
}
