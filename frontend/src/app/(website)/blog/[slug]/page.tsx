'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import Breadcrumb from '@/components/ui/Breadcrumb';
import { Calendar, Clock, User, ArrowLeft, Heart, Share2, Bookmark } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const blogPosts: Record<string, any> = {
  'heart-health-guide': {
    title: 'Understanding Heart Health: A Comprehensive Guide',
    content: `Heart disease remains one of the leading causes of death worldwide, but the good news is that many risk factors are preventable. At Rawal Hospital, we believe in empowering our patients with knowledge.

## What is Heart Health?

Heart health refers to the overall well-being of your cardiovascular system, including your heart and blood vessels. A healthy heart efficiently pumps blood throughout your body, delivering oxygen and nutrients to your organs.

## Key Factors for Heart Health

### 1. Regular Exercise
Physical activity is crucial for maintaining heart health. Aim for at least 150 minutes of moderate-intensity exercise per week. This can include brisk walking, swimming, cycling, or any activity that gets your heart rate up.

### 2. Balanced Diet
A heart-healthy diet includes plenty of fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit your intake of saturated fats, trans fats, sodium, and added sugars.

### 3. Stress Management
Chronic stress can negatively impact your heart health. Practice stress-reduction techniques such as meditation, deep breathing exercises, or yoga.

### 4. Regular Checkups
Regular health screenings can detect potential issues early. Monitor your blood pressure, cholesterol levels, and blood sugar regularly.

## Warning Signs to Watch For

- Chest pain or discomfort
- Shortness of breath
- Irregular heartbeat
- Swelling in legs or ankles
- Fatigue

If you experience any of these symptoms, consult a healthcare professional immediately.

## Conclusion

Taking care of your heart is one of the most important investments you can make in your overall health. Start with small changes and build healthy habits that will benefit you for years to come.`,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200',
    author: 'Dr. John Smith',
    category: 'Cardiology',
    readTime: 5,
    publishedAt: '2024-12-15',
  },
};

export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({ slug }));
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug] || blogPosts['heart-health-guide'];

  return (
    <div className="pt-20">
      <section className="relative py-12 gradient-hero">
        <div className="max-w-4xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
        </div>
      </section>

      <article className="py-12">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
              <Image src={post.image} alt={post.title} fill className="object-cover" />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <Badge variant="primary">{post.category}</Badge>
              <span className="flex items-center gap-1 text-sm text-gray-500"><Calendar className="h-4 w-4" /> {formatDate(post.publishedAt)}</span>
              <span className="flex items-center gap-1 text-sm text-gray-500"><Clock className="h-4 w-4" /> {post.readTime} min read</span>
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 font-heading mb-4">{post.title}</h1>

            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
              <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{post.author}</p>
                <p className="text-xs text-gray-500">Senior Cardiologist</p>
              </div>
              <div className="ml-auto flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><Heart className="h-5 w-5" /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><Share2 className="h-5 w-5" /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><Bookmark className="h-5 w-5" /></button>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              {post.content.split('\n').map((paragraph: string, i: number) => {
                if (paragraph.startsWith('## ')) {
                  return <h2 key={i} className="text-2xl font-bold text-gray-900 font-heading mt-8 mb-4">{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={i} className="text-xl font-semibold text-gray-900 mt-6 mb-3">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  return <li key={i} className="text-gray-600 ml-4 mb-1">{paragraph.replace('- ', '')}</li>;
                }
                if (paragraph.trim() === '') return null;
                return <p key={i} className="text-gray-600 leading-relaxed mb-4">{paragraph}</p>;
              })}
            </div>

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-gray-100">
              <Link href="/blog">
                <Button variant="outline" size="sm"><ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog</Button>
              </Link>
              <div className="flex gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><Heart className="h-5 w-5" /></button>
                <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-400"><Share2 className="h-5 w-5" /></button>
              </div>
            </div>
          </motion.div>
        </div>
      </article>
    </div>
  );
}
