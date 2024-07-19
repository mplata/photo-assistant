export interface Environment {
  google: {
    driveApiKey: string;
  }
}

export const envVars: Environment = {
  google: {
    driveApiKey: process.env.GOOGLE_DRIVE_API_KEY || '',
  }
}