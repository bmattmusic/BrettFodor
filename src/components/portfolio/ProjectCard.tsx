// 'use client'

// import Image from 'next/image'
// import { Badge } from '@/components/ui/badge'
// import { motion } from 'framer-motion'
// import { useState } from 'react'
// import { ProjectModal } from './ProjectModal'

// interface ProjectCardProps {
//   title: string
//   description: string
//   image: string
//   tags: string[]
//   url?: string
//   github?: string
// }

// export function ProjectCard(project: ProjectCardProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   return (
//     <>
//       <motion.div
//         whileHover={{ y: -5 }}
//         whileTap={{ scale: 0.98 }}
//         className="group cursor-pointer relative overflow-hidden rounded-lg border bg-white shadow-md transition-all hover:shadow-lg"
//         onClick={() => setIsModalOpen(true)}
//       >
//         <div className="aspect-video relative overflow-hidden">
//           <Image
//             src="/api/placeholder/400/320"
//             alt={project.title}
//             width={400}
//             height={225}
//             className="object-cover transition-transform duration-300 group-hover:scale-105"
//           />
//           <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
//         </div>
//         <div className="p-4">
//           <h3 className="text-lg font-semibold group-hover:text-blue-600 transition-colors">
//             {project.title}
//           </h3>
//           <p className="mt-2 text-sm text-gray-600 line-clamp-2">{project.description}</p>
//           <div className="mt-4 flex flex-wrap gap-2">
//             {project.tags.map((tag) => (
//               <Badge key={tag} variant="secondary">
//                 {tag}
//               </Badge>
//             ))}
//           </div>
//         </div>
//       </motion.div>
      
//       <ProjectModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         project={project}
//       />
//     </>
//   )
// }

// 


// 'use client';

// import Image from 'next/image';
// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { ProjectModal } from './ProjectModal';

// interface ProjectCardProps {
//   title: string;
//   description: string;
//   image: string;
//   tags: string[];
//   url?: string;
//   github?: string;
// }

// export function ProjectCard(project: ProjectCardProps) {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <motion.div
//         whileHover={{ scale: 1.02 }}
//         whileTap={{ scale: 0.98 }}
//         className="group relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800 shadow-md transition-all hover:shadow-xl cursor-pointer"
//         onClick={() => setIsModalOpen(true)}
//       >
//         {/* Animated Background */}
//         <motion.div
//           initial={{ scale: 1 }}
//           whileHover={{ scale: 1.1 }}
//           transition={{ duration: 0.5 }}
//           className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
//         />

//         {/* Project Image */}
//         <motion.div
//           className="relative aspect-video overflow-hidden"
//           whileHover={{ scale: 1.05 }}
//           transition={{ duration: 0.5 }}
//         >
//           <Image
//             src={project.image || '/placeholder.jpg'}
//             alt={project.title || 'Project Image'}
//             fill
//             className="object-cover"
//           />
//         </motion.div>

//         {/* Content */}
//         <div className="relative z-10 p-4">
//           <motion.h3
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.3 }}
//             className="text-lg font-semibold text-gray-900 dark:text-gray-100"
//           >
//             {project.title}
//           </motion.h3>
//           <motion.p
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1, duration: 0.3 }}
//             className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
//           >
//             {project.description}
//           </motion.p>
//         </div>

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
//           <motion.div
//             initial={{ opacity: 0, scale: 0.9 }}
//             whileHover={{ opacity: 1, scale: 1 }}
//             className="text-center text-white"
//           >
//             <h3 className="text-xl font-bold">{project.title}</h3>
//             <p className="mt-2 text-sm">{project.description}</p>
//             <p className="mt-4 font-medium underline">Click to Learn More</p>
//           </motion.div>
//         </div>
//       </motion.div>

//       <ProjectModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         project={project}
//       />
//     </>
//   );
// }


'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ProjectModal } from './ProjectModal';

interface ProjectCardProps {
  title: string;
  description: string;
  hoverDescription?: string; // New property for hover effect text
  hoverTitle: string;
  image: string;
  tags: string[];
  url?: string;
  github?: string;
}

export function ProjectCard(project: ProjectCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="group relative overflow-hidden rounded-lg border bg-white dark:bg-gray-800 shadow-md transition-all hover:shadow-xl cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        {/* Animated Background */}
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-20 group-hover:opacity-30 transition-opacity duration-300"
        />

        {/* Project Image */}
        <motion.div
          className="relative aspect-video overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={project.image || '/assets/placeholder.webp'}
            alt={project.title || 'Project Image'}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 p-4">
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg font-semibold text-gray-900 dark:text-gray-100"
          >
            {project.title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="text-center text-white px-4"
          >
            <h3 className="text-xl font-bold">{project.hoverTitle}</h3>
            <p className="mt-2 text-sm">
              {project.hoverDescription || 'Click to Learn More'}
            </p>
            <p className="mt-4 font-medium underline">Click to Learn More</p>
          </motion.div>
        </div>
      </motion.div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={project}
      />
    </>
  );
}
