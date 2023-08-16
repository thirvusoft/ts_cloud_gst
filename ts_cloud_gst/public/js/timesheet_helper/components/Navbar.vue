<template>
    <nav>
        <v-app-bar app height="40" class="elevation-2">

            <v-toolbar-title
            @click="go_desk"
            style="cursor: pointer"
            class="text-uppercase primary--text"
            >

            <span class="font-weight-light">Timesheet Helper</span>
            
            </v-toolbar-title>
    
            <v-spacer></v-spacer>

            <v-btn style="cursor: unset" text color="primary" @click="logOut">
                <span right>{{ "Logout" }}</span>
            </v-btn>

        </v-app-bar>

        <v-bottom-navigation style="max-height: 7vh; height: 7vh; margin-top: 13px;" >
            
            <v-autocomplete style="margin-left: 2vh; max-width: 30vh" 
                :items="month_list"
                v-model="current_month"
                outlined
                dense
                :label="frappe._('Select Month')"
            ></v-autocomplete>

            <v-autocomplete style="margin-left: 3vh; max-width: 30vh" 
                :items="year_list"
                v-model="current_year"
                outlined
                dense
                :label="frappe._('Select Year')"
            ></v-autocomplete>

            <v-btn color="week" style="margin-left: 5vh; max-height: 7vh; cursor: unset">
                <span right>{{"<"}}</span>
            </v-btn>

            <span style="margin-top: 12px; margin-left: 2vh;">Week</span>

            <v-btn test color="week" style="margin-left: 2vh; max-height: 7vh; cursor: unset">
                <span right>{{">"}}</span>
            </v-btn>
            
            <v-btn color="reset" style="margin-left: 60vh; max-height: 7vh; cursor: unset">
                <span right>{{"Reset"}}</span>
            </v-btn>

            <v-btn color="save" style="margin-left: 3vh; max-height: 7vh; cursor: unset">
                <span right>{{ "Save" }}</span>
            </v-btn>

        </v-bottom-navigation>
        
    </nav>
    
  </template>
  
  <script>
//   import { evntBus } from '../bus';
  
  export default {
    // components: {MyPopup},
    data() {

      return {

        month_list: [],
        year_list: [],
        current_year: '',
        current_month: '',

        pos_profile: '',
      };

    },

    methods: {
        
        get_year(){
            var me = this;

            frappe.call({
                method: "ts_cloud_gst.ts_cloud_gst.custom.timesheethelper.year_month_finding_and_list",

                callback: function (r) {

                    if(r.message){
                        
                        me.month_list = r.message[1]
                        me.year_list = r.message[0]
                        me.current_year = r.message[2]
                        me.current_month = r.message[3]
                    }

                }
            })
        },

        go_desk() {
            frappe.set_route('/');
            location.reload();
        },
        
        logOut() {
            var me = this;
            me.logged_out = true;

            return frappe.call({
            method: 'logout',
            
            callback: function (r) {
                if (r.exc) {
                return;
                }

                frappe.set_route('/login');
                location.reload();
            },
            });
      },
      
    },

    created: function () {

        this.get_year()

        this.$nextTick(function () {
            evntBus.$on('show_mesage', (data) => {
            this.show_mesage(data);
            });
            evntBus.$on('set_company', (data) => {
            this.company = data.name;
            this.company_img = data.company_logo
                ? data.company_logo
                : this.company_img;
            });

            
        });
    },
  };
  </script>

  