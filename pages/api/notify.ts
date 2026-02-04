
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    message: string
    count?: number
    error?: string
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

    // Resend Implementation
    try {
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)

        // Warning: On free tier/without domain verification, you can only send to your own email
        // and FROM 'onboarding@resend.dev'.

        const emailPromises = emails.map(email => {
            return resend.emails.send({
                from: 'onboarding@resend.dev',
                to: email, // In production, verify your domain to send to anyone
                subject: `New Post: ${post.title} `,
                html: `
    < div style = "font-family: sans-serif; padding: 20px;" >
        <h1>📝 New Blog Post Published! </h1>
            < p > Hello, </p>
            < p > I just published a new article: <strong>${post.title} </strong></p >
                <p>Check it out here: <a href="https://votre-portfolio.app/blog/${post.slug}" > Read Article < /a></p >
                    <br/>
                    < p > Best regards, </p>
                        < p > Ramadane </p>
                        </div>
                            `
            })
        })

        await Promise.all(emailPromises)

        console.log(`[Success] Sent ${emails.length} emails via Resend.`)

        return resend.emails.send({
            from: 'onboarding@resend.dev',
            to: 'mouhammadouramadaned@gmail.com', // Admin notification
            subject: `[Admin] Newsletter Sent: ${post.title} `,
            html: `< p > Newsletter sent to ${emails.length} subscribers.</p>`
        }).then(() => {
            return res.status(200).json({
                message: 'Notifications sent successfully',
                count: emails.length
            })
        })

    } catch (error: any) {
        console.error('Resend Error:', error)
        return res.status(500).json({ message: 'Failed to send emails', error: error.message })
    }
}
