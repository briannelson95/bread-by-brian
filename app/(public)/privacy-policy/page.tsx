import React from 'react'

export default function PolicyPage() {
    return (
        <div className='w-full p-2 relative mb-16 md:max-w-4xl mx-auto space-y-6'>
            <h1 className='text-3xl font-semibold'>Privacy Policy for Bread by Brian</h1>
            <p>Last Updated: March 11, 2024</p>
            <section>
                <h2 className='text-2xl'>1. Information Collected</h2>
                <p>We collect the following information from users who sign in through Google OAuth via Supabase Auth:</p>
                <ul className='list-disc list-inside pl-4'>
                    <li>Full Name</li>
                    <li>Email Address</li>
                </ul>
            </section>
            <section>
                <h2 className='text-2xl'>2. Use of Google Sign-In Data</h2>
                <p>The information collected during Google Sign-In is stored securely and is used for authentication purposes. We do not use or share any additional data from users&apos; Google accounts.</p>
            </section>
            <section>
                <h2 className='text-2xl'>3. Reward System</h2>
                <p>We track orders containing products labeled as &quot;bread&quot; to determine eligibility for our reward system. No third-party services are used for this purpose.</p>
            </section>
            <section>
                <h2 className='text-2xl'>4. Third-Party Services</h2>
                <p>We use Supabase Auth as our third-party service for user authentication.</p>
            </section>
            <section>
                <h2 className='text-2xl'>5. Data Management and Security</h2>
                <p>User data is stored in a Supabase database with row-level security implemented. Only admins and the respective user have access to their name, email, and reward points.</p>
            </section>
            <section>
                <h2 className='text-2xl'>6. Data Sharing</h2>
                <p>We do not share user data with any third parties.</p>
            </section>
            <section>
                <h2 className='text-2xl'>7. Communication</h2>
                <p>Users receive emails about their orders, and on their profile page, they can track their progress in the reward program.</p>
            </section>
            <section>
                <h2 className='text-2xl'>8. User Rights</h2>
                <p>Users can update their name and email through their profile page. Upon request to the website admin, users can have their account and data deleted.</p>
            </section>
            <section>
                <h2 className='text-2xl'>9. Cookies</h2>
                <p>We use cookies to create and store user carts across the site for a seamless shopping experience.</p>
            </section>
            <section>
                <h2 className='text-2xl'>10. Legal Compliance</h2>
                <p>We are committed to complying with all relevant data protection laws and regulations.</p>
            </section>
        </div>
    )
}













