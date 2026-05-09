import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

type IconName = string;

const LOGO_URL = "https://cdn.poehali.dev/files/12f9ecee-b795-40fe-8e68-dd6a96b3d7f5.png";
const HERO_BG = "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/baae99ab-8d3a-46e8-bf86-cd4eb34a7045.jpg";
const GRAINS_IMG = "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/5ecc71a8-ec2b-4ee9-96b3-5a88bf06a006.jpg";
const FACILITY_IMG = "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/2a9a29d2-786d-4b05-b45f-f7f339c77760.jpg";

const products = [
  { name: "Steamed Buckwheat", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/39be89c7-97ce-4972-8a6f-5b680129eb24.jpg", organic: true },
  { name: "Green Buckwheat", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/d14bdcaa-59d3-49b3-9365-a5970f955661.jpg", organic: true },
  { name: "Buckwheat Flour", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/69be0396-6fec-4c01-a1a4-9a7b11a8bfdd.jpg", organic: true },
  { name: "Oat Flakes", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/0c4a7759-b87c-454a-9546-32c08300311f.jpg", organic: true },
  { name: "Flaxseed", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/f75cb1fc-5d43-4451-886d-597192a0aac4.jpg", organic: true },
  { name: "Red Lentils", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/47946db3-87c3-4caf-8bfd-8aeed09c40dc.jpg", organic: false },
  { name: "Yellow Peas", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/e63a336a-79aa-4aa9-b147-031bad422833.jpg", organic: false },
  { name: "Wheat", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/79d6ea66-ec81-4702-ade0-9a13670c9b8c.jpg", organic: false },
  { name: "Rye", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/cb320390-a60d-45cb-8547-95d1e13b9dd4.jpg", organic: false },
  { name: "Barley", photo: "https://cdn.poehali.dev/projects/165ba907-5691-4ff9-8428-d14dc85f6142/files/61e617b9-3489-4bb8-933f-400a64d8933a.jpg", organic: false },
];

const markets = [
  { region: "Europe", countries: "Germany, Poland, Czech Republic, Netherlands", icon: "Globe" },
  { region: "North America", countries: "USA, Canada", icon: "MapPin" },
  { region: "Latin America", countries: "Brazil, Mexico, Colombia", icon: "Navigation" },
  { region: "Asia & Middle East", countries: "Turkey, UAE, India", icon: "Compass" },
];

const certBadges = [
  { label: "EU Organic Certified", icon: "ShieldCheck", color: "#70ad02" },
  { label: "ISO 22000", icon: "Award", color: "#c9a227" },
  { label: "HACCP", icon: "CheckCircle", color: "#1a4a2e" },
  { label: "Phytosanitary", icon: "Leaf", color: "#70ad02" },
];

const packagingTypes = [
  { title: "Retail Packaging", desc: "0.5kg – 5kg branded bags for supermarkets", icon: "Package" },
  { title: "Bulk Big Bags", desc: "500kg – 1000kg FIBC for distributors", icon: "Archive" },
  { title: "Container Supply", desc: "20–40 ft FCL for large importers", icon: "Truck" },
  { title: "Private Label", desc: "Custom brand, your design on our product", icon: "Tag" },
];

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.12 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Section({ className = "", children, id }: { className?: string; children: React.ReactNode; id?: string }) {
  const { ref, inView } = useInView();
  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"} ${className}`}
    >
      {children}
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs font-semibold tracking-[0.3em] uppercase text-lime mb-3 font-montserrat">
      {children}
    </div>
  );
}

export default function Index() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", company: "", email: "", product: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#products", label: "Products" },
    { href: "#organic", label: "Organic" },
    { href: "#export", label: "Export" },
    { href: "#certifications", label: "Certifications" },
    { href: "#private-label", label: "Private Label" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-cream font-montserrat overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "bg-forest shadow-xl" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <img src={LOGO_URL} alt="Gavrilov Foods" className="h-11 md:h-13 w-auto" />
          </a>
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="nav-link text-cream/80 hover:text-cream text-[11px] font-semibold tracking-[0.15em] uppercase"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a href="#contact" className="hidden lg:inline-block btn-lime text-[11px] py-3 px-5">
            Request a Quote
          </a>
          <button className="lg:hidden text-cream p-1" onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>
        {mobileOpen && (
          <div className="lg:hidden bg-forest border-t border-forest-mid px-6 py-6 flex flex-col gap-5">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
                className="text-cream/85 text-sm font-semibold tracking-widest uppercase">
                {l.label}
              </a>
            ))}
            <a href="#contact" className="btn-lime text-center mt-2 text-xs">Request a Quote</a>
          </div>
        )}
      </header>

      {/* ── HERO ── */}
      <div className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{ backgroundImage: `url(${HERO_BG})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/20 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#e6af48]/20 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pb-16 md:pb-24 pt-28 md:pt-36">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-lime text-white text-[10px] font-bold tracking-[0.25em] uppercase px-4 py-2 mb-7 animate-fade-in">
              <Icon name="ShieldCheck" size={12} />
              EU Organic Certified &nbsp;·&nbsp; Farm to Export
            </div>
            <h1 className="font-playfair text-5xl md:text-6xl lg:text-7xl font-bold text-cream leading-[1.05] mb-5 text-shadow-lg animate-fade-in animate-delay-200">
              Reliable Russian<br />
              <em className="text-wheat-light not-italic">Grain Products</em><br />
              for the World
            </h1>
            <p className="text-cream/75 text-base md:text-lg font-light leading-relaxed mb-4 animate-fade-in animate-delay-300 max-w-lg">
              Premium quality grains, pulses and oilseeds — from Smolensk Region fields to your market.
            </p>
            <div className="flex items-center gap-3 mb-10 animate-fade-in animate-delay-400">
              {["Premium Quality", "Sustainable", "Traceable"].map((t, i) => (
                <span key={t} className="text-lime text-xs font-semibold tracking-widest uppercase">
                  {t}{i < 2 && <span className="text-cream/30 ml-3">·</span>}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 animate-fade-in animate-delay-500">
              <a href="#products" className="btn-lime">View Our Products</a>
              <a href="#contact" className="btn-outline-white">Request a Quote</a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-3 max-w-md animate-fade-in animate-delay-600">
            {[
              { label: "Farm to Export", sub: "Full Control" },
              { label: "Consistent Quality", sub: "Every Shipment" },
              { label: "Long-term Partnership", sub: "Mutual Growth" },
            ].map((item, i) => (
              <div
                key={item.label}
                className={`bg-forest/55 backdrop-blur-sm px-3 py-4 text-center border-r border-cream/10 last:border-r-0 ${i === 0 ? "border-l border-t border-b border-cream/10" : ""}`}
              >
                <div className="text-cream text-[10px] font-semibold tracking-wider leading-tight">{item.label}</div>
                <div className="text-cream/45 text-[10px] mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <Icon name="ChevronDown" size={20} className="text-cream" />
        </div>
      </div>

      {/* ── ABOUT ── */}
      <Section id="about" className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <SectionLabel>About the Company</SectionLabel>
              <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-forest leading-tight mb-6">
                About<br /><em className="text-forest-mid not-italic font-normal">Gavrilov Foods</em>
              </h2>
              <div className="gold-divider mb-7 max-w-xs" />
              <p className="text-forest/70 leading-relaxed mb-7 text-sm md:text-base">
                We are a Russian agricultural producer and grain processor with full-cycle control from farm to export. Located in the Smolensk Region, our company combines modern processing technologies, strict quality standards and reliable logistics to deliver premium products worldwide.
              </p>
              <div className="grid gap-3 mb-8">
                {[
                  { icon: "Tractor", text: "Own farming and trusted growers network" },
                  { icon: "Factory", text: "Modern processing facilities" },
                  { icon: "ShieldCheck", text: "Strict quality control at every stage" },
                  { icon: "TrendingUp", text: "Stable supply and reliable volume" },
                  { icon: "Globe", text: "Export experience to 20+ countries" },
                ].map(item => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-lime/12 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon as IconName} size={14} className="text-lime" fallback="Check" />
                    </div>
                    <span className="text-forest/75 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-2 border-lime pl-5">
                <p className="font-cormorant text-xl md:text-2xl italic text-forest-mid leading-snug">
                  "Growing quality.<br />Delivering trust.<br />Building partnership."
                </p>
              </blockquote>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="rounded-sm overflow-hidden shadow-2xl">
                <img src={GRAINS_IMG} alt="Premium grains" className="w-full h-80 md:h-96 object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-forest/30 to-transparent pointer-events-none" />
              </div>
              <div className="absolute -bottom-5 -left-4 md:-left-6 bg-forest rounded-sm p-3 md:p-4 shadow-xl hidden md:block">
                <img src={FACILITY_IMG} alt="Processing facility" className="w-44 h-28 object-cover rounded-sm" />
              </div>
              <div className="absolute -top-4 -right-2 md:-right-4 bg-lime text-white p-4 rounded-sm text-center shadow-lg">
                <div className="font-playfair text-2xl md:text-3xl font-bold">20+</div>
                <div className="text-[10px] font-bold tracking-widest uppercase mt-0.5">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ── PRODUCTS ── */}
      <Section id="products" className="py-20 md:py-28 bg-[#f5f0e8]">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          {/* Header — как на буклете */}
          <div className="mb-8">
            <h2 className="font-montserrat text-2xl md:text-3xl font-extrabold text-forest uppercase tracking-wide flex items-center gap-2 mb-1">
              Our Products <Icon name="Leaf" size={22} className="text-lime" />
            </h2>
            <p className="text-forest/60 text-sm">Wide range of grains, pulses and oilseeds for global markets</p>
            <div className="mt-3 h-[2px] w-16 bg-lime" />
          </div>

          {/* Grid 3 col — как в буклете */}
          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {products.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-full aspect-square rounded-lg overflow-hidden border border-[#e0d5c5] bg-[#ede8df] shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  <img
                    src={p.photo}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="mt-2 text-center">
                  <div className="font-montserrat font-extrabold text-forest text-[11px] md:text-xs tracking-wider uppercase leading-tight">
                    {p.name}
                  </div>
                  {p.organic && (
                    <div className="mt-1 inline-flex items-center gap-1 text-lime text-[9px] font-bold tracking-widest uppercase">
                      <Icon name="Leaf" size={7} /> organic
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom banner — как на буклете */}
          <div className="mt-8 bg-forest rounded-sm px-5 py-4 flex items-center gap-3">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center">
              <Icon name="Leaf" size={20} className="text-lime" />
            </div>
            <div>
              <div className="text-cream font-montserrat font-bold text-xs tracking-wider uppercase">
                Organic & Conventional Options Available
              </div>
              <div className="text-cream/60 text-[11px]">We meet your needs with flexibility and care</div>
            </div>
            <a href="#contact" className="ml-auto btn-lime whitespace-nowrap text-[11px] py-2 px-4">
              Get Quote
            </a>
          </div>
        </div>
      </Section>

      {/* ── ORGANIC & CONVENTIONAL ── */}
      <Section id="organic" className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <SectionLabel>Farming Standards</SectionLabel>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-forest leading-tight">Organic & Conventional</h2>
          </div>
          <div className="section-divider mb-14 max-w-xs mx-auto" />

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Organic */}
            <div className="border-2 border-lime/40 rounded-sm overflow-hidden">
              <div className="bg-lime px-7 py-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Icon name="Leaf" size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-white font-playfair text-xl font-semibold">Organic</div>
                  <div className="text-white/75 text-xs tracking-wider uppercase">EU Certified</div>
                </div>
                <div className="ml-auto bg-white/15 border border-white/30 text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                  ECOCERT
                </div>
              </div>
              <div className="p-7 bg-lime/4">
                <p className="text-forest/70 text-sm leading-relaxed mb-6">
                  Our organic line is grown without synthetic pesticides or fertilizers, certified to EU Organic standards. Ideal for health food brands, premium retail, and eco-conscious markets.
                </p>
                <ul className="space-y-3">
                  {[
                    "EU Organic Certified (ECOCERT standard)",
                    "No synthetic pesticides or GMO",
                    "Full traceability from field to product",
                    "Available: Buckwheat, Oat Flakes, Flaxseed, Green Buckwheat, Buckwheat Flour",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={9} className="text-white" />
                      </div>
                      <span className="text-forest/75 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conventional */}
            <div className="border-2 border-wheat/40 rounded-sm overflow-hidden">
              <div className="bg-forest px-7 py-5 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Icon name="Wheat" size={20} className="text-wheat-light" fallback="Package" />
                </div>
                <div>
                  <div className="text-cream font-playfair text-xl font-semibold">Conventional</div>
                  <div className="text-cream/60 text-xs tracking-wider uppercase">Standard Grade</div>
                </div>
                <div className="ml-auto bg-cream/10 border border-cream/20 text-cream text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-sm">
                  HACCP
                </div>
              </div>
              <div className="p-7 bg-cream-dark">
                <p className="text-forest/70 text-sm leading-relaxed mb-6">
                  Our conventional line meets strict food safety standards with consistent quality and competitive pricing. Perfect for large-volume importers, food manufacturers and wholesalers.
                </p>
                <ul className="space-y-3">
                  {[
                    "HACCP & ISO 22000 compliant",
                    "Consistent quality, every shipment",
                    "Competitive pricing for large volumes",
                    "Available: All products — Wheat, Rye, Barley, Lentils, Yellow Peas and more",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-forest flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Icon name="Check" size={9} className="text-lime" />
                      </div>
                      <span className="text-forest/75 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="bg-forest rounded-sm p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-playfair text-xl font-semibold text-cream mb-2">Not sure which option fits your needs?</h3>
              <p className="text-cream/55 text-sm">We'll help you choose the right grade, packaging and certification for your market.</p>
            </div>
            <a href="#contact" className="btn-lime whitespace-nowrap">Ask Our Team</a>
          </div>
        </div>
      </Section>

      {/* ── EXPORT ── */}
      <Section id="export" className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <SectionLabel>Logistics & Supply</SectionLabel>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-forest leading-tight">Export & Supply</h2>
          </div>
          <div className="gold-divider mb-14 max-w-xs mx-auto" />

          <div className="grid md:grid-cols-2 gap-10 mb-14">
            <div>
              <h3 className="font-playfair text-2xl font-semibold text-forest mb-5">Exporting Worldwide</h3>
              <p className="text-forest/65 text-sm leading-relaxed mb-6">
                Delivering quality to customers across the globe. We work directly with importers, distributors, wholesalers, and private label partners in 20+ countries.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {markets.map(m => (
                  <div key={m.region} className="border border-wheat/35 rounded-sm p-4 hover-lift bg-cream-light">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name={m.icon as IconName} size={15} className="text-lime" fallback="Globe" />
                      <div className="font-semibold text-forest text-xs">{m.region}</div>
                    </div>
                    <div className="text-forest/50 text-[11px] leading-relaxed">{m.countries}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-semibold text-forest mb-5">Packaging & Supply</h3>
              <div className="grid grid-cols-2 gap-3">
                {packagingTypes.map(pt => (
                  <div key={pt.title} className="bg-cream-dark rounded-sm p-4 hover-lift border border-wheat/20">
                    <div className="w-9 h-9 bg-forest rounded-sm flex items-center justify-center mb-3">
                      <Icon name={pt.icon as IconName} size={16} className="text-lime" fallback="Package" />
                    </div>
                    <div className="font-semibold text-forest text-xs mb-1">{pt.title}</div>
                    <div className="text-forest/55 text-[11px] leading-relaxed">{pt.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-forest rounded-sm overflow-hidden">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-forest-mid/60">
              {[
                { icon: "ShieldCheck", title: "Reliable Supply", desc: "Stable volumes, on-time delivery guaranteed" },
                { icon: "Award", title: "Consistent Quality", desc: "Every shipment certified and lab-tested" },
                { icon: "Handshake", title: "Long-term Partnership", desc: "We grow with our clients around the world" },
              ].map(item => (
                <div key={item.title} className="p-8 flex flex-col items-center text-center gap-3">
                  <div className="w-12 h-12 border border-lime/35 rounded-full flex items-center justify-center">
                    <Icon name={item.icon as IconName} size={22} className="text-lime" fallback="Check" />
                  </div>
                  <div className="font-playfair text-lg font-semibold text-cream">{item.title}</div>
                  <div className="text-cream/50 text-xs leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── CERTIFICATIONS ── */}
      <Section id="certifications" className="py-20 md:py-28 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <SectionLabel>Quality Assurance</SectionLabel>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-forest leading-tight">Certifications & Quality</h2>
          </div>
          <div className="section-divider mb-14 max-w-xs mx-auto" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-lime text-white text-[10px] font-bold tracking-[0.2em] uppercase px-4 py-2 mb-6">
                <Icon name="ShieldCheck" size={12} />
                Certified Organic · Healthy Products – Healthy Planet
              </div>
              <ul className="space-y-4">
                {[
                  "EU Organic Certified (ECOCERT standard)",
                  "Traceable from field to final product",
                  "Sustainable farming practices",
                  "Available in organic grains, pulses and oilseeds",
                  "Full phytosanitary documentation package",
                  "Lab-tested every shipment",
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-lime flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name="Check" size={10} className="text-white" />
                    </div>
                    <span className="text-forest/75 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {certBadges.map(cert => (
                <div
                  key={cert.label}
                  className="border-2 rounded-sm p-6 flex flex-col items-center text-center gap-3 hover-lift bg-cream"
                  style={{ borderColor: cert.color + "35" }}
                >
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: cert.color + "12" }}>
                    <Icon name={cert.icon as IconName} size={26} style={{ color: cert.color }} fallback="Award" />
                  </div>
                  <div className="font-semibold text-forest text-sm">{cert.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ── PRIVATE LABEL ── */}
      <Section id="private-label" className="py-20 md:py-28 bg-forest-pattern">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <div className="inline-block text-[10px] font-semibold tracking-[0.3em] uppercase text-lime/80 mb-3">GAVRILOV FOODS</div>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-cream leading-tight">Private Label</h2>
          </div>
          <p className="text-center text-cream/60 mb-12 max-w-lg mx-auto text-sm leading-relaxed">
            We produce and pack grain products under your brand. Custom packaging, your logo, your market — our quality and supply chain.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "Tag", title: "Your Brand", desc: "Full white-label production for retail and foodservice markets worldwide." },
              { icon: "Package", title: "Custom Packaging", desc: "Retail bags 0.5kg–5kg, bulk bags, custom sizes. Design service available." },
              { icon: "Globe", title: "Market-Ready", desc: "Compliant labeling for EU, US, and other markets. Full certification support." },
            ].map(item => (
              <div key={item.title} className="bg-white/6 border border-cream/12 rounded-sm p-7 text-center hover-lift">
                <div className="w-13 h-13 bg-lime/20 rounded-full flex items-center justify-center mx-auto mb-4 w-12 h-12">
                  <Icon name={item.icon as IconName} size={22} className="text-lime" fallback="Tag" />
                </div>
                <h3 className="font-playfair text-xl font-semibold text-cream mb-3">{item.title}</h3>
                <p className="text-cream/55 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a href="#contact" className="btn-lime">Discuss Private Label Partnership</a>
          </div>
        </div>
      </Section>

      {/* ── CONTACT ── */}
      <Section id="contact" className="py-20 md:py-28 bg-cream">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-4">
            <SectionLabel>Get in Touch</SectionLabel>
            <h2 className="font-playfair text-4xl md:text-5xl font-semibold text-forest leading-tight">Contact Us</h2>
          </div>
          <div className="gold-divider mb-14 max-w-xs mx-auto" />

          <div className="grid lg:grid-cols-2 gap-14">
            <div>
              <p className="text-forest/65 text-sm leading-relaxed mb-8">
                Ready to source premium grain products? Contact us for pricing, specifications, certificates, and minimum order quantities. We respond within 24 business hours.
              </p>
              <div className="space-y-5 mb-8">
                {[
                  { icon: "Phone", label: "Phone / WhatsApp", value: "+7 903 790 17 95", href: "tel:+79037901795" },
                  { icon: "Mail", label: "Email", value: "info@gavrilovorganic.com", href: "mailto:info@gavrilovorganic.com" },
                  { icon: "Globe", label: "Website", value: "gavrilovfarm.ru", href: "https://gavrilovfarm.ru" },
                  { icon: "MapPin", label: "Location", value: "Smolensk Region, Russia", href: "#" },
                ].map(item => (
                  <a key={item.label} href={item.href} className="flex items-center gap-4 group">
                    <div className="w-10 h-10 bg-forest rounded-sm flex items-center justify-center flex-shrink-0 group-hover:bg-lime transition-colors duration-200">
                      <Icon name={item.icon as IconName} size={15} className="text-lime group-hover:text-white transition-colors" fallback="Info" />
                    </div>
                    <div>
                      <div className="text-forest/45 text-[10px] tracking-widest uppercase">{item.label}</div>
                      <div className="text-forest font-semibold text-sm">{item.value}</div>
                    </div>
                  </a>
                ))}
              </div>
              <div className="border border-lime/25 rounded-sm p-5 bg-lime/5">
                <div className="flex items-center gap-2 mb-3">
                  <Icon name="MessageCircle" size={16} className="text-lime" />
                  <span className="font-semibold text-forest text-sm">Instant Message</span>
                </div>
                <p className="text-forest/55 text-xs mb-4">Prefer WhatsApp or Telegram? Write us directly:</p>
                <a href="https://wa.me/79037901795" className="btn-lime block text-center text-xs py-3">
                  💬 &nbsp;WhatsApp Chat
                </a>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-20 border border-lime/25 rounded-sm bg-lime/4">
                  <div className="w-16 h-16 bg-lime/20 rounded-full flex items-center justify-center mb-4">
                    <Icon name="CheckCircle" size={30} className="text-lime" />
                  </div>
                  <h3 className="font-playfair text-2xl font-semibold text-forest mb-2">Thank You!</h3>
                  <p className="text-forest/55 text-sm">We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-semibold tracking-widest uppercase text-forest/55 block mb-2">Full Name *</label>
                      <input type="text" required value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full border border-wheat/35 bg-cream-light rounded-sm px-4 py-3 text-forest text-sm focus:outline-none focus:border-lime transition-colors"
                        placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="text-[10px] font-semibold tracking-widest uppercase text-forest/55 block mb-2">Company</label>
                      <input type="text" value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                        className="w-full border border-wheat/35 bg-cream-light rounded-sm px-4 py-3 text-forest text-sm focus:outline-none focus:border-lime transition-colors"
                        placeholder="Your Company" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-forest/55 block mb-2">Email *</label>
                    <input type="email" required value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-wheat/35 bg-cream-light rounded-sm px-4 py-3 text-forest text-sm focus:outline-none focus:border-lime transition-colors"
                      placeholder="you@company.com" />
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-forest/55 block mb-2">Product of Interest</label>
                    <select value={formData.product} onChange={e => setFormData({ ...formData, product: e.target.value })}
                      className="w-full border border-wheat/35 bg-cream-light rounded-sm px-4 py-3 text-forest text-sm focus:outline-none focus:border-lime transition-colors">
                      <option value="">Select product...</option>
                      {products.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
                      <option value="Multiple">Multiple products</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-semibold tracking-widest uppercase text-forest/55 block mb-2">Message</label>
                    <textarea rows={4} value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full border border-wheat/35 bg-cream-light rounded-sm px-4 py-3 text-forest text-sm focus:outline-none focus:border-lime transition-colors resize-none"
                      placeholder="Volume requirements, destination country, packaging preferences..." />
                  </div>
                  <button type="submit" className="btn-primary w-full text-center">
                    Send Inquiry
                  </button>
                  <p className="text-forest/35 text-xs text-center">We respond within 24 business hours</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Section>

      {/* ── FOOTER ── */}
      <footer className="bg-forest py-12 border-t border-forest-mid/50">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            <div>
              <img src={LOGO_URL} alt="Gavrilov Foods" className="h-14 w-auto mb-4" />
              <p className="text-cream/45 text-xs leading-relaxed max-w-xs">
                Russian agricultural producer and exporter of premium grains, pulses and oilseeds. Smolensk Region, Russia.
              </p>
            </div>
            <div>
              <div className="text-cream/35 text-[10px] tracking-[0.25em] uppercase font-semibold mb-4">Navigation</div>
              <div className="grid grid-cols-2 gap-2">
                {navLinks.map(l => (
                  <a key={l.href} href={l.href} className="text-cream/60 text-xs hover:text-lime transition-colors">{l.label}</a>
                ))}
              </div>
            </div>
            <div>
              <div className="text-cream/35 text-[10px] tracking-[0.25em] uppercase font-semibold mb-4">Contact</div>
              <div className="space-y-2 text-xs text-cream/60">
                <div>+7 903 790 17 95</div>
                <div>info@gavrilovorganic.com</div>
                <div>gavrilovfarm.ru</div>
                <div>Smolensk Region, Russia</div>
              </div>
            </div>
          </div>
          <div className="section-divider mb-6" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-cream/30 text-xs">
            <div>© 2025 GAVRILOV FOODS. All rights reserved.</div>
            <div className="font-cormorant italic text-cream/45 text-sm">
              Growing quality. Delivering trust. Building partnership.
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}