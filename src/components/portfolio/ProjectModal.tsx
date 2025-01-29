// // src/components/portfolio/ProjectModal.tsx
// 'use client'

// import Image from 'next/image'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Badge } from '@/components/ui/badge'
// import { X } from 'lucide-react'

// interface ProjectModalProps {
//   isOpen: boolean
//   onClose: () => void
//   project: {
//     title: string
//     description: string
//     image: string
//     tags: string[]
//     url?: string
//     github?: string
//   }
// }

// export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black z-40"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-2xl bg-white rounded-lg shadow-xl z-50 overflow-hidden"
//           >
//             <div className="relative aspect-video">
//               <Image
//                 src="/api/placeholder/800/450"
//                 alt={project.title}
//                 width={800}
//                 height={450}
//                 className="object-cover"
//               />
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
//               <p className="text-gray-600 mb-6">{project.description}</p>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {project.tags.map((tag) => (
//                   <Badge key={tag} variant="secondary">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="flex gap-4">
//                 {project.url && (
//                   <a
//                     href={project.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 hover:text-blue-800"
//                   >
//                     Visit Project →
//                   </a>
//                 )}
//                 {project.github && (
//                   <a
//                     href={project.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 hover:text-gray-800"
//                   >
//                     View Code →
//                   </a>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   )
// }


// 'use client';

// import Image from 'next/image';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Badge } from '@/components/ui/badge';
// import { X } from 'lucide-react';

// interface ProjectModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   project: {
//     title: string;
//     description: string;
//     image: string;
//     tags: string[];
//     url?: string;
//     github?: string;
//   };
// }

// export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <>
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 0.5 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 bg-black z-40"
//             onClick={onClose}
//           />
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95, y: 20 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.95, y: 20 }}
//             className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
//           >
//             <div className="relative aspect-video">
//               <Image
//                 src={project.image || '/placeholder.jpg'} // Use dynamic image or fallback
//                 alt={project.title || 'Project Image'}
//                 width={800}
//                 height={450}
//                 className="object-cover"
//               />
//               <button
//                 onClick={onClose}
//                 className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
//               >
//                 <X size={20} />
//               </button>
//             </div>
//             <div className="p-6">
//               <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
//                 {project.title}
//               </h2>
//               <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
//                 {project.description}
//               </p>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {project.tags.map((tag) => (
//                   <Badge key={tag} variant="secondary">
//                     {tag}
//                   </Badge>
//                 ))}
//               </div>
//               <div className="flex gap-4">
//                 {project.url && (
//                   <a
//                     href={project.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 dark:text-blue-400 hover:underline"
//                   >
//                     Visit Project →
//                   </a>
//                 )}
//                 {project.github && (
//                   <a
//                     href={project.github}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-gray-600 dark:text-gray-400 hover:underline"
//                   >
//                     View Code →
//                   </a>
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </>
//       )}
//     </AnimatePresence>
//   );
// }


'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    image: string;
    tags: string[];
    url?: string;
    github?: string;
  };
}

export function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Modal Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-40"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div
              className="relative w-full max-w-3xl bg-gray-900 text-white rounded-lg shadow-lg overflow-hidden"
              style={{
                maxHeight: '90vh', // Restrict modal height
              }}
            >
              {/* Header: Image with Close Button */}
              <div className="relative aspect-video">
                <Image
                  src={project.image || '/assets/placeholder.webp'}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div
                className="p-6 overflow-y-auto"
                style={{
                  maxHeight: 'calc(90vh - 56px)', // Subtract header height from max modal height
                }}
              >
                <h2 className="text-2xl font-bold">{project.title}</h2>
                <p className="text-gray-300 mt-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-blue-600 text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-6">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 hover:text-blue-300 underline"
                    >
                      Visit Project →
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-300 underline"
                    >
                      View Code →
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
