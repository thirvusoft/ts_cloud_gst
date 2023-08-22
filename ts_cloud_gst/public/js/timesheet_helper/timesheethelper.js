import Home from './Home.vue';

frappe.provide('ts_cloud_gst');

ts_cloud_gst.timesheethelper = class {
    constructor({ parent }) {
        this.$parent = $(document);
        this.page = parent.page;
        this.make_body();

    }
    make_body () {
        this.$el = this.$parent.find('.main-section');
        this.vue = new Vue({
            vuetify: new Vuetify(
                {
                    rtl: frappe.utils.is_rtl(),
                    theme: {
                        themes: {
                            light: {
                                background: '#E3F2FD',
                                button: '#283593',
                                navigation_field: '#BBDEFB',
                                date_select: '#1565C0',
                                text: '#1565C0',
                                table_field_box: '#82B1FF',
                                error: '#EF5350',
                                success: '#9CCC65',
                                warning: '#FFAB40'
                            },
                        },
                    },
                }
            ),
            el: this.$el[0],
            data: {
            },
            render: h => h(Home),
        });
    }
    setup_header () {

    }
}
