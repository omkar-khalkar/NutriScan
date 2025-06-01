from google import genai
from pydantic import BaseModel
from typing import List, Literal


class Ingredient(BaseModel):
    name: str
    health_impact: str


class Nutrient(BaseModel):
    name: str
    value_per_100g: str
    description: str
    status: Literal["good", "bad"]  # Changed from int to string as required
    health_impact: str
    daily_safe_limit: str


class Score(BaseModel):
    label: str
    value: int
    out_of: int


class Product(BaseModel):
    ingredients: List[Ingredient]
    score: Score


class NutritionReport(BaseModel):
    product: Product
    nutrients: List[Nutrient]


def analyze_food_packet( extracted_text: str , table_text = []) -> NutritionReport:
    prompt = f"""
    You are a food and health analysis expert. Given the following raw text extracted from a packaged food label:

    food_packet_text: \"\"\"{extracted_text}\"\"\"
    nutrition_table (if available) : {table_text}
    Perform the following tasks:
    1. Extract the **ingredients** and provide their **health impact on human body**.
    2. Analyze each **nutrient** with the following information:
       - name
       - value per 100g
       - brief description
       - health impact
       - daily safe limit (for an average adult on a 2000 kcal/day diet)
       - status: "good" or "bad"
    3. Give an overall **health score** for the product (out of 100) and a **label** (e.g., Good, Moderate, Poor) with a brief reasoning.

    Return the response in **exactly** the following JSON format:

    {{
      "product": {{
        "ingredients": [
          {{
            "name": "...",
            "health_impact": "..."
          }}
        ],
        "score": {{
          "label": "...",
          "value": ...,
          "out_of": 100
        }}
      }},
      "nutrients": [
        {{
          "name": "...",
          "value_per_100g": "...",
          "description": "...",
          "status": "...",
          "health_impact": "...",
          "daily_safe_limit": "..."
        }}
      ]
    }}

    Ensure the values are realistic and medically informed. Do not skip any fields. Keep responses compact and factual.
    """

    client = genai.Client(api_key="AIzaSyBZhf_ZVUXS3qDHa6N-tJr93HnYWVlQKV0")

    response = client.models.generate_content(
        model='gemini-2.0-flash',
        contents=prompt,
        config={
            'response_mime_type': 'application/json',
            'response_schema': NutritionReport,
        },
    )

    return response.parsed  # This is a NutritionReport object
