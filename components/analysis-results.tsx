import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import type { AnalysisResult } from "@/components/beauty-analyzer"

interface AnalysisResultsProps {
  results: AnalysisResult
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  const undertoneColors = {
    warm: "bg-amber-100 text-amber-800",
    cool: "bg-blue-100 text-blue-800",
    neutral: "bg-purple-100 text-purple-800",
  }

  const undertoneDescriptions = {
    warm: "Your skin has golden, peachy, or yellow undertones. You likely look best in warm colors.",
    cool: "Your skin has pink, red, or bluish undertones. Cool colors typically complement your complexion.",
    neutral: "Your skin has a balanced mix of warm and cool undertones. You can wear a wide range of colors.",
  }

  return (
    <Card className="mt-8 border-t-4 border-t-pink-500">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl">Your Beauty Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium">Skin Undertone:</h3>
            <Badge className={undertoneColors[results.undertone]}>
              {results.undertone.charAt(0).toUpperCase() + results.undertone.slice(1)}
            </Badge>
          </div>

          <p className="text-gray-600">{undertoneDescriptions[results.undertone]}</p>

          <Tabs defaultValue="makeup" className="w-full mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="makeup">Makeup</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="hair">Hair Colors</TabsTrigger>
            </TabsList>

            <TabsContent value="makeup" className="pt-4">
              <h4 className="font-medium mb-2">Recommended Makeup:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {results.suggestions.makeup.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="colors" className="pt-4">
              <h4 className="font-medium mb-2">Colors That Complement You:</h4>
              <div className="flex flex-wrap gap-2">
                {results.suggestions.colors.map((color, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1">
                    {color}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hair" className="pt-4">
              <h4 className="font-medium mb-2">Flattering Hair Colors:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {results.suggestions.hairColor.map((color, index) => (
                  <li key={index}>{color}</li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}

