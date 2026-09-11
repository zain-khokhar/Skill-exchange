/**
 * Comprehensive Seed Script for Skill Exchange
 *
 * Creates realistic test data: users, skills, bookings, reviews, and reports.
 * Run via:  npm run seed        (from /backend)
 * Delete:   npm run seed:delete (from /backend)
 */

const { createStrapi } = require("@strapi/strapi");
const bcrypt = require("bcryptjs");
const path = require("path");

// ──────────────────────────── DATA ────────────────────────────

const USERS = [
  {
    username: "admin_sarah",
    email: "sarah.admin@skillexchange.com",
    password: "Admin123!",
    isAdmin: true,
    bio: "Platform administrator and community manager. Passionate about connecting people through skills.",
    location: "New York, NY",
  },
  {
    username: "john_dev",
    email: "john.dev@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Full-stack developer with 5 years of experience. Love teaching web development and learning new creative skills.",
    location: "San Francisco, CA",
  },
  {
    username: "maria_arts",
    email: "maria.arts@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Freelance graphic designer and watercolor artist. Always excited to share artistic techniques.",
    location: "Austin, TX",
  },
  {
    username: "alex_music",
    email: "alex.music@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Guitar teacher and music theory enthusiast. 10+ years of performing and teaching experience.",
    location: "Nashville, TN",
  },
  {
    username: "priya_data",
    email: "priya.data@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Data scientist specializing in machine learning. Keen on sharing knowledge about Python and data analysis.",
    location: "Seattle, WA",
  },
  {
    username: "carlos_cook",
    email: "carlos.cook@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Professional chef with expertise in Latin American and Mediterranean cuisine. Love teaching cooking basics.",
    location: "Miami, FL",
  },
  {
    username: "emma_photo",
    email: "emma.photo@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Portrait and landscape photographer. Offering photography workshops and editing lessons.",
    location: "Denver, CO",
  },
  {
    username: "omar_fitness",
    email: "omar.fitness@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Certified personal trainer and yoga instructor. Helping people achieve their fitness goals.",
    location: "Los Angeles, CA",
  },
  {
    username: "lisa_lang",
    email: "lisa.lang@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Polyglot fluent in English, Spanish, French, and Mandarin. Passionate about language exchange.",
    location: "Chicago, IL",
  },
  {
    username: "david_biz",
    email: "david.biz@example.com",
    password: "User1234!",
    isAdmin: false,
    bio: "Small business consultant and financial advisor. Happy to help with business planning and marketing strategies.",
    location: "Boston, MA",
  },
];

const CATEGORIES = [
  {
    name: "Cognitive / Intellectual Skills",
    slug: "cognitive-intellectual-skills",
    description:
      "Skills that involve thinking, reasoning, and learning. Examples: Critical thinking, problem-solving, decision-making, analytical reasoning, creativity.",
    icon: "Brain",
  },
  {
    name: "Technical / Hard Skills",
    slug: "technical-hard-skills",
    description:
      "Job-specific abilities that can be measured or taught. Examples: Programming, data analysis, graphic design, accounting.",
    icon: "Wrench",
  },
  {
    name: "Interpersonal / People Skills",
    slug: "interpersonal-people-skills",
    description:
      "Skills that help you work and communicate effectively with others. Examples: Communication, teamwork, leadership, conflict resolution.",
    icon: "Users",
  },
  {
    name: "Personal / Self-Management Skills",
    slug: "personal-self-management-skills",
    description:
      "Skills related to how you manage yourself and your work habits. Examples: Time management, adaptability, self-motivation, stress management.",
    icon: "UserCheck",
  },
  {
    name: "Organizational / Management Skills",
    slug: "organizational-management-skills",
    description:
      "Skills used to plan, organize, and oversee tasks or people. Examples: Project management, strategic planning, delegation, budgeting.",
    icon: "ClipboardList",
  },
  {
    name: "Digital / IT Skills",
    slug: "digital-it-skills",
    description:
      "Skills for using modern technology and digital tools. Examples: Web development, social media management, cybersecurity, cloud computing.",
    icon: "Monitor",
  },
  {
    name: "Language / Communication Skills",
    slug: "language-communication-skills",
    description:
      "Skills in speaking, writing, and understanding languages. Examples: Public speaking, writing and editing, active listening, multilingualism.",
    icon: "MessageSquare",
  },
];

// Map category slug -> skills
const SKILLS_BY_CATEGORY = {
  "technical-hard-skills": [
    {
      title: "Web Development with React & Next.js",
      type: "offered",
      description:
        "I can teach you modern web development using React and Next.js. We'll cover component architecture, state management, routing, server-side rendering, and deploying to production. Suitable for beginners who know basic HTML/CSS/JS.",
      level: "expert",
      location: "San Francisco, CA (or Remote)",
      availability: "Weekday evenings, 6–9 PM PST",
      status: "approved",
      ownerUsername: "john_dev",
    },
    {
      title: "Python for Data Analysis",
      type: "offered",
      description:
        "Learn Python programming with a focus on data analysis. Covers pandas, NumPy, matplotlib, and Jupyter notebooks. By the end, you'll be able to clean, analyze, and visualize real datasets on your own.",
      level: "intermediate",
      location: "Seattle, WA (or Remote)",
      availability: "Saturdays 10 AM–1 PM PST",
      status: "approved",
      ownerUsername: "priya_data",
    },
    {
      title: "Introduction to Machine Learning",
      type: "offered",
      description:
        "A beginner-friendly introduction to machine learning concepts. We'll cover supervised vs unsupervised learning, build simple models with scikit-learn, and discuss real-world applications. No math PhD required!",
      level: "intermediate",
      location: "Remote only",
      availability: "Flexible schedule, weekdays preferred",
      status: "approved",
      ownerUsername: "priya_data",
    },
    {
      title: "Database Design & SQL Fundamentals",
      type: "offered",
      description:
        "Master the fundamentals of relational database design and SQL queries. Topics include normalization, joins, aggregations, indexing, and best practices for schema design.",
      level: "beginner",
      location: "San Francisco, CA (or Remote)",
      availability: "Tuesday & Thursday evenings",
      status: "approved",
      ownerUsername: "john_dev",
    },
    {
      title: "Need Help with Mobile App Development",
      type: "requested",
      description:
        "Looking for someone experienced in React Native or Flutter to teach me mobile app development. I have a web development background and want to transition into building mobile apps.",
      level: "beginner",
      location: "San Francisco, CA (or Remote)",
      availability: "Weekends preferred",
      status: "approved",
      ownerUsername: "john_dev",
    },
  ],
  "cognitive-intellectual-skills": [
    {
      title: "Critical Thinking & Problem Solving Workshop",
      type: "offered",
      description:
        "Develop your critical thinking and analytical reasoning skills through interactive exercises. We'll work through real-world scenarios, practice logical analysis, and learn frameworks for making better decisions.",
      level: "intermediate",
      location: "Boston, MA (or Remote)",
      availability: "Wednesdays 7–9 PM EST",
      status: "approved",
      ownerUsername: "david_biz",
    },
    {
      title: "Creative Writing & Storytelling",
      type: "offered",
      description:
        "Unlock your creativity through structured writing exercises. Whether you want to write fiction, personal essays, or content for social media, I'll help you find your voice and craft compelling narratives.",
      level: "beginner",
      location: "Austin, TX (or Remote)",
      availability: "Monday & Wednesday afternoons",
      status: "approved",
      ownerUsername: "maria_arts",
    },
    {
      title: "Want to Learn Chess Strategy",
      type: "requested",
      description:
        "Looking for an intermediate-to-advanced chess player who can teach me opening theory, middlegame tactics, and endgame techniques. I know the basics but want to improve my competitive play.",
      level: "intermediate",
      location: "Remote preferred",
      availability: "Any evening after 6 PM",
      status: "approved",
      ownerUsername: "omar_fitness",
    },
  ],
  "interpersonal-people-skills": [
    {
      title: "Public Speaking & Presentation Skills",
      type: "offered",
      description:
        "Overcome stage fright and become a confident public speaker. I'll guide you through speech structure, body language, vocal variety, and handling Q&A sessions. Great for professionals and students alike.",
      level: "intermediate",
      location: "Chicago, IL (or Remote)",
      availability: "Weekday evenings, flexible",
      status: "approved",
      ownerUsername: "lisa_lang",
    },
    {
      title: "Team Leadership & Management Basics",
      type: "offered",
      description:
        "Learn the fundamentals of leading teams effectively, including delegation, conflict resolution, motivation techniques, and building a positive team culture. Based on real-world management experience.",
      level: "intermediate",
      location: "Boston, MA",
      availability: "Saturdays 2–5 PM EST",
      status: "approved",
      ownerUsername: "david_biz",
    },
    {
      title: "Need a Negotiation Skills Coach",
      type: "requested",
      description:
        "I want to improve my negotiation skills for both professional and personal situations. Looking for someone with sales, business, or legal negotiation experience.",
      level: "beginner",
      location: "Any location / Remote",
      availability: "Flexible",
      status: "approved",
      ownerUsername: "carlos_cook",
    },
  ],
  "personal-self-management-skills": [
    {
      title: "Yoga & Meditation for Beginners",
      type: "offered",
      description:
        "Start your mindfulness journey with beginner yoga and guided meditation. Sessions include breathing techniques, basic asanas, and relaxation methods for stress relief. No equipment needed.",
      level: "beginner",
      location: "Los Angeles, CA (or Remote)",
      availability: "Mon/Wed/Fri mornings 7–8 AM PST",
      status: "approved",
      ownerUsername: "omar_fitness",
    },
    {
      title: "Personal Fitness Training Program",
      type: "offered",
      description:
        "Customized fitness plans including strength training, cardio, flexibility, and nutrition guidance. Whether you want to lose weight, gain muscle, or build endurance, I'll create a program tailored for you.",
      level: "expert",
      location: "Los Angeles, CA",
      availability: "Weekdays 6–10 AM, Saturdays all day",
      status: "approved",
      ownerUsername: "omar_fitness",
    },
    {
      title: "Time Management & Productivity Coaching",
      type: "offered",
      description:
        "Learn proven productivity systems like GTD, Pomodoro, and time-blocking. I'll help you set up workflows, eliminate distractions, and achieve more in less time.",
      level: "beginner",
      location: "Remote only",
      availability: "Tuesdays and Thursdays 4–6 PM EST",
      status: "approved",
      ownerUsername: "david_biz",
    },
    {
      title: "Looking for a Stress Management Coach",
      type: "requested",
      description:
        "I have a high-pressure job and need someone to teach me practical stress management techniques — breathing exercises, journaling, mindfulness, or anything that works.",
      level: "beginner",
      location: "Remote preferred",
      availability: "Evenings after 7 PM",
      status: "approved",
      ownerUsername: "priya_data",
    },
  ],
  "organizational-management-skills": [
    {
      title: "Small Business Planning & Strategy",
      type: "offered",
      description:
        "Planning to start a business? I'll help you create a business plan, define your value proposition, analyze the market, and plan your finances. Over 10 years of consulting experience.",
      level: "expert",
      location: "Boston, MA (or Remote)",
      availability: "Weekdays 9 AM–5 PM EST",
      status: "approved",
      ownerUsername: "david_biz",
    },
    {
      title: "Project Management with Agile & Scrum",
      type: "offered",
      description:
        "Understand Agile methodology and Scrum framework from a practitioner's perspective. We'll cover sprints, stand-ups, retrospectives, backlog management, and tools like Jira and Trello.",
      level: "intermediate",
      location: "San Francisco, CA (or Remote)",
      availability: "Thursdays 6–8 PM PST",
      status: "approved",
      ownerUsername: "john_dev",
    },
  ],
  "digital-it-skills": [
    {
      title: "Graphic Design with Adobe Illustrator",
      type: "offered",
      description:
        "Master Adobe Illustrator for logo design, illustrations, and digital art. Lessons cover pen tool mastery, color theory, typography, and preparing files for print and web. Portfolio projects included.",
      level: "intermediate",
      location: "Austin, TX (or Remote)",
      availability: "Tuesdays and Fridays 10 AM–12 PM CST",
      status: "approved",
      ownerUsername: "maria_arts",
    },
    {
      title: "Photography Fundamentals & Editing",
      type: "offered",
      description:
        "Learn photography from composition and lighting to post-processing in Lightroom and Photoshop. Covers portrait, landscape, and product photography. Bring your own camera (any level works).",
      level: "beginner",
      location: "Denver, CO (or Remote for editing)",
      availability: "Weekends 9 AM–12 PM MST",
      status: "approved",
      ownerUsername: "emma_photo",
    },
    {
      title: "Social Media Marketing Basics",
      type: "offered",
      description:
        "Learn how to build and grow a social media presence for personal branding or business. Covers content strategy, Instagram/TikTok algorithms, hashtag research, and analytics.",
      level: "beginner",
      location: "Remote only",
      availability: "Flexible, message to arrange",
      status: "approved",
      ownerUsername: "emma_photo",
    },
    {
      title: "Need Help with Video Editing",
      type: "requested",
      description:
        "Looking for someone to teach me video editing using Premiere Pro or DaVinci Resolve. I want to edit vlogs and short films. I have basic computer skills.",
      level: "beginner",
      location: "Denver, CO or Remote",
      availability: "Weekends",
      status: "approved",
      ownerUsername: "emma_photo",
    },
    {
      title: "UI/UX Design Principles",
      type: "offered",
      description:
        "Learn user-centered design principles, wireframing with Figma, prototyping, usability testing, and building a compelling design portfolio. Great for developers wanting to improve their design eye.",
      level: "intermediate",
      location: "Austin, TX (or Remote)",
      availability: "Mondays and Wednesdays 2–4 PM CST",
      status: "pending",
      ownerUsername: "maria_arts",
    },
  ],
  "language-communication-skills": [
    {
      title: "Conversational Spanish for Beginners",
      type: "offered",
      description:
        "Learn practical conversational Spanish in a relaxed, friendly setting. Focus on everyday vocabulary, pronunciation, basic grammar, and real-life dialogues. Materials and practice exercises provided.",
      level: "beginner",
      location: "Chicago, IL (or Remote)",
      availability: "Mon/Wed/Fri 5–6 PM CST",
      status: "approved",
      ownerUsername: "lisa_lang",
    },
    {
      title: "French Language Conversation Practice",
      type: "offered",
      description:
        "Improve your French conversation skills through guided discussions, role-playing, and cultural topics. Ideal for intermediate learners who want to become more fluent and confident.",
      level: "intermediate",
      location: "Remote only",
      availability: "Tuesdays and Saturdays",
      status: "approved",
      ownerUsername: "lisa_lang",
    },
    {
      title: "Mandarin Chinese Basics",
      type: "offered",
      description:
        "Start learning Mandarin Chinese from scratch. Covers pinyin pronunciation, essential vocabulary, basic sentence patterns, and Chinese cultural context. Writing characters is optional.",
      level: "beginner",
      location: "Chicago, IL (or Remote)",
      availability: "Saturdays 10 AM–12 PM CST",
      status: "approved",
      ownerUsername: "lisa_lang",
    },
    {
      title: "Want to Learn Japanese",
      type: "requested",
      description:
        "I'm interested in learning basic Japanese — hiragana, katakana, everyday phrases, and cultural etiquette. Planning a trip to Japan next year and want to be conversational.",
      level: "beginner",
      location: "Any / Remote",
      availability: "Flexible schedule",
      status: "approved",
      ownerUsername: "alex_music",
    },
    {
      title: "Guitar Lessons — Acoustic & Electric",
      type: "offered",
      description:
        "Learn guitar from a seasoned musician. Lessons cover chords, strumming patterns, fingerpicking, music theory, and song learning. Beginners to intermediate players welcome.",
      level: "expert",
      location: "Nashville, TN (or Remote)",
      availability: "Weekdays 4–8 PM CST, Saturdays all day",
      status: "approved",
      ownerUsername: "alex_music",
    },
    {
      title: "Cooking Classes — Latin American Cuisine",
      type: "offered",
      description:
        "Hands-on cooking sessions featuring dishes from Mexico, Peru, Colombia, and Argentina. Learn authentic recipes, knife skills, sauce-making, and plating techniques. Ingredients list provided in advance.",
      level: "beginner",
      location: "Miami, FL",
      availability: "Saturdays and Sundays 11 AM–2 PM EST",
      status: "approved",
      ownerUsername: "carlos_cook",
    },
    {
      title: "Mediterranean Diet Meal Prep",
      type: "offered",
      description:
        "Learn to plan and prepare a week's worth of healthy Mediterranean meals. Covers olive oil-based cooking, fresh vegetables, lean proteins, and flavor-packed spice blends.",
      level: "beginner",
      location: "Miami, FL (or Remote demo)",
      availability: "Sundays 10 AM–1 PM EST",
      status: "approved",
      ownerUsername: "carlos_cook",
    },
  ],
};

// Bookings between users (referencing skill titles and usernames)
const BOOKINGS = [
  {
    skillTitle: "Web Development with React & Next.js",
    requesterUsername: "maria_arts",
    providerUsername: "john_dev",
    status: "completed",
    message:
      "Hi John! I'd love to learn React to build a portfolio site for my art. Can we start with the basics?",
    proposedDate: "2026-02-15T18:00:00.000Z",
    completedAt: "2026-02-22T20:00:00.000Z",
  },
  {
    skillTitle: "Guitar Lessons — Acoustic & Electric",
    requesterUsername: "john_dev",
    providerUsername: "alex_music",
    status: "completed",
    message:
      "Hey Alex, I've always wanted to learn guitar. I'm a total beginner — can you start with basic chords?",
    proposedDate: "2026-02-10T17:00:00.000Z",
    completedAt: "2026-02-17T19:00:00.000Z",
  },
  {
    skillTitle: "Conversational Spanish for Beginners",
    requesterUsername: "emma_photo",
    providerUsername: "lisa_lang",
    status: "completed",
    message:
      "Hi Lisa! I travel to South America for photography and want to learn basic Spanish. Let's do it!",
    proposedDate: "2026-03-01T17:00:00.000Z",
    completedAt: "2026-03-08T18:00:00.000Z",
  },
  {
    skillTitle: "Python for Data Analysis",
    requesterUsername: "david_biz",
    providerUsername: "priya_data",
    status: "accepted",
    message:
      "Priya, I need to improve my data analysis skills for my consulting work. Python would be perfect!",
    proposedDate: "2026-04-12T10:00:00.000Z",
  },
  {
    skillTitle: "Yoga & Meditation for Beginners",
    requesterUsername: "priya_data",
    providerUsername: "omar_fitness",
    status: "accepted",
    message:
      "Omar, I've been meaning to start yoga for stress relief. Your morning sessions sound perfect!",
    proposedDate: "2026-04-07T07:00:00.000Z",
  },
  {
    skillTitle: "Cooking Classes — Latin American Cuisine",
    requesterUsername: "omar_fitness",
    providerUsername: "carlos_cook",
    status: "pending",
    message:
      "Carlos! I'm trying to improve my meal prep game. Your Latin American class sounds amazing!",
    proposedDate: "2026-04-19T11:00:00.000Z",
  },
  {
    skillTitle: "Photography Fundamentals & Editing",
    requesterUsername: "alex_music",
    providerUsername: "emma_photo",
    status: "pending",
    message:
      "Emma, I want better photos for my music promotion. Can you teach me the basics of portrait photography?",
    proposedDate: "2026-04-20T09:00:00.000Z",
  },
  {
    skillTitle: "Graphic Design with Adobe Illustrator",
    requesterUsername: "carlos_cook",
    providerUsername: "maria_arts",
    status: "pending",
    message:
      "Maria, I need to design a logo for my cooking brand. Can you help me learn Illustrator?",
    proposedDate: "2026-04-25T10:00:00.000Z",
  },
  {
    skillTitle: "Small Business Planning & Strategy",
    requesterUsername: "emma_photo",
    providerUsername: "david_biz",
    status: "accepted",
    message:
      "David, I'm looking to turn my photography into a proper business. Would love your guidance!",
    proposedDate: "2026-04-14T09:00:00.000Z",
  },
  {
    skillTitle: "Personal Fitness Training Program",
    requesterUsername: "john_dev",
    providerUsername: "omar_fitness",
    status: "rejected",
    message:
      "Hey Omar, looking to get in shape. Can we do morning sessions?",
    proposedDate: "2026-03-20T06:00:00.000Z",
  },
];

// Reviews for completed bookings (by index into BOOKINGS array)
const REVIEWS = [
  {
    bookingIndex: 0,
    reviewerUsername: "maria_arts",
    revieweeUsername: "john_dev",
    rating: 5,
    comment:
      "John is an incredible teacher! He explained React concepts in a way that made sense even for a designer like me. My portfolio site looks amazing now. Highly recommended!",
  },
  {
    bookingIndex: 0,
    reviewerUsername: "john_dev",
    revieweeUsername: "maria_arts",
    rating: 5,
    comment:
      "Maria was a fantastic student — great questions and she picked things up really fast. The art portfolio we built together turned out beautifully!",
  },
  {
    bookingIndex: 1,
    reviewerUsername: "john_dev",
    revieweeUsername: "alex_music",
    rating: 5,
    comment:
      "Alex is a patient and talented guitar teacher. In just a few sessions, I learned basic chords and can play a few songs. The music theory background really helps!",
  },
  {
    bookingIndex: 1,
    reviewerUsername: "alex_music",
    revieweeUsername: "john_dev",
    rating: 4,
    comment:
      "John is a dedicated learner. He practiced between sessions and showed real progress. I look forward to more sessions!",
  },
  {
    bookingIndex: 2,
    reviewerUsername: "emma_photo",
    revieweeUsername: "lisa_lang",
    rating: 5,
    comment:
      "Lisa made Spanish so approachable! Her conversational style and real-world examples were perfect. I felt comfortable ordering food in Spanish after just a few sessions!",
  },
  {
    bookingIndex: 2,
    reviewerUsername: "lisa_lang",
    revieweeUsername: "emma_photo",
    rating: 4,
    comment:
      "Emma is motivated and brought great energy to our sessions. Her travel stories made practicing conversation really fun and engaging.",
  },
];

// Reports for abuse/issues
const REPORTS = [
  {
    reporterUsername: "emma_photo",
    reportedUsername: "carlos_cook",
    reason:
      "This user's profile claims they are a 'Michelin-star chef' but I could not verify this claim. The listing might be exaggerating credentials.",
    status: "reviewed",
    adminNotes: "Reviewed the profile. User has been asked to update their bio with accurate credentials.",
  },
  {
    reporterUsername: "david_biz",
    reportedUsername: "omar_fitness",
    skillTitle: "Personal Fitness Training Program",
    reason:
      "The skill description mentions 'nutrition guidance' which could be borderline medical advice. Might want to add a disclaimer.",
    status: "resolved",
    adminNotes:
      "Added a platform-wide disclaimer about health-related skills not replacing professional medical advice. User notified.",
  },
  {
    reporterUsername: "alex_music",
    reportedUsername: "john_dev",
    reason: "Minor issue — the scheduling system showed conflicting timeslots. Not a user fault but reporting for platform improvement.",
    status: "dismissed",
    adminNotes: "This is a platform UX issue, not an abuse report. Forwarded to dev team.",
  },
];

// ──────────────────────────── SEED LOGIC ────────────────────────────

async function seed(strapi) {
  console.log("\n🌱 Starting comprehensive seed...\n");

  // 1. Create users via the users-permissions plugin
  console.log("👤 Creating users...");
  const userMap = {};
  const existingUsers = await strapi.db
    .query("plugin::users-permissions.user")
    .findMany({ where: {} });
  const existingUsersByEmail = new Map(existingUsers.map((user) => [user.email, user]));

  // Get roles
  const authenticatedRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "authenticated" } });

  for (const userData of USERS) {
    const userPayload = {
      username: userData.username,
      email: userData.email,
      password: await bcrypt.hash(userData.password, 10),
      provider: "local",
      confirmed: true,
      blocked: false,
      role: authenticatedRole.id,
      isAdmin: userData.isAdmin || false,
      bio: userData.bio,
      location: userData.location,
    };
    const existing = existingUsersByEmail.get(userData.email);

    if (existing) {
      const updatedUser = await strapi.db
        .query("plugin::users-permissions.user")
        .update({
          where: { id: existing.id },
          data: userPayload,
        });

      userMap[userData.username] = updatedUser;
      console.log(`  ♻️  Refreshed seeded user: ${userData.username}${userData.isAdmin ? " (admin)" : ""}`);
      continue;
    }

    const user = await strapi.db
      .query("plugin::users-permissions.user")
      .create({
        data: userPayload,
      });

    userMap[userData.username] = user;
    console.log(`  ✅ Created user: ${userData.username}${userData.isAdmin ? " (admin)" : ""}`);
  }

  // Also map already-existing users
  for (const u of existingUsers) {
    if (!userMap[u.username]) {
      userMap[u.username] = u;
    }
  }

  // 2. Ensure categories exist for the manual seed as well.
  console.log("\n📁 Ensuring categories...");
  const existingCategories = await strapi
    .documents("api::skill-category.skill-category")
    .findMany({});
  const categoryMap = {};
  for (const categoryData of CATEGORIES) {
    const existingCategory = existingCategories.find((cat) => cat.slug === categoryData.slug);

    if (existingCategory) {
      categoryMap[existingCategory.slug] = existingCategory;
      console.log(`  📂 ${existingCategory.name} (${existingCategory.slug})`);
      continue;
    }

    const createdCategory = await strapi.documents("api::skill-category.skill-category").create({
      data: categoryData,
    });
    categoryMap[createdCategory.slug] = createdCategory;
    console.log(`  ✅ Created category: ${createdCategory.name} (${createdCategory.slug})`);
  }

  // 3. Create skills
  console.log("\n🛠️  Creating skills...");
  const skillMap = {};
  const existingSkills = await strapi
    .documents("api::skill.skill")
    .findMany({ populate: ["owner", "category"] });
  const existingSkillTitles = new Set(existingSkills.map((s) => s.title));

  for (const [catSlug, skills] of Object.entries(SKILLS_BY_CATEGORY)) {
    const category = categoryMap[catSlug];
    if (!category) {
      console.log(`  ⚠️  Category "${catSlug}" not found, skipping its skills`);
      continue;
    }

    for (const skillData of skills) {
      const owner = userMap[skillData.ownerUsername];
      if (!owner) {
        console.log(`  ⚠️  Owner "${skillData.ownerUsername}" not found for skill "${skillData.title}"`);
        continue;
      }

      const skillPayload = {
        title: skillData.title,
        type: skillData.type,
        description: skillData.description,
        level: skillData.level,
        location: skillData.location,
        availability: skillData.availability,
        status: skillData.status,
        category: category.documentId,
        owner: owner.documentId || owner.id,
      };

      if (existingSkillTitles.has(skillData.title)) {
        const existing = existingSkills.find((s) => s.title === skillData.title);
        const updatedSkill = await strapi.documents("api::skill.skill").update({
          documentId: existing.documentId,
          data: skillPayload,
        });

        skillMap[skillData.title] = updatedSkill;
        console.log(`  ♻️  Refreshed skill: "${skillData.title}"`);
        continue;
      }

      const skill = await strapi.documents("api::skill.skill").create({
        data: skillPayload,
      });

      skillMap[skillData.title] = skill;
      console.log(`  ✅ Created skill: "${skillData.title}" (${skillData.type}, ${skillData.status})`);
    }
  }

  // Also map existing skills
  for (const s of existingSkills) {
    if (!skillMap[s.title]) {
      skillMap[s.title] = s;
    }
  }

  // 4. Create bookings
  console.log("\n📅 Creating bookings...");
  const bookingList = [];
  const existingBookings = await strapi
    .documents("api::booking.booking")
    .findMany({ populate: ["skill", "requester", "provider"] });

  for (const bookingData of BOOKINGS) {
    const skill = skillMap[bookingData.skillTitle];
    const requester = userMap[bookingData.requesterUsername];
    const provider = userMap[bookingData.providerUsername];

    if (!skill || !requester || !provider) {
      console.log(
        `  ⚠️  Missing data for booking (skill: ${!!skill}, requester: ${!!requester}, provider: ${!!provider})`
      );
      bookingList.push(null);
      continue;
    }

    // Check if a similar booking already exists
    const alreadyExists = existingBookings.some(
      (b) =>
        b.skill?.documentId === skill.documentId &&
        b.requester?.documentId === (requester.documentId || requester.id) &&
        b.provider?.documentId === (provider.documentId || provider.id)
    );

    if (alreadyExists) {
      const existing = existingBookings.find(
        (b) =>
          b.skill?.documentId === skill.documentId &&
          b.requester?.documentId === (requester.documentId || requester.id)
      );
      bookingList.push(existing);
      console.log(`  ⏭️  Booking for "${bookingData.skillTitle}" already exists`);
      continue;
    }

    const booking = await strapi.documents("api::booking.booking").create({
      data: {
        status: bookingData.status,
        message: bookingData.message,
        proposedDate: bookingData.proposedDate,
        completedAt: bookingData.completedAt || null,
        skill: skill.documentId,
        requester: requester.documentId || requester.id,
        provider: provider.documentId || provider.id,
      },
    });

    bookingList.push(booking);
    console.log(
      `  ✅ Created booking: ${bookingData.requesterUsername} → ${bookingData.providerUsername} for "${bookingData.skillTitle}" [${bookingData.status}]`
    );
  }

  // 5. Create reviews (only for completed bookings)
  console.log("\n⭐ Creating reviews...");
  const existingReviews = await strapi
    .documents("api::review.review")
    .findMany({ populate: ["reviewer", "reviewee", "booking", "skill"] });

  for (const reviewData of REVIEWS) {
    const booking = bookingList[reviewData.bookingIndex];
    if (!booking) {
      console.log(`  ⚠️  Booking at index ${reviewData.bookingIndex} not found, skipping review`);
      continue;
    }

    const reviewer = userMap[reviewData.reviewerUsername];
    const reviewee = userMap[reviewData.revieweeUsername];
    const bookingInfo = BOOKINGS[reviewData.bookingIndex];
    const skill = skillMap[bookingInfo.skillTitle];

    if (!reviewer || !reviewee || !skill) {
      console.log(`  ⚠️  Missing data for review, skipping`);
      continue;
    }

    // Check if review already exists
    const alreadyExists = existingReviews.some(
      (r) =>
        r.booking?.documentId === booking.documentId &&
        r.reviewer?.documentId === (reviewer.documentId || reviewer.id)
    );

    if (alreadyExists) {
      console.log(
        `  ⏭️  Review by "${reviewData.reviewerUsername}" for booking already exists`
      );
      continue;
    }

    await strapi.documents("api::review.review").create({
      data: {
        rating: reviewData.rating,
        comment: reviewData.comment,
        reviewer: reviewer.documentId || reviewer.id,
        reviewee: reviewee.documentId || reviewee.id,
        booking: booking.documentId,
        skill: skill.documentId,
      },
    });

    console.log(
      `  ✅ Created review: ${reviewData.reviewerUsername} → ${reviewData.revieweeUsername} (${reviewData.rating}⭐)`
    );
  }

  // 6. Create reports
  console.log("\n🚩 Creating reports...");
  const existingReports = await strapi
    .documents("api::report.report")
    .findMany({ populate: ["reporter", "reportedUser", "reportedSkill"] });

  for (const reportData of REPORTS) {
    const reporter = userMap[reportData.reporterUsername];
    const reportedUser = userMap[reportData.reportedUsername];

    if (!reporter || !reportedUser) {
      console.log(`  ⚠️  Missing user data for report, skipping`);
      continue;
    }

    // Check if a similar report already exists
    const alreadyExists = existingReports.some(
      (r) =>
        r.reporter?.documentId === (reporter.documentId || reporter.id) &&
        r.reportedUser?.documentId === (reportedUser.documentId || reportedUser.id) &&
        r.reason === reportData.reason
    );

    if (alreadyExists) {
      console.log(`  ⏭️  Report by "${reportData.reporterUsername}" already exists`);
      continue;
    }

    const createData = {
      reason: reportData.reason,
      status: reportData.status,
      adminNotes: reportData.adminNotes,
      reporter: reporter.documentId || reporter.id,
      reportedUser: reportedUser.documentId || reportedUser.id,
    };

    // Link to skill if specified
    if (reportData.skillTitle && skillMap[reportData.skillTitle]) {
      createData.reportedSkill = skillMap[reportData.skillTitle].documentId;
    }

    await strapi.documents("api::report.report").create({
      data: createData,
    });

    console.log(
      `  ✅ Created report: ${reportData.reporterUsername} reported ${reportData.reportedUsername} [${reportData.status}]`
    );
  }

  console.log("\n🎉 Seed completed!\n");
  console.log("📊 Summary:");
  console.log(`   Users:    ${USERS.length}`);
  console.log(`   Categories: ${CATEGORIES.length}`);
  console.log(
    `   Skills:   ${Object.values(SKILLS_BY_CATEGORY).reduce((a, b) => a + b.length, 0)}`
  );
  console.log(`   Bookings: ${BOOKINGS.length}`);
  console.log(`   Reviews:  ${REVIEWS.length}`);
  console.log(`   Reports:  ${REPORTS.length}`);
  console.log("\n📝 Test accounts:");
  console.log("   Admin:  sarah.admin@skillexchange.com / Admin123!");
  console.log("   User:   john.dev@example.com / User1234!");
  console.log("   User:   maria.arts@example.com / User1234!");
  console.log("   (All non-admin users share password: User1234!)\n");
}

// ──────────────────────────── DELETE LOGIC ────────────────────────────

async function deleteSeedData(strapi) {
  console.log("\n🗑️  Deleting seed data...\n");

  // Delete in reverse dependency order: reviews → reports → bookings → skills → users
  // (Categories, FAQs, Pages are kept since they're bootstrapped)

  // 1. Delete all reviews
  const reviews = await strapi.documents("api::review.review").findMany({});
  for (const review of reviews) {
    await strapi.documents("api::review.review").delete({ documentId: review.documentId });
  }
  console.log(`  ✅ Deleted ${reviews.length} reviews`);

  // 2. Delete all reports
  const reports = await strapi.documents("api::report.report").findMany({});
  for (const report of reports) {
    await strapi.documents("api::report.report").delete({ documentId: report.documentId });
  }
  console.log(`  ✅ Deleted ${reports.length} reports`);

  // 3. Delete all bookings
  const bookings = await strapi.documents("api::booking.booking").findMany({});
  for (const booking of bookings) {
    await strapi.documents("api::booking.booking").delete({ documentId: booking.documentId });
  }
  console.log(`  ✅ Deleted ${bookings.length} bookings`);

  // 4. Delete all skills
  const skills = await strapi.documents("api::skill.skill").findMany({});
  for (const skill of skills) {
    await strapi.documents("api::skill.skill").delete({ documentId: skill.documentId });
  }
  console.log(`  ✅ Deleted ${skills.length} skills`);

  // 5. Delete seeded users (keep any manually created ones)
  const seededEmails = USERS.map((u) => u.email);
  const users = await strapi.db
    .query("plugin::users-permissions.user")
    .findMany({ where: {} });

  let deletedUserCount = 0;
  for (const user of users) {
    if (seededEmails.includes(user.email)) {
      await strapi.db
        .query("plugin::users-permissions.user")
        .delete({ where: { id: user.id } });
      deletedUserCount++;
    }
  }
  console.log(`  ✅ Deleted ${deletedUserCount} seeded users`);

  console.log("\n🧹 Seed data deleted! (Categories, FAQs, and Pages preserved)\n");
}

// ──────────────────────────── RUNNER ────────────────────────────

async function main() {
  const isDelete = process.argv.includes("--delete");

  let strapiInstance;
  try {
    strapiInstance = await createStrapi({
      appDir: path.resolve(__dirname, ".."),
      distDir: path.resolve(__dirname, "..", "dist"),
    }).load();

    if (isDelete) {
      await deleteSeedData(strapiInstance);
    } else {
      await seed(strapiInstance);
    }
  } catch (error) {
    console.error("❌ Seed script failed:", error);
    process.exit(1);
  } finally {
    if (strapiInstance) {
      await strapiInstance.destroy();
    }
    process.exit(0);
  }
}

main();
