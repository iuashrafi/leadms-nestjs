const nextConfig = {
  reactStrictMode: true,

  async rewrites() {
    switch (process.env.ENV) {
      case "dev":
        return [
          {
            source: "/api/:path*",
            destination: "http://localhost:3000/:path*",
          },
        ];

      case "prod":
        return [
          {
            source: "/api/:path*",
            destination:
              "http://ec2-13-201-194-19.ap-south-1.compute.amazonaws.com:3000/:path*",
          },
        ];

      default:
        return [];
    }
  },
};

module.exports = nextConfig;
