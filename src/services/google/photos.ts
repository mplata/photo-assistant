import { google } from 'googleapis';

const getPhotosFromFolder = async (folderId: string) =>  {
  
  const drive = google.drive({ version: 'v3', auth: 'AIzaSyBhOE8tAOw0HfrHDetKUoGIiPNlPMrNKgA'});

  try {
    const res = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/'`,
      fields: 'files(id, name, webViewLink, webContentLink)',
      key:  'AIzaSyBhOE8tAOw0HfrHDetKUoGIiPNlPMrNKgA',
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
