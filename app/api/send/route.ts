import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: any) {
    try {
        const body = await request.json();
        // console.log(body);
        const { email, name, total, cartProducts } = body;
        const { data, error } = await resend.emails.send({
            from: 'Bread by Brian <info@breadbybrian.com>',
            to: email,
            subject: "Order Info",
            bcc: "breadbybrian95@gmail.com",
            react: EmailTemplate({ 
                firstName: name,
                totalPrice: total,
                products: cartProducts,
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
