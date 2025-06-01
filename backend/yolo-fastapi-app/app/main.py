from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
from PIL import Image
from io import BytesIO
from app.detector import detect_objects

app = FastAPI()

@app.post("/detect/")
async def detect(image: UploadFile = File(...)):
    try:
        image_data = await image.read()
        img = Image.open(BytesIO(image_data)).convert("RGB")
        results = detect_objects(img)
        return JSONResponse(content={"detections": results})
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
