import { NextRequest, NextResponse } from 'next/server'

// Railway has no timeout limits like Vercel - long requests work fine

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Create abort controller with 10 minute timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => {
      controller.abort()
    }, 600000) // 10 minutes

    const response = await fetch('https://anaav.app.n8n.cloud/webhook/find-universities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
      signal: controller.signal,
      // @ts-ignore - Next.js specific option
      cache: 'no-store',
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `n8n error: ${response.status} ${errorText}` },
        { status: response.status }
      )
    }

    const data = await response.json()

    return NextResponse.json(data)

  } catch (error: any) {
    console.error('API route error:', error)

    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Request timed out after 10 minutes' },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
