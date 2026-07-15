export const generateWhatsAppLink = (formData) => {
  const targetNumber = '919054061461'; // The owner's WhatsApp number

  const message = `*KUMKUM BEAUTY CARE*

*New Registration Received*

- *Name*    : ${formData.name}
- *Mobile*  : ${formData.mobile}
- *Parlour* : ${formData.parlour}
- *City*    : ${formData.city}

_Thank you for registering with us!_
_We will contact you shortly._`;

  const encodedMessage = encodeURIComponent(message);

  // Use WhatsApp Universal Link for best compatibility
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
};