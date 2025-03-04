import { BeautyAnalyzer } from "@/components/beauty-analyzer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-pink-800 mb-4">Beauty Analysis Tool</h1>
            <p className="text-lg text-gray-600">
              Upload a selfie to get personalized skin undertone analysis and beauty suggestions
            </p>
          </div>

          <BeautyAnalyzer />

          <div className="mt-16 text-center text-sm text-gray-500">
            <p>Powered by AI, OpenCV, and Next.js</p>
          </div>
        </div>
      </div>
    </main>
  )
}

