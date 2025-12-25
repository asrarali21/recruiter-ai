from fastapi import APIRouter , Depends
from pydantic import BaseModel
from app.db.session import get_db
from sqlalchemy.orm import Session
from app.db.models.Job_model.job_model import Job
from app.services.job_service import JobService
from typing import Optional , List




class ApprovalDecision(BaseModel):
    decision: str

router = APIRouter(prefix="/jobs", tags=["jobs"])


class JobCreate(BaseModel):
    title : str
    experience: Optional[str] = None
    salary: Optional[str] = None
    skills: Optional[List[str]] = None
    domain: Optional[str] = None



@router.post("/create_job")
def job_create(job_data:JobCreate ,db: Session = Depends(get_db)):

    job_service = JobService(db)

    job = job_service.job_create(
        title=job_data.title
    )
  
    draft = job_service.job_draft( job =  job , raw_input = job_data.dict() )
             
    return job



@router.post("/{job_id}/generate_jd")
def generate_jd(job_id:int,db: Session = Depends(get_db)):
     
     job_service = JobService(db)

     jd = job_service.generate_jd(job_id)
     

     return {
        "job_id": job_id,
        "status": "pending_approval",
        "jd": jd.description
     }


@router.post("/{job_id}/approve")
def approve_decision(   approval: ApprovalDecision , job_id : int ,db: Session = Depends(get_db)):

    from app.graphs.HITL_graph import build_approval_graph


    graph  = build_approval_graph()

    graph.invoke({
        "job_id": job_id,
        "decision": approval.decision
    } )
    return {
        "job_id": job_id,
        "status": "updated",
        "decision": approval.decision
    }



    
    



