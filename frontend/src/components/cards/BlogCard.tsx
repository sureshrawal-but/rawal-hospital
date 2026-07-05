'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn, formatDate } from '@/lib/utils';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  category: string;
  readTime: number;
  publishedAt: string;
  className?: string;
}

export default function BlogCard({
  title,
  slug,
  excerpt,
  image,
  author,
  category,
  readTime,
  publishedAt,
  className,
}: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={cn(
        'bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm group transition-all duration-300 hover:shadow-lg',
        className
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="primary" size="sm">{category}</Badge>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readTime} min read
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 font-heading line-clamp-2">
          {title}
        </h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{excerpt}</p>
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <User className="h-3.5 w-3.5" />
            {author}
          </div>
          <Link
            href={`/blog/${slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-700 transition-colors"
          >
            Read More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
