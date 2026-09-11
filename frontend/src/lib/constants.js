export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "expert", label: "Expert" },
];

export const SKILL_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
};

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/skills", label: "Browse Skills" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export const DASHBOARD_LINKS = [
  { href: "/dashboard", label: "Overview", icon: "LayoutDashboard" },
  { href: "/dashboard/my-skills", label: "My Skills", icon: "List" },
  { href: "/dashboard/offer-skill", label: "Offer a Skill", icon: "PlusCircle" },
  { href: "/dashboard/request-skill", label: "Request a Skill", icon: "Search" },
  { href: "/dashboard/bookings", label: "My Bookings", icon: "Calendar" },
  { href: "/dashboard/profile", label: "My Profile", icon: "UserCog" },
];

export const ADMIN_LINKS = [
  { href: "/admin", label: "Dashboard", icon: "LayoutDashboard" },
  { href: "/admin/users", label: "Manage Users", icon: "Users" },
  { href: "/admin/categories", label: "Categories", icon: "FolderTree" },
  { href: "/admin/skills", label: "Skill Approvals", icon: "CheckCircle" },
  { href: "/admin/reports", label: "Abuse Reports", icon: "Flag" },
];
