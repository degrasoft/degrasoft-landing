#!/usr/bin/env node

/**
 * Pre-build script: fetches GitHub organization members and saves to public/data/team.json.
 *
 * Strategy:
 * 1. Try /orgs/{org}/members with GITHUB_TOKEN (sees all members including private)
 * 2. If empty, try fetching each known login from KNOWN_MEMBERS via /users/{login}
 * 3. If that also fails, fall back to live GitHub API on the client side
 *
 * KNOWN_MEMBERS should list the GitHub usernames of all org members.
 * Update this list when new members join.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG = 'degrasoft';
const OUTPUT = join(__dirname, '..', 'public', 'data', 'team.json');

// 👇 Update this list when new members join the organization
const KNOWN_MEMBERS = [
  'VinylRUS',
  'AveAcVale',
  // Add more GitHub usernames here, e.g.:
  // 'another-member',
];

async function fetchJSON(url, token) {
  const headers = { Accept: 'application/vnd.github.v3+json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(url, { headers });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

async function fetchOrgMembers(token) {
  const members = [];
  let page = 1;

  while (true) {
    const data = await fetchJSON(
      `https://api.github.com/orgs/${ORG}/members?per_page=100&page=${page}`,
      token
    );
    if (!Array.isArray(data) || data.length === 0) break;
    members.push(...data);
    if (data.length < 100) break;
    page++;
  }

  return members.map(({ id, login, avatar_url, html_url }) => ({
    id, login, avatar_url, html_url,
  }));
}

async function fetchUserByLogin(login, token) {
  const user = await fetchJSON(`https://api.github.com/users/${login}`, token);
  return {
    id: user.id,
    login: user.login,
    avatar_url: user.avatar_url,
    html_url: user.html_url,
  };
}

async function main() {
  const token = process.env.GITHUB_TOKEN || process.env.ORG_TOKEN || null;

  if (token) {
    console.log('Token found, fetching org members...');
  } else {
    console.log('No token — fetching public members only...');
  }

  try {
    // Step 1: Try org members API
    let members = await fetchOrgMembers(token);
    console.log(`Org members API returned ${members.length} member(s)`);

    // Step 2: If empty, use KNOWN_MEMBERS list
    if (members.length === 0 && KNOWN_MEMBERS.length > 0) {
      console.log(`API returned 0 members. Falling back to KNOWN_MEMBERS list (${KNOWN_MEMBERS.length} usernames)...`);
      members = [];
      for (const login of KNOWN_MEMBERS) {
        try {
          const user = await fetchUserByLogin(login, token);
          members.push(user);
          console.log(`  ✓ ${login}`);
        } catch (err) {
          console.warn(`  ✗ ${login}: ${err.message}`);
        }
      }
      console.log(`Fetched ${members.length} member(s) from KNOWN_MEMBERS`);
    }

    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, JSON.stringify(members, null, 2), 'utf-8');
    console.log(`Saved ${members.length} member(s) to ${OUTPUT}`);
  } catch (err) {
    console.error('Failed to fetch members:', err.message);
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, '[]', 'utf-8');
    console.log('Wrote empty array as fallback');
    process.exit(0);
  }
}

main();
