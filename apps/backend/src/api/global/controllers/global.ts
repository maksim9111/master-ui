/**
 * global controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::global.global', ({ strapi }) => ({
    async find(ctx) {
        ctx.query = {
            ...ctx.query,
            populate: {
                logo: true,
                favicon: true,
                header: {
                    populate: ['menuItems'],
                },
                footer: {
                    populate: ['menuItems', 'socialLinks'],
                },
            },
        };
        return await super.find(ctx);
    },
}));
