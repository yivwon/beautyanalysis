import { type NextRequest, NextResponse } from "next/server"

// This would normally call our Flask backend with OpenCV
// For demo purposes, we'll simulate the analysis with predefined responses
export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    // In a real implementation, we would:
    // 1. Send the image to our Flask backend
    // 2. Process with OpenCV to analyze skin tone
    // 3. Return the results

    // For demo purposes, we'll randomly select an undertone
    const undertones = ["warm", "cool", "neutral"] as const
    const randomUndertone = undertones[Math.floor(Math.random() * undertones.length)]

    // Generate suggestions based on undertone
    const suggestions = getSuggestionsForUndertone(randomUndertone)

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json({
      undertone: randomUndertone,
      suggestions,
    })
  } catch (error) {
    console.error("Error analyzing image:", error)
    return NextResponse.json({ error: "Failed to analyze image" }, { status: 500 })
  }
}

function getSuggestionsForUndertone(undertone: "warm" | "cool" | "neutral") {
  const suggestions = {
    warm: {
      makeup: [
        "Gold, peach, or coral-toned blushes",
        "Golden bronze or copper eyeshadows",
        "Warm-toned foundations with yellow or golden undertones",
        "Brick red, terracotta, or warm coral lipsticks",
      ],
      colors: ["Warm Red", "Coral", "Peach", "Orange", "Gold", "Olive Green", "Cream", "Brown"],
      hairColor: ["Golden blonde", "Honey brown", "Copper red", "Caramel highlights", "Warm chestnut"],
    },
    cool: {
      makeup: [
        "Pink, mauve, or berry-toned blushes",
        "Silver, taupe, or plum eyeshadows",
        "Cool-toned foundations with pink or blue undertones",
        "Berry, blue-red, or plum lipsticks",
      ],
      colors: ["Blue", "Purple", "Lavender", "Pink", "Blue-Red", "Emerald", "Navy", "Gray"],
      hairColor: ["Platinum blonde", "Ash brown", "Cool espresso", "Silver highlights", "Burgundy"],
    },
    neutral: {
      makeup: [
        "Universal shades like soft pink or peachy-pink blushes",
        "Versatile eyeshadows in taupes, soft browns, and mauves",
        "Neutral-toned foundations that balance yellow and pink",
        "Medium rose, mauve, or soft red lipsticks",
      ],
      colors: ["Teal", "Jade", "Soft White", "Medium Pink", "Burgundy", "Navy", "Soft Yellow", "Medium Purple"],
      hairColor: ["Light brown", "Bronde (brown-blonde mix)", "Medium brown", "Soft black", "Subtle highlights"],
    },
  }

  return suggestions[undertone]
}

