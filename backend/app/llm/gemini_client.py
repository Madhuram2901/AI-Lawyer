import requests
import os
import json
import logging
from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)

# Configure Gemini
API_KEY = os.getenv("GEMINI_API_KEY")

def call_gemini(prompt: str) -> dict:
    """
    Call Gemini 1.5 Flash API using REST (Faster and more reliable than gRPC on some networks)
    """
    if not API_KEY:
        raise RuntimeError("Gemini API Key is missing.")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={API_KEY}"
    
    payload = {
        "contents": [{
            "parts": [{"text": prompt}]
        }],
        "generationConfig": {
            "response_mime_type": "application/json",
            "temperature": 0.7
        }
    }
    
    try:
        logger.info("🚀 Sending request to Gemini REST API...")
        response = requests.post(url, json=payload, timeout=30)
        
        if response.status_code != 200:
            error_detail = response.json().get('error', {}).get('message', 'Unknown error')
            logger.error(f"❌ Gemini API Error ({response.status_code}): {error_detail}")
            raise RuntimeError(f"Gemini API Error: {error_detail}")
            
        result = response.json()
        
        # Extract the JSON text from the response structure
        try:
            response_text = result['candidates'][0]['content']['parts'][0]['text']
            return json.loads(response_text)
        except (KeyError, IndexError, json.JSONDecodeError) as e:
            logger.error(f"❌ Failed to parse Gemini response: {str(e)}")
            # If it's just raw text, return it
            if 'candidates' in result:
                return {"raw_response": result['candidates'][0]['content']['parts'][0]['text']}
            raise RuntimeError("Unexpected response format from Gemini")
            
    except requests.exceptions.Timeout:
        logger.error("❌ Gemini API Timeout")
        raise RuntimeError("Gemini API timed out")
    except Exception as e:
        logger.error(f"❌ Gemini Request Failed: {str(e)}")
        raise RuntimeError(f"Gemini Request Failed: {str(e)}")

def is_gemini_available() -> bool:
    """Check if Gemini is configured and we have internet"""
    return bool(API_KEY) and len(API_KEY) > 10
