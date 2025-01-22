from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors
import datetime
import os 
def generate_pdf(email, data, filename):
    # Check if the directory exists
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)  # Create directory if it doesn't exist
    c = canvas.Canvas(filename, pagesize=letter)
    width, height = letter  # Default page size (8.5x11 inches)
    
    # Set up some variables for layout
    y_position = height - 40
    line_height = 14
    padding = 10
    
    c.setFont("Helvetica-Bold", 12)
    c.drawString(padding, y_position, f"Domain Monitoring Report -{datetime.datetime.now().isoformat()} ")
    y_position -= 20
    
    c.setFont("Helvetica", 10)
    
    for entry in data:
        domain_name = entry['domain_name']
        used_keyword = entry['used_keyword']
        whois_result = entry['whois_result']
        date_of_collection = entry['date_of_collection']

        # Add domain information
        c.drawString(padding, y_position, f"Domain Name: {domain_name}")
        y_position -= line_height
        c.drawString(padding, y_position, f"Used Keyword: {used_keyword}")
        y_position -= line_height
        c.drawString(padding, y_position, f"Date of Collection: {date_of_collection}")
        y_position -= line_height
        
        c.setFont("Helvetica-Bold", 10)
        c.drawString(padding, y_position, "WHOIS Result:")
        y_position -= line_height
        
        c.setFont("Helvetica", 10)
        for field, value in whois_result.items():
        # Check if value is a list
            if isinstance(value, list):
                value = ', '.join(value)  # Join list values into a comma-separated string

            # Create the field string dynamically
            field_string = f"{field.replace('_', ' ').title()}: {value}"

            # Add the field to the PDF
            c.drawString(padding, y_position, field_string)
            y_position -= line_height

            # Prevent overflow
            if y_position < 40:
                c.showPage()  # Start a new page if the current one is full
                y_position = height - 40  # Reset y_position for the new page

    print(" saving ")
    c.save()  # Save the PDF file
    return filename

