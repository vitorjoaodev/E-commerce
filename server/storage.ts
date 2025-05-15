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
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2023/03/M-SST-CESS-CA-NY_lifestyle3.jpg"
    });
    
    const aviadoraCategory = this.createCategory({
      name: "Aviadora",
      slug: "aviadora",
      description: "Elegância e estilo para as mulheres que desafiam os céus",
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2016/02/L-SST-B17CA-GY-MD_lifestyle2.jpg"
    });
    
    const acessoriosCategory = this.createCategory({
      name: "Acessórios",
      slug: "acessorios",
      description: "Complementos autênticos para completar seu estilo de aviação",
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2021/01/January_category-accessories.jpg"
    });
    
    // Add products
    this.createProduct({
      name: "Camiseta Masculina Avro Lancaster",
      slug: "camiseta-masculina-avro-lancaster",
      description: "O Avro Lancaster é uma das aeronaves mais icônicas utilizadas durante a Segunda Guerra Mundial. Sua forma inconfundível e o rugido dos quatro motores Rolls Royce Merlin só podem ser plenamente apreciados ao ver um dos dois exemplares ainda em condições de voo no mundo. Um está na Inglaterra e o outro tem base no Canadian Warplane Heritage Museum, em Hamilton, Ontário. Temos a sorte de ver regularmente o Lancaster canadense sobrevoando Toronto, o que nos inspirou a celebrar essa incrível peça da História da Aviação com nossa camiseta de algodão de manga curta e gola careca. Ela apresenta as cores da cauda do CGVRA na parte superior do braço esquerdo.\n\n100% algodão\n\nCor: cáqui\n\nGola careca canelada\n\nLavada após a impressão para um visual vintage\n\nPré-encolhida.",
      price: "69.99",
      discountPrice: "79.99",
      categoryId: 1,
      featured: true,
      isNew: true,
      isBestseller: true,
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/03/M-SST-AVL-KH_front.jpg"
    });
    
    this.createProduct({
      name: "Jaqueta Feminina Boeing",
      slug: "jaqueta-feminina-boeing",
      description: "Voe com estilo com a nossa Jaqueta de Voo feminina com o logo da Boeing Airplane Company.\n\nTecido com alta porcentagem de algodão\n\nCor: Chumbo\n\nForro de nylon\n\nBolsos no ombro e no interior com zíperes de metal escovado.",
      price: "329.90",
      discountPrice: "389.99",
      categoryId: 2,
      featured: true,
      isNew: true,
      isBestseller: false,
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2021/03/Womens-BOEING-flight-jacket.jpg"
    });
    
    this.createProduct({
      name: "Carteira Boeing de Couro com Zip",
      slug: "carteira-boeing-couro-zip",
      description: "Viaje com estilo Boeing, guarde seus planos de voo e valorize seus investimentos com uma carteira promissora!\n\nFeito de couro bovino\n\nCor: Caramelo\n\nDimensões: 12,7 cm (C) x 10,2 cm (L) x 1,9 cm (P)",
      price: "149.90",
      categoryId: 3,
      featured: true,
      isNew: false,
      isBestseller: true,
      imageUrl: "https://redcanoebrands.com/wp-content/uploads/2022/10/U-WAL-BOEING-TN_front.jpg"
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
