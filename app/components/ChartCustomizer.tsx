import React from 'react'
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Switch } from "./ui/switch"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import { Code, Copy, Check } from "lucide-react"

interface ChartCustomizerProps {
  component: any
  index: number
}

export const ChartCustomizer = ({ component, index }: ChartCustomizerProps) => {
  const [showCode, setShowCode] = useState(false)
  const [copied, setCopied] = useState(false)
  const [customization, setCustomization] = useState(
    component.customizationOptions.reduce((acc: Record<string, any>, option: { name: string; default: any }) => {
      acc[option.name] = option.default
      return acc
    }, {})
  )

  const copyCode = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const updateCustomization = (name: string, value: any) => {
    setCustomization((prev: Record<string, any>) => ({ ...prev, [name]: value }))
  }

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
            <component.icon className="text-blue-600 dark:text-blue-400 h-6 w-6" />
          </div>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">{component.title}</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg">{component.subtitle}</p>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={() => setShowCode(!showCode)} className="flex items-center space-x-2">
            <Code className="h-4 w-4" />
            <span>{showCode ? "Hide Code" : "View Code"}</span>
          </Button>
        </div>
        {showCode && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <Tabs defaultValue="usage">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="usage">Usage Example</TabsTrigger>
                  <TabsTrigger value="customize">Customize</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation</TabsTrigger>
                </TabsList>
                <TabsContent value="usage">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(component.usageExample)}
                      className="absolute top-2 right-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="text-sm p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <code>{component.usageExample}</code>
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="customize">
                  <div className="space-y-4">
                    {component.customizationOptions.map((option: { name: string; label: string; type?: string; default: any; min?: number; max?: number; step?: number; options?: string[] }) => (
                      <div key={option.name} className="flex items-center justify-between">
                        <Label htmlFor={`${component.id}-${option.name}`} className="text-sm font-medium">
                          {option.label}
                        </Label>
                        {option.type === "number" ? (
                          <Input
                            id={`${component.id}-${option.name}`}
                            type="number"
                            value={customization[option.name]}
                            onChange={(e) => updateCustomization(option.name, Number(e.target.value))}
                            className="w-24 text-right"
                          />
                        ) : option.type === "range" ? (
                          <Slider
                            id={`${component.id}-${option.name}`}
                            min={option.min}
                            max={option.max}
                            step={option.step}
                            value={[customization[option.name]]}
                            onValueChange={(value) => updateCustomization(option.name, value[0])}
                            className="w-[200px]"
                          />
                        ) : option.type === "select" ? (
                          <select
                            id={`${component.id}-${option.name}`}
                            value={customization[option.name]}
                            onChange={(e) => updateCustomization(option.name, e.target.value)}
                            className="w-[200px]"
                          >
                            {option.options!.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <Switch
                            id={`${component.id}-${option.name}`}
                            checked={customization[option.name]}
                            onCheckedChange={(checked) => updateCustomization(option.name, checked)}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="implementation">
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyCode(component.implementationCode)}
                      className="absolute top-2 right-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="text-sm p-4 bg-gray-100 dark:bg-gray-800 rounded-md overflow-x-auto">
                      <code>{component.implementationCode}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </motion.div>

      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <Card className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl border border-white/20">
          <div className="h-[400px]">
            <component.component data={component.defaultData} {...customization} />
          </div>
        </Card>
      </motion.div>
    </div>
  )
} 