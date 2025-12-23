import requests
import logging
import json

logger = logging.getLogger(__name__)

OLLAMA_BASE_URL = "http://localhost:11434"
DEFAULT_MODEL = "llama3:latest"  # Using llama3 which is installed


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
        model: The model to use (default: llama2)
    
    Returns:
        dict: Parsed response from Ollama
    
    Raises:
        RuntimeError: If the API call fails
    """
    try:
        logger.info(f"Calling Ollama with model: {model}")
        
        # Prepare the request
        url = f"{OLLAMA_BASE_URL}/api/generate"
        payload = {
            "model": model,
            "prompt": prompt,
            "stream": False,
            "format": "json"  # Request JSON response
        }
        
        # Make the request (increased timeout for complex analysis)
        response = requests.post(url, json=payload, timeout=180)
        response.raise_for_status()
        
        # Parse the response
        result = response.json()
        response_text = result.get("response", "")
        
        # Try to parse the response as JSON
        try:
            parsed_response = json.loads(response_text)
            logger.info("Successfully parsed Ollama response")
            return parsed_response
        except json.JSONDecodeError:
            logger.warning("Failed to parse Ollama response as JSON, returning raw text")
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
