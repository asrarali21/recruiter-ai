# api/resume_ingestion.py
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.ingestion.resume_ingestion_service import ResumeIngestionService



router = APIRouter()

@router.post("/applications/{application_id}/ingest-resume")
def ingest_resume(application_id: int, db: Session = Depends(get_db)):
    service = ResumeIngestionService(db)
    result = service.ingest_resume(application_id)

    return {
        "status": result.extraction_status,
        "resume_record_id": result.id
    }
