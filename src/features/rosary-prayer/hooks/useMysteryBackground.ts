import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import type { ImageResizeMode, ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';

import { resolveArtworkMotion, type ArtworkMotion } from '@/domain/artworkMotion';

import {
  DEFAULT_ROTATE_EVERY_N_HAIL_MARYS,
  fetchMysteryMeditationBundle,
} from '@/data/repositories/meditationContentRepository';
import { supabase } from '@/data/api/supabaseClient';
import { mysteryGalleryImageIndex } from '@/domain/mysteryGalleryImageIndex';
import type { MysteryType } from '@/domain/mystery';
import { resolveMysteryContentTarget } from '@/domain/resolveMysteryContentTarget';
import { useDevToolsEnabled } from '@/features/rosary-prayer/dev/useDevToolsEnabled';
import { useMysteryImageDevCrop } from '@/features/rosary-prayer/dev/useMysteryImageDevCrop';
import {
  DEFAULT_MYSTERY_BACKGROUND,
  DEFAULT_MYSTERY_IMAGE_CREDIT,
  getEmbeddedMysteryImageEntry,
  type MysteryImageCredit,
} from '@/shared/constants/prayerAssets';

export type MysteryBackgroundContext = {
  hailMaryIndex: number | null;
  prayerId?: string;
  mysteryType?: MysteryType;
  mysterySortOrder?: number;
};

export function useMysteryBackground(
  mysteryId: string | null,
  context: MysteryBackgroundContext = { hailMaryIndex: null },
) {
  const target = resolveMysteryContentTarget(mysteryId, {
    type: context.mysteryType,
    sortOrder: context.mysterySortOrder,
  });

  const query = useQuery({
    queryKey: ['meditation', target?.supabaseMysteryId ?? 'none', target?.contentSlug ?? 'none', 'images-bundle'],
    queryFn: () => fetchMysteryMeditationBundle(target!),
    enabled: Boolean(target),
    staleTime: 1000 * 60 * 10,
  });

  const bundle = query.data;
  const images = bundle?.images ?? [];
  const rotateEvery = bundle?.rotateEveryNHailMarys ?? DEFAULT_ROTATE_EVERY_N_HAIL_MARYS;
  const imageCount = Math.max(images.length, 1);

  const slotIndex = mysteryGalleryImageIndex({
    hailMaryIndex: context.hailMaryIndex,
    prayerId: context.prayerId,
    imageCount,
    rotateEveryNHailMarys: rotateEvery,
  });

  const activeImage = images[slotIndex] ?? images[0];
  const contentSlug = target?.contentSlug;
  const embeddedEntry =
    contentSlug != null ? getEmbeddedMysteryImageEntry(contentSlug, slotIndex) : undefined;

  const usingRemoteImages = Boolean(activeImage?.url);

  const bakedPercent = embeddedEntry?.bakedLateralCropPercent ?? 100;

  const { enabled: devToolsEnabled, isReady: devToolsReady } = useDevToolsEnabled();

  const devTuneEnabled = Boolean(
    __DEV__ &&
      devToolsReady &&
      devToolsEnabled &&
      !usingRemoteImages &&
      contentSlug &&
      slotIndex === 0 &&
      embeddedEntry?.devTuneSource &&
      embeddedEntry.bakedLateralCropPercent != null,
  );

  const devCrop = useMysteryImageDevCrop(contentSlug ?? null, {
    enabled: devTuneEnabled,
    defaultPercent: bakedPercent,
  });

  const useDevPreview = devTuneEnabled && devCrop.ready;

  const source: ImageSourcePropType = usingRemoteImages && activeImage?.url
    ? { uri: activeImage.url }
    : useDevPreview && embeddedEntry?.devTuneSource
      ? embeddedEntry.devTuneSource
      : embeddedEntry?.source ?? DEFAULT_MYSTERY_BACKGROUND;

  const credit: MysteryImageCredit | null = usingRemoteImages && activeImage
    ? activeImage.title && activeImage.artist
      ? {
          title: activeImage.title,
          artist: activeImage.artist,
          description: activeImage.description ?? undefined,
        }
      : null
    : embeddedEntry?.credit ?? DEFAULT_MYSTERY_IMAGE_CREDIT;

  const resizeMode: ImageResizeMode =
    (usingRemoteImages ? activeImage?.resizeMode : embeddedEntry?.resizeMode) ?? 'cover';

  const motionSource = usingRemoteImages && activeImage ? activeImage : embeddedEntry?.motion;
  const motion: ArtworkMotion = useMemo(
    () => resolveArtworkMotion(motionSource),
    [motionSource?.driftX, motionSource?.driftY, motionSource?.focalX, motionSource?.focalY],
  );

  const previewScale = useDevPreview ? devCrop.previewScale : 1;

  const imageStyle: StyleProp<ImageStyle> = [
    { alignSelf: 'center' },
    previewScale !== 1 ? { transform: [{ scale: previewScale }] } : null,
  ];

  return {
    source,
    credit,
    motion,
    resizeMode,
    imageStyle,
    gallerySlotIndex: images.length > 0 ? slotIndex : null,
    backgroundKey: `${target?.supabaseMysteryId ?? contentSlug ?? 'none'}-${activeImage?.id ?? slotIndex}`,
    isLoading: query.isLoading && Boolean(supabase),
    devCrop: useDevPreview
      ? {
          cropPercent: devCrop.cropPercent,
          bakedPercent,
          nudge: devCrop.nudge,
          resetToBaked: devCrop.resetToBaked,
        }
      : null,
  };
}
