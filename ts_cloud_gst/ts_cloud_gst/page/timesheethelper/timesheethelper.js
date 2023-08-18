frappe.provide('ts_cloud_gst');

frappe.pages['timesheethelper'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Timesheet Helper',
		single_column: true
	});

	this.page.$ts_cloud_gst = new ts_cloud_gst.timesheethelper(this.page);

	$('div.navbar-fixed-top').find('.container').css('padding', '0');

	$("head").append("<link href='/assets/ts_cloud_gst/node_modules/vuetify/dist/vuetify.min.css' rel='stylesheet'>");
	$("head").append("<link rel='stylesheet' href='https://cdn.jsdelivr.net/npm/@mdi/font@6.x/css/materialdesignicons.min.css'>");
	$("head").append("<link rel='stylesheet' href='https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900' />");
}