from sqlalchemy import Column , Row , String ,Integer ,  ForeignKey
from app.db.base import Base


class Job(Base):
    __tablename__= "jobs"

    id = Column(Integer , primary_key=True , index=True)
    company_id = Column(Integer)
    title = Column(String, nullable=False)
    status = Column(String, default="draft")