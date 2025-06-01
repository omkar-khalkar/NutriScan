import os
from paddleocr import PaddleOCR
from operator import itemgetter

ocr_model = PaddleOCR(lang='en', use_gpu=False)

def extract_text_from_image(image_path: str) -> str:
    print(image_path)
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    result =ocr_model.ocr(image_path, cls=True)

    if not result or result[0] is None:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = [line[1][0] for line in result[0]]
    return lines



def extract_table_like_text(image_path: str) -> str:
    """
    Extracts text from an image preserving table-like layout using bounding box positions.
    """
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    result = ocr_model.ocr(image_path, cls=True)
    
    if not result or not result[0]:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = result[0]

    # Sort lines top-to-bottom, then left-to-right
    lines.sort(key=lambda x: (min(pt[1] for pt in x[0]), min(pt[0] for pt in x[0])))

    structured_text = ""
    last_y = -100  # Initialize with something far

    for box, (text, confidence) in lines:
        top_y = min(pt[1] for pt in box)
        
        # Add newline if there's a significant vertical gap
        if abs(top_y - last_y) > 15:
            structured_text += "\n"

        structured_text += text + "  "  # Use double space to simulate column gaps
        last_y = top_y

    return structured_text.strip()

def extract_table_like_text2(image_path: str) -> str:
    if not os.path.exists(image_path):
        raise FileNotFoundError(f"Image not found: {image_path}")

    result = ocr_model.ocr(image_path, cls=True)

    if not result or not result[0]:
        raise ValueError(f"OCR failed or returned no results for: {image_path}")

    lines = result[0]

    # Prepare each line with its top y and left x positions
    elements = []
    for box, (text, conf) in lines:
        x = min(p[0] for p in box)
        y = min(p[1] for p in box)
        elements.append({"text": text, "x": x, "y": y})

    # Group lines into rows using y position (row clustering)
    rows = []
    threshold = 15  # vertical gap threshold to define a new row
    elements.sort(key=lambda e: e["y"])  # top-to-bottom
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

    # Sort each row left-to-right by x position
    structured_text = ""
    for row in rows:
        row.sort(key=lambda e: e["x"])
        row_text = "  ".join(el["text"] for el in row)
        structured_text += row_text + "\n"

    return structured_text.strip()
