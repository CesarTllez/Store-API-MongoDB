import Product from '../models/product.model.js';
import Category from '../models/category.model.js';

export const getAllProducts = async (_, res) => {
  try {
    const response = await Product.find();
    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
};

export const getProductById = (req, res) => {
  const { id: _id } = req.params;

  Product.count({ _id }, async (_, count) => {
    if (count !== 1) return res.status(404).end();

    try {
      const response = await Product.findById(_id);
      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  });
};

export const createProduct = (req, res) => {
  const { name, price, categoryId } = req.body;

  Category.count({ _id: categoryId }, async (_, count) => {
    if (count !== 1)
      return res.status(404).json({ error: 'Category was not found' });

    const product = new Product({ name, price, categoryId });

    try {
      const dataProduct = await product.save();
      const dataCategory = await Category.findById(categoryId);
      dataCategory.products = dataCategory.products.concat(dataProduct._id);
      dataCategory.save().then();
      return res.status(201).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  });
};

export const updateProduct = (req, res) => {
  const { id: _id } = req.params;
  const newProduct = req.body;

  Product.count({ _id }, async (_, count) => {
    if (count !== 1) return res.status(404).end();

    try {
      await Product.findByIdAndUpdate(_id, newProduct, { new: true });
      return res.status(200).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  });
};

export const deleteProductById = (req, res) => {
  const { id: _id } = req.params;

  Product.count({ _id }, async (_, count) => {
    if (count !== 1) return res.status(404).end();

    try {
      await Product.findByIdAndDelete(_id);
      return res.status(204).end();
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  });
};
