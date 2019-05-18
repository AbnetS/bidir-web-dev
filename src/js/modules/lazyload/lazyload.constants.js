(function () {
    'use strict';

    angular
        .module('app.lazyload')
        .constant('APP_REQUIRES', {
            // jQuery based and standalone scripts
            scripts: {
                'whirl': ['vendor/whirl/dist/whirl.css'],
                'ngmap': ['vendor/ngmap/build/scripts/ng-map.min.js'],
                'animo': ['vendor/animo.js/animo.js'],
                'fastclick': ['vendor/fastclick/lib/fastclick.js'],
                'modernizr': ['vendor/modernizr/modernizr.custom.js'],
                'animate': ['vendor/animate.css/animate.min.css'],
                'skycons': ['vendor/skycons/skycons.js'],
                'icons': ['vendor/fontawesome/css/font-awesome.min.css',
                    'vendor/simple-line-icons/css/simple-line-icons.css'],
                'weather-icons': ['vendor/weather-icons/css/weather-icons.min.css',
                    'vendor/weather-icons/css/weather-icons-wind.min.css'],
                'sparklines': ['vendor/sparkline/index.js'],
                'wysiwyg': ['vendor/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                    'vendor/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
                'slimscroll': ['vendor/slimScroll/jquery.slimscroll.min.js'],
                'screenfull': ['vendor/screenfull/dist/screenfull.js'],
                'vector-map': ['vendor/ika.jvectormap/jquery-jvectormap-1.2.2.min.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-1.2.2.css'],
                'vector-map-maps': ['vendor/ika.jvectormap/jquery-jvectormap-world-mill-en.js',
                    'vendor/ika.jvectormap/jquery-jvectormap-us-mill-en.js'],
                'loadGoogleMapsJS': ['vendor/load-google-maps/load-google-maps.js'],
                'flot-chart': ['vendor/flot/jquery.flot.js'],
                'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                    'vendor/flot/jquery.flot.resize.js',
                    'vendor/flot/jquery.flot.pie.js',
                    'vendor/flot/jquery.flot.time.js',
                    'vendor/flot/jquery.flot.categories.js',
                    'vendor/flot-spline/js/jquery.flot.spline.min.js'],
                'moment': ['vendor/moment/min/moment-with-locales.min.js',
                    'vendor/angular-moment/angular-moment.min.js'],
                'inputmask': ['vendor/jquery.inputmask/dist/jquery.inputmask.bundle.js'],
                'flatdoc': ['vendor/flatdoc/flatdoc.js'],
                'codemirror': ['vendor/codemirror/lib/codemirror.js',
                    'vendor/codemirror/lib/codemirror.css'],
                // modes for common web files
                'codemirror-modes-web': ['vendor/codemirror/mode/javascript/javascript.js',
                    'vendor/codemirror/mode/xml/xml.js',
                    'vendor/codemirror/mode/htmlmixed/htmlmixed.js',
                    'vendor/codemirror/mode/css/css.js'],
                'taginput': ['vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.css',
                    'vendor/bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'],
                'filestyle': ['vendor/bootstrap-filestyle/src/bootstrap-filestyle.js'],
                'morris': ['vendor/raphael/raphael.js',
                    'vendor/morris.js/morris.js',
                    'vendor/morris.js/morris.css'],
                'loaders.css': ['vendor/loaders.css/loaders.css'],
                'spinkit': ['vendor/spinkit/css/spinkit.css'],
                'underscore': ['vendor/underscore/underscore.js'],
                'selectize': ['vendor/selectize/dist/css/selectize.default.css']
            },
            // Angular based script (use the right module name)
            modules: [
                {
                    name: 'md.data.table',
                    files: ['vendor/angular-material-data-table/dist/md-data-table.min.css',
                        'vendor/angular-material-data-table/dist/md-data-table.min.js']
                },
                {
                    name: 'blockUI',
                    files: ["vendor/angular-block-ui/dist/angular-block-ui.css",
                        "vendor/angular-block-ui/dist/angular-block-ui.js"]
                },
                {
                    name: 'ngFileUpload',
                    files: ['vendor/ng-file-upload/ng-file-upload.min.js',
                        'vendor/ng-file-upload-shim/ng-file-upload-shim.min.js']
                },
                {
                    name: 'toaster', files: ['vendor/angularjs-toaster/toaster.min.js',
                                            'vendor/angularjs-toaster/toaster.min.css']
                },
                {
                    name: 'localytics.directives', files: ['vendor/chosen_v1.2.0/chosen.jquery.min.js',
                        'vendor/chosen_v1.2.0/chosen.min.css',
                        'vendor/angular-chosen-localytics/dist/angular-chosen.js'],
                    serie: true
                },
                {
                    name: 'ngDialog', files: ['vendor/ngDialog/js/ngDialog.min.js',
                        'vendor/ngDialog/css/ngDialog.min.css',
                        'vendor/ngDialog/css/ngDialog-theme-default.min.css']
                },
                {name: 'ngWig', files: ['vendor/ngWig/dist/ng-wig.min.js']},
                {
                    name: 'ngTable', files: ['vendor/ng-table/dist/ng-table.min.js',
                        'vendor/ng-table/dist/ng-table.min.css']
                },
                {name: 'ngTableExport', files: ['vendor/ng-table-export/ng-table-export.js']},
                {
                    name: 'angularBootstrapNavTree',
                    files: ['vendor/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                        'vendor/angular-bootstrap-nav-tree/dist/abn_tree.css']
                },
                {
                    name: 'xeditable', files: ['vendor/angular-xeditable/dist/js/xeditable.js',
                        'vendor/angular-xeditable/dist/css/xeditable.css']
                },
                {name: 'angularFileUpload', files: ['vendor/angular-file-upload/dist/angular-file-upload.js']},
                {
                    name: 'ngImgCrop', files: ['vendor/ng-img-crop/compile/unminified/ng-img-crop.js',
                        'vendor/ng-img-crop/compile/unminified/ng-img-crop.css']
                },
                {
                    name: 'ui.select', files: ['vendor/angular-ui-select/dist/select.js',
                        'vendor/angular-ui-select/dist/select.css']
                },
                {name: 'ui.codemirror', files: ['vendor/angular-ui-codemirror/ui-codemirror.js']},
                {
                    name: 'angular-carousel', files: ['vendor/angular-carousel/dist/angular-carousel.css',
                        'vendor/angular-carousel/dist/angular-carousel.js']
                },
                {name: 'infinite-scroll', files: ['vendor/ngInfiniteScroll/build/ng-infinite-scroll.js']},
                {
                    name: 'ui.bootstrap-slider', files: ['vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
                        'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css',
                        'vendor/angular-bootstrap-slider/slider.js'], serie: true
                },
                {
                    name: 'ui.grid', files: ['vendor/angular-ui-grid/ui-grid.min.css',
                        'vendor/angular-ui-grid/ui-grid.min.js']
                },
                {
                    name: 'summernote', files: ['vendor/bootstrap/js/modal.js',
                        'vendor/bootstrap/js/dropdown.js',
                        'vendor/bootstrap/js/tooltip.js',
                        'vendor/summernote/dist/summernote.css',
                        'vendor/summernote/dist/summernote.js',
                        'vendor/angular-summernote/dist/angular-summernote.js'
                    ], serie: true
                },
                {
                    name: 'angular-rickshaw', files: ['vendor/d3/d3.min.js',
                        'vendor/rickshaw/rickshaw.js',
                        'vendor/rickshaw/rickshaw.min.css',
                        'vendor/angular-rickshaw/rickshaw.js'], serie: true
                },
                {
                    name: 'angular-chartist', files: ['vendor/chartist/dist/chartist.min.css',
                        'vendor/chartist/dist/chartist.js',
                        'vendor/angular-chartist.js/dist/angular-chartist.js'], serie: true
                },
                {name: 'ui.map', files: ['vendor/angular-ui-map/ui-map.js']},
                {
                    name: 'datatables', files: ['vendor/datatables/media/css/jquery.dataTables.css',
                        'vendor/datatables/media/js/jquery.dataTables.js',
                        'vendor/datatables-buttons/js/dataTables.buttons.js',
                        //'vendor/datatables-buttons/css/buttons.bootstrap.css',
                        'vendor/datatables-buttons/js/buttons.bootstrap.js',
                        'vendor/datatables-buttons/js/buttons.colVis.js',
                        'vendor/datatables-buttons/js/buttons.flash.js',
                        'vendor/datatables-buttons/js/buttons.html5.js',
                        'vendor/datatables-buttons/js/buttons.print.js',
                        'vendor/angular-datatables/dist/angular-datatables.js',
                        'vendor/angular-datatables/dist/plugins/buttons/angular-datatables.buttons.js'],
                    serie: true
                },
                {
                    name: 'angular-jqcloud', files: ['vendor/jqcloud2/dist/jqcloud.css',
                        'vendor/jqcloud2/dist/jqcloud.js',
                        'vendor/angular-jqcloud/angular-jqcloud.js']
                },
                {
                    name: 'angularGrid', files: ['vendor/ag-grid/dist/styles/ag-grid.css',
                        'vendor/ag-grid/dist/ag-grid.js',
                        'vendor/ag-grid/dist/styles/theme-dark.css',
                        'vendor/ag-grid/dist/styles/theme-fresh.css']
                },
                {
                    name: 'ng-nestable', files: ['vendor/ng-nestable/src/angular-nestable.js',
                        'vendor/nestable/jquery.nestable.js']
                },
                {name: 'akoenig.deckgrid', files: ['vendor/angular-deckgrid/angular-deckgrid.js']},
                {
                    name: 'oitozero.ngSweetAlert', files: ['vendor/sweetalert/dist/sweetalert.css',
                        'vendor/sweetalert/dist/sweetalert.min.js',
                        'vendor/angular-sweetalert/SweetAlert.js'], serie: true
                },
                {
                    name: 'bm.bsTour', files: ['vendor/bootstrap-tour/build/css/bootstrap-tour.css',
                        'vendor/bootstrap-tour/build/js/bootstrap-tour-standalone.js',
                        'vendor/angular-bootstrap-tour/dist/angular-bootstrap-tour.js'], serie: true
                },
                {
                    name: 'ui.knob', files: ['vendor/angular-knob/src/angular-knob.js',
                        'vendor/jquery-knob/dist/jquery.knob.min.js']
                },
                {name: 'easypiechart', files: ['vendor/jquery.easy-pie-chart/dist/angular.easypiechart.min.js']},
                {
                    name: 'colorpicker.module', files: ['vendor/angular-bootstrap-colorpicker/css/colorpicker.css',
                        'vendor/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js']
                },
                {
                    name: 'ui.sortable', files: ['vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/angular-ui-sortable/sortable.js'], serie: true
                },
                {
                    name: 'ui.calendar', files: ['vendor/jquery-ui/jquery-ui.min.js',
                        'vendor/jqueryui-touch-punch/jquery.ui.touch-punch.min.js',
                        'vendor/fullcalendar/dist/fullcalendar.min.js',
                        'vendor/fullcalendar/dist/gcal.js',
                        'vendor/fullcalendar/dist/fullcalendar.css',
                        'vendor/angular-ui-calendar/src/calendar.js'], serie: true
                },
                {
                    name: 'chart.js', files: ['vendor/chart.js/dist/Chart.min.js',
                        'vendor/angular-chart.js/dist/angular-chart.min.js'], serie: true
                },
                {
                    name: 'ui-leaflet', files: ['vendor/leaflet/dist/leaflet.js',
                        'vendor/angular-simple-logger/dist/angular-simple-logger.js',
                        'vendor/ui-leaflet/dist/ui-leaflet.js',
                        'vendor/leaflet/dist/leaflet.css'], serie: true
                }
            ]
        })
    ;

})();