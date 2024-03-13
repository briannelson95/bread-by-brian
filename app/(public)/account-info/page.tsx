import Link from 'next/link'
import React from 'react'

export default function AccountInfoPage() {
    return (
        <div className='max-w-3xl mx-auto space-y-2 mb-10 px-6 md:p-2'>
            <h1 className='text-lg font-semibold'>Account Info</h1>
            <section>
                <p>I&apos;m shipping a lot of new features to Bread by Brian including a loyalty rewards program and user accounts. In order to be eligible for the rewards program you&apos;ll need to be logged into an account. I want to reward customers for ordering bread and the best way to do that is by giving away our most popular bread item.</p>
            </section>
            <section className='space-y-1'>
                <h2 className='text-xl font-bold'>Why do I need an account?</h2>
                <p>Accounts allow me to create a digital punch card for you and to be able to keep track of your progression towards a reward. Accounts also allow for a much faster checkout by auto-filling your information for you. Users who create an account will also be able to see all of their orders and the status of each.</p>
                <p>For more information about data and privacy you can read our <Link href={'/privacy-policy'} className='text-brand-primary underline'>privacy policy here</Link>.</p>
            </section>
            <section className='space-y-1'>
                <h2 className='text-xl font-bold'>What is the Loyalty Program?</h2>
                <p>For customers who order bread items, (Sourdough, Bagel Loaf, Focaccia, and Challah, etc.) they&apos;ll recieve 1 (one) &quot;punch&quot; per item. When you get to 10 punches, you can redeem a FREE Sourdough Loaf. Punches are not applied to orders that contain pastery items.</p>
            </section>
            <section className='space-y-1'>
                <h2 className='text-xl font-bold'>How do I redeem my reward?</h2>
                <p>When a user has a reward available, there will be a message displayed on the checkout page allowing users to choose to apply the reward to their order.</p>
            </section>
        </div>
    )
}
