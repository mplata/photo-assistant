import { evalPhoto } from '@/services/openai/eval_photos';
import { NextRequest, NextResponse } from 'next/server';

export const config = {
  maxDuration: 60,
};

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  try {
    const { photoIds } = await req.json();

    if (!photoIds) {
      return NextResponse.json({ error: 'Missing photoUrl body parameter' }, { status: 400 });
    }
    
    const albumEvaluation = await evalPhoto(photoIds);
    return NextResponse.json(albumEvaluation, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
