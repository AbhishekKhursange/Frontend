import emailjs from "@emailjs/browser";

function SendOrderEmail({cartItems, netAmount, tax, totalAmount, userEmail}) {

    const sendEmail = () => {
        let templateParams = {
            orders: cartItems.map(item => `Image: ${item.img}, Item: ${item.name}, Quantity: ${item.quantity}, Price: ₹${item.price}`).join('\n'),

            order_id: Date.now(),
            totalAmount: totalAmount.toFixed(2),
            netAmount: netAmount.toFixed(2),
            tax: tax.toFixed(2),
            email: userEmail
        };
        emailjs.send('service_b3018zv', 'template_d6uerjb', templateParams, 'wzLUucNgwVQiiuH7d')
            .then(() => {
                alert('Email sent successfully!');
            })
            .catch(() => {
                alert('Failed to send email. Please try again.');
            });
    }

    return (
        <>
        <button onClick={sendEmail} className="btn btn-primary mt-3">Send Order Email</button>
        </>
    );
}
export default SendOrderEmail;