'use strict';

/**
 * catalogue service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::catalogue.catalogue');
