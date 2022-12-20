from fastapi import Depends
from sqlalchemy.orm import Session

from workshop import tables
from workshop.database import get_session
from workshop.models.operations import OperationKind, OperationCreate, OperationUpdate


class OperationDatabaseQuery:
    def __init__(self, session: Session = Depends(get_session)):
        self.session = session

    def _get(self, user_id: int, operation_id: int) -> tables.Operation:
        operation = self.session.query(tables.Operation).filter_by(user_id=user_id, id=operation_id).first()
        return operation

    def get_list_of_operations(self, user_id: int, kind: OperationKind = None) -> list[tables.Operation]:
        query = self.session.query(tables.Operation).filter_by(user_id=user_id)
        if kind is not None:
            query = query.filter_by(kind=kind)
        operations = query.all()
        return operations

    def get_one_operation(self, user_id: int, operation_id: int) -> tables.Operation:
        return self._get(user_id=user_id, operation_id=operation_id)

    def create_new_operation(self, user_id: int, operation_data: OperationCreate) -> tables.Operation:
        operation = tables.Operation(
            **operation_data.dict(),
            user_id=user_id
        )
        self.session.add(operation)
        self.session.commit()
        return operation

    def create_many_operations(self, user_id: int, operations_data: list[OperationCreate]) -> list[tables.Operation]:
        operations = [
            tables.Operation(
                **operation_data.dict(),
                user_id=user_id
            )
            for operation_data in operations_data
        ]
        self.session.add_all(operations)
        self.session.commit()
        return operations

    def update_operation(self, user_id: int, operation_id: int, operation_data: OperationUpdate) -> tables.Operation:
        operation = self._get(user_id, operation_id)
        for field, value in operation_data:
            setattr(operation, field, value)
        self.session.add(operation)
        self.session.commit()

    def delete_operation(self, operation_id: int, user_id: int):
        operation = self._get(user_id, operation_id)
        self.session.delete(operation)
        self.session.commit()
