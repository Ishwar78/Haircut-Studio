import { Link } from "react-router-dom";
import { Scissors, Instagram, Twitter, Youtube, Facebook } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/20 backdrop-blur-lg">
    <div className="container mx-auto px-4 lg:px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Scissors className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              Glow<span className="gradient-text">Cut</span>
            </span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Experience the future of hairstyling with our AI-powered virtual try-on platform.
          </p>
          <div className="flex gap-3 mt-5">
            {[Instagram, Twitter, Youtube, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:glow-primary transition-all duration-300">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {[
          { title: "Platform", links: [["Explore Styles", "/explore"], ["Try Now", "/try-now"], ["Services", "/services"]] },
          { title: "Company", links: [["About Us", "/about"], ["Contact", "/contact"], ] },
          { title: "Legal", links: [["Privacy Policy", "/privacy"], ["Terms of Service", "/term"]] },
        ].map((section) => (
          <div key={section.title}>
            <h3 className="font-display font-semibold text-foreground mb-4">{section.title}</h3>
            <ul className="space-y-3">
              {section.links.map(([label, path]) => (
                <li key={label}>
                  <Link to={path} className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} GlowCut Studio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
