import { ContactEmailTemplate } from '@/components/contact-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
    try {
        const body = await request.json();
        console.log(body);
        const { name, email, message, orderId } = body;
        const { data, error } = await resend.emails.send({
            from: 'Bread by Brian <info@breadbybrian.com>',
            to: email,
            subject: `Order Request #${orderId}`,
            bcc: "breadbybrian95@gmail.com",
            reply_to: "breadbybrian95@gmail.com",
            react: ContactEmailTemplate({ 
                customerName: name,
                message: message
            }) as React.ReactElement,
        });
    
        if (error) {
            return Response.json({ error });
        }
    
        return Response.json({ data });
    } catch (error) {
        return Response.json({ error });
    }
  }
