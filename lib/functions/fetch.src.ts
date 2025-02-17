import { Agent, CredentialSession } from '@atproto/api';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { GEMINI_MODEL, GEMINI_SAFETY_SETTINGS } from '../utils/consts';

/**
 * Creates an instance of GoogleGenerativeAI using the provided API key.
 *
 * @param {string} GEMINI_CREDENTIALS - The API key used to authenticate requests to the Google Generative AI service.
 */
const generativeAI = new GoogleGenerativeAI(process.env.GEMINI_CREDENTIALS!);

/**
 * Retrieves the generative model for the specified model.
 */
const generativeModel = generativeAI.getGenerativeModel({ model: GEMINI_MODEL, safetySettings: GEMINI_SAFETY_SETTINGS });

/**
 * Creates a new session for the Bluesky social media platform.
 */
const session = new CredentialSession(new URL('https://bsky.social'));

/**
 * Coming Soon.
 */
const handler = async (): Promise<void> => {
  console.log('Hello World!');

  /**
   * Log in to the Bluesky session.
   */
  await session.login({
    identifier: process.env.BLUESKY_USERNAME!,
    password: process.env.BLUESKY_PASSWORD!,
  });

  /**
   * Create an instance of the Agent class using the session.
   */
  const agent = new Agent(session);

  const {
    data: { posts },
  } = await agent.app.bsky.feed.searchPosts({
    q: 'sanremo',
    limit: 100, // can be up to 100
    // cursor,
    since: '2025-01-25T20:00:02.584Z',
  });

  console.log(posts);
};

export { handler };
