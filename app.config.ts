import type { ConfigContext, ExpoConfig } from 'expo/config';

/** Preview APKs target physical phones only; store builds keep 32‑bit ARM for older devices. */
function androidBuildArchs(): string[] {
  return process.env.EAS_BUILD_PROFILE === 'preview'
    ? ['arm64-v8a']
    : ['armeabi-v7a', 'arm64-v8a'];
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const { name, slug } = config;
  if (typeof name !== 'string' || typeof slug !== 'string') {
    throw new Error('app.json must define expo.name and expo.slug');
  }

  return {
    ...config,
    name,
    slug,
    plugins: [
      ...(config.plugins ?? []),
      [
        'expo-build-properties',
        {
          android: {
            buildArchs: androidBuildArchs(),
          },
        },
      ],
    ],
  };
};
