sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.Update", {

    onInit: function () {
      this.getView().setModel(new JSONModel({}), "updateModel");
      this._oContext = null;
    },

    onLoad: function () {
      const sMatnr = this.byId("searchMatnr").getValue().trim();
      if (!sMatnr) {
        MessageBox.warning("Please enter a Material Number.");
        return;
      }

      const oModel = this.getOwnerComponent().getModel();
      const oBinding = oModel.bindContext("/ZMARA('" + sMatnr + "')");

      oBinding.requestObject().then((oData) => {
        this.getView().getModel("updateModel").setData(oData);
        this._oContext = oBinding.getBoundContext();
        this.byId("updateForm").setVisible(true);
      }).catch(() => {
        MessageBox.error("Material '" + sMatnr + "' not found.");
      });
    },

    onUpdate: function () {
      if (!this._oContext) {
        MessageBox.error("Please load a material first.");
        return;
      }

      const oData = this.getView().getModel("updateModel").getData();

      this._oContext.setProperty("MTART", oData.MTART);
      this._oContext.setProperty("MBRSH", oData.MBRSH);
      this._oContext.setProperty("MATKL", oData.MATKL);
      this._oContext.setProperty("PSTAT", oData.PSTAT);

      this.getOwnerComponent().getModel().submitBatch("$auto").then(() => {
        MessageToast.show("Material updated successfully.");
      }).catch(() => {
        MessageBox.error("Update failed.");
      });
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});