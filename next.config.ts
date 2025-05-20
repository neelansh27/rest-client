import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // Build Issue fix
    // https://github.com/mikro-orm/mikro-orm/discussions/5467
    experimental: { serverMinification: false}
};

export default nextConfig;
