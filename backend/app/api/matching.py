
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.candidate_job_matching_service import CandidateJobMatchingService
from app.db.models.Candidate_processing_model.job_candidate_match import JobCandidateMatch
from app.db.models.Application_model.application_record import ApplicationRecord
from app.db.models.Job_model.job_model import Job

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



@router.get("/candidates")
def get_match_job(  db: Session = Depends(get_db)):

    matches = (
        db.query(
            JobCandidateMatch.id.label("match_id"),
            JobCandidateMatch.application_id,
            JobCandidateMatch.job_id,
            JobCandidateMatch.match_score,
            JobCandidateMatch.reasoning_json.label("match_summary"),
            ApplicationRecord.name.label("candidate_name"),
            ApplicationRecord.email.label("candidate_email"),
            ApplicationRecord.resume_link,
            ApplicationRecord.github_link,
            Job.title.label("job_title")
        )
        .join(ApplicationRecord, JobCandidateMatch.application_id == ApplicationRecord.id)
        .join(Job, JobCandidateMatch.job_id == Job.id)
        .order_by(JobCandidateMatch.match_score.desc())  # Highest score first
        .all()
    )



    result = []
    for match in matches:
        result.append({
            "match_id": match.match_id,
            "application_id": match.application_id,
            "job_id": match.job_id,
            "match_score": match.match_score,
            "match_summary":match.match_summary,
            "candidate_name": match.candidate_name,
            "candidate_email": match.candidate_email,
            "resume_link": match.resume_link,
            "github_link": match.github_link,
            "job_title": match.job_title
        })

    return result


