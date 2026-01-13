
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.candidate_job_matching_service import CandidateJobMatchingService

router = APIRouter()

@router.post("/applications/{application_id}/jobs/{job_id}/match")
def match_candidate_job(
    application_id: int,
    job_id: int,
    db: Session = Depends(get_db)
):
    service = CandidateJobMatchingService(db)
    match = service.match(application_id, job_id)

    return {
        "match_id": match.id,
        "score": match.match_score
    }



@router.get("/final_candidates")
def get_match_job(  db: Session = Depends(get_db)):

    result = db.query(CandidateJobMatchingService).all()

    return result


