/**
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/.
 **/

var EXPORTED_SYMBOLS = [];

const Cc = Components.classes;
const Ci = Components.interfaces;

Components.utils.import("resource://gre/modules/Services.jsm");
Components.utils.import("chrome://pwdex-modules/content/common.js");
Components.utils.import("chrome://pwdex-modules/content/io.js");

PwdEx.UI = {
  /* Logger for this object. */
  _logger : null,

  /**
   * Initializes the object.
   */
  init : function() {
    this._logger = PwdEx.getLogger("PwdEx.UI");
    this._logger.debug("init");
  },

  /**
   * Adds the password exporter button to the Firefox preferences page.
   * @param aDocument the document to insert the button to.
   */
  addFxButton : function(aDocument) {
    this._logger.debug("addFxButton");

    let passButton = aDocument.getElementById("showPasswords");
    let button = null;

    if (null != passButton) {
      button = this._createPwdExButton(aDocument);
      passButton.parentNode.appendChild(button);
    } else {
      this._logger.error("addFxButton. Show Passwords button not found.");
    }

    return button;
  },

  /**
   * Adds the password exporter button to the Thunderbird preferences panel.
   * @param aDocument the document to insert the button to.
   */
  addTBButton : function(aDocument) {
    this._logger.debug("addTBButton");

    if (null != aDocument.getElementById("securityPrefs")) {
      let container =
        aDocument.getElementById("securityPrefs").getElementsByTagName("tabpanel")[3].
          getElementsByTagName("hbox")[0];

      if (null != container) {
        container.appendChild(this._createPwdExButton(aDocument));
      } else {
        this._logger.error("addTBButton. Container for button not found.");
      }
    } else {
      this._logger.debug(
        "addTBButton. Security pane not showing; listener added.");

      let secPane = aDocument.getElementById("paneSecurity");
      let that = this;

      secPane.addEventListener(
        "paneload",  function(e) { that.addTBButton(aDocument); }, false);
    }
  },

  /**
   * Remove the password exporter button from the Thunderbird preferences panel.
   * @param aDocument the document to remove the button from.
   */
  removeTBButton : function(aDocument) {
    this._logger.debug("removeTBButton");

    let button = aDocument.getElementById("pwdex-button");

    if (null != button) {
      button.parentNode.removeChild(button);
    }
  },

  /**
   * Opens the password exporter window.
   * @param aWindow the parent window.
   */
  openPwdExWindow : function(aWindow) {
    this._logger.debug("openPwdExWindow");

    let win = Services.wm.getMostRecentWindow("passwordexporter-dialog");

    // check if a window is already open.
    if ((null != win) && !win.closed) {
      win.focus();
    } else {
      aWindow.openDialog(
        "chrome://passwordexporter/content/pwdexDialog.xul",
        "passwordexporter-dialog",
        "chrome,centerscreen,dialog,resizable");
    }
  },

  /**
   * Opens the file picker for an export operation.
   * @param aWindow the parent window for the file picker.
   * @return object with chosen file and file type, null if no choice was made.
   */
  openExportFilePicker : function(aWindow) {
    this._logger.debug("openExportFilePicker");

    let picker =
      Cc["@mozilla.org/filepicker;1"].createInstance(Ci.nsIFilePicker);
    let result = null;

    picker.init(
      aWindow, PwdEx.getString("passwordexporter.filepicker-title"),
      picker.modeSave);
    picker.defaultString =
      "password-export-" + this._getDateString() + ".json";
    picker.defaultExtension = "json";
    // XXX: the filter ordering matches the constants in PwdEx.IO
    picker.appendFilter("JSON", "*.json");
    picker.appendFilter("XML", "*.xml");
    picker.appendFilter("CSV", "*.csv");

    if (picker.returnCancel != picker.show()) {
      result = { file : picker.file, type : picker.filterIndex };
    }

    return result;
  },

  /**
   * Create the password exporter button node.
   * @param aDocument the document the create the node in.
   * @return the node corresponding to the button.
   */
  _createPwdExButton : function(aDocument) {
    this._logger.trace("_createPwdExButton");

    let that = this;
    let button = aDocument.createElement("button");

    button.setAttribute("id", "pwdex-button");
    button.setAttribute(
      "label", PwdEx.getString("passwordexporter.button-label"));
    button.setAttribute(
      "accesskey", PwdEx.getString("passwordexporter.button-accesskey"));
    button.addEventListener(
      "command",  function(e) { that.openPwdExWindow(aDocument.defaultView); },
      false);

    return button;
  },

  /**
   * Returns current date in YYYY-MM-DD format for default file names.
   */
  _getDateString: function() {
    this._logger.trace("_getDateString");

    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    month = (month < 10 ? '0' + month : month);
    day = (day < 10 ? '0' + day : day);

    return (year + "-" + month + "-" + day);
  }
};

/**
 * Constructor.
 */
(function() {
  this.init();
}).apply(PwdEx.UI);
