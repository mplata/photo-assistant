const getFolderIdFromUrl = (url: string): string => {
  const regex = /\/folders\/([a-zA-Z0-9_-]+)/;
  const match = url.match(regex);
  
  if (match && match[1]) {
    return match[1];
  } else {
    throw new Error("Invalid Google Drive folder URL");
  }
};

export {
  getFolderIdFromUrl,
};