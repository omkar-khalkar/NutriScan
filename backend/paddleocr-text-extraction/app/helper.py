import requests

def send_image_to_nutrition_service(image_path: str, target_class: int = 1):
    url = "http://localhost:8000/detect/"  # Adjust as needed
    print(image_path) 
    with open(image_path, "rb") as f:
        files = {"image": (image_path, f, "image/png")}
        response = requests.post(url, files=files)

    if response.status_code == 200:
        data = response.json()

        # Extract boxes for target class
        detections = data.get("detections", [])
        boxes = [
            detection["box"]
            for detection in detections
            if detection.get("class_id") == target_class and detection.get("confidence") >=0.55 
        ]

        return boxes  # e.g., [[x1, y1, x2, y2], ...]

    else:
        raise ValueError(f"Error from image detection service: {response.status_code} - {response.text}")
