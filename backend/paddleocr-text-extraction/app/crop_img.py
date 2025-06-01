from PIL import Image
import os

def crop_image(image_path: str, boxes: list) -> list:
    """
    Crops the image based on the list of boxes and returns cropped image objects.
    Each box should be in the format [x1, y1, x2, y2].
    """
    cropped_images = []
    image = Image.open(image_path)

    for i, box in enumerate(boxes):
        # Round and convert to integers if needed
        x1, y1, x2, y2 = map(int, box)
        cropped = image.crop((x1, y1, x2, y2))
        cropped_images.append(cropped)

    return cropped_images

def save_cropped_images(cropped_images, output_dir="cropped"):
    
    os.makedirs(output_dir, exist_ok=True)
    
    paths = []
    for i, img in enumerate(cropped_images):
        path = os.path.join(output_dir, f"crop_{i}.png")
        img.save(path)
        paths.append(path)
    
    return paths
