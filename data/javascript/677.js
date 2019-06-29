Ext.define('Zenws.zenws.web.com.zen.view.app.ClubMain', {
     "extend": "Ext.tab.Panel",
     "customWidgetType": "vdTabLayout",
     "autoScroll": false,
     "controller": "ClubMainController",
     "restURL": "/Club",
     "defaults": {
          "split": true
     },
     "requires": ["Zenws.zenws.shared.com.zen.model.app.ClubModel", "Zenws.zenws.web.com.zen.controller.app.ClubMainController", "Zenws.zenws.shared.com.zen.model.location.CountryModel", "Zenws.zenws.shared.com.zen.model.location.StateModel", "Zenws.zenws.shared.com.zen.model.location.CityModel", "Zenws.zenws.shared.com.zen.viewmodel.app.ClubViewModel"],
     "communicationLog": [],
     "tabPosition": "bottom",
     "items": [{
          "title": "Data Browser",
          "layout": "border",
          "defaults": {
               "split": true
          },
          "autoScroll": false,
          "customWidgetType": "vdBorderLayout",
          "items": [{
               "xtype": "tabpanel",
               "customWidgetType": "vdTabLayout",
               "displayName": "Club",
               "name": "ClubTreeContainer",
               "itemId": "ClubTreeContainer",
               "margin": "5 0 5 5",
               "autoScroll": false,
               "collapsible": true,
               "titleCollapse": true,
               "collapseMode": "header",
               "collapsed": false,
               "items": [{
                    "xtype": "treepanel",
                    "customWidgetType": "vdTree",
                    "useArrows": true,
                    "title": "Browse",
                    "rootVisible": false,
                    "itemId": "ClubTree",
                    "listeners": {
                         "select": "treeClick"
                    },
                    "tbar": [{
                         "xtype": "triggerfield",
                         "customWidgetType": "vdTriggerField",
                         "emptyText": "Search",
                         "triggerCls": "",
                         "listeners": {
                              "change": "onTriggerfieldChange",
                              "buffer": 250
                         }
                    }, "->", {
                         "xtype": "tool",
                         "type": "refresh",
                         "tooltip": "Refresh Tree Data",
                         "handler": "onTreeRefreshClick"
                    }]
               }, {
                    "title": "Advance Search",
                    "xtype": "form",
                    "customWidgetType": "vdFormpanel",
                    "layout": "fit",
                    "autoScroll": false,
                    "itemId": "queryPanel",
                    "buttons": [{
                         "text": "Filter",
                         "handler": "onFilterClick"
                    }],
                    "items": []
               }],
               "region": "west",
               "width": "20%"
          }, {
               "region": "center",
               "layout": "border",
               "defaults": {
                    "split": true
               },
               "customWidgetType": "vdBorderLayout",
               "items": [{
                    "xtype": "form",
                    "displayName": "Club",
                    "name": "Club",
                    "itemId": "ClubForm",
                    "bodyPadding": 10,
                    "items": [{
                         "xtype": "form",
                         "itemId": "form0",
                         "customWidgetType": "vdCard",
                         "header": {
                              "hidden": true
                         },
                         "items": [{
                              "layout": "column",
                              "customWidgetType": "vdColumnLayout",
                              "header": {
                                   "hidden": true
                              },
                              "xtype": "panel",
                              "items": [{
                                   "name": "clubId",
                                   "itemId": "clubId",
                                   "xtype": "textfield",
                                   "customWidgetType": "vdTextfield",
                                   "displayName": "Club Id",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "Club Id<font color='red'> *<\/font>",
                                   "fieldId": "C70D5ED6-91DA-4DCB-8887-A724A79EFC8A",
                                   "hidden": true,
                                   "value": "",
                                   "bindable": "clubId",
                                   "bind": "{clubId}"
                              }, {
                                   "name": "clubName",
                                   "itemId": "clubName",
                                   "xtype": "textfield",
                                   "customWidgetType": "vdTextfield",
                                   "displayName": "Club Name",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "Club Name<font color='red'> *<\/font>",
                                   "allowBlank": false,
                                   "fieldId": "7784BD7D-53E2-406C-A0FB-8C2C0D4B8381",
                                   "minLength": "0",
                                   "maxLength": "256",
                                   "bindable": "clubName",
                                   "columnWidth": 0.5,
                                   "bind": "{clubName}"
                              }, {
                                   "name": "countryId",
                                   "itemId": "countryId",
                                   "xtype": "combo",
                                   "customWidgetType": "vdCombo",
                                   "displayName": "Country",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "Country<font color='red'> *<\/font>",
                                   "allowBlank": false,
                                   "fieldId": "922D12FB-5148-455F-BCE2-049B4AA8542D",
                                   "restURL": "Country",
                                   "displayField": "primaryDisplay",
                                   "valueField": "primaryKey",
                                   "typeAhead": true,
                                   "queryMode": "local",
                                   "minChars": 2,
                                   "store": {
                                        "data": [],
                                        "model": "Zenws.zenws.shared.com.zen.model.location.CountryModel"
                                   },
                                   "bindable": "countryId",
                                   "columnWidth": 0.5,
                                   "bind": "{countryId}",
                                   "listeners": {
                                        "change": "onCountryIdChange"
                                   }
                              }, {
                                   "name": "stateId",
                                   "itemId": "stateId",
                                   "xtype": "combo",
                                   "customWidgetType": "vdCombo",
                                   "displayName": "State",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "State<font color='red'> *<\/font>",
                                   "allowBlank": false,
                                   "fieldId": "45FBF915-7C7F-47C4-864C-C5C582CAD03D",
                                   "restURL": "State",
                                   "displayField": "primaryDisplay",
                                   "valueField": "primaryKey",
                                   "typeAhead": true,
                                   "queryMode": "local",
                                   "minChars": 2,
                                   "store": {
                                        "data": [],
                                        "model": "Zenws.zenws.shared.com.zen.model.location.StateModel"
                                   },
                                   "bindable": "stateId",
                                   "columnWidth": 0.5,
                                   "bind": "{stateId}",
                                   "listeners": {
                                        "change": "onStateIdChange"
                                   }
                              }, {
                                   "name": "cityId",
                                   "itemId": "cityId",
                                   "xtype": "combo",
                                   "customWidgetType": "vdCombo",
                                   "displayName": "City",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "City<font color='red'> *<\/font>",
                                   "allowBlank": false,
                                   "fieldId": "A67EC765-D91B-46A9-8968-80DE0A5FA7EE",
                                   "restURL": "City",
                                   "displayField": "primaryDisplay",
                                   "valueField": "primaryKey",
                                   "typeAhead": true,
                                   "queryMode": "local",
                                   "minChars": 2,
                                   "store": {
                                        "data": [],
                                        "model": "Zenws.zenws.shared.com.zen.model.location.CityModel"
                                   },
                                   "bindable": "cityId",
                                   "columnWidth": 0.5,
                                   "bind": "{cityId}"
                              }, {
                                   "name": "addressLine",
                                   "itemId": "addressLine",
                                   "xtype": "textfield",
                                   "customWidgetType": "vdTextfield",
                                   "displayName": "Address Line",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "Address Line<font color='red'> *<\/font>",
                                   "allowBlank": false,
                                   "fieldId": "95276855-B98C-41D0-A4FE-AE6F17E0A8B8",
                                   "minLength": "0",
                                   "maxLength": "256",
                                   "bindable": "addressLine",
                                   "columnWidth": 0.5,
                                   "bind": "{addressLine}"
                              }, {
                                   "name": "addressLine2",
                                   "itemId": "addressLine2",
                                   "xtype": "textfield",
                                   "customWidgetType": "vdTextfield",
                                   "displayName": "Address Line 2",
                                   "margin": "5 5 5 5",
                                   "fieldLabel": "Address Line 2",
                                   "fieldId": "B83C5601-E67F-4CE7-A3D3-CC9C89BF7C23",
                                   "minLength": "0",
                                   "maxLength": "256",
                                   "bindable": "addressLine2",
                                   "columnWidth": 0.5,
                                   "bind": "{addressLine2}"
                              }, {
                                   "name": "versionId",
                                   "itemId": "versionId",
                                   "xtype": "numberfield",
                                   "customWidgetType": "vdNumberfield",
                                   "displayName": "versionId",
                                   "margin": "5 5 5 5",
                                   "value": "-1",
                                   "fieldLabel": "versionId",
                                   "fieldId": "200E56FE-9E7B-4042-82C2-5FDCC7A8FFC0",
                                   "bindable": "versionId",
                                   "bind": "{versionId}",
                                   "hidden": true
                              }]
                         }]
                    }],
                    "tools": [{
                         "type": "help",
                         "tooltip": "Get Console",
                         "handler": "onConsoleClick"
                    }, {
                         "type": "refresh",
                         "tooltip": "Refresh Tab",
                         "handler": "init"
                    }],
                    "layout": "card",
                    "defaults": {
                         "autoScroll": true
                    },
                    "autoScroll": true,
                    "dockedItems": [{
                         "xtype ": "toolbar",
                         "customWidgetType": "vdBBar",
                         "dock": "bottom",
                         "margin": 0,
                         "isDockedItem": true,
                         "items": [{
                              "xtype": "tbfill",
                              "customWidgetType": "vdTbFill"
                         }, {
                              "xtype": "button",
                              "customWidgetType": "vdButton",
                              "margin": "0 5 0 5",
                              "text": "Save",
                              "hiddenName": "button",
                              "canHaveParent": false,
                              "itemId": "saveFormButton",
                              "listeners": {
                                   "click": "saveForm"
                              }
                         }, {
                              "xtype": "button",
                              "customWidgetType": "vdButton",
                              "margin": "0 5 0 5",
                              "text": "Reset",
                              "hiddenName": "button",
                              "canHaveParent": false,
                              "itemId": "resetFormButton",
                              "listeners": {
                                   "click": "resetForm"
                              }
                         }],
                         "defaults": {
                              "margin": "0 5 0 5"
                         }
                    }],
                    "viewModel": "ClubViewModel",
                    "listeners": {},
                    "extend": "Ext.form.Panel",
                    "region": "center",
                    "customWidgetType": "vdCardLayout"
               }, {
                    "xtype": "grid",
                    "customWidgetType": "vdGrid",
                    "displayName": "Club",
                    "title": "Details Grid",
                    "name": "ClubGrid",
                    "itemId": "ClubGrid",
                    "store": [],
                    "bodyPadding": 10,
                    "requires": [],
                    "columns": [{
                         "header": "Club Id",
                         "dataIndex": "clubId",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "primaryKey",
                         "dataIndex": "primaryKey",
                         "hidden": true
                    }, {
                         "header": "Club Name",
                         "dataIndex": "clubName",
                         "flex": 1
                    }, {
                         "header": "Country",
                         "dataIndex": "countryId",
                         "renderer": "renderFormValue",
                         "flex": 1
                    }, {
                         "header": "State",
                         "dataIndex": "stateId",
                         "renderer": "renderFormValue",
                         "flex": 1
                    }, {
                         "header": "City",
                         "dataIndex": "cityId",
                         "renderer": "renderFormValue",
                         "flex": 1
                    }, {
                         "header": "Address Line",
                         "dataIndex": "addressLine",
                         "flex": 1
                    }, {
                         "header": "Address Line 2",
                         "dataIndex": "addressLine2",
                         "flex": 1
                    }, {
                         "header": "createdBy",
                         "dataIndex": "createdBy",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "createdDate",
                         "dataIndex": "createdDate",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "updatedBy",
                         "dataIndex": "updatedBy",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "updatedDate",
                         "dataIndex": "updatedDate",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "versionId",
                         "dataIndex": "versionId",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "activeStatus",
                         "dataIndex": "activeStatus",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "header": "txnAccessCode",
                         "dataIndex": "txnAccessCode",
                         "hidden": true,
                         "flex": 1
                    }, {
                         "xtype": "actioncolumn",
                         "customWidgetType": "vdActionColumn",
                         "width": 30,
                         "sortable": false,
                         "menuDisable": true,
                         "items": [{
                              "icon": "images/delete.gif",
                              "tooltip": "Delete Record",
                              "handler": "onDeleteActionColumnClickMainGrid"
                         }]
                    }],
                    "listeners": {
                         "itemclick": "onGridItemClick"
                    },
                    "tools": [{
                         "type": "refresh",
                         "tooltip": "Refresh Grid Data",
                         "handler": "onGridRefreshClick"
                    }],
                    "collapsible": true,
                    "titleCollapse": true,
                    "collapseMode": "header",
                    "region": "south",
                    "height": "40%"
               }]
          }]
     }, {
          "title": "Add New",
          "itemId": "addNewForm",
          "layout": "border",
          "customWidgetType": "vdBorderLayout",
          "autoScroll": false,
          "items": [{
               "xtype": "form",
               "displayName": "Club",
               "name": "Club",
               "itemId": "ClubForm",
               "bodyPadding": 10,
               "items": [{
                    "xtype": "form",
                    "itemId": "form0",
                    "customWidgetType": "vdCard",
                    "header": {
                         "hidden": true
                    },
                    "items": [{
                         "layout": "column",
                         "customWidgetType": "vdColumnLayout",
                         "header": {
                              "hidden": true
                         },
                         "xtype": "panel",
                         "items": [{
                              "name": "clubId",
                              "itemId": "clubId",
                              "xtype": "textfield",
                              "customWidgetType": "vdTextfield",
                              "displayName": "Club Id",
                              "margin": "5 5 5 5",
                              "fieldLabel": "Club Id<font color='red'> *<\/font>",
                              "fieldId": "C70D5ED6-91DA-4DCB-8887-A724A79EFC8A",
                              "hidden": true,
                              "value": "",
                              "bindable": "clubId",
                              "bind": "{clubId}"
                         }, {
                              "name": "clubName",
                              "itemId": "clubName",
                              "xtype": "textfield",
                              "customWidgetType": "vdTextfield",
                              "displayName": "Club Name",
                              "margin": "5 5 5 5",
                              "fieldLabel": "Club Name<font color='red'> *<\/font>",
                              "allowBlank": false,
                              "fieldId": "7784BD7D-53E2-406C-A0FB-8C2C0D4B8381",
                              "minLength": "0",
                              "maxLength": "256",
                              "bindable": "clubName",
                              "columnWidth": 0.5,
                              "bind": "{clubName}"
                         }, {
                              "name": "countryId",
                              "itemId": "countryId",
                              "xtype": "combo",
                              "customWidgetType": "vdCombo",
                              "displayName": "Country",
                              "margin": "5 5 5 5",
                              "fieldLabel": "Country<font color='red'> *<\/font>",
                              "allowBlank": false,
                              "fieldId": "922D12FB-5148-455F-BCE2-049B4AA8542D",
                              "restURL": "Country",
                              "displayField": "primaryDisplay",
                              "valueField": "primaryKey",
                              "typeAhead": true,
                              "queryMode": "local",
                              "minChars": 2,
                              "store": {
                                   "data": [],
                                   "model": "Zenws.zenws.shared.com.zen.model.location.CountryModel"
                              },
                              "bindable": "countryId",
                              "columnWidth": 0.5,
                              "bind": "{countryId}",
                              "listeners": {
                                   "change": "onCountryIdChange"
                              }
                         }, {
                              "name": "stateId",
                              "itemId": "stateId",
                              "xtype": "combo",
                              "customWidgetType": "vdCombo",
                              "displayName": "State",
                              "margin": "5 5 5 5",
                              "fieldLabel": "State<font color='red'> *<\/font>",
                              "allowBlank": false,
                              "fieldId": "45FBF915-7C7F-47C4-864C-C5C582CAD03D",
                              "restURL": "State",
                              "displayField": "primaryDisplay",
                              "valueField": "primaryKey",
                              "typeAhead": true,
                              "queryMode": "local",
                              "minChars": 2,
                              "store": {
                                   "data": [],
                                   "model": "Zenws.zenws.shared.com.zen.model.location.StateModel"
                              },
                              "bindable": "stateId",
                              "columnWidth": 0.5,
                              "bind": "{stateId}",
                              "listeners": {
                                   "change": "onStateIdChange"
                              }
                         }, {
                              "name": "cityId",
                              "itemId": "cityId",
                              "xtype": "combo",
                              "customWidgetType": "vdCombo",
                              "displayName": "City",
                              "margin": "5 5 5 5",
                              "fieldLabel": "City<font color='red'> *<\/font>",
                              "allowBlank": false,
                              "fieldId": "A67EC765-D91B-46A9-8968-80DE0A5FA7EE",
                              "restURL": "City",
                              "displayField": "primaryDisplay",
                              "valueField": "primaryKey",
                              "typeAhead": true,
                              "queryMode": "local",
                              "minChars": 2,
                              "store": {
                                   "data": [],
                                   "model": "Zenws.zenws.shared.com.zen.model.location.CityModel"
                              },
                              "bindable": "cityId",
                              "columnWidth": 0.5,
                              "bind": "{cityId}"
                         }, {
                              "name": "addressLine",
                              "itemId": "addressLine",
                              "xtype": "textfield",
                              "customWidgetType": "vdTextfield",
                              "displayName": "Address Line",
                              "margin": "5 5 5 5",
                              "fieldLabel": "Address Line<font color='red'> *<\/font>",
                              "allowBlank": false,
                              "fieldId": "95276855-B98C-41D0-A4FE-AE6F17E0A8B8",
                              "minLength": "0",
                              "maxLength": "256",
                              "bindable": "addressLine",
                              "columnWidth": 0.5,
                              "bind": "{addressLine}"
                         }, {
                              "name": "addressLine2",
                              "itemId": "addressLine2",
                              "xtype": "textfield",
                              "customWidgetType": "vdTextfield",
                              "displayName": "Address Line 2",
                              "margin": "5 5 5 5",
                              "fieldLabel": "Address Line 2",
                              "fieldId": "B83C5601-E67F-4CE7-A3D3-CC9C89BF7C23",
                              "minLength": "0",
                              "maxLength": "256",
                              "bindable": "addressLine2",
                              "columnWidth": 0.5,
                              "bind": "{addressLine2}"
                         }, {
                              "name": "versionId",
                              "itemId": "versionId",
                              "xtype": "numberfield",
                              "customWidgetType": "vdNumberfield",
                              "displayName": "versionId",
                              "margin": "5 5 5 5",
                              "value": "-1",
                              "fieldLabel": "versionId",
                              "fieldId": "200E56FE-9E7B-4042-82C2-5FDCC7A8FFC0",
                              "bindable": "versionId",
                              "bind": "{versionId}",
                              "hidden": true
                         }]
                    }]
               }],
               "tools": [{
                    "type": "help",
                    "tooltip": "Get Console",
                    "handler": "onConsoleClick"
               }, {
                    "type": "refresh",
                    "tooltip": "Refresh Tab",
                    "handler": "init"
               }],
               "layout": "card",
               "defaults": {
                    "autoScroll": true
               },
               "autoScroll": true,
               "dockedItems": [{
                    "xtype ": "toolbar",
                    "customWidgetType": "vdBBar",
                    "dock": "bottom",
                    "margin": 0,
                    "isDockedItem": true,
                    "items": [{
                         "xtype": "tbfill",
                         "customWidgetType": "vdTbFill"
                    }, {
                         "xtype": "button",
                         "customWidgetType": "vdButton",
                         "margin": "0 5 0 5",
                         "text": "Save",
                         "hiddenName": "button",
                         "canHaveParent": false,
                         "itemId": "saveFormButton",
                         "listeners": {
                              "click": "saveForm"
                         }
                    }, {
                         "xtype": "button",
                         "customWidgetType": "vdButton",
                         "margin": "0 5 0 5",
                         "text": "Reset",
                         "hiddenName": "button",
                         "canHaveParent": false,
                         "itemId": "resetFormButton",
                         "listeners": {
                              "click": "resetForm"
                         }
                    }],
                    "defaults": {
                         "margin": "0 5 0 5"
                    }
               }],
               "viewModel": "ClubViewModel",
               "listeners": {},
               "extend": "Ext.form.Panel",
               "region": "center",
               "customWidgetType": "vdCardLayout"
          }]
     }]
});