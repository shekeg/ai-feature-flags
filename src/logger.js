const fs = require('fs');
const path = require('path');

const LOG_FILE_PATH = path.join(__dirname, '../logs/logs.json');

/**
 * Simple logger to log errors to logs/logs.json
 */
class Logger {
  constructor() {
    this.ensureLogFileExists();
  }

  /**
   * Ensure the log file exists and is initialized with an empty array
   */
  ensureLogFileExists() {
    try {
      if (!fs.existsSync(LOG_FILE_PATH)) {
        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2));
      } else {
        const content = fs.readFileSync(LOG_FILE_PATH, 'utf8');
        if (!content || content.trim() === '') {
          fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2));
        }
      }
    } catch (error) {
      console.error('Failed to initialize log file:', error);
    }
  }

  /**
   * Read existing logs from the file
   */
  readLogs() {
    try {
      const content = fs.readFileSync(LOG_FILE_PATH, 'utf8');
      return JSON.parse(content);
    } catch (error) {
      console.error('Failed to read logs:', error);
      return [];
    }
  }

  /**
   * Write logs to the file
   */
  writeLogs(logs) {
    try {
      fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2));
    } catch (error) {
      console.error('Failed to write logs:', error);
    }
  }

  /**
   * Log an error to the log file
   * @param {Error|string} error - The error to log
   * @param {Object} context - Additional context information
   */
  logError(error, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'ERROR',
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : undefined,
      context: context
    };

    const logs = this.readLogs();
    logs.push(logEntry);
    this.writeLogs(logs);

    // Also log to console for immediate visibility
    console.error('Error logged:', logEntry.message);
  }

  /**
   * Log an info message
   * @param {string} message - The info message
   * @param {Object} context - Additional context information
   */
  logInfo(message, context = {}) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level: 'INFO',
      message: message,
      context: context
    };

    const logs = this.readLogs();
    logs.push(logEntry);
    this.writeLogs(logs);

    console.log('Info logged:', logEntry.message);
  }
}

module.exports = new Logger();
