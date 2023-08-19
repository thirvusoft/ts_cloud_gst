<template>
    <nav>
        <v-app-bar app height="40" class="elevation-2" color="background">

            <v-toolbar-title>

                <span style="color: #1565C0; font-size: 4vh">TSheets</span>
            
            </v-toolbar-title>
    
            <v-spacer></v-spacer>

            <!-- <v-btn style="cursor: unset" text color="button" @click="go_desk">
                <span right>{{ "Go To Home" }}</span>
            </v-btn>

            <v-btn style="cursor: unset" text color="button" @click="logOut">
                <span right>{{ "Logout" }}</span>
            </v-btn> -->

        </v-app-bar>

        <v-bottom-navigation background-color="background" color = "button" style="max-height: 7vh; height: 7vh; margin-top: 13px;">

            <v-menu 
            ref="allow_date_picker"
            v-model="allow_date_picker"
            :close-on-content-click="false"
            transition="scale-transition"
            dense
          >
            <template v-slot:activator="{ on, attrs }" >
                <v-btn style="margin-left: 0vh; max-width: 30vh"
                    v-bind="attrs"
                    v-on="on"
                >
                
                    <span style="color: #283593; font-weight: bold;" right>{{"Select Date"}}</span>
                
                </v-btn>
            </template>

            <v-date-picker
                v-model="select_date"
                no-title
                scrollable
                color="date_select"
                :max="frappe.datetime.add_days(frappe.datetime.now_date(true))"
                @input="update_date"
            >
            </v-date-picker>

          </v-menu>
            
            <!-- <v-autocomplete style="margin-left: 2vh; max-width: 30vh" 
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
            ></v-autocomplete> -->

            <v-btn style="margin-left: 5vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{"<"}}</span>
            </v-btn>

            <span style="margin-top: 12px; margin-left: 2vh; color: #1565C0; font-weight: bold;">{{ current_week }}</span>

            <v-btn style="margin-left: 2vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 3vh" right>{{">"}}</span>
            </v-btn>
            
            <v-btn style="margin-left: 80vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{"Reset"}}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Save" }}</span>
            </v-btn>

            <v-btn style="margin-left: 3vh; max-height: 7vh; cursor: unset">
                <span style="color: #283593; font-weight: bold; font-size: 2vh" right>{{ "Submit" }}</span>
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
        current_week: 'Aug 13 - Aug 19, 2023',
        pos_profile: '',
        select_date: '',
        allow_date_picker: false,
      };

    },

    methods: {

        update_date() {
            this.allow_date_picker = false
        },
        
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

        // this.get_year()

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

  