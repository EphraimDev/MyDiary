import pool from '../model/config';
import queryHelper from '../helper/queryhelper';

/**
 * @exports
 * @class RideOfferController
 */
class EntriesController {
    /**
   * Fetch all entries
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getAllEntries(req, res, next) {
      
      pool.query(queryHelper.entriesText, [])
      .then((entries) => {
        return res.status(200).json({
          entries: entries.rows,
          message: 'All entries successfully retrieved',
          success: true
      })
      }).catch(err => next(err));
  
    }
}

export default EntriesController;