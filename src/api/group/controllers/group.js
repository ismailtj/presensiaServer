const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::group.group', ({ strapi }) => ({
  async create(ctx) {
    const { data } = ctx.request.body;

    // Vérifier que le responsable a le rôle 'responsable'
    const responsable = await strapi.plugins['users-permissions'].services.user.fetch({ id: data.responsable });
    if (responsable.role.name !== 'Prof') {
      return ctx.badRequest('Le responsable sélectionné n\'a pas le rôle approprié.');
    }

    // Vérifier que le delegue a le rôle 'delegue'
    const delegue = await strapi.plugins['users-permissions'].services.user.fetch({ id: data.delegue });
    if (delegue.role.name !== 'Etudiant') {
      return ctx.badRequest('Le delegue sélectionné n\'a pas le rôle approprié.');
    }

    // Procéder à la création du group
    const response = await super.create(ctx);
    return response;
  },
}));
