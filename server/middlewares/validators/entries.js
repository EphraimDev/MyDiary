/**
 * @exports
 * @class EntryValidation
 */
class EntryValidation {
    /**
        * Validate entry input
        *
        * @staticmethod
        * @param  {object} req - Request object
        * @param {object} res - Response object
        * @param {function} next - middleware next (for error handling)
        * @return {json} res.json
        */
    static entry(req, res, next) {

      const imgRegex = /^https?:\/\/(?:[a-z-]+\.)+[a-z]{2,6}(?:\/[^#?]+)+\.(?:jpe?g|gif|png)$/;
  
      const {title, entry, img} = req.body;
      if (!title) {
        res.status(400).json({ message: 'Title cannot be empty' });
      } else if (!entry) {
        res.status(400).json({ message: 'Entry cannot be empty' });
      } else if (img && (!imgRegex.test(img) || img.toString().trim() === '')) {
        res.status(400).send({ message: 'Add a valid image' });
      } else {
          next()
      }
    }
  
  }
  
  export default EntryValidation;
  