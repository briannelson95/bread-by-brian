import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
    try {
        const body = await request.json();
        console.log(body);
        const { email, name } = body;
        const { data, error } = await resend.emails.send({
            from: 'Bread by Brian <info@breadbybrian.com>',
            to: email,
            subject: "Order Info",
            react: EmailTemplate({ firstName: name }) as React.ReactElement,
        });
    
        if (error) {
            return Response.json({ error });
        }
    
        return Response.json({ data });
    } catch (error) {
        return Response.json({ error });
    }
  }
