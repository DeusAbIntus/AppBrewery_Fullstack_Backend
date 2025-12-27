import express from 'express';
import bodyParser from 'body-parser';
import {dirname} from 'path';
import {fileURLToPath} from 'url';

const app =express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Global Variables
var blogPosts =[{
    id: 1,
    title: "Classic Pancakes",
    ingredients: "Flour, milk, eggs, sugar, baking powder, salt, butter",
    recipeContent: "In a bowl, mix flour, sugar, baking powder, and salt. In another bowl, whisk milk and eggs together, then combine with the dry ingredients until smooth.\n\nHeat a pan over medium heat and melt a little butter. Pour batter onto the pan and cook until bubbles form, then flip and cook until golden."
  },
  {
    id: 2,
    title: "Garlic Butter Pasta",
    ingredients: "Pasta, garlic, butter, olive oil, parsley, salt, black pepper",
    recipeContent: "Cook pasta in salted boiling water until al dente. Reserve some pasta water and drain the rest.\n\nIn a pan, heat olive oil and butter, then sauté garlic until fragrant. Add pasta, a splash of pasta water, salt, and pepper, and toss well. Finish with parsley."
  },
  {
    id: 3,
    title: "Fresh Garden Salad",
    ingredients: "Lettuce, tomato, cucumber, olive oil, lemon juice, salt",
    recipeContent: "Wash and chop the lettuce, tomato, and cucumber. Place everything into a large bowl.\n\nDrizzle with olive oil and lemon juice, add salt, and toss gently until evenly coated."
  },
  {
    id: 4,
    title: "Cheese Omelette",
    ingredients: "Eggs, milk, cheese, butter, salt, black pepper",
    recipeContent: "Whisk eggs with milk, salt, and pepper until well combined.\n\nMelt butter in a pan over medium heat, pour in eggs, and cook gently. Add cheese, fold the omelette, and cook until set."
  },
  {
    id: 5,
    title: "Simple Fruit Smoothie",
    ingredients: "Banana, strawberries, yogurt, honey, milk",
    recipeContent: "Add all ingredients into a blender.\n\nBlend until smooth and creamy, then serve immediately."
  }
];

const post = {
    id:  null,
    title: "Sample Post",
    ingredients: "Sample ingredients list.",
    recipeContent: "This is a sample blog post content."
};


// Routes

app.get('/', (req, res) => {
  res.render('index', { blogPosts: blogPosts });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get ('/new-post', (req, res)=> {
    res.render('new-post');
});

// Create new Post
app.post( '/new-post', (req, res) => {
    const newPost = {
        id : blogPosts.length + 1,
        title : req.body.title,
        ingredients : req.body.ingredients,
        recipeContent : req.body.recipeContent      
    };
    blogPosts.push(newPost);
    res.redirect('/');
})

// Display form to edit a blog post
app.get('/edit-post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const post = blogPosts.find(post => post.id === id);
  if (!post) return res.status(404).send("Post not found");
  res.render('edit-post', { post });
});

// Update a blog post
app.post('/edit-post/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, ingredients, recipeContent } = req.body;
  const postIndex = blogPosts.findIndex(post => post.id === id);
  if (postIndex === -1) {
    return res.status(404).send("Post not found");
  } else { 
    blogPosts[postIndex] = { id, title, ingredients, recipeContent };
    res.redirect('/');
  }
});

// Delete a blog post
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  blogPosts = blogPosts.filter(post => post.id !== id);
  blogPosts.forEach((post, index) => {
    post.id = index + 1;
  });
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});