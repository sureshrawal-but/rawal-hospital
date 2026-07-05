import BlogPostPage from './BlogPostContent';

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

export default function Page() {
  return <BlogPostPage />;
}
