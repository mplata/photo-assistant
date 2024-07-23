import { envVars } from '@/environment';
import { google } from 'googleapis';

const getPhotosFromFolder = async (folderId: string) =>  {
  const { driveApiKey } = envVars.google;
  
  const drive = google.drive({ version: 'v3', auth: driveApiKey});

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink, webContentLink)',
      key:  driveApiKey,
    });

    const files = res.data.files;
    return (files && files.length > 0) ? files : [];
  } catch (error) {
    throw error;
  }
}

export {
  getPhotosFromFolder,
};
