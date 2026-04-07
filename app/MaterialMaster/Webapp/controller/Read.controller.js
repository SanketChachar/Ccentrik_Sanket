sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/ColumnListItem",
  "sap/m/Text"
], function (Controller, ColumnListItem, Text) {
  "use strict";

  return Controller.extend("zmm_sbc_2903.controller.Read", {

    onSearch: function () {
      var oTable = this.byId("resultsTable");
      var sMatnr = this.byId("searchMatnr").getValue();

      oTable.setVisible(true);

      oTable.bindItems({
        path: "/ZMARA_READ",
        parameters: {
          $filter: "MATNR eq '" + sMatnr + "'"
        },
        template: this._getTemplate()
      });
    },

    onFetchAll: function () {
      var oTable = this.byId("resultsTable");

      oTable.setVisible(true);

      oTable.bindItems({
        path: "/ZMARA_READ",
        parameters: {
          $orderby: "MATNR asc"
        },
        template: this._getTemplate()
      });
    },

    // ✅ FIX: Always provide template manually
    _getTemplate: function () {
      return new ColumnListItem({
        cells: [
          new Text({ text: "{MATNR}" }),
          new Text({ text: "{MTART}" }),
          new Text({ text: "{MBRSH}" }),
          new Text({ text: "{MATKL}" }),
          new Text({ text: "{PSTAT}" })
        ]
      });
    },

    onBack: function () {
      this.getOwnerComponent().getRouter().navTo("Main");
    }

  });
});