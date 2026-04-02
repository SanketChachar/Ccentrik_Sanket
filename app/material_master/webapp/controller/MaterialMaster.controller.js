sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.MaterialMaster", {

    onCreate: function () {
      this.getOwnerComponent().getRouter().navTo("Create");
    },

    onRead: function () {
      this.getOwnerComponent().getRouter().navTo("Read");
    },

    onUpdate: function () {
      this.getOwnerComponent().getRouter().navTo("Update");
    },

    onDelete: function () {
      this.getOwnerComponent().getRouter().navTo("Delete");
    }

  });
});