from app.llm.prompts import case_analysis_prompt
from app.llm.ollama_client import call_ollama, is_ollama_available
import logging

logger = logging.getLogger(__name__)


def analyze_case_with_ai(case_text: str) -> dict:
    """
    Analyze case using AI (Ollama) - NO FALLBACK
    Raises exception if Ollama is not available
    """
    # Check if Ollama is available
    if not is_ollama_available():
        logger.error("Ollama is not available")
        raise RuntimeError("AI service is not available. Please ensure Ollama is running.")
    
    # Use AI analysis
    try:
        logger.info("Using Ollama AI for analysis")
        prompt = case_analysis_prompt(case_text)
        ai_result = call_ollama(prompt)
        
        # Validate and return
        result = {
            "case_type": ai_result.get("case_type", "Unknown"),
            "issues": ai_result.get("issues", []),
            "laws": ai_result.get("laws", []),
            "risks": ai_result.get("risks", [])
        }
        
        logger.info(f"AI analysis successful: {result['case_type']}")
        return result
        
    except Exception as e:
        logger.error(f"AI analysis failed: {e}")
        raise RuntimeError(f"AI analysis failed: {str(e)}")
