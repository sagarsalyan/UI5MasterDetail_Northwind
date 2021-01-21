sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("App.ProductDetails.controller.ProductsMaster", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ProductDetails.view.ProductsMaster
		 */
		onInit: function () {
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		_handleRouteMatched: function (oEvent) {
			debugger
			var that = this;
			var busyDialog = new sap.m.BusyDialog({
				"text": "Loading..."
			});
			busyDialog.open();
			//var that = this;
			that.getOwnerComponent().getModel().read("/Products", {
				async: false,
				success: function (oData, oResponse) {
					busyDialog.close();
					debugger;
					var oModel = new sap.ui.model.json.JSONModel(oData);
					that.getView().byId("ProductList").setModel(oModel, "productsModel");

					var itemCount = that.getView().byId("ProductList").getModel("productsModel").getData().results.length;
					that.getView().byId("idMasterPage").setTitle("Products(" + itemCount + ")");

					var prodID = that.getView().byId("ProductList").getModel("productsModel").getData().results[0].ProductID
					var pname = that.getView().byId("ProductList").getModel("productsModel").getData().results[0].ProductName

					//var contractIndex=evt.getParameters().listItem.getBindingContext("ContractModel").getProperty().Zzagreementnum;
					if (prodID == "")
						prodID = "0";
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					oRouter.navTo("ProductsDetails", {
						id: prodID,
						pname: pname
					}, true);
				},
				error: function (error) {
					busyDialog.close();
					debugger;
					that.getView().byId("idMasterPage").setTitle("Products");
					sap.m.MessageBox.error("No Data Found")
					var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
					oRouter.navTo("ProductsDetails", {
						id: "0",
						pname: "null"
					}, true);
				}
			});
		},
		onProductSelect: function (evt) {

			var router = sap.ui.core.UIComponent.getRouterFor(this);
			var id = evt.getParameters().listItem.getProperty("number");
			var product = evt.getParameters().listItem.getProperty("title");
			// router.navTo("ProductDetails", {
			// 	cpath: id
			// }, true);
			// var data = {id,product};
			router.navTo("ProductsDetails", {
				id: id,
				pname: product
			}, true);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ProductDetails.view.ProductsMaster
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ProductDetails.view.ProductsMaster
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ProductDetails.view.ProductsMaster
		 */
		//	onExit: function() {
		//
		//	}

	});

});