const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  // Activity 24
  try {
    const allCategories = await Category.findAll({
      include: [{ model: Product }]
    });
    if (!allCategories) {
      res.status(404).send("Could not find data");
      return;
    }
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });
    if (!oneCategory) {
    res.status(404).send("Could not find data");
    return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    let newCategory = await Category.create({
      category_name: req.body.category_name
    });
    if (!newCategory) {
      res.status(404).send("Could not create new category");
      return;
    }
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // {
  //   "category_name": "NewShirts"
  // }
  // try {
  //   let updateCategory = await Category.update({
  //     category_name: req.body.category_name,
  //     where: {
  //       id: req.params.id,
  //     },
  //   });
  //   if (!updateCategory) {
  //     res.status(404).send("Could not update category");
  //     return;
  //   }
  //   res.status(200).json(updateCategory);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  Category.update(
    {
      category_name: req.body.category_name,
    },
    {
      where: {
        id: req.params.id
      },
    })
    .then(updatedCategory => {
      if (!updatedCategory) {
        res.status(404).send("Could not update the category");
        return;
      }
      res.json(200).json(updatedCategory);
    })
    .call (err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteCategory) {
      res.status(404).send("Could not delete category");
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
