import config from 'lib/config';
import { getProfile } from 'lib/github';
import { normalizeGithubProfile } from 'lib/utils/normalizers/normalizeGithub';

export default async function handler(req, res) {
  const profile = await getProfile().catch(err => {
    return res
      .status(200)
      .json({ recently_played: false, message: 'Something went wrong with GitHub.', extra: err });
  });

  if (!profile) {
    return res.status(500).json({ error: 'Github not available' });
  }

  return res.status(200).json({
    profile: normalizeGithubProfile(profile)
  });
}

export async function profileFetcher() {
  let profileResponse;
  try {
    profileResponse = await fetch(`${config.baseUrl}/api/open-source/profile`);
  } catch (err) {
    console.warn(err);
  }

  const { profile } = await profileResponse.json();

  return profile;
}
