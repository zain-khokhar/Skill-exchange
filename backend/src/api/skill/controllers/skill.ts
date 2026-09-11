/**
 * skill controller
 */
import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::skill.skill', () => ({
	async find(ctx) {
		if (!ctx.state.user) {
			return ctx.unauthorized('Authentication required');
		}

		return super.find(ctx);
	},

	async findOne(ctx) {
		if (!ctx.state.user) {
			return ctx.unauthorized('Authentication required');
		}

		return super.findOne(ctx);
	},

	async create(ctx) {
		if (!ctx.state.user) {
			return ctx.unauthorized('Authentication required');
		}

		return super.create(ctx);
	},

	async update(ctx) {
		if (!ctx.state.user) {
			return ctx.unauthorized('Authentication required');
		}

		return super.update(ctx);
	},

	async delete(ctx) {
		if (!ctx.state.user) {
			return ctx.unauthorized('Authentication required');
		}

		return super.delete(ctx);
	},
}));
