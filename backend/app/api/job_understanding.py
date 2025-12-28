from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session 
from app.db.session import get_db
from app.services.job_understanding_service import JobUndertandingService







router = APIRouter()



@router.post("/{job_id}/understand")
def understand_job(job_id: int, db: Session = Depends(get_db)):
    service = JobUndertandingService(db)
    result = service.analyze_job(job_id)

    return {
        "job_analysis_id": result.id
    }