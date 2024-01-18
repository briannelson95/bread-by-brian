import * as React from 'react';

interface ContactTemplateProps {
    customerName: string;
    message: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactTemplateProps>> = ({
    customerName,
    message,
}) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Custom Order Request</title>
        </head>
        <body 
            style={{
                fontFamily: 'Arial, sans-serif', 
                backgroundColor: '#f4f4f4',
                margin: 0,
                padding: 0,
            }}
        >
            <div 
                style={{
                    maxWidth: '600px',
                    margin: '20px auto',
                    backgroundColor: '#ffffff',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div 
                    style={{
                        backgroundColor: '#fbb042',
                        color: '#392217',
                        textAlign: 'center',
                        padding: '20px',
                    }}
                >
                    <h1>Custom Order Request</h1>
                </div>

                <div 
                    style={{ padding: '20px', }}
                >
                    <p>Hello <strong>{customerName}</strong>, thank you for requesting a custom order.</p>

                    <div 
                        style={{ marginBottom: '20px' }}
                    >
                        <p>Your request:</p>
                        <p>{message}</p>
                    </div>
                    <div>
                        <p style={{ fontSize: '14px', lineHeight: '20px', color: '#71717a' }}>
                            I will be in touch soon. If you have questions or need to cancel your order please contact me: <a href='mailto:breadbybrian95@gmail.com' target='_blank'>breadbybrian95@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </body>
    </html>
);
