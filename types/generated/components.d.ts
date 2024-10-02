import type { Schema, Attribute } from '@strapi/strapi';

export interface KatalogKatalog extends Schema.Component {
  collectionName: 'components_katalog_katalogs';
  info: {
    displayName: 'Katalog';
    icon: 'folder';
    description: '';
  };
  attributes: {
    Title: Attribute.String & Attribute.Required;
    Language: Attribute.Enumeration<['tr', 'en', 'ru']> &
      Attribute.Required &
      Attribute.DefaultTo<'tr'>;
    Dosya: Attribute.Media<'files'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'katalog.katalog': KatalogKatalog;
    }
  }
}
