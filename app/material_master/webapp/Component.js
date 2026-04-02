sap.ui.define([
  "sap/ui/core/UIComponent",
  "zmm_sbc_2903/model/models"
], function (UIComponent, models) {
  "use strict";

  return UIComponent.extend("zmm_sbc_2903.Component", {
    metadata: {
      manifest: "json"
    },

    init: function () {
      UIComponent.prototype.init.apply(this, arguments);
      this.setModel(models.createMainModel());
      this.getRouter().initialize();
    }
  });
});