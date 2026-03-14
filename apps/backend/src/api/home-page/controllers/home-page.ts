/**
 * home-page controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::home-page.home-page', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                seo: {
                    populate: ['ogImage'],
                },
                hero: true,
                partners: {
                    populate: ['logo'],
                },
            },
        };
        return await super.find(ctx);
    },
}));
