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

                    <v-autocomplete
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        v-model="item.customer_name"
                        :items="item.customer_data"
                        item-text="name"
                        item-value="name"
                        @change="update_project_data(item)"
                        >
                        <template v-slot:item="data">
                            <template>
                                <v-list-item-content>
                                    <v-list-item-subtitle
                                        class="button--text"
                                        v-html="`ID: ${data.item.name}`"
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
                        item-text="project_name"
                        item-value="name"
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
                            
                </template>

                <template v-slot:item.mon="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.mon"
                        >
                    </v-text-field>
                        
                </template>
                
                <template v-slot:item.tue="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.tue"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.wed="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.wed"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.thu="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.thu"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.fri="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.fri"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.sat="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.sat"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.sun="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.sun"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.row_total="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        readonly
                        :value="item.row_total"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.delete="{ item }">
                    <v-btn
                      icon
                      color="button"
                      @click.stop="remove_item(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                </template>
                
            </v-data-table>
            
        </v-card-actions>

        <v-card-actions style="margin-top: -26vh; margin-left: 3vh;">

            <v-btn style="margin-left: 0vh; color: #283593; font-weight: bold;" color=#BBDEFB @click="add_row">{{
                __('Add Row')
            }}</v-btn>

            </v-card-actions>

        <v-card-actions style="margin-top: -2vh; margin-left: 5vh; max-width: 165vh;">

            <v-data-table
                :headers="table_total_column_headers"
                :items="table_column_total"
                item-key="total_row_id"
                hide-default-footer
            >

                <template v-slot:item.column_total="{ item }">
                    
                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        readonly
                        :value="item.column_total"
                        >
                    </v-text-field>

                </template>

                <template v-slot:item.mon="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.mon"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.tue="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.tue"
                        >
                    </v-text-field>

                </template>

                <template v-slot:item.wed="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.wed"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.thu="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.thu"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.fri="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.fri"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.sat="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.sat"
                        >
                    </v-text-field>
                    
                </template>

                <template v-slot:item.sun="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.sun"
                        >
                    </v-text-field>
                    
                </template>
                    
                <template v-slot:item.row_total="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        readonly
                        :value="item.row_total"
                        >
                    </v-text-field>

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

    customer_data: [],

    table_row: [],
    table_column_total: [],

    table_total_column_headers: [],
    table_headers: [],

    total_row_id: 0

    };

},

methods: {
    
    add_row() {

        this.total_row_id = this.total_row_id + 1

        this.table_row.push({"main_row_id": this.total_row_id, "customer_data": this.customer_data, "row_total": 0})

    },

    remove_item(item) {

        const index = this.table_row.findIndex(
            (el) => el.main_row_id == item.main_row_id
        );

        if (index >= 0) {
            this.table_row.splice(index, 1);
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
    });

    evntBus.$on("total_table_values", (table_column_total) => {
        this.table_column_total = table_column_total
    });
},

created: function () {

    this.get_customer_data()
},

};
</script>

  