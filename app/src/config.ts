// ============================================================
// Site Configuration — AgentMaya
// ============================================================

export interface SiteConfig {
  language: string;
  brandName: string;
}

export const siteConfig: SiteConfig = {
  language: "en",
  brandName: "AgentMaya",
};

// ============================================================
// Navigation
// ============================================================

export interface NavLink {
  label: string;
  href: string;
}

export interface NavigationConfig {
  links: NavLink[];
  ctaText: string;
}

export const navigationConfig: NavigationConfig = {
  links: [
    { label: "Agents", href: "#curriculum" },
    { label: "Automation", href: "#cinematic" },
    { label: "Blog", href: "#alumni" },
    { label: "Tools", href: "#tools" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaText: "Get Started",
};

// ============================================================
// Hero
// ============================================================

export interface HeroConfig {
  title: string;
  subtitleLine1: string;
  subtitleLine2: string;
  ctaText: string;
}

export const heroConfig: HeroConfig = {
  title: "AgentMaya",
  subtitleLine1: "The AI automation hub where intelligent agents work for you.",
  subtitleLine2: "Build, deploy, and scale AI workflows.",
  ctaText: "Explore capabilities",
};

// ============================================================
// Capabilities (Curriculum section)
// ============================================================

export interface CapabilityItem {
  title: string;
  slug: string;
  description: string;
  image: string;
}

export interface CapabilitiesConfig {
  sectionLabel: string;
  items: CapabilityItem[];
}

export const capabilitiesConfig: CapabilitiesConfig = {
  sectionLabel: "AI Capabilities",
  items: [
    {
      title: "AI Agents",
      slug: "ai-agents",
      description: "Deploy autonomous AI agents that handle research, scheduling, communication, and complex decision-making. Each agent learns from your feedback to deliver increasingly personalized results.",
      image: "images/capability-1.jpg",
    },
    {
      title: "Task Automation",
      slug: "task-automation",
      description: "Automate repetitive tasks with intelligent workflows that adapt to your patterns. From data entry to report generation, let AI handle the mundane while you focus on what matters.",
      image: "images/capability-2.jpg",
    },
    {
      title: "Workflow Builder",
      slug: "workflow-builder",
      description: "Build complex automation pipelines with our drag-and-drop visual editor. Connect triggers, actions, and conditions to create powerful workflows without writing a single line of code.",
      image: "images/capability-3.jpg",
    },
    {
      title: "Smart Analytics",
      slug: "smart-analytics",
      description: "Track performance, identify patterns, and optimize your workflows with AI-powered insights. Real-time dashboards and predictive analytics help you make data-driven decisions.",
      image: "images/capability-4.jpg",
    },
  ],
};

// ============================================================
// Capability Detail (sub-pages)
// ============================================================

export interface CapabilityDetailData {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

export interface CapabilityDetailConfig {
  sectionLabel: string;
  backLinkText: string;
  prevLabel: string;
  nextLabel: string;
  notFoundText: string;
  capabilities: Record<string, CapabilityDetailData>;
}

export const capabilityDetailConfig: CapabilityDetailConfig = {
  sectionLabel: "Capability",
  backLinkText: "Back to home",
  prevLabel: "Previous",
  nextLabel: "Next",
  notFoundText: "Capability not found.",
  capabilities: {
    "ai-agents": {
      title: "AI Agents",
      subtitle: "Autonomous intelligence for complex tasks.",
      paragraphs: [
        "AgentMaya's AI Agents are autonomous digital workers designed to handle complex, multi-step tasks with minimal human intervention. Each agent is built on a foundation of large language models, reinforced with specialized training for specific domains like research, scheduling, customer support, and data analysis.",
        "What sets our agents apart is their ability to learn and adapt. Through continuous feedback loops, agents refine their understanding of your preferences, communication style, and business logic. Over time, they become increasingly accurate and efficient, effectively becoming extensions of your team.",
        "Agents can work independently or collaboratively, passing information and tasks between each other to solve complex problems. With built-in safety guardrails and full audit trails, you maintain complete visibility and control over every action your agents take.",
      ],
    },
    "task-automation": {
      title: "Task Automation",
      subtitle: "Eliminate repetitive work with intelligent automation.",
      paragraphs: [
        "Task Automation in AgentMaya goes beyond simple rule-based triggers. Our system uses AI to understand the context and intent behind your tasks, enabling smarter automation that adapts to changing conditions and unexpected inputs.",
        "Whether it's processing invoices, managing email responses, generating reports, or synchronizing data across platforms, AgentMaya observes your manual workflows and suggests automation opportunities you might have missed.",
        "The automation engine supports 200+ integrations out of the box, connecting seamlessly with your existing tools. Every automated task is logged and can be reviewed, modified, or rolled back, giving you confidence in your automated processes.",
      ],
    },
    "workflow-builder": {
      title: "Workflow Builder",
      subtitle: "Visual pipeline creation for complex processes.",
      paragraphs: [
        "The Workflow Builder is a visual, node-based editor that lets you design sophisticated automation pipelines without writing code. Drag and drop nodes representing triggers, actions, conditions, and AI processing steps onto an infinite canvas.",
        "Each workflow can branch based on conditions, loop until criteria are met, and handle errors gracefully. The builder includes templates for common patterns like approval flows, data enrichment pipelines, and notification systems.",
        "Workflows can be scheduled, triggered by events, or run on-demand. Real-time execution monitoring shows you exactly where each workflow is in its process, with detailed logs for debugging and optimization.",
      ],
    },
    "smart-analytics": {
      title: "Smart Analytics",
      subtitle: "AI-powered insights for optimization.",
      paragraphs: [
        "Smart Analytics transforms raw workflow data into actionable intelligence. The system automatically identifies bottlenecks, anomalies, and optimization opportunities across your automated processes.",
        "Natural language queries let you ask questions about your data in plain English. 'Which workflow has the highest failure rate this week?' or 'Show me cost savings from automation last month' — get instant, visual answers.",
        "Predictive analytics forecast future trends based on historical patterns, helping you proactively allocate resources and prevent issues before they impact your operations.",
      ],
    },
  },
};

// ============================================================
// Architecture (CinematicVision section)
// ============================================================

export interface ArchitectureConfig {
  sectionLabel: string;
  videoPath: string;
  title: string;
  description: string;
}

export const architectureConfig: ArchitectureConfig = {
  sectionLabel: "AI Automation",
  videoPath: "",
  title: "Intelligent Automation at Enterprise Scale",
  description: "AgentMaya combines cutting-edge AI research with production-grade infrastructure to deliver automation that scales with your business. Our platform processes millions of tasks daily, adapting and learning from each interaction to deliver increasingly intelligent outcomes.",
};

// ============================================================
// Research (AlumniArchives / Blog section)
// ============================================================

export interface ResearchProject {
  title: string;
  year: string;
  discipline: string;
  image: string;
}

export interface ResearchConfig {
  sectionLabel: string;
  projects: ResearchProject[];
}

export const researchConfig: ResearchConfig = {
  sectionLabel: "Latest Blog Posts",
  projects: [
    {
      title: "The Rise of Agentic AI in 2026",
      year: "2026",
      discipline: "AI Research",
      image: "images/research-1.jpg",
    },
    {
      title: "Building Autonomous Workflows",
      year: "2026",
      discipline: "Tutorial",
      image: "images/research-2.jpg",
    },
    {
      title: "LLMs vs Traditional Automation",
      year: "2025",
      discipline: "Comparison",
      image: "images/research-3.jpg",
    },
    {
      title: "AI Tools for Developers",
      year: "2025",
      discipline: "Tools",
      image: "images/research-4.jpg",
    },
    {
      title: "Multi-Agent Orchestration",
      year: "2025",
      discipline: "Architecture",
      image: "images/research-1.jpg",
    },
    {
      title: "Prompt Engineering Best Practices",
      year: "2025",
      discipline: "Guide",
      image: "images/research-2.jpg",
    },
    {
      title: "AI Atlas: Mapping Intelligence",
      year: "2025",
      discipline: "Research",
      image: "images/research-3.jpg",
    },
    {
      title: "The Future of No-Code AI",
      year: "2025",
      discipline: "Opinion",
      image: "images/research-4.jpg",
    },
  ],
};

// ============================================================
// Tools Showcase
// ============================================================

export interface ToolItem {
  name: string;
  icon: string;
  description: string;
}

export interface ToolsConfig {
  sectionLabel: string;
  title: string;
  items: ToolItem[];
}

export const toolsConfig: ToolsConfig = {
  sectionLabel: "AI Toolkit",
  title: "A Complete Arsenal of AI Tools",
  items: [
    { name: "Chat", icon: "MessageSquare", description: "Conversational AI with memory and context" },
    { name: "Write", icon: "PenTool", description: "Generate content in your brand voice" },
    { name: "Code", icon: "Code2", description: "AI-assisted coding and debugging" },
    { name: "Analyze", icon: "BarChart3", description: "Data analysis and visualization" },
    { name: "Search", icon: "Search", description: "Intelligent information retrieval" },
    { name: "Translate", icon: "Globe", description: "Multilingual communication" },
    { name: "Summarize", icon: "FileText", description: "Extract key insights from any content" },
    { name: "Generate", icon: "Sparkles", description: "Create images, code, and ideas" },
  ],
};

// ============================================================
// FAQ
// ============================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  sectionLabel: string;
  title: string;
  items: FAQItem[];
}

export const faqConfig: FAQConfig = {
  sectionLabel: "FAQ",
  title: "Questions? Answered.",
  items: [
    {
      question: "What is AgentMaya and how does it work?",
      answer: "AgentMaya is an AI-powered automation platform that lets you build, deploy, and manage intelligent agents. It combines large language models with workflow automation to handle complex tasks autonomously. You define the goals, and our agents figure out the best way to achieve them.",
    },
    {
      question: "Do I need coding experience to use AgentMaya?",
      answer: "Not at all. AgentMaya features a visual workflow builder that lets you create complex automations through a simple drag-and-drop interface. For developers, we also offer APIs and SDKs for deeper integration and custom functionality.",
    },
    {
      question: "What integrations does AgentMaya support?",
      answer: "AgentMaya integrates with over 200 popular tools including Slack, Notion, GitHub, Google Workspace, Salesforce, Zapier, and many more. We're constantly adding new integrations based on user feedback.",
    },
    {
      question: "Is my data secure with AgentMaya?",
      answer: "Absolutely. We use enterprise-grade encryption, SOC 2 compliance, and offer self-hosted options for organizations with strict data residency requirements. Your data is never used to train our models without explicit consent.",
    },
    {
      question: "Can I try AgentMaya for free?",
      answer: "Yes! We offer a generous free tier that includes access to core features, limited agent runs per month, and community support. No credit card required to get started.",
    },
    {
      question: "How does pricing work for teams?",
      answer: "We offer flexible pricing based on usage and team size. Our Pro plan starts at $29/month per user with unlimited agents and priority support. Enterprise plans include custom integrations, dedicated infrastructure, and SLA guarantees.",
    },
    {
      question: "What makes AgentMaya different from other AI tools?",
      answer: "Unlike single-purpose AI tools, AgentMaya is a comprehensive platform that combines agents, automation, and analytics in one place. Our agents can collaborate, learn from feedback, and handle multi-step workflows that other tools simply cannot.",
    },
    {
      question: "How do I get started?",
      answer: "Simply sign up for a free account, choose a template from our library, or build your first agent from scratch using our visual builder. Most users have their first automation running within 10 minutes.",
    },
  ],
};

// ============================================================
// CTA Banner
// ============================================================

export interface CTABannerConfig {
  headline: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  trustText: string;
}

export const ctaBannerConfig: CTABannerConfig = {
  headline: "Ready to Experience the Future of AI?",
  description: "Join thousands of professionals who have transformed their workflow with AgentMaya. Start your free trial today.",
  primaryCta: "Start Free Trial",
  secondaryCta: "Talk to Sales",
  trustText: "Free forever tier \u00B7 No credit card required \u00B7 Cancel anytime",
};

// ============================================================
// Footer
// ============================================================

export interface FooterLinkColumn {
  title: string;
  links: string[];
}

export interface FooterBottomLink {
  label: string;
  href: string;
}

export interface FooterConfig {
  heading: string;
  columns: FooterLinkColumn[];
  copyright: string;
  bottomLinks: FooterBottomLink[];
}

export const footerConfig: FooterConfig = {
  heading: "Ready to build with AI?",
  columns: [
    {
      title: "Product",
      links: ["AI Agents", "Automation", "Workflow Builder", "Analytics", "Integrations"],
    },
    {
      title: "Resources",
      links: ["Documentation", "Blog", "Tutorials", "API Reference", "Community"],
    },
    {
      title: "Company",
      links: ["About", "Careers", "Press Kit", "Contact"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
  ],
  copyright: "\u00A9 2026 AgentMaya. All rights reserved.",
  bottomLinks: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
  ],
};
