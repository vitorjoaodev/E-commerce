import { S3Client } from '@aws-sdk/client-s3';

// Create S3 client
export const s3Client = new S3Client({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

// Base URL for the S3 bucket
export const bucketBaseUrl = `https://${process.env.AWS_S3_BUCKET || 'piloto-inteligente'}.s3.amazonaws.com`;

// Helper function to generate S3 URLs
export function getImageUrl(path: string): string {
  // If the path is already a full URL, return it as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Otherwise, prepend the S3 bucket URL
  return `${bucketBaseUrl}/${path}`;
}

// Helper function to get a placeholder image if the real one is not available
export function getPlaceholderImage(type: 'product' | 'category' | 'blog' = 'product'): string {
  switch (type) {
    case 'product':
      return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400';
    case 'category':
      return 'https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800';
    case 'blog':
      return 'https://pixabay.com/get/g74d8d70a88a4eba647cc02061c6ef2dfcdc913810b41af86e3cfa41a64dc0abd244218b07a39122377bde48ab86d2c695d29e8334b04547bd2798cbacce7a95f_1280.jpg';
    default:
      return 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400';
  }
}
