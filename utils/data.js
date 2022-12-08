import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Coink Oink',
      email: 'coinkonik@gmail.com',
      password: bcrypt.hashSync('f7as9f9$$13seZs'),
      isAdmin: true,
    },
  ],
  products: [
    {
      name: 'Batman',
      slug: 'batman',
      category: 'Clásicos',
      image: '/images/clasicos/dc/batman-1.webp',
      price: 149,
      subcategory: 'DC',
      rating: 5,
      numReviews: 5,
      countInStock: 20,
      description: 'Alcancía de Batman',
      isFeatured: true,
      banner: '/images/banner-destacados-1.jpg',
    },
    {
      name: 'Joker',
      slug: 'joker',
      category: 'Clásicos',
      image: '/images/clasicos/dc/joker-1.webp',
      price: 149,
      subcategory: 'DC',
      rating: 5,
      numReviews: 5,
      countInStock: 20,
      description: 'Alcancía de Joker',
      isFeatured: true,
      banner: '/images/banner-destacados-2.jpg',
    },
    {
      name: 'Mujer Maranilla',
      slug: 'mujer-marranilla',
      category: 'Clásicos',
      image: '/images/clasicos/dc/mujer-marranilla-1.webp',
      price: 149,
      subcategory: 'DC',
      rating: 5,
      numReviews: 5,
      countInStock: 20,
      description: 'Alcancía de Mujer Marranilla',
    },
    {
      name: 'Superman',
      slug: 'superman',
      category: 'Clásicos',
      image: '/images/clasicos/dc/superman-1.webp',
      price: 149,
      subcategory: 'DC',
      rating: 5,
      numReviews: 5,
      countInStock: 20,
      description: 'Alcancía de Superman',
    },
  ],
};

export default data;
