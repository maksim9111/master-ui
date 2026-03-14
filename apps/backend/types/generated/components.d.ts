import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutCompany extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_companies';
  info: {
    displayName: 'about-company';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksAdvantages extends Struct.ComponentSchema {
  collectionName: 'components_blocks_advantages';
  info: {
    displayName: 'advantages';
  };
  attributes: {};
}

export interface BlocksContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_blocks_contact_infos';
  info: {
    displayName: 'contact-info';
  };
  attributes: {};
}

export interface BlocksFaqPreview extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faq_previews';
  info: {
    displayName: 'faq-preview';
  };
  attributes: {};
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
    icon: 'crop';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    phoneLabel: Schema.Attribute.String;
    phoneValue: Schema.Attribute.String;
    primaryButtonLink: Schema.Attribute.String;
    primaryButtonText: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksPartnersBrands extends Struct.ComponentSchema {
  collectionName: 'components_blocks_partners_brands';
  info: {
    displayName: 'partners-brands';
  };
  attributes: {
    alt: Schema.Attribute.String;
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface BlocksReviewsPreview extends Struct.ComponentSchema {
  collectionName: 'components_blocks_reviews_previews';
  info: {
    displayName: 'reviews-preview';
  };
  attributes: {};
}

export interface LayoutFooter extends Struct.ComponentSchema {
  collectionName: 'components_layout_footers';
  info: {
    displayName: 'footer';
  };
  attributes: {
    copyright: Schema.Attribute.String;
    menuItems: Schema.Attribute.Component<'shared.nav-item', true>;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
  };
}

export interface LayoutHeader extends Struct.ComponentSchema {
  collectionName: 'components_layout_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    ctaLink: Schema.Attribute.String;
    ctaText: Schema.Attribute.String;
    menuItems: Schema.Attribute.Component<'shared.nav-item', true>;
  };
}

export interface SharedNavItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_items';
  info: {
    displayName: 'nav-item';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'globe';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    jsonLd: Schema.Attribute.JSON;
    keywords: Schema.Attribute.Text;
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    ogDescription: Schema.Attribute.Text;
    ogImage: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    ogTitle: Schema.Attribute.String;
    robots: Schema.Attribute.String;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    displayName: 'social-link';
  };
  attributes: {
    href: Schema.Attribute.String;
    iconName: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-company': BlocksAboutCompany;
      'blocks.advantages': BlocksAdvantages;
      'blocks.contact-info': BlocksContactInfo;
      'blocks.faq-preview': BlocksFaqPreview;
      'blocks.hero': BlocksHero;
      'blocks.partners-brands': BlocksPartnersBrands;
      'blocks.reviews-preview': BlocksReviewsPreview;
      'layout.footer': LayoutFooter;
      'layout.header': LayoutHeader;
      'shared.nav-item': SharedNavItem;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
    }
  }
}
