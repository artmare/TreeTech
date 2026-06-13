import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  poweredByHeader: false
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
