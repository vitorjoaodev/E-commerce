import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertNewsletterSubscriptionSchema, 
  insertUserSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  
  // Categories
  app.get('/api/categories', async (req: Request, res: Response) => {
    const categories = await storage.getAllCategories();
    res.json(categories);
  });
  
  app.get('/api/categories/:slug', async (req: Request, res: Response) => {
    const { slug } = req.params;
    const category = await storage.getCategoryBySlug(slug);
    
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);
  });
  
  // Products
  app.get('/api/products', async (req: Request, res: Response) => {
    const products = await storage.getAllProducts();
    res.json(products);
  });
  
  app.get('/api/products/featured', async (req: Request, res: Response) => {
    const products = await storage.getFeaturedProducts();
    res.json(products);
  });
  
  app.get('/api/products/new', async (req: Request, res: Response) => {
    const products = await storage.getNewProducts();
    res.json(products);
  });
  
  app.get('/api/products/bestsellers', async (req: Request, res: Response) => {
    const products = await storage.getBestsellerProducts();
    res.json(products);
  });
  
  app.get('/api/products/category/:categoryId', async (req: Request, res: Response) => {
    const categoryId = parseInt(req.params.categoryId);
    
    if (isNaN(categoryId)) {
      return res.status(400).json({ message: 'Invalid category ID' });
    }
    
    const products = await storage.getProductsByCategory(categoryId);
    res.json(products);
  });
  
  app.get('/api/products/:slug', async (req: Request, res: Response) => {
    const { slug } = req.params;
    const product = await storage.getProductBySlug(slug);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  });
  
  // Blog posts
  app.get('/api/blog', async (req: Request, res: Response) => {
    const posts = await storage.getAllBlogPosts();
    res.json(posts);
  });
  
  app.get('/api/blog/recent', async (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 3;
    const posts = await storage.getRecentBlogPosts(limit);
    res.json(posts);
  });
  
  app.get('/api/blog/:slug', async (req: Request, res: Response) => {
    const { slug } = req.params;
    const post = await storage.getBlogPostBySlug(slug);
    
    if (!post) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    
    res.json(post);
  });
  
  // Newsletter subscriptions
  app.post('/api/newsletter/subscribe', async (req: Request, res: Response) => {
    try {
      const data = insertNewsletterSubscriptionSchema.parse(req.body);
      
      // Check if email is already subscribed
      const isSubscribed = await storage.checkEmailSubscribed(data.email);
      
      if (isSubscribed) {
        return res.status(400).json({ message: 'Email already subscribed' });
      }
      
      const subscription = await storage.createNewsletterSubscription(data);
      res.status(201).json({ message: 'Subscription successful', subscription });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  // User registration
  app.post('/api/users/register', async (req: Request, res: Response) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      // Check if email already exists
      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      
      // Check if username already exists
      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ message: 'Username already taken' });
      }
      
      const user = await storage.createUser(data);
      // Don't return the password
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json({ message: 'Registration successful', user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Invalid data', errors: error.errors });
      }
      res.status(500).json({ message: 'Server error' });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
