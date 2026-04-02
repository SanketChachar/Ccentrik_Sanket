sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageBox"
], function (Controller, MessageBox) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.Read", {

    onSearch: function () {
      const sMatnr = this.byId("searchMatnr").getValue().trim();
      const oTable = this.byId("resultsTable");
      const oModel = this.getOwnerComponent().getModel();

      const sFilter = sMatnr ? "?$filter=MATNR eq '" + sMatnr + "'" : "";

      oTable.bindItems({
        path: "/ZMARA" + sFilter,
        template: oTable.getBindingInfo("items")
          ? oTable.getBindingInfo("items").template
          : new sap.m.ColumnListItem({
              cells: [
                new sap.m.Text({ text: "{MATNR}" }),
                new sap.m.Text({ text: "{MTART}" }),
                new sap.m.Text({ text: "{MBRSH}" }),
                new sap.m.Text({ text: "{MATKL}" }),
                new sap.m.Text({ text: "{PSTAT}" })
              ]
            })
      });

      oTable.setVisible(true);
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});