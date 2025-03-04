"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnalysisResults } from "@/components/analysis-results"
import { WebcamCapture } from "@/components/webcam-capture"
import { ImageUploader } from "@/components/image-uploader"

export type AnalysisResult = {
  undertone: "warm" | "cool" | "neutral"
  suggestions: {
    makeup: string[]
    colors: string[]
    hairColor: string[]
  }
}

export function BeautyAnalyzer() {
  const [image, setImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [results, setResults] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleImageSelected = (imageData: string) => {
    setImage(imageData)
    setResults(null)
    setError(null)
  }

  const analyzeImage = async () => {
    if (!image) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError("An error occurred during analysis. Please try again.")
      console.error(err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="upload">Upload Photo</TabsTrigger>
          <TabsTrigger value="camera">Take Photo</TabsTrigger>
        </TabsList>

        <TabsContent value="upload">
          <Card className="p-6">
            <ImageUploader onImageSelected={handleImageSelected} />
          </Card>
        </TabsContent>

        <TabsContent value="camera">
          <Card className="p-6">
            <WebcamCapture onCapture={handleImageSelected} />
          </Card>
        </TabsContent>
      </Tabs>

      {image && (
        <div className="space-y-6">
          <div className="relative aspect-square max-w-md mx-auto overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <img src={image || "/placeholder.svg"} alt="Preview" className="w-full h-full object-cover" />
          </div>

          <div className="flex justify-center">
            <Button onClick={analyzeImage} disabled={isAnalyzing} size="lg" className="bg-pink-600 hover:bg-pink-700">
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>Analyze Image</>
              )}
            </Button>
          </div>
        </div>
      )}

      {error && <div className="p-4 bg-red-50 text-red-700 rounded-md text-center">{error}</div>}

      {results && <AnalysisResults results={results} />}
    </div>
  )
}

