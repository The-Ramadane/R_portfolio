import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
    count?: number
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' })
    }

    const { emails, post } = req.body

    if (!emails || !Array.isArray(emails) || emails.length === 0) {
        return res.status(200).json({ message: 'No subscribers to notify' })
    }

    // TODO: Integrate a real email service provider here.
    // Examples: Resend, SendGrid, Mailgun, or Nodemailer.

    // Simulation of email sending
    console.log('--- MOCK EMAIL NOTIFICATION SYSTEM ---')
    console.log(`New Post: ${post.title}`)
    console.log(`Sending notifications to ${emails.length} subscribers:`)
    emails.forEach(email => {
        console.log(`[Mock Send] -> ${email}: "Check out our new post: ${post.title}"`)
    })
    console.log('--------------------------------------')

    // Simulate delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return res.status(200).json({
        message: 'Notifications queued successfully (Mock Mode)',
        count: emails.length
    })
}
