#!/usr/bin/env node

/**
 * Pre-build script: fetches GitHub organization members and saves to public/data/team.json.
 * Uses GITHUB_TOKEN env var when available (CI), falls back to unauthenticated requests.
 *
 * The /orgs/{org}/members endpoint only returns public members for unauthenticated
 * requests. With a token that has `read:org` scope (like the default GITHUB_TOKEN in
 * GitHub Actions), it returns ALL members including those with private membership.
 */

import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ORG = 'degrasoft';
const OUTPUT = join(__dirname, '..', 'public', 'data', 'team.json');

async function fetchAllMembers(token) {
  const members = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const headers = {
      Accept: 'application/vnd.github.v3+json',
    };
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = `https://api.github.com/orgs/${ORG}/members?per_page=${perPage}&page=${page}`;
    const res = await fetch(url, { headers });

    if (!res.ok) {
      if (res.status === 401 && token) {
        console.warn('Token unauthorized, trying without auth...');
        return fetchAllMembers(null);
      }
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) break;

    members.push(...data);
    if (data.length < perPage) break;
    page++;
  }

  return members.map(({ id, login, avatar_url, html_url }) => ({
    id,
    login,
    avatar_url,
    html_url,
  }));
}

async function main() {
  const token = process.env.GITHUB_TOKEN || null;

  if (token) {
    console.log('GITHUB_TOKEN found, fetching all members (including private)...');
  } else {
    console.log('No GITHUB_TOKEN — fetching public members only...');
  }

  try {
    const members = await fetchAllMembers(token);
    console.log(`Fetched ${members.length} member(s)`);

    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, JSON.stringify(members, null, 2), 'utf-8');
    console.log(`Saved to ${OUTPUT}`);
  } catch (err) {
    console.error('Failed to fetch members:', err.message);
    // Write empty array so the build doesn't fail
    mkdirSync(dirname(OUTPUT), { recursive: true });
    writeFileSync(OUTPUT, '[]', 'utf-8');
    console.log('Wrote empty array as fallback');
    process.exit(0); // Don't fail the build
  }
}

main();
