from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.db.session import get_db
from app.services.recruiter_review_service import RecruiterReviewService

router = APIRouter(prefix="/recruiter", tags=["Recruiter Review"])


class RecruiterDecisionRequest(BaseModel):
    application_id: int
    job_id: int
    decision: str            # approved | rejected
    decided_by: str          # recruiter / hiring_manager
    notes: str | None = None


@router.post("/decide")
def recruiter_decide(
    payload: RecruiterDecisionRequest,
    db: Session = Depends(get_db)
):
    service = RecruiterReviewService(db)

    decision = service.decide(
        application_id=payload.application_id,
        job_id=payload.job_id,
        decision=payload.decision,
        decided_by=payload.decided_by,
        notes=payload.notes
    )

    return {
        "decision_id": decision.id,
        "status": decision.decision,
        "application_id": decision.application_id
    }
