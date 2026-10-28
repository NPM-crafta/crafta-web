export interface ErrorCodeInfo {
  code: string;
  status: number;
  category: "Authentication" | "Authorization" | "Validation" | "Security & Rate Limit" | "Server & Integration";
  summary: string;
  description: string;
  trigger: string;
  jsonExample: string;
  solution: string;
}

export interface ApiItemInfo {
  name: string;
  kind: "function" | "class" | "interface" | "constant";
  signature: string;
  summary: string;
  parameters?: Array<{ name: string; type: string; description: string; optional?: boolean }>;
  returns?: string;
  example: string;
}

export interface AuthFlowStep {
  step: number;
  title: string;
  actor: "Client" | "Auth Server" | "Database" | "SMTP / Provider";
  description: string;
  codeSnippet?: string;
}

export interface AuthFlowDiagram {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  steps: AuthFlowStep[];
}

export const AUTH_ERROR_CODES: ErrorCodeInfo[] = [
  {
    code: "AUTH_UNAUTHORIZED",
    status: 401,
    category: "Authentication",
    summary: "Authentication token missing or invalid",
    description: "Returned when an unauthenticated request attempts to access a protected route requiring a valid JWT access token.",
    trigger: "Missing Authorization header, malformed Bearer header, or invalid signature.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Authentication required",\n    "code": "AUTH_UNAUTHORIZED",\n    "status": 401\n  }\n}`,
    solution: "Ensure the client includes a valid `Authorization: Bearer <access_token>` header or valid `x-access-token` header."
  },
  {
    code: "AUTH_FORBIDDEN",
    status: 403,
    category: "Authorization",
    summary: "Insufficient permissions or role hierarchy level",
    description: "Returned when a user is authenticated but does not possess the required RBAC permissions or role to execute the operation.",
    trigger: "Calling admin-only endpoints (e.g., POST /roles) or protected routes with a role that lacks permissions.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Insufficient permissions",\n    "code": "AUTH_FORBIDDEN",\n    "status": 403\n  }\n}`,
    solution: "Verify user role assignment in Mongo or grant the specific resource permission ('create', 'read', 'update', 'delete', 'manage')."
  },
  {
    code: "AUTH_NOT_FOUND",
    status: 404,
    category: "Server & Integration",
    summary: "Target user or resource not found",
    description: "Returned when attempting to query or operate on a user ID, session ID, or role that does not exist in the database.",
    trigger: "Querying non-existent user profile or attempting session revocation for an invalid session ID.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "User not found",\n    "code": "AUTH_NOT_FOUND",\n    "status": 404\n  }\n}`,
    solution: "Validate that the user ID or resource identifier exists before initiating updates or revocation."
  },
  {
    code: "AUTH_VALIDATION",
    status: 400,
    category: "Validation",
    summary: "Invalid request payload or schema validation failure",
    description: "Returned when request body, query parameters, or URL params fail field validation checks (express-validator / Mongoose validation).",
    trigger: "Invalid email format on registration, missing fields, or malformed JSON payloads.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Invalid request data",\n    "code": "AUTH_VALIDATION",\n    "status": 400,\n    "details": {\n      "email": "Invalid email address format"\n    }\n  }\n}`,
    solution: "Check the `details` field in the response payload for exact field-level validation messages."
  },
  {
    code: "AUTH_BAD_REQUEST",
    status: 400,
    category: "Validation",
    summary: "Malformed request or invalid action state",
    description: "Returned when a request is structurally valid but logically invalid for the current system state.",
    trigger: "Submitting missing parameters or invalid action parameters during custom auth handlers.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Bad request",\n    "code": "AUTH_BAD_REQUEST",\n    "status": 400\n  }\n}`,
    solution: "Review API request specification and ensure all mandatory request body properties are supplied."
  },
  {
    code: "AUTH_CONFLICT",
    status: 409,
    category: "Validation",
    summary: "Account or resource duplicate key violation",
    description: "Returned when registering an email address or username that already exists in MongoDB.",
    trigger: "MongoDB duplicate key error (code 11000) on unique fields like email or username.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "email already exists",\n    "code": "AUTH_CONFLICT",\n    "status": 409,\n    "details": { "field": "email" }\n  }\n}`,
    solution: "Prompt the user to log in or use the forgot password flow if their email is already registered."
  },
  {
    code: "AUTH_RATE_LIMITED",
    status: 429,
    category: "Security & Rate Limit",
    summary: "Too many requests on rate-limited authentication route",
    description: "Returned when a client exceeds configured IP or route rate limits on sensitive endpoints (/login, /register, /2fa, /refresh-token).",
    trigger: "Exceeding `limits.loginMax` or default rate limit thresholds within the evaluation window.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Too many requests, please try later",\n    "code": "AUTH_RATE_LIMITED",\n    "status": 429\n  }\n}`,
    solution: "Wait until the rate limit window resets (default 15 minutes) or tune rate limit thresholds in `limits` config."
  },
  {
    code: "AUTH_ACCOUNT_LOCKED",
    status: 403,
    category: "Security & Rate Limit",
    summary: "Account locked due to excessive failed login attempts",
    description: "Returned when account lockout protection activates after `maxLoginAttempts` failed passwords.",
    trigger: "Submitting incorrect passwords consecutive times (default threshold: 5 attempts). Account is locked for 1 hour.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Account locked. Try again later.",\n    "code": "AUTH_ACCOUNT_LOCKED",\n    "status": 403\n  }\n}`,
    solution: "Wait 1 hour for auto-unlock, or use password reset to unlock immediately via email verification link."
  },
  {
    code: "AUTH_INVALID_CREDENTIALS",
    status: 401,
    category: "Authentication",
    summary: "Email address or password incorrect",
    description: "Returned during POST /login when the credentials do not match stored bcrypt hashes.",
    trigger: "Incorrect password or non-existent email address submitted on login.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Invalid credentials",\n    "code": "AUTH_INVALID_CREDENTIALS",\n    "status": 401\n  }\n}`,
    solution: "Verify email and password spelling. Note that failed attempts increment the account lockout counter."
  },
  {
    code: "AUTH_INVALID_TOKEN",
    status: 401,
    category: "Authentication",
    summary: "Malformed, untrusted, or tampered token presented",
    description: "Returned when JsonWebToken verification fails due to secret mismatch or token corruption.",
    trigger: "JWT header/payload signature verification failure or malformed token string.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Invalid token",\n    "code": "AUTH_INVALID_TOKEN",\n    "status": 401\n  }\n}`,
    solution: "Re-authenticate to obtain a fresh token pair signed with the current server JWT secret."
  },
  {
    code: "AUTH_EXPIRED_TOKEN",
    status: 401,
    category: "Authentication",
    summary: "JWT access token or email verification token has expired",
    description: "Returned when a token timestamp exceeds `accessTokenExpiry` or email verification / reset token timeout.",
    trigger: "Presenting access token after 1 hour (or custom expiry) or reset token after 60 minutes.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Token expired",\n    "code": "AUTH_EXPIRED_TOKEN",\n    "status": 401\n  }\n}`,
    solution: "Call POST /refresh-token with valid refresh token, or request a new password reset email."
  },
  {
    code: "AUTH_EMAIL_NOT_VERIFIED",
    status: 403,
    category: "Authentication",
    summary: "Unverified email address attempting restricted access",
    description: "Returned when `features.emailVerification` is active and an unverified user attempts to log in.",
    trigger: "User email has `isVerified: false` state during authentication check.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Email not verified",\n    "code": "AUTH_EMAIL_NOT_VERIFIED",\n    "status": 403\n  }\n}`,
    solution: "Check user inbox for verification link or trigger re-send of verification token."
  },
  {
    code: "AUTH_2FA_REQUIRED",
    status: 403,
    category: "Security & Rate Limit",
    summary: "Two-factor authentication step required before session issue",
    description: "Returned during initial credential validation if user account has 2FA enabled.",
    trigger: "Primary password validation succeeds for a user with TOTP 2FA enabled.",
    jsonExample: `{\n  "success": false,\n  "requires2FA": true,\n  "userId": "650f1a2b3c4d5e6f7a8b9c0d",\n  "error": {\n    "message": "Two-factor authentication required",\n    "code": "AUTH_2FA_REQUIRED",\n    "status": 403\n  }\n}`,
    solution: "Prompt user for TOTP code or backup code and submit to POST /2fa along with `userId`."
  },
  {
    code: "AUTH_2FA_FAILED",
    status: 401,
    category: "Security & Rate Limit",
    summary: "Invalid TOTP verification code or backup code",
    description: "Returned when the submitted 6-digit TOTP token fails speakeasy/otplib verification.",
    trigger: "Submitting an incorrect 6-digit TOTP code or expired backup code to POST /2fa.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Invalid 2FA code",\n    "code": "AUTH_2FA_FAILED",\n    "status": 401\n  }\n}`,
    solution: "Verify time synchronization on authenticator device or redeem a single-use backup code."
  },
  {
    code: "AUTH_PASSWORD_POLICY",
    status: 400,
    category: "Validation",
    summary: "Password does not satisfy policy requirements",
    description: "Returned when candidate password fails zxcvbn strength scoring or missing required characters (uppercase, numbers, symbols, min length).",
    trigger: "Submitting a simple or short password during registration or password reset.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Password policy violation",\n    "code": "AUTH_PASSWORD_POLICY",\n    "status": 400,\n    "details": [\n      "Password must be at least 8 characters",\n      "Password must contain at least one number"\n    ]\n  }\n}`,
    solution: "Ensure candidate password meets length, complexity, and zxcvbn strength score thresholds."
  },
  {
    code: "AUTH_PASSWORD_REUSE",
    status: 400,
    category: "Validation",
    summary: "Password matches recent password history",
    description: "Returned during password reset if new password matches one of the last 5 historical passwords.",
    trigger: "Re-using an old password during POST /reset-password when password history enforcement is enabled.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Cannot reuse previous passwords",\n    "code": "AUTH_PASSWORD_REUSE",\n    "status": 400\n  }\n}`,
    solution: "Choose a brand-new password that has not been used on this account previously."
  },
  {
    code: "AUTH_SMTP_DISABLED",
    status: 503,
    category: "Server & Integration",
    summary: "SMTP email service is not configured on server",
    description: "Returned when an email-dependent operation (forgot password, email verification) is invoked without active SMTP credentials.",
    trigger: "Invoking email flows when `smtp: null` or `smtpConfig` is omitted in initialization.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Email delivery is not configured",\n    "code": "AUTH_SMTP_DISABLED",\n    "status": 503\n  }\n}`,
    solution: "Supply `smtp: { host, port, auth: { user, pass }, from }` in `auth(config)` or disable `features.emailVerification`."
  },
  {
    code: "AUTH_SOCIAL_FAILED",
    status: 400,
    category: "Server & Integration",
    summary: "Social provider OAuth handshake or profile retrieval failed",
    description: "Returned when Passport Google/Facebook/GitHub OAuth authentication encounters a provider error or scope failure.",
    trigger: "Invalid OAuth client credentials, mismatched callback URL, or revoked provider authorization.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Social login failed",\n    "code": "AUTH_SOCIAL_FAILED",\n    "status": 400\n  }\n}`,
    solution: "Check `social.google` credentials (clientID, clientSecret) and confirm provider callback URL exact match."
  },
  {
    code: "AUTH_INTERNAL",
    status: 500,
    category: "Server & Integration",
    summary: "Unhandled server exception or unnormalized error",
    description: "Returned when an unexpected runtime exception occurs inside the authentication pipeline.",
    trigger: "Database connection drops, unexpected file system error, or unhandled promise rejection.",
    jsonExample: `{\n  "success": false,\n  "error": {\n    "message": "Internal server error",\n    "code": "AUTH_INTERNAL",\n    "status": 500\n  }\n}`,
    solution: "Inspect server winston error logs in `audit.log` or console output for stack trace diagnostics."
  }
];

export const AUTH_FLOW_DIAGRAMS: AuthFlowDiagram[] = [
  {
    id: "jwt-rotation",
    title: "JWT Access & Refresh Token Rotation Flow",
    subtitle: "Automatic sliding session expiry with token reuse detection and revocation",
    description: "When an access token expires (default 1h), the client presents a 7-day refresh token. The auth service issues a new token pair and invalidates the old refresh token.",
    steps: [
      {
        step: 1,
        title: "Initial Login Credentials",
        actor: "Client",
        description: "Client submits email & password to POST /login.",
        codeSnippet: `const res = await fetch('/login', {\n  method: 'POST',\n  body: JSON.stringify({ email, password })\n});`
      },
      {
        step: 2,
        title: "Credential & Password Hash Verification",
        actor: "Auth Server",
        description: "Server checks bcrypt hash, increments failed attempt counters if invalid, or resets counters on success."
      },
      {
        step: 3,
        title: "Token Pair Generation",
        actor: "Auth Server",
        description: "Server generates short-lived JWT accessToken (1h) and long-lived refreshToken (7d), saving session to MongoDB.",
        codeSnippet: `const { accessToken, refreshToken } = await authService.generateTokens(user);`
      },
      {
        step: 4,
        title: "Access Token Expiry (401 AUTH_EXPIRED_TOKEN)",
        actor: "Client",
        description: "Subsequent API request with access token receives 401 AUTH_EXPIRED_TOKEN."
      },
      {
        step: 5,
        title: "Refresh Request (POST /refresh-token)",
        actor: "Client",
        description: "Client interceptor automatically sends `refreshToken` to POST /refresh-token."
      },
      {
        step: 6,
        title: "Rotation & Old Token Revocation",
        actor: "Database",
        description: "Server verifies refresh token in Mongo session store, revokes used token, and returns brand-new token pair.",
        codeSnippet: `// Token family rotation prevents token theft replay attacks`
      }
    ]
  },
  {
    id: "two-factor",
    title: "2FA TOTP Provisioning & Verification Flow",
    subtitle: "Enterprise-grade TOTP secret generation, QR rendering, and backup codes",
    description: "Enforces secondary authentication using authenticator apps (Google Authenticator, Authy, 1Password) with 10 single-use hashed backup codes.",
    steps: [
      {
        step: 1,
        title: "Generate TOTP Secret & QR Code",
        actor: "Auth Server",
        description: "Server generates high-entropy base32 secret and QR code data URL using speakeasy and qrcode library.",
        codeSnippet: `const { secret, qrCode } = await mfaService.generateSecret('UserApp', 'MyCompany');`
      },
      {
        step: 2,
        title: "Client Scans QR & Confirms Setup Code",
        actor: "Client",
        description: "User scans QR in authenticator app and verifies 6-digit TOTP code."
      },
      {
        step: 3,
        title: "Hashed Backup Code Generation",
        actor: "Database",
        description: "Server stores bcrypt-hashed backup codes in user record and returns 10 raw codes to user for offline vault storage.",
        codeSnippet: `const backupCodes = await authService.generateBackupCodes(userId, mfaService);`
      },
      {
        step: 4,
        title: "Login Interception (AUTH_2FA_REQUIRED)",
        actor: "Auth Server",
        description: "During future logins, password verification succeeds but returns status 403 with `requires2FA: true` and temporary `userId`."
      },
      {
        step: 5,
        title: "2FA Verification (POST /2fa)",
        actor: "Client",
        description: "Client posts `userId` + 6-digit TOTP code or backup code to complete authentication.",
        codeSnippet: `const res = await fetch('/2fa', {\n  method: 'POST',\n  body: JSON.stringify({ userId, code: '482910' })\n});`
      }
    ]
  },
  {
    id: "session-management",
    title: "Session Management & Multi-Device Logout",
    subtitle: "Track active sessions per device, IP, user-agent, and revoke selectively or globally",
    description: "Allows users to inspect active device sessions, logout individual devices, or revoke all active sessions across desktop/mobile.",
    steps: [
      {
        step: 1,
        title: "Device Info Capture",
        actor: "Auth Server",
        description: "Upon login, server parses `User-Agent` and `req.ip`, generating a unique `sessionId` stored in Mongo Session collection."
      },
      {
        step: 2,
        title: "Max Sessions Enforcement",
        actor: "Database",
        description: "If active sessions exceed `session.maxSessions` (default 5), oldest inactive session is automatically pruned."
      },
      {
        step: 3,
        title: "Single Device Logout (POST /logout)",
        actor: "Auth Server",
        description: "User logs out of current device: revokes specified `sessionId` and clears current refresh token."
      },
      {
        step: 4,
        title: "Global Revocation (POST /logout-all)",
        actor: "Auth Server",
        description: "User triggers security killswitch: invalidates all stored sessions and bump user `tokenVersion` to invalidate all active JWTs.",
        codeSnippet: `await sessionService.revokeAllSessions(user);\nawait user.revokeAllRefreshTokens();`
      }
    ]
  },
  {
    id: "passwordless",
    title: "Passwordless Magic Link Flow",
    subtitle: "Password-free authentication via cryptographically signed email tokens",
    description: "Allows users to log in securely without entering passwords by receiving a short-lived single-use magic link in their email inbox.",
    steps: [
      {
        step: 1,
        title: "Request Magic Link (POST /auth/magic-link)",
        actor: "Client",
        description: "User inputs email address to request passwordless sign-in."
      },
      {
        step: 2,
        title: "Generate Token & SMTP Dispatch",
        actor: "SMTP / Provider",
        description: "Server generates 15-minute crypto token, persists hashed token in DB, and dispatches email with magic link.",
        codeSnippet: `const magicLinkUrl = \`\${baseUrl}/auth/magic-link/verify?token=\${rawToken}\`;`
      },
      {
        step: 3,
        title: "Click Magic Link (GET /auth/magic-link/verify)",
        actor: "Client",
        description: "User clicks link in email. Client hits verification endpoint with `?token=...`."
      },
      {
        step: 4,
        title: "Token Validation & Session Issuance",
        actor: "Auth Server",
        description: "Server verifies token signature and expiry, marks token as used, and returns standard JWT access and refresh tokens."
      }
    ]
  }
];

export const API_REFERENCE_ITEMS: ApiItemInfo[] = [
  {
    name: "auth(config?: AuthConfig)",
    kind: "function",
    signature: "export function auth(config?: AuthConfig): (app: ExpressApp) => void;",
    summary: "Main initializer function for the @dax-crafta/auth module. Returns an Express/Crafta app middleware installer.",
    parameters: [
      { name: "config", type: "AuthConfig", description: "Configuration object for routes, password policies, features, SMTP, and social auth.", optional: true }
    ],
    returns: "(app: any) => void - A function that registers auth routes, middlewares, rate limiters, and health checks on the app instance.",
    example: `import express from 'express';\nimport { auth } from '@dax-crafta/auth';\n\nconst app = express();\napp.use(express.json());\n\nauth({\n  env: { JWT_SECRET: process.env.JWT_SECRET! },\n  mongoUrl: process.env.MONGO_URL!,\n  features: { twoFactor: true, rateLimit: true, auditLogs: true }\n})(app);`
  },
  {
    name: "ApiError",
    kind: "class",
    signature: "export class ApiError extends Error { code: string; status: number; details?: any; ... }",
    summary: "Standardized machine-readable error class thrown across all library operations. Carries namespaced error code (AUTH_*), HTTP status, and payload details.",
    parameters: [
      { name: "message", type: "string", description: "Human readable error message." },
      { name: "code", type: "string", description: "Namespaced error code, e.g. 'AUTH_INVALID_CREDENTIALS'.", optional: true },
      { name: "status", type: "number", description: "HTTP status code, e.g. 401, 403, 400.", optional: true },
      { name: "details", type: "any", description: "Field validation errors or structured error details.", optional: true }
    ],
    returns: "ApiError instance",
    example: `import { ApiError, normalizeError } from '@dax-crafta/auth';\n\ntry {\n  // throw static helper\n  throw ApiError.unauthorized('Invalid access token');\n} catch (err) {\n  const normalized = normalizeError(err);\n  console.log(normalized.code); // 'AUTH_UNAUTHORIZED'\n}`
  },
  {
    name: "AuthService",
    kind: "interface",
    signature: "export interface AuthService { register, login, verify2FA, refreshToken, forgotPassword, resetPassword, logout, updateProfile ... }",
    summary: "Core service interface handling user registration, authentication, 2FA validation, token refresh, password resets, and profile management.",
    parameters: [
      { name: "register", type: "(userData: any) => Promise<any>", description: "Hashes password with bcrypt, enforces policy, and creates user in Mongo." },
      { name: "login", type: "(email, password, deviceInfo) => Promise<any>", description: "Verifies credentials, checks lockout status, and returns tokens or 2FA prompt." },
      { name: "refreshToken", type: "(refreshToken: string) => Promise<any>", description: "Validates refresh token and issues fresh JWT access/refresh token pair." },
      { name: "logout", type: "(userId: string, sessionId: string) => Promise<boolean>", description: "Revokes specific session ID and clears refresh tokens." }
    ],
    returns: "AuthService instance",
    example: `// Access service from app or direct import\nconst user = await authService.register({\n  email: 'user@example.com',\n  password: 'SuperSecret123!'\n});`
  },
  {
    name: "RoleService",
    kind: "interface",
    signature: "export interface RoleService { createRole, getRoleByName, updateRole, deleteRole, assignPermissions, checkPermission }",
    summary: "Role-Based Access Control (RBAC) service for managing custom roles and resource-level permissions (create, read, update, delete, manage).",
    parameters: [
      { name: "createRole", type: "(roleData: any) => Promise<any>", description: "Persists a new role record with permissions array." },
      { name: "checkPermission", type: "(role: string, resource: string, action: string) => Promise<boolean>", description: "Evaluates whether a role permits an action on a resource." }
    ],
    returns: "RoleService instance",
    example: `const isAllowed = await roleService.checkPermission('editor', 'articles', 'update');`
  },
  {
    name: "AuditService",
    kind: "interface",
    signature: "export interface AuditService { logActivity, getUserActivity, getActivityByDateRange, getFailedLoginAttempts }",
    summary: "Audit logging service providing structured security event tracking to MongoDB and winston log files.",
    parameters: [
      { name: "logActivity", type: "(data: any) => Promise<any>", description: "Logs security action (login, register, password_reset) with IP and User-Agent." },
      { name: "getFailedLoginAttempts", type: "(userId, windowMs) => Promise<number>", description: "Returns count of failed logins within evaluation window." }
    ],
    returns: "AuditService instance",
    example: `const logs = await auditService.getUserActivity('userId123', { limit: 10 });`
  },
  {
    name: "MFAService",
    kind: "interface",
    signature: "export interface MFAService { generateSecret, verifyToken, generateBackupCodes, verifyBackupCode }",
    summary: "Multi-factor authentication utility supporting TOTP secret generation, QR rendering, token verification, and hashed backup codes.",
    parameters: [
      { name: "generateSecret", type: "(label: string, issuer?: string) => Promise<{ secret, qrCode }>", description: "Creates base32 TOTP secret and QR code data URL." },
      { name: "verifyToken", type: "(token: string, secret: string) => boolean", description: "Validates 6-digit TOTP code using speakeasy algorithm." }
    ],
    returns: "MFAService instance",
    example: `const { secret, qrCode } = await mfaService.generateSecret('user@domain.com', 'CraftaAuth');`
  },
  {
    name: "runAdaptiveTests",
    kind: "function",
    signature: "export function runAdaptiveTests(config?: AuthConfig, flags?: Record<string, boolean>, opts?: { logging?: boolean }): Promise<boolean>;",
    summary: "Adaptive test runner that inspects current AuthConfig and feature flags, automatically executing relevant smoke tests.",
    parameters: [
      { name: "config", type: "AuthConfig", description: "Active authentication configuration." },
      { name: "flags", type: "Record<string, boolean>", description: "Optional explicit feature flag map overrides.", optional: true },
      { name: "opts", type: "{ logging?: boolean }", description: "Optionally suppress terminal console output.", optional: true }
    ],
    returns: "Promise<boolean> - Returns true if all applicable feature tests pass.",
    example: `import { runAdaptiveTests } from '@dax-crafta/auth';\n\nconst success = await runAdaptiveTests(myConfig);\nconsole.log('Smoke tests passed:', success);`
  }
];

export const QUICKSTART_STEPS = [
  {
    step: 1,
    title: "Installation",
    description: "Install `@dax-crafta/auth` along with its peer dependency `crafta` in your Express or Node.js project.",
    code: `npm install @dax-crafta/auth crafta`,
    language: "bash"
  },
  {
    step: 2,
    title: "Environment Variables Configuration",
    description: "Define your JWT secret, MongoDB connection URI, and optional SMTP credentials in your `.env` file.",
    code: `# .env\nPORT=3000\nJWT_SECRET=super_secret_jwt_key_change_in_production_32chars\nMONGODB_URI=mongodb://localhost:27017/my_app_db\nBASE_URL=http://localhost:3000\n\n# Optional SMTP configuration for email verification & alerts\nSMTP_HOST=smtp.mailtrap.io\nSMTP_PORT=2525\nSMTP_USER=your_smtp_user\nSMTP_PASS=your_smtp_password\nSMTP_FROM="Auth Admin <no-reply@myapp.com>"`,
    language: "env"
  },
  {
    step: 3,
    title: "Express / Crafta Server Integration",
    description: "Wire `@dax-crafta/auth` middleware in your server entrypoint. All auth endpoints are automatically attached.",
    code: `// server.js (JavaScript)\nconst express = require('express');\nconst { auth } = require('@dax-crafta/auth');\n\nconst app = express();\napp.use(express.json());\n\n// Mount auth module with configuration\nauth({\n  env: { JWT_SECRET: process.env.JWT_SECRET },\n  mongoUrl: process.env.MONGODB_URI,\n  baseUrl: process.env.BASE_URL,\n  passwordPolicy: {\n    minLength: 10,\n    requireUppercase: true,\n    requireNumbers: true,\n    requireSpecialChars: true\n  },\n  features: {\n    emailVerification: false, // Set true if SMTP is configured\n    rateLimit: true,\n    auditLogs: true,\n    twoFactor: true,\n    csrf: false\n  }\n})(app);\n\napp.listen(3000, () => {\n  console.log('Server running on http://localhost:3000');\n});`,
    language: "javascript"
  },
  {
    step: 4,
    title: "TypeScript Integration",
    description: "Fully typed setup with custom route mappings and autocomplete support.",
    code: `// server.ts (TypeScript)\nimport express, { Request, Response } from 'express';\nimport { auth, AuthConfig } from '@dax-crafta/auth';\n\nconst app = express();\napp.use(express.json());\n\nconst config: AuthConfig = {\n  env: {\n    JWT_SECRET: process.env.JWT_SECRET || 'dev-secret-key'\n  },\n  mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/app',\n  routes: {\n    login: '/api/v1/auth/login',\n    register: '/api/v1/auth/register',\n    profile: '/api/v1/me'\n  },\n  limits: {\n    loginMax: 5,\n    refreshMax: 20\n  }\n};\n\nauth(config)(app);\n\napp.listen(3000);`,
    language: "typescript"
  }
];

export const SECURITY_BEST_PRACTICES = [
  {
    title: "1. Secret Management & JWT Rotation",
    description: "Never hardcode JWT secrets. Use a 64-character high-entropy random string generated via `crypto.randomBytes(32).toString('hex')`. Rotate secrets regularly or use key identifiers (KID).",
    badge: "Critical",
    recommendations: [
      "Store JWT_SECRET exclusively in environment variables or key vaults.",
      "Keep short accessToken expiry (15m - 1h) paired with 7-day refresh token rotation.",
      "Enable token family revocation so reused refresh tokens immediately lock all sessions."
    ]
  },
  {
    title: "2. Password Policy & zxcvbn Strength Scoring",
    description: "Enforce realistic password entropy rather than arbitrary simple rules. `@dax-crafta/auth` includes built-in zxcvbn strength evaluation.",
    badge: "High Impact",
    recommendations: [
      "Set `passwordPolicy.minStrength: 3` (out of 4) for admin or production roles.",
      "Retain password history (`passwordHistory: 5`) to prevent users from immediately toggling back to weak old passwords.",
      "Enable account lockout (`features.securityAttempts: true`) after 5 failed attempts."
    ]
  },
  {
    title: "3. Cookie vs Header Token Storage & CSRF",
    description: "For web frontends, set `enableCSRF: true` and configure HTTP-only, SameSite=Strict cookies to eliminate XSS token theft.",
    badge: "Recommended",
    recommendations: [
      "Use `SameSite=Strict` and `Secure: true` in production HTTPS environments.",
      "For mobile/SPAs using headers, send `Authorization: Bearer <token>` over TLS 1.3.",
      "Enable route rate limiting on `/login`, `/2fa`, and `/forgot-password` to stop brute-force bots."
    ]
  },
  {
    title: "4. Multi-Factor Authentication (2FA) Mandatory Rollout",
    description: "Enforce 2FA for all administrative or elevated user accounts. `@dax-crafta/auth` provides TOTP QR provisioning and 10 hashed backup codes.",
    badge: "Compliance",
    recommendations: [
      "Store backup codes as bcrypt hashes in Mongo—never plain text.",
      "Require 2FA code re-prompt before sensitive operations (billing changes, password updates).",
      "Provide clear account recovery paths via backup codes when authenticator devices are lost."
    ]
  },
  {
    title: "5. Audit Trail & Real-time Security Observability",
    description: "Every authentication event (login, failure, 2FA prompt, password reset, role assignment) is logged to MongoDB and winston log files.",
    badge: "Enterprise",
    recommendations: [
      "Monitor `AuditLog` for unusual spike in `AUTH_INVALID_CREDENTIALS` or `AUTH_RATE_LIMITED`.",
      "Ingest `audit.log` into SIEM platforms (Datadog, Splunk, Grafana Loki).",
      "Set up instant alerts for `account_locked` security events."
    ]
  }
];
