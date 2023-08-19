<template>
    <v-row>
        <v-card-actions style="margin-top: 30px;">
            <v-data-table
                :headers="table_headers"
                :items="table_row"
                item-key="posa_row_id"
                color="background"
                >

                <template v-slot:item.customer_name="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.customer_name"
                        >
                    </v-text-field>
                            
                </template>

                <template v-slot:item.project="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.project"
                        >
                    </v-text-field>
                            
                </template>

                <template v-slot:item.qty="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        :value="item.qty"
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
                      color=#90CAF9
                      @click.stop="remove_item(item)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>

                </template>
                
            </v-data-table>
            
        </v-card-actions>

        <v-card-actions style="margin-top: -12vh; margin-left: 3vh;">

            <v-btn style="margin-left: 0vh; color: #283593; font-weight: bold;" color=#BBDEFB @click="add_row">{{
                __('Add Row')
            }}</v-btn>

            </v-card-actions>

        <v-card-actions style="margin-top: -2vh; margin-left: 1vh; max-width: 170vh;">
            <v-data-table
                :headers="table_total_column_headers"
                :items="table_column_total"
                item-key="posa_row_id"
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

                <template v-slot:item.qty="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="table_field_box"
                        hide-details
                        readonly
                        :value="item.qty"
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
  
  export default {

    data() {

      return {

        table_row: [
            {"customer_name":"Gokul", "project": "Colud GST", "qty": "5", "row_total": "35"},
            {"customer_name":"Mohan", "project": "School", "qty": "20", "row_total": "140"},
            {"customer_name":"Rahul", "project": "School", "qty": "1", "row_total": "7"},
            {"customer_name":"Nirmal", "project": "School", "qty": "2", "row_total": "14"},
            {"customer_name":"Siva", "project": "School", "qty": "3", "row_total": "21"},
            // {"project": "Total", "qty": "31", "row_total": "217"},
        ],

        table_column_total: [
            {"column_total": "Total", "qty": "31", "row_total": "217"}
        ],

        table_total_column_headers: [
            {
                sortable: false,
                value: "column_total",
                align: "center"
            },
            {
                text: __("Mon (01/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Tue (02/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Wed (03/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Thu (04/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Fri (05/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Sat (06/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Sun (07/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Total"),
                sortable: false,
                value: "row_total",
                align: "center"
            },
        ],

        table_headers: [
            {
                text: __("Customer"),
                align: "center",
                sortable: false,
                value: "customer_name",
            },

            {
                text: __("Project"),
                sortable: false,
                value: "project",
                align: "center"
            },

            {
                text: __("Mon (01/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Tue (02/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Wed (03/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Thu (04/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Fri (05/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Sat (06/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Sun (07/01)"),
                value: "qty",
                align: "center"
            },

            {
                text: __("Total"),
                sortable: false,
                value: "row_total",
                align: "center"
            },

            {
                text: __("Remove"),
                sortable: false,
                value: "delete",
                align: "center"
            },

        ]

      };

    },

    methods: {
        add_row() {
            this.table_row.push({})
        }
    },

    created: function () {

    },

  };
  </script>

  