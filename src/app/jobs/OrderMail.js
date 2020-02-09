import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class OrderMail {
  get key() {
    return 'OrderMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.courier.name} <${delivery.courier.email}`,
      subject: 'Nova encomenda disponível para entrega',
      template: 'newOrder',
      context: {
        name: delivery.courier.name,
        startDate: format(
          parseISO(delivery.created_at),
          "'dia' dd 'de' MMMM', às' H:mm'h",
          {
            locale: pt,
          }
        ),
        product: delivery.product,
        city: delivery.recipient.city,
        state: delivery.recipient.state,
        cep: delivery.recipient.cep,
      },
    });
  }
}

export default new OrderMail();
