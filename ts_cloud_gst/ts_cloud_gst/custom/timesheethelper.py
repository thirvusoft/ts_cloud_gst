import frappe

from datetime import timedelta

import calendar

import json

from frappe.utils import getdate, nowdate

week_short_forms = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

week_days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

@frappe.whitelist()
def find_week(date):

    msg = ""

    global week_short_forms

    customer_dict = get_customer()

    main_table_values = {"main_row_id": 0, "customer_data": customer_dict, "project_data": []}

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

    main_table_values = [main_table_values]

    if frappe.db.exists("TSheets Record", {"user": frappe.session.user, "date": start_of_week, "docstatus": ["!=", 2]}):

        main_table_values = []

        doc = frappe.get_doc("TSheets Record", {"user": frappe.session.user, "date": start_of_week, "docstatus": ["!=", 2]})

        if doc.docstatus == 1:

            msg = "Already Submitted, Not Able To Edit It..."

        for row in doc.details:

            main_table_values.append({
                "main_row_id": row.idx - 1,
                "customer_data": customer_dict,
                "project_data": get_project(row.customer),
                f"{week_short_forms[0].lower()}": row.hrs,
                "customer_name": row.customer,
                "project": row.project,
                "row_total": row.hrs
            })

            total_table_values[week_short_forms[0].lower()] += row.hrs
            total_table_values["row_total"] += row.hrs

        for i in range(1, 7, 1):

            next_date = start_of_week + timedelta(days = i)

            if frappe.db.exists("TSheets Record", {"user": frappe.session.user, "date": next_date, "docstatus": ["!=", 2]}):

                doc = frappe.get_doc("TSheets Record", {"user": frappe.session.user, "date": next_date, "docstatus": ["!=", 2]})

                for row in doc.details:

                    main_table_values[row.idx - 1][week_short_forms[i].lower()] = row.hrs
                    main_table_values[row.idx - 1]["row_total"] += row.hrs

                    total_table_values[week_short_forms[i].lower()] += row.hrs
                    total_table_values["row_total"] += row.hrs

    return week_description, table_headers, table_total_column_headers, main_table_values, [total_table_values], start_of_week, end_of_week, msg

@frappe.whitelist()
def get_customer():

    customer_list = frappe.get_list("Customer", {"disabled": 0}, ["name"], order_by = "name asc")

    return customer_list

@frappe.whitelist()
def get_project(customer):

    project_list = frappe.db.get_all("Project", {"customer": customer, "status": "Open"}, ["name", "project_name"], order_by = "name asc")

    return project_list

@frappe.whitelist()
def save_or_submit(start_date_week, end_date_week, data, type):

    global week_short_forms

    global week_days

    data = json.loads(data)

    processed_data = []

    matched_idx = []

    for i in range (0, len(data), 1):

        if i not in matched_idx:

            for j in range(i+1, len(data), 1):

                if data[i].get("customer_name") == data[j].get("customer_name") and data[i].get("project") == data[j].get("project"):
                    
                    matched_idx.append(j)
                    
                    for week in week_short_forms:

                        hrs = 0
                    
                        hrs = float(data[i].get(week.lower()) or 0) + float(data[j].get(week.lower()) or 0)

                        if hrs:
                            data[i][week.lower()] = hrs

            processed_data.append(data[i])

    start_date_week = getdate(start_date_week)

    end_date_week = getdate(end_date_week)

    for i in range(0, 7, 1):

        current_date = start_date_week + timedelta(days = i)

        if current_date <= end_date_week:

            if frappe.db.exists("TSheets Record", {"user": frappe.session.user, "date": current_date, "docstatus": ["!=", 2]}):

                doc = frappe.get_doc("TSheets Record", {"user": frappe.session.user, "date": current_date, "docstatus": ["!=", 2]})

                if doc.docstatus == 1:

                    msg = "Already Submitted, Not Able To Edit It..."

                    return False, msg
            
            else:

                doc = frappe.new_doc("TSheets Record")

            doc.user = frappe.session.user

            doc.date = current_date
            doc.day = week_days[i]

            doc.total_hrs = 0

            doc.details = []

            for row in processed_data:

                doc.append("details", {
                    "customer": row.get("customer_name"),
                    "project": row.get("project"),
                    "hrs": row.get(week_short_forms[i].lower())
                })

                if row.get(week_short_forms[i].lower()):
                    doc.total_hrs += float(row[week_short_forms[i].lower()])

            doc.save()

            if type == "Submit":
                doc.submit()

            frappe.db.commit()

        else:
            break
    
    if type == "Submit":
        msg = "Submitted Successfully..."
    
    else:
        msg = "Saved Successfully..."

    return True, msg

@frappe.whitelist()
def reset(start_date_week, end_date_week):

    start_date_week = getdate(start_date_week)

    end_date_week = getdate(end_date_week)

    if frappe.db.exists("TSheets Record", {"user": frappe.session.user, "date": start_date_week, "docstatus": ["!=", 2]}):

        doc = frappe.get_doc("TSheets Record", {"user": frappe.session.user, "date": start_date_week, "docstatus": ["!=", 2]})

        if doc.docstatus == 1:

            msg = "Submitted Record Cannot Able To Reset..."

            return False, msg
        
        else:

            frappe.delete_doc("TSheets Record", doc.name)

            for i in range(1, 7, 1):

                current_date = start_date_week + timedelta(days = i)

                if frappe.db.exists("TSheets Record", {"user": frappe.session.user, "date": current_date, "docstatus": ["!=", 2]}):

                    doc = frappe.get_doc("TSheets Record", {"user": frappe.session.user, "date": current_date, "docstatus": ["!=", 2]})

                    frappe.delete_doc("TSheets Record", doc.name)

                if str(current_date) == str(end_date_week):

                    break

            msg = "Reset Successfully..."

            return True, msg
        
    else:

        msg = "No Record Found To Reset..."

        return False, msg

