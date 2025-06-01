from ultralytics import YOLO
from PIL import Image
import numpy as np

model = YOLO("models/best.pt")  # Load once at startup

def detect_objects(image: Image.Image):
    results = model(image, save=True)

    boxes = []
    for result in results:
        for box in result.boxes:
            xyxy = box.xyxy[0].tolist()
            confidence = float(box.conf[0])
            class_id = int(box.cls[0])
            boxes.append({
                "class_id": class_id,
                "confidence": round(confidence, 4),
                "box": [round(coord, 2) for coord in xyxy]
            })
    return boxes
