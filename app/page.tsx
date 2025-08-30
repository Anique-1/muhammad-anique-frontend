"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Github,
  Linkedin,
  Code,
  Brain,
  Zap,
  Rocket,
} from "lucide-react"

import { useEffect, useMemo } from "react"

function getRandomParticles(count: number) {
  if (typeof window === "undefined") return [];
  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    duration: Math.random() * 10 + 10,
  }));
}

function FloatingParticles() {
  const [positions, setPositions] = useState<{ x: number; y: number; duration: number }[]>([]);

  useEffect(() => {
    setPositions(getRandomParticles(50));
    // Optionally, you could update positions on window resize
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="absolute inset-0">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#64FFDA] rounded-full"
          initial={{ x: pos.x, y: pos.y }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          transition={{
            duration: pos.duration,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
}

import { useRouter } from "next/navigation"

function GoToChatButton() {
  const router = useRouter();
  return (
    <Button
      size="lg"
      className="bg-gradient-to-r from-[#FF6B6B] to-[#FFD93D] hover:from-[#FFD93D] hover:to-[#FF6B6B] text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
      onClick={() => router.push("/chatpage")}
    >
      Go to Chat
    </Button>
  );
}

export default function Portfolio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  const skills = {
    "AI/ML": ["YOLO", "LangGraph", "OpenAI", "Computer Vision", "Machine Learning"],
    Frontend: ["Next.js", "React.js", "JavaScript", "CSS", "HTML"],
    Backend: ["FastAPI", "Node.js", "Python", "REST APIs"],
    Databases: ["PostgreSQL", "MongoDB", "Vector DBs"],
    Others: ["IoT", "Web Scraping", "Docker", "Azure", "Vercel"],
  }

  const projects = [
    {
      title: "Breakthrough in Autonomous Driving: Precision Road & Lane Detection!",
      description:
        "Fine-tuned YOLO11-seg on custom datasets for road boundaries, lane markings detection with precision accuracy.",
      tech: ["Ultralytics", "YOLO", "Computer Vision"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_computervision-yolo11-ultralytics-activity-7366750128847695875--Ca-?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI-powered FYP Guider Agent!",
      description: "AI agent for final year projects with resume analysis and suggestions for academic success.",
      tech: ["FastAPI", "Next.js", "Azure", "Vercel"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-machinelearning-langgraph-activity-7366430498492940288-xiTH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI-Powered Music Composition Agent",
      description: "Generates melodies, harmonies, lyrics, and MIDI files using advanced AI composition algorithms.",
      tech: ["FastAPI", "Next.js", "LangGraph", "OpenAI"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-musictechnology-langgraph-activity-7364595252453687296-A-pv?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Meal Planning & Recipe Discovery Agent!",
      description: "Personalized meals, recipes, and shopping lists with intelligent dietary recommendations.",
      tech: ["FastAPI", "Next.js", "LangGraph"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-machinelearning-fastapi-activity-7363650917964886016-i8wm?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Parasitic Disease Diagnosis!",
      description: "Detects 8 parasitic infections using AI microscopy with high accuracy medical diagnostics.",
      tech: ["NVIDIA GPU", "YOLO models"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_aiinhealthcare-globalhealth-parasitediagnosis-activity-7362857395896692736-ExgH?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Financial Analysis Agent!",
      description: "Portfolio analysis, risk assessment, and comprehensive financial reports generation.",
      tech: ["LangGraph", "Next.js", "FastAPI"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_fintech-ai-langgraph-activity-7362384521847025664-RLrg?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Happy Independence Pakistan! Celebrating with My Agentic AI Revolution!",
      description: "Digital chronicle of Pakistan's history with AI agents for cultural preservation.",
      tech: ["Next.js", "FastAPI", "Azure", "LangGraph"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_happyindependencepakistan-agenticai-pakistan78-activity-7361645309346639873-Ok-a?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI Content Creation Agent!",
      description: "Generates articles, posts, and SEO optimization with intelligent content strategies.",
      tech: ["FastAPI", "Next.js", "LangGraph"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-contentcreation-langgraph-activity-7361437991170465792-FT4g?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI Research Agent",
      description: "Gathers information, summarizes, and analyzes research papers with intelligent insights.",
      tech: ["Next.js", "FastAPI"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-researchagent-machinelearning-activity-7360626942485708800-rKvW?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI Code Assistant Agent",
      description: "Code generation, bug detection, and documentation with advanced programming assistance.",
      tech: ["LangGraph", "FastAPI", "Next.js", "Docker", "Azure"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-machinelearning-langgraph-activity-7359783502705307648-isO7?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI-powered File Converter Agent!",
      description: "Supports 12+ file format conversions with intelligent optimization and processing.",
      tech: ["FastAPI", "Next.js", "LangGraph"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-langgraph-fastapi-activity-7359091557410467840-hvzk?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Ice Cream Production with AI: Magnum Factory",
      description: "Fine-tuned YOLOv11 for Magnum ice cream detection in industrial production lines.",
      tech: ["Roboflow", "Ultralytics", "NVIDIA"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_computervision-yolov11-ai-activity-7358700407247818752-f7eS?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Football Analytics with AI",
      description: "Fine-tuned YOLO for player and ball tracking with real-time sports analytics.",
      tech: ["Ultralytics YOLOv11", "NVIDIA"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_computervision-yolo-sportstech-activity-7358394782001377281-WX7E?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "AI-Powered NUST University Assistant Agent!",
      description: "Scrapes NUST website for Q&A functionality with intelligent university information system.",
      tech: ["LangGraph", "FastAPI", "React"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-langgraph-nust-activity-7357718458056196096-6MYi?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Image Resizer & Quality Analyzer MCP Server",
      description: "MCP server for image processing and quality analysis with advanced computer vision.",
      tech: ["OpenCV", "PIL", "NumPy"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_mcp-imageprocessing-ai-activity-7355953452969029632-iRu9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Built Fast University Agent!",
      description: "University information system with scraping and RAG for comprehensive academic assistance.",
      tech: ["LangGraph", "FastAPI", "Next.js", "RAG"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-machinelearning-rag-activity-7355508574346719232-gv-9?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "MCP Server - Weather Integration with Claude AI!",
      description: "MCP server for weather API integration with Claude AI for intelligent weather assistance.",
      tech: ["MCP", "Weather API", "Claude AI"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-machinelearning-mcp-activity-7355292074956468224-gfaq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Conjunctiva Disease Detection Agent",
      description: "LLM + YOLO for eye disease detection system with medical diagnostic capabilities.",
      tech: ["Next.js", "FastAPI", "Ultralytics YOLO"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_healthcareai-computervision-machinelearning-activity-7354421722365812736-27zl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
    {
      title: "Dental Teeth Agent",
      description: "YOLO detection + LLM agent for dental diagnostics with comprehensive oral health analysis.",
      tech: ["Next.js", "FastAPI", "Ultralytics YOLO"],
      link: "https://www.linkedin.com/posts/muhammad-anique-300828266_ai-dentaltech-computervision-activity-7354123813338439680-l62X?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEFDGbAB2dL9pweoj_9b-JuCYHdZ_Ye_q4A",
    },
  ]

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#16213E] to-[#1A1A2E]" />
        <motion.div className="absolute inset-0 opacity-30" style={{ y }}>
          <div className="absolute top-20 left-20 w-96 h-96 bg-[#00D4FF] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
          <div className="absolute top-40 right-20 w-96 h-96 bg-[#BB86FC] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-[#64FFDA] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000" />
        </motion.div>

        {/* Floating Particles */}
        <FloatingParticles />
      </div>

      {/* Header */}
      <motion.header
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0B0F1A]/80 border-b border-[#16213E]"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            className="text-2xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
          >
            Muhammad Anique
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-[#E2E8F0] hover:text-[#00D4FF] transition-colors duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-[#E2E8F0]" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-[#16213E] border-t border-[#2D2D3A]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <nav className="flex flex-col space-y-4 p-6">
              {["Home", "About", "Skills", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-[#E2E8F0] hover:text-[#00D4FF] transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </motion.header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] to-[#64FFDA] bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Muhammad Anique
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl text-[#E2E8F0] font-light"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              AI Engineer & Full Stack Developer
            </motion.h2>

            <motion.p
              className="text-lg text-[#94A3B8] max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Innovating with AI to build intelligent solutions that transform industries
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] hover:from-[#BB86FC] hover:to-[#00D4FF] text-white border-0 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                >
                  <Rocket className="mr-2" size={20} />
                  View Projects
                </Button>
                <GoToChatButton />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ChevronDown size={32} className="text-[#64FFDA]" />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent mb-6">
              About Me
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-[#E2E8F0] leading-relaxed">
                Passionate AI Engineer specializing in computer vision, machine learning, and full-stack development. I
                leverage cutting-edge tools like LangGraph, FastAPI, Next.js, and YOLO to create intelligent solutions
                that solve real-world problems.
              </p>

              <div className="grid grid-cols-2 gap-4 text-[#94A3B8]">
                <div className="flex items-center space-x-2">
                  <MapPin size={16} className="text-[#64FFDA]" />
                  <span>Faisalabad, Pakistan</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone size={16} className="text-[#64FFDA]" />
                  <span>(+92) 3367120934</span>
                </div>
              </div>

              <div className="text-[#94A3B8]">
                <p>
                  <strong className="text-[#E2E8F0]">Born:</strong> May 25, 2004
                </p>
                <p>
                  <strong className="text-[#E2E8F0]">Education:</strong> BS Computer Science, University of Agriculture
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
<div className="w-80 h-80 mx-auto relative">
  <div className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-full animate-spin-slow opacity-20"></div>
  <div className="absolute inset-4 bg-[#16213E] rounded-full flex items-center justify-center overflow-hidden">
    <img
      src="\logo.JPG"
      alt="Muhammad Anique Profile"
      className="w-64 h-64 object-cover rounded-full"
      style={{ objectPosition: "center" }}
    />
  </div>
</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent mb-6">
              Skills & Technologies
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#16213E]/50 backdrop-blur-sm border-[#2D2D3A] p-6 hover:bg-[#16213E]/70 transition-all duration-300 group">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-lg">
                      {category === "AI/ML" && <Brain size={20} className="text-white" />}
                      {category === "Frontend" && <Code size={20} className="text-white" />}
                      {category === "Backend" && <Zap size={20} className="text-white" />}
                      {(category === "Databases" || category === "Others") && (
                        <Rocket size={20} className="text-white" />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold text-[#E2E8F0] group-hover:text-[#00D4FF] transition-colors">
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="bg-[#2D2D3A] text-[#94A3B8] hover:bg-[#00D4FF] hover:text-white transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent mb-6">
              Featured Projects
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              Showcasing innovative AI solutions and full-stack applications
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <Card className="bg-[#16213E]/50 backdrop-blur-sm border-[#2D2D3A] p-6 h-full hover:bg-[#16213E]/70 hover:border-[#00D4FF]/50 transition-all duration-300">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-[#E2E8F0] group-hover:text-[#00D4FF] transition-colors text-balance">
                      {project.title}
                    </h3>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge
                          key={tech}
                          variant="outline"
                          className="border-[#2D2D3A] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0B0F1A] transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#00D4FF] hover:text-white hover:bg-[#00D4FF]/20 p-0"
                      asChild
                    >
                      <a href={project.link} className="flex items-center space-x-2">
                        <span>View Project</span>
                        <ExternalLink size={16} />
                      </a>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 z-10">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent mb-6">
              Get In Touch
            </h2>
            <p className="text-lg text-[#94A3B8] max-w-2xl mx-auto">
              Ready to collaborate on your next AI project? Let's build something amazing together.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-lg">
                    <Phone size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">Phone</h3>
                    <p className="text-[#94A3B8]">(+92) 3367120934</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-lg">
                    <MapPin size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">Location</h3>
                    <p className="text-[#94A3B8]">Faisalabad, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-lg">
                    <Mail size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[#E2E8F0]">Email</h3>
                    <p className="text-[#94A3B8]">muhammadanique81@gmail.com</p>
                  </div>
                </div>

<div className="flex space-x-4 pt-4">
  <a
    href="https://www.linkedin.com/in/muhammad-anique-300828266/"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="LinkedIn"
  >
    <Button
      size="sm"
      variant="outline"
      className="border-[#2D2D3A] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-white bg-transparent"
    >
      <Linkedin size={20} />
    </Button>
  </a>
  <a
    href="https://github.com/Anique-1"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="GitHub"
  >
    <Button
      size="sm"
      variant="outline"
      className="border-[#2D2D3A] text-[#00D4FF] hover:bg-[#00D4FF] hover:text-white bg-transparent"
    >
      <Github size={20} />
    </Button>
  </a>
</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="bg-[#16213E]/50 backdrop-blur-sm border-[#2D2D3A] p-8">
<form
  className="space-y-6"
  onSubmit={async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value;

    // Show loading state
    form.querySelector("button[type='submit']")!.textContent = "Sending...";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Message sent successfully!");
        form.reset();
      } else {
        alert("Failed to send message: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Failed to send message: " + (err as Error).message);
    } finally {
      form.querySelector("button[type='submit']")!.textContent = "Send Message";
    }
  }}
>
  <div>
    <label className="block text-sm font-medium text-[#E2E8F0] mb-2">Name</label>
    <input
      type="text"
      name="name"
      required
      className="w-full px-4 py-3 bg-[#2D2D3A] border border-[#2D2D3A] rounded-lg text-[#E2E8F0] focus:border-[#00D4FF] focus:outline-none transition-colors"
      placeholder="Your name"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-[#E2E8F0] mb-2">Email</label>
    <input
      type="email"
      name="email"
      required
      className="w-full px-4 py-3 bg-[#2D2D3A] border border-[#2D2D3A] rounded-lg text-[#E2E8F0] focus:border-[#00D4FF] focus:outline-none transition-colors"
      placeholder="your.email@example.com"
    />
  </div>
  <div>
    <label className="block text-sm font-medium text-[#E2E8F0] mb-2">Message</label>
    <textarea
      rows={4}
      name="message"
      required
      className="w-full px-4 py-3 bg-[#2D2D3A] border border-[#2D2D3A] rounded-lg text-[#E2E8F0] focus:border-[#00D4FF] focus:outline-none transition-colors resize-none"
      placeholder="Tell me about your project..."
    />
  </div>
  <Button
    type="submit"
    className="w-full bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] hover:from-[#BB86FC] hover:to-[#00D4FF] text-white border-0 py-3 font-semibold"
  >
    Send Message
  </Button>
</form>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 border-t border-[#2D2D3A] z-10">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[#94A3B8]">© 2025 Muhammad Anique</p>
            <motion.button
              className="mt-4 p-2 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] rounded-full"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <ChevronDown size={20} className="text-white rotate-180" />
            </motion.button>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
