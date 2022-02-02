export const configuration = () => ({
  port: process.env.PORT || 6000,
  environment: process.env.APP_ENV || 'local',
  digifiClient: {
    apiUrl: process.env.DIGIFI_API_URL,
    client_id: process.env.DIGIFI_API_CLIENT_ID,
    client_public_key: process.env.DIGIFI_API_CLIENT_PUBLIC_KEY,
    client_secret: process.env.DIGIFI_API_CLIENT_SECRET,
  },
  defaultStrategyStatus: process.env.STRATEGY_STATUS,
});
