import { NextResponse } from 'next/server';
import connect from '@/app/utils/mongo';
import Bloggi from '@/app/models/UserSchema';

export async function GET() {
  await connect();
  const blogs = await Bloggi.find({});
  return NextResponse.json(blogs);
}

export async function POST(request) {
  const body = await request.json();
  await connect();
  const newBlog = await Bloggi.create(body);
  return NextResponse.json(newBlog, { status: 201 });
}

export async function PUT(request) {
  const body = await request.json();
  await connect();
  const updatedBlog = await Bloggi.findByIdAndUpdate(body._id, body, { new: true });
  if (!updatedBlog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json(updatedBlog);
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await connect();
  const deletedBlog = await Bloggi.findByIdAndDelete(id);
  if (!deletedBlog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }
  return NextResponse.json({ message: 'Blog deleted successfully' });
}