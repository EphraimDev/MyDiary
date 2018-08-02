import { date, time } from '../utils/moment';
import entries from '../model/db';
import GUID from '../utils/guid';


/**
 * @exports
 * @class DriverController
 */
class EntriesController {
  /**
   * Welcome page
   * @staticmethod
   * @param {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static welcome(req, res) {
    return res.status(200).json('Welcome to My Diary app');
  }

  /**
   * Creates a new entry
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static create(req, res) {
    const { title, entry, img } = req.body;

    const newEntry = {
      entryId: GUID,
      title,
      entry,
      img,
      date,
      time,
    };

    // adds the new entry to the database
    entries.push(newEntry);

    return res.status(201).json({
      message: 'Entry added successfully',
      newEntry,
    });
  }

  /**
   * Deletes an entry
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static deleteEntry(req, res) {
    const { entryId } = req.params;

    // check if entry exists
    const entryFound = entries.find(entry => entry.entryId === entryId);

    // If entry does not exist...
    if (!entryFound) {
      return res.status(404).json({
        message: 'Entry not found',
      });
    }

    // if entry exists...
    entries.splice(entries.indexOf(entryFound), 1);
    return res.status(204).json();
  }

  /**
   * Return entry that matches entryId
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @param {function} next - middleware next (for error handling)
   * @return {json} res.json
   */
  static getEntry(req, res) {
    const { entryId } = req.params;

    // find entry with params entryId
    const entryFound = entries.find(entry => entry.entryId === entryId);

    // if entry does not exist...
    if (!entryFound) {
      return res.status(404).json({
        message: 'Entry does not exist',
      });
    }

    // if diary entry exists...
    return res.status(200).json({
      message: 'Entry was found',
      entryFound,
    });
  }

  /**
   * Get all diary entries
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static getAllEntries(_req, res) {
    res.status(200).json({
      message: 'Entries retrieved successfully',
      entries,
    });
  }

  /**
   * Update an existing entry
   *
   * @staticmethod
   * @param  {object} req - Request object
   * @param {object} res - Response object
   * @return {json} res.json
   */
  static update(req, res) {
    const { entryId } = req.params;
    const { title, entry, img } = req.body;

    // find entry with params entryId
    const entryFound = entries.find(entryItem => entryItem.entryId === entryId);

    // if entry does not exist...
    if (!entryFound) return res.status(404).json({ message: 'Entry does not exist' });

    // Get index of entry
    const index = entries.indexOf(entryFound);

    const updatedEntry = {
      entryId, title, entry, img, date, time,
    };

    // Replace entry with the updated entry
    entries.splice(index, 1, updatedEntry);
    return res.status(201).json({
      message: 'Entry modified successfully',
      updatedEntry,
    });
  }
}

export default EntriesController;
