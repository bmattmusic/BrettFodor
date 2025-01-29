// src/app/about/page.tsx
'use client'

import { motion } from 'framer-motion'
import { 
  Code, 
  Server, 
  ShoppingCart, 
  Users, 
  Workflow,
  Github,
  Linkedin,
  Mail
} from 'lucide-react'

const skills = [
  {
    icon: <ShoppingCart className="w-6 h-6" />,
    title: "E-commerce Leadership",
    description: "Leading development and operations of $300M+ e-commerce platforms with a focus on scalability and innovation."
  },
  {
    icon: <Code className="w-6 h-6" />,
    title: "Technical Architecture",
    description: "Expertise in headless commerce, microservices architecture, and modern web technologies."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Team Leadership",
    description: "Managing and mentoring cross-functional teams to deliver complex technical solutions."
  },
  {
    icon: <Server className="w-6 h-6" />,
    title: "System Integration",
    description: "Building and integrating complex systems with focus on performance and reliability."
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Product Strategy",
    description: "Driving product vision and strategy from conception to successful market launch."
  }
]

const technologiesAndTools = {
  "Development & Architecture": [
    "Next.js", "React", "TypeScript", "Node.js", "GraphQL",
    "REST APIs", "Microservices", "Event-Driven Architecture",
    "Builder.io", "Headless CMS", "PWAs", "Service Workers", "builder.io"
  ],
  "Cloud & Infrastructure": [
    "AWS", "Azure", "Docker", "Kubernetes", "CI/CD",
    "Jenkins", "GitHub Actions", "Terraform",
    "Load Balancing", "CDN Configuration"
  ],
  "E-commerce & Analytics": [
    "Salesforce Commerce Cloud", "Shopify Plus", "BigCommerce",
    "Stripe", "PayPal", "Google Analytics 4",
    "Amplitude", "Heap", "Adobe Analytics",
    "New Relic", "Datadog"
  ],
  "Product & Design": [
    "Figma", "FigJam", "Adobe XD", "Sketch",
    "Miro", "InVision", "Zeplin",
    "User Flow Mapping", "Wireframing"
  ],
  "Project Management": [
    "Jira", "Confluence", "Monday.com", "Asana",
    "Azure DevOps", "Slack", "Linear",
    "Agile/Scrum", "Kanban"
  ],
  "Testing & Optimization": [
    "Jest", "Cypress", "Playwright",
    "A/B Testing", "Load Testing",
    "Google Optimize", "VWO", "Optimizely"
  ],
  "Enterprise Integration": [
    "ESB/Message Queues", "Apache Kafka",
    "RabbitMQ", "Redis", "Elasticsearch",
    "OAuth/SAML", "Active Directory"
  ]
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
              About Me
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Technical leader specializing in e-commerce development and digital transformation
            </p>
          </div>

          {/* Professional Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              With over a decade of experience in e-commerce and technology leadership, 
              I specialize in building and scaling digital platforms that drive business growth. 
              Currently leading technical operations for joann.com, a $300M e-commerce platform, 
              where I manage complex digital transformations and innovative technical solutions.
            </p>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl group hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-500 mr-3">{skill.icon}</div>
                  <h3 className="text-xl font-bold">{skill.title}</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{skill.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Technologies & Tools Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-16 space-y-8"
          >
            {Object.entries(technologiesAndTools).map(([category, items], categoryIndex) => (
              <div 
                key={category}
                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl"
              >
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {items.map((item, index) => (
                    <motion.span
                      key={item}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index + categoryIndex * 0.2 }}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-default"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Connect Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold mb-6">Let's Connect</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://github.com/brettfodor1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/brett-fodor"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:brett.fodor@gmail.com"
                className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}