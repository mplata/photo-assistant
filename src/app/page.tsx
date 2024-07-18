"use client"
import { useState } from "react";

import PhotoUpload from "@/components/UploadPhoto";
import { getFolderIdFromUrl } from "@/util";

export default function Home() {

  const { photos, setPhotos } = useState<any[]>([]);

  const onProcessUrl = async (url: string) => {
    const folderId = getFolderIdFromUrl(url);
    try {
      const response = await fetch(`/api/photos?folderId=${folderId}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <PhotoUpload onProcessUrl={onProcessUrl}/>
      </div>
    </main>
  );
}
