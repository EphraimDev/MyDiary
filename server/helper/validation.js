export default {
  /**
   * @description validate post ride
   * @param {object} req - The object that return a request
   * @param {object} res - The object that returns a response
   * @param {object} next- The object that tell the next action to run
   * @returns {object}
   */
  entryValidation: (req, res, next) => {
    const { title, entry, img } = req.body;
    const regex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;

    if (!title || typeof title !== 'string' || title.toString().trim() === '' || !entry || typeof entry !== 'string' || entry.toString().trim() === '') {
      return res.status(400).send({
        message: 'Valid title and entry data is required',
      });
    }
    if (img && (!regex.test(img) || img.toString().trim() === '')) {
      return res.status(400).send({
        message: 'Add a valid image',
      });
    }
    return next();
  },

};
