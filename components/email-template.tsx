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
    <div>
        <h1>Thanks for your order, {firstName}!</h1>
        <p>Here's a summary of what you ordered:</p>
        <div>
            <div style={{ border: '1px solid black', borderRadius: '12px' }}>
                {products.length && products.map((item: any, index: number) => (
                    <table key={index} width="100%" cellSpacing="0" cellPadding="0">
                        <tr>
                            {/* <!-- Left Column --> */}
                            <td width="50%" valign="top" style={{padding: '10px'}}>
                                <div style={{backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '8px'}}>
                                    <p>{item.title} (x{item.quantity})</p>
                                </div>
                        
                            </td>
                        
                            {/* <!-- Right Column --> */}
                            <td width="50%" valign="top" style={{padding: '10px'}}>
                        
                                <div style={{backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '8px'}}>
                                    <p>${item.price.toFixed(2)} each</p>
                                </div>
                        
                            </td>
                        </tr>
                    </table>
                ))}
            </div>
            <table cellPadding={'0'} cellSpacing={'0'}>
                <tr>
                    <td width="50%" valign="top" style={{padding: '10px'}}>
                        <h2>Total: ${totalPrice.toFixed(2)}</h2>
                    </td>
                </tr>
                <tr>
                    <td width="50%" valign="top" style={{padding: '10px'}}>
                        <p>Payment can be made in person or on <a href='https://venmo.com/u/Brian-Nelson-80/' target='_blank'>Venmo</a></p>
                        <a href='https://venmo.com/u/Brian-Nelson-80/' target='_blank'>
                            <img src='breadbybrian.com/Venmo.png' />
                        </a>
                    </td>
                </tr>
            </table>
            <div>
                <p style={{ fontSize: '14px', lineHeight: '20px', color: '#71717a' }}>
                    If you have questions or need to cancel your order please contact me: <a href='mailto:breadbybrian95@gmail.com' target='_blank'>breadbybrian95@gmail.com</a>
                </p>
            </div>
        </div>
    </div>
);
