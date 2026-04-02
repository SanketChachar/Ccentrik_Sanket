sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.Delete", {

    onDelete: function () {
      const sMatnr = this.byId("deleteMatnr").getValue().trim();

      if (!sMatnr) {
        MessageBox.warning("Please enter a Material Number.");
        return;
      }

      MessageBox.confirm(
        "Are you sure you want to delete material '" + sMatnr + "'?",
        {
          onClose: (sAction) => {
            if (sAction === MessageBox.Action.OK) {
              this._doDelete(sMatnr);
            }
          }
        }
      );
    },

    _doDelete: function (sMatnr) {
      const oModel = this.getOwnerComponent().getModel();
      const oBinding = oModel.bindContext("/ZMARA('" + sMatnr + "')");

      oBinding.getBoundContext().delete("$auto").then(() => {
        MessageToast.show("Material '" + sMatnr + "' deleted.");
        this.byId("deleteMatnr").setValue("");
      }).catch(() => {
        MessageBox.error("Delete failed. Material may not exist.");
      });
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});
