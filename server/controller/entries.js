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

    /**
   * Fetch the details of a single entry
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getSingleEntry(req, res) {
    const {entryId} = req.params;

    pool.query(queryHelper.entryText,[entryId], (err, entries) =>{
        if (entries.rowCount < 1) {
            return res.status(404).json({
                message: 'Entry does not exist',
                success: false
            })
        }
        return res.status(200).json({
            entries: entries.rows[0],
            message: 'Entry successfully retrieved',
            success: true
        })
    });
}
}

export default EntriesController;