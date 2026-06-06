import { notFound } from 'next/navigation';
import CollegeDetailClient from '@/components/detail/CollegeDetailClient';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `${slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} | CollegeFair`,
  };
}

export default async function CollegeDetailPage({ params }) {
  const { slug } = await params;
  
  try {
    // In Next.js App Router, Server Components should directly call the database/controller 
    // instead of making a fetch request to their own API route.
    
    // Import controller dynamically or directly here if needed, but since we're in server component:
    const detailController = await import('@/controllers/detail.controller');
    const res = await detailController.getBySlug(slug);
    
    if (!res || !res.success || !res.data) {
      return notFound();
    }

    const college = res.data;

    return <CollegeDetailClient college={college} />;
    
  } catch (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Error loading college details</h1>
        <p className="text-gray-600">Please make sure the database is connected.</p>
      </div>
    );
  }
}
