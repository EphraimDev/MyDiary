import pool from '../model/config';
import queryHelper from '../helper/queryhelper';
import moment from '../utils/moment';
import GUID from '../utils/guid';

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
  
  /**
   * Modify diary entry
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static modifyDiaryEntry(req, res, next) {
    const {entryId} = req.params;
    const {title,entry,img} = req.body;

    pool.query(queryHelper.entryText,[entryId], (err, entries) =>{
        if (entries.rowCount < 1) {
            return res.status(404).json({
                message: 'Entry does not exist',
                success: false
            })
        }

        if (entries.rows[0].date !== moment.date) {
            return res.status(403).json({
                message: 'Entry can no longer be modified',
                success: false
            })
        }

        pool.query(queryHelper.modifyEntry, [title, entry, img, moment.createdAt, entryId])
        .then((entry) => {
            return res.status(201).json({
                entry: entry.rows[0],
                message: 'Entry successfully retrieved',
                success: true
            })
        })
        .catch(err => next())
    });
  }
  
  /**
   * Create diary entry
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static createDiaryEntry(req, res, next) {
    const {title,entry,img} = req.body;
    const {userId} = req.params

    pool.query(queryHelper.createEntry, [GUID, userId, title, entry, img,moment.date, moment.time, moment.createdAt])
    .then((entry) => {
        return res.status(201).json({
            entry: entry.rows[0],
            message: 'Entry successfully created',
            success: true
        })
    })
    .catch(err => next());
  }

  /**
   * Delete diary entry
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static deleteDiaryEntry(req, res, next) {
    const {entryId} = req.params

    pool.query(queryHelper.deleteEntry, [entryId])
    .then(() => {
        return res.status(200).json({
            message: 'Entry successfully deleted',
            success: true
        })
    })
    .catch(err => next());
  }
}

export default EntriesController;