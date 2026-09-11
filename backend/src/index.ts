export default {
  register() {},

  async bootstrap({ strapi }) {
    // ── Ensure email confirmation is DISABLED for registration ──
    const pluginStore = strapi.store({ type: 'plugin', name: 'users-permissions' });
    const advancedSettings = await pluginStore.get({ key: 'advanced' });
    if (advancedSettings && advancedSettings.email_confirmation) {
      await pluginStore.set({
        key: 'advanced',
        value: { ...advancedSettings, email_confirmation: false },
      });
      console.log('✅ Disabled email confirmation for registration');
    }

    // ── Configure API permissions for Public & Authenticated roles ──
    const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'public' },
    });
    const authenticatedRole = await strapi.db.query('plugin::users-permissions.role').findOne({
      where: { type: 'authenticated' },
    });

    // Permissions to grant to the Public role (unauthenticated visitors)
    const publicPermissions = [
      'plugin::users-permissions.auth.register',
      'plugin::users-permissions.auth.callback',
      'plugin::users-permissions.auth.connect',
      // Public can access informational pages only.
      'api::faq.faq.find',
      'api::faq.faq.findOne',
      'api::page.page.find',
      'api::page.page.findOne',
    ];

    const publicRestrictedPermissions = [
      'api::skill.skill.find',
      'api::skill.skill.findOne',
      'api::skill-category.skill-category.find',
      'api::skill-category.skill-category.findOne',
    ];

    // Permissions to grant to the Authenticated role (logged-in users)
    const authenticatedPermissions = [
      // Users API
      'plugin::users-permissions.user.me',
      'plugin::users-permissions.user.find',
      'plugin::users-permissions.user.findOne',
      'plugin::users-permissions.user.update',
      // Skills
      'api::skill.skill.find',
      'api::skill.skill.findOne',
      'api::skill.skill.create',
      'api::skill.skill.update',
      'api::skill.skill.delete',
      // Skill Categories
      'api::skill-category.skill-category.find',
      'api::skill-category.skill-category.findOne',
      'api::skill-category.skill-category.create',
      'api::skill-category.skill-category.update',
      'api::skill-category.skill-category.delete',
      // Bookings
      'api::booking.booking.find',
      'api::booking.booking.findOne',
      'api::booking.booking.create',
      'api::booking.booking.update',
      // Reviews
      'api::review.review.find',
      'api::review.review.findOne',
      'api::review.review.create',
      // Reports
      'api::report.report.find',
      'api::report.report.findOne',
      'api::report.report.create',
      'api::report.report.update',
      // FAQs & Pages (read)
      'api::faq.faq.find',
      'api::faq.faq.findOne',
      'api::page.page.find',
      'api::page.page.findOne',
    ];

    async function setPermissions(role, actions, enabled) {
      for (const action of actions) {
        const existingPermissions = await strapi.db.query('plugin::users-permissions.permission').findMany({
          where: {
            action,
            role: {
              id: role.id,
            },
          },
        });

        if (existingPermissions.length === 0) {
          await strapi.db.query('plugin::users-permissions.permission').create({
            data: { action, role: role.id, enabled },
          });
          continue;
        }

        for (const permission of existingPermissions) {
          if (permission.enabled !== enabled) {
            await strapi.db.query('plugin::users-permissions.permission').update({
              where: { id: permission.id },
              data: { enabled },
            });
          }
        }
      }
    }

    if (publicRole) {
      await setPermissions(publicRole, publicPermissions, true);
      await setPermissions(publicRole, publicRestrictedPermissions, false);
      console.log('✅ Public role permissions configured');
    }
    if (authenticatedRole) {
      await setPermissions(authenticatedRole, authenticatedPermissions, true);
      console.log('✅ Authenticated role permissions configured');
    }

    // Seed skill categories if they don't exist
    const existingCategories = await strapi.documents('api::skill-category.skill-category').findMany({});

    if (existingCategories.length === 0) {
      const categories = [
        {
          name: 'Cognitive / Intellectual Skills',
          slug: 'cognitive-intellectual-skills',
          description: 'Skills that involve thinking, reasoning, and learning. Examples: Critical thinking, problem-solving, decision-making, analytical reasoning, creativity.',
          icon: 'Brain',
        },
        {
          name: 'Technical / Hard Skills',
          slug: 'technical-hard-skills',
          description: 'Job-specific abilities that can be measured or taught. Examples: Programming, data analysis, graphic design, accounting.',
          icon: 'Wrench',
        },
        {
          name: 'Interpersonal / People Skills',
          slug: 'interpersonal-people-skills',
          description: 'Skills that help you work and communicate effectively with others. Examples: Communication, teamwork, leadership, conflict resolution.',
          icon: 'Users',
        },
        {
          name: 'Personal / Self-Management Skills',
          slug: 'personal-self-management-skills',
          description: 'Skills related to how you manage yourself and your work habits. Examples: Time management, adaptability, self-motivation, stress management.',
          icon: 'UserCheck',
        },
        {
          name: 'Organizational / Management Skills',
          slug: 'organizational-management-skills',
          description: 'Skills used to plan, organize, and oversee tasks or people. Examples: Project management, strategic planning, delegation, budgeting.',
          icon: 'ClipboardList',
        },
        {
          name: 'Digital / IT Skills',
          slug: 'digital-it-skills',
          description: 'Skills for using modern technology and digital tools. Examples: Web development, social media management, cybersecurity, cloud computing.',
          icon: 'Monitor',
        },
        {
          name: 'Language / Communication Skills',
          slug: 'language-communication-skills',
          description: 'Skills in speaking, writing, and understanding languages. Examples: Public speaking, writing and editing, active listening, multilingualism.',
          icon: 'MessageSquare',
        },
      ];

      for (const category of categories) {
        await strapi.documents('api::skill-category.skill-category').create({
          data: category,
        });
      }

      console.log('✅ Seeded 7 skill categories');
    }

    // Seed FAQs if they don't exist
    const existingFAQs = await strapi.documents('api::faq.faq').findMany({});
    if (existingFAQs.length === 0) {
      const faqs = [
        { question: 'What is SkillExchange?', answer: 'SkillExchange is a community platform where people can share, learn, and exchange skills with others without using money. It works on a skill-bartering system.', order: 1 },
        { question: 'How do I offer a skill?', answer: 'After logging in, go to your Dashboard and click "Offer a Skill". Fill in the details about what you can teach or provide, and submit it for admin approval.', order: 2 },
        { question: 'How do I request a skill?', answer: 'Go to your Dashboard and click "Request a Skill". Describe what you want to learn and our community members can reach out to help.', order: 3 },
        { question: 'How does the booking system work?', answer: 'When you find a skill you are interested in, click "Request Exchange" on the skill page. The skill provider will review your request and accept or decline it.', order: 4 },
        { question: 'Is SkillExchange free to use?', answer: 'Yes! SkillExchange is completely free. The platform is based on skill bartering — you exchange your skills for others without any monetary transaction.', order: 5 },
        { question: 'How do I report inappropriate content?', answer: 'On any skill listing page, click the "Report" button and describe the issue. Our admin team will review the report and take appropriate action.', order: 6 },
      ];
      for (const faq of faqs) {
        await strapi.documents('api::faq.faq').create({ data: faq });
      }
      console.log('✅ Seeded 6 FAQs');
    }

    // Seed CMS pages if they don't exist
    const existingPages = await strapi.documents('api::page.page').findMany({});
    if (existingPages.length === 0) {
      const pages = [
        {
          title: 'About Us',
          slug: 'about',
          content: '<h2>About SkillExchange</h2><p>SkillExchange is a platform designed to connect people who want to share their skills with those eager to learn. Our mission is to build a community where knowledge flows freely from person to person.</p><h3>Our Mission</h3><p>We believe everyone has something valuable to teach and something new to learn. SkillExchange removes the financial barrier by enabling skill-for-skill exchanges.</p><h3>How It Works</h3><p>Users create profiles, list skills they can offer, browse skills they want to learn, and arrange exchanges directly through the platform.</p>',
        },
        {
          title: 'Privacy Policy',
          slug: 'privacy-policy',
          content: '<h2>Privacy Policy</h2><p>Your privacy is important to us. This policy explains how we collect, use, and protect your information.</p><h3>Information We Collect</h3><p>We collect your name, email, and skill listings when you register. We do not sell your data to third parties.</p><h3>How We Use Your Data</h3><p>Your data is used solely to provide the SkillExchange service, match users for skill exchanges, and improve the platform experience.</p><h3>Data Security</h3><p>We use industry-standard security measures to protect your personal information.</p>',
        },
        {
          title: 'Terms of Service',
          slug: 'terms-of-service',
          content: '<h2>Terms of Service</h2><p>By using SkillExchange, you agree to these terms.</p><h3>User Conduct</h3><p>Users must behave respectfully and not post offensive, misleading, or harmful content. Violations may result in account suspension.</p><h3>Skill Listings</h3><p>All skill listings are subject to admin approval. We reserve the right to remove any content that violates our guidelines.</p><h3>Liability</h3><p>SkillExchange facilitates connections between users but is not responsible for the quality of skill exchanges or any disputes between users.</p>',
        },
      ];
      for (const page of pages) {
        await strapi.documents('api::page.page').create({ data: page });
      }
      console.log('✅ Seeded 3 CMS pages');
    }
  },
};
