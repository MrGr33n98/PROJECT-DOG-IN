import express from 'express';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', { apiVersion: '2024-04-10' });

app.use(express.json());

const bookings = [];

app.post('/api/create-checkout-session', async (req, res) => {
  const { caregiverId, startDate, endDate, service, totalPrice } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: `Reserva - ${service}` },
            unit_amount: Math.round(totalPrice * 100),
          },
          quantity: 1,
        },
      ],
      success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    const booking = {
      id: session.id,
      caregiverId,
      startDate,
      endDate,
      service,
      totalPrice,
      status: 'pending',
      sessionId: session.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bookings.push(booking);

    res.json({ url: session.url, bookingId: booking.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

app.post('/api/bookings/status', (req, res) => {
  const { sessionId, status } = req.body;
  const booking = bookings.find((b) => b.sessionId === sessionId);
  if (booking) {
    booking.status = status;
    booking.updatedAt = new Date().toISOString();
    res.json({ success: true });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
