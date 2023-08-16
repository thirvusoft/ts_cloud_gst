<template>
    <v-row>
        <v-card-actions style="margin-top: 30px;">
            <v-data-table
                :headers="table_headers"
                :items="table_row"
                class="elevation-1"
                item-key="posa_row_id"
                >

                <template v-slot:item.customer_name="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="primary"
                        background-color="white"
                        hide-details
                        :value="item.customer_name"
                        >
                    </v-text-field>
                            
                </template>

                <template v-slot:item.project="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="primary"
                        background-color="white"
                        hide-details
                        :value="item.project"
                        >
                    </v-text-field>
                            
                </template>

                <template v-slot:item.qty="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="primary"
                        background-color="white"
                        hide-details
                        :value="item.qty"
                        >
                    </v-text-field>
                        
                </template>

                <template v-slot:item.row_total="{ item }">

                    <v-text-field
                        dense
                        outlined
                        color="primary"
                        background-color="white"
                        hide-details
                        :value="item.row_total"
                        >
                    </v-text-field>
                    
                </template>
                
            </v-data-table>
            
        </v-card-actions>

        <v-card-actions>

            <v-btn style="margin-left: 0vh;" color="success" dark @click="add_row">{{
                __('Add Row')
            }}</v-btn>
            
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
        ],

        table_headers: [
            {
                text: __("Customer"),
                align: "start",
                sortable: true,
                value: "customer_name",
            },

            {
                text: __("Project"),
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
                value: "row_total",
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

  