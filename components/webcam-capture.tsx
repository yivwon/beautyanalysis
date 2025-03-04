"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Camera } from "lucide-react"
import { Button } from "@/components/ui/button"

interface WebcamCaptureProps {
  onCapture: (imageData: string) => void
}

export function WebcamCapture({ onCapture }: WebcamCaptureProps) {
  const [isStreaming, setIsStreaming] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsStreaming(true)
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      alert("Unable to access camera. Please make sure you've granted permission.")
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
      setIsStreaming(false)
    }
  }, [])

  const captureImage = useCallback(() => {
    if (!videoRef.current) return

    const canvas = document.createElement("canvas")
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const ctx = canvas.getContext("2d")
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0)
      const imageData = canvas.toDataURL("image/jpeg")
      onCapture(imageData)
      stopCamera()
    }
  }, [onCapture, stopCamera])

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="space-y-4">
      {!isStreaming ? (
        <div className="text-center p-8 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-3 bg-pink-100 rounded-full">
              <Camera className="h-8 w-8 text-pink-600" />
            </div>
            <p className="text-lg font-medium">Take a selfie with your camera</p>
            <Button onClick={startCamera} className="bg-pink-600 hover:bg-pink-700">
              Start Camera
            </Button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg border border-gray-200" />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
            <Button onClick={captureImage} className="bg-pink-600 hover:bg-pink-700">
              Capture
            </Button>
            <Button variant="outline" onClick={stopCamera}>
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

