sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel",
  "sap/m/MessageToast",
  "sap/m/MessageBox"
], function (Controller, JSONModel, MessageToast, MessageBox) {
  "use strict";

 return Controller.extend("zmm_sbc_2903.controller.Create", {
    onInit: function () {
      // Local JSON model for form fields
      const oModel = new JSONModel({
        crt_matnr: "",
        crt_mtart: "",
        crt_mbrsh: "",
        crt_matkr: "",
        crt_pstat: ""
      });
      this.getView().setModel(oModel, "newMaterial");
    },

    onSave: function () {
      const oLocalModel = this.getView().getModel("newMaterial");
      const oData = oLocalModel.getData();

      // Basic validation
      if (!oData.MATNR || !oData.MTART) {
        MessageBox.error("Material Number and Material Type are required.");
        return;
      }

      const oODataModel = this.getOwnerComponent().getModel();

      try {
        const oListBinding = oODataModel.bindList("/ZMARA");
        oListBinding.create({
          MATNR: oData.MATNR,
          MTART: oData.MTART,
          MBRSH: oData.MBRSH,
          MATKL: oData.MATKL,
          PSTAT: oData.PSTAT
        });

        MessageToast.show("Material '" + oData.MATNR + "' created successfully.");
        this.onClear();

      } catch (oError) {
        MessageBox.error("Failed to create material: " + oError.message);
      }
    },

    onClear: function () {
      const oModel = this.getView().getModel("newMaterial");
      oModel.setData({
        MATNR: "",
        MTART: "",
        MBRSH: "",
        MATKL: "",
        PSTAT: ""
      });
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});