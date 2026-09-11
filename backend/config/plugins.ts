const config = ({ env }) => ({
  // Email: only configure a real provider when SMTP settings are provided
  ...(env('SMTP_HOST')
    ? {
        email: {
          config: {
            provider: 'sendmail',
            providerOptions: {},
            settings: {
              defaultFrom: env('SMTP_FROM', 'noreply@skillexchange.com'),
              defaultReplyTo: env('SMTP_REPLY_TO', 'noreply@skillexchange.com'),
            },
          },
        },
      }
    : {}),
});

export default config;
