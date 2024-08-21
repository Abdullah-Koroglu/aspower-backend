module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/send-email',
      handler: 'mailer.send',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/support-email',
      handler: 'mailer.sendForSupportForm',
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: 'POST',
      path: '/contact-email',
      handler: 'mailer.sendForContactForm',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};