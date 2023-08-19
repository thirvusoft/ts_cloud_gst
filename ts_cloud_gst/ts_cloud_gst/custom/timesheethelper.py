import frappe

from datetime import timedelta

import calendar

from frappe.utils import getdate, nowdate

@frappe.whitelist()
def find_week(date):

    week_short_forms = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

    customer_dict = get_customer()

    main_table_values = {"main_row_id": 0, "customer_data": customer_dict, "project": []}

    total_table_values = {"column_total": "Total"}

    date = getdate(date)

    start_of_week = date - timedelta(days = date.weekday())

    start_of_week_current_month_num = start_of_week.month

    start_of_week_current_month = calendar.month_abbr[start_of_week_current_month_num]

    start_of_week_date = start_of_week.day

    week_columns = [
        
        {
            "text": f"{week_short_forms[0]}, {start_of_week_current_month_num}/{start_of_week_date}",
            "value": week_short_forms[0].lower(),
            "align": "center",
            "sortable": False,
        },
    ]

    main_table_values[week_short_forms[0].lower()] = ""

    total_table_values[week_short_forms[0].lower()] = 0

    for i in range(1, 7, 1):

        if str(start_of_week) != str(start_of_week + timedelta(days = i)):

            end_of_week = start_of_week + timedelta(days = i)

            end_of_week_current_month_num = end_of_week.month

            end_of_week_current_month = calendar.month_abbr[end_of_week_current_month_num]

            end_of_week_date = end_of_week.day

            week_columns += [
        
                {
                    "text": f"{week_short_forms[i]}, {end_of_week_current_month_num}/{end_of_week_date}",
                    "value": week_short_forms[i].lower(),
                    "align": "center",
                    "sortable": False,
                },
            ]

            main_table_values[week_short_forms[i].lower()] = ""

            total_table_values[week_short_forms[i].lower()] = 0

            if str(start_of_week + timedelta(days = i)) == str(nowdate()):
                break

        else:
            break

    current_year = start_of_week.year

    week_description = f"{start_of_week_current_month} {start_of_week_date} - {end_of_week_current_month} {end_of_week_date}, {current_year}"
    
    table_headers = [

        {
            "text": "Customer",
            "align": "center",
            "sortable": False,
            "value": "customer_name",
        },

        {
            "text": "Project",
            "sortable": False,
            "value": "project",
            "align": "center"
        }

    ]

    table_headers += week_columns

    table_headers += [

        {
            "text": "Total",
            "sortable": False,
            "value": "row_total",
            "align": "center"
        },

        {
            "text": "Remove",
            "sortable": False,
            "value": "delete",
            "align": "center"
        },
    ]

    main_table_values["row_total"] = 0

    total_table_values["row_total"] = 0

    table_total_column_headers = [

        {
            "sortable": False,
            "value": "column_total",
            "align": "center"
        },
    ]

    table_total_column_headers += week_columns

    table_total_column_headers += [

        {
            "text": "Total",
            "sortable": False,
            "value": "row_total",
            "align": "center"
        },
    ]

    return week_description, table_headers, table_total_column_headers, [main_table_values], [total_table_values]

@frappe.whitelist()
def get_customer():

    customer_list = frappe.get_list("Customer", {"disabled": 0}, ["name"], order_by = "name asc")

    return customer_list

@frappe.whitelist()
def get_project(customer):

    project_list = frappe.db.get_all("Project", {"customer": customer, "status": "Open"}, ["name", "project_name"], order_by = "name asc")

    return project_list
