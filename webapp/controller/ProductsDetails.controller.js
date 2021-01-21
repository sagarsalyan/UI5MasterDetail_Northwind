sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("App.ProductDetails.controller.ProductsDetails", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf App.ProductDetails.view.ProductsDetails
		 */
		onInit: function () {
			debugger
			var router = sap.ui.core.UIComponent.getRouterFor(this);
			router.attachRoutePatternMatched(this._handleRouteMatched, this);
		},
		_handleRouteMatched: function (oEvent) {
			debugger;
			if (oEvent.getParameter("name") == "ProductsDetails") {
				var id = oEvent.getParameters().arguments.id;
				var pname = oEvent.getParameters().arguments.pname;
				// this.i = "13890";
				var that = this;
				var busyDialog = new sap.m.BusyDialog({
					"text": "Loading..."
				});
				busyDialog.open();
				//var that = this;
				that.getOwnerComponent().getModel().read("/Products(" + id + ")/Order_Details", {
					async: false,
					success: function (oData, oResponse) {
						busyDialog.close();
						debugger;
						oData = {
							id,
							pname,
							...oData
						}
						var oModel = new sap.ui.model.json.JSONModel(oData);
						that.getView().byId("productDetail").setModel(oModel, "prodDetailModel");
						that.getView().byId("productDetail").setSelectedSection(null);
					},
					error: function (error) {
						busyDialog.close();
						debugger;

					}
				});
			}
		},
		onDelete: function (evt) {
			debugger
			var data = this.getView().byId("productDetail").getModel("prodDetailModel").getData();
			var selectedContext = this.getView().byId("tableOrders").getSelectedIndices();
			// selectedContext.map(i => {
			// 	this.getView().byId("productDetail").getModel("prodDetailModel").getData().results.splice(i, 1)
			// });


			data.results = data.results.filter(function (value, index) {
				return selectedContext.indexOf(index) == -1;
			})

			this.getView().byId("tableOrders").clearSelection();
			this.getView().byId("productDetail").getModel("prodDetailModel").refresh();

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf App.ProductDetails.view.ProductsDetails
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf App.ProductDetails.view.ProductsDetails
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf App.ProductDetails.view.ProductsDetails
		 */
		//	onExit: function() {
		//
		//	}

	});

});