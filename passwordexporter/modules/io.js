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

PwdEx.IO = {
  /* Logger for this object. */
  _logger : null,

  TYPE_JSON : function() { return 0; },
  TYPE_XML : function() { return 1; },
  TYPE_CSV : function() { return 2; },

  /**
   * Initializes the object.
   */
  init : function() {
    this._logger = PwdEx.getLogger("PwdEx.IO");
    this._logger.debug("init");
  }
};

/**
 * Constructor.
 */
(function() {
  this.init();
}).apply(PwdEx.IO);
