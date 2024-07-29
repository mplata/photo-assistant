import { evalPhoto } from '@/services/openai/eval_photos';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse): Promise<NextResponse> {
  try {
    const { photoUrl } = await req.json();

    if (!photoUrl) {
      return NextResponse.json({ error: 'Missing photoUrl body parameter' }, { status: 400 });
    }
    const photoEvaluation = await evalPhoto(photoUrl);
    return NextResponse.json(photoEvaluation, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
