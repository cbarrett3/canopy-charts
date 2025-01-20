import { Globe, TreesIcon as Tree, Wand2, PlugIcon as Plugin, Wrench, Triangle } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: Globe,
    title: "The Web, Node ...",
    description:
      "Rollup supports many output formats: ES modules, CommonJS, UMD, SystemJS and more. Bundle not only for the web but for many other platforms as well.",
    link: "See all formats",
    href: "#",
  },
  {
    icon: Tree,
    title: "Tree-shaking",
    description:
      "Superior dead code elimination based on deep execution path analysis with the tool that brought tree-shaking to the JavaScript world.",
    link: "Learn about tree-shaking",
    href: "#",
  },
  {
    icon: Wand2,
    title: "Code-splitting without overhead",
    description:
      "Split code based on different entry points and dynamic imports by just using the import mechanism of the output format instead of customer loader code.",
    link: "How to use code-splitting",
    href: "#",
  },
  {
    icon: Plugin,
    title: "Powerful plugins",
    description:
      "An easy to learn plugin API that allows you to implement powerful code injections and transformations with little code. Adopted by Vite and WMR.",
    link: "Learn how to write plugins",
    href: "#",
  },
  {
    icon: Wrench,
    title: "Handles your special needs",
    description:
      "Rollup is not opinionated. Many configuration options and a rich plugin interface make it the ideal bundler for special build flows and higher level tooling.",
    link: "See all options",
    href: "#",
  },
  {
    icon: Triangle,
    title: "The bundler behind Vite",
    description:
      "Developing for the web? Vite pre-configures Rollup for you with sensible defaults and powerful plugins while giving you an insanely fast development server.",
    link: "Check out Vite",
    href: "#",
  },
]

export function Features() {
  return (
    <div className="grid grid-cols-1 gap-6 px-4 py-16 md:grid-cols-2 lg:grid-cols-3">
      {features.map((feature) => (
        <div key={feature.title} className="rounded-lg bg-[#1F1F1F] p-6 hover:bg-[#252525]">
          <feature.icon className="mb-4 h-8 w-8 text-gray-400" />
          <h3 className="mb-2 text-xl font-semibold text-gray-200">{feature.title}</h3>
          <p className="mb-4 text-gray-400">{feature.description}</p>
          <Link href={feature.href} className="text-[#4169E1] hover:text-[#3154b3]">
            {feature.link} →
          </Link>
        </div>
      ))}
    </div>
  )
}

