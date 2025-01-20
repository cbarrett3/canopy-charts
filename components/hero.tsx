import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <div className="relative flex min-h-[500px] items-center justify-between px-4 py-16">
      <div className="max-w-2xl">
        <h1 className="mb-2">
          <span className="block text-5xl font-bold text-red-500">rollup.js</span>
          <span className="mt-2 block text-5xl font-bold text-gray-200">
            The JavaScript
            <br />
            module bundler
          </span>
        </h1>
        <p className="mb-8 mt-4 text-xl text-gray-400">
          Compile small pieces of code into something larger and more complex
        </p>
        <div className="flex gap-4">
          <Button size="lg" className="bg-[#4169E1] hover:bg-[#3154b3]">
            Get Started
          </Button>
          <Button size="lg" variant="secondary" className="bg-[#2A2A2A] text-gray-300 hover:bg-[#353535]">
            View on GitHub
          </Button>
        </div>
      </div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2">
        <div className="relative h-80 w-80">
          <div className="absolute inset-0 rounded-full bg-red-500/20 blur-3xl" />
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZOiunXX9U1mkWVXJC7CUlue9ZXbXcc.png"
            alt="Rollup Logo"
            className="relative h-full w-full"
          />
        </div>
      </div>
    </div>
  )
}

