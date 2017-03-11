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
  // TODO: increment by 1 when we have JSON support.
  TYPE_JSON :  -1,
  TYPE_XML :  0,
  TYPE_CSV :  1,

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
