export const verifyAuth = async (req: any) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return false
    }
    const token = authHeader.split(' ')[1]

    try {
        // Verify the token using Firebase Auth REST API
        // efficient enough for this scale compared to setting up Admin SDK with no service account
        const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    idToken: token,
                }),
            }
        )

        const data = await response.json()
        return !data.error && data.users && data.users.length > 0
    } catch (error) {
        console.error('Auth verification failed', error)
        return false
    }
}
