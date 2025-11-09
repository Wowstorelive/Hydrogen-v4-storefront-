import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

// Inline translation resources
const resources = {
  en: {
    translation: {
      fields: {
        search: 'Search products...',
        emailAddress: 'Enter your email',
        address: 'Address',
        email: 'Email',
        phone: 'Phone',
        openingTime: 'Opening Hours',
        openingTimeCaret: 'Opening Hours',
        powerBy: 'Powered by',
      },
      header: {
        account: 'Account',
        compare: 'Compare',
        wishlist: 'Wishlist',
        cart: 'Cart',
        hotlineText: 'Customer Support',
      },
      global: {
        newsletterHeading: 'Newsletter',
        newsletterText: 'Subscribe to get special offers and updates',
        join: 'Subscribe',
        ourStore: 'Our Store',
        storeInfo: 'Store Information',
      },
      footer: {
        newsletter: {
          title: 'Newsletter',
          description: 'Subscribe to get special offers and updates',
          placeholder: 'Enter your email',
          button: 'Subscribe',
        },
        copyright: '© 2025 WowStore. All rights reserved.',
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
