import React, { useState, useCallback } from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Switch } from "./ui/switch"
import { Slider } from "./ui/slider"
import { Label } from "./ui/label"
import { Code, Copy, Check, Maximize2, Minimize2, Save, Share2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

interface ChartCustomizerProps {
   component: any
   index: number
}

export const ChartCustomizer = ({ component, index }: ChartCustomizerProps) => {
   const [copied, setCopied] = useState(false)
   const [isFullscreen, setIsFullscreen] = useState(false)
   const [customization, setCustomization] = useState(() =>
      component.customizationOptions.reduce((acc: Record<string, any>, option: { name: string; default: any }) => {
         acc[option.name] = option.default
         return acc
      }, {})
   )
   const [presetName, setPresetName] = useState("")
   const [savedPresets, setSavedPresets] = useState<Record<string, any>>({})

   const copyCode = useCallback(async (code: string) => {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
   }, [])

   const updateCustomization = (name: string, value: any) => {
      setCustomization(prev => ({ ...prev, [name]: value }))
   }

   const savePreset = () => {
      if (presetName.trim()) {
         setSavedPresets(prev => ({
            ...prev,
            [presetName]: customization
         }))
         setPresetName("")
      }
   }

   const loadPreset = (name: string) => {
      setCustomization(savedPresets[name])
   }

   return (
      <Card className={`
      ${isFullscreen ? 'fixed inset-4 z-50 overflow-auto' : 'relative'} 
      bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm 
      shadow-xl hover:shadow-2xl transition-all duration-300 
      rounded-xl border border-white/20
    `}>
         <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
               <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                     <component.icon className="text-blue-600 dark:text-blue-400 h-6 w-6" />
                  </div>
                  <div>
                     <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
                        {component.title}
                     </h2>
                     <p className="text-sm text-gray-600 dark:text-gray-400">
                        {component.subtitle}
                     </p>
                  </div>
               </div>

               <TooltipProvider>
                  <Tooltip>
                     <TooltipTrigger asChild>
                        <Button
                           variant="ghost"
                           size="icon"
                           onClick={() => setIsFullscreen(!isFullscreen)}
                        >
                           {isFullscreen ?
                              <Minimize2 className="h-4 w-4" /> :
                              <Maximize2 className="h-4 w-4" />
                           }
                        </Button>
                     </TooltipTrigger>
                     <TooltipContent>
                        <p>{isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}</p>
                     </TooltipContent>
                  </Tooltip>
               </TooltipProvider>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <div className="h-[400px]">
                  <component.component
                     data={component.defaultData}
                     {...customization}
                  />
               </div>

               <div className="space-y-6">
                  <Tabs defaultValue="preview" className="w-full">
                     <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="customize">Customize</TabsTrigger>
                        <TabsTrigger value="code">Code</TabsTrigger>
                        <TabsTrigger value="presets">Presets</TabsTrigger>
                     </TabsList>

                     <TabsContent value="preview" className="space-y-4">
                        <div className="p-4 space-y-4">
                           <p className="text-gray-600 dark:text-gray-400">
                              Current visualization settings and data overview.
                           </p>
                           <div className="grid grid-cols-2 gap-4">
                              {Object.entries(customization).map(([key, value]) => (
                                 <div key={key} className="p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                    <Label className="text-sm text-gray-500">{key}</Label>
                                    <p className="font-medium">{String(value)}</p>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </TabsContent>

                     <TabsContent value="customize" className="space-y-6">
                        {component.customizationOptions.map((option: any) => (
                           <div key={option.name} className="space-y-2">
                              <Label
                                 htmlFor={`${component.id}-${option.name}`}
                                 className="text-sm font-medium"
                              >
                                 {option.label}
                              </Label>

                              {option.type === "number" ? (
                                 <Input
                                    id={`${component.id}-${option.name}`}
                                    type="number"
                                    value={customization[option.name]}
                                    onChange={(e) => updateCustomization(option.name, Number(e.target.value))}
                                    className="w-full"
                                 />
                              ) : option.type === "range" ? (
                                 <Slider
                                    id={`${component.id}-${option.name}`}
                                    min={option.min}
                                    max={option.max}
                                    step={option.step}
                                    value={[customization[option.name]]}
                                    onValueChange={(value) => updateCustomization(option.name, value[0])}
                                    className="w-full"
                                 />
                              ) : option.type === "select" ? (
                                 <select
                                    id={`${component.id}-${option.name}`}
                                    value={customization[option.name]}
                                    onChange={(e) => updateCustomization(option.name, e.target.value)}
                                    className="w-full bg-transparent border rounded-md p-2"
                                 >
                                    {option.options!.map((opt: string) => (
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
                     </TabsContent>

                     <TabsContent value="code">
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

                     <TabsContent value="presets">
                        <div className="space-y-4">
                           <div className="flex items-center space-x-2">
                              <Input
                                 placeholder="Preset name"
                                 value={presetName}
                                 onChange={(e) => setPresetName(e.target.value)}
                              />
                              <Button onClick={savePreset}>
                                 <Save className="h-4 w-4 mr-2" />
                                 Save
                              </Button>
                           </div>

                           <div className="grid grid-cols-2 gap-2">
                              {Object.keys(savedPresets).map((name) => (
                                 <Button
                                    key={name}
                                    variant="outline"
                                    onClick={() => loadPreset(name)}
                                    className="justify-between"
                                 >
                                    {name}
                                 </Button>
                              ))}
                           </div>

                           <Button
                              variant="outline"
                              onClick={() => { }}
                              className="w-full"
                           >
                              <Share2 className="h-4 w-4 mr-2" />
                              Share Configuration
                           </Button>
                        </div>
                     </TabsContent>
                  </Tabs>
               </div>
            </div>
         </CardContent>
      </Card>
   )
}