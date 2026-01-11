from app.llm.prompts import case_analysis_prompt
from app.llm.ollama_client import call_ollama, is_ollama_available, DEFAULT_MODEL
from app.llm.gemini_client import call_gemini, is_gemini_available
import logging

logger = logging.getLogger(__name__)


def analyze_case_with_ai(case_text: str) -> dict:
    """
    Analyze case using AI (Gemini first, Ollama as fallback)
    """
    prompt = case_analysis_prompt(case_text)
    ai_result = None
    errors = []

    # 1. Try Gemini
    if is_gemini_available():
        try:
            logger.info("🚀 Attempting Gemini 1.5 Flash...")
            ai_result = call_gemini(prompt)
            logger.info("✅ Gemini analysis successful")
        except Exception as e:
            err_msg = f"Gemini failed: {str(e)}"
            logger.warning(f"⚠️ {err_msg}")
            errors.append(err_msg)

    # 2. Try Ollama (Fallback)
    if not ai_result:
        if is_ollama_available():
            try:
                logger.info(f"🤖 Attempting local Ollama ({DEFAULT_MODEL})...")
                ai_result = call_ollama(prompt, model=DEFAULT_MODEL)
                logger.info("✅ Ollama analysis successful")
            except Exception as e:
                err_msg = f"Ollama failed: {str(e)}"
                logger.error(f"❌ {err_msg}")
                errors.append(err_msg)
        else:
            errors.append("Ollama service is not running locally (port 11434 unreachable)")

    # 3. Handle total failure
    if not ai_result:
        all_errors = " | ".join(errors)
        logger.error(f"❌ Both AI services failed: {all_errors}")
        raise RuntimeError(f"AI Analysis Service Unavailable. Details: {all_errors}")
    
    try:
        # Helper to ensure something is a list
        def ensure_list(val):
            if isinstance(val, list):
                return val
            if val is None or val == "Not specified":
                return []
            return [str(val)]

        # Helper to ensure something is a string
        def ensure_str(val, default="Not specified"):
            if val is None:
                return default
            return str(val)

        # Validate and return
        result = {
            "case_type": ensure_str(ai_result.get("case_type"), "Unknown"),
            "case_summary": ensure_str(ai_result.get("case_summary")),
            "key_facts": ensure_list(ai_result.get("key_facts")),
            "legal_issues": ai_result.get("legal_issues", []),
            "applicable_laws": ai_result.get("applicable_laws", []),
            "strengths": ai_result.get("strengths", []),
            "weaknesses": ai_result.get("weaknesses", []),
            "recommended_actions": ai_result.get("recommended_actions", []),
            "evidence_needed": ensure_list(ai_result.get("evidence_needed")),
            "precedents": ensure_list(ai_result.get("precedents")),
            "estimated_outcome": ensure_str(ai_result.get("estimated_outcome")),
            "timeline_considerations": ensure_str(ai_result.get("timeline_considerations"))
        }
        
        logger.info(f"AI analysis successful: {result['case_type']}")
        return result
        
    except Exception as e:
        logger.error(f"AI analysis failed: {e}")
        raise RuntimeError(f"AI analysis failed: {str(e)}")
