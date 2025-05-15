import { Product, Category, BlogPost } from "@shared/schema";

// Extended Product type with additional UI properties
export interface ProductWithCategory extends Product {
  categoryName?: string;
}

// Extended BlogPost type with formatting
export interface FormattedBlogPost extends BlogPost {
  formattedDate?: string;
}

// Checkout form data
export interface CheckoutFormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  paymentInfo: {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
  };
}

// SEO metadata type
export interface SEOMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
}
