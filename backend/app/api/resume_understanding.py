
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.ingestion.resume_understanding_service import ResumeUnderstandingService

router = APIRouter()

@router.post("/applications/{application_id}/understand-resume")
def understand_resume(application_id: int, db: Session = Depends(get_db)):
    service = ResumeUnderstandingService(db)
    result = service.analyze_resume(application_id)

    return {
        "resume_analysis_id": result.id
    }
