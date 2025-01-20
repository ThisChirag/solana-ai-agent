import { Code, Terminal, GraduationCap, MessageSquare, Zap, Shield } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { Button } from "./ui/button";

interface Feature {
  name: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  gradient: string;
}

interface Showcase {
  title: string;
  examples: string[];
}

const showcase: Showcase = {
  title: "What can you ask?",
  examples: [
    "How do I create an NFT marketplace contract?",
    "Explain Solana's account model",
    "Help me deploy my program using Solana Playground",
    "What are PDAs and when should I use them?",
    "Debug my token swap program",
    "Show me how to implement cross-program invocation"
  ]
};

const features: Feature[] = [
  {
    name: "Smart Contract Generation",
    description: "Transform your ideas into Solana programs through simple conversation. Describe what you want to build and get production-ready Rust code.",
    icon: Code,
    gradient: "from-[#9945FF] to-[#14F195]"
  },
  {
    name: "Playground Expert",
    description: "Learn how to make the most of Solana Playground's features. Get guidance on program development, testing, and deployment.",
    icon: Terminal,
    gradient: "from-[#14F195] to-[#9945FF]"
  },
  {
    name: "Interactive Learning",
    description: "Master Solana concepts, Rust, and blockchain fundamentals through natural dialogue. Perfect for both beginners and experienced developers.",
    icon: GraduationCap,
    gradient: "from-[#8752F3] to-[#14F195]"
  },
  {
    name: "Code Companion",
    description: "Get instant help with code reviews, debugging, and optimization. Understand best practices and avoid common pitfalls.",
    icon: MessageSquare,
    gradient: "from-[#14F195] to-[#8752F3]"
  },
  {
    name: "Quick Answers",
    description: "Stuck on a problem? Get immediate, context-aware responses about Solana development, from account models to PDAs.",
    icon: Zap,
    gradient: "from-[#9945FF] to-[#8752F3]"
  },
  {
    name: "Development Guide",
    description: "Follow best practices in security, performance, and code structure with AI-powered recommendations.",
    icon: Shield,
    gradient: "from-[#8752F3] to-[#9945FF]"
  }
];

export const Features = () => {
  return (
    <div className="bg-white py-4 sm:py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base font-semibold leading-7 text-[#9945FF]">
            Everything you need
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Need help with Solana development? Ask anything.
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chat with an AI that understands Solana Playground inside out. From basic concepts to complex smart contracts, get expert assistance in seconds.
          </p>
          <div className="mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-[#9945FF] text-[#9945FF] hover:bg-[#9945FF] hover:text-white">
                  What can you ask?
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h3 className="font-medium text-lg">{showcase.title}</h3>
                  <ul className="space-y-2">
                    {showcase.examples.map((example: string, i: number) => (
                      <li key={i} className="text-sm text-gray-600 hover:text-[#9945FF] cursor-pointer transition-colors">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <img
            src="/Solana-Playground.png"
            alt="App screenshot"
            className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
            width={2432}
            height={1442}
          />
          <div className="relative" aria-hidden="true">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
          {features.map((feature) => (
            <div 
              key={feature.name}
              className="relative group p-6 rounded-2xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-gray-200"
            >
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
              <div className="relative">
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${feature.gradient}`}>
                  <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold leading-7 text-gray-900">
                  {feature.name}
                </h3>
                <p className="mt-2 text-base leading-7 text-gray-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
