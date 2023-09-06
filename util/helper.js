// Utility functions for formatting
module.exports = {
    // Format a JavaScript Date object as MM/DD/YYYY
    format_date: date => {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
  };