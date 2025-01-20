'use client'
import { useState, useEffect } from "react"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { ChartCustomizer } from "./ChartCustomizer"
import { chartComponents } from "../data/chartComponents"  // Remove .tsx extension

const NatureVizApp = () => {
   const [darkMode, setDarkMode] = useState(false)

   useEffect(() => {
      const isDarkMode = localStorage.getItem("darkMode") === "true"
      setDarkMode(isDarkMode)
      document.documentElement.classList.toggle("dark", isDarkMode)
   }, [])

   const toggleDarkMode = () => {
      const newDarkMode = !darkMode
      setDarkMode(newDarkMode)
      localStorage.setItem("darkMode", newDarkMode.toString())
      document.documentElement.classList.toggle("dark", newDarkMode)
   }

   return (
      <div className={`min-h-screen ${darkMode ? "dark" : ""}`}>
         <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

         <div className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
               <div className="text-center mb-16">
                  <h2 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-400">
                     Visualize Environmental Data with Ease
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                     EcoViz empowers you to create stunning, interactive charts that bring your environmental data to life.
                     Explore our components below and see how easy it is to integrate them into your projects.
                  </p>
               </div>

               <div className="space-y-24">
                  {chartComponents.map((component, index) => (
                     <ChartCustomizer key={component.id} component={component} index={index} />
                  ))}
               </div>
            </div>

            <Footer />
         </div>
      </div>
   )
}

export default NatureVizApp

