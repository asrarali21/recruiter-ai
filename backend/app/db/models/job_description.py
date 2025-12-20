from sqlalchemy import Row , Column , String , Integer , ForeignKey
from app.db.base import Base

class Jobdescription(Base):
    job_id = Column(Integer , ForeignKey("jobs.id") , nullable=False)
    job_description = Column(String , nullable=True) 