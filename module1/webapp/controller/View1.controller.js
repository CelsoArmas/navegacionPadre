sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("com.tasa.module1.controller.View1", {
            onInit: function () {
                let oModel = new sap.ui.model.json.JSONModel({
                    lista:[
                        {
                            name:"Juan Rodriguez",
                            dni:"123254765"
                        },
                        {
                            name:"Ana Somocurcio",
                            dni:"553254765"
                        },
                        {
                            name:"Pedro Solorzano",
                            dni:"9043254765"
                        }
                    ]
                });

                this.getView().setModel(oModel);

                this.router = this.getOwnerComponent().getRouter();
            },
            onPress:function(oEvent){
                let oContext = oEvent.getSource().getBindingContext(),
                oObjectId = oContext.getObject().dni; 
               
                let oCrossAppNavigator = sap.ushell.Container.getService("CrossApplicationNavigation"); 
                oCrossAppNavigator.isIntentSupported(["AppDestino-Display"])
                .done(function(aResponses) { 

                }) 
                .fail(function() { 
                    new sap.m.MessageToast("Provide corresponding intent to navigate"); 
                }); 
                // generate the Hash to display a employee Id 
                var hash = (oCrossAppNavigator && oCrossAppNavigator.hrefForExternal({ 
                    target: { 
                        semanticObject: "AppDestino", 
                        action: "Display" 
                    } ,
                    params: {
                        id: oObjectId,
                        app:"true"
                    }
                })) || "";
                 //Generate a URL for the second application 
                 var url = window.location.href.split('#')[0] + hash; 
                 //Navigate to second app 
                 sap.m.URLHelper.redirect(url, true);
            }
        });
    });
