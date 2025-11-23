import { NextRequest, NextResponse } from 'next/server'

// Railway has no timeout limits - long polling works fine

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Step 1: Start the search job
    const startResponse = await fetch('https://anaav.app.n8n.cloud/webhook/start-universities', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_name: body.user_name,
        education_level: body.education_level,
        country_origin: body.country_origin,
        interests: body.interests,
        gpa: body.gpa,
        budget: `$${body.budget_min || 0} - $${body.budget_max || 50000}`,
        degree: body.degree_type,
        language: body.language_of_instruction
      })
    })

    if (!startResponse.ok) {
      throw new Error(`Failed to start search: ${startResponse.status}`)
    }

    const startData = await startResponse.json()
    const jobId = startData.job_id

    if (!jobId) {
      throw new Error('No job_id returned from start endpoint')
    }

    console.log('Job started:', jobId)

    // Step 2: Poll for results every 3 seconds, timeout after 3 minutes
    const maxAttempts = 60 // 3 minutes / 3 seconds = 60 attempts
    let attempts = 0

    while (attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 3000)) // Wait 3 seconds
      attempts++

      console.log(`Polling attempt ${attempts}...`)

      const pollResponse = await fetch(
        `https://anaav.app.n8n.cloud/webhook/get-universities?job_id=${jobId}`,
        { method: 'GET' }
      )

      if (!pollResponse.ok) {
        console.error(`Poll error: ${pollResponse.status}`)
        continue
      }

      const pollData = await pollResponse.json()
      console.log('Poll status:', pollData.status)

      if (pollData.status === 'done') {
        // Return the full result
        return NextResponse.json(pollData.result)
      }

      if (pollData.status === 'not_found') {
        return NextResponse.json(
          { error: 'Job not found' },
          { status: 404 }
        )
      }

      // status === 'processing' - continue polling
    }

    // Timeout after 3 minutes
    return NextResponse.json(
      { error: 'Search timed out after 3 minutes' },
      { status: 504 }
    )

  } catch (error: any) {
    console.error('API route error:', error)
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    )
  }
}
