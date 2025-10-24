import { Rom } from "@/models/rom";
import { TauriCommandKey, TauriCommandPayload, tauriInvoke } from ".";
import { RomCollection } from "@/models/collection";
import { Channel } from "@tauri-apps/api/core";
import { DownloadEvent } from "@/utils/downloader";
import { RetroarchCore } from "@/models/enums/retroarch-core";
import { RetroarchRunner } from "@/models/enums/retroarch-runner";

type RomPagination = {
  limit: number;
  offset: number;
};

export type PaginatedPayload = {
  total: number;
  items: Rom[];
} & RomPagination;

export const getRoms = async (params: {
  pagination: RomPagination;
  searchTerm?: string;
}): Promise<TauriCommandPayload<PaginatedPayload>> => {
  return tauriInvoke(TauriCommandKey.GET_ROMS, params);
};

export const getRecentlyPlayed = async (): Promise<
  TauriCommandPayload<{ items: Rom[] }>
> => {
  return tauriInvoke(TauriCommandKey.GET_RECENTLY_PLAYED);
};

export const getRecentlyAdded = async (): Promise<
  TauriCommandPayload<{ items: Rom[] }>
> => {
  return tauriInvoke(TauriCommandKey.GET_RECENTLY_ADDED);
};

export const getRomById = async (
  id: number,
): Promise<TauriCommandPayload<Rom>> => {
  return tauriInvoke(TauriCommandKey.GET_ROMS_BY_ID, { id });
};

export const getRomsByCollectionId = async (
  id: number | string,
  collectionType: RomCollection,
  pagination: RomPagination,
): Promise<TauriCommandPayload<PaginatedPayload>> => {
  return tauriInvoke(TauriCommandKey.GET_ROMS_BY_COLLECTION_ID, {
    id: id.toString(),
    collectionType,
    pagination,
  });
};

export const getRomsByPlatformId = async (
  id: number | string,
  pagination: RomPagination,
): Promise<TauriCommandPayload<PaginatedPayload>> => {
  return tauriInvoke(TauriCommandKey.GET_ROMS_BY_PLATFORM_ID, {
    id: id.toString(),
    pagination,
  });
};

export const downloadRom = async (
  id: string,
  romId: number,
  channel: Channel<DownloadEvent>,
) => {
  return tauriInvoke(TauriCommandKey.DOWNLOAD_ROM, {
    id,
    romId,
    onEvent: channel,
  });
};

export const downloadSaveFile = async (params: {
  romId: number;
  platformId: number;
  core: RetroarchCore;
  runner: RetroarchRunner;
  romPath: string;
}) => {
  return tauriInvoke(TauriCommandKey.DOWNLOAD_SAVE_FILE, params);
};
