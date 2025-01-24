import * as Icons from "lucide-react"
import Link from "next/link"

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-border/40">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/80 dark:from-[#1B1B1B] dark:via-[#1B1B1B] dark:to-[#161616]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          {/* Main Info */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-lg font-semibold text-foreground">Canopy Charts</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-md">
              A modern data visualization library built with D3.js and React. Designed for developers who value clean code, performance, and accessibility.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link 
                href="https://github.com/cbarrett3/canopy-charts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted transition-colors"
              >
                <Icons.Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link 
                href="https://twitter.com/canopycharts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted transition-colors"
              >
                <Icons.Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link 
                href="https://www.npmjs.com/package/canopy-charts" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md hover:bg-muted transition-colors"
              >
                <Icons.PackageCheck className="h-4 w-4" />
                <span className="sr-only">NPM</span>
              </Link>
            </div>
          </div>

          {/* Documentation */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Documentation</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/docs/getting-started" className="text-muted-foreground hover:text-foreground transition-colors">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/docs/components" className="text-muted-foreground hover:text-foreground transition-colors">
                  Components
                </Link>
              </li>
              <li>
                <Link href="/docs/examples" className="text-muted-foreground hover:text-foreground transition-colors">
                  Examples
                </Link>
              </li>
              <li>
                <Link href="/docs/api" className="text-muted-foreground hover:text-foreground transition-colors">
                  API Reference
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground">Resources</h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap
                </Link>
              </li>
              <li>
                <Link href="https://github.com/cbarrett3/canopy-charts/releases" className="text-muted-foreground hover:text-foreground transition-colors">
                  Releases
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              {new Date().getFullYear()} Canopy Charts. Released under the MIT License.
            </p>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/security" className="hover:text-foreground transition-colors">
                Security
              </Link>
              <Link href="/status" className="hover:text-foreground transition-colors">
                Status
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
