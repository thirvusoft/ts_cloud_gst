// frappe.pages['tlog'].on_page_load = function(wrapper) {
// 	var page = frappe.ui.make_app_page({
// 		parent: wrapper,
// 		title: 'TLog',
// 		single_column: true
// 	});
// }
frappe.provide('ts_cloud_gst');

frappe.pages['tlog'].on_page_load = function(wrapper) {
	var page  = frappe.ui.make_app_page({
		parent: wrapper,
		title: __('TLog'),
		single_column: true
	});

	// frappe.require('ts_cloud_gst.bundle.js', function() {
	wrapper = new ts_cloud_gst.tlog(this.page);
		// window.cur_pos = wrapper.pos;
	// });
};

// frappe.pages['tlog'].refresh = function(wrapper) {
// 	if (document.scannerDetectionData) {
// 		onScan.detachFrom(document);
// 		wrapper.pos.wrapper.html("");
// 		wrapper.pos.check_opening_entry();
// 	}
// };
