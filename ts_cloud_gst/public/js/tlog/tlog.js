frappe.provide('ts_cloud_gst');
ts_cloud_gst.tlog = class{
    constructor({ parent }) {
        // console.log(parent)
        // this.$parent = $(document);
        // this.page = parent.page;
        this.make_body();
        this.setup_header(parent)
    }

    make_body () {
        console.log('---')
    }
    setup_header (parent) {
        parent.date_field = parent.page.add_field({
            fieldname: 'date',
            label: __('Select Date'),
            fieldtype:'Date',
        }); 
        parent.date_field = parent.page.add_field({
            fieldname: 'left_arrow',
            label: __('<'),
            fieldtype:'HTML',
            options:`<html><button type="button" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" style="max-width: 30vh; max-height: 4vh; margin-top: 1.5vh;" tonal="" role="button" aria-haspopup="true" aria-expanded="false"><span class="v-btn__content"><span right="" style="color: rgb(40, 53, 147); font-weight: bold;">Select Date</span></span></button></html>`
        }); 
    }
}
