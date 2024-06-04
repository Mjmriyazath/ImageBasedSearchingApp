import requests
import os  # for file path manipulation
import time
import webbrowser
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.edge.service import Service as EdgeService
from webdriver_manager.microsoft import EdgeChromiumDriverManager

# Define paths (modify as needed)
image_path = os.path.abspath("input.jpg")
api_url = "https://tmpfiles.org/api/v1/upload"
tineye_url = "https://tineye.com"  # Tineye upload URL

try:
    # Check if file exists
    if not os.path.exists(image_path):
        print(f"Error: Image file not found: {image_path}")
        exit(1)

    # Open the image file in binary mode
    with open(image_path, "rb") as image_file:
        # Prepare the data for the POST request
        files = {"file": (os.path.basename(image_path), image_file)}

        # Send POST request with the image file
        response = requests.post(api_url, files=files)
        response.raise_for_status()  # Raise an exception for non-200 status codes

        # Print the entire response data
        print("Full response data:")
        print(response.text)  # Access the raw text content

except requests.exceptions.RequestException as e:
    print(f"Error uploading image: {e}")
    exit(1)
except Exception as e:
    print(f"Unexpected error: {e}")
    exit(1)

if response.status_code == 200:
    data = response.json()
    responce = data.get("data")
    image_url = responce.get("url")
    if image_url:
        print(f"Successfully uploaded image! Temporary URL: {image_url}")
    else:
        print(f"Error: Image URL not found in response data.")
        exit(1)
    # Set up Selenium to fetch the image src from the temporary URL
    try:
        # Set up Edge driver
        driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()))
        driver.get(image_url)

        # Wait for the image to be present
        img_preview = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "img_preview"))
        )

        # Get the src attribute of the image
        img_src = img_preview.get_attribute("src")
        print(f"Image src URL: {img_src}")

        # (Optional) Use the img_src URL in further steps if needed
        # e.g., opening TinEye with img_src

    except Exception as e:
        print(f"Error fetching image src: {e}")
    finally:
        driver.quit()
        
    # Set up Selenium for reverse image search
    try:
        print(f"Opening Tineye upload page: {tineye_url}")
        
        # Set up Edge driver
        driver = webdriver.Edge(service=EdgeService(EdgeChromiumDriverManager().install()))
        driver.get(tineye_url)

        # Find the input field by ID
        url_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "url_box"))
        )

        # Find the search button by ID
        search_button = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "url_submit"))
        )

        # Enter the URL into the search box 
        print(img_src)
        url_box.send_keys(img_src)
        time.sleep(5)

        # Click the search button
        search_button.click()

        # Wait for a few seconds to let the search results load
        time.sleep(5)

        # Get the current URL open in current edge
        current_url = driver.current_url
        webbrowser.open(current_url)

        print("Search results opened in web browser.")
    except Exception as e:
        print(f"Error during reverse image search: {e}")
    finally:
        driver.quit()
else:
    print(f"Failed to upload the image. Status code: {response.status_code}")
