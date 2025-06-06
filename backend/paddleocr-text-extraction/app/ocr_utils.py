import os
import cv2
import numpy as np
from paddleocr import PaddleOCR
from typing import List

# Initialize PaddleOCR with angle classifier enabled
ocr_model = PaddleOCR(
    lang='en',
    use_angle_cls=True,     # Detect rotated text
    det_db_box_thresh=0.3,  # Improve detection of faint text
    drop_score=0.3,         # Lower threshold to include low-confidence text
    use_gpu=False
)

def preprocess_image(image_path: str) -> str:
    """
    Preprocess image to improve OCR on curved or rotated text.
    - Grayscale
    - Denoise with Gaussian Blur
    - Adaptive Thresholding
    """
    image = cv2.imread(image_path)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    processed_path = f"processed_{os.path.basename(image_path)}"
    cv2.imwrite(processed_path, thresh)
    return processed_path


def extract_text_from_image(image_path: str) -> List[str]:
    """
    Extracts lines of text using OCR. Handles rotation and curves.
    """
    print(f"Processing: {image_path}")
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    # Optional: uncomment if preprocessing needed
    # image_path = preprocess_image(image_path)

    result = ocr_model.ocr(image_path, cls=True)

    if not result or not result[0]:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = [line[1][0] for line in result[0]]
    return lines


def extract_table_like_text(image_path: str) -> str:
    """
    Extracts text with table-like layout by analyzing bounding box positions.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    # Optional: uncomment if preprocessing needed
    # image_path = preprocess_image(image_path)

    result = ocr_model.ocr(image_path, cls=True)

    if not result or not result[0]:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = result[0]

    # Sort top-to-bottom, then left-to-right
    lines.sort(key=lambda x: (min(pt[1] for pt in x[0]), min(pt[0] for pt in x[0])))

    structured_text = ""
    last_y = -100  # Initialize with something far

    for box, (text, confidence) in lines:
        top_y = min(pt[1] for pt in box)
        if abs(top_y - last_y) > 15:
            structured_text += "\n"
        structured_text += text + "  "
        last_y = top_y

    return structured_text.strip()


def extract_table_like_text2(image_path: str) -> str:
    """
    Enhanced version: groups text by row using Y position and sorts columns by X position.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    # Optional: uncomment if preprocessing needed
    # image_path = preprocess_image(image_path)

    result = ocr_model.ocr(image_path, cls=True)

    if not result or not result[0]:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = result[0]
    elements = []

    for box, (text, conf) in lines:
        x = min(p[0] for p in box)
        y = min(p[1] for p in box)
        elements.append({"text": text, "x": x, "y": y})

    # Group elements by row
    rows = []
    threshold = 15
    elements.sort(key=lambda e: e["y"])
    current_row = []
    last_y = -1000

    for el in elements:
        if abs(el["y"] - last_y) > threshold:
            if current_row:
                rows.append(current_row)
            current_row = [el]
            last_y = el["y"]
        else:
            current_row.append(el)
    
    if current_row:
        rows.append(current_row)

    # Sort each row left to right
    structured_text = ""
    for row in rows:
        row.sort(key=lambda e: e["x"])
        row_text = "  ".join(el["text"] for el in row)
        structured_text += row_text + "\n"

    return structured_text.strip()
