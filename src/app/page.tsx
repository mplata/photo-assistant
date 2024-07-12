"use client"
import PhotoUpload from "@/components/UploadPhoto";

export default function Home() {

  const onProcessUrl = (url: string) => {
    alert(url);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <PhotoUpload onProcessUrl={onProcessUrl}/>
      </div>
    </main>
  );
}
