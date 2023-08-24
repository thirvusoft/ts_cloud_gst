<template>
    <v-row>
        <v-card-actions style="margin-top: 30px; width:200vh">
            <v-data-table
                :headers="table_headers"
                :items="table_row"
                item-key="main_row_id"
                color="background"
                :items-per-page="itemsPerPage"
                >

                <template v-slot:item.customer_name="{ item }">

                    <v-autocomplete style="max-width: 50vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.customer_name"
                        :items="item.customer_data"
                        item-text="name"
                        item-value="name"
                        :disabled="submitted_record"
                        @change="update_project_data(item)"

                        >
                        <template v-slot:item="data">
                            <template>
                                <v-list-item-content>
                                    <v-list-item-subtitle
                                        class="button--text"
                                        v-html="`${data.item.name}`"
                                    ></v-list-item-subtitle>
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>
                            
                </template>

                <template v-slot:item.project="{ item }">

                    <v-autocomplete
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.project"
                        :items="item.project_data"
                        item-text="name"
                        item-value="name"
                        :disabled="submitted_record"
                        @change="update_project_name(item)"
                        >
                        <template v-slot:item="data">
                            <template>
                                <v-list-item-content>
                                    <v-list-item-subtitle
                                        class="button--text"
                                        v-html="`ID: ${data.item.name}`"
                                    ></v-list-item-subtitle>
                                    <v-list-item-subtitle
                                        class="button--text"
                                        v-html="`Name: ${data.item.project_name}`"
                                    ></v-list-item-subtitle>
                                    
                                </v-list-item-content>
                            </template>
                        </template>
                    </v-autocomplete>

                    <span>{{ item.project_name }}</span>
                            
                </template>

                <template v-slot:item.mon="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.mon"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>
                
                <template v-slot:item.tue="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.tue"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.wed="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.wed"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.thu="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.thu"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.fri="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.fri"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.sat="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.sat"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.sun="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.sun"
                        :disabled="submitted_record"
                        @change="add_row_value(item)"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.row_total="{ item }">

                    <span>{{ item.row_total }}</span>

                </template>

                <template v-slot:item.delete="{ item }">
                    <v-btn
                      icon
                      color="button"
                      @click.stop="remove_item_update_total_values(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                </template>
                
            </v-data-table>
            
        </v-card-actions>

        <v-card-actions style="margin-top: -26vh; margin-left: 1vh;">

            <v-btn style="margin-left: 0vh; color: #283593; font-weight: bold;" color=#BBDEFB @click="add_row">{{
                __('Add Row')
            }}</v-btn>

            </v-card-actions>

        <v-card-actions style="margin-top: -2vh; margin-left: 49vh; max-width: 125vh;">

            <v-data-table
                :headers="table_total_column_headers"
                :items="table_column_total"
                item-key="total_row_id"
                hide-default-footer
            >

                <template v-slot:item.column_total="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.column_total"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.mon="{ item }">

                    <v-text-field v-if="item.mon > 8"
                        style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        background-color="error"
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.mon"
                        >
                    </v-text-field>

                    <v-text-field v-if="item.mon < 8.1"
                        style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.mon"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.tue="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.tue"
                        >
                    </v-text-field>

                </template>

                <template v-slot:item.wed="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.wed"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.thu="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.thu"
                        >
                    </v-text-field>

                </template>

                <template v-slot:item.fri="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.fri"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.sat="{ item }">

                    <v-text-field style="max-width: 10vh"
                        flat solo
                        readonly
                        dense
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.sat"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.sun="{ item }">

                    <v-text-field style="max-width: 10vh"
                        dense
                        flat solo
                        readonly
                        hide-details
                        :disabled="submitted_record"
                        v-model="item.sun"
                        >
                    </v-text-field>
                    
                </template>
                    
                <template v-slot:item.row_total="{ item }">

                    <span>{{ item.row_total }}</span>

                </template>
                
            </v-data-table>
            
        </v-card-actions>

    </v-row>

</template>

<script>

import { evntBus } from '../../bus';

export default {

data() {

    return {

    itemsPerPage: 5,

    submitted_record: false,

    customer_data: [],

    table_row: [],
    table_column_total: [],

    table_total_column_headers: [],
    table_headers: [],

    total_row_id: 0,

    start_date_week: '',
    end_date_week: '',

    };

},

methods: {

    add_row_value(item) {

        item.row_total = 0

        if (item.mon){
            
            var value = ((item.mon).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.mon = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.mon)
        }

        if (item.tue){

            var value = ((item.tue).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.tue = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.tue)            
        }

        if (item.wed){

            var value = ((item.wed).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.wed = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.wed)
        }

        if (item.thu){

            var value = ((item.thu).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.thu = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.thu)
        }

        if (item.fri){

            var value = ((item.fri).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.fri = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.fri)  
        }

        if (item.sat){

            var value = ((item.sat).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.sat = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.sat)  
        }

        if (item.sun){

            var value = ((item.sun).split("."))
            
            if(value.length == 2){

                if (!["0", "5"].includes(value[1])){

                    evntBus.$emit("show_mesage", {
                        text: __("Entered Hour Format Is Wrong, So Automatically Resetted To 0."),
                        color: "warning",
                    });

                    item.sun = 0
                }

            }

            item.row_total = item.row_total + parseFloat(item.sun)
        }
        
        this.table_column_total[0].mon = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].mon += flt(item.mon);
        });

        this.table_column_total[0].tue = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].tue += flt(item.tue);
        });

        this.table_column_total[0].wed = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].wed += flt(item.wed);
        });

        this.table_column_total[0].thu = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].thu += flt(item.thu);
        });

        this.table_column_total[0].fri = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].fri += flt(item.fri);
        });

        this.table_column_total[0].sat = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].sat += flt(item.sat);
        });

        this.table_column_total[0].sun = 0

        this.table_row.forEach((item) => {
            this.table_column_total[0].sun += flt(item.sun);
        });

        this.table_column_total[0].row_total = flt(this.table_column_total[0].mon) + flt(this.table_column_total[0].tue) + flt(this.table_column_total[0].wed) + flt(this.table_column_total[0].thu) + flt(this.table_column_total[0].fri) + flt(this.table_column_total[0].sat) + flt(this.table_column_total[0].sun)

    },
    
    add_row() {

        if (!this.submitted_record){

            this.total_row_id = this.total_row_id + 1

            this.table_row.push({"main_row_id": this.total_row_id, "customer_data": this.customer_data, "row_total": 0})
        }

        else{

            evntBus.$emit("show_mesage", {
                text: __("Already Submitted, Not Able To Add Row..."),
                color: "error",
            });
        }
    },

    remove_item_update_total_values(item) {

        if(!this.submitted_record){

            if ( 1 < (this.table_row).length){

                const index = this.table_row.findIndex(
                    (el) => el.main_row_id == item.main_row_id
                );

                if (index >= 0) {
                    this.table_row.splice(index, 1);
                }

                this.add_row_value(item);
            }

            else{

                evntBus.$emit("show_mesage", {
                    text: __("Atleast One Row Needed."),
                    color: "error",
                });
            }
        }

        else{

            evntBus.$emit("show_mesage", {
                text: __("Already Submitted, Not Able To Remove It..."),
                color: "error",
            });
        }
 
    },

    get_customer_data() {
        var me = this;
        
        frappe.call({
            method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.get_customer",

            callback: function (r) {

                if(r.message){
                    
                    me.customer_data = r.message
                }

            }
        })
    },

    update_project_data(item){

        item.project_name = ""

        if (item.customer_name){

            var me = item;
            
            frappe.call({

                method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.get_project",
                args: {
                    customer: item.customer_name
                },
                async: false,

                callback: function (r) {

                    if(r.message){
                        me.project_data = r.message
                    }

                }
            })
        }

        else{

            item.project_data = []

        }

    },

    update_project_name(item) {

        item["project_name"] = ""

        for(var i = 0; i < (item.project_data).length; i++){

            if (item.project == item.project_data[i].name){

                item["project_name"] = item.project_data[i].project_name

                break
            }
        }


    },

    save_or_submit(){
        
        frappe.call({

            method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.save_or_submit",

            args: {
                start_date_week: this.start_date_week,
                end_date_week: this.end_date_week,
                data: this.table_row,
                type: this.type
            },

            callback: function (r) {

                if(r.message[0]){

                    evntBus.$emit("update_after_save_submit");

                    evntBus.$emit("show_mesage", {
                        text: r.message[1],
                        color: "success",
                    });

                }

                else{

                    evntBus.$emit("show_mesage", {
                        text: r.message[1],
                        color: "error",
                    });
                }

            }
        })

    },

},

mounted() {

    evntBus.$on("update_main_table_header", (table_headers) => {
      this.table_headers = table_headers;
    });

    evntBus.$on("update_total_table_header", (table_total_column_headers) => {
      this.table_total_column_headers = table_total_column_headers;
    });

    evntBus.$on("main_table_values", (table_row) => {
        this.table_row = table_row
        this.total_row_id = (this.table_row).length - 1
    });

    evntBus.$on("total_table_values", (table_column_total) => {
        this.table_column_total = table_column_total
    });

    evntBus.$on("save", (start_date_week, end_date_week) => {

        this.start_date_week = start_date_week
        this.end_date_week = end_date_week

        this.type = "Save"

        this.save_or_submit()
    });

    evntBus.$on("submit", (start_date_week, end_date_week) => {

        this.start_date_week = start_date_week
        this.end_date_week = end_date_week

        this.type = "Submit"

        this.save_or_submit()
    });

    evntBus.$on("submitted_record", (value) => {
        this.submitted_record = value
    });

},

created: function () {

    this.get_customer_data()
},

};
</script>

  