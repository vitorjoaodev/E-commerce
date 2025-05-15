import {
  users, categories, products, blogPosts, newsletterSubscriptions,
  type User, type InsertUser, 
  type Category, type InsertCategory,
  type Product, type InsertProduct,
  type BlogPost, type InsertBlogPost,
  type NewsletterSubscription, type InsertNewsletterSubscription
} from "@shared/schema";

// Interface for storage operations
export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Category operations
  getAllCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  getCategoryById(id: number): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Product operations
  getAllProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  getProductsByCategory(categoryId: number): Promise<Product[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getNewProducts(): Promise<Product[]>;
  getBestsellerProducts(): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Blog operations
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  getBlogPostBySlug(slug: string): Promise<BlogPost | undefined>;
  getRecentBlogPosts(limit: number): Promise<BlogPost[]>;
  createBlogPost(blogPost: InsertBlogPost): Promise<BlogPost>;
  
  // Newsletter operations
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  checkEmailSubscribed(email: string): Promise<boolean>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private blogPosts: Map<number, BlogPost>;
  private newsletterSubscriptions: Map<number, NewsletterSubscription>;
  
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentBlogPostId: number;
  private currentNewsletterSubscriptionId: number;
  
  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.products = new Map();
    this.blogPosts = new Map();
    this.newsletterSubscriptions = new Map();
    
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentBlogPostId = 1;
    this.currentNewsletterSubscriptionId = 1;
    
    // Initialize with some data
    this.initializeData();
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }
  
  // Category operations
  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }
  
  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(
      (category) => category.slug === slug,
    );
  }
  
  async getCategoryById(id: number): Promise<Category | undefined> {
    return this.categories.get(id);
  }
  
  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }
  
  // Product operations
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug,
    );
  }
  
  async getProductsByCategory(categoryId: number): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.categoryId === categoryId,
    );
  }
  
  async getFeaturedProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.featured,
    );
  }
  
  async getNewProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isNew,
    );
  }
  
  async getBestsellerProducts(): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.isBestseller,
    );
  }
  
  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const now = new Date();
    const product: Product = { ...insertProduct, id, createdAt: now };
    this.products.set(id, product);
    return product;
  }
  
  // Blog operations
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }
  
  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }
  
  async getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
    return Array.from(this.blogPosts.values()).find(
      (post) => post.slug === slug,
    );
  }
  
  async getRecentBlogPosts(limit: number): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
  
  async createBlogPost(insertBlogPost: InsertBlogPost): Promise<BlogPost> {
    const id = this.currentBlogPostId++;
    const now = new Date();
    const blogPost: BlogPost = { ...insertBlogPost, id, createdAt: now };
    this.blogPosts.set(id, blogPost);
    return blogPost;
  }
  
  // Newsletter operations
  async createNewsletterSubscription(insertSubscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const id = this.currentNewsletterSubscriptionId++;
    const now = new Date();
    const subscription: NewsletterSubscription = { ...insertSubscription, id, createdAt: now };
    this.newsletterSubscriptions.set(id, subscription);
    return subscription;
  }
  
  async checkEmailSubscribed(email: string): Promise<boolean> {
    return Array.from(this.newsletterSubscriptions.values()).some(
      (subscription) => subscription.email === email,
    );
  }
  
  // Initialize with sample data
  private initializeData() {
    // Add categories
    const aviadorCategory = this.createCategory({
      name: "Aviador",
      slug: "aviador",
      description: "Jaquetas, óculos e acessórios inspirados nos pilotos lendários",
      imageUrl: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800"
    });
    
    const aviadoraCategory = this.createCategory({
      name: "Aviadora",
      slug: "aviadora",
      description: "Elegância e estilo para as mulheres que desafiam os céus",
      imageUrl: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800"
    });
    
    const acessoriosCategory = this.createCategory({
      name: "Acessórios",
      slug: "acessorios",
      description: "Complementos autênticos para completar seu estilo de aviação",
      imageUrl: "https://images.unsplash.com/photo-1576613109753-27804de2cba8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800"
    });
    
    // Add products
    this.createProduct({
      name: "Capacete de Aviador Vintage",
      slug: "capacete-aviador-vintage",
      description: "Capacete de couro vintage inspirado nos primeiros pilotos da aviação, com acabamento detalhado e proteção para os olhos.",
      price: "499.90",
      categoryId: 3,
      featured: true,
      isNew: true,
      isBestseller: false,
      imageUrl: "https://pixabay.com/get/ge38dece83ac98232f293c9178811a61d4698d8e7605493039f53cc1c47a3129cd59a5e996ab8c3a0213170a827814ffab2700227a01c38ceaa47f6774bdbd332_1280.jpg"
    });
    
    this.createProduct({
      name: "Jaqueta de Couro Aviador",
      slug: "jaqueta-couro-aviador",
      description: "Jaqueta clássica de couro marrom no estilo bomber, com detalhes em sherpa e bolsos funcionais.",
      price: "899.90",
      categoryId: 1,
      featured: true,
      isNew: false,
      isBestseller: true,
      imageUrl: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400"
    });
    
    this.createProduct({
      name: "Bússola de Navegação Vintage",
      slug: "bussola-navegacao-vintage",
      description: "Bússola de latão com acabamento envelhecido, inspirada nos instrumentos de navegação utilizados pelos primeiros aviadores.",
      price: "349.90",
      categoryId: 3,
      featured: true,
      isNew: false,
      isBestseller: false,
      imageUrl: "https://images.unsplash.com/photo-1560970514-863da281096f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400"
    });
    
    this.createProduct({
      name: "Óculos Aviador Clássico",
      slug: "oculos-aviador-classico",
      description: "Óculos com armação dourada e lentes escuras, no estilo clássico aviador que nunca sai de moda.",
      price: "179.90",
      discountPrice: "249.90",
      categoryId: 3,
      featured: true,
      isNew: false,
      isBestseller: false,
      imageUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400"
    });
    
    // Add blog posts
    this.createBlogPost({
      title: "Os Pioneiros da Aviação: Histórias Inspiradoras",
      slug: "pioneiros-da-aviacao",
      excerpt: "Conheça as fascinantes histórias dos aventureiros que revolucionaram o mundo da aviação e inspiraram gerações...",
      content: "A história da aviação é repleta de personagens fascinantes que desafiaram o impossível e mudaram para sempre a forma como viajamos. Neste artigo, exploramos as vidas e conquistas dos pioneiros que não apenas sonharam com o vôo humano, mas tornaram esse sonho realidade...",
      imageUrl: "https://pixabay.com/get/g74d8d70a88a4eba647cc02061c6ef2dfcdc913810b41af86e3cfa41a64dc0abd244218b07a39122377bde48ab86d2c695d29e8334b04547bd2798cbacce7a95f_1280.jpg"
    });
    
    this.createBlogPost({
      title: "Guia Prático: Como Montar seu Estilo Aviador",
      slug: "estilo-aviador",
      excerpt: "Dicas essenciais para incorporar o estilo aviador no seu dia a dia, combinando peças clássicas com toques contemporâneos...",
      content: "O estilo aviador transcende modismos e se mantém como um clássico atemporal. Neste guia, apresentamos as peças-chave e as melhores combinações para você incorporar esse visual elegante e aventureiro em seu guarda-roupa cotidiano...",
      imageUrl: "https://pixabay.com/get/gfcb1e7eb90ce0dd2d33f7287630082eb632ca6e4cd2942cd5a6ca65f55a7f0afde99f770a84c1238af3757e8736e2568079e4b0d310bd53b583b29246152d7e7_1280.jpg"
    });
    
    this.createBlogPost({
      title: "A História dos Acessórios de Aviação",
      slug: "historia-acessorios-aviacao",
      excerpt: "Da funcionalidade à moda: como os equipamentos práticos dos primeiros aviadores se transformaram em ícones de estilo...",
      content: "Sabia que muitos dos acessórios que hoje consideramos itens de moda foram originalmente criados para atender às necessidades práticas dos primeiros aviadores? Neste artigo, mergulhamos na fascinante transformação de equipamentos funcionais em símbolos de estilo...",
      imageUrl: "https://images.unsplash.com/photo-1473181488821-2d23949a045a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400"
    });
  }
}

export const storage = new MemStorage();
