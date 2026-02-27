// Admin configuration with Preview setup for external frontend
module.exports = ({ env }) => {
  const CLIENT_URL = env('CLIENT_URL', 'https://echo-ngo.vercel.app');
  const PREVIEW_SECRET = env('PREVIEW_SECRET', 'change_me_preview_secret');

  const getPreviewPathname = (uid, { locale, document }) => {
    const slug = document?.slug || (document?.title && String(document.title).toLowerCase().replace(/\s+/g, '-'));

    switch (uid) {
      case 'api::page.page':
        if (!slug) return locale ? `/${locale}` : '/';
        if (slug === 'homepage') return locale ? `/${locale}` : '/';
        return `/${slug}`;
      case 'api::post.post':
      case 'api::article.article':
        if (!slug) return '/blog';
        return `/blog/${slug}`;
      case 'api::category.category':
        if (!slug) return '/blog';
        return `/category/${slug}`;
      case 'api::author.author':
        if (!slug) return '/author';
        return `/author/${slug}`;
      case 'api::about.about':
        return '/about';
      case 'api::global.global':
        return '/';
      default:
        return '/';
    }
  };

  return {
    auth: {
      secret: env('ADMIN_JWT_SECRET'),
    },
    apiToken: {
      salt: env('API_TOKEN_SALT'),
    },
    transfer: {
      token: {
        salt: env('TRANSFER_TOKEN_SALT'),
      },
    },
    preview: {
      enabled: true,
      config: {
        allowedOrigins: [CLIENT_URL],
        async handler(uid, { documentId, locale, status }) {
          const document = await strapi.documents(uid).findOne({ documentId });
          const pathname = getPreviewPathname(uid, { locale, document }) || '/';
          return `${CLIENT_URL}${pathname}`;
        },
        secret: PREVIEW_SECRET,
      },
    },
    flags: {
      nps: env.bool('FLAG_NPS', true),
      promoteEE: env.bool('FLAG_PROMOTE_EE', true),
    },
  };
};