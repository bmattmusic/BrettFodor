// 'use client'

// import { ProjectCard } from "@/components/portfolio/ProjectCard"
// import { Badge } from "@/components/ui/badge"
// import { useState } from "react"
// import { motion, AnimatePresence } from "framer-motion"

// const projects = [
//   {
//     title: "joann.com Management",
//     description: "Leading day-to-day management and operation of joann.com, a $300M e-commerce platform. Overseeing technical operations, performance optimization, and team leadership.",
//     image: "/projects/joann.jpg",
//     tags: ["E-commerce", "Leadership", "Technical Operations", "Team Management"],
//     url: "https://www.joann.com"
//   },
//   {
//     title: "Headless Migration Project",
//     description: "Spearheading joann.com's transition to a headless architecture. Managing the complete migration strategy, technical implementation, and performance optimization.",
//     image: "/projects/headless.jpg",
//     tags: ["Next.js", "Headless CMS", "Architecture", "Migration"],
//     url: "https://www.joann.com"
//   },
//   {
//     title: "Ditto Patterns Platform",
//     description: "Led the development and launch of dittopatterns.com from concept to production. Managed product strategy, UX design, and technical implementation.",
//     image: "/projects/ditto.jpg",
//     tags: ["Product Development", "UX Design", "E-commerce", "Strategy"],
//     url: "https://www.dittopatterns.com"
//   },
//   {
//     title: "Smucker Innovation Center",
//     description: "Developed the JM Smucker Innovation Center application and CMS, enabling digital transformation of product innovation processes.",
//     image: "/projects/smucker.jpg",
//     tags: ["CMS Development", "Innovation", "Enterprise Software"],
//   },
//   {
//     title: "Dino Duel",
//     description: "Co-created Dino Duel, a successful board game funded through Kickstarter. Managed game design, production, and crowdfunding campaign.",
//     image: "/projects/dinoduel.jpg",
//     tags: ["Game Design", "Kickstarter", "Product Launch"],
//     url: "https://www.kickstarter.com/projects/caution/dino-duel-a-card-game-with-dice-dinos-and-extincti"
//   }
// ]

// const allTags = Array.from(new Set(projects.flatMap(project => project.tags)))

// export default function PortfolioPage() {
//   const [selectedTags, setSelectedTags] = useState<string[]>([])

//   const filteredProjects = selectedTags.length > 0
//     ? projects.filter(project => 
//         project.tags.some(tag => selectedTags.includes(tag))
//       )
//     : projects

//   const toggleTag = (tag: string) => {
//     setSelectedTags(prev =>
//       prev.includes(tag)
//         ? prev.filter(t => t !== tag)
//         : [...prev, tag]
//     )
//   }

//   return (
//     <div className="container mx-auto px-4 py-12">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-3xl mx-auto mb-12"
//       >
//         <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
//         <p className="text-xl text-gray-600 mb-8">
//           Showcasing my experience in e-commerce development, technical leadership, and product innovation.
//         </p>
        
//         <div className="flex flex-wrap gap-2 mb-8">
//           {allTags.map(tag => (
//             <Badge
//               key={tag}
//               variant={selectedTags.includes(tag) ? "default" : "secondary"}
//               className="cursor-pointer"
//               onClick={() => toggleTag(tag)}
//             >
//               {tag}
//             </Badge>
//           ))}
//         </div>
//       </motion.div>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         <AnimatePresence mode="popLayout">
//           {filteredProjects.map((project) => (
//             <motion.div
//               key={project.title}
//               layout
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               transition={{ duration: 0.2 }}
//             >
//               <ProjectCard {...project} />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </div>
//     </div>
//   )
// }