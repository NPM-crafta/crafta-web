'use client';

import { useState } from 'react';
import { Sliders, Copy, Check, Sparkles, Terminal } from 'lucide-react';
import { CodeBlock } from './CodeBlock';

export function ConfigBuilder() {
  const [emailVerification, setEmailVerification] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [rateLimit, setRateLimit] = useState(true);
  const [auditLogs, setAuditLogs] = useState(true);
  const [csrf, setCsrf] = useState(false);
  const [passwordless, setPasswordless] = useState(false);
  const [webhooks, setWebhooks] = useState(false);
  const [googleOAuth, setGoogleOAuth] = useState(false);
  const [customRoutes, setCustomRoutes] = useState(false);
  const [passwordPolicyStrict, setPasswordPolicyStrict] = useState(true);
  const [lang, setLang] = useState<'js' | 'ts'>('js');

  const generatedConfig = `// Generated AuthConfig for @dax-crafta/auth
${lang === 'ts' ? "import { auth, AuthConfig } from '@dax-crafta/auth';" : "const { auth } = require('@dax-crafta/auth');"}
${lang === 'ts' ? "import express from 'express';" : "const express = require('express');"}

const app = express();
app.use(express.json());

${lang === 'ts' ? "const authConfig: AuthConfig = {" : "const authConfig = {"}
  env: {
    JWT_SECRET: process.env.JWT_SECRET || 'your_32_character_jwt_secret_here'
  },
  mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost:27017/my_app_auth',
  baseUrl: process.env.BASE_URL || 'http://localhost:3000',
  ${
    customRoutes
      ? `routes: {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    verify: '/api/v1/auth/verify',
    profile: '/api/v1/me'
  },`
      : '// Using standard default routes (/login, /register, /verify, /profile)'
  }
  features: {
    emailVerification: ${emailVerification},
    twoFactor: ${twoFactor},
    rateLimit: ${rateLimit},
    auditLogs: ${auditLogs},
    csrf: ${csrf},
    passwordless: ${passwordless},
    webhooks: ${webhooks}
  },
  passwordPolicy: {
    minLength: ${passwordPolicyStrict ? 10 : 8},
    requireUppercase: ${passwordPolicyStrict},
    requireNumbers: true,
    requireSpecialChars: ${passwordPolicyStrict},
    minStrength: ${passwordPolicyStrict ? 3 : 2},
    passwordHistory: 5
  },
  limits: {
    loginMax: ${rateLimit ? 5 : 100},
    refreshMax: 20
  }${
    googleOAuth
      ? `,\n  social: {\n    google: {\n      clientID: process.env.GOOGLE_CLIENT_ID,\n      clientSecret: process.env.GOOGLE_CLIENT_SECRET,\n      callbackURL: '/auth/google/callback'\n    }\n  }`
      : ''
  }${
    emailVerification
      ? `,\n  smtp: {\n    host: process.env.SMTP_HOST || 'smtp.example.com',\n    port: Number(process.env.SMTP_PORT || 587),\n    auth: {\n      user: process.env.SMTP_USER,\n      pass: process.env.SMTP_PASS\n    },\n    from: process.env.SMTP_FROM || '"Auth" <no-reply@example.com>'\n  }`
      : ''
  }
};

auth(authConfig)(app);

app.listen(3000, () => {
  console.log('Crafta Auth server listening on port 3000');
});`;

  return (
    <div className="my-8 border border-[#213459] rounded-2xl bg-gradient-to-b from-[#091126] to-[#050a17] p-6 shadow-2xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1c2c4d] pb-5 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#15e6bb]/10 text-[#15e6bb] border border-[#15e6bb]/30 mb-2">
            <Sliders className="w-3.5 h-3.5" /> Config-First Developer Experience
          </div>
          <h2 className="text-2xl font-bold text-[#eff5ff] tracking-tight">Interactive AuthConfig Generator</h2>
          <p className="text-sm text-[#9ab0d3] mt-1">
            Toggle features visually to generate ready-to-paste production code for Node.js & TypeScript.
          </p>
        </div>

        <div className="flex items-center gap-1 bg-[#0d1730] p-1 rounded-xl border border-[#22365c]">
          <button
            onClick={() => setLang('js')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              lang === 'js' ? 'bg-[#15e6bb] text-[#051412]' : 'text-[#87a0c9] hover:text-[#d0e1fd]'
            }`}
          >
            JavaScript (CommonJS)
          </button>
          <button
            onClick={() => setLang('ts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              lang === 'ts' ? 'bg-[#15e6bb] text-[#051412]' : 'text-[#87a0c9] hover:text-[#d0e1fd]'
            }`}
          >
            TypeScript (ESM)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Toggle Controls Column */}
        <div className="lg:col-span-5 space-y-3 bg-[#081023] p-4 rounded-xl border border-[#1b2b4a]">
          <h3 className="text-xs font-mono text-[#6e8ab8] uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#15e6bb]" /> Security & Feature Toggles
          </h3>

          <div className="space-y-2 text-xs">
            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Email Verification</span>
                <p className="text-[11px] text-[#7893be]">Require token verification link before active login</p>
              </div>
              <input
                type="checkbox"
                checked={emailVerification}
                onChange={(e) => setEmailVerification(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Two-Factor Auth (2FA / TOTP)</span>
                <p className="text-[11px] text-[#7893be]">Authenticator apps + 10 hashed backup codes</p>
              </div>
              <input
                type="checkbox"
                checked={twoFactor}
                onChange={(e) => setTwoFactor(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Rate Limiting & Lockout</span>
                <p className="text-[11px] text-[#7893be]">Protect /login & /2fa against brute-force</p>
              </div>
              <input
                type="checkbox"
                checked={rateLimit}
                onChange={(e) => setRateLimit(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Audit Logging (Mongo + winston)</span>
                <p className="text-[11px] text-[#7893be]">Track login, register, 2FA, reset events</p>
              </div>
              <input
                type="checkbox"
                checked={auditLogs}
                onChange={(e) => setAuditLogs(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Passwordless Magic Links</span>
                <p className="text-[11px] text-[#7893be]">Send 15-min crypto sign-in links via email</p>
              </div>
              <input
                type="checkbox"
                checked={passwordless}
                onChange={(e) => setPasswordless(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Google OAuth Social Login</span>
                <p className="text-[11px] text-[#7893be]">Enable Passport Google OAuth2 strategy</p>
              </div>
              <input
                type="checkbox"
                checked={googleOAuth}
                onChange={(e) => setGoogleOAuth(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">CSRF Protection</span>
                <p className="text-[11px] text-[#7893be]">Add csurf middleware & /csrf-token route</p>
              </div>
              <input
                type="checkbox"
                checked={csrf}
                onChange={(e) => setCsrf(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Custom Route Prefixes</span>
                <p className="text-[11px] text-[#7893be]">Map endpoints to /api/v1/auth/*</p>
              </div>
              <input
                type="checkbox"
                checked={customRoutes}
                onChange={(e) => setCustomRoutes(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1730] border border-[#1d2d4e] cursor-pointer hover:border-[#2b4473]">
              <div>
                <span className="font-semibold text-[#e1ecff]">Strict Password Policy</span>
                <p className="text-[11px] text-[#7893be]">Length ≥ 10, uppercase, special, zxcvbn ≥ 3</p>
              </div>
              <input
                type="checkbox"
                checked={passwordPolicyStrict}
                onChange={(e) => setPasswordPolicyStrict(e.target.checked)}
                className="w-4 h-4 accent-[#15e6bb] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Code Output Column */}
        <div className="lg:col-span-7">
          <CodeBlock
            code={generatedConfig}
            language={lang === 'ts' ? 'typescript' : 'javascript'}
            filename={`server.${lang}`}
            showLineNumbers
          />
        </div>
      </div>
    </div>
  );
}
