import { getPhotosFromFolder } from '@/services/google/photos';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  try {
    const folderId = req.nextUrl.searchParams.get('folderId');
    if (!folderId) {
      return NextResponse.json({ error: 'Missing folderId query parameter' }, { status: 400 });
    }
    const photos = await getPhotosFromFolder(folderId);
    return NextResponse.json(photos, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
