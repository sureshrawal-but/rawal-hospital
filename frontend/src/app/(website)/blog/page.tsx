'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/ui/Breadcrumb';
import SearchInput from '@/components/ui/SearchInput';
import BlogCard from '@/components/cards/BlogCard';

const blogPosts = [
  { title: 'Understanding Heart Health: A Comprehensive Guide', slug: 'heart-health-guide', excerpt: 'Learn about the key factors that contribute to heart health and how to maintain a healthy cardiovascular system.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', author: 'Dr. John Smith', category: 'Cardiology', readTime: 5, publishedAt: '2024-12-15' },
  { title: 'The Importance of Regular Health Checkups', slug: 'regular-health-checkups', excerpt: 'Regular health screenings can detect potential health issues early when they are most treatable.', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600', author: 'Dr. Sarah Johnson', category: 'General Health', readTime: 4, publishedAt: '2024-12-10' },
  { title: 'Managing Stress for Better Mental Health', slug: 'stress-management', excerpt: 'Discover effective strategies for managing stress and improving your overall mental well-being.', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600', author: 'Dr. Emily Brown', category: 'Mental Health', readTime: 6, publishedAt: '2024-12-05' },
  { title: 'Nutrition Tips for a Healthy Lifestyle', slug: 'nutrition-tips', excerpt: 'Explore dietary guidelines and nutrition tips to maintain optimal health and prevent diseases.', image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600', author: 'Nutritionist Lisa Ray', category: 'Nutrition', readTime: 5, publishedAt: '2024-11-28' },
  { title: 'Exercise and Heart Disease Prevention', slug: 'exercise-heart-disease', excerpt: 'Regular physical activity is key to preventing heart disease. Learn about the best exercises for heart health.', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600', author: 'Dr. Michael Chen', category: 'Cardiology', readTime: 7, publishedAt: '2024-11-20' },
  { title: 'Understanding Pediatric Vaccinations', slug: 'pediatric-vaccinations', excerpt: 'A comprehensive guide to childhood vaccinations and their importance in preventing diseases.', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600', author: 'Dr. Emily Brown', category: 'Pediatrics', readTime: 8, publishedAt: '2024-11-15' },
];

const categories = ['All', 'Cardiology', 'General Health', 'Mental Health', 'Nutrition', 'Pediatrics'];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(search.toLowerCase()) || post.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || post.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="pt-20">
      <section className="relative py-16 gradient-hero">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb items={[{ label: 'Blog' }]} className="mb-4 text-blue-200 [&_*]:text-blue-200" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Badge variant="success" size="lg" className="mb-4 bg-white/20 text-white">Health Blog</Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-white font-heading mb-4">Health Tips & Articles</h1>
            <p className="text-lg text-blue-100 max-w-2xl">Stay informed with expert health advice from our medical professionals.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <SearchInput value={search} onChange={setSearch} placeholder="Search articles..." className="flex-1" />
          </div>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  category === cat ? 'bg-primary text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((post, i) => (
                <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <BlogCard {...post} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
