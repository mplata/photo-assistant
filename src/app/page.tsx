"use client"
import { useState } from "react";

import PhotoUpload from "@/components/UploadPhoto";
import { getFolderIdFromUrl } from "@/util";
import { GoogleDrivePhoto } from "./types";
import PhotosContainer from "@/components/PhotosContainer";
import Loader from '@/components/Loading';

export default function Home() {

  const [ photos, setPhotos ] = useState<GoogleDrivePhoto[]>([]);
  const [ isLoading, setLoading ] = useState<boolean>(false);

  const onProcessUrl = async (url: string) => {
    setLoading(true);
    const folderId = getFolderIdFromUrl(url);
    try {
      const response = await fetch(`/api/photos?folderId=${folderId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json() as GoogleDrivePhoto[];
      setPhotos(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:text-left">
        <PhotoUpload isLoading={isLoading} onProcessUrl={onProcessUrl}/>
        {
          isLoading ?
            <Loader  loadingType="photo"/> :
            <PhotosContainer photos={photos} />
        }
      </div>
    </main>
  );
}
