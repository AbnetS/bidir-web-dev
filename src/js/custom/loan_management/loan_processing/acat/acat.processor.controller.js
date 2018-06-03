/**
 * Created by Yonas on 4/27/2018.
 */
(function(angular) {
    "use strict";

    angular.module("app.processing")
        .controller("ACATProcessorController", ACATProcessorController);

    ACATProcessorController.$inject = ['LoanManagementService','AlertService','$scope','$mdDialog','RouteHelpers'];

    function ACATProcessorController(LoanManagementService,AlertService,$scope,$mdDialog,RouteHelpers ) {
        var vm = this;

        vm.selectedSubsection = {};
        vm.toggle = {};
        vm.accordionToggle = {};
        vm.cropOptions = [ "Tomato","Onion","Cabbage",'Bean','Crop 1'];

        vm.onSubsectionClick = function(subsection) {
            vm.toggle[subsection._id] = !vm.toggle[subsection._id];
            if (subsection.sub_sections.length == 0) {
                vm.selectedSubsection = subsection;
            }
        };

        vm.onAccordionClick = function(acc) {
            vm.toggle[acc._id] = !vm.toggle[acc._id];
        };

        vm.acats = [{
            "_id": "5af75e5df231af00019fe0e6",
            "last_modified": "2018-05-12T21:36:30.312Z",
            "date_created": "2018-05-12T21:36:29.471Z",
            "client": "5af744d54b505800017cccd7",
            "branch": "5a5fc3b4819f060001fbb12a",
            "created_by": "5a64633c8f51840001e16495",
            "achieved": {
                "net_cash_flow": {
                    "dec": 0,
                    "nov": 0,
                    "oct": 0,
                    "sep": 0,
                    "aug": 0,
                    "july": 0,
                    "june": 0,
                    "may": 0,
                    "apr": 0,
                    "mar": 0,
                    "feb": 0,
                    "jan": 0
                },
                "net_income": 0,
                "total_revenue": 0,
                "total_cost": 0
            },
            "estimated": {
                "net_cash_flow": {
                    "dec": 0,
                    "nov": 0,
                    "oct": 0,
                    "sep": 0,
                    "aug": 0,
                    "july": 0,
                    "june": 0,
                    "may": 0,
                    "apr": 0,
                    "mar": 0,
                    "feb": 0,
                    "jan": 0
                },
                "net_income": 0,
                "total_revenue": 0,
                "total_cost": 0
            },
            "status": "new",
            "ACATs": [{
                "_id": "5af75e5df231af00019fe0e7",
                "last_modified": "2018-05-12T21:36:29.835Z",
                "date_created": "2018-05-12T21:36:29.533Z",
                "type": "ACAT",
                "client": "5af744d54b505800017cccd7",
                "crop": "5af7202cf231af00019fe03f",
                "created_by": "5a64633b8f51840001e16494",
                "achieved": {
                    "net_cash_flow": {
                        "dec": 0,
                        "nov": 0,
                        "oct": 0,
                        "sep": 0,
                        "aug": 0,
                        "july": 0,
                        "june": 0,
                        "may": 0,
                        "apr": 0,
                        "mar": 0,
                        "feb": 0,
                        "jan": 0
                    },
                    "net_income": 0,
                    "total_revenue": 0,
                    "total_cost": 0
                },
                "estimated": {
                    "net_cash_flow": {
                        "dec": 0,
                        "nov": 0,
                        "oct": 0,
                        "sep": 0,
                        "aug": 0,
                        "july": 0,
                        "june": 0,
                        "may": 0,
                        "apr": 0,
                        "mar": 0,
                        "feb": 0,
                        "jan": 0
                    },
                    "net_income": 0,
                    "total_revenue": 0,
                    "total_cost": 0
                },
                "status": "new",
                "gps_location": {
                    "polygon": [],
                    "single_point": {
                        "longtude": 0,
                        "latitude": 0
                    }
                },
                "first_expense_month": "None",
                "non_financial_resources": [],
                "access_to_non_financial_resources": false,
                "cropping_area_size": "0x0",
                "sections": [{
                    "_id": "5af75e5df231af00019fe0e8",
                    "last_modified": "2018-05-12T21:36:29.794Z",
                    "date_created": "2018-05-12T21:36:29.554Z",
                    "estimated_sub_total": 0,
                    "achieved_sub_total": 0,
                    "estimated_cash_flow": {
                        "dec": 0,
                        "nov": 0,
                        "oct": 0,
                        "sep": 0,
                        "aug": 0,
                        "july": 0,
                        "june": 0,
                        "may": 0,
                        "apr": 0,
                        "mar": 0,
                        "feb": 0,
                        "jan": 0
                    },
                    "achieved_cash_flow": {
                        "dec": 0,
                        "nov": 0,
                        "oct": 0,
                        "sep": 0,
                        "aug": 0,
                        "july": 0,
                        "june": 0,
                        "may": 0,
                        "apr": 0,
                        "mar": 0,
                        "feb": 0,
                        "jan": 0
                    },
                    "number": 1,
                    "sub_sections": [{
                        "_id": "5af75e5df231af00019fe0e9",
                        "last_modified": "2018-05-12T21:36:29.668Z",
                        "date_created": "2018-05-12T21:36:29.559Z",
                        "estimated_sub_total": 0,
                        "achieved_sub_total": 0,
                        "estimated_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "achieved_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "number": 1,
                        "sub_sections": [{
                            "_id": "5af75e5df231af00019fe0ec",
                            "last_modified": "2018-05-12T21:36:29.569Z",
                            "date_created": "2018-05-12T21:36:29.569Z",
                            "variety": "",
                            "seed_source": [
                                "ESE",
                                "Union",
                                "Private"
                            ],
                            "estimated_sub_total": 0,
                            "achieved_sub_total": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "cost_list": {
                                "_id": "5af75e5df231af00019fe0eb",
                                "last_modified": "2018-05-12T21:36:29.566Z",
                                "date_created": "2018-05-12T21:36:29.566Z",
                                "grouped": [],
                                "linear": [{
                                    "_id": "5af75e5df231af00019fe0ea",
                                    "last_modified": "2018-05-12T21:36:29.563Z",
                                    "date_created": "2018-05-12T21:36:29.563Z",
                                    "achieved": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "estimated": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "remark": "",
                                    "unit": "Quint",
                                    "item": "Amount of seed required/quart"
                                }]
                            },
                            "number": 1,
                            "sub_sections": [],
                            "title": "Seed"
                        },
                            {
                                "_id": "5af75e5df231af00019fe0f1",
                                "last_modified": "2018-05-12T21:36:29.598Z",
                                "date_created": "2018-05-12T21:36:29.598Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "cost_list": {
                                    "_id": "5af75e5df231af00019fe0f0",
                                    "last_modified": "2018-05-12T21:36:29.594Z",
                                    "date_created": "2018-05-12T21:36:29.594Z",
                                    "grouped": [],
                                    "linear": [{
                                        "_id": "5af75e5df231af00019fe0ed",
                                        "last_modified": "2018-05-12T21:36:29.583Z",
                                        "date_created": "2018-05-12T21:36:29.583Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 78
                                            },
                                            "total_price": 1,
                                            "unit_price": 3,
                                            "value": 5
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "Quint",
                                        "item": "Blended Fertilizer"
                                    },
                                        {
                                            "_id": "5af75e5df231af00019fe0ee",
                                            "last_modified": "2018-05-12T21:36:29.588Z",
                                            "date_created": "2018-05-12T21:36:29.588Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Kg",
                                            "item": "Bio-Fertilizer"
                                        },
                                        {
                                            "_id": "5af75e5df231af00019fe0ef",
                                            "last_modified": "2018-05-12T21:36:29.591Z",
                                            "date_created": "2018-05-12T21:36:29.591Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Quint",
                                            "item": "Organic"
                                        }
                                    ]
                                },
                                "number": 2,
                                "sub_sections": [],
                                "title": "Fertilizers"
                            },
                            {
                                "_id": "5af75e5df231af00019fe0fd",
                                "last_modified": "2018-05-12T21:36:29.659Z",
                                "date_created": "2018-05-12T21:36:29.659Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "cost_list": {
                                    "_id": "5af75e5df231af00019fe0fc",
                                    "last_modified": "2018-05-12T21:36:29.650Z",
                                    "date_created": "2018-05-12T21:36:29.650Z",
                                    "grouped": [{
                                        "_id": "5af75e5df231af00019fe0f5",
                                        "last_modified": "2018-05-12T21:36:29.630Z",
                                        "date_created": "2018-05-12T21:36:29.630Z",
                                        "title": "Insecticide",
                                        "items": [{
                                            "_id": "5af75e5df231af00019fe0f2",
                                            "last_modified": "2018-05-12T21:36:29.620Z",
                                            "date_created": "2018-05-12T21:36:29.620Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Packet",
                                            "item": "Phostoxin"
                                        },
                                            {
                                                "_id": "5af75e5df231af00019fe0f3",
                                                "last_modified": "2018-05-12T21:36:29.624Z",
                                                "date_created": "2018-05-12T21:36:29.624Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "Ml",
                                                "item": "Karate 300ml"
                                            },
                                            {
                                                "_id": "5af75e5df231af00019fe0f4",
                                                "last_modified": "2018-05-12T21:36:29.628Z",
                                                "date_created": "2018-05-12T21:36:29.628Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "L",
                                                "item": "Malathion"
                                            }
                                        ]
                                    },
                                        {
                                            "_id": "5af75e5df231af00019fe0f9",
                                            "last_modified": "2018-05-12T21:36:29.642Z",
                                            "date_created": "2018-05-12T21:36:29.642Z",
                                            "title": "Fungicide",
                                            "items": [{
                                                "_id": "5af75e5df231af00019fe0f6",
                                                "last_modified": "2018-05-12T21:36:29.633Z",
                                                "date_created": "2018-05-12T21:36:29.633Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "Kg",
                                                "item": "Apron Star"
                                            },
                                                {
                                                    "_id": "5af75e5df231af00019fe0f7",
                                                    "last_modified": "2018-05-12T21:36:29.636Z",
                                                    "date_created": "2018-05-12T21:36:29.636Z",
                                                    "achieved": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "estimated": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "remark": "",
                                                    "unit": "L",
                                                    "item": "Endosulfan"
                                                },
                                                {
                                                    "_id": "5af75e5df231af00019fe0f8",
                                                    "last_modified": "2018-05-12T21:36:29.640Z",
                                                    "date_created": "2018-05-12T21:36:29.640Z",
                                                    "achieved": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "estimated": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "remark": "",
                                                    "unit": "Kg",
                                                    "item": "Ridomil gold"
                                                }
                                            ]
                                        },
                                        {
                                            "_id": "5af75e5df231af00019fe0fb",
                                            "last_modified": "2018-05-12T21:36:29.648Z",
                                            "date_created": "2018-05-12T21:36:29.648Z",
                                            "title": "Test Group",
                                            "items": [{
                                                "_id": "5af75e5df231af00019fe0fa",
                                                "last_modified": "2018-05-12T21:36:29.645Z",
                                                "date_created": "2018-05-12T21:36:29.645Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "ha",
                                                "item": "abc"
                                            }]
                                        }
                                    ],
                                    "linear": []
                                },
                                "number": 3,
                                "sub_sections": [],
                                "title": "Chemicals"
                            }
                        ],
                        "title": "Input"
                    },
                        {
                            "_id": "5af75e5df231af00019fe105",
                            "last_modified": "2018-05-12T21:36:29.715Z",
                            "date_created": "2018-05-12T21:36:29.715Z",
                            "cost_list": {
                                "_id": "5af75e5df231af00019fe104",
                                "last_modified": "2018-05-12T21:36:29.703Z",
                                "date_created": "2018-05-12T21:36:29.703Z",
                                "grouped": [{
                                    "_id": "5af75e5df231af00019fe100",
                                    "last_modified": "2018-05-12T21:36:29.692Z",
                                    "date_created": "2018-05-12T21:36:29.692Z",
                                    "title": "Land Prep",
                                    "items": [
                                        "5af75e5df231af00019fe0fe",
                                        "5af75e5df231af00019fe0ff"
                                    ]
                                },
                                    {
                                        "_id": "5af75e5df231af00019fe103",
                                        "last_modified": "2018-05-12T21:36:29.702Z",
                                        "date_created": "2018-05-12T21:36:29.702Z",
                                        "title": "Transportation",
                                        "items": [
                                            "5af75e5df231af00019fe101",
                                            "5af75e5df231af00019fe102"
                                        ]
                                    }
                                ],
                                "linear": []
                            },
                            "estimated_sub_total": 0,
                            "achieved_sub_total": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "number": 2,
                            "sub_sections": [],
                            "title": "Labour Cost"
                        },
                        {
                            "_id": "5af75e5df231af00019fe10a",
                            "last_modified": "2018-05-12T21:36:29.781Z",
                            "date_created": "2018-05-12T21:36:29.781Z",
                            "estimated_sub_total": 0,
                            "achieved_sub_total": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "cost_list": {
                                "_id": "5af75e5df231af00019fe109",
                                "last_modified": "2018-05-12T21:36:29.767Z",
                                "date_created": "2018-05-12T21:36:29.767Z",
                                "grouped": [],
                                "linear": [{
                                    "_id": "5af75e5df231af00019fe106",
                                    "last_modified": "2018-05-12T21:36:29.742Z",
                                    "date_created": "2018-05-12T21:36:29.742Z",
                                    "achieved": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "estimated": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "remark": "",
                                    "unit": "hectar",
                                    "item": "Land Rent"
                                },
                                    {
                                        "_id": "5af75e5df231af00019fe107",
                                        "last_modified": "2018-05-12T21:36:29.754Z",
                                        "date_created": "2018-05-12T21:36:29.754Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "person",
                                        "item": "Chemical sprayer"
                                    },
                                    {
                                        "_id": "5af75e5df231af00019fe108",
                                        "last_modified": "2018-05-12T21:36:29.758Z",
                                        "date_created": "2018-05-12T21:36:29.758Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "person",
                                        "item": "Field Guard"
                                    }
                                ]
                            },
                            "number": 3,
                            "sub_sections": [],
                            "title": "Other Costs"
                        }
                    ],
                    "title": "Inputs And Activity Costs"
                },
                    {
                        "_id": "5af75e5df231af00019fe10b",
                        "last_modified": "2018-05-12T21:36:29.830Z",
                        "date_created": "2018-05-12T21:36:29.807Z",
                        "estimated_min_revenue": 0,
                        "estimated_max_revenue": 0,
                        "estimated_probable_revenue": 0,
                        "achieved_revenue": 0,
                        "estimated_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "achieved_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "number": 2,
                        "sub_sections": [{
                            "_id": "5af75e5df231af00019fe10c",
                            "last_modified": "2018-05-12T21:36:29.810Z",
                            "date_created": "2018-05-12T21:36:29.810Z",
                            "estimated_sub_total": 0,
                            "achieved_sub_total": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "yield": {
                                "_id": "5af72235f231af00019fe096",
                                "last_modified": "2018-05-12T17:19:49.447Z",
                                "date_created": "2018-05-12T17:19:49.447Z",
                                "achieved": {
                                    "cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "total_price": 0,
                                    "unit_price": 0,
                                    "value": 0
                                },
                                "estimated": {
                                    "cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "total_price": 0,
                                    "unit_price": 0,
                                    "value": 0
                                },
                                "remark": "",
                                "unit": "",
                                "item": ""
                            },
                            "yield_consumption": {
                                "_id": "5af72235f231af00019fe095",
                                "last_modified": "2018-05-12T17:19:49.444Z",
                                "date_created": "2018-05-12T17:19:49.444Z",
                                "remark": "",
                                "achieved": {
                                    "market_details": [],
                                    "for_market": 0,
                                    "seed_reserve": 0,
                                    "own_consumption": 0
                                },
                                "estimated": {
                                    "market_details": [],
                                    "for_market": 0,
                                    "seed_reserve": 0,
                                    "own_consumption": 0
                                }
                            },
                            "number": 1,
                            "sub_sections": [],
                            "title": "Probable Yield"
                        },
                            {
                                "_id": "5af75e5df231af00019fe10d",
                                "last_modified": "2018-05-12T21:36:29.818Z",
                                "date_created": "2018-05-12T21:36:29.818Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "yield": {
                                    "_id": "5af72235f231af00019fe098",
                                    "last_modified": "2018-05-12T17:19:49.457Z",
                                    "date_created": "2018-05-12T17:19:49.457Z",
                                    "achieved": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "estimated": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "remark": "",
                                    "unit": "",
                                    "item": ""
                                },
                                "number": 2,
                                "sub_sections": [],
                                "title": "Maximum Yield"
                            },
                            {
                                "_id": "5af75e5df231af00019fe10e",
                                "last_modified": "2018-05-12T21:36:29.826Z",
                                "date_created": "2018-05-12T21:36:29.826Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "yield": {
                                    "_id": "5af72235f231af00019fe09a",
                                    "last_modified": "2018-05-12T17:19:49.466Z",
                                    "date_created": "2018-05-12T17:19:49.466Z",
                                    "achieved": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "estimated": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "remark": "",
                                    "unit": "",
                                    "item": ""
                                },
                                "number": 3,
                                "sub_sections": [],
                                "title": "Minimum Yield"
                            }
                        ],
                        "title": "Revenue"
                    }
                ],
                "layout": "TWO_COLUMNS",
                "purpose": "",
                "subtitle": "",
                "title": "Wheat-CAT"
            },
                {
                    "_id": "5af75e5df231af00019fe10f",
                    "last_modified": "2018-05-12T21:36:30.257Z",
                    "date_created": "2018-05-12T21:36:29.944Z",
                    "type": "ACAT",
                    "client": "5af744d54b505800017cccd7",
                    "crop": "5af7206cf231af00019fe040",
                    "created_by": "5a64633b8f51840001e16494",
                    "achieved": {
                        "net_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "net_income": 0,
                        "total_revenue": 0,
                        "total_cost": 0
                    },
                    "estimated": {
                        "net_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "net_income": 0,
                        "total_revenue": 0,
                        "total_cost": 0
                    },
                    "status": "new",
                    "gps_location": {
                        "polygon": [],
                        "single_point": {
                            "longtude": 0,
                            "latitude": 0
                        }
                    },
                    "first_expense_month": "None",
                    "non_financial_resources": [],
                    "access_to_non_financial_resources": false,
                    "cropping_area_size": "0x0",
                    "sections": [{
                        "_id": "5af75e5df231af00019fe110",
                        "last_modified": "2018-05-12T21:36:30.161Z",
                        "date_created": "2018-05-12T21:36:29.949Z",
                        "estimated_sub_total": 0,
                        "achieved_sub_total": 0,
                        "estimated_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "achieved_cash_flow": {
                            "dec": 0,
                            "nov": 0,
                            "oct": 0,
                            "sep": 0,
                            "aug": 0,
                            "july": 0,
                            "june": 0,
                            "may": 0,
                            "apr": 0,
                            "mar": 0,
                            "feb": 0,
                            "jan": 0
                        },
                        "number": 1,
                        "sub_sections": [{
                            "_id": "5af75e5df231af00019fe111",
                            "last_modified": "2018-05-12T21:36:30.047Z",
                            "date_created": "2018-05-12T21:36:29.952Z",
                            "estimated_sub_total": 0,
                            "achieved_sub_total": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "number": 1,
                            "sub_sections": [{
                                "_id": "5af75e5df231af00019fe114",
                                "last_modified": "2018-05-12T21:36:29.964Z",
                                "date_created": "2018-05-12T21:36:29.964Z",
                                "variety": "",
                                "seed_source": [
                                    "ESE",
                                    "Union",
                                    "Private"
                                ],
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "cost_list": {
                                    "_id": "5af75e5df231af00019fe113",
                                    "last_modified": "2018-05-12T21:36:29.960Z",
                                    "date_created": "2018-05-12T21:36:29.960Z",
                                    "grouped": [],
                                    "linear": [{
                                        "_id": "5af75e5df231af00019fe112",
                                        "last_modified": "2018-05-12T21:36:29.958Z",
                                        "date_created": "2018-05-12T21:36:29.958Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "Quint",
                                        "item": "Amount of seed required/Quart"
                                    }]
                                },
                                "number": 1,
                                "sub_sections": [],
                                "title": "Seed"
                            },
                                {
                                    "_id": "5af75e5df231af00019fe119",
                                    "last_modified": "2018-05-12T21:36:29.995Z",
                                    "date_created": "2018-05-12T21:36:29.995Z",
                                    "estimated_sub_total": 0,
                                    "achieved_sub_total": 0,
                                    "estimated_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "achieved_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "cost_list": {
                                        "_id": "5af75e5df231af00019fe118",
                                        "last_modified": "2018-05-12T21:36:29.991Z",
                                        "date_created": "2018-05-12T21:36:29.991Z",
                                        "grouped": [],
                                        "linear": [{
                                            "_id": "5af75e5df231af00019fe115",
                                            "last_modified": "2018-05-12T21:36:29.976Z",
                                            "date_created": "2018-05-12T21:36:29.976Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Quint",
                                            "item": "Blended Fertilizer"
                                        },
                                            {
                                                "_id": "5af75e5df231af00019fe116",
                                                "last_modified": "2018-05-12T21:36:29.982Z",
                                                "date_created": "2018-05-12T21:36:29.982Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "Kg",
                                                "item": "Bio-Fertilizer"
                                            },
                                            {
                                                "_id": "5af75e5df231af00019fe117",
                                                "last_modified": "2018-05-12T21:36:29.985Z",
                                                "date_created": "2018-05-12T21:36:29.985Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "Quint",
                                                "item": "Organic"
                                            }
                                        ]
                                    },
                                    "number": 2,
                                    "sub_sections": [],
                                    "title": "Fertilizers"
                                },
                                {
                                    "_id": "5af75e5ef231af00019fe123",
                                    "last_modified": "2018-05-12T21:36:30.039Z",
                                    "date_created": "2018-05-12T21:36:30.039Z",
                                    "estimated_sub_total": 0,
                                    "achieved_sub_total": 0,
                                    "estimated_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "achieved_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "cost_list": {
                                        "_id": "5af75e5ef231af00019fe122",
                                        "last_modified": "2018-05-12T21:36:30.034Z",
                                        "date_created": "2018-05-12T21:36:30.034Z",
                                        "grouped": [{
                                            "_id": "5af75e5ef231af00019fe11d",
                                            "last_modified": "2018-05-12T21:36:30.019Z",
                                            "date_created": "2018-05-12T21:36:30.019Z",
                                            "title": "Insecticide",
                                            "items": [{
                                                "_id": "5af75e5ef231af00019fe11a",
                                                "last_modified": "2018-05-12T21:36:30.010Z",
                                                "date_created": "2018-05-12T21:36:30.010Z",
                                                "achieved": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "estimated": {
                                                    "cash_flow": {
                                                        "dec": 0,
                                                        "nov": 0,
                                                        "oct": 0,
                                                        "sep": 0,
                                                        "aug": 0,
                                                        "july": 0,
                                                        "june": 0,
                                                        "may": 0,
                                                        "apr": 0,
                                                        "mar": 0,
                                                        "feb": 0,
                                                        "jan": 0
                                                    },
                                                    "total_price": 0,
                                                    "unit_price": 0,
                                                    "value": 0
                                                },
                                                "remark": "",
                                                "unit": "Packet",
                                                "item": "Phostoxin"
                                            },
                                                {
                                                    "_id": "5af75e5ef231af00019fe11b",
                                                    "last_modified": "2018-05-12T21:36:30.013Z",
                                                    "date_created": "2018-05-12T21:36:30.013Z",
                                                    "achieved": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "estimated": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "remark": "",
                                                    "unit": "ML",
                                                    "item": "karate 300ml"
                                                },
                                                {
                                                    "_id": "5af75e5ef231af00019fe11c",
                                                    "last_modified": "2018-05-12T21:36:30.016Z",
                                                    "date_created": "2018-05-12T21:36:30.016Z",
                                                    "achieved": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "estimated": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "remark": "",
                                                    "unit": "L",
                                                    "item": "Malathion"
                                                }
                                            ]
                                        },
                                            {
                                                "_id": "5af75e5ef231af00019fe121",
                                                "last_modified": "2018-05-12T21:36:30.032Z",
                                                "date_created": "2018-05-12T21:36:30.032Z",
                                                "title": "Fugicide",
                                                "items": [{
                                                    "_id": "5af75e5ef231af00019fe11e",
                                                    "last_modified": "2018-05-12T21:36:30.021Z",
                                                    "date_created": "2018-05-12T21:36:30.021Z",
                                                    "achieved": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "estimated": {
                                                        "cash_flow": {
                                                            "dec": 0,
                                                            "nov": 0,
                                                            "oct": 0,
                                                            "sep": 0,
                                                            "aug": 0,
                                                            "july": 0,
                                                            "june": 0,
                                                            "may": 0,
                                                            "apr": 0,
                                                            "mar": 0,
                                                            "feb": 0,
                                                            "jan": 0
                                                        },
                                                        "total_price": 0,
                                                        "unit_price": 0,
                                                        "value": 0
                                                    },
                                                    "remark": "",
                                                    "unit": "Kg",
                                                    "item": "Apron Star"
                                                },
                                                    {
                                                        "_id": "5af75e5ef231af00019fe11f",
                                                        "last_modified": "2018-05-12T21:36:30.025Z",
                                                        "date_created": "2018-05-12T21:36:30.025Z",
                                                        "achieved": {
                                                            "cash_flow": {
                                                                "dec": 0,
                                                                "nov": 0,
                                                                "oct": 0,
                                                                "sep": 0,
                                                                "aug": 0,
                                                                "july": 0,
                                                                "june": 0,
                                                                "may": 0,
                                                                "apr": 0,
                                                                "mar": 0,
                                                                "feb": 0,
                                                                "jan": 0
                                                            },
                                                            "total_price": 0,
                                                            "unit_price": 0,
                                                            "value": 0
                                                        },
                                                        "estimated": {
                                                            "cash_flow": {
                                                                "dec": 0,
                                                                "nov": 0,
                                                                "oct": 0,
                                                                "sep": 0,
                                                                "aug": 0,
                                                                "july": 0,
                                                                "june": 0,
                                                                "may": 0,
                                                                "apr": 0,
                                                                "mar": 0,
                                                                "feb": 0,
                                                                "jan": 0
                                                            },
                                                            "total_price": 0,
                                                            "unit_price": 0,
                                                            "value": 0
                                                        },
                                                        "remark": "",
                                                        "unit": "L",
                                                        "item": "Endosulfan"
                                                    },
                                                    {
                                                        "_id": "5af75e5ef231af00019fe120",
                                                        "last_modified": "2018-05-12T21:36:30.030Z",
                                                        "date_created": "2018-05-12T21:36:30.030Z",
                                                        "achieved": {
                                                            "cash_flow": {
                                                                "dec": 0,
                                                                "nov": 0,
                                                                "oct": 0,
                                                                "sep": 0,
                                                                "aug": 0,
                                                                "july": 0,
                                                                "june": 0,
                                                                "may": 0,
                                                                "apr": 0,
                                                                "mar": 0,
                                                                "feb": 0,
                                                                "jan": 0
                                                            },
                                                            "total_price": 0,
                                                            "unit_price": 0,
                                                            "value": 0
                                                        },
                                                        "estimated": {
                                                            "cash_flow": {
                                                                "dec": 0,
                                                                "nov": 0,
                                                                "oct": 0,
                                                                "sep": 0,
                                                                "aug": 0,
                                                                "july": 0,
                                                                "june": 0,
                                                                "may": 0,
                                                                "apr": 0,
                                                                "mar": 0,
                                                                "feb": 0,
                                                                "jan": 0
                                                            },
                                                            "total_price": 0,
                                                            "unit_price": 0,
                                                            "value": 0
                                                        },
                                                        "remark": "",
                                                        "unit": "Kg",
                                                        "item": "Ridomil gold"
                                                    }
                                                ]
                                            }
                                        ],
                                        "linear": []
                                    },
                                    "number": 3,
                                    "sub_sections": [],
                                    "title": "Chemicals"
                                }
                            ],
                            "title": "Input"
                        },
                            {
                                "_id": "5af75e5ef231af00019fe12c",
                                "last_modified": "2018-05-12T21:36:30.100Z",
                                "date_created": "2018-05-12T21:36:30.100Z",
                                "cost_list": {
                                    "_id": "5af75e5ef231af00019fe12b",
                                    "last_modified": "2018-05-12T21:36:30.095Z",
                                    "date_created": "2018-05-12T21:36:30.095Z",
                                    "grouped": [{
                                        "_id": "5af75e5ef231af00019fe127",
                                        "last_modified": "2018-05-12T21:36:30.077Z",
                                        "date_created": "2018-05-12T21:36:30.077Z",
                                        "title": "Land Prep",
                                        "items": [
                                            "5af75e5ef231af00019fe124",
                                            "5af75e5ef231af00019fe125",
                                            "5af75e5ef231af00019fe126"
                                        ]
                                    },
                                        {
                                            "_id": "5af75e5ef231af00019fe12a",
                                            "last_modified": "2018-05-12T21:36:30.090Z",
                                            "date_created": "2018-05-12T21:36:30.090Z",
                                            "title": "Transportation",
                                            "items": [
                                                "5af75e5ef231af00019fe128",
                                                "5af75e5ef231af00019fe129"
                                            ]
                                        }
                                    ],
                                    "linear": []
                                },
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "number": 2,
                                "sub_sections": [],
                                "title": "Labour Cost"
                            },
                            {
                                "_id": "5af75e5ef231af00019fe131",
                                "last_modified": "2018-05-12T21:36:30.150Z",
                                "date_created": "2018-05-12T21:36:30.150Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "cost_list": {
                                    "_id": "5af75e5ef231af00019fe130",
                                    "last_modified": "2018-05-12T21:36:30.140Z",
                                    "date_created": "2018-05-12T21:36:30.140Z",
                                    "grouped": [],
                                    "linear": [{
                                        "_id": "5af75e5ef231af00019fe12d",
                                        "last_modified": "2018-05-12T21:36:30.118Z",
                                        "date_created": "2018-05-12T21:36:30.118Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "Hectar",
                                        "item": "Land Rent"
                                    },
                                        {
                                            "_id": "5af75e5ef231af00019fe12e",
                                            "last_modified": "2018-05-12T21:36:30.130Z",
                                            "date_created": "2018-05-12T21:36:30.130Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Person",
                                            "item": "Chemical Sprayer"
                                        },
                                        {
                                            "_id": "5af75e5ef231af00019fe12f",
                                            "last_modified": "2018-05-12T21:36:30.138Z",
                                            "date_created": "2018-05-12T21:36:30.138Z",
                                            "achieved": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "estimated": {
                                                "cash_flow": {
                                                    "dec": 0,
                                                    "nov": 0,
                                                    "oct": 0,
                                                    "sep": 0,
                                                    "aug": 0,
                                                    "july": 0,
                                                    "june": 0,
                                                    "may": 0,
                                                    "apr": 0,
                                                    "mar": 0,
                                                    "feb": 0,
                                                    "jan": 0
                                                },
                                                "total_price": 0,
                                                "unit_price": 0,
                                                "value": 0
                                            },
                                            "remark": "",
                                            "unit": "Person",
                                            "item": "Field Guard"
                                        }
                                    ]
                                },
                                "number": 3,
                                "sub_sections": [],
                                "title": "Other Costs"
                            }
                        ],
                        "title": "Inputs And Activity Costs"
                    },
                        {
                            "_id": "5af75e5ef231af00019fe132",
                            "last_modified": "2018-05-12T21:36:30.254Z",
                            "date_created": "2018-05-12T21:36:30.182Z",
                            "estimated_min_revenue": 0,
                            "estimated_max_revenue": 0,
                            "estimated_probable_revenue": 0,
                            "achieved_revenue": 0,
                            "estimated_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "achieved_cash_flow": {
                                "dec": 0,
                                "nov": 0,
                                "oct": 0,
                                "sep": 0,
                                "aug": 0,
                                "july": 0,
                                "june": 0,
                                "may": 0,
                                "apr": 0,
                                "mar": 0,
                                "feb": 0,
                                "jan": 0
                            },
                            "number": 2,
                            "sub_sections": [{
                                "_id": "5af75e5ef231af00019fe133",
                                "last_modified": "2018-05-12T21:36:30.188Z",
                                "date_created": "2018-05-12T21:36:30.188Z",
                                "estimated_sub_total": 0,
                                "achieved_sub_total": 0,
                                "estimated_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "achieved_cash_flow": {
                                    "dec": 0,
                                    "nov": 0,
                                    "oct": 0,
                                    "sep": 0,
                                    "aug": 0,
                                    "july": 0,
                                    "june": 0,
                                    "may": 0,
                                    "apr": 0,
                                    "mar": 0,
                                    "feb": 0,
                                    "jan": 0
                                },
                                "yield": {
                                    "_id": "5af72093f231af00019fe050",
                                    "last_modified": "2018-05-12T17:12:51.213Z",
                                    "date_created": "2018-05-12T17:12:51.213Z",
                                    "achieved": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "estimated": {
                                        "cash_flow": {
                                            "dec": 0,
                                            "nov": 0,
                                            "oct": 0,
                                            "sep": 0,
                                            "aug": 0,
                                            "july": 0,
                                            "june": 0,
                                            "may": 0,
                                            "apr": 0,
                                            "mar": 0,
                                            "feb": 0,
                                            "jan": 0
                                        },
                                        "total_price": 0,
                                        "unit_price": 0,
                                        "value": 0
                                    },
                                    "remark": "",
                                    "unit": "",
                                    "item": ""
                                },
                                "yield_consumption": {
                                    "_id": "5af72093f231af00019fe04f",
                                    "last_modified": "2018-05-12T17:12:51.209Z",
                                    "date_created": "2018-05-12T17:12:51.209Z",
                                    "remark": "",
                                    "achieved": {
                                        "market_details": [],
                                        "for_market": 0,
                                        "seed_reserve": 0,
                                        "own_consumption": 0
                                    },
                                    "estimated": {
                                        "market_details": [],
                                        "for_market": 0,
                                        "seed_reserve": 0,
                                        "own_consumption": 0
                                    }
                                },
                                "number": 1,
                                "sub_sections": [],
                                "title": "Probable Yield"
                            },
                                {
                                    "_id": "5af75e5ef231af00019fe134",
                                    "last_modified": "2018-05-12T21:36:30.197Z",
                                    "date_created": "2018-05-12T21:36:30.197Z",
                                    "estimated_sub_total": 0,
                                    "achieved_sub_total": 0,
                                    "estimated_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "achieved_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "yield": {
                                        "_id": "5af72093f231af00019fe052",
                                        "last_modified": "2018-05-12T17:12:51.221Z",
                                        "date_created": "2018-05-12T17:12:51.221Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "",
                                        "item": ""
                                    },
                                    "number": 2,
                                    "sub_sections": [],
                                    "title": "Maximum Yield"
                                },
                                {
                                    "_id": "5af75e5ef231af00019fe135",
                                    "last_modified": "2018-05-12T21:36:30.248Z",
                                    "date_created": "2018-05-12T21:36:30.248Z",
                                    "estimated_sub_total": 0,
                                    "achieved_sub_total": 0,
                                    "estimated_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "achieved_cash_flow": {
                                        "dec": 0,
                                        "nov": 0,
                                        "oct": 0,
                                        "sep": 0,
                                        "aug": 0,
                                        "july": 0,
                                        "june": 0,
                                        "may": 0,
                                        "apr": 0,
                                        "mar": 0,
                                        "feb": 0,
                                        "jan": 0
                                    },
                                    "yield": {
                                        "_id": "5af72093f231af00019fe054",
                                        "last_modified": "2018-05-12T17:12:51.229Z",
                                        "date_created": "2018-05-12T17:12:51.229Z",
                                        "achieved": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "estimated": {
                                            "cash_flow": {
                                                "dec": 0,
                                                "nov": 0,
                                                "oct": 0,
                                                "sep": 0,
                                                "aug": 0,
                                                "july": 0,
                                                "june": 0,
                                                "may": 0,
                                                "apr": 0,
                                                "mar": 0,
                                                "feb": 0,
                                                "jan": 0
                                            },
                                            "total_price": 0,
                                            "unit_price": 0,
                                            "value": 0
                                        },
                                        "remark": "",
                                        "unit": "",
                                        "item": ""
                                    },
                                    "number": 3,
                                    "sub_sections": [],
                                    "title": "Minimum Yield"
                                }
                            ],
                            "title": "Revenue"
                        }
                    ],
                    "layout": "TWO_COLUMNS",
                    "purpose": "",
                    "subtitle": "",
                    "title": "Maize-CAT"
                }
            ],
            "loan_product": {
                "_id": "5af752caf231af00019fe0e2",
                "last_modified": "2018-05-12T20:47:06.166Z",
                "date_created": "2018-05-12T20:47:06.166Z",
                "created_by": "5a4a62677d996f0001525df9",
                "layout": "TWO_COLUMNS",
                "cost_of_loan": [{
                    "_id": "5af752caf231af00019fe0e3",
                    "item": "Registration Fee",
                    "percent": 0,
                    "fixed_amount": 200
                }],
                "deductibles": [{
                    "_id": "5af752caf231af00019fe0e5",
                    "item": "Compulsory Saving",
                    "percent": 5,
                    "fixed_amount": 0
                },
                    {
                        "_id": "5af752caf231af00019fe0e4",
                        "item": "Service Charge",
                        "percent": 0,
                        "fixed_amount": 100
                    }
                ],
                "maximum_loan_amount": 1000000,
                "currency": "ETB",
                "purpose": "",
                "name": "Sam Grant"
            }
        }];
        vm.acat = vm.acats[0].ACATs[0].sections[0];

        vm.selectedSubsection = vm.acat.sub_sections[0].sub_sections[1];

    }



})(window.angular);