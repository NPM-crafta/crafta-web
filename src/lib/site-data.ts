export type PackageDocSection = {
  id: string;
  title: string;
  summary: string;
  bullets: string[];
  codeTitle?: string;
  code?: string;
};

export type CraftaPackage = {
  slug: string;
  name: string;
  npm: string;
  description: string;
  category: "core" | "security" | "communication" | "data";
  status: "stable" | "beta" | "planned";
  highlights: string[];
  subtopics: Array<{ id: string; label: string }>;
  sections: PackageDocSection[];
};

export const craftaAccounts = {
  githubOrg: "https://github.com/NPM-crafta",
  npmCore: "https://www.npmjs.com/package/crafta",
  npmAuth: "https://www.npmjs.com/package/@dax-crafta/auth",
  x: "https://x.com/NPMcrafta",
  email: "mailto:npm.crafta@gmail.com",
};

export const craftaKeywords = [
  "crafta",
  "crafta framework",
  "crafta docs",
  "crafta ecosystem",
  "nodejs backend framework",
  "npm crafta",
  "crafta auth",
  "crafta packages docs",
  "@dax-crafta/auth",
  "nodejs authentication library",
  "jwt auth package",
  "rbac nodejs",
  "2fa nodejs",
  "refresh token rotation",
  "crafta packages",
  "express authentication",
  "mongodb auth package",
  "secure backend toolkit",
];

export const craftaPackages: CraftaPackage[] = [
  {
    slug: "crafta-core",
    name: "crafta",
    npm: "crafta",
    description:
      "Modular backend toolkit that acts as the backbone for Crafta ecosystem packages.",
    category: "core",
    status: "stable",
    highlights: [
      "Composable plugin-first server design",
      "Fast API bootstrapping for product teams",
      "Shared conventions across ecosystem packages",
    ],
    subtopics: [
      { id: "overview", label: "Overview" },
      { id: "positioning", label: "Positioning" },
      { id: "install", label: "Install" },
      { id: "plugin-model", label: "Plugin Model" },
      { id: "deployment", label: "Deployment" },
      { id: "best-practices", label: "Best Practices" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        summary:
          "crafta core provides the runtime shape for package-based backend architecture.",
        bullets: [
          "Framework-like productivity with library-like flexibility",
          "Composable middleware pipeline for large apps",
          "Designed for incremental package adoption",
        ],
      },
      {
        id: "positioning",
        title: "Positioning",
        summary:
          "Crafta core is designed for teams that want production patterns without locking into monolith framework constraints.",
        bullets: [
          "Small primitives with ecosystem-level consistency",
          "Supports drop-in auth and communication modules",
          "Keeps business logic in your app, not hidden magic",
        ],
      },
      {
        id: "install",
        title: "Install",
        summary: "Start with a minimal Node.js app and install crafta from npm.",
        bullets: [
          "npm install crafta",
          "Create app instance and plug packages",
          "Expose only the routes your product needs",
        ],
        codeTitle: "Minimal core setup",
        code: `const { crafta } = require("crafta");\n\nconst app = crafta();\napp.get("/health", (_req, res) => res.json({ ok: true }));\napp.listen(3000);`,
      },
      {
        id: "plugin-model",
        title: "Plugin Model",
        summary:
          "Packages behave like modules that can be switched on and configured with simple JSON objects.",
        bullets: [
          "Shared initialization shape across packages",
          "Easy environment-aware toggles",
          "Stable extension path as modules grow",
        ],
      },
      {
        id: "deployment",
        title: "Deployment",
        summary:
          "Crafta core is deployment-agnostic and can run in containerized or VM environments.",
        bullets: [
          "Works with Node process managers",
          "Supports horizontal scaling with stateless APIs",
          "Compatible with CI/CD release workflows",
        ],
      },
      {
        id: "best-practices",
        title: "Best Practices",
        summary:
          "Use modular boundaries, central error handling, and observability from day one.",
        bullets: [
          "Keep domain logic in separate services",
          "Use per-module config contracts",
          "Track auth, data, and messaging events centrally",
        ],
      },
    ],
  },
  {
    slug: "crafta-auth",
    name: "@dax-crafta/auth",
    npm: "@dax-crafta/auth",
    description:
      "Security-first authentication module with JWT, RBAC, 2FA, email workflows, and audit trails.",
    category: "security",
    status: "stable",
    highlights: [
      "Register, login, reset, refresh and profile flows",
      "Feature toggles for security, rate limit, and audit",
      "Config-driven developer experience for JS and TS apps",
    ],
    subtopics: [
      { id: "overview", label: "Overview" },
      { id: "quick-start", label: "Quick Start" },
      { id: "configuration", label: "Configuration" },
      { id: "feature-flags", label: "Feature Flags" },
      { id: "route-map", label: "Route Map" },
      { id: "security-flows", label: "Security Flows" },
      { id: "api-reference", label: "API Reference" },
      { id: "troubleshooting", label: "Troubleshooting" },
      { id: "production-checklist", label: "Production Checklist" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        summary:
          "@dax-crafta/auth is a complete authentication module for Crafta and Express-like apps.",
        bullets: [
          "Register/login/verify/reset/refresh flows",
          "Role-based authorization and ownership guards",
          "2FA, backup codes, and account protection",
        ],
      },
      {
        id: "quick-start",
        title: "Quick Start",
        summary:
          "Install, pass config, and ship secure auth without writing the same boilerplate again.",
        bullets: [
          "npm install @dax-crafta/auth",
          "auth(config)(app) setup pattern",
          "Works with default routes and optional overrides",
        ],
        codeTitle: "Basic integration",
        code: `const { crafta } = require("crafta");\nconst { auth } = require("@dax-crafta/auth");\n\nconst app = crafta();\nauth({\n  env: { JWT_SECRET: process.env.JWT_SECRET },\n  mongoUrl: process.env.MONGO_URL\n})(app);`,
      },
      {
        id: "configuration",
        title: "Configuration",
        summary:
          "Configuration is JSON-first so teams can tune behavior without rewriting auth internals.",
        bullets: [
          "Custom routes for API consistency",
          "Password policy for compliance and strength",
          "SMTP and social provider config where needed",
        ],
        codeTitle: "Detailed configuration",
        code: `auth({\n  routes: { login: "/api/auth/login", profile: "/api/me" },\n  passwordPolicy: { minLength: 10, minStrength: 3 },\n  features: { rateLimit: true, auditLogs: true, twoFactor: true },\n  social: { google: { clientID, clientSecret, callbackURL } }\n})(app);`,
      },
      {
        id: "feature-flags",
        title: "Feature Flags",
        summary:
          "Turn behaviors on or off using JSON config to match project maturity and compliance needs.",
        bullets: [
          "emailVerification, loginAlerts, twoFactor",
          "securityAttempts, rateLimit, auditLogs",
          "csrf control and route customization",
        ],
        codeTitle: "Flag-driven behavior",
        code: `auth({\n  features: {\n    emailVerification: false,\n    loginAlerts: false,\n    securityAttempts: true,\n    rateLimit: true,\n    auditLogs: true,\n    twoFactor: true\n  }\n})(app);`,
      },
      {
        id: "route-map",
        title: "Route Map",
        summary:
          "Includes defaults for register, login, verify, refresh, profile, and role creation.",
        bullets: [
          "All routes can be remapped",
          "Validation and safe update guards included",
          "Google OAuth path available with provider config",
        ],
      },
      {
        id: "security-flows",
        title: "Security Flows",
        summary:
          "Refresh token rotation, backup codes, password history checks, and lockout logic are built in.",
        bullets: [
          "Token revocation and session safety",
          "Password policy with strength checks",
          "Audit-ready events for auth-sensitive actions",
        ],
      },
      {
        id: "api-reference",
        title: "API Reference",
        summary:
          "Main exports and middleware contracts are designed for practical app integration.",
        bullets: [
          "auth(config): middleware installer",
          "ApiError for consistent error shapes",
          "inferFeatureFlags/runAdaptiveTests/testCatalog",
        ],
      },
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        summary:
          "Most issues are configuration mismatches, env assumptions, or provider setup details.",
        bullets: [
          "Check JWT secret and mongo connectivity",
          "Verify SMTP credentials and from address",
          "Confirm OAuth callback URL matches provider",
        ],
      },
      {
        id: "production-checklist",
        title: "Production Checklist",
        summary:
          "Before go-live, verify SMTP behavior, OAuth callback domains, and storage-level observability.",
        bullets: [
          "Set secure JWT secrets and env isolation",
          "Validate all auth routes in staging",
          "Monitor failed login and suspicious patterns",
        ],
      },
    ],
  },
  {
    slug: "crafta-chat",
    name: "@dax-crafta/chat",
    npm: "@dax-crafta/chat",
    description:
      "Conversation and assistant workflows package planned for unified product messaging.",
    category: "communication",
    status: "planned",
    highlights: [
      "Unified chat abstractions for apps",
      "Composable channel architecture",
      "Built for AI-assisted and human chat paths",
    ],
    subtopics: [
      { id: "overview", label: "Overview" },
      { id: "planned-api", label: "Planned API" },
      { id: "roadmap", label: "Roadmap" },
      { id: "contribution", label: "Contribution" },
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        summary:
          "Chat module is focused on reducing integration effort for product teams building communication features.",
        bullets: [
          "Package under ecosystem planning",
          "Goal is plugin parity with Crafta patterns",
          "Will prioritize security and auditability",
        ],
      },
      {
        id: "planned-api",
        title: "Planned API",
        summary:
          "Initial surface area is expected to include message channels, participant rules, and provider adapters.",
        bullets: [
          "Transport and delivery adapters",
          "Role-based conversation controls",
          "Event hooks for analytics and moderation",
        ],
      },
      {
        id: "roadmap",
        title: "Roadmap",
        summary:
          "Roadmap will be driven by real-world app needs from teams already using crafta and crafta-auth.",
        bullets: [
          "Alpha APIs for early adopters",
          "Migration-safe interface design",
          "Tight integration with auth and roles",
        ],
      },
      {
        id: "contribution",
        title: "Contribution",
        summary:
          "Early feedback helps shape API ergonomics before the package moves to stable.",
        bullets: [
          "Share product use-cases and required abstractions",
          "Suggest integration priorities for ecosystem parity",
          "Propose docs examples for first release",
        ],
      },
    ],
  },
];

export const packageBySlug = Object.fromEntries(
  craftaPackages.map((pkg) => [pkg.slug, pkg])
) as Record<string, CraftaPackage>;
