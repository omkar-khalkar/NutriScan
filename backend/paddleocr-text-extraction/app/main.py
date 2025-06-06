from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware  # ✅ Import CORS middleware
from app.ocr_utils import extract_text_from_image, extract_table_like_text, extract_table_like_text2
from app.helper import send_image_to_nutrition_service
from app.crop_img import crop_image, save_cropped_images
from app.llm_response import analyze_food_packet
import shutil
import os
import uuid

app = FastAPI()

# ✅ Enable CORS for all origins (Allow any frontend to access this API)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Define Image Storage Paths
INGREDIENTS_IMAGE_DIR = "images/ingredients/"
NUTRITION_IMAGE_DIR = "images/nutritiontable/"

# Ensure directories exist
os.makedirs(INGREDIENTS_IMAGE_DIR, exist_ok=True)
os.makedirs(NUTRITION_IMAGE_DIR, exist_ok=True)

@app.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    try:
        file_ext = os.path.splitext(file.filename)[-1]
        temp_filename = f"temp_{uuid.uuid4().hex}{file_ext}"
        os.makedirs("temp_images", exist_ok=True)

        temp_path = os.path.abspath(os.path.join("temp_images", temp_filename)).replace("\\", "/")

        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        try:
            boxes = send_image_to_nutrition_service(temp_path)
            cropped_images = crop_image(temp_path, boxes)
            saved_paths = save_cropped_images(cropped_images)

            tables_text = []
            for path in saved_paths:
                text = extract_table_like_text2(path)
                tables_text.append(text)

            extracted_ingredients = extract_text_from_image(temp_path)

            response = analyze_food_packet(extracted_ingredients, tables_text)

        except (ValueError, FileNotFoundError) as e:
            raise HTTPException(status_code=422, detail=str(e))

        return {
            "ingredients": extracted_ingredients,
            "table_text": tables_text,
            "llm_response": response
        }

    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)
        # Optionally clean up cropped images here if needed
