sap.ui.define([
  "sap/ui/model/odata/v4/ODataModel"
], function (ODataModel) {
  "use strict";

  return {
    createMainModel: function () {
      return new ODataModel({
        serviceUrl: "/odata/v4/material-master/",
        synchronizationMode: "None",
        operationMode: "Server",
        autoExpandSelect: true
      });
    }
  };
});