/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/graphql",
        destination: "http://io/graphql",
      },
      {
        source: "/graphiql",
        destination: "http://io/graphiql",
      },
    ];
  },
};

module.exports = nextConfig;
