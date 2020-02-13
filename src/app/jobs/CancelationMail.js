import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelationMail {
  get key() {
    return 'CancelationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.courier.name} <${delivery.courier.email}`,
      subject: 'Cancelamento da entrega',
      template: 'cancelationOrder',
      context: {
        name: delivery.courier.name,
        product: delivery.product,
        canceledAt: format(
          parseISO(delivery.canceled_at),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new CancelationMail();
