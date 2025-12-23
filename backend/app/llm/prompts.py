def case_analysis_prompt(case_text: str) -> str:
    return f"""
You are an expert legal AI assistant helping lawyers analyze cases comprehensively.

Analyze the following case and provide a DETAILED legal analysis in STRICT JSON format.

Your response must be valid JSON with the following structure:

{{
  "case_type": "Criminal | Civil | Constitutional | Family | Corporate | Property | Labor | Tax | Other",
  "case_summary": "Brief 2-3 sentence summary of the case",
  "key_facts": ["fact 1", "fact 2", "fact 3"],
  "legal_issues": [
    {{
      "issue": "Main legal question or issue",
      "description": "Detailed explanation of this issue",
      "importance": "High | Medium | Low"
    }}
  ],
  "applicable_laws": [
    {{
      "law": "Name of law/section (e.g., IPC Section 420)",
      "description": "What this law covers",
      "relevance": "How it applies to this case"
    }}
  ],
  "strengths": [
    {{
      "point": "Strong point in the case",
      "explanation": "Why this strengthens the case"
    }}
  ],
  "weaknesses": [
    {{
      "point": "Weak point or risk",
      "explanation": "Why this is a concern",
      "severity": "High | Medium | Low"
    }}
  ],
  "recommended_actions": [
    {{
      "action": "Specific action to take",
      "priority": "High | Medium | Low",
      "rationale": "Why this action is important"
    }}
  ],
  "evidence_needed": ["type of evidence 1", "type of evidence 2"],
  "precedents": ["Relevant case law or precedent if known"],
  "estimated_outcome": "Likely outcome based on the facts presented",
  "timeline_considerations": "Important deadlines or time-sensitive matters"
}}

IMPORTANT RULES:
- Output ONLY valid JSON, no markdown, no explanations outside JSON
- Be specific and detailed in all descriptions
- Focus on actionable insights for the lawyer
- If information is not available, use empty arrays [] or "Not specified"
- Ensure all JSON is properly formatted with correct quotes and commas

CASE TEXT:
{case_text}
"""

