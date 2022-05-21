const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
      include: [{ model: Product}],
    });
    if (!allTags) {
      res.status(404).send("Could not find data");
      return;
    }
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const oneTag = await Tag.findByPk({
      include: [{ model: Product}],
    });
    if (!oneTag) {
      res.status(404).send("Could not find data");
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new tag
  // used method from product-routes
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.productIds.length) {
        const productTagIdArr = req.body.productIds.map((product_id) => {
          return {
            tag_id: tag_id,
            product_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      res.status(200).json(tag);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      },
    })
    .then(updatedTag => {
      if (!updatedTag) {
        res.status(404).send("Could not update the tag");
        return;
      }
      res.json(200).json(updatedTag);
    })
    .catch (err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deleteTag) {
      res.status(404).send("Could not delete tag");
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  };
});

module.exports = router;
