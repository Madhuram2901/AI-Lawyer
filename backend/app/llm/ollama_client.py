import requests
import logging
import json
import time

logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = "http://127.0.0.1:11434"
DEFAULT_MODEL = "llama3:latest"  # Using llama3:latest which is more common


def is_ollama_available() -> bool:
    """
    Check if Ollama service is available
    """
    try:
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=2)
        return response.status_code == 200
    except Exception as e:
        logger.warning(f"Ollama availability check failed: {e}")
        return False


def call_ollama(prompt: str, model: str = DEFAULT_MODEL) -> dict:
    """
    Call Ollama API with the given prompt
    
    Args:
        prompt: The prompt to send to Ollama
        model: The model to use (default: llama3:latest)
    
    Returns:
        dict: Parsed response from Ollama
    
    Raises:
        RuntimeError: If the API call fails
    """
    start_time = time.time()  # Track processing time
    try:
        logger.info(f"Calling Ollama with model: {model}")
        
        # Prepare the request
        url = f"{OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "format": "json",  # Request JSON response
            # Performance optimizations
            "options": {
                "num_predict": 2048,    # Limit response length for faster processing
                "temperature": 0.7,      # Balance between creativity and consistency
                "top_p": 0.9,           # Nucleus sampling for better quality
                "num_ctx": 4096,        # Context window size
            }
        }
        
        # Make the request with extended timeout for long case analysis
        # Increased from 180s to 300s to match mobile app timeout
        logger.info(f"Sending request to Ollama (timeout: 300s)...")
        response = requests.post(url, json=payload, timeout=300)
        response.raise_for_status()
        
        # Parse the response
        result = response.json()
        response_text = result.get("response", "")
        
        # Try to parse the response as JSON
        try:
            parsed_response = json.loads(response_text)
            elapsed_time = time.time() - start_time
            logger.info(f"Successfully parsed Ollama response (took {elapsed_time:.2f}s)")
            return parsed_response
        except json.JSONDecodeError:
            elapsed_time = time.time() - start_time
            logger.warning(f"Failed to parse Ollama response as JSON (took {elapsed_time:.2f}s), returning raw text")
            return {"raw_response": response_text}
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Ollama API request failed: {e}")
        raise RuntimeError(f"Failed to call Ollama API: {str(e)}")
    except Exception as e:
        logger.error(f"Unexpected error calling Ollama: {e}")
        raise RuntimeError(f"Unexpected error: {str(e)}")


def list_available_models() -> list:
    """
    List all available Ollama models
    
    Returns:
        list: List of available model names
    """
    try:
        response = requests.get(f"{OLLAMA_BASE_URL}/api/tags", timeout=5)
        response.raise_for_status()
        
        data = response.json()
        models = [model.get("name") for model in data.get("models", [])]
        logger.info(f"Available Ollama models: {models}")
        return models
        
    except Exception as e:
        logger.error(f"Failed to list Ollama models: {e}")
        return []
