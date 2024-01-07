import * as React from 'react';

interface EmailTemplateProps {
    firstName: string;
    totalPrice: number;
    products: any;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
    firstName,
    totalPrice,
    products,
}) => (
    <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Order Confirmation</title>
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
                    <h1>Order Confirmation</h1>
                </div>

                <div 
                    style={{ padding: '20px', }}
                >
                    <p>Hello <strong>{firstName}</strong>,</p>

                    <div 
                        style={{ marginBottom: '20px' }}
                    >
                        <p>Your order details:</p>
                        <table
                            style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                marginBottom: '20px'
                            }}
                        >
                            <thead>
                                <tr>
                                    <th 
                                        style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Product
                                    </th>
                                    <th 
                                        style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Quantity
                                    </th>
                                    <th
                                        style={{
                                            border: '1px solid #ddd',
                                            padding: '8px',
                                            textAlign: 'left'
                                        }}
                                    >
                                        Price
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.length && products.map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td
                                            style={{
                                                border: '1px solid #ddd',
                                                padding: '8px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            <img 
                                                src={item.image} 
                                                alt={item.title}
                                                style={{
                                                    maxWidth: '60px',
                                                    maxHeight: '60px',
                                                    marginRight: '10px'
                                                }}
                                            />
                                            {item.title}
                                        </td>
                                        <td
                                            style={{
                                                border: '1px solid #ddd',
                                                padding: '8px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            {item.quantity}x
                                        </td>
                                        <td
                                            style={{
                                                border: '1px solid #ddd',
                                                padding: '8px',
                                                textAlign: 'left'
                                            }}
                                        >
                                            ${item.price.toFixed(2)} each
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <p>Total: ${totalPrice.toFixed(2)}</p>
                    </div>

                    <div 
                        style={{
                            textAlign: 'center',
                            marginTop: '20px',
                        }}
                    >
                        <p>Payment can be made in person or via Venmo:</p>
                        <a href="https://venmo.com/u/Brian-Nelson-80/">
                            <img src="https://www.breadbybrian.com/Venmo.png" alt="Venmo" width="200" />
                            <br />
                            Click here to pay with Venmo
                        </a>
                    </div>

                    <p>Thank you for your purchase!</p>

                    <p style={{ fontSize: '14px', lineHeight: '20px', color: '#71717a' }}>
                        If you have questions or need to cancel your order please contact me: <a href='mailto:breadbybrian95@gmail.com' target='_blank'>breadbybrian95@gmail.com</a>
                    </p>
                </div>
            </div>
        </body>
    </html>
);
