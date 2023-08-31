frappe.provide('ts_cloud_gst');
ts_cloud_gst.tlog = class{
    constructor({ wrapper, parent }) {
        this.wrapper = wrapper
        this.parent = parent
        // console.log(parent)
        // this.$parent = $(document);
        // this.page = parent.page;
        // this.make_body();
        this.setup_header(parent)
    }

    make_body () {
        this.pa.append(
			`<html><button type="button" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" style="max-width: 30vh; max-height: 4vh; margin-top: 1.5vh;" tonal="" role="button" aria-haspopup="true" aria-expanded="false"><span class="v-btn__content"><span right="" style="color: rgb(40, 53, 147); font-weight: bold;"><</span></span></button></html>`
		)
        this.wrapper.append(
			`<html><button type="button"  style="padding-top: -100vh; max-width: 30vh; max-height: 1vh; margin-top: 1.5vh;" tonal="" role="button" aria-haspopup="true" aria-expanded="false"><span class="v-btn__content"><span right="" style="color: rgb(40, 53, 147); font-weight: bold;"><</span></span></button></html>`
		)
    }
    setup_header (parent) {
        parent.date_field = parent.page.add_field({
            fieldname: 'date',
            label: __('Select Date'),
            fieldtype:'Date',
        }); 
        parent.append(
			`<html><button type="button" style="padding-top: -100vh; max-width: 30vh; max-height: 4vh; margin-top: 1.5vh;"><</button></html>`
		)
        // parent.date_field = parent.page.add_field({
        //     fieldname: 'previous_week',
        //     label: __('<'),
        //     fieldtype:'HTML',
        //     options:`<html><button type="button" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" style="max-width: 30vh; max-height: 4vh; margin-top: 1.5vh;" tonal="" role="button" aria-haspopup="true" aria-expanded="false"><span class="v-btn__content"><span right="" style="color: rgb(40, 53, 147); font-weight: bold;"><</span></span></button></html>`
        // });
        // parent.date_field = parent.page.add_field({
        //     fieldname: 'next_week',
        //     label: __('>'),
        //     fieldtype:'HTML',
        //     options:`<html><button type="button" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" style="max-width: 30vh; max-height: 4vh; margin-top: 1.5vh;" tonal="" role="button" aria-haspopup="true" aria-expanded="false"><span class="v-btn__content"><span right="" style="color: rgb(40, 53, 147); font-weight: bold;">></span></span></button></html>`
        // });
    }
}
