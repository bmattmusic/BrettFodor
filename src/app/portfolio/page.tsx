import { ProjectCard } from "@/components/portfolio/ProjectCard";

const projects = [
  {
    title: "joann.com Management",
    description:
      "Leading day-to-day management and operation of joann.com, a $300M e-commerce platform. Overseeing technical operations, performance optimization, and team leadership.",
    hoverTitle:"JOANN",
    hoverDescription:"Dive deeper into what it takes to operate the product teams responsible for a $300M+ e-commerce platform.",
    image: "/assets/ecom.webp",
    tags: ["E-commerce", "Leadership", "Technical Operations", "Team Management"],
    url: "https://www.joann.com",
  },
  {
    title: "Headless Migration Project",
    description:
      "Spearheading joann.com's transition to a headless architecture. Managing the complete migration strategy, technical implementation, and performance optimization.",
    hoverTitle:"Headless React Migration",
    hoverDescription:"Explore the multi-million dollar headless migration from a monolithic SFRA architecture to a modern React Framework",
    image: "/assets/headless.webp",
    tags: ["Next.js", "Headless CMS", "Architecture", "Migration"],
    url: "https://www.joann.com",
  },
  {
    title: "Ditto Patterns Platform",
    description:
      "Led the development and launch of dittopatterns.com from concept to production. Managed product strategy, UX design, and technical implementation.",
    hoverTitle:"DITTO",
    hoverDescription:"A revolutionary product for seamstresses and sewists",
    image: "/assets/ditto.webp",
    tags: ["Product Development", "UX Design", "E-commerce", "Strategy"],
    url: "https://www.dittopatterns.com",
  },
  {
    title: "Smucker Innovation Center",
    description:
      "Developed the JM Smucker Innovation Center application and CMS, enabling digital transformation of product innovation processes.",
    hoverTitle:"Innovation",
    hoverDescription:"The virtual playground for exploring your flavor profile and custom product recommendations",
    image: "/assets/innovation.webp",
    tags: ["CMS Development", "Innovation", "Enterprise Software"],
    url: "https://www.jmsmucker.com",
  },
  {
    title: "Vigeo Gardens Hydroponic Pod Farm Monitoring System",
    description:"A cutting-edge MVP solution for hydroponic farming. This IoT-driven system monitors critical environmental metrics like temperature, humidity, and light levels, displaying them on a modern dashboard with real-time alerts to ensure optimal growth conditions for lettuce and other crops.",
    hoverTitle:"IoT-Enabled Hydroponics Dashboard",
    hoverDescription:"Growing Embryos in heads of lettuce is as complicated as it sounds. Learn about the IOT product and platform that enabled VG to create amazing innovation in hydroponic farming",
    image: "/assets/vigeo.webp",
    tags: ["Game Design", "Kickstarter", "Product Launch"],
    url: "https://vigeogardens.com",
  },
  {
    title: "Dino Duel – Board Game Development & Global Fulfillment",
    description:
      "As the Founder and COO of the Dino Duel project, I led the end-to-end product management of a successful Kickstarter-funded board game. The campaign raised $83,000, exceeding its initial funding goal, and resulted in the fulfillment of 6,000 orders globally. Dino Duel combined engaging gameplay mechanics with strategic appeal, delivering a product that resonated with players across various demographics. Despite challenges like a COVID-related disruption of a major distribution deal, the project demonstrated exceptional planning, adaptability, and customer focus.",
    hoverTitle:"Dino Duel – Concept to Global Success",
    hoverDescription:"Explore how I guided the creation of a Kickstarter-funded board game from idea to market, raising $83K, fulfilling 6,000 orders globally, and navigating the challenges of international distribution.",
    image: "/assets/dino.webp",
    tags: ["Game Design", "Kickstarter", "Product Launch"],
    url: "https://www.kickstarter.com/projects/caution/dino-duel-a-card-game-with-dice-dinos-and-extincti",
  },
  
];

export default function PortfolioPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="text-center max-w-2xl mx-auto mb-16">
      <h1 className="text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
          Portfolio
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          Showcasing my experience in e-commerce development, technical
          leadership, and product innovation.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.title} {...project} />
        ))}
      </div>
    </div>
  );
}
