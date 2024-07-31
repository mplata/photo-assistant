export interface Environment {
  google: {
    driveApiKey: string;
  },
  openai: {
    apiKey: string;
  },
}

export const envVars: Environment = {
  google: {
    driveApiKey: process.env.GOOGLE_DRIVE_API_KEY || '',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY  || '',
  }
}