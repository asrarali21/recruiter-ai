from fastapi import APIRouter , Depends
from sqlalchemy.orm import Session 
from app.db.session import get_db








router = APIRouter()



@router.post("/{job_id}/understand")
def understand_job(job_id: int, db: Session = Depends(get_db)):
    service = JobUnderstandingService(db)
    result = service.analyze_job(job_id)

    return {
        "job_analysis_id": result.id
    }