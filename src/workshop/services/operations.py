from typing import List

from fastapi import Depends

from workshop import tables
from workshop.services.db_services import OperationDatabaseQuery
from workshop.models.operations import OperationKind, OperationCreate, OperationUpdate


class OperationsService:
    def __init__(self, database_service: OperationDatabaseQuery = Depends()):
        self.database_service = database_service

    def get_list(self, user_id: int, kind: OperationKind = None) -> List[tables.Operation]:
        return self.database_service.get_list_of_operations(user_id=user_id, kind=kind)

    def get(self, user_id: int, operation_id: int) -> tables.Operation:
        return self.database_service.get_one_operation(user_id=user_id, operation_id=operation_id)

    def create(self, user_id: int, operation_data: OperationCreate) -> tables.Operation:
        return self.database_service.create_new_operation(user_id=user_id, operation_data=operation_data)

    def create_many(self, user_id: int, operations_data: List[OperationCreate]) -> List[tables.Operation]:
        return self.database_service.create_many_operations(user_id=user_id, operations_data=operations_data)

    def update(self, user_id: int, operation_id: int, operation_data: OperationUpdate) -> tables.Operation:
        return self.database_service.update_operation(
            user_id=user_id,
            operation_id=operation_id,
            operation_data=operation_data)

    def delete(self, user_id: int, operation_id: int):
        return self.database_service.delete_operation(user_id=user_id, operation_id=operation_id)
