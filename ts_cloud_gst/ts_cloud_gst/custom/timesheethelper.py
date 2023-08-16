import frappe

import datetime

@frappe.whitelist()
def year_month_finding_and_list():

    month_list = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    
    year_list = []

    today = datetime.date.today()

    current_year = today.year

    current_month = month_list[today.month - 1]
    
    for i in range(10, 0, -1):
        year_list.append(current_year - i)

    for i in range(0, 10, 1):
        year_list.append(current_year + i)

    return year_list, month_list, current_year, current_month