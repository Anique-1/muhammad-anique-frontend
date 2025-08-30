"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// FloatingParticles utility and component
function getRandomParticles(count: number) {
  const particles = [];
  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
      y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
      duration: 8 + Math.random() * 16,
    });
  }
  return particles;
}

function FloatingParticles() {
  const [positions, setPositions] = useState<{ x: number; y: number; duration: number }[]>([]);

  useEffect(() => {
    const updateParticles = () => {
      setPositions(getRandomParticles(window.innerWidth < 768 ? 15 : 40));
    };
    
    updateParticles();
    window.addEventListener('resize', updateParticles);
    return () => window.removeEventListener('resize', updateParticles);
  }, []);

  if (positions.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-[#64FFDA] rounded-full opacity-60"
          initial={{ x: pos.x, y: pos.y }}
          animate={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1920),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1080),
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

import {
  Send,
  Bot,
  User,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  Copy,
  ExternalLink,
  AlertCircle,
  Menu
} from "lucide-react"

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatPageProps {
  onBack: () => void
}

interface ApiResponse {
  response: string
  session_id: string
  contact_stage?: string
  timestamp: string
}

export default function ChatPage({ onBack }: ChatPageProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `# Welcome to Muhammad Anique's AI Agent!

I'm here to help you learn more about Muhammad's work, projects, and expertise in AI engineering and full-stack development. 

**What can I help you with today?**
- Information about projects and technologies
- Details about AI/ML implementations
- Career background and experience
- Technical questions about specific projects

Feel free to ask me anything!`,
      role: 'assistant',
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [showSuggestions, setShowSuggestions] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Get API URL from environment variable
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Delay focus for mobile to prevent keyboard issues
    if (isMobile) {
      setTimeout(() => inputRef.current?.focus(), 300)
    } else {
      inputRef.current?.focus()
    }
  }, [isMobile])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setIsLoading(true)
    setError('')
    setShowSuggestions(false)

    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto'
    }

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: currentInput,
          session_id: sessionId || undefined
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: ApiResponse = await response.json()

      if (data.session_id && !sessionId) {
        setSessionId(data.session_id)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        role: 'assistant',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('Error calling API:', error)
      setError('Failed to connect to the AI assistant. Please try again.')
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I apologize, but I'm having trouble connecting to the server right now. Please try again in a moment.

**Troubleshooting:**
- Check if the backend server is running on ${API_BASE_URL}
- Verify your internet connection
- Contact support if the issue persists

You can also reach Muhammad directly:
- LinkedIn: https://www.linkedin.com/in/muhammad-anique-300828266/
- GitHub: https://github.com/Anique-1`,
        role: 'assistant',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion)
    setShowSuggestions(false)
    inputRef.current?.focus()
  }

  // Helper to convert plain URLs to clickable links, but skip if already inside an anchor tag
  const urlToLink = (text: string) => {
    // First, protect existing anchor tags by replacing them with placeholders
    const anchorPlaceholders: string[] = [];
    let textWithPlaceholders = text.replace(/<a[^>]*>.*?<\/a>/gi, (match) => {
      const placeholder = `__ANCHOR_${anchorPlaceholders.length}__`;
      anchorPlaceholders.push(match);
      return placeholder;
    });

    // Now convert plain URLs to links
    textWithPlaceholders = textWithPlaceholders.replace(
      /(^|[^"'>=])(https?:\/\/[^\s<>"']+)/gi,
      '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#BB86FC] hover:text-[#00D4FF] underline break-all inline-flex items-center gap-1 transition-colors">$2<svg width="12" height="12" class="flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>'
    );

    // Restore the original anchor tags
    anchorPlaceholders.forEach((anchor, index) => {
      textWithPlaceholders = textWithPlaceholders.replace(`__ANCHOR_${index}__`, anchor);
    });

    return textWithPlaceholders;
  };

  const formatContent = (content: string) => {
    // Process markdown links first
    let formatted = content
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#BB86FC] hover:text-[#00D4FF] underline inline-flex items-center gap-1 transition-colors break-all">$1<svg width="12" height="12" class="flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg></a>')
      .replace(/# (.*$)/gim, '<h1 class="text-lg md:text-xl lg:text-2xl font-bold text-white mb-2 md:mb-3 lg:mb-4 bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] bg-clip-text text-transparent leading-tight">$1</h1>')
      .replace(/## (.*$)/gim, '<h2 class="text-base md:text-lg lg:text-xl font-semibold text-[#E2E8F0] mb-2 md:mb-3 flex items-center leading-tight"><span class="w-1 h-1 md:w-1.5 md:h-1.5 lg:w-2 lg:h-2 bg-[#64FFDA] rounded-full mr-1.5 md:mr-2 flex-shrink-0"></span>$1</h2>')
      .replace(/### (.*$)/gim, '<h3 class="text-sm md:text-base lg:text-lg font-medium text-[#E2E8F0] mb-1.5 md:mb-2 leading-tight">$1</h3>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00D4FF] font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-[#64FFDA] italic">$1</em>')
      .replace(/`(.*?)`/g, '<code class="bg-[#2D2D3A] text-[#64FFDA] px-1 py-0.5 rounded text-xs md:text-sm font-mono">$1</code>')
      .replace(/^- (.*$)/gim, '<div class="flex items-start space-x-2 mb-1 text-sm md:text-base"><span class="text-[#64FFDA] mt-0.5 flex-shrink-0">•</span><span class="leading-relaxed">$1</span></div>')
      .replace(/^(\d+)\. (.*$)/gim, '<div class="flex items-start space-x-2 mb-1 text-sm md:text-base"><span class="text-[#BB86FC] font-semibold min-w-[16px] md:min-w-[20px] flex-shrink-0">$1.</span><span class="leading-relaxed">$2</span></div>')
      .replace(/\n\n/g, '<div class="h-2 md:h-3"></div>')
      .replace(/\n/g, '<br>');
    
    // Convert plain URLs to links (avoiding already processed markdown links)
    return urlToLink(formatted);
  };

  // Format user messages to make URLs clickable and preserve line breaks
  const formatUserContent = (content: string) => {
    return urlToLink(content).replace(/\n/g, '<br>');
  };

  const copyToClipboard = async (text: string) => {
    try {
      const cleanText = text.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(cleanText)
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea')
        textArea.value = cleanText
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        document.execCommand('copy')
        document.body.removeChild(textArea)
      }
    } catch (error) {
      console.error('Failed to copy text:', error)
    }
  }

  const clearError = () => {
    setError('')
  }

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto'
    const newHeight = Math.min(textarea.scrollHeight, isMobile ? 100 : 128)
    textarea.style.height = newHeight + 'px'
  }

  return (
    <div className="min-h-screen bg-[#0B0F1A] text-white relative overflow-hidden">
      {/* Animated Background - Optimized for mobile */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#16213E] to-[#1A1A2E]" />
        <div className="absolute top-4 md:top-10 lg:top-20 left-4 md:left-10 lg:left-20 w-32 md:w-48 lg:w-96 h-32 md:h-48 lg:h-96 bg-[#00D4FF] rounded-full mix-blend-multiply filter blur-xl opacity-5 md:opacity-10 animate-pulse" />
        <div className="absolute top-8 md:top-20 lg:top-40 right-4 md:right-10 lg:right-20 w-32 md:w-48 lg:w-96 h-32 md:h-48 lg:h-96 bg-[#BB86FC] rounded-full mix-blend-multiply filter blur-xl opacity-5 md:opacity-10 animate-pulse delay-1000" />
        <div className="absolute bottom-4 md:bottom-10 lg:bottom-20 left-1/2 w-32 md:w-48 lg:w-96 h-32 md:h-48 lg:h-96 bg-[#64FFDA] rounded-full mix-blend-multiply filter blur-xl opacity-5 md:opacity-10 animate-pulse delay-2000" />
        <FloatingParticles />
      </div>

      <div className="relative z-10 h-screen flex flex-col">
        {/* Header - Mobile optimized */}
        <motion.header
          className="backdrop-blur-md bg-[#0B0F1A]/90 border-b border-[#16213E]/50 p-3 md:p-4 safe-area-top"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between w-full max-w-6xl mx-auto">
            <motion.button
              onClick={onBack}
              className="flex items-center space-x-1 md:space-x-2 text-[#E2E8F0] hover:text-[#00D4FF] transition-colors text-sm md:text-base p-1 rounded-md"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowLeft size={18} className="md:w-5 md:h-5" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </motion.button>

            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-1 md:space-x-2">
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${error ? 'bg-red-500' : 'bg-[#64FFDA]'} animate-pulse`} />
                <span className="text-xs md:text-sm text-[#64FFDA]">
                  {error ? 'Offline' : 'Online'}
                </span>
              </div>
              
              {/* Session Info - Hidden on mobile */}
              {sessionId && (
                <div className="text-xs text-[#94A3B8] hidden md:block">
                  Session: {sessionId.slice(0, 8)}...
                </div>
              )}
            </div>
          </div>
        </motion.header>

        {/* Error Banner - Mobile optimized */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-red-500/10 border-b border-red-500/20 p-2 md:p-3"
            >
              <div className="max-w-6xl mx-auto flex items-start justify-between">
                <div className="flex items-start space-x-2 flex-1 min-w-0">
                  <AlertCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-xs md:text-sm text-red-400 break-words">{error}</span>
                </div>
                <button
                  onClick={clearError}
                  className="text-red-400 hover:text-red-300 text-xs md:text-sm underline flex-shrink-0 ml-2 p-1"
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Messages - Mobile optimized scrolling */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto p-2 md:p-4 w-full"
          style={{ 
            WebkitOverflowScrolling: 'touch',
            overscrollBehavior: 'contain'
          }}
        >
          <div className="max-w-4xl mx-auto space-y-2 md:space-y-4 pb-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-2 md:space-x-3 w-full max-w-[90%] md:max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {/* Avatar - Mobile optimized */}
                    <div className={`flex-shrink-0 w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center shadow-lg ${
                      message.role === 'user' 
                        ? 'bg-gradient-to-r from-[#BB86FC] to-[#64FFDA]' 
                        : 'bg-gradient-to-r from-[#00D4FF] to-[#BB86FC]'
                    }`}>
                      {message.role === 'user' ? (
                        <User size={14} className="text-white md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Bot size={14} className="text-white md:w-4 md:h-4 lg:w-5 lg:h-5" />
                      )}
                    </div>

                    {/* Message Content - Mobile optimized */}
                    <Card className={`backdrop-blur-md border-[#2D2D3A]/50 p-2.5 md:p-3 lg:p-4 flex-1 min-w-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-[#BB86FC]/15 to-[#64FFDA]/15 border-[#BB86FC]/30'
                        : 'bg-[#16213E]/40 border-[#00D4FF]/20'
                    } hover:bg-opacity-80 transition-all duration-300 group relative shadow-lg`}>
                      {/* Copy Button - Mobile friendly */}
                      <button
                        onClick={() => copyToClipboard(message.content)}
                        className="absolute top-1.5 right-1.5 md:top-2 md:right-2 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1.5 md:p-1 hover:bg-[#2D2D3A]/50 rounded touch-manipulation"
                        title="Copy message"
                      >
                        <Copy size={12} className="text-[#94A3B8] hover:text-[#00D4FF] md:w-3 md:h-3" />
                      </button>

                      <div
                        className={`prose prose-sm max-w-none text-sm md:text-base break-words overflow-wrap-anywhere ${
                          message.role === 'user' ? 'text-[#E2E8F0]' : 'text-[#E2E8F0]'
                        }`}
                        style={{ 
                          wordBreak: 'break-word',
                          overflowWrap: 'anywhere',
                          hyphens: 'auto'
                        }}
                        dangerouslySetInnerHTML={{
                          __html: message.role === 'user' 
                            ? formatUserContent(message.content)
                            : formatContent(message.content)
                        }}
                      />
                      
                      <div className={`text-xs mt-2 opacity-60 ${
                        message.role === 'user' ? 'text-right text-[#94A3B8]' : 'text-[#94A3B8]'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </Card>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading Indicator - Mobile optimized */}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2 md:space-x-3 max-w-[90%] md:max-w-[85%]">
                  <div className="w-7 h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] flex items-center justify-center shadow-lg">
                    <Bot size={14} className="text-white md:w-4 md:h-4 lg:w-5 lg:h-5" />
                  </div>
                  <Card className="backdrop-blur-md bg-[#16213E]/40 border-[#00D4FF]/20 p-2.5 md:p-3 lg:p-4 shadow-lg">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#00D4FF] rounded-full animate-bounce" />
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#BB86FC] rounded-full animate-bounce delay-100" />
                        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#64FFDA] rounded-full animate-bounce delay-200" />
                      </div>
                      <span className="text-xs md:text-sm text-[#94A3B8]">AI is thinking...</span>
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area - Mobile optimized */}
        <motion.div
          className="backdrop-blur-md bg-[#0B0F1A]/95 border-t border-[#16213E]/50 p-3 md:p-4 safe-area-bottom"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ 
            paddingBottom: isMobile ? 'max(12px, env(safe-area-inset-bottom))' : undefined
          }}
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-end space-x-2 md:space-x-3">
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value)
                    adjustTextareaHeight(e.target)
                  }}
                  onKeyPress={handleKeyPress}
                  placeholder={isMobile ? "Ask about Muhammad's work..." : "Ask me about Muhammad's projects, skills, or experience..."}
                  className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#16213E]/60 backdrop-blur-sm border border-[#2D2D3A]/50 rounded-xl text-[#E2E8F0] placeholder-[#94A3B8] focus:border-[#00D4FF]/50 focus:outline-none focus:ring-2 focus:ring-[#00D4FF]/20 transition-all duration-300 resize-none text-sm md:text-base overflow-y-auto touch-manipulation"
                  disabled={isLoading}
                  rows={1}
                  style={{ 
                    height: 'auto',
                    minHeight: isMobile ? '40px' : '44px',
                    maxHeight: isMobile ? '100px' : '128px',
                    WebkitAppearance: 'none',
                    fontSize: isMobile ? '16px' : undefined // Prevents zoom on iOS
                  }}
                />
                {input && !isMobile && (
                  <div className="absolute right-2 bottom-1 text-xs text-[#94A3B8] pointer-events-none">
                    Press Enter to send
                  </div>
                )}
              </div>
              
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-[#00D4FF] to-[#BB86FC] hover:from-[#BB86FC] hover:to-[#00D4FF] text-white border-0 px-3 md:px-4 lg:px-6 py-2.5 md:py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex-shrink-0 touch-manipulation min-h-[40px] md:min-h-[44px]"
                style={{ minWidth: isMobile ? '44px' : '60px' }}
              >
                <Send size={16} className="md:w-[18px] md:h-[18px]" />
                {!isMobile && <span className="ml-2 hidden lg:inline">Send</span>}
              </Button>
            </div>
            
            <div className="flex items-center justify-between mt-2 text-xs md:text-sm text-[#94A3B8]">
              <div className="flex items-center space-x-1">
                <Sparkles size={10} className="md:w-3 md:h-3 flex-shrink-0" />
                <span className="truncate">
                  {isMobile ? "AI Assistant" : "Powered by AI • Ask me anything about Muhammad's work"}
                </span>
              </div>
              {isMobile && input && (
                <div className="text-xs text-[#64FFDA] opacity-60">
                  Tap send →
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile-specific styles */}
      <style jsx global>{`
        @media (max-width: 768px) {
          /* Prevent zoom on input focus for iOS */
          input, textarea, select {
            font-size: 16px !important;
          }
          
          /* Improve touch targets */
          button, a, [role="button"] {
            min-height: 44px;
          }
          
          /* Smooth scrolling for mobile */
          .overflow-y-auto {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
          
          /* Fix viewport height on mobile */
          .min-h-screen {
            min-height: 100vh;
            min-height: -webkit-fill-available;
          }
          
          /* Prevent horizontal scroll */
          body {
            overflow-x: hidden;
          }
        }
        
        /* iOS specific fixes */
        @supports (-webkit-touch-callout: none) {
          .min-h-screen {
            min-height: -webkit-fill-available;
          }
        }
      `}</style>
    </div>
  )
}