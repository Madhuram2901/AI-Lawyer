from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from app.core.analyzer import analyze_case_with_ai
import logging

logger = logging.getLogger(__name__)

router = APIRouter()


class AnalyzeRequest(BaseModel):
    case_text: str


class LegalIssue(BaseModel):
    issue: str
    description: str
    importance: str


class ApplicableLaw(BaseModel):
    law: str
    description: str
    relevance: str


class CaseStrength(BaseModel):
    point: str
    explanation: str


class CaseWeakness(BaseModel):
    point: str
    explanation: str
    severity: str


class RecommendedAction(BaseModel):
    action: str
    priority: str
    rationale: str


class AnalyzeResponse(BaseModel):
    case_type: str
    case_summary: str
    key_facts: List[str]
    legal_issues: List[LegalIssue]
    applicable_laws: List[ApplicableLaw]
    strengths: List[CaseStrength]
    weaknesses: List[CaseWeakness]
    recommended_actions: List[RecommendedAction]
    evidence_needed: List[str]
    precedents: List[str]
    estimated_outcome: str
    timeline_considerations: str


@router.post("/case/analyze", response_model=AnalyzeResponse)
async def analyze_case(data: AnalyzeRequest):
    """
    Analyze a legal case using AI (Ollama)
    Returns 503 if AI service is unavailable
    """
    if not data.case_text.strip():
        raise HTTPException(status_code=400, detail="Case text cannot be empty")

    try:
        result = analyze_case_with_ai(data.case_text)
        return result
        
    except RuntimeError as e:
        # AI service unavailable or failed
        error_message = str(e)
        
        if "not available" in error_message.lower():
            raise HTTPException(
                status_code=503,
                detail="AI service is currently unavailable. Please ensure Ollama is running with llama3 model."
            )
        else:
            raise HTTPException(
                status_code=500,
                detail=f"AI analysis failed: {error_message}"
            )
            
    except Exception as e:
        logger.error(f"Unexpected error: {e}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during analysis."
        )
