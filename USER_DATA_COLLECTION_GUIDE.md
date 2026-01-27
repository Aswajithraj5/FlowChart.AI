# Google Form Data Storage Guide

User details (Username, Email, Password, Date, Time) are now being recorded directly to your Google Form.

## 1. How it Works
The website sends a `POST` request to your Google Form's `formResponse` endpoint. 
- **Username** is mapped to your form's Username field.
- **Email** is mapped to your form's Email ID field.
- **Password** is mapped to your form's Password field.
- **Date & Time** is automatically generated and saved into the **Use Case** field as a timestamp.

## 2. Where to View the Data
1. Go to your [Google Form](https://docs.google.com/forms/d/1EN6ASzzQufGLV57hTfz-IBC9nI3WxQoQVXczzHv_kdritvA/edit).
2. Click on the **Responses** tab at the top.
3. To see everything in a spreadsheet format, click **Link to Sheets** (the green icon).

## 3. Data Mapping Details
If you decide to change the form, you will need to update the `entry.xxxx` IDs in [Layout.tsx](file:///c:/Users/aswaj/OneDrive/Desktop/FlowChart.AI/src/components/layout/Layout.tsx). 

Current Mapping:
- **Username**: `entry.1831054606`
- **Email**: `entry.472400053`
- **Password**: `entry.1179008949`
- **Timestamp (Date/Time)**: `entry.465572959`

## Security Reminder
> [!WARNING]
> Storing raw passwords in a Google Form/Sheet is not secure. This setup is meant for demonstration or low-security use cases. For a production app with real users, consider using **Firebase Auth** or **Supabase Auth**.
