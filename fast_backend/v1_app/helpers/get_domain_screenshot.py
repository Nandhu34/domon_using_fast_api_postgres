from selenium import webdriver
import os

option = webdriver.ChromeOptions()
option.add_argument('--headless')

driver = webdriver.Chrome(options=option)
driver.maximize_window()
driver.set_window_size(1920,995)
def get_snapshot(domain_name):
    url = "https://" + domain_name.strip()
    if not os.path.exists('./images'):
        os.mkdir('images')  # Create 'images' directory if it doesn't exist

    # Visit the specified URL
    driver.get(url)
    
    # Define the path where the screenshot will be saved
    screenshot_path = f'./images/{domain_name.strip().replace(".", "_")}.png'
    
    # Save the screenshot
    driver.save_screenshot(screenshot_path)
    print(driver.get_window_size())
    print(f"Screenshot saved at: {screenshot_path}")
    return screenshot_path

