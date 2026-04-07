sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.Delete", {

    onDelete: function () {

      const sMatnr = this.byId("del_matnr").getValue().trim();

      if (!sMatnr) {
        MessageBox.warning("Please enter a Material Number.");
        return;
      }

      const oModel = this.getOwnerComponent().getModel();

      // ⚠️ OData V4 DELETE via context binding
      const sPath = "/ZMARA('" + sMatnr + "')";

      const oContextBinding = oModel.bindContext(sPath);

      oContextBinding.requestObject().then((oData) => {

        if (!oData) {
          MessageBox.error("Material not found.");
          return;
        }

        // 🔥 CONFIRMATION POPUP
        MessageBox.confirm(
          "Are you sure you want to delete Material '" + sMatnr + "'?",
          {
            actions: ["Delete", "Cancel"],
            emphasizedAction: "Delete",

            onClose: (sAction) => {

              if (sAction === "Delete") {

                oContextBinding.getBoundContext().delete("$auto")
                  .then(() => {
                    MessageToast.show("Material deleted successfully.");
                    this.byId("del_matnr").setValue("");
                  })
                  .catch(() => {
                    MessageBox.error("Delete failed.");
                  });

              }
            }
          }
        );

      }).catch(() => {
        MessageBox.error("Material not found.");
      });

    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});