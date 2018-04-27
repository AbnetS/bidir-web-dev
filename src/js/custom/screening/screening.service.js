/**
 * Created by Yoni on 3/30/2018.
 */

(function(angular) {
    'use strict';
    angular.module('app.screening')

    .service('ScreeningService', ScreeningService);

    ScreeningService.$inject = ['$http', 'CommonService'];

    function ScreeningService($http, CommonService) {
        return {
            GetScreenings: _getScreenings,
            GetStaticClientInfo: _getStaticClientInfo,
            GetClientScreening:_getClientScreening
        };

        function _getScreenings() {
            // return $http.get(CommonService.buildPaginatedUrl(API.Service.SCREENING,API.Methods.SCREENING.Screening) + '?source=web');
            return $http.get(CommonService.buildUrl(API.Service.SCREENING,API.Methods.SCREENING.Screening) + 'paginate?source=web');
        }

        function _getStaticClientInfo() {
            return {
                "_id": "5ad880fba11a250001e480b7",
                "last_modified": "2018-04-19T11:43:55.803Z",
                "date_created": "2018-04-19T11:43:55.803Z",
                "client": {
                    "_id": "5acfb1d581862f000115b97c",
                    "last_modified": "2018-04-19T11:43:55.816Z",
                    "date_created": "2018-04-12T19:21:57.639Z",
                    "branch": "5a632fd37ccc72000172fe80",
                    "created_by": "5a4a62677d996f0001525df9",
                    "status": "loan_application_new",
                    "household_members_count": "5",
                    "phone": "01014974009",
                    "email": "",
                    "geolocation": {
                        "longitude": 0,
                        "latitude": 0
                    },
                    "spouse": {
                        "national_id_no": "",
                        "grandfather_name": "",
                        "last_name": "",
                        "first_name": ""
                    },
                    "house_no": "34",
                    "kebele": "Kebele",
                    "woreda": "Woreda",
                    "civil_status": "single",
                    "date_of_birth": "1980-11-05T00:00:00.000Z",
                    "national_id_card": "",
                    "national_id_no": "0016793019",
                    "grandfather_name": "Smith Mutai",
                    "last_name": "Tony",
                    "first_name": "Mutai",
                    "gender": "Male",
                    "picture": ""
                },
                "created_by": "5a4a62677d996f0001525df9",
                "branch": "5a632fd37ccc72000172fe80",
                "comment": "",
                "status": "new",
                "questions": [],
                "disclaimer": "",
                "signatures": [
                    "Filled By",
                    "Checked By"
                ],
                "sections": [{
                        "_id": "5ad880fba11a250001e480b5",
                        "last_modified": "2018-04-19T11:43:55.785Z",
                        "date_created": "2018-04-19T11:43:55.785Z",
                        "questions": [{
                                "_id": "5ac87cdbc0b33b0001d2f1b9",
                                "question_text": "Agriculture:",
                                "prerequisites": [],
                                "show": true,
                                "values": [],
                                "sub_questions": [{
                                        "_id": "5ac87cdcc0b33b0001d2f1ba",
                                        "question_text": "Which crops?",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 0
                                    },
                                    {
                                        "_id": "5ac87cdcc0b33b0001d2f1bb",
                                        "question_text": "Which agriculture crops?",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 0
                                    }
                                ],
                                "options": [],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "GROUPED",
                                "remark": "",
                                "number": 0
                            },
                            {
                                "_id": "5ac87cf3c0b33b0001d2f1bd",
                                "question_text": "Livestock: Which animals?",
                                "prerequisites": [],
                                "show": true,
                                "values": [],
                                "sub_questions": [],
                                "options": [],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "FILL_IN_BLANK",
                                "remark": "",
                                "number": 1
                            },
                            {
                                "_id": "5ac87d1ac0b33b0001d2f1bf",
                                "question_text": "Other Income:",
                                "prerequisites": [],
                                "show": true,
                                "values": [],
                                "sub_questions": [{
                                        "_id": "5ac87d1bc0b33b0001d2f1c0",
                                        "question_text": "Regular:",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": "ETB",
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 0
                                    },
                                    {
                                        "_id": "5ac87d61c0b33b0001d2f1c5",
                                        "question_text": "Individual responsible for this income:",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 1
                                    },
                                    {
                                        "_id": "5ac87d61c0b33b0001d2f1c6",
                                        "question_text": "Irregular",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": "ETB",
                                        "validation_factor": "NUMERIC",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 2
                                    },
                                    {
                                        "_id": "5ac87d61c0b33b0001d2f1c7",
                                        "question_text": "Individual for the irregular income:",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 3
                                    }
                                ],
                                "options": [],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "GROUPED",
                                "remark": "",
                                "number": 2
                            }
                        ],
                        "number": 1,
                        "title": "Economic Activities"
                    },
                    {
                        "_id": "5ad880fba11a250001e480b6",
                        "last_modified": "2018-04-19T11:43:55.796Z",
                        "date_created": "2018-04-19T11:43:55.796Z",
                        "questions": [{
                                "_id": "5ac87e03c0b33b0001d2f1dc",
                                "question_text": "Borrowed in the past:",
                                "prerequisites": [],
                                "show": true,
                                "values": [],
                                "sub_questions": [],
                                "options": [
                                    "Yes",
                                    "No"
                                ],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "YES_NO",
                                "remark": "",
                                "number": 1
                            },
                            {
                                "_id": "5ac87e8ec0b33b0001d2f1de",
                                "question_text": "If borrowed in the past:",
                                "prerequisites": [{
                                    "answer": "Yes",
                                    "question": "5ac87e03c0b33b0001d2f1dc",
                                    "_id": "5ac87ea1c0b33b0001d2f1e4"
                                }],
                                "show": false,
                                "values": [],
                                "sub_questions": [{
                                        "_id": "5ac87e8ec0b33b0001d2f1df",
                                        "question_text": "Where",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 0
                                    },
                                    {
                                        "_id": "5ac87e90c0b33b0001d2f1e0",
                                        "question_text": "Amount of last loan",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": "ETB",
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 1
                                    },
                                    {
                                        "_id": "5ac87e90c0b33b0001d2f1e1",
                                        "question_text": "Monthly Repayment:",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": "ETB",
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 2
                                    },
                                    {
                                        "_id": "5ac87e90c0b33b0001d2f1e2",
                                        "question_text": "Number of loans in the past:",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NUMERIC",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 3
                                    }
                                ],
                                "options": [],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "GROUPED",
                                "remark": "",
                                "number": 2
                            },
                            {
                                "_id": "5ac87e8ec0b33b0001d2e1de",
                                "question_text": "If xxxx in the past:",
                                "prerequisites": [{
                                    "answer": "Yes",
                                    "question": "5ac87e03c0b33b0001d2f1dc",
                                    "_id": "5ac87ea1c0b33b0001d2f1e4"
                                }],
                                "show": false,
                                "values": [],
                                "sub_questions": [{
                                        "_id": "5ac87e8ec0b33b0001d2f1df",
                                        "question_text": "Where",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": null,
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 0
                                    },
                                    {
                                        "_id": "5ac87e90c0b33b0001d2f1e0",
                                        "question_text": "Amount of last loan",
                                        "prerequisites": [],
                                        "show": true,
                                        "values": [],
                                        "sub_questions": [],
                                        "options": [],
                                        "measurement_unit": "ETB",
                                        "validation_factor": "NONE",
                                        "required": false,
                                        "type": "FILL_IN_BLANK",
                                        "remark": "",
                                        "number": 1
                                    }
                                ],
                                "options": [],
                                "measurement_unit": null,
                                "validation_factor": "NONE",
                                "required": false,
                                "type": "GROUPED",
                                "remark": "",
                                "number": 2
                            }
                        ],
                        "number": 1,
                        "title": "Previous and Current Loans"
                    }
                ],
                "has_sections": true,
                "layout": "TWO_COLUMNS",
                "purpose": "Loan Application For Mutai Tony",
                "subtitle": "sub title.",
                "title": "Loan Form"
            };
        }

        function _getClientScreening(clientId) {
            return $http.get(CommonService.buildUrlWithParam(API.Service.SCREENING,API.Methods.SCREENING.Clients,clientId) + '/screenings');
        }
    }


})(window.angular);