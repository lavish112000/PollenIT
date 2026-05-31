import { Mail, Send } from 'lucide-react';
import { company, contact, footer, navigation } from '../data/siteContent.js';
import LogoMark from './LogoMark.jsx';

export default function ContactFooter() {
  const companyLinks = navigation
    .filter((item) => ['Resources', 'About'].includes(item.label))
    .sort((a) => (a.label === 'About' ? -1 : 1));

  return (
    <footer id="contact" className="px-4 pb-6 pt-24 sm:px-6 lg:pt-32">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[8px] border border-white/10 shadow-glow">
        <section className="bg-[#0b3f4d] px-5 py-20 text-center md:px-10 lg:py-28">
          <h2 className="text-[clamp(2.2rem,1.2rem+3.6vw,4.8rem)] font-black leading-none text-white">
            {contact.title}
          </h2>
          <p className="mx-auto mt-7 max-w-5xl text-xl leading-8 text-white/76">
            {contact.copy}
          </p>
          <a
            href={`mailto:${footer.contactEmail}`}
            className="mt-10 inline-flex h-14 items-center gap-2 rounded-[8px] bg-ember px-7 text-sm font-black uppercase text-white shadow-ember transition hover:-translate-y-0.5 hover:bg-[#ff7a32]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            {contact.cta}
          </a>
        </section>

        <section className="bg-[#052030] px-5 py-12 md:px-10 lg:py-16">
          <div className="grid gap-10 md:grid-cols-[1.35fr_1fr_1fr_1fr]">
            <div>
              <a href="#top" className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-[8px] border border-white/10 bg-white/[0.04]">
                  <LogoMark />
                </span>
                <span>
                  <span className="block text-xl font-black text-white">
                    {company.name}
                  </span>
                  <span className="block text-xs font-bold uppercase text-white/44">
                    {company.tagline}
                  </span>
                </span>
              </a>
              <p className="mt-6 max-w-xs text-base leading-7 text-white/52">
                {footer.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-white/40">
                SERVICES
              </h3>
              <div className="mt-5 grid gap-3 text-base text-white/70">
                {contact.channels.map((channel) => (
                  <a key={channel} href="#services" className="hover:text-white">
                    {channel}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-white/40">
                COMPANY
              </h3>
              <div className="mt-5 grid gap-3 text-base text-white/70">
                {companyLinks.map((item) => (
                  <a key={item.href} href={item.href} className="hover:text-white">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-black uppercase text-white/40">
                CONTACT
              </h3>
              <div className="mt-5 grid gap-3 text-base text-white/70">
                <a
                  href={`mailto:${footer.contactEmail}`}
                  className="inline-flex items-center gap-2 hover:text-white"
                >
                  <Mail className="h-4 w-4 text-plasma" aria-hidden="true" />
                  {footer.contactEmail}
                </a>
                <a href={`mailto:${footer.contactEmail}`} className="hover:text-white">
                  {footer.sendMessage}
                </a>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-7 text-sm text-white/36 md:flex-row md:items-center md:justify-between">
            <p>{footer.copyright}</p>
            <p>{footer.signoff}</p>
          </div>
        </section>
      </div>
    </footer>
  );
}
